---
title: 'DataSense v2: can privacy leakage be measured, and LLM output checked against computed facts?'
order: 1
status: ongoing
venue: 'In preparation for ICARC. The extended version of the NSRSIT 2026 paper.'
summary: 'The NSRSIT paper kept raw rows away from the model. The extended version asks whether that privacy can be measured rather than assumed, and whether every number the model writes can be checked. DataSense v2 is built for it, and the benchmark is measuring detection now.'
method: 'One harness runs every measurement against the engine frozen at v2.0.0, saves each record with the code it came from, and rebuilds every table and figure from those records. Detection is scored on problems planted in 50 OpenML tables and 15 synthetic ones, on real errors in dirty tables with known clean versions, and on the recommender against three trained models. Privacy attacks on each tier, the quality of the model''s text and the baselines come next.'
open_questions:
  - 'Does the strict tier stop an attacker? Record reconstruction, membership inference and an attacker model given the exact prompt have not been run yet, so the privacy claims are still untested.'
  - 'What does checking every number cost? Faithfulness, latency across local models, and an LLM judge checked against human ratings are planned but not measured.'
  - 'Why does the recommender fail on regression? It named a linear model for 7 of 10 regression tables and each came last, because its rules look at the condition of the data and not at whether the relation bends.'
receipts: []
last_verified: 2026-11-03
---

What the benchmark has measured so far, on the frozen `v2.0.0` engine:

- **Planted problems.** In 50 OpenML tables, 4,644 of 5,421 planted problems
  were found, and 21 of the 34 planted types were found every time.
- **Real errors.** On Raha's dirty tables, a data-quality finding named 27 of
  the 55 columns with wrong cells, and 27 of the 35 columns it named do have
  wrong cells. It finds gaps, placeholders and mixed units, and misses typos.
- **Personal data.** Every kind is flagged when the column's name says what it
  holds. With the name model, it recognises 64% of Tamil names and 74% to 80% of
  the others.
- **The recommender.** In 40 classification tables the recommended model was
  the best of three in 20, only a little more often than always choosing
  LightGBM (18).

Status: **in preparation**, with ICARC as the target. The
[system page](/systems/datasense) describes what v2 does.
