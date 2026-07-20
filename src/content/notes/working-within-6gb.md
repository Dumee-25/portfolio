---
title: 'Working inside 6 GB of VRAM, on purpose'
date: 2026-06-20
kind: changed-my-mind
tags: ['hardware', 'llm']
---

I used to treat my hardware — an RTX 4050 with 6 GB of VRAM — as the thing
holding the work back. I've changed my mind. The constraint is a feature: it
forces quantization, local inference, and honest cost accounting, and it means
everything I ship has actually run on a machine I own, not rented from a
leaderboard.

A system that runs on a 6 GB consumer GPU is more convincing to me than one that
only exists on borrowed A100s, because I can reproduce it tomorrow.
