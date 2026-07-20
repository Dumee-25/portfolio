---
title: 'Seshat — Local-First Research Memory'
order: 3
status: prototype
summary: 'Passively watches a researcher''s notebooks, scripts, outputs, and papers, then reconstructs what was tried and why — answerable from a desktop cockpit, fully on-device.'
stack: ['Python', 'FastAPI', 'React', 'Ollama', 'ChromaDB', 'SQLite', 'bge-small-en-v1.5', 'PyInstaller']
hardware: 'Developed on RTX 4050 (6GB) / Ryzen 7; embeddings run on CPU, LLM via local Ollama (default qwen3:8b).'
cost_profile: '~$0 — capture, embeddings, and inference are all local; no API calls in the default configuration.'
privacy: 'Local-first by design: watched files, generated journals, and embeddings stay on the machine — nothing is sent to an external service.'
human_in_the_loop: 'Inferred session intent is LLM-generated and confidence-scored; the cockpit lets the researcher confirm or correct each inferred intent inline rather than take it as fact.'
limitations:
  - 'Capture only watches a fixed set of file types (notebooks, scripts, outputs, PDFs) — reasoning done outside those files is never seen.'
  - 'Journaled "intent" is LLM-inferred, not ground truth; it can confidently misread why an experiment was run.'
  - 'The cockpit rebuild dropped session detail views: clicking a citation jumps to the timeline entry, but the underlying notebook/script/commit diffs behind it are no longer reachable from the UI — a regression from the old Streamlit interface, not yet rebuilt.'
failure_modes:
  - 'Summary quality is bounded by the local model; smaller models than the default qwen3:8b produce thinner, less reliable session summaries.'
  - 'If the watcher misses or mis-diffs a change, that reasoning step simply never enters the index rather than failing loudly — a silent gap, not a crash.'
  - 'A parity check during the Streamlit-to-React migration caught one missing feature (intent confirm/correct) and stopped looking, so it missed a second regression (citations losing their diff view) entirely — a reminder that "we checked parity" needs a checklist, not a feeling.'
reproduce:
  command: 'git clone https://github.com/Dumee-25/Seshat && cd Seshat'
  environment: 'Python 3.11+; Ollama for local inference (default qwen3:8b); bge-small-en-v1.5 embeddings on CPU. See repo README.'
  runtime: 'Capture is incremental and runs in the background; the first index of an existing project scales with its file count.'
  expected_output: 'seshat init && seshat backfill && seshat watch, then seshat cockpit opens a packaged desktop app (FastAPI + React) with a session timeline, hybrid search, and inline intent confirm/correct.'
receipts:
  - { label: 'repository', url: 'https://github.com/Dumee-25/Seshat' }
last_verified: 2026-07-16
---

A local-first memory for research work. Researchers forget what they already
tried and why an approach was abandoned; Seshat watches the working files as they
change and reconstructs that reasoning into something you can simply ask about —
without any of it leaving the machine.

## Architecture

A four-layer pipeline over append-only event storage, so the raw record stays
intact no matter how the higher layers evolve:

- **Capture** — a filesystem watcher that diffs notebooks at the cell level,
  tracks script changes, and indexes experiment outputs. Zero required input;
  capture is passive.
- **Journaling** — a local LLM (Ollama, default **qwen3:8b**) writes structured
  session summaries with an inferred intent, each marked with a confidence score.
- **Paper linkage** — PDFs are embedded (**bge-small-en-v1.5**, on CPU) and
  connected to the sessions they relate to.
- **Query** — hybrid vector + structured search over **ChromaDB** and
  **SQLite**, surfaced through the **Cockpit**: a packaged desktop app (FastAPI
  backend, React frontend) with a day-grouped session timeline and inline
  intent confirm/correct.

## Why local-first

The whole point is a memory you can trust with unpublished work, so every stage —
watching, embedding, journaling, and answering — runs on-device by default.
Nothing is sent anywhere for the system to do its job.
