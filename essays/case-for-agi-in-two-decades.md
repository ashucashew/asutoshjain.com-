---
title: "The Case for AGI in the Next Two Decades"
subtitle: "Anything you can check, AI can practice. And more of AI research can be checked than you'd think."
date: 2026-11-16
draft: true
cover: /images/covers/case-for-agi-in-two-decades.svg
coverAlt: "Illustration of a spiral of nested loops, each one larger and brighter than the last"
---

Over the past year, I watched AI go from helping me write single functions to writing complex features, and sometimes entire products. I had a basic understanding of how large language models worked, but it didn't make sense to me that something that's "just predicting the next word" could keep getting this good. So I dug in, with two questions in mind: *how* is it getting so good, and *how much better* can it get?

My short answer is that AI improves fastest wherever its work can be checked quickly and cheaply, and that AI research itself turns out to be one of those places. If that's right, we should expect AI to start speeding up its own progress, and something like AGI within the next two decades stops looking far-fetched.

## The bitter lesson

There's an idea in AI research called "the bitter lesson." For decades, researchers tried to build human thinking techniques directly into AI systems, and it kept working worse than the alternative: throw a big neural network at the problem, give it a huge amount of data, and let it find the patterns and techniques on its own. Breaking human thinking down into pieces and hand-installing them loses to a black box that just learns. That shouldn't be too surprising, since it's also how most biological life learns.

So the question "how good can AI get?" mostly becomes "how much good data can we get it?"

## Anything you can check, AI can practice

The best source of data turns out to be the AI itself. Give a model a problem it can't reliably solve, let it try many times, check which attempts were right, and train on those. This is **reinforcement learning**, and it works best where answers can be verified fast and cheaply. Roughly ranked from easiest to hardest:

- **Software engineering.** Run the code, see if the tests pass.
- **AI and machine learning research.** It's all digital, so feedback loops can be made fast.
- **Biology research.** Needs a physical feedback loop, which might come from automated "cloud labs."
- **Policy.** Feedback is incredibly slow, because the real-world effects take years to show up. Simulations can help, but they're only as good as the simulation.

Math is a good example of how far this goes when checking is easy. With Lean, a programming language for proofs, a computer can check whether every step of a proof is correct. So a proof-writing AI can work like this: break the proof into a plan of smaller chunks, try to prove each chunk (breaking it down further if needed), and if a chunk can't be proven, go back and change the plan. Every step gets checked, so the AI gets clean feedback the whole way.

Of course, solving proofs isn't really the goal of mathematics. Mathematicians care about finding new fields of inquiry. But in AI research, this kind of verifiable work done at huge scale is exactly what produces better models.

## AI research has answer keys too

Most algorithmic work on language models falls into three buckets, and each one has measurable proxies:

- **Pretraining:** how low the model's error (perplexity) gets on a held-out set of text, and whether small-scale wins still hold at large scale.
- **Post-training:** how fast the model learns from examples in its context window, how it scores on held-out evaluations, and how data-efficient the training method is.
- **Inference efficiency:** how much of the hardware's computing power is actually used, and how much memory each token takes up.

Take **sample efficiency**, which may be the single biggest gap between AI and humans today: people learn from far fewer examples. It sounds fuzzy, but you can turn it into a test. Give a future model a GPT-2-sized model and a target score, and tell it to reach that score as cheaply as possible. If it does well, it has found a sample-efficiency gain. To make sure the gain isn't a fluke of small models, the test can require the same changes to also work on a GPT-3-sized model. Ideas that pass at both sizes are more likely to keep working at the frontier.

You can do the same thing with model size: reward the AI for hitting similar scores with fewer parameters. Smaller models that are just as good make every other experiment cheaper, which tightens the whole loop.

### Data quality can be checked too

Algorithms are only one ingredient; data quality matters a lot. But that can be turned into a test as well. Give an AI a GPT-2-sized model, its training code, a budget of 1 billion training tokens and 10 billion tokens of scraped web text. Its job is to write the function that picks *which* billion tokens to train on. Score the result on a held-out set.

This even works in domains where good data is hard to come by:

- **Medicine.** Build a simulated environment where a model diagnoses patients and can order tests. The simulated test results can be tuned, and the AI researcher's job is to try different tunings and see which one produces a model that does best on a held-out *real* dataset, where we know which tests were actually ordered and what they showed. That's a way to learn how to build better simulated training environments in fields where real data is scarce.
- **Policy and geopolitics.** Give an AI only what was known before the Cuban Missile Crisis and ask it to predict what happens. Training on historical snapshots like this, where AI tries to predict human behavior, could make it surprisingly good at policy.

