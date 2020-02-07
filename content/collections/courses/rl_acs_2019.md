---
title: Deep Reinforcement Learning Module
slug: deep-reinforcement-learning-acs-2019
categories: event
featured_img: "/galleries/courses/atari_mixtape.png"
date: September-20-2019
---

# Deep Reinforcement Learning <span>Advanced methods in AI module</span>

For the _Advanced Methods in Artificial Intelligence_ course we created
a four lectures and practicals module covering essential topics in Deep
Reinforcement Learning.

Students learned about specific issues in training RL agents with non-linear
function approximation and implemented during the practical a wide range
of algorithms.

- **Prerequisites:** Basic PyTorch knowledge.
- **Instructor:** Florin Gogianu.

## Syllabus

1. **Introduction to RL.** Covers motivation, core concepts, value functions,
Bellman equation and TD learning |
[slides](https://floringogianu.github.io/courses/01_introduction/).
   - **Practical:** Policy evaluation, Q-Learning, SARSA, Expected SARSA in
   a tabular setting. Used and modified with the permision of Diana Borsa.
   | [notebook](https://github.com/floringogianu/rl-module-labs/blob/master/01_introduction.ipynb).
2. **Approximate methods.** MDP definition, introduction to approximate
solution methods, geometrical intuition, non-linear function approximation, deadly triad,
Deep Q-Networks, action overestimation, maximization bias and Double
Q-Learning, Dueling DQN, Prioritized Experience Replay, Distributional RL,
Rainbow, Auxiliary Tasks |
[slides](https://floringogianu.github.io/courses/02_approximate_solutions/).
   - **Practical:** Implement DQN, Double-DQN and Dueling DQN on a variety of
   MiniGrid environments | [notebook](https://github.com/floringogianu/rl-module-labs/blob/master/02_rainbow.ipynb).
3. **Policy Gradient Methods.** Motivation, intuitions, policy gradient
theorem, REINFORCE, baselines, advantage function, generalized advantage
functions, Asynchronous Actor Critic, optimization perspective and intro to
TRPO | [slides](https://floringogianu.github.io/courses/03_policy_gradient).
    - **Practical:** Implement REINFORCE, value-function baseline, Advantage
    Actor-Critic, Generalized Advantage Actor-Critic on a range of discrete
    actions environments |
    [notebook](https://github.com/floringogianu/rl-module-labs/blob/master/03_policy_gradient.ipynb).
4. **Advanced Policy Gradient Methods.** Detailed TRPO, PPO, IMPALA,
importance sampling, V-Trace and a special section with RL applications in
machine learning | [slides](https://floringogianu.github.io/courses/04_advanced_pg).

## Administrative details

- **When**: October - November 2020, on Monday evening
- **Where**: Faculty of Automatic Control and Computer Science, Politehnica
University of Bucharest
- **Lectures**: [lecture
1](https://floringogianu.github.io/courses/01_introduction/), [lecture
2](https://floringogianu.github.io/courses/02_approximate_solutions/),
[lecture 3](https://floringogianu.github.io/courses/03_policy_gradient),
[lecture 4](https://floringogianu.github.io/courses/04_advanced_pg)
- **Practicals**: [notebooks](https://github.com/floringogianu/rl-module-labs)