---
title: 'Tenax: An AI Model Routing Gateway'
order: 5
status: prototype
summary: 'An app calls one OpenAI-style endpoint and Tenax picks the model. It drops models that break a hard rule, scores the rest on cost, speed and reliability, and stores why it chose, so every decision can be checked later.'
stack: ['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'Next.js', 'Docker Compose', 'Ollama']
hardware: 'Developed on RTX 4050 (6GB) / Ryzen 7; the whole stack runs in Docker on one laptop, against a deterministic mock model and, optionally, a local model in Ollama.'
cost_profile: '$0 so far: no paid API is called anywhere in the repository. The prices used in routing are declared estimates, and each explanation labels them as such.'
privacy: 'Every port binds to 127.0.0.1. A routed request stores its decision and explanation, never its content. The local alias reaches Ollama on the same machine, so nothing leaves it.'
human_in_the_loop: 'Routing policies are versioned and published by an admin, and every decision is stored with its explanation and margin, so a person can see why a model was picked.'
limitations:
  - 'One attempt and no failover yet. The router already ranks the backups, but nothing acts on them until a later phase, so a deployment that fails fails the request.'
  - 'Prices, latency and quality figures are declared or synthetic, not measured. There is no live latency or error-rate estimate yet.'
  - 'One project and one adapter. There is no management API or UI, no key management and no cloud provider, so it must not be exposed to more than one tenant.'
failure_modes:
  - 'A model that breaks a hard rule (capability, region, budget or health) is dropped before scoring, so a cheaper model cannot win by ignoring a constraint.'
  - 'The upstream call is capped at the policy''s timeout budget, so a slow model ends the request instead of hanging it.'
  - 'Every decision is stored with the policy version that made it, so a surprising choice can be traced to the exact rules in force at the time.'
reproduce:
  command: 'git clone https://github.com/Dumee-25/AdaptiveRouter && cd AdaptiveRouter && uv run scripts/tasks.py up'
  environment: 'Docker Desktop with Compose v2, uv, Node.js 24 and Python 3.13. Ollama only for the optional local-model check.'
  runtime: 'Not timed. A one-shot seed job registers a synthetic project, a development key and four routing policies on first start.'
  expected_output: 'The gateway at http://127.0.0.1:18080. A call to tenax/auto is answered by the model the policy chose, named in the x-tenax-model header, with the full explanation stored.'
receipts:
  - { label: 'repository (private for now)', url: 'https://github.com/Dumee-25/AdaptiveRouter' }
last_verified: 2026-11-03
---

Tenax is a gateway for AI models. An app sends every request to one
OpenAI-style endpoint, and the routing engine, AdaptiveRouter, picks the model
that serves it. The pick matters less than the record: every decision is stored
with its reasons, so you can check it afterwards.

## How a decision is made

1. **Hard rules first.** A model that lacks a capability, sits in the wrong
   region, breaks the budget or is unhealthy is dropped.
2. **Then a strategy.** The models that remain are scored on cost, speed and
   reliability under a versioned policy.
3. **Then the record.** The choice, the policy version, the explanation and the
   margin are stored. The request's content is not.

## Three requests, three choices

- A short ticket to classify went to the fast model. The 95% quality gate for
  classifying removed the local model, which scored 0.91.
- A long document to summarise went to the premium model, the only one whose
  context window fits it.
- A request that asked for the cheapest option went to the local model.

Every price, latency and quality figure in these examples is declared or
synthetic, and the stored explanation says so.

## Where it stands

The gateway's hot path and AdaptiveRouter v1 are done. Failover, measured
latency, cloud providers and a management UI come in later phases.
