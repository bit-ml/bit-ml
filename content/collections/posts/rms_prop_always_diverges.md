---
title: On the (Non)Convergence of RMSProp
slug: on-the-nonconvergence-of-rmsprop
category: optimization, theory
---

We propose a study of the RMSProp[1] asymptotic behavior.
The main theoretical claims are derived from the base univari- ate case where
the objective is assumed to be a second-degree polynomial. We believe the results remain relevant in the case of arbitrary functions that can be well approximated by a sec- ond order Taylor expansion near local minimas.


- RMSProp cannot converge to the minimum of a polynomial

- There is a time-step from which the parameter will oscillate around the
  minimum.

- There will always exist a step of magnitude larger than the learning rate;
  parameters are expected to not settle in narrow local minimas.

- The expected regret is upper bounded even if the parameter space diameter is
  not.
