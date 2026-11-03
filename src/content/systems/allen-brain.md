---
title: 'Allen Brain Analytics: A Warehouse and Explorer for the Human Brain Atlas'
order: 7
status: prototype
summary: 'Coursework in data warehousing and visualisation, in progress. The Allen Human Brain Atlas in a PostgreSQL warehouse that holds the brain''s anatomical hierarchy, with mining that measures how much a random split flatters a region classifier, and a linked explorer.'
stack: ['PostgreSQL', 'pandas', 'scikit-learn', 'mlxtend', 'Dash', 'Docker Compose']
hardware: 'Developed on RTX 4050 (6GB) / Ryzen 7; the warehouse runs in Docker and holds 57.9 million expression facts.'
cost_profile: '$0: public data and local tools only.'
privacy: 'The Allen data are public, de-identified post-mortem data, used under the Allen Institute''s terms of use and cited. The raw downloads are not committed; their checksums are.'
limitations:
  - 'Six donors. Every result about donors rests on six people.'
  - 'Probes were chosen using all six donors, so the donor held out in one design helped choose them. The size of that leak is measured separately rather than assumed away.'
  - 'Association rules only recover the coarse divisions: 3 of 26 regions appear at all, because a minimum support of 0.05 already means 185 samples.'
failure_modes:
  - 'A warehouse load runs in one transaction and is checked against the ETL. A failed load leaves the previous warehouse as it was.'
  - 'Where a donor has too few samples in a region, the explorer says "no data" instead of drawing a value.'
  - 'Every version of each OLAP query is checked to give the same answer before it is timed.'
reproduce:
  command: 'git clone https://github.com/Dumee-25/allen_human && cd allen_human && uv sync && docker compose up -d && uv run python -m etl && uv run python -m etl.load_warehouse'
  environment: 'uv with Python 3.12+, and Docker for PostgreSQL 16. The downloads are about 1.7 GB.'
  runtime: 'The ETL takes about 75 seconds once the downloads are in, loading the warehouse about five minutes, and building its materialised view about eleven.'
  expected_output: 'A warehouse of 57.9 million expression facts, the OLAP query results, and the explorer at http://127.0.0.1:8050.'
receipts:
  - { label: 'repository (private for now)', url: 'https://github.com/Dumee-25/allen_human' }
last_verified: 2026-11-03
---

Coursework for two modules, Data Warehousing and Data Mining and Data
Visualization, running until 27 November 2026. The atlas's microarray data (six
donors, 3,702 tissue samples, 58,692 probes) sit in a snowflake warehouse whose
region dimension holds the full anatomical hierarchy.

## The headline result

A random split flatters a brain-region classifier by 0.270 of balanced accuracy.
Logistic regression scores 0.831 when samples are split at random, and 0.561 when
both the donor and the brain structure are held out. Holding out a structure
costs about twice what holding out a donor costs. With the right hemisphere's
samples added the gap is 0.274, so the result is not an artefact of studying one
side.

## Other findings

- A baseline that sees only three coordinates falls from 0.747 to 0.539 as the
  split gets stricter, and what gene expression adds on top of it shrinks from
  +0.084 to +0.022.
- Clustering with no labels agrees with anatomy best at depth 3 of the tree
  (adjusted Rand index 0.751), above the levels most samples are labelled at.
- Substantia nigra seemed to collapse under one design (0.897 to 0.054). With
  both hemispheres in it recovers to 0.500: a small-sample effect, not a fact
  about the tissue.

## Still to come

The explorer will be tested against the official Allen viewer with real users,
and two optional stages add a knowledge graph and plain-English queries.
