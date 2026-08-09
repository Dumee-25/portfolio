---
title: 'Argus — does a fused belief map stay honest when its sensors fail?'
order: 1
status: ongoing
venue: 'Self-directed simulation study — the core of the search-and-rescue drone work (internal report, 6 August 2026)'
summary: 'A search system that holds one probability distribution over map cells is only useful if its stated confidence means something. Three differently-flawed sensors are fused into one belief, scored for calibration rather than accuracy, then put under sensor failure to see whether the honesty survives.'
method: 'Repeated Bayesian update in log space over a 20×20 grid — each reading becomes a likelihood field multiplied into the belief and renormalised, with no arbitration step. The belief is scored for calibration (reliability, ECE, signed gap) reported beside sharpness, rather than for accuracy alone. Every failure mode is injected through a wrapper, so the sensor models themselves stay exactly as validated.'
open_questions:
  - 'What does a search policy do when the sensor it steers has drifted? Every failure result so far used a fixed schedule and every policy result used healthy sensors, so it is unknown whether an agent choosing where to look from an already-corrupted belief compounds the error or merely inherits it.'
  - 'Can cross-sensor residuals detect drift from outside the belief? A drifted sensor disagreeing with a healthy one is observable even while the fused belief looks entirely normal — but detection delay against drift magnitude has not been measured.'
  - 'Is the wedge-shaped acoustic likelihood worth its implementation cost? Fusion beats thermal alone, but thermal+acoustic against thermal+Wi-Fi on identical worlds has not been run, so the gain cannot yet be attributed to the wedge.'
receipts: []
last_verified: 2026-08-06
---

## The question

Does a fused belief map stay honest about its own confidence when sensors drop
out or start lying — and does it stay more honest than any single sensor would
on its own?

The word doing the work is **honest**. A map that puts its highest number on the
right cell most of the time is easy to build. A map whose stated 70% actually
corresponds to being right about 70% of the time is harder, and it is the
property that matters operationally: a search team acting on a confidently wrong
map wastes the window in which the person is still findable.

## Why simulation

Calibration can only be measured honestly where the ground truth is known
exactly. Establishing that a stated 70% is right 70% of the time needs a large
number of trials with a known answer, and real flight data does not provide a
thousand trials with a known answer.

## What the failure-free numbers are, and are not

Every configuration — each sensor alone and all three fused — is calibrated to
within ±0.002. That is **not** a result about fusion. With a uniform prior over
uniformly placed targets and a likelihood matching the generative model, the
posterior is calibrated by construction. The baseline validates the
implementation; calibration only becomes informative once the model is
misspecified.

What fusion actually buys is usefulness: hit rate 0.378 → 0.429 and entropy
2.09 → 1.79 nats, at unchanged honesty.

## Where it breaks

- **Overtrust is catastrophic; distrust is nearly free.** Told a sensor never
  falls for a decoy when it truly does 35% of the time, the map does not merely
  mislabel its confidence — it gets *sharper* and far wronger at once. Told the
  same sensor fails 90% of the time, an absurd slander, accuracy barely moves.
  Trust parameters should be rounded pessimistically.
- **Persistent bias and inflated noise are different failures.** At matched
  added error, bias is roughly five times more damaging, because drifted
  readings all agree with one another and the belief concentrates confidently
  on the wrong cell.
- **Drift is invisible from inside the belief.** Under fog the system half-reports
  its own problem — entropy climbs, stated confidence falls. Under drift both are
  indistinguishable from healthy. Entropy monitoring will catch fog and will
  never catch drift.
- **Missing evidence leaves an honest posterior; wrong evidence does not.** A
  full dropout sweep to total sensor loss never moves the gap past −0.019.
- **Fusion never rescues a confidently wrong sensor**, in any failure mode
  tested. There is no arbitration step by which two healthy sensors could
  out-vote a third that is lying — by design.

## The metric can select the worst system

At a dropout rate of 1.0 with a single sensor the belief never updates. It
states 1/400, is right 1/400 of the time, and scores a flawless calibration
error at maximum entropy. Report ECE without sharpness beside it and that
configuration wins the study. The acoustic sensor does the same thing more
subtly: best ECE and best Brier score of any configuration, while finding the
target 1.3% of the time.

## Choosing where to look

With a sensor that must be pointed and sees only its own footprint, scoring
viewpoints by expected information gain beats chasing the most likely cell on
accuracy while flying 32% less far — and random motion is worth no more than
standing still. No policy disturbs calibration, which was not a foregone
conclusion: choosing where to look on the basis of the belief so far is the
classic shape of a biased estimator.

---

This is **ongoing**. No hardware, no ROS, and no C++ in this phase — this
codebase is the reference implementation the port will be validated against. The
open questions above are the parts that are genuinely unsettled, not rhetorical.

The working name fits: Argus had a hundred eyes and still got fooled.
