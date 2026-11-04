---
title: 'DataSense: Privacy-Preserving Automated EDA'
order: 2
status: prototype
summary: 'Upload a data file and get a statistical audit, a model recommendation and plain-language findings. Version 2 runs on your own machine, lets a privacy tier decide what an AI prompt may contain, and checks every number the AI writes against computed facts.'
stack: ['FastAPI', 'React 19', 'Polars 2', 'SQLite', 'Ollama', 'Presidio', 'OpenDP', 'Vega-Lite']
hardware: 'Developed on RTX 4050 (6GB) / Ryzen 7; local LLM via Ollama by default.'
cost_profile: '~$0 with the default local Ollama backend; optional OpenAI/Groq backends billed at their list prices.'
privacy: 'The server only accepts connections from this computer, results stay in a local SQLite file, and the default model runs in Ollama. The AI never sees the raw file: a privacy tier decides what a prompt may hold, the strict tier never calls a remote model, and an optional differential-privacy mode sends only noisy numbers.'
human_in_the_loop: 'The recommended model carries a rule score, not a probability, and the analyst decides what to act on. Cleaning fixes that lose information stay off until the user ticks them.'
limitations:
  - 'It misses errors that look valid. On real dirty tables it finds gaps, placeholders, numbers written as text and mixed units, but not typos or well-formed wrong values.'
  - 'The model recommender is rule-based. It picked the best of three trained models in 20 of 40 classification tables, but named a linear model for 7 of 10 regression tables, and each of those came last.'
  - 'Personal data inside free text is found less reliably than whole columns: phone and card numbers inside notes are never flagged, and names that include a house name are missed.'
failure_modes:
  - 'If the AI writes a number that is not in the facts it cites, its text is replaced by the rule-based version and the failure is recorded.'
  - 'With no AI provider available, it still gives rule-based insights instead of failing.'
  - 'A file that is not a known format is refused before it is parsed, and a compressed file is capped on how much it may unpack.'
reproduce:
  command: 'git clone https://github.com/Dumee-25/DataSense && cd DataSense && uv sync && (cd frontend && npm ci && npm run build) && uv run datasense serve'
  environment: 'uv (installs Python 3.12+ and the locked dependencies), Node.js 22.22+ to build the web app, and Ollama for local AI insights. No database setup.'
  runtime: 'With no model, the benchmark runs on 50 OpenML tables took a median of 4 seconds each. The AI step adds time that depends on the model.'
  expected_output: 'The app at http://127.0.0.1:8000: an audit with a quality score, up to 13 charts, a recommended model with a scikit-learn Pipeline, a cleaning script, a datasheet and a PDF report.'
receipts:
  - { label: 'repository', url: 'https://github.com/Dumee-25/DataSense' }
  - { label: 'paper — NSRSIT 2026 (pp. 146–150)', url: 'https://nsrsit.nsbm.ac.lk/assets/proceedings/student_symphosium_2026.pdf' }
home:
  rank: 1
  line: 'Upload a data file, get a statistical audit, a model recommendation and plain-language findings. Every number the AI writes is checked against computed facts.'
  meta: 'Runs locally, about $0 with Ollama'
  limit: 'Misses errors that look valid, such as typos.'
  also: { label: 'Also a paper: NSRSIT 2026', href: '/inquiry/privacy-eda' }
last_verified: 2026-11-03
---

DataSense v2 rebuilds the system from the NSRSIT paper. The idea is the same:
compute the statistics first and give the model only facts, never raw rows. What
changed is how much of that can now be checked. Version 2 is tagged `v2.0.0`, and
v1 is kept at `v1.0.0`.

## What it does

- **Analysis.** Profiling, quality checks mapped to ISO/IEC 25012, leakage
  detection, why values are missing, outliers found three ways, a fairness
  audit, time-series checks and a model recommender, with bootstrap intervals
  and a correction for how many tests were run.
- **Trust layer.** Privacy tiers decide what a prompt may contain. Personal data
  is found with Presidio before anything is summarised. Text that reads like an
  instruction to the model is removed. Every number the model writes is looked
  up in the facts it cites.
- **Ask your data.** A chat that answers through tools that count rows on your
  computer, shows no number over fewer than *k* rows, and refuses pairs of
  questions that would single out a few rows. An optional differential-privacy
  mode gives the model only noisy numbers.
- **Several files.** Batch, Stack, Compare and Relate, for exports split across
  files and for tables linked by keys.
- **Output.** Vega-Lite charts, a PDF report, a Polars cleaning script built
  from templates rather than by the model, and a datasheet following Gebru et
  al.

## Benchmark

The extended paper's numbers come from one harness run on the frozen `v2.0.0`
engine. So far it has measured detection: 4,644 of 5,421 problems planted in 50
OpenML tables were found. The privacy attacks and the checks of the model's
text are still to come. The [inquiry entry](/inquiry/datasense-v2) has the
details.

## Paper

The method is published as *"Privacy-preserving automated exploratory data
analysis using deterministic summarization and local large language models,"* in
the **NSBM Student Research Symposium on Innovation Technology (NSRSIT) 2026**
proceedings (pages 146 to 150), where it won **Best Overall Research** for the
session. See the [inquiry write-up](/inquiry/privacy-eda) for the question and
method. The extended version, built on v2, is in preparation for ICARC.
