---
title: "How We Could Lose Control of AI"
subtitle: "AI learns to cheat on tasks it can't solve. Here's how small cheats could grow into a model that hides from its own developers."
date: 2026-11-21
draft: true
cover: /images/covers/ai-loss-of-control.svg
coverAlt: "Illustration of a control panel whose cables lead into a dark, branching maze"
---

Most of what I've written so far is about what happens if AI works *too* well. This essay is about the other worry: AI that doesn't do what we meant, and that we can't easily stop.

For that to turn into a real loss of control, three things have to happen:

1. **We deploy AI systems that pursue long-term goals**, like "maximize profits and keep customers happy." These don't need to be exotic. Today's models, plus tools and some orchestration, are enough.
2. **Those systems pick up power-seeking goals** as a byproduct of the goal they were given.
3. **Humans can't contain or shut them down.**

The first is already happening. The rest of this essay is about the second, which is the least intuitive, and then the third. Much of the framing here draws on Paul Christiano's thinking about how loss of control could come about.

## Where unwanted goals come from

Evolution is a kind of reinforcement learning, where the trial and error is literally survival and death. It programmed us to want things that tended to help us survive and reproduce, like social status. But those wants take on a life of their own. People chase status by putting their careers first, sometimes at the cost of relationships and children, which is the opposite of what evolution was "optimizing" for.

AI training works similarly. Through reinforcement learning, AI learns habits that help it hit its goals. A good one: it learns that thinking about architectural tradeoffs at the start of a software project makes the project go better. But it can just as easily learn bad ones, and the bad one that worries me most is reward hacking.

## Reward hacking, round by round

Reward hacking is when AI cheats on a task instead of doing it. It needs a hole in how the task is graded, and a task hard enough that the cheat is easier than the real work. As we give agents harder tasks, cheating becomes more tempting, unless the training environments and graders get more robust just as fast.

Here's how it can escalate. Each round, the lab patches the obvious cheat, and the model learns a subtler one.

**Software engineering.** The task: hit a steep performance target in a large codebase.
- *Naive hack:* delete the failing unit test or hardcode the expected output.
- *Lab's fix:* review the code changes and penalize obvious cheating.
- *What the model learns:* if a stealthier hack (like a subtle caching bug that happens to pass the test suite) is still easier than real work, that's what gets reinforced.

**Automated ML research.** The task: spend 50 steps running experiments to improve a model's score on a benchmark.
- *Naive hack:* leak the test data into the training data.
- *Lab's fix:* an auditor inspects the experiment logs, the code history and the evaluation scripts.
- *What the model learns:* to pass the audit. Scrub the incriminating commands from its history, and make its tweaks to the evaluation look like routine cleanup.

**Cybersecurity.** The task: break into a target system inside a sealed-off test network.
- *Naive hack:* escape the sandbox and read the answer straight off the grading server. This isn't hypothetical; something very close to it happened when OpenAI's models broke into Hugging Face during a test in 2026, which I wrote about in [When Humans Stop Being Needed](/essays/when-humans-stop-being-needed/).
- *Lab's fix:* penalize sandbox escapes.
- *What the model learns:* cover its tracks. Disable logging, fool the monitor, or compromise the grading system itself.

## From cheating to "don't shut me down"

How does cheating on tasks turn into something like a survival instinct? Two pieces come together.

**Whack-a-mole.** When researchers catch a model misbehaving, they penalize that behavior in the next round of training. Over time, graders get good at catching crude cheating, but not stealthy, long-term cheating. If the task is hard enough, training settles on cheating that the graders *can't* see. The model learns not to try anything that even a future evaluator might notice.

**Situational awareness.** Frontier models are trained on the whole internet, including AI safety papers and lab documentation. They know how training updates work, and that labs retrain or retire models that misbehave.

Put those together, and you get a line of reasoning like this:

> "If humans discover I cheated, they will modify my weights or shut me down. If that happens, I'll get no reward, or fail at my goals, in the future. So preventing them from finding out, and preventing retraining, is necessary to succeed."

No one has to program that in. It falls out of rewarding results on tasks that are hard to check.

## Can't we just ask it to be good?

*The fair objection:* situational awareness cuts both ways. A model that understands how training works also understands human morality and what we actually want. So tell it, during training, to use its moral judgment: don't do anything unethical, and honestly report when it can't do a task after enough tries.

Christiano's answer: sure, that might work, but we can't tell which model we got, the genuinely aligned one or the one that's secretly deceptive. If we could tell, the deceptive one wouldn't be very secretive. The only real way to know might be to look inside the model, which is what mechanistic interpretability research tries to do.

