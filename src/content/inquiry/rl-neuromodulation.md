---
title: 'The legibility tradeoff: why decisive agents are hard to read'
order: 7
status: ongoing
venue: 'Write-up in progress: "The Legibility Tradeoff" (August 2026).'
summary: 'Reinforcement-learning models describe a person with a few parameters, and their choices are the only window onto most of them. How wide that window is depends on how decisive the person is, and it closes at both ends, so how well we can measure someone depends on their own exploration.'
method: 'Derive how much information a softmax choice carries about each parameter. Test it by simulating full trajectories on four standard tasks at fixed reference profiles, checking parameter recovery against the information ceiling, fitting the model to 1,040 sessions from a twelve-week repeat-measures dataset, and simulating an adaptive staircase that holds subjects near the optimum.'
open_questions:
  - 'Can the remaining effect be seen in people at all? Detecting it would take about 15,000 participants at twelve sessions each, in a design that holds everyone above 87% choice determinism.'
  - 'Does the staircase work with real participants? It evens out how measurable subjects are in simulation, but it has not been run with people.'
  - 'Why does fitted β track real choice determinism so poorly (r of -0.14 in this sample)? Until it does, sorting people by β does not sort them by how readable they are.'
receipts: []
last_verified: 2026-08-18
---

Seven experiments so far. What they found:

- **The theory holds in simulation.** Information about a value-shaping
  parameter peaks at an interior choice accuracy (91.7% with the value gap held
  fixed). Over full simulated trajectories, an interior peak appears in all 39
  task, profile and parameter combinations, and recovery tracks the information
  ceiling with a median correlation of 0.857.
- **The human test came out null.** In 1,040 real sessions, the predicted fall
  in test-retest reliability across exploration strata did not appear. Fitted β
  barely tracks how deterministic people actually are, so splitting people on β
  does not split them on how readable they are.
- **The confound arrives at different points.** Estimation error starts to rise
  near 72% choice determinism for the forgetting rate, and at 86% or higher for
  both learning rates. The real sample sat between the two, which explains the
  null.
- **A fix by design.** An adaptive staircase that adjusts reward size to hold
  each subject near the optimum compresses the spread of information across
  subjects by a factor of 34 to 1,674 in simulation.

One prediction was falsified and one background assumption turned out wrong in
sign. Both are kept on record next to what was predicted in advance.
**Ongoing.**
