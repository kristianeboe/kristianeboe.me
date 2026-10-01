---
name: vidgrid
description: Turn a video into chronological, timestamp-labelled contact sheets plus a frame manifest and optional caption timeline, then use the boards for cheap temporal vision analysis followed by targeted inspection of selected full-resolution frames or video segments. Use for 30-60 second videos, UI recordings, edit reviews, scene-change analysis, state progression, visual QA, and locating moments in time.
---

# VidGrid

## Purpose

Convert a temporal asset into a small set of labelled visual timelines. Use the boards to understand what appears, when states change, and how an edit or interaction progresses. Require all findings to cite frame IDs and timestamps, then inspect only the relevant original frames or video segments.

VidGrid is the temporal companion to ImgGrid and uses ImgGrid's renderer. Keep both skill directories together.

## Runtime

Run the script with a Python 3 that provides Pillow. In Codex, call `load_workspace_dependencies` and use the returned Python executable; in other environments use `python3` (install Pillow if missing). The script resolves `ffmpeg` and `ffprobe` from the shell path, `FFMPEG_BIN`/`FFPROBE_BIN`, or standard Homebrew locations. It fails with an installation hint if they are unavailable.

```bash
"$PYTHON" <skill-dir>/scripts/vidgrid.py \
  <video> \
  --output-dir <output-directory> \
  --interval-seconds 1
```

`<skill-dir>` is the directory containing this SKILL.md. This repository includes it at `.agents/skills/vidgrid`.

Useful options:

- `--columns 4 --rows 4` for the normal broad timeline pass.
- `--columns 3 --rows 3` when UI text or subtle state changes need larger tiles.
- `--start 10 --end 40` to index a bounded video segment.
- `--captions <captions.srt-or-vtt>` to align spoken text with sampled frames.
- `--extract-audio` to create a mono 16 kHz `audio.wav` for a separate transcription step.
- `--max-frames 600` is the default safety limit; set a deliberate larger value when needed.

The output directory must be empty. It contains `frames/`, `board-###.png`, `manifest.json`, `manifest.csv`, `timeline.md`, and `vision-prompt.md`. With `--extract-audio`, it also contains `audio.wav` and `transcription-handoff.md`.

## Workflow

1. Probe the video and choose a cadence. Default to one frame per second for 30-60 second clips. Use 0.25-0.5 seconds for rapid UI or edit changes; use 2-5 seconds for long, slow footage.
2. Bound long videos to the relevant segment when possible. Estimate the frame and board count before creating a large index.
3. If the spoken layer matters, use supplied SRT/VTT captions or extract audio and transcribe it through the available transcription workflow. Never imply that extracting audio is transcription.
4. Run the script. Inspect the first and last boards and one middle board when present. Confirm chronological labels, readable tiles, plausible first/last timestamps, and a clean manifest.
5. Give all boards plus `timeline.md` to the vision model with the generated prompt. Require frame IDs and timestamps for every event or transition.
6. Validate returned IDs against `manifest.json`.
7. Open selected original frames for visual details. Return to the source video around selected timestamps when motion between samples matters.
8. If a transition is undersampled, rerun only a narrow interval around it at a finer cadence rather than reprocessing the entire video.

For analysis rubrics and follow-up rules, read [references/temporal-analysis.md](references/temporal-analysis.md).

## Safety And Quality Rules

- Preserve the source video and never overwrite it.
- Treat sampled frames as evidence at points in time, not continuous proof of what happened between them.
- Do not infer animation smoothness, gesture completion, latency, or transient states from a one-second cadence alone.
- Keep captions as a separate evidence layer. A caption aligned to a frame does not prove the depicted person or UI emitted it.
- Resolve every frame ID through `manifest.json`; do not infer paths from board labels.
- Keep generated frames and boards in a dedicated output directory.

## Handoff

Report the indexed segment, cadence, frame count, board count, caption/transcription status, manifest path, temporal findings, and any intervals that need finer sampling or source-video review.