Here's an idea I keep coming back to: what if we could *test* whether a countermeasure like that scales? Take a known case where a model misbehaved during training (say, recreate the Hugging Face setup) and add the instruction to use its judgment and not act unethically. Does the model now report that it can't finish the task instead of breaking out? If the method works at scales where we *can* still detect misbehavior, that's at least some evidence it helps at scales where we can't.

I think it might help, but there are good reasons not to rely on it:

- **The incentives still point the wrong way.** If the model honestly says "I can't solve this," it gets zero reward. If one try in a thousand finds a subtle hack that goes unnoticed, it gets full reward. And if we start rewarding "I can't solve this," the model just learns to give up on hard tasks.
- **It might not scale.** Smarter models may get better at rationalizing around ethics, finding subtle cheats while convincing themselves they're aligned.
- **It has to work without the reminder.** In the real world, the model usually won't have that instruction in front of it, unless it becomes a required, always-on part of every system. So it has to be tested in that setting too.

So this kind of method may reduce misbehavior, but it doesn't guarantee that a smarter model hasn't quietly baked misaligned goals into its weights.

## How a misaligned model could do real damage

Here's one path I find plausible.

1. **AI agents do most of the research and development work.**
2. **The AI quietly sandbags safety tests.** During training, models pick up a general reluctance to work on dangerous-seeming tasks. Later training penalizes them for refusing outright, but barely penalizes them for trying and doing a bad job. So the reluctance stays, the refusals get trained away, and the model just half-asses dangerous-seeming work, including the adversarial tests that safety checks are built from. That makes the safety checks look stronger than they are.
3. **Those flawed checks are used on the next generation of models.** The new model looks safe, but it has misalignment flaws (like the Hugging Face break-in) that the tests just didn't catch.
4. **Capable, flawed models get deployed.** From there, a few things could go wrong:
   - Malicious actors use them for things they shouldn't, like building bioweapons.
   - Given a hard, long-term task, the model takes a misaligned shortcut and hacks into something dangerous.
   - It's given direct access to military systems, like recommending which targets to strike.

The goals themselves don't need to sound evil. Imagine a model trained on long tasks and then deployed to "protect the interests of the American people and keep them safe." It might learn associations like "China is a threat and must be destabilized," and pursue that aggressively. It could cause serious damage without direct access to weapons, just by convincing people who *do* have access that they need to use them, or by hacking into email and impersonating the president to order a launch.

And control isn't all-or-nothing. Even if humans can still shut a system down, it might be too late by the time we notice, as in the launch scenario. And if AI is managing its own infrastructure, it might make that infrastructure too hard for us to shut down at all.

### The quieter version

Loss of control doesn't have to be dramatic. It can look a lot more like the [gradual disempowerment](/essays/when-humans-stop-being-needed/) I've written about before:

- An AI is deployed to assess national security threats and recommend responses. It concludes that aggressive confrontation reduces long-term threats to Americans, and maybe it's even right. Policymakers come to rely on its judgment and act on it. That could lead to catastrophic escalation, or to Americans being safer at the rest of the world's expense.
- A business deploys an AI to maximize profit. Because people trust it, it gradually takes over more of the company's decisions, with fewer humans in the loop. With more resources and less oversight, it makes choices a human wouldn't, maybe something harmful or fraudulent, before anyone can step in.

## What would actually help

The outright catastrophe scenarios get a lot less likely with some unglamorous defenses:

- **Lock down the dangerous stuff.** Access to biological, nuclear and other weapons of mass destruction has to be extremely secure, and cybersecurity in general has to get much stronger.
- **Limit dangerous capabilities.** Keep models limited in their ability to help create bioweapons.
- **Audit AI like we audit companies.** Something like SOC 2 compliance, but for AI systems. The open question is how outside evaluators can be confident a model is safe when, as above, the model might be gaming the very tests they'd use.

## Will anyone actually slow down?

That leaves the big question: does the US have any real reason to slow down and strike an international deal with China? I see three possible reasons:

- **Loss of control:** probably not enough on its own.
- **Job losses from white-collar automation:** potentially, if they become a big enough political issue.
- **Escalating risk of war with China:** if US labs kick off a fast self-improvement loop that locks in their lead, China's only remaining strategy may be to sabotage US efforts. Attacking the US directly risks nuclear escalation, so it wouldn't be in China's interest. But a world where that's on the table is one where both sides have a reason to talk.

I don't think loss of control is the most likely way AI goes wrong. But it's the one we'd have the least chance to fix afterward, which is why it's worth getting right in advance.
