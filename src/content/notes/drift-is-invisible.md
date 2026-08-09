---
title: 'A drifted sensor is invisible from inside the belief'
date: 2026-08-06
kind: changed-my-mind
tags: ['sar', 'robotics', 'calibration', 'sensor-fusion']
---

I had assumed that a system honest enough to report its own confidence would
also, more or less, notice when it was in trouble. Not perfectly — but that a
sensor going bad would show up as the belief getting vaguer, and that watching
entropy would be enough of a health check to build on.

That assumption is half right, and the half that's wrong is the dangerous half.

I ran two models of the same "sensor still works, sensor is now wrong" failure,
matched so they add exactly the same error. **Fog** scatters each reading more
widely than the likelihood expects. **Drift** knocks every reading off true in
a direction fixed for that run, so each reading agrees with the last.

Fog behaves the way I expected. Entropy climbs, stated confidence falls, and
the system half-reports its own problem — you could alarm on that.

Drift does not. At the same added error, entropy sits at 2.08 nats against a
healthy 2.09, and stated confidence is unchanged. Every number the system can
see about itself says it is fine. It is simply wrong, and roughly five times
more damaging than the noisy failure, because readings that agree with each
other concentrate the belief confidently on the wrong cell.

So the thing I got wrong was the assumption underneath, not the number: I
thought a well-calibrated belief was a form of self-monitoring. It isn't.
Calibration tells you the map is honest *about the evidence it was given*. It
says nothing about whether that evidence was any good. A drifted map is a
perfectly honest report of a lie.

Which means detection has to come from outside the belief — from whether the
sensors agree with **each other**, not with the fused map they all fed. That
signal is there: a drifted thermal sensor and a healthy Wi-Fi one disagree about
location even while the fusion looks entirely healthy. Nobody's watching it yet.

That's the next experiment, and I'm slightly annoyed it took a null result to
find it. I'd been treating cross-sensor residuals as an engineering detail to
add later. It's the only detector there is.
