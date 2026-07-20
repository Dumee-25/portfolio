---
title: "A parity check isn't a checklist, and that cost Seshat a feature"
date: 2026-07-15
kind: changed-my-mind
tags: ['seshat', 'honesty', 'regressions']
---

When I retired Streamlit in favor of the Cockpit, I did a parity pass to make
sure the new UI covered everything the old one did. It caught one gap —
inline confirm/correct for inferred intents was missing — I fixed it, and I
stopped looking.

I'd missed a second regression entirely: in the old UI, clicking a citation
opened the underlying notebook diff, script change, or commit that produced
it. In the Cockpit, a citation only jumps to the timeline row showing what
Seshat *wrote* — no component calls the endpoint that serves the raw diff, so
the diff is simply unreachable now. That's not a cosmetic loss. Seshat's whole
argument is that you shouldn't trust an inferred intent on the model's word
alone — you check it against the actual diff. Losing that view quietly
undermines the reason the tool exists.

What changed my mind: "I did a parity check" felt like due diligence at the
time, but a feeling of thoroughness isn't the same as an actual list of
features to verify one by one. One found bug ended the search instead of
prompting a second pass. I corrected the README so it stopped claiming a
capability that no longer shipped, and logged the missing view as the next
thing to rebuild — but the more durable fix is treating "parity" as a
checklist next migration, not a vibe.
