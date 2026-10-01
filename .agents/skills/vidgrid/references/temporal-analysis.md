# VidGrid temporal analysis

## Default response contract

```json
{
  "summary": "one concise description of the visible sequence",
  "events": [
    {
      "start_id": "FRM-0001",
      "end_id": "FRM-0004",
      "start_seconds": 0.0,
      "end_seconds": 3.0,
      "observation": "board-visible event or state",
      "confidence": "high|medium|low"
    }
  ],
  "transitions": [
    {
      "between": ["FRM-0004", "FRM-0005"],
      "change": "what visibly changed",
      "needs_finer_sampling": false
    }
  ],
  "uncertain": [
    {
      "interval_seconds": [12.0, 13.0],
      "reason": "what the cadence cannot establish",
      "follow_up": "inspect source video or rerun at 0.25 seconds"
    }
  ]
}
```

Reject any ID absent from the manifest.

## UI recordings

Track screen identity, modal or panel visibility, controls, loading/error/success states, navigation, and obvious content changes. Do not claim that a click caused a later state unless the interaction itself is visible or source-video review confirms it.

## Edit progression

Track shots, cuts, text overlays, transitions, framing, color/style shifts, and end cards. One sampled frame cannot establish transition duration or smoothness.

## Scene changes

Use frame IDs bracketing each apparent change. If consecutive samples differ sharply, report the change as occurring between them rather than assigning an unsupported exact time.

## Spoken layer

Treat aligned captions as accompanying evidence. Preserve full cue text in `timeline.md`; board labels may truncate it. Separate statements based on pixels from statements based on captions.

## Follow-up cadence

For a transition bracketed by frames at times `a` and `b`, rerun only that segment with a cadence 4-10 times finer. Review the original video when movement, audio timing, perceived latency, or animation quality is the actual question.
