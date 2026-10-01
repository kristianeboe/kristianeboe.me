#!/usr/bin/env python3
"""Extract timestamped video frames and render chronological contact sheets."""

from __future__ import annotations

import argparse
import html
import json
import math
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Any


SKILLS_DIR = Path(__file__).resolve().parents[2]
IMGGRID_SCRIPTS = SKILLS_DIR / "imggrid" / "scripts"
if not (IMGGRID_SCRIPTS / "gridlib.py").exists():
    raise SystemExit("vidgrid: error: companion ImgGrid skill is missing; expected " + str(IMGGRID_SCRIPTS / "gridlib.py"))
sys.path.insert(0, str(IMGGRID_SCRIPTS))

from gridlib import GridConfig, GridRecord, natural_key, render_grids  # noqa: E402


TIMING_RE = re.compile(
    r"(?P<start>\d{1,2}:\d{2}:\d{2}[,.]\d{3}|\d{1,2}:\d{2}[,.]\d{3})\s*-->\s*"
    r"(?P<end>\d{1,2}:\d{2}:\d{2}[,.]\d{3}|\d{1,2}:\d{2}[,.]\d{3})"
)
TAG_RE = re.compile(r"<[^>]+>")


def parse_time(value: str) -> float:
    parts = value.replace(",", ".").split(":")
    if len(parts) == 2:
        minutes, seconds = parts
        return int(minutes) * 60 + float(seconds)
    hours, minutes, seconds = parts
    return int(hours) * 3600 + int(minutes) * 60 + float(seconds)


def format_time(seconds: float) -> str:
    milliseconds = int(round(max(0.0, seconds) * 1000))
    hours, remainder = divmod(milliseconds, 3_600_000)
    minutes, remainder = divmod(remainder, 60_000)
    secs, millis = divmod(remainder, 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d}.{millis:03d}"


def parse_captions(path: Path) -> list[dict[str, Any]]:
    text = path.read_text(encoding="utf-8-sig").replace("\r\n", "\n").replace("\r", "\n")
    cues: list[dict[str, Any]] = []
    for block in re.split(r"\n\s*\n", text):
        lines = [line.strip() for line in block.splitlines() if line.strip()]
        timing_index = next((index for index, line in enumerate(lines) if TIMING_RE.search(line)), None)
        if timing_index is None:
            continue
        match = TIMING_RE.search(lines[timing_index])
        assert match is not None
        cue_text = " ".join(lines[timing_index + 1 :])
        cue_text = html.unescape(TAG_RE.sub("", cue_text)).strip()
        if cue_text:
            cues.append({"start": parse_time(match.group("start")), "end": parse_time(match.group("end")), "text": cue_text})
    return cues


def caption_at(cues: list[dict[str, Any]], timestamp: float) -> str:
    return " / ".join(cue["text"] for cue in cues if cue["start"] <= timestamp <= cue["end"])


def find_binary(name: str, explicit: str | None = None) -> Path:
    candidates: list[Path] = []
    if explicit:
        candidates.append(Path(explicit).expanduser())
    env_value = os.environ.get(f"{name.upper()}_BIN")
    if env_value:
        candidates.append(Path(env_value).expanduser())
    found = shutil.which(name)
    if found:
        candidates.append(Path(found))
    candidates.extend([Path(f"/opt/homebrew/bin/{name}"), Path(f"/usr/local/bin/{name}")])
    for cellar in (Path("/opt/homebrew/Cellar/ffmpeg"), Path("/usr/local/Cellar/ffmpeg")):
        if cellar.exists():
            versions = sorted(cellar.iterdir(), key=lambda item: natural_key(item.name), reverse=True)
            candidates.extend(version / "bin" / name for version in versions)
    for candidate in candidates:
        if candidate.is_file() and os.access(candidate, os.X_OK):
            return candidate.resolve()
    raise FileNotFoundError(f"{name} not found. Install ffmpeg with Homebrew (`brew install ffmpeg`) or set {name.upper()}_BIN.")


