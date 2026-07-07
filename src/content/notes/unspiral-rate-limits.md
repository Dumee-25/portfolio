---
title: 'Stuck on Unspiral — free-tier rate limits'
date: 2026-07-07
kind: stuck-on
tags: ['unspiral', 'llm', 'rate-limits']
---

Unspiral generates a whole branching graph of futures for a single scenario,
which means a lot of model calls per run — and I keep slamming into the free API
rate limits before a graph finishes expanding. It's the main thing blocking
progress right now.

I'm working through options: batching or collapsing branch-generation into fewer
calls, caching repeated sub-branches, adding backoff/retry so a run degrades
instead of dying, and looking at whether a local model can carry the
high-volume branch enumeration while a stronger model only does the final
resolution. No settled answer yet — will update this once one of them actually
holds up.
