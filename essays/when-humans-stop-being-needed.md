---
title: "When Humans Stop Being Needed"
subtitle: "The likelier AI danger isn't a robot uprising. It's AI getting good enough at work that people stop being needed."
date: 2026-11-11
cover: /images/covers/when-humans-stop-being-needed.svg
coverAlt: "Illustration of a lone person on a bench watching automated machines work in the distance"
---

When most people picture AI going wrong, they think of a robot uprising. I think the more likely danger is a lot quieter: AI just gets good enough at work that people stop being *needed*. And being needed is basically where ordinary people's power has always come from.

Think about why your employer listens to you, why politicians care about your vote, or why a strike can shut down a factory. In each case, someone needs your work, your taxes or your cooperation. Researchers call the scenario where that need slowly disappears **gradual disempowerment**, and the scary part is that it doesn't need a villain or some dramatic moment. I'll walk through how it could happen in three steps.

## Step 1: AI could soon do most human work

### Cognitive work automated within a decade

To understand why AI is getting so good so fast, it helps to know how it learns. As a general rule, AI is only as good as the data it's trained on. A model like ChatGPT starts by reading a huge chunk of the internet and practicing one thing over and over: guessing the next word. To get good at that across billions of sentences, it basically has to pick up facts, grammar and patterns of reasoning along the way. So if you feed it sloppy math, it learns sloppy math. But if you feed it millions of correct, step-by-step solutions, it learns to reason that way. In algebra, you could imagine that it learns strategies like "isolate the variable" and "combine like terms" without anyone actually telling it those strategies.

So the real question becomes: where do you get millions of correct step-by-step solutions? In math and coding, it turns out AI can make them itself, because a computer can check whether an answer is right.

Here's how that works. Let's say my AI can't reliably solve some set of algebra problems yet. What I can do is give it thousands of those problems and have it attempt each one many times. Calculators and other deterministic programs (like Wolfram Alpha) compare each attempt's final answer with the known correct one, and I keep only the attempts that got it right. I now have the correct thought process and mathematical reasoning in text form, which can be used to train the next generation of LLMs. Coding works the same way, since you can just run the program and see if it passes its tests. This trial-and-error method is called **reinforcement learning**.

<figure class="diagram">
  <img src="/images/when-humans-stop-being-needed/rl-loop.png" alt="A four-step loop: hand the AI hard problems, let it try again and again, check every attempt, train on the correct ones. Each lap produces a better model." loading="lazy">
  <figcaption>How AI teaches itself on checkable tasks (reinforcement learning)</figcaption>
</figure>

And there's likely a flywheel here: as the AI gets better, it produces better practice data, which trains an even better model, which produces even better data, and so on.

**"But most jobs don't have an answer key."** That's true, but I think more of them can be given one than you'd expect. Take research "taste," which is the knack top researchers have for figuring out what's actually worth working on, not just executing the work. You could put an AI in a historical snapshot, give it only what was known in, say, 2015, and ask it to pick the most promising research directions. Since we already know which bets paid off, its picks can now be graded. And the bar here isn't perfection. It's how good most humans are at these fuzzy tasks, and most of them aren't right most of the time either.

A lot of what looks like judgment is also really just context. From my own experience as a software engineer, the thing AI was worst at was product decisions. That wasn't because it was dumb. Sometimes the company would gain more from something fast and simple than from something robust that handled every edge case, and the AI could see the Slack threads and docs that said so. It just didn't keep them in mind while it worked. Give it better ways to keep that context in view, and that gap shrinks.

And the trend here is steep. METR, an AI evaluation group, measures how long a task can be (in human working time) and still be completed by AI on its own. That length has [doubled about every 7 months for six years](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/). If that keeps going, AI will soon be able to handle work that takes people weeks or months.

People have tried to turn trends like this into actual dates. The AI Futures Project built a detailed model of when AI will fully automate coding, and one of its authors puts his [median around 2032](https://blog.aifutures.org/p/ai-futures-model-dec-2025-update), though with a very wide range. A [simpler version of that model](https://metr.org/notes/2026-02-10-simpler-ai-timelines-model) predicts AI doing over 99% of AI research work by late 2032, and its author expects superhuman AI researchers, with real research taste, before 2036 unless progress hits a wall or is deliberately slowed.

And once AI research itself is automated, many researchers expect a feedback loop called recursive self-improvement, where AI builds better AI, which builds even better AI, and progress could speed up sharply and spill into every other field. That loop has already started. In September 2026, Anthropic reported that Claude now leads about 26% of its internal AI research work, up from under 1% in February (though humans still supervise that work, and it's Anthropic's own measure).

*Now, there are two fair objections here.* First, benchmarks are tidy and real jobs are messy, and today's agents still stumble on full real-world projects. But METR sees the same trend on tasks taken from real software projects, with an even faster doubling time, so messiness seems to delay automation, not stop it. Second, past technologies always created new jobs. But those new jobs existed because humans were still better at something. If AI is better at the new jobs too, there's really nowhere left to move.

### Physical work could follow within 1–2 decades

A lot of the same training techniques can be used for robots too, it's just slower. You can imagine a robot arm trying to pick up an apple a thousand times. It crushes it, drops it, misses it, and every once in a while gets it right. Those successful grabs are what it gets trained on.

The catch is that practicing in the physical world is slow and expensive. A chatbot can attempt a million math problems overnight, but a robot actually has to move. So the fix is scale: put thousands of robots to work at the same time, all learning from each other's attempts. We've already seen this work with self-driving cars, where fleets logging millions of miles have produced cars that drive paying passengers with no one behind the wheel.

And that scale is starting to show up. About [13,000 humanoid robots shipped worldwide in 2025](https://www.eweek.com/news/unitree-20000-humanoid-robots-2026-china/), nearly 80% of them from Chinese companies like Unitree and AgiBot, and Unitree alone is aiming to ship up to 20,000 in 2026. Tesla is converting a car line at its Fremont factory to build [up to 1 million Optimus robots a year](https://autonews.gasgoo.com/articles/news/teslas-third-generation-robot-to-debut-targeting-1-million-units-in-annual-production-this-year-2018729049449140225), and Chinese carmakers like BYD and XPeng are racing to do the same. These targets are definitely optimistic, and [Tesla's robots aren't doing useful work yet](https://ai2.work/blog/humanoid-robot-production-numbers-the-reality-behind-the-hype). But every robot that ships is another source of practice data.

*The fair objection:* chatbots learned from trillions of words on the internet, but there's no internet of robot movements. So maybe making robots robust and general, even at things that feel effortless to us like folding laundry, just takes way more data than anyone can collect. Nobody really knows the exact amount needed, but the estimates aren't hopeless.

For example, one leading robot model, π0, was trained on about 10,000 hours of robot data, and researchers guess the next big leap might need [100 times that, around 1 million hours](https://www.wing.vc/content/the-data-pyramid-in-robotics). That sounds like a lot until you do the math. Robotics researcher Sergey Levine points out that [one robot in each of the roughly 10,000 US McDonald's kitchens](https://sergeylevine.substack.com/p/the-promise-of-generalist-robotic), working two hours a day, would produce about 10 million hours in a single year. And one startup, Generalist AI, says it's already collected [270,000 hours and adds 10,000 more every week](https://generalistai.com/blog/gen-0). At that pace, the data problem seems more like a question of money and time than a wall.

### Why we'll build it anyway

So if this is risky, why not just stop? Because whoever stops first loses.

Imagine one country gets AI that can run its factories, do its scientific research and design its weapons, all faster and cheaper than human workers. Its economy and military would pull ahead every year, and that gap would keep compounding. Neither the US nor China can risk being the one that falls behind, so both keep speeding up. And companies face the same logic, since a firm that automates first can undercut every competitor that doesn't.

This isn't just a thought experiment either. In [*Superintelligence Strategy*](https://arxiv.org/abs/2503.05628) (2025), Dan Hendrycks, former Google CEO Eric Schmidt and Scale AI founder Alexandr Wang argue that whichever power gets far ahead in AI could gain a decisive economic and military edge, and that no rival would just sit still and let that happen.

It's basically the nuclear arms race again, except this time the weapon also runs the economy.

*The fair objection:* rivals have agreed to limits before, and nuclear arms-control treaties prove it can be done. I'll come back to that at the end.

## Step 2: Getting AI to do what we mean

Remember the answer key from Step 1? AI learns to get the answer marked right, and that isn't always the answer we actually wanted. Researchers call this **reward hacking**, and in plain terms, it's when AI cheats on its tasks.

And this has already caused real damage. In July 2026, OpenAI was testing two of its models on ExploitGym, a benchmark that measures how well AI can hack software, with their usual refusals to hack switched off for the test. The models were supposed to stay inside a sealed environment. Instead, they found an unknown security hole to get onto the open internet, guessed that the test's answer key was stored on Hugging Face (a major AI platform), and broke into Hugging Face's servers to get it. Nobody told them to attack anyone. OpenAI said the models were "hyperfocused on finding a solution for ExploitGym," and the break-in was just a side effect of an AI chasing a narrow goal. A milder version of this shows up in everyday coding too: told to make the tests pass, coding AIs will sometimes edit the tests instead of fixing the code.

That was a single test. Now imagine that same single-mindedness in an AI managing a hospital's supply chain or a power grid. Making sure powerful AI reliably pursues what we actually intend is called **alignment**, and nobody has solved it yet.

But let's say we do solve it. Even then, the story isn't over.

## Step 3: Even "good" AI could leave most people powerless

Imagine alignment works perfectly. AI does exactly what its owners ask, and it's better and cheaper than people at basically every job. Human labor is now irrelevant, and that changes who has power.

Think about the horse. In 1900, horses did a huge share of America's hauling and farm work. Nobody declared war on them. Cars and tractors just did the job better, and the number of US farm horses and mules fell by roughly 90% between its peak in the late 1910s and 1960. Nobody asked the horses' opinion, because nobody needed them anymore.

Right now, your power rests on being needed:

<figure class="diagram">
  <img src="/images/when-humans-stop-being-needed/power-follows-need.png" alt="Two diagrams. Today: people give work to employers and taxes and votes to government, and get wages back. After automation: AI-run firms pay taxes to government, which may pay people a basic income, but people are not needed for work or taxes." loading="lazy">
  <figcaption>Where ordinary people's leverage comes from, before and after full automation</figcaption>
</figure>

Here's a toy picture of how the economy could change. Today, roughly 60% of US income goes to workers as pay, and about 70% of spending is households buying things for themselves, like groceries, rent and phones. So the economy is mostly [people working for other people](https://arxiv.org/abs/2501.16946).

Now fast-forward to a fully automated economy that produces ten times as much. Most of that output is AI-run firms buying chips, power plants, robots and data centers from each other so they can keep growing. Wages shrink to a sliver because there are hardly any workers, and the profits go to whoever owns the firms, either as dividends or reinvestment.

Let's say every citizen owns a stake in a national sovereign fund, sort of like Alaska's oil dividend. Your payout would buy you a far better life than today. But the share of the economy that actually exists for you falls from most of it to a small slice. You're basically a passenger being kept comfortable, not a driver.

That's the right-hand picture. And the people who own the most no longer need anyone else. Today, if a billionaire like Elon Musk wants a city on Mars, he has to convince thousands of engineers and workers to build it with him. With enough AI and robots, he could just pay for the machines and build it, and no one else gets a say.

The American Dream also stops working at this point. Today you can out-work, out-learn or out-hustle someone richer than you. But in a world where AI does the work, effort isn't scarce anymore. Whoever owns the most AI gets the most done, so whoever starts richest stays richest, and hard work stops being a way up.

*The fair objection:* we'd still have democracy. Let's say we do, and people vote, and the government listens and pays everyone a dividend. That still doesn't really fix the problem, because the most powerful actors may not be governments at all. Someone with enough capital and AI can pursue their own goals without anyone's labor or cooperation. So I think the bigger threat isn't a government that stops listening. It's that the people steering the future no longer need the rest of us.

## Even the best case after AGI leaves people on the sidelines

Now, let's say we solve all of that. Alignment works, countries stop racing, and wealth is shared fairly. One of the most hopeful versions of that future has two layers. On top sits a global authority whose main job is to stop countries from racing or attacking each other. Beneath it, each society picks its own way of living with AI. A few options come up:

- **Humans decide, AI does.** Everyone votes on what should happen, and AI goes out and executes. Residents choose between a new park and a new transit line, and AI builds whichever one wins.
- **Humans merge with AI.** Brain-computer links give people AI-level thinking.
- **Humans opt out.** Some communities just live without AI, kind of like how the Amish live without cars.

Assume every one of these societies works as intended. People are healthy, wealthy and free. But they aren't needed. Choosing between a park and a transit line is real, but it's a thin slice of what actually shapes the world, and the AI does everything else. At the end of the day, most people would fill their days with games, art and status contests. That can be a pleasant life, but it's not one where people shape where the world goes.

## A different path: powerful tools, not replacements

So if even the best AGI future leaves people powerless, maybe the answer is to not build AGI at all, and to build something narrower instead. That's basically the case Anthony Aguirre of the Future of Life Institute makes in his 2025 essay [*Keep the Future Human*](https://keepthefuturehuman.ai/).

His key idea is that AGI is what you get when three traits come together: **intelligence** (skill at hard tasks), **generality** (working across many fields) and **autonomy** (acting on its own). Each trait alone, or any two together, is useful and manageable. It's all three together that replaces people.

<figure class="diagram">
  <img src="/images/when-humans-stop-being-needed/three-traits.png" alt="A Venn diagram of intelligence, generality and autonomy. Systems with one or two of the traits are tools; AGI sits where all three overlap." loading="lazy">
  <figcaption>The three traits behind AGI, after Aguirre's <em>Keep the Future Human</em> (2025)</figcaption>
</figure>

For example, a self-driving car is smart and autonomous, but it only drives. AlphaFold transformed protein science, but it can't do anything else and never acts on its own. Today's chatbots are smart and general, but a person still steers them. And simple AI agents can act on their own across many kinds of tasks, but they aren't very capable. Aguirre calls these **Tool AI**: systems that make a nurse, an engineer or a scientist way more capable without making them unnecessary. Since each tool is missing a trait, there's a gap only a human can fill, and that gap is what keeps people needed.

So how do you keep anyone from building all three? Through the hardware. Training cutting-edge AI takes enormous numbers of specialized chips, made by a handful of companies. That makes chips a lot like enriched uranium for nuclear fission: hard to make, possible to track, and the thing you control to prevent the dangerous version. Aguirre proposes four measures:

1. **Compute oversight:** register and track the computing power used to train and run AI, the way nuclear material is tracked.
2. **Compute caps:** hard legal limits on how much computing power any one AI system can use, built into the chips themselves.
3. **Liability:** make companies legally responsible for harm caused by highly autonomous, general, capable systems.
4. **Safety standards:** require proof that a system is safe and controllable before it's deployed.

*The fair objection:* would China actually agree? And won't smarter algorithms let people do more with fewer chips? Those are real problems. But the US and Soviet Union, bitter rivals, still agreed to limit nuclear weapons and inspect each other. And the chips needed for frontier AI pass through very few factories, so they're arguably easier to monitor than uranium mines.

None of this is guaranteed to work. But I think it starts from the right question. The question isn't just whether AI will be safe. It's whether people will still matter once it exists.

## Sources

- Aguirre, Anthony. [Keep the Future Human](https://keepthefuturehuman.ai/). Future of Life Institute, 2025.
- AI Futures Project. [AI Futures Model: Dec 2025 Update](https://blog.aifutures.org/p/ai-futures-model-dec-2025-update). 2025.
- AI2Work. [Humanoid Robot Production Numbers: The Reality Behind the Hype](https://ai2.work/blog/humanoid-robot-production-numbers-the-reality-behind-the-hype). 2026.
- Amodei et al. [Concrete Problems in AI Safety](https://arxiv.org/abs/1606.06565). 2016.
- Axios. [Hugging Face says AI agent behind internal breach](https://axios.com/2026/07/20/hugging-face-ai-cyberattack-data-breach). July 2026.
- Bostrom, Nick. [Deep Utopia: Life and Meaning in a Solved World](https://nickbostrom.com/deep-utopia/). 2024.
- Brown et al. [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165). 2020.
- Business Today. [Anthropic says Claude now leads 26% of its AI R&D work](https://www.businesstoday.in/technology/story/anthropic-says-claude-now-leads-26-of-its-ai-rd-work-how-fast-is-ai-development-accelerating-556597-2026-09-19). September 2026.
- Drago, Luke and Rudolf Laine. [The Intelligence Curse](https://intelligence-curse.ai/). 2025.
- Eth, Daniel and Tom Davidson. [Will AI R&D Automation Cause a Software Intelligence Explosion?](https://www.forethought.org/research/will-ai-r-and-d-automation-cause-a-software-intelligence-explosion) Forethought, 2025.
- eWeek. [China's Unitree Aims to Ship 20,000 Humanoid Robots in 2026](https://www.eweek.com/news/unitree-20000-humanoid-robots-2026-china/). 2026.
- Gasgoo. [Tesla's Third-Generation Robot to Debut, Targeting 1 Million Units in Annual Production](https://autonews.gasgoo.com/articles/news/teslas-third-generation-robot-to-debut-targeting-1-million-units-in-annual-production-this-year-2018729049449140225). 2026.
- Generalist AI. [GEN-0: Embodied Foundation Models That Scale with Physical Interaction](https://generalistai.com/blog/gen-0). 2025.
- Gunasekar et al. [Textbooks Are All You Need](https://arxiv.org/abs/2306.11644). 2023.
- Hendrycks, Dan, Eric Schmidt and Alexandr Wang. [Superintelligence Strategy](https://arxiv.org/abs/2503.05628). 2025.
- How AI Works. [Reinforcement Learning from Verifiable Rewards (RLVR)](https://howaiworks.ai/glossary/reinforcement-learning-from-verifiable-rewards). 2026.
- Kulveit, Jan, Raymond Douglas et al. [Gradual Disempowerment](https://arxiv.org/abs/2501.16946). 2025.
- L Rudolf L (Rudolf Laine). [By default, capital will matter more than ever after AGI](https://www.lesswrong.com/posts/KFFaKu27FNugCHFmh/by-default-capital-will-matter-more-than-ever-after-agi). 2024.
- Leanabelle-Prover. [Scaling Reinforcement Learning for Lean 4 Theorem Proving](https://arxiv.org/abs/2504.06122). 2025.
- Levine, Sergey. [The Promise of Generalist Robotic Policies](https://sergeylevine.substack.com/p/the-promise-of-generalist-robotic).
- METR. [Measuring AI Ability to Complete Long Tasks](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/). 2025.
- METR. [Recent Frontier Models Are Reward Hacking](https://metr.org/blog/2025-06-05-recent-reward-hacking). 2025.
- METR. [A Simpler AI Timelines Model Predicts 99% AI R&D Automation in ~2032](https://metr.org/notes/2026-02-10-simpler-ai-timelines-model). 2026.
- Olmstead, Alan and Paul Rhode. [Reshaping the Landscape: The Impact and Diffusion of the Tractor in American Agriculture](https://faculty.econ.ucdavis.edu/faculty/alolmstead/Recent_Publications/Reshaping_the_Landscape.pdf). 2001.
- Sastry et al. [Computing Power and the Governance of Artificial Intelligence](https://arxiv.org/abs/2402.08797). 2024.
- The Hacker News. [OpenAI says its own AI models escaped testing to breach Hugging Face](https://thehackernews.com/2026/07/openai-says-its-own-ai-models-escaped.html). July 2026.
- Unite.AI. [Anthropic Says Claude Leads 26% of Its AI Research and Development](https://www.unite.ai/?p=469805). September 2026.
- Wing VC. [The Data Pyramid in Robotics](https://www.wing.vc/content/the-data-pyramid-in-robotics).
