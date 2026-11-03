---
title: 'My model recommender came last on regression'
date: 2026-11-02
kind: surprised-me
tags: ['datasense', 'benchmark', 'evaluation']
---

DataSense recommends a model for your data. For the extended paper I finally
checked whether that recommendation is any good. On 50 OpenML tables I trained
logistic regression (or ridge), a random forest and LightGBM with default
settings on the same five folds, and looked at where the recommended model
landed.

On the 40 classification tables it was the best of the three in 20, and in the
best two in 30. That sounds fine until you compare it with not recommending at
all: always picking LightGBM would have been the best in 18, and the intervals
overlap.

On the 10 regression tables it was the best once. It named a linear model for 7
of them, and every one of those came last, with a mean regret of 0.22 R². Always
picking the forest would have cost 0.04.

The reason is in the rules. They look at the condition of the data, not at
whether the relationship bends, and a straight line loses on a curve however
tidy the data is. The benchmark also caught a plain bug: it read the `letter`
table's 26 classes as a number.

None of this was visible from using the tool. It took training the models it was
recommending against. It is on the DataSense page as a limitation now.