*The fair objection:* historical snapshots have real limits. They can only grade paths that people actually took. If an AI proposes a biology experiment nobody ever ran, and it would have worked, the snapshot marks it wrong. And the historical record leaves out the micro-failures, dead ends and lab realities that build a researcher's intuition. That's a real gap. But most white-collar work is far easier to verify than frontier biology, so it doesn't stop most of it from being automated.

## Slower than math, but massively parallel

Here's the crux. AI research has slower feedback loops than math: instead of a proof checker that answers instantly, you have to train and evaluate models. But you can run many AI researchers at once, each trying different ideas. The ones that improve the algorithms get built into the next model, which is even faster at research. Lots of research happens in parallel, the same way proof-writing agents work on many problems at once.

To make it concrete:

- Frontier labs are roughly quadrupling their compute every year.
- By my rough math, if that holds through 2027, by the end of the year a lab could give 10,000 AI agents each enough compute to run a GPT-3-sized training run every day. Training runs keep getting cheaper because hardware does more per dollar, software uses that hardware better, and algorithms and data keep improving.
- This becomes economically worth it once a human researcher plus the compute they'd use costs more than the compute an AI researcher needs to make roughly the same breakthrough. Today, research taste is still the bottleneck. As AI gets better at AI research, we'll probably cross that threshold, and suddenly compute is the only bottleneck.
- Compute is also used pretty inefficiently today, precisely because it *isn't* the bottleneck. That leaves room to squeeze out more. An AI researcher working on post-training, for example, could read the transcripts of agents working through training tasks and pause and fix a broken task immediately instead of wasting the run.

*The fair objection:* if this is so promising, why hasn't self-improvement taken off already? Probably because AI mostly recombines existing ideas, and that might not be enough. The next big leap in sample efficiency might need a conceptual jump too far outside what a language model has seen. That's the real uncertainty in this whole argument.

## Then why don't we have automated coders yet?

If AI researchers are close to being automated, why haven't software engineers been replaced? Because engineers do more than write code. They make product decisions and high-level technical calls, and AI isn't there yet. It doesn't fully absorb a company's goals from context, and it isn't reliable enough that a product manager could just do all the prompting.

But each of these looks fixable with the same tools:

- **Vague specs.** Train on tasks with deliberately vague instructions. The model can ask a simulated user clarifying questions, but each question costs it points, and the reward is how complete the work is (including hidden tests) minus the questions asked. That teaches it to fill in what a requester assumes is obvious, which is exactly what non-engineers need to trust it.
- **Reliability.** Mostly a matter of extending existing reinforcement learning methods to longer tasks.
- **Context.** Mostly better memory. AIs can start each session loaded with past product decisions and the company's goals, and they already have access to tools like Slack and Notion.

## Does this end in superintelligence?

Two ways it could play out:

- **A software-only ceiling.** At some point, all the easy software gains get found and progress runs into hardware limits. That ceiling might be superintelligence, or it might be roughly top-human-level intelligence. It's hard to know. Honestly, a ceiling would probably be good for keeping AI under control, since it rules out an explosion that keeps compounding forever.
- **A slower burn.** New ideas might keep getting harder to find. Despite far more compute, bigger staffs and much heavier use of AI, labs' research speed has only roughly doubled. And compute probably can't keep growing fourfold a year forever, especially as opposition to data centers grows (though I've [argued elsewhere](/essays/data-center-opposition/) that opposition alone won't do much). Even then, progress could stay at today's pace or faster, and looking at how far AI came in the last three or four years, that's still a lot.

## What the future might look like

Put it all together, and the three ingredients of AI progress (algorithms, data and compute) are all heading toward automating AI research. Once that happens, I'd expect AI research to look like math does now: a few things AI still can't do well, filled in by the best human researchers, and a large chunk automated. Harder-to-verify fields, and fields that touch the physical world, would improve too, through better general skills like search, memory, reasoning and sample efficiency, and through better simulated training environments. Robots will improve as more get deployed and generate practice data, but a truly general-purpose robot might still take a decade or two.

That points to a world with a high threshold for being employable. Some jobs, maybe software engineering, could be automated entirely, with no relevant skills left. In others, only deep experts with excellent intuition would still be needed. We might need education to run much longer, with people starting their careers closer to 30.

Policy can soften this, with different help at each career stage:

- **Early and pre-career:** free education and retraining.
- **Mid-career:** much better unemployment benefits.
- **Late career:** early-retirement plans.
- **Everyone:** a sovereign AI fund that shares the gains.

None of this needs AI to be conscious, or anything like the robots in movies. It might just feel like a more accurate, more capable version of today's AI that we trust with longer tasks and more resources. That's what makes it easy to underestimate.
