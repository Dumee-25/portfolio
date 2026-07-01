---
title: 'DataSense — Privacy-Preserving Automated EDA'
order: 2
status: prototype
summary: 'Upload a CSV, get a full statistical audit, a model recommendation, and plain-language insights — without sending your raw data to any LLM.'
stack: ['FastAPI', 'Next.js 14', 'PostgreSQL', 'Polars', 'SciPy', 'scikit-learn', 'Ollama']
hardware: 'Developed on RTX 4050 (6GB) / Ryzen 7; local LLM via Ollama by default.'
cost_profile: '~$0 with the default local Ollama backend; optional OpenAI/Groq backends billed at their list prices.'
privacy: 'Only computed facts — never raw rows — ever reach the model. With the default local backend, data need not leave the machine.'
human_in_the_loop: 'Model recommendations are advisory and confidence-scored; the analyst chooses what to act on.'
limitations:
  - 'Tabular CSV input only — no images, text corpora, or streaming data.'
  - 'The model recommender is a confidence-scored suggestion, not a substitute for domain-aware modeling.'
  - 'Narrative quality depends on the chosen local model; small models give thinner explanations.'
failure_modes:
  - 'When no LLM is available it falls back to deterministic, rule-based summaries rather than failing.'
  - 'Malformed or unsafe uploads are rejected up front (binary + formula-injection checks) instead of being processed.'
reproduce:
  command: 'git clone https://github.com/Dumee-25/DataSense && cd DataSense'
  environment: 'Python 3.11+ (FastAPI, Polars), Node 18+ (Next.js 14), PostgreSQL; Ollama for local inference. See repo README.'
  runtime: 'Analysis of a typical CSV completes in seconds to a minute, depending on size and the chosen LLM backend.'
  expected_output: 'A statistical audit, up to 14 relevant charts, a confidence-scored model recommendation, and a formatted PDF report.'
receipts:
  - { label: 'repository', url: 'https://github.com/Dumee-25/DataSense' }
last_verified: 2026-06-28
---

A 7-step async pipeline that profiles a dataset, runs the statistics, recommends
an ML approach, and explains the findings using **deterministic summarization +
local LLMs** — so only computed facts, never raw rows, ever reach the model.

## What it does

- **Analysis** — structural profiling, quality checks, correlation/outlier/skew
  detection, subgroup-reversal (Simpson's paradox) flags, PCA and clustering,
  automatic target detection, and a confidence-scored **model recommender**.
- **Privacy-aware LLM layer** — pluggable across **Ollama (local, default) /
  OpenAI / Groq**; deterministic fact extraction, response caching, and a
  rule-based fallback when no LLM is available.
- **Output** — 14 auto-generated charts (shown only when relevant) and a
  formatted **PDF report**.
- **Production touches** — per-IP rate limiting, upload validation (binary +
  formula-injection checks), concurrency control, and structured rotating logs.

## Paper

The method is written up as *"Privacy-preserving automated exploratory data
analysis using deterministic summarization and local large language models,"*
**accepted for oral presentation (to appear).** A link will be added here as a
receipt once the proceedings are published.
