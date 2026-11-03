---
title: 'Built, measured and dropped: DataSense reports in Sinhala and Tamil'
date: 2026-11-01
kind: changed-my-mind
tags: ['datasense', 'translation', 'local-llm']
---

I wanted DataSense to write its reports in Sinhala and Tamil, not only English.
So I built it. The model writes the report in English and passes the number
check as before, then a translation model turns each text into Sinhala or Tamil,
with every number, column name and fact ID locked behind a token so nothing can
change on the way.

Then I measured it on 26 AI-written texts from four public sample files, counting
the translations that still passed the checks:

- **translategemma:4b, local:** Sinhala 8 of 26, Tamil 22 of 26, 4 to 7 seconds a text.
- **qwen3:8b, local:** Sinhala 16 of 26, Tamil 23 of 26, 28 to 112 seconds a text.
- **gemma4:31b, in Ollama's cloud:** 26 of 26 for both, 3 seconds a text.

The small model mixed Korean, Japanese, Thai and Devanagari letters into its
Sinhala and broke the tokens. Its 12B version is 8.1 GB, more than my 6 GB GPU
holds. The only model that did well runs in the cloud, and making a cloud
translator the default would break the one promise DataSense makes: by default,
it runs on your machine.

I read the three models' Sinhala side by side without their names. The cloud
model's was the best, and it still could have been better.

So I dropped it, after it was built and tested and before it was merged. None of
it is in the code. It is kept outside the repository as a patch, in case a small
model gets good enough at Sinhala to bring it back.
