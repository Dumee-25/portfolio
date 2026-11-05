---
title: 'Proxy labels versus observed endpoints: an audit and benchmark of clinical benefit prediction on MSK-CHORD'
order: 5
status: ongoing
venue: 'In preparation for ICITR 2026, which has been postponed.'
authors:
  - { name: 'Dumindu Kumarapeli', role: 'first author' }
  - { name: 'Hiruni Weerasinghe' }
summary: 'A model trained on a hand-built response label can score well because the scoring rules are learnable, not because it predicts benefit. I audited one such label on 24,950 MSK-CHORD patients, then benchmarked five model families on endpoints observed in dated records.'
method: 'Reproduce the original pipeline and trace every fix to its effect on the AUC. Build observed endpoints from dated treatment and radiology records, with a feasibility gate fixed before any count was computed. Rebuild the features so that none uses a record dated after sequencing, and test that by deleting every later record and checking the table comes out identical. Compare elastic-net logistic regression, random forest, XGBoost, LightGBM and CatBoost in patient-grouped nested cross-validation, with a feature-group ablation, negative and positive controls, a temporal hold-out and a leave-one-cancer-type-out check.'
open_questions:
  - 'Does any of it hold outside one institution? Every check so far is internal to MSK-CHORD: random patient-grouped folds, a temporal split that orders patients by a proxy for registration date, and a held-out cancer type that crosses diseases but not centres. External validation has not been done.'
  - 'How much of the six-month endpoint is the radiology pipeline? Progression calls are model output from radiology reports and are only seen when a scan happens, so the endpoint inherits whatever that model misses.'
  - 'Why does PD-L1 not come out as expected? TMB and MSI recover their known direction after immunotherapy, but PD-L1 does not reach significance in lung cancer, and its status is recorded for only 1,125 of the 2,076 treated lung patients. The null may be about recording rather than biology.'
receipts: []
home:
  rank: 3
  line: 'An audit of one hand-built response label across 24,950 patients. A model can score well by learning the label''s rules rather than predicting benefit.'
  meta: 'Grew out of a rejected paper'
last_verified: 2026-10-16
---

This is the second attempt at the oncology work. The
[first paper](/inquiry/oncology-proxy) trained a classifier on a hand-built
response index and was rejected. Instead of patching it, this paper asks whether
the index measured benefit in the first place.

What it found:

- Reproducing the original pipeline exposed a text-matching bug. A search for
  "prior medications" also matched "no prior medications", so 14,853 untreated
  samples were scored as pre-treated. Fixing it left the AUC at 0.801, so the
  AUC could not see the error. Across reasonable choices of threshold and
  medians, up to 41.5% of labels flip.
- The index agrees only moderately with observed six-month progression-free
  benefit (AUC 0.726).
- On that observed endpoint, boosted trees reach a within-cancer-type AUC of
  0.776, and regularised logistic regression is 0.016 lower.
- Administrative fields add 0.015 to the AUC on the constructed label and
  nothing on the observed endpoint.
- Testing on later patients costs at most 0.011 AUC. Holding out a whole cancer
  type costs 0.033.

Status: **in preparation.** ICITR 2026 was postponed, so the paper has not been
submitted yet. This is a research artifact, **not a clinical decision tool or a
medical device.**
