#!/usr/bin/env python3
"""Build labelled contact sheets and a stable ID manifest from image inputs."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from gridlib import GridConfig, GridRecord, natural_key, render_grids


EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".tif", ".tiff"}


def collect_images(inputs: list[str], recursive: bool) -> list[Path]:
    result: list[Path] = []
    seen: set[Path] = set()
    for raw in inputs:
        path = Path(raw).expanduser()
        if path.is_file():
            candidates = [path]
        elif path.is_dir():
            iterator = path.rglob("*") if recursive else path.glob("*")
            candidates = sorted(
                (item for item in iterator if item.is_file() and item.suffix.casefold() in EXTENSIONS),
                key=lambda item: natural_key(str(item.relative_to(path))),
            )
        else:
            raise FileNotFoundError(f"Input does not exist: {path}")
        for candidate in candidates:
            resolved = candidate.resolve()
            if resolved not in seen:
                result.append(resolved)
                seen.add(resolved)
    return result


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("inputs", nargs="+", help="Image files and/or directories")
    parser.add_argument("--output-dir", required=True, type=Path)
    parser.add_argument("--columns", type=int, default=4)
    parser.add_argument("--rows", type=int, default=4)
    parser.add_argument("--cell-width", type=int, default=480)
    parser.add_argument("--cell-height", type=int, default=360)
    parser.add_argument("--gap", type=int, default=8)
    parser.add_argument("--recursive", action="store_true")
    parser.add_argument("--prefix", default="IMG")
    parser.add_argument("--captions", choices=("filename", "path", "none"), default="filename")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    try:
        paths = collect_images(args.inputs, args.recursive)
        if not paths:
            raise ValueError("No supported image files found")
        width = max(4, len(str(len(paths))))
        records: list[GridRecord] = []
        for index, path in enumerate(paths, 1):
            detail = path.name if args.captions == "filename" else str(path) if args.captions == "path" else ""
            records.append(GridRecord(id=f"{args.prefix}-{index:0{width}d}", path=path, detail=detail))
        config = GridConfig(
            columns=args.columns,
            rows=args.rows,
            cell_width=args.cell_width,
            cell_height=args.cell_height,
            gap=args.gap,
        )
        manifest = render_grids(
            records,
            args.output_dir.expanduser().resolve(),
            config,
            manifest_extra={"tool": "imggrid", "inputs": [str(Path(item).expanduser().resolve()) for item in args.inputs]},
        )
    except Exception as exc:
        print(f"imggrid: error: {exc}", file=sys.stderr)
        return 2

    summary = manifest["summary"]
    print(f"images={summary['image_count']}")
    print(f"boards={summary['board_count']}")
    print(f"decode_errors={summary['decode_error_count']}")
    print(f"manifest={(args.output_dir.expanduser().resolve() / 'manifest.json')}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