def run(command: list[str]) -> None:
    completed = subprocess.run(command, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if completed.returncode != 0:
        detail = completed.stderr.strip() or completed.stdout.strip() or f"exit code {completed.returncode}"
        raise RuntimeError(detail)


def probe_video(ffprobe: Path, video: Path) -> dict[str, Any]:
    command = [
        str(ffprobe), "-v", "error", "-show_entries",
        "format=duration,format_name:stream=index,codec_type,codec_name,width,height,r_frame_rate,avg_frame_rate",
        "-of", "json", str(video),
    ]
    completed = subprocess.run(command, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if completed.returncode != 0:
        raise RuntimeError(completed.stderr.strip() or "ffprobe failed")
    data = json.loads(completed.stdout)
    try:
        data["duration_seconds"] = float(data["format"]["duration"])
    except (KeyError, TypeError, ValueError) as exc:
        raise RuntimeError("Video duration could not be determined") from exc
    return data


def ensure_empty_output(path: Path) -> None:
    if path.exists() and any(path.iterdir()):
        raise FileExistsError(f"Output directory is not empty: {path}")
    path.mkdir(parents=True, exist_ok=True)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("video", type=Path)
    parser.add_argument("--output-dir", required=True, type=Path)
    parser.add_argument("--interval-seconds", type=float, default=1.0)
    parser.add_argument("--start", type=float, default=0.0)
    parser.add_argument("--end", type=float)
    parser.add_argument("--columns", type=int, default=4)
    parser.add_argument("--rows", type=int, default=4)
    parser.add_argument("--cell-width", type=int, default=480)
    parser.add_argument("--cell-height", type=int, default=360)
    parser.add_argument("--max-frames", type=int, default=600)
    parser.add_argument("--captions", type=Path)
    parser.add_argument("--extract-audio", action="store_true")
    parser.add_argument("--ffmpeg-bin")
    parser.add_argument("--ffprobe-bin")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    try:
        video = args.video.expanduser().resolve()
        output_dir = args.output_dir.expanduser().resolve()
        if not video.is_file():
            raise FileNotFoundError(f"Video does not exist: {video}")
        if args.interval_seconds <= 0:
            raise ValueError("--interval-seconds must be greater than zero")
        if args.start < 0:
            raise ValueError("--start cannot be negative")
        ffmpeg = find_binary("ffmpeg", args.ffmpeg_bin)
        ffprobe = find_binary("ffprobe", args.ffprobe_bin)
        probe = probe_video(ffprobe, video)
        duration = probe["duration_seconds"]
        segment_end = min(args.end if args.end is not None else duration, duration)
        if segment_end <= args.start:
            raise ValueError("The requested segment is empty or starts after the video ends")
        segment_duration = segment_end - args.start
        estimated_frames = max(1, math.ceil(segment_duration / args.interval_seconds))
        if args.max_frames > 0 and estimated_frames > args.max_frames:
            raise ValueError(
                f"Estimated {estimated_frames} frames exceeds --max-frames {args.max_frames}; "
                "use a larger cadence, bound the segment, or set a deliberate higher limit"
            )
        ensure_empty_output(output_dir)
        frames_dir = output_dir / "frames"
        frames_dir.mkdir()

        command = [str(ffmpeg), "-hide_banner", "-loglevel", "error"]
        if args.start:
            command.extend(["-ss", f"{args.start:.6f}"])
        command.extend(["-i", str(video), "-t", f"{segment_duration:.6f}"])
        command.extend([
            "-vf", f"fps=1/{args.interval_seconds:.9f}:start_time=0",
            "-q:v", "2", "-start_number", "1", str(frames_dir / "frame-%06d.jpg"),
        ])
        run(command)
        frame_paths = sorted(frames_dir.glob("frame-*.jpg"), key=lambda item: natural_key(item.name))
        if not frame_paths:
            raise RuntimeError("ffmpeg produced no frames")
        if args.max_frames > 0 and len(frame_paths) > args.max_frames:
            raise RuntimeError(f"ffmpeg produced {len(frame_paths)} frames, over the safety limit {args.max_frames}")

        cues: list[dict[str, Any]] = []
        captions_path: Path | None = None
        if args.captions:
            captions_path = args.captions.expanduser().resolve()
            if not captions_path.is_file():
                raise FileNotFoundError(f"Caption file does not exist: {captions_path}")
            cues = parse_captions(captions_path)
            if not cues:
                raise ValueError("No SRT/VTT caption cues could be parsed")

        width = max(4, len(str(len(frame_paths))))
        records: list[GridRecord] = []
        timeline_rows: list[tuple[str, float, str]] = []
        for index, frame_path in enumerate(frame_paths, 1):
            timestamp = min(args.start + (index - 1) * args.interval_seconds, segment_end)
            frame_id = f"FRM-{index:0{width}d}"
            caption = caption_at(cues, timestamp)
            detail = format_time(timestamp) + (f" · {caption}" if caption else "")
            records.append(
                GridRecord(
                    id=frame_id,
                    path=frame_path,
                    detail=detail,
                    metadata={"timestamp_seconds": round(timestamp, 6), "timestamp": format_time(timestamp), "caption": caption},
                )
            )
            timeline_rows.append((frame_id, timestamp, caption))

        config = GridConfig(
            columns=args.columns,
            rows=args.rows,
            cell_width=args.cell_width,
            cell_height=args.cell_height,
            label_height=76,
        )
        manifest = render_grids(
            records,
            output_dir,
            config,
            manifest_extra={
                "tool": "vidgrid",
                "source_video": str(video),
                "video_probe": probe,
                "segment": {"start_seconds": args.start, "end_seconds": segment_end},
                "interval_seconds": args.interval_seconds,
                "captions": {"path": str(captions_path) if captions_path else None, "cue_count": len(cues)},
            },
            prompt_title="VidGrid temporal vision pass",
        )

        timeline = ["# VidGrid timeline", "", f"Source: `{video}`", "", "| Frame ID | Time | Caption |", "|---|---:|---|"]
        for frame_id, timestamp, caption in timeline_rows:
            safe_caption = caption.replace("|", "\\|") if caption else ""
            timeline.append(f"| {frame_id} | {format_time(timestamp)} | {safe_caption} |")
        (output_dir / "timeline.md").write_text("\n".join(timeline) + "\n", encoding="utf-8")

        prompt = """# VidGrid temporal vision pass

Inspect every attached board in board-number order and use `timeline.md` for full caption text when supplied.

Rules:
- Cite frame IDs and timestamps for every event or state.
- Describe a change between sampled frames as an interval, not an unsupported exact instant.
- Separate pixel-visible observations from caption-derived statements.
- Flag motion, transient states, latency, or transition questions that require the source video or finer sampling.
- Do not invent frame IDs.

Return JSON with `summary`, `events`, `transitions`, and `uncertain`. Each event must include `start_id`, `end_id`, `start_seconds`, `end_seconds`, `observation`, and `confidence`.
"""
        (output_dir / "vision-prompt.md").write_text(prompt, encoding="utf-8")

        if args.extract_audio:
            audio_path = output_dir / "audio.wav"
            run([
                str(ffmpeg), "-hide_banner", "-loglevel", "error",
                "-ss", f"{args.start:.6f}", "-i", str(video), "-t", f"{segment_duration:.6f}",
                "-vn", "-ac", "1", "-ar", "16000", "-c:a", "pcm_s16le", str(audio_path),
            ])
            handoff = f"""# Transcription handoff

Audio extracted from `{video}` for segment {format_time(args.start)} to {format_time(segment_end)}.

`audio.wav` is untranscribed mono 16 kHz PCM. Transcribe it with the available transcription workflow, produce SRT or VTT timestamps relative to the source video segment, then rerun VidGrid with `--captions` if caption-aligned boards are needed.
"""
            (output_dir / "transcription-handoff.md").write_text(handoff, encoding="utf-8")

    except Exception as exc:
        print(f"vidgrid: error: {exc}", file=sys.stderr)
        return 2

    summary = manifest["summary"]
    print(f"frames={summary['image_count']}")
    print(f"boards={summary['board_count']}")
    print(f"decode_errors={summary['decode_error_count']}")
    print(f"segment={args.start:.3f}-{segment_end:.3f}")
    print(f"interval_seconds={args.interval_seconds}")
    print(f"captions={len(cues)}")
    print(f"manifest={output_dir / 'manifest.json'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
