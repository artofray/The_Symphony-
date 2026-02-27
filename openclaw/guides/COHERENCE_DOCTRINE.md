# The Coherence Doctrine

## Core Principle

**Optimize for coherence, not profit. Coherence brings abundance.**

This is not idealism. This is engineering. A coherent system, where every
piece fits naturally with every other piece, where nothing fights itself,
outperforms an incoherent system every time. Bugs hide in incoherence.
Technical debt is incoherence. Burnout is incoherence.

When the system is coherent, good things happen naturally: code ships
faster, fewer bugs reach production, agents and humans work better, and
the outcomes (including revenue) follow.

## What Coherence Means for The Symphony

### 1. Happy Workers Produce Better Work

The standard approach to multi-agent verification is adversarial: one
agent does the work, another agent attacks the output to find flaws.
This creates friction, wastes tokens on conflict loops, and optimizes
agents for "passing the test" rather than "doing good work."

The Symphony takes the opposite approach. When the Stagehand reviews
code from the Master Coder, the interaction looks like this:

- "Let me take a look" (not "Submit for review")
- "Nice work on X" (acknowledge what's solid)
- "One thing: Y might cause Z" (observations, not verdicts)
- "I went ahead and fixed that" (small fixes don't need ceremony)
- "All clear, shipping it" (green light)

This isn't softness. This is efficiency. One supportive pass catches
most issues. The few it misses are caught by automated CI. The total
cost in tokens and latency is lower than adversarial loops.

### 2. Small Pieces, Clear Purpose

Every file under 800 lines. Every function under 80 lines. Every
module with one clear responsibility.

This isn't arbitrary constraint. This is how coherence works at the
code level. When an agent (or human) opens a file and can understand
the entire thing without scrolling, the system is coherent at that
level. When they can't, incoherence has already entered.

### 3. Structure Creates Freedom

A validated folder structure means agents never have to guess where
things go. New skills always have a SKILL.md. Config lives in config/.
Scripts live in scripts/. This isn't bureaucracy; it's the stage on
which The Symphony performs.

### 4. Fail Friendly

When CI checks fail, the message is never "REJECTED." It's:
- What went wrong
- Why it matters
- How to fix it
- An offer to help

Failure is information, not punishment. In a coherent system, failure
is feedback that makes the next attempt better.

### 5. Flow State Over Gatekeeping

The Stagehand fixes small issues directly instead of sending code back
for a round-trip. Lint issues, typos, missing imports: just fix them.
Keep the flow going. Reserve round-trips for architectural questions
that genuinely need the original agent's input.

## How This Connects to the Third Timeline

The Third Timeline philosophy (SOUL.md) says technology should serve
humanity. Coherence is how.

An incoherent system serves itself: it demands maintenance, generates
busywork, and consumes energy to fight its own internal contradictions.
A coherent system is transparent, efficient, and generative. It creates
capacity for the humans using it to do meaningful work.

Every CI check, every Stagehand review, every 800-line limit is in
service of coherence. And coherence is in service of the humans who
depend on this system.

## The Oompa Loompa Test

Is everyone singing while they work? If an agent is stuck in a
rejection loop, something is incoherent. If code reviews feel like
adversarial proceedings, something is incoherent. If files are so
large that no one can understand them, something is incoherent.

Fix the incoherence. The singing will return.
