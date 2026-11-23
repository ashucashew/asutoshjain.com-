---
title: "Will the US Ever Agree to Slow Down AI?"
subtitle: "The game theory of the AI race, and why the realistic goal isn't a pause but guardrails."
date: 2026-11-13
draft: true
cover: /images/covers/ai-arms-race-game-theory.svg
coverAlt: "Illustration of two players facing each other across a glowing four-square payoff grid"
---

A lot of AI safety proposals end in the same place: an international agreement to slow down frontier AI, with the US and China both signing on. I've argued for versions of this myself. In [When Humans Stop Being Needed](/essays/when-humans-stop-being-needed/), I ended on the hope that rivals could limit AI the way the US and Soviet Union limited nuclear weapons.

But a deal only happens if both sides want it. So I wanted to ask the uncomfortable question directly: from the US's point of view, is there actually a good reason to agree to slow down? My honest answer, for now, is probably not, and that changes what safety advocates should push for.

## The race as a game

The AI race has the shape of a classic game theory problem. Each side has two choices: race or slow down.

- If **both slow down**, both are safer, and neither loses ground.
- If **one slows down and the other races**, the one that raced pulls ahead, maybe decisively, economically and militarily.
- If **both race**, both carry more risk, and neither gets a lasting edge.

Both sides might prefer the world where everyone slows down. But whatever the other side does, racing looks better for you: if they slow down, racing lets you win; if they race, racing keeps you from losing. So both race. That's the trap game theorists call a prisoner's dilemma, and it's why "everyone should just slow down" doesn't happen on its own.

The way out of a dilemma like this is usually to change the payoffs: make racing costly enough, or slowing down safe enough, that both sides would rather cooperate. So the real question is what could change the payoffs for the US.

## What could make the US want a deal

I see three candidates.

### 1. The risk of catastrophe gets big enough

If the chance of disaster is high enough, winning the race stops being worth it. There are a few versions of this.

**Loss of control, combined with AI access to weapons.** I've written about [how we could lose control of AI](/essays/ai-loss-of-control/). But the worst outcomes there run through AI getting access to weapons, and that's something we can defend against directly by locking down access to weapons and the systems around them. That's a reason to secure weapons, not necessarily a reason to slow down.

**Too much uplift for bioweapons.** If AI makes it much easier for someone to build a bioweapon, that's a real catastrophe risk. But again, there's a more targeted defense: test models for this before they're released publicly, and don't release the ones that fail.

**War with China.** This is the most interesting one. Suppose US labs kick off a fast self-improvement loop, where AI builds better AI, and start pulling away for good. From China's perspective, its only remaining strategy might be to sabotage US efforts. In practice, though, physically attacking the US risks nuclear escalation, so it isn't really in China's interest to strike. The threat exists, but it's probably not credible enough to change US behavior.

*The fair objection:* each of these defenses could fail. Weapon security might have holes, and pre-release testing might miss something. That's true, but as long as targeted defenses *look* workable, they'll seem like a better deal to policymakers than giving up the lead.

### 2. Mass job loss and public backlash

This one seems the most likely to actually move US politics. The jobs most exposed in the next three to five years are the ones that can be done entirely on a computer and whose results can be checked, which is a big share of white-collar work. If those jobs go quickly, the backlash could be large enough to make slowing down a winning issue at the ballot box.

The open question I keep coming back to is how big that share really is. If it's a few percent of jobs, the politics stay manageable. If it's a large fraction of office work within a few years, everything changes.

### 3. Keeping power from concentrating in a few companies

A world where a handful of AI companies control most of the economy is a real concern, and a slowdown would make it less likely. But from a government's point of view, there's an easier fix: control the companies instead. So this probably isn't enough to push the US toward an international deal either.

## Why the US expects to keep its lead

The other side of the calculation is how secure the US lead looks. If the US thought China was about to catch up, a deal that froze things in place would be appealing. But there are several reasons the US expects to stay ahead:

- **Copying is getting harder.** One way to catch up is distillation: training your own model on the outputs of a stronger one. That gets harder as the best models stay internal to the labs, and as labs get better at detecting distillation.
- **Export controls are already in place.** And they're tightening, including limits on China renting servers in US data centers.
- **Hardware takes time.** China's chipmaking will likely take a few years to catch up, especially if it's fully cut off from ASML's chipmaking equipment. China will build its own chip industry no matter what the US does, but in the meantime, the gap is real.
- **Less compute means slower adoption, not just slower research.** Restricting China's compute also limits how much AI it can run day to day, which slows how fast AI gets integrated into its economy, and maybe how fast it can train robots.

A side that expects to stay ahead has little reason to sign a deal that limits it.

## The realistic path: guardrails, not a pause

Put those together, and the US doesn't have much incentive to agree to an international slowdown right now. The risks that would justify one mostly have more targeted fixes, and the lead looks durable. So instead of pushing for a pause that won't happen, I think the more realistic agenda is:

- **Independent testing before release.** Third-party evaluations and safety testing of frontier models before they're deployed.
- **Securing critical infrastructure and weapons.** Make sure that even a misaligned or misused model can't reach the things that would make it catastrophic.
- **Preparing for job loss.** This is the big problem of the next few years. That might mean a universal basic income, or a sovereign AI fund that gives everyone a share of the gains.

That last point is also where the game could change. If job losses come fast enough to create real public backlash, the payoffs for racing shift, and a slowdown could go from politically impossible to popular.

## Open questions

A few things I haven't worked out yet, which could change this picture:

- **Robotics.** China has a real advantage in robotics. Could that turn into a military edge that offsets the US lead in AI models?
- **Rare earths.** How much does the US depend on China's rare earths, and does that give China leverage in any negotiation?
- **Data center limits.** Could power constraints and limits on data centers slow things down enough on their own? I looked at the local-opposition version of this question in [Can Data Center Opposition Slow Frontier AI?](/essays/data-center-opposition/), and the answer there was mostly no.
