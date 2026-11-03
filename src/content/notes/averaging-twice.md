---
title: 'The same averaging mistake, twice'
date: 2026-08-18
kind: changed-my-mind
tags: ['rl', 'methods', 'honesty']
---

In the [legibility work](/inquiry/rl-neuromodulation), my first simulation drew
each agent's other parameters from a prior and averaged the information across
agents. Under that design, two parameters peaked at the edge of the grid on every
task, which would have falsified the main prediction.

It was an averaging artefact. A slow learner stays readable at a level of
decisiveness where a fast learner has long gone opaque, so the averaged curve
keeps rising into a range where every individual has already collapsed. Holding
the other parameters fixed at reference profiles made every curve peak in the
interior, 39 of 39. The population version, kept on purpose as a contrast, peaks
in only 6 of 13.

I wrote that down, fixed the design, and then made the same mistake in a later
experiment. Its error curve was averaged over a drawn population too, which hid
the learning rates' effect and made the confound look like it applied to the
forgetting rate alone. I only caught it because I repeated the fixed-reference
check on purpose, and even then the power numbers had already been computed on
the wrong curve and had to be redone.

What changed is the default. Any measurement of how something varies with
exploration now runs at fixed reference profiles first, and the population curve
is kept only as a contrast.
