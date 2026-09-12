---
title: 'Timescale separation and model reduction in operational dengue forecasting'
order: 2
status: accepted
venue: 'ICCMM 2026, the International Conference on Computational and Mathematical Modelling, hosted by the Centre for Mathematical Modelling, Department of Mathematics, Faculty of Science, University of Colombo, in collaboration with the 33rd FAI International Conference. Colombo, 12 to 14 November 2026. Accepted for oral presentation.'
authors:
  - { name: 'Dumindu Kumarapeli', role: 'first author, presenting' }
  - { name: 'Hiruni Weerasinghe', role: 'corresponding author' }
method: 'An eight-state host-vector SEI-SEIR compartmental model coupled to an LSTM through a differentiable Runge-Kutta solver, trained end to end on district-level weekly case data. Each candidate reduction is then integrated at the same fitted parameters as the full model, so the only thing that differs between the two runs is the reduction itself.'
summary: 'Mosquito-borne disease models are routinely simplified by assuming mosquito dynamics are too fast to matter. Over a twelve-week forecast the comparison that licenses that step inverts: the infected mosquito outlasts the infectious human by about four times. Accepted for oral presentation at ICCMM 2026.'
open_questions:
  - 'How much of the inversion is a property of dengue and how much is a property of these fits? The ratio was measured across 28 fitted runs of one architecture on Sri Lankan district data. Nothing yet establishes that a differently specified host-vector model on different data lands in the same place.'
  - 'Where is the crossover? The standard reduction fails at a twelve-week horizon and the loop-cutting one holds, but the horizon at which the standard reduction would become safe has not been located, so the result is a warning about this operating point rather than a boundary.'
  - 'Is the re-seeding dominance real or self-inflicted? Almost every infectious mosquito in the fitted model arrives through weekly re-seeding from observed cases rather than through transmission. If that is an artefact of how the model is driven rather than a property of the system, the reduction result means something narrower than it appears to.'
receipts: []
last_verified: 2026-09-12
---

## The assumption I started with

Models of mosquito-borne disease almost always simplify the mosquito away. The
justification is a timescale argument and it sounds obvious. Mosquitoes live
weeks, humans live decades, so mosquito dynamics are fast compared to human
ones. Assume the mosquito compartments settle instantly, solve them out, and
carry on with a smaller model. This is a quasi-steady-state reduction and it is
close to standard practice.

I set out to apply it. It did not survive the move to forecasting.

## The wrong pair of numbers

The textbook argument compares a mosquito lifespan to a human lifespan. For a
forecast that is the wrong comparison. Nothing in a twelve-week forecast depends
on how long a human lives. What the reduction actually requires is that the
compartment being removed relaxes quickly compared to the compartment left
behind, and those are the infected mosquito and the infectious human.

Measured that way the ordering flips. An infected mosquito stays infectious for
about four weeks. An infectious person stays infectious for about one. The state
the reduction wants to treat as instantaneous is the slower of the two, by
roughly a factor of four.

## What the numbers say

The small parameter the reduction needs is the ratio of infected mosquito
residence time to human infectious period. It is valid when that ratio is much
smaller than 1.

Across 28 fitted models the median is **4.04**, the range runs 3.15 to 5.04, and
not one run falls below 1. Infected mosquito residence sits between 4.05 and
4.15 weeks against an infectious human period of 0.83 to 1.32 weeks. The
assumption is not marginal here. It is inverted.

The cost is measurable. Integrating the standard reduction at the same fitted
parameters moves predictions by 1.20 to 6.29 log units and drops median
Nash-Sutcliffe efficiency from 0.406 to **-0.225**. In 25 of 28 runs the
simplified model forecasts worse than the model it was meant to simplify.

## The reduction that does hold

There is a second reduction available and it is close to the opposite move. The
standard one closes the transmission loop and assumes it equilibrates. This one
cuts the loop instead.

It works. Across the 17 runs where the loop carries least traffic it reproduces
the full model to within 0.019 log units, and in all 28 runs it leaves one-week
forecast skill at least as high as the full model. Nothing is paid for the
simplification at short horizons.

The reason is visible in the fits. Between 96.1 and 99.99 percent of infectious
mosquitoes in the fitted model arrive through weekly re-seeding from observed
case data rather than through transmission inside the model. The loop that the
standard reduction spends all its effort on is carrying almost nothing.

## What this is, and what it is not

This is a correction to how one family of models is simplified. It does not
solve dengue forecasting and it does not make the full model good. The claim is
narrower than that: the timescale justification that licenses the usual
reduction is checkable, it has a number attached, and in this setting the number
says not to do it.

## Where it sits

This came out of the district-level dengue forecasting project for Sri Lanka:
weekly case forecasting across 25 districts, an eight-state host-vector SEI-SEIR
model coupled to an LSTM through a differentiable Runge-Kutta solver and trained
end to end, with temperature-dependent mosquito traits taken from published
thermal biology. Public aggregate data only, 2010 to 2026, with 2022 to 2026
held out as a test window. See [the project entry](/inquiry/dengue-seir) for the
wider aim.

A companion paper from the same project, *A Regime Audit for Detecting
Constraint-Artefact Reproduction Numbers in Hybrid Mechanistic-Machine Learning
Epidemic Models*, is **submitted** to ICACT. It is the same shape of result in a
different place: a fitted basic reproduction number can be manufactured by the
optimiser driving a parameter against its bound, and there is a cheap check that
catches it before the number gets published.

---

**Accepted for oral presentation.** The abstract will appear in the conference
proceedings. I am giving the talk. The open questions above are the parts that
are genuinely unsettled, not rhetorical.
