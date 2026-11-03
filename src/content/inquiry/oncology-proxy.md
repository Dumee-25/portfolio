---
title: 'A composite clinical proxy for durable clinical benefit in oncology'
order: 6
status: rejected
venue: 'Rejected. The work continues as a separate audit paper, now in preparation.'
summary: 'A classifier trained on a hand-built response index for durable clinical benefit, using real-world clinicogenomic data from MSK-CHORD. It reached an AUC of 0.815 on one hold-out split. The paper was rejected, and auditing the index afterwards showed the number said less than it seemed.'
method: 'A composite response index scored each patient from overall survival against a peer group, vital status and two baseline facts, and a gradient-boosted classifier learned to predict it.'
open_questions:
  - 'Was the index ever the right target? It agrees only moderately with observed six-month progression-free benefit (AUC 0.726), and survival, one of its ingredients, cannot validate it on its own.'
  - 'Can a hand-built label be stable enough to train on? Across reasonable thresholds and medians, up to 41.5% of labels flip, so small design choices change who counts as a responder.'
receipts: []
last_verified: 2026-10-16
---

Status: **rejected.**

What I learned from it:

- A high AUC on a constructed label can mean the model learned the recipe. The
  same features reach 0.853 on the index label, against 0.776 on an endpoint
  observed in the records.
- The AUC did not notice a real bug. A text match on "prior medications" also
  matched "no prior medications" and scored 14,853 untreated samples as
  pre-treated, yet no single fix moved the AUC by more than a few thousandths.
- Some features carried information from after sequencing, such as tumour-site
  flags taken from any radiology report, ever.

Rather than patch this paper, I rebuilt the work around observed endpoints:
[Proxy labels versus observed endpoints](/inquiry/proxy-labels).
