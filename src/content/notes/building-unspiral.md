---
title: 'Building Unspiral — structure against rumination'
date: 2026-07-07
kind: log
tags: ['llm', 'wip']
---

Started something new: **Unspiral**, an overthinking simulator.

You give it a social scenario — a conflict, an awkward moment, a message you're
afraid to send, some group dynamic — and it expands that scenario into a
branching graph of possible futures. Then it analyzes the graph and shows you
that the space of outcomes is smaller, and more manageable, than it feels from
the inside.

The design idea I keep coming back to: **generate branches the way an anxious
mind would enumerate them, but resolve them the way a planner would.** The job
isn't to add more possibilities — rumination already does that for free — it's to
impose structure on them. Keeping the domain to social scenarios is deliberate;
that constraint is what makes the graph schema and the prompts tractable instead
of open-ended.

Right now it's very early — a Python service with an `api/` and `db/` behind
Docker Compose, and not much else committed yet. I'm putting it here as a marker
of what I'm working through, not as a finished thing. More once there's something
that actually runs end to end.
