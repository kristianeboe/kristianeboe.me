#!/usr/bin/env python3
"""Shared contact-sheet renderer used by ImgGrid and VidGrid."""

from __future__ import annotations

import csv
import hashlib
import json
import math
import textwrap
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterable

from PIL import Image, ImageDraw, ImageFont, ImageOps


@dataclass
class GridRecord:
    id: str
    path: Path
    detail: str = ""
    metadata: dict[str, Any] = field(default_factory=dict)


@dataclass
class GridConfig:
    columns: int = 4
    rows: int = 4
    cell_width: int = 480
    cell_height: int = 360
    gap: int = 8
    outer_margin: int = 16
    label_height: int = 72
    background: str = "#14171c"
    cell_background: str = "#242933"
    label_background: str = "#0b0d11"
    text_color: str = "#ffffff"
    secondary_text_color: str = "#c4cad4"
    jpeg_background: str = "#f2f2f2"


def natural_key(value: str) -> list[Any]:
    import re

    return [int(piece) if piece.isdigit() else piece.casefold() for piece in re.split(r"(\d+)", value)]


def _font(size: int, bold: bool = False) -> ImageFont.ImageFont:
    names = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for name in names:
        try:
            return ImageFont.truetype(name, size=size)
        except OSError:
            continue
    return ImageFont.load_default()


def _sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def _fit_image(source: Image.Image, width: int, height: int, background: str) -> Image.Image:
    source = ImageOps.exif_transpose(source)
    if getattr(source, "is_animated", False):
        source.seek(0)
    rgba = source.convert("RGBA")
    rgba.thumbnail((width, height), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (width, height), background)
    x = (width - rgba.width) // 2
    y = (height - rgba.height) // 2
    canvas.alpha_composite(rgba, (x, y))
    return canvas.convert("RGB")


def _draw_label(draw: ImageDraw.ImageDraw, x: int, y: int, width: int, height: int, record: GridRecord) -> None:
    primary = _font(27, bold=True)
    secondary = _font(20)
    draw.text((x + 12, y + 7), record.id, fill="#ffffff", font=primary)
    if record.detail and height >= 62:
        max_chars = max(18, int((width - 24) / 11))
        detail = textwrap.shorten(record.detail.replace("\n", " "), width=max_chars, placeholder="…")
        draw.text((x + 12, y + 40), detail, fill="#c4cad4", font=secondary)


def render_grids(
    records: Iterable[GridRecord],
    output_dir: Path,
    config: GridConfig,
    *,
    manifest_extra: dict[str, Any] | None = None,
    prompt_title: str = "ImgGrid vision pass",
) -> dict[str, Any]:
    records = list(records)
    if not records:
        raise ValueError("No image records were supplied")
    if config.columns < 1 or config.rows < 1:
        raise ValueError("Grid columns and rows must be at least 1")
    if config.cell_width < 160 or config.cell_height < 120:
        raise ValueError("Cells are too small; minimum is 160x120")

    output_dir.mkdir(parents=True, exist_ok=True)
    per_board = config.columns * config.rows
    board_width = config.outer_margin * 2 + config.columns * config.cell_width + (config.columns - 1) * config.gap
    tile_height = config.cell_height + config.label_height
    entries: list[dict[str, Any]] = []
    boards: list[dict[str, Any]] = []

    for board_index in range(math.ceil(len(records) / per_board)):
        chunk = records[board_index * per_board : (board_index + 1) * per_board]
        used_rows = math.ceil(len(chunk) / config.columns)
        board_height = config.outer_margin * 2 + used_rows * tile_height + (used_rows - 1) * config.gap
        board = Image.new("RGB", (board_width, board_height), config.background)
        draw = ImageDraw.Draw(board)
        board_name = f"board-{board_index + 1:03d}.png"
        board_path = output_dir / board_name
        board_ids: list[str] = []

        for local_index, record in enumerate(chunk):
            row, column = divmod(local_index, config.columns)
            x = config.outer_margin + column * (config.cell_width + config.gap)
            y = config.outer_margin + row * (tile_height + config.gap)
            draw.rectangle((x, y, x + config.cell_width - 1, y + tile_height - 1), fill=config.cell_background)
            error: str | None = None
            width: int | None = None
            height: int | None = None
            fingerprint: str | None = None
            try:
                fingerprint = _sha256(record.path)
                with Image.open(record.path) as source:
                    oriented = ImageOps.exif_transpose(source)
                    width, height = oriented.size
                    fitted = _fit_image(source, config.cell_width, config.cell_height, config.jpeg_background)
                board.paste(fitted, (x, y))
            except Exception as exc:  # keep failed inputs visible and in the manifest
                error = f"{type(exc).__name__}: {exc}"
                draw.rectangle((x, y, x + config.cell_width - 1, y + config.cell_height - 1), fill="#4a2025")
                err_font = _font(22, bold=True)
                draw.multiline_text((x + 18, y + 24), "DECODE ERROR\nSee manifest", fill="#ffffff", font=err_font, spacing=8)

            label_y = y + config.cell_height
            draw.rectangle((x, label_y, x + config.cell_width - 1, y + tile_height - 1), fill=config.label_background)
            _draw_label(draw, x, label_y, config.cell_width, config.label_height, record)
            cell_index = board_index * per_board + local_index + 1
            entry = {
                "id": record.id,
                "path": str(record.path.resolve()),
                "board": board_name,
                "board_index": board_index + 1,
                "cell_index": cell_index,
                "board_cell_index": local_index + 1,
                "row": row + 1,
                "column": column + 1,
                "width": width,
                "height": height,
                "sha256": fingerprint,
                "detail": record.detail,
                "error": error,
                **record.metadata,
            }
            entries.append(entry)
            board_ids.append(record.id)

        board.save(board_path, format="PNG", optimize=True)
        boards.append({"path": str(board_path.resolve()), "filename": board_name, "ids": board_ids})

    manifest: dict[str, Any] = {
        "schema": "visual-index/v1",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "grid": {
            "columns": config.columns,
            "rows": config.rows,
            "cell_width": config.cell_width,
            "cell_height": config.cell_height,
            "label_height": config.label_height,
        },
        "summary": {
            "image_count": len(entries),
            "board_count": len(boards),
            "decode_error_count": sum(1 for item in entries if item["error"]),
        },
        "boards": boards,
        "images": entries,
    }
    if manifest_extra:
        manifest.update(manifest_extra)

    manifest_path = output_dir / "manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    csv_path = output_dir / "manifest.csv"
    csv_fields = ["id", "path", "board", "board_cell_index", "row", "column", "width", "height", "sha256", "detail", "error"]
    with csv_path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=csv_fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(entries)

    prompt = f"""# {prompt_title}

Inspect the attached contact-sheet boards as a labelled visual index.

Rules:
- Refer to every image only by its visible ID.
- Do not invent IDs.
- Separate board-visible observations from details that require an original.
- Put uncertain cases in `uncertain` with the exact full-resolution check needed.

Return JSON:

```json
{{
  "selected": [{{"id": "IMG-0001", "reason": "...", "confidence": "high|medium|low"}}],
  "rejected": [{{"id": "IMG-0002", "reason": "..."}}],
  "uncertain": [{{"id": "IMG-0003", "needs_original": "..."}}]
}}
```
"""
    (output_dir / "vision-prompt.md").write_text(prompt, encoding="utf-8")
    return manifest
