---
title: 'OWL — Datacenter AI Operations Platform'
order: 1
status: prototype
summary: 'An agentic, RAG-powered operations assistant for datacenter infrastructure, with real-time anomaly detection and LLM root-cause analysis built in.'
stack: ['Gemini', 'ChromaDB', 'MCP', 'PyTorch', 'scikit-learn', 'FastAPI', 'React 19']
hardware: 'Developed on RTX 4050 (6GB) / Ryzen 7; Gemini inference is API-served.'
cost_profile: 'Per-call latency & cost metered in-app; Gemini API-served, so cost scales with query volume.'
privacy: 'Telemetry processed locally; assistant queries call the Gemini API — prompt text leaves the device for LLM calls.'
human_in_the_loop: 'By design: no infrastructure actuation. Every alert carries a confidence score for operator review.'
limitations:
  - 'Trained and evaluated on a custom simulator, not real production datacenter telemetry — external validity is unproven.'
  - 'The assistant depends on the Gemini API; offline or rate-limited operation is not supported for LLM features.'
  - 'Anomaly thresholds are tuned to the simulated distribution and would need re-calibration on real hardware.'
failure_modes:
  - 'The point/sequence ensemble can raise false positives on novel-but-benign patterns; the alert manager surfaces confidence rather than auto-acting.'
  - 'If the Gemini API is unavailable, root-cause analysis and report generation degrade gracefully — detection and the live console keep running.'
reproduce:
  command: 'git clone https://github.com/Dumee-25/OWL-Datacenter_agent && cd OWL-Datacenter_agent'
  environment: 'Python 3.11+ backend, Node 18+ for the React 19 console; see repo README for service start.'
  runtime: 'Simulator + services start in minutes on a laptop; full 18-month data generation is longer.'
  expected_output: 'Live operations console with streaming telemetry, the RAG assistant, and generated incident reports.'
receipts:
  - { label: 'repository', url: 'https://github.com/Dumee-25/OWL-Datacenter_agent' }
last_verified: 2026-06-28
---

End-to-end platform that streams datacenter telemetry, answers operator questions
through a hybrid-RAG assistant, generates LLM root-cause analysis, and surfaces it
all in a live operations console.

## Architecture

- **Agentic RAG assistant** — hybrid retrieval (vector + keyword) over ChromaDB
  with recency/LLM re-ranking, served by Gemini and exposed as REST, WebSocket,
  and an **MCP server** (9 tools).
- **Detection layer** — an ensemble of **Isolation Forest** (point anomalies) and
  an **LSTM Autoencoder** (sequence anomalies) feeding a state-machine alert
  manager and Gemini-generated incident reports.
- **Data** — a custom simulator producing **~4.7M rows over 18 months**
  (44 columns, 18 event types) with a temporal holdout split.
- **Engineering** — an async FastAPI backend, a React 19 console, ReportLab PDF
  reports, and per-call latency/cost metrics.

## Built responsibly

Human-in-the-loop by design — the system never actuates infrastructure. It ships
with a dedicated ethics document and renders a confidence value on every alert,
so an operator decides what happens next.
