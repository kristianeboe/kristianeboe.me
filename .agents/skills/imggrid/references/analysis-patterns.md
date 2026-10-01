# ImgGrid analysis patterns

## Default response contract

Require the vision model to return only IDs that are visible on the boards. Prefer structured JSON when another system will consume the result.

```json
{
  "selected": [
    {"id": "IMG-0001", "reason": "short board-visible reason", "confidence": "high|medium|low"}
  ],
  "rejected": [
    {"id": "IMG-0002", "reason": "blur|duplicate|poor composition|other"}
  ],
  "uncertain": [
    {"id": "IMG-0003", "needs_original": "what must be checked at full resolution"}
  ]
}
```

Reject IDs absent from the manifest before targeted follow-up.

## Task rubrics

### Duplicate clustering

Group exact and near duplicates separately. Use manifest fingerprints for exact duplicates; use the boards for visual near-duplicate candidates. Open originals before making a destructive deduplication decision.

### Hero selection

Score subject clarity, composition, lighting, representative value, crop flexibility, distractions, and visible defects. Return a ranked shortlist rather than one winner when board evidence is close.

### Quality rejection

Use explicit reasons: decode failure, severe blur, accidental screenshot/UI, obstruction, extreme exposure, watermarks/text, duplicate, or irrelevant content. Fine blur and compression decisions need original inspection.

### Missing-angle checks

First classify each ID by coarse view or scene. Then report coverage gaps with the IDs that support each present category. Do not treat uncertain board-level classifications as confirmed coverage.

### Field extraction

Extract only fields plainly visible at board resolution. Put unreadable text or fine attributes in `uncertain` and request the original.

### Creative comparison

Separate observable traits from preference judgments. Cite every compared image by ID and state the comparison dimensions before ranking.
