---
name: imggrid
description: Turn batches of independent images into labelled contact sheets with stable IDs and a machine-readable manifest, then use the boards for cheap broad vision triage followed by targeted inspection of selected originals. Use for property photos, listing images, product shots, screenshots, creative variants, duplicate clustering, quality rejection, hero-shot selection, missing-angle checks, field extraction, visual comparison, or image ranking.
---

# ImgGrid

## Purpose

Convert many heavy image assets into a labelled visual index. Inspect the compact boards first, require model outputs to cite image IDs, and open only the selected originals at full resolution.

Use the bundled script for deterministic board construction. Do not manually collage images when the script can read them.

## Runtime

Run the script with a Python 3 that provides Pillow. In Codex, call `load_workspace_dependencies` and use the returned Python executable; in other environments use `python3` (install Pillow if missing). The script lives at `scripts/imggrid.py` relative to this skill directory.

```bash
"$PYTHON" <skill-dir>/scripts/imggrid.py \
  <image-or-directory> [<more-inputs> ...] \
  --output-dir <output-directory>
```

`<skill-dir>` is the directory containing this SKILL.md. This repository includes it at `.agents/skills/imggrid`.

Useful options:

- `--columns 3 --rows 3` for larger tiles and close visual comparison.
- `--columns 4 --rows 4` for the normal broad pass.
- `--cell-width 480 --cell-height 360` to tune tile size.
- `--recursive` to include nested directories.
- `--prefix LISTING` to create IDs such as `LISTING-0001`.
- `--captions filename|path|none` to control the detail line beneath each ID.

The output directory contains `board-###.png`, `manifest.json`, `manifest.csv`, and `vision-prompt.md`. The manifest is the source of truth mapping each board ID back to the original absolute path. IDs are deterministically assigned from the naturally sorted input paths; the manifest also records a content fingerprint for duplicate detection.

## Workflow

1. Resolve the user-provided image set without changing or deleting originals.
2. Choose `4x4` unless legibility or fine visual differences favor `3x3`.
3. Run the script and inspect at least the first and last generated boards. Confirm labels are readable, images are not stretched, and the manifest maps IDs to originals.
4. Give the boards to the vision model with a task-specific rubric and a strict ID-based output contract.
5. Validate that every returned ID exists in `manifest.json`.
6. Open only the selected or ambiguous originals for full-resolution follow-up.
7. Clearly distinguish board-level judgments from conclusions confirmed on originals.

For more detailed rubrics and output contracts, read [references/analysis-patterns.md](references/analysis-patterns.md).

## Safety And Quality Rules

- Never infer an original path from a label; resolve it through `manifest.json`.
- Treat exact-fingerprint matches as exact duplicates. Treat visual similarity as a model judgment requiring review.
- Do not claim small-text legibility, subtle defects, or fine-grained fields from contact sheets alone.
- Preserve input order deterministically and do not overwrite originals.
- If an image cannot be decoded, keep a manifest error entry instead of silently dropping it.
- Keep analysis outputs separate from source assets.

## Handoff

Report the board count, indexed image count, decode-error count, manifest path, the broad-pass result, and which originals were opened for confirmation.
