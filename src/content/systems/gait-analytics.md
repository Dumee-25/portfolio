---
title: 'Gait Analytics: A Warehouse and Knowledge Graph for Neurodegenerative Gait'
order: 6
status: prototype
summary: 'Coursework in data warehousing and visualisation, in progress. Gait recordings from 63 people, with Parkinson''s, Huntington''s, ALS or none, in a PostgreSQL star schema and an RDF knowledge graph, with mining, plain-English queries and a linked dashboard on top.'
stack: ['PostgreSQL', 'Apache Jena Fuseki', 'RDF', 'scikit-learn', 'Ollama', 'Dash', 'Docker Compose']
hardware: 'Developed on RTX 4050 (6GB) / Ryzen 7; PostgreSQL and Fuseki run in Docker.'
cost_profile: '$0: no paid API. The plain-English query test ran its model through Ollama.'
privacy: 'The data are PhysioNet''s public Gait in Neurodegenerative Disease database, used under its Open Data Commons Attribution licence and cited. The raw files are not committed.'
limitations:
  - 'A small sample: 63 people. One recording was excluded because a stuck sensor left nothing usable, and two others carry sensor dropouts.'
  - 'The plain-English query test hit a ceiling. Both SQL and SPARQL scored 100%, so at this size it cannot show whether the knowledge graph helps translation.'
  - 'Clustering finds severity, not diagnosis. The most natural split into two groups matches the clinical groups no better than chance.'
failure_modes:
  - 'A recording too broken to use is excluded and the exclusion is stated, rather than cleaned until it looks normal.'
  - 'The first query run was confounded: the SQL prompt knew the allowed values of a column and the SPARQL prompt did not, which made a false gap (0.96 against 0.92). It is kept, labelled, and the comparison was rerun with matched prompts.'
  - 'Classification leaves one person out at a time, so no one''s gait is in both training and testing.'
reproduce:
  command: 'git clone https://github.com/Dumee-25/gait_analytics && cd gait_analytics && cp .env.example .env && docker compose up -d && pip install -e ".[dev,nlq]"'
  environment: 'Docker for PostgreSQL 16 and Apache Jena Fuseki, and Python with the project installed. Then the etl and kg modules run in order, as the README lists.'
  runtime: 'Not timed. The GaitNDD download is about 1.3 MB.'
  expected_output: 'A star schema of 1,421 ten-stride windows from 63 people and a knowledge graph of 27,795 triples, linked to the Mondo and HPO disease ontologies.'
receipts:
  - { label: 'repository (private for now)', url: 'https://github.com/Dumee-25/gait_analytics' }
last_verified: 2026-11-03
---

Coursework for two modules, Data Warehousing and Data Mining and Data
Visualization, running until 27 November 2026. Gait features are stored in a
PostgreSQL star schema and exported one way into an RDF knowledge graph, so the
same data can be asked about through SQL or through the disease hierarchy.

## What it found so far

- **Classification.** Gait features tell the four groups apart at 0.62 to 0.65
  balanced accuracy, against 0.25 for always guessing the largest group and
  0.505 for age alone. Over five seeds the forest gives 0.624 ± 0.008, so its
  best single run (0.648) is not the number to quote.
- **Clustering.** The structure in the data is not diagnosis. Severity carries
  most of the variation, so unsupervised methods miss what classification finds.
- **Plain-English queries.** A model translated 50 questions into SQL and
  SPARQL at 100% in every condition. That is a ceiling, not a win for either:
  the schema is small enough that neither fails.
- **A sanity check.** Stride variability rises from controls (1.87%) to ALS
  (2.95%), Parkinson's (3.37%) and Huntington's (6.42%), in line with the study
  that published the data.
