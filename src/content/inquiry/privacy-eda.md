---
title: 'Privacy-preserving automated exploratory data analysis using deterministic summarization and local large language models'
order: 0
status: published
venue: 'NSRSIT 2026 · Best Overall Research'
method: 'Deterministic fact extraction runs the statistics first; only those computed facts — never raw rows — are passed to a local LLM (via Ollama) that writes the narrative. Backends are pluggable (local Ollama / OpenAI / Groq) with a rule-based fallback when no model is available.'
summary: 'My first published paper. An automated EDA pipeline that profiles a dataset, runs the statistics, and explains the findings using deterministic summarization plus local LLMs — so only computed facts, never raw rows, reach the model. Won Best Overall Research at NSRSIT 2026.'
open_questions:
  - 'How well does facts-only summarization hold up on very wide or messy real-world tables, versus the cleaner CSVs used to develop it?'
  - 'Where does narrative quality break down as the local model shrinks — and what is the smallest model that still explains results faithfully?'
  - 'Which kinds of statistical insight resist faithful natural-language summarization without distorting or leaking the underlying data?'
receipts:
  - { label: 'proceedings — NSRSIT 2026 (pp. 146–150)', url: 'https://nsrsit.nsbm.ac.lk/assets/proceedings/student_symphosium_2026.pdf' }
  - { label: 'implementation — DataSense', url: 'https://github.com/Dumee-25/DataSense' }
last_verified: 2026-07-11
---

My first published research, presented at the **NSBM Student Research Symposium
on Innovation Technology (NSRSIT) 2026** (Faculty of Computing, NSBM Green
University), where it received the **Best Overall Research** award for the
session.

## The question

Automated EDA tools increasingly hand a dataset to an LLM to get a readable
narrative — but doing that sends the raw data, row by row, to the model. Can you
get the same plain-language explanation of a dataset *without* the raw rows ever
reaching the LLM?

## The approach

Compute first, narrate second. A deterministic layer profiles the data, runs the
statistics (quality checks, correlation/outlier/skew detection, subgroup-reversal
flags, PCA and clustering, a confidence-scored model recommendation), and only
the **resulting facts** are passed to the language model to phrase. The LLM layer
is pluggable across local Ollama (default), OpenAI, and Groq, and falls back to
rule-based summaries when no model is available — so the privacy guarantee holds
by construction, not by policy.

The method is implemented and running as the [DataSense](/systems/datasense)
system — see that case study for the architecture and reproduce block.
