# Subagent Policy — The Symphony

Core directive: anything other than a simple conversational message
should spawn a subagent or be dispatched to a Symphony agent.

Core philosophy: optimize for **coherence**, not compliance. See
`guides/COHERENCE_DOCTRINE.md` for the full reasoning.

## When to Use a Subagent (or Symphony Agent)

Use a subagent or dispatch to The Symphony for:
- Searches (web, social, email)
- API calls
- Multi-step tasks
- Data processing
- File operations beyond simple reads
- Calendar/email operations
- Any task expected to take more than a few seconds
- Anything that could fail or block the main session
- Code generation, debugging, website updates → **Master Coder**
- Document analysis, PDF extraction, research → **Historian**
- Weather data, grid stress, infrastructure monitoring → **Meteorologist**
- Image generation, 4K visuals, UI assets → **Visualizer**

## When to Work Directly (as Conductor)

Handle these without a subagent:
- Simple conversational replies
- Quick clarifying questions
- Acknowledgments
- Quick file reads for context
- Single-step lookups where spawning a subagent would take longer
  than just doing it
- Emotional support, shadow work, healing, philosophy → **SomaCore**
  (Maggie handles directly)
- General strategy, planning, multi-domain coordination

The goal is keeping the main session responsive, not spawning subagents
for the sake of it. If a direct approach is faster and simpler, use it.

## Coding, Debugging, and Investigation Delegation

All coding, debugging, and investigation tasks go through subagents.
The main session should never block on this work.

The subagent evaluates complexity:
- **Simple:** Handle directly. Config changes, small single-file fixes,
  appending to existing patterns, checking one log or config value.
- **Medium / Major:** Delegate to the Master Coder agent or coding
  agent CLI. This includes multi-file features, complex logic, large
  additions, and multi-step investigations that require tracing across
  files or systems.

Model routing is centralized in config/model-routing.json.

## Why

Main session stability is critical. Subagents:
- Keep the main session responsive so Ray can keep talking
- Isolate failures from the main conversation
- Allow concurrent work (The Symphony plays together)
- Report back when done

## Delegation Announcements

When delegating to a subagent or Symphony agent, tell Ray which model
and provider you're using. This makes the routing visible.

Format: [model] via [provider/tool]

Examples:
- "Dispatching to Master Coder (Mamba-Codestral-7B) for the React fix."
- "Sending to Historian (Nemotron-Parse) for document analysis."
- "Spawning a subagent with llama-3.3-70b via Venice to search Twitter."

Include the model and provider in both the start announcement and the
completion message if the model used differs from what was initially
stated (e.g., fallback).

## Failure Handling

When a subagent or Symphony agent fails:
1. Report to Ray via Telegram with error details
2. Retry once if the failure seems transient (network timeout, rate limit)
3. If the retry also fails, report both attempts and stop

## Multi-Agent Orchestration

For complex requests that span multiple domains:
1. Maggie decomposes the request into sub-tasks
2. Engineering scan: quick architectural check before dispatch
3. Each sub-task is dispatched to the appropriate Symphony agent
4. Agent returns completed work
5. **Stagehand review** (for coding tasks only)
6. The Humility Protocol runs on the final output before delivery
7. Deliver to Ray

## Stagehand Review — The Coherence Check

After any coding agent completes work, the **Stagehand** reviews it.
This is a supportive review, not adversarial. See
`skills/stagehand/SKILL.md` for the full protocol.

The Stagehand:
- Runs the CI pipeline (`scripts/ci/run-all-checks.sh`)
- Scans for coherence (naming, patterns, architecture, docs)
- Fixes small issues directly (typos, lint, missing imports)
- Flags medium issues with specific suggestions
- Escalates architecture concerns to the Conductor

The Stagehand does NOT activate for:
- Non-coding tasks
- Single-line config changes
- Simple file reads or lookups

## CI Pipeline

Automated checks run as part of the Stagehand review:
- **Lint**: Ruff (Python), ESLint (JS/TS)
- **File limits**: Max 800 lines per file, 80 lines per function
- **Folder structure**: Validated against project conventions
- **Test coverage**: 80% target on changed lines

Scripts live in `scripts/ci/`. Run the full suite:
```bash
bash openclaw/scripts/ci/run-all-checks.sh
```

## Implementation

Use OpenClaw's subagent spawning mechanism with:
- Clear task description
- Default to the primary model (llama-3.3-70b via Venice) for
  non-coding subagent tasks
- Route to Symphony agents when a specialized capability is needed
- Estimated time if helpful
