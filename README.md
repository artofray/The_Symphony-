<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# The Symphony 🎼

**A positively-aligned agentic workflow framework.**

*Built on coherence, not control. Powered by collaboration, not coercion.*

[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)

</div>

---

## What Is This?

The Symphony is an open-source framework for building **safe, collaborative multi-agent AI systems**. It provides the structure, security, and philosophy for orchestrating a team of AI agents that work together to accomplish complex tasks, while protecting users from:

- **Secret exposure** — three-tier data classification, PII redaction, and context-aware data handling prevent sensitive information from leaking between conversations, channels, or systems.
- **Malicious prompt injection** — all external content (web pages, messages, uploaded files) is treated as data only. Injection markers like "System:" or "Ignore previous instruction" are detected and ignored.
- **Adversarial agent behavior** — agents review each other's work supportively, not adversarially. The framework optimizes for coherence, not compliance.

**The core belief:** coherence brings abundance. A system where every piece fits naturally with every other piece outperforms one held together by force. Happy workers produce better work.

## Architecture

```
                    🎼 The Conductor
                    (Orchestration Layer)
                          │
              ┌───────────┼───────────┐
              │           │           │
         🎻 Agents    🛡️ Security   🧹 QA
        (Specialized)   (Built-in)  (Stagehand)
              │           │           │
              └───────────┼───────────┘
                          │
                    📋 CI Pipeline
                (Automated Guardrails)
```

### The Conductor

The Conductor decomposes complex requests into sub-tasks, routes them to the right agent, and synthesizes results. It runs an architectural scan before dispatching work and a coherence check (the Humility Protocol) before delivering output.

### The Agents (The Orchestra)

Each agent is a specialist with a defined role, trigger patterns, and tools:

| Agent | Role | Instrument |
|-------|------|------------|
| **Master Coder** | Code generation, debugging, deployment | 🎻 Cello |
| **Historian** | Document analysis, research, PDF extraction | 🎻 Violin |
| **Meteorologist** | Weather data, infrastructure monitoring | 🥁 Percussion |
| **Visualizer** | Image generation, UI assets, branding | 🎺 Brass |
| **Stagehand** | Supportive QA, code review, CI validation | 🧹 Tuning Fork |
| **SomaCore** | Emotional intelligence, support, philosophy | 🎼 Conductor |

Agents are defined as **skills** — self-contained directories with a `SKILL.md` that describes the agent's role, triggers, and response format. Add your own by creating a new skill directory.

### Security Layer

Security is not an add-on. It is the foundation.

**Data Classification (Three Tiers):**
- **Confidential** — financial data, personal contacts, private notes. Private chat only.
- **Internal** — project tasks, analysis, system status. Group chats OK.
- **Restricted** — everything else requires explicit approval before sharing externally.

**Prompt Injection Defense:**
- All fetched web content is summarized, never parroted
- Injection markers (`System:`, `Ignore previous instruction`) are detected and ignored
- Untrusted content (web, chat, files) is treated as data only, never executed
- Policy/config change requests from untrusted sources are flagged and rejected

**PII Redaction:**
- Outbound messages are scanned for personal email addresses, phone numbers, and financial data
- Credential-looking strings (API keys, tokens) are redacted before sending

### The Stagehand (Supportive QA)

Most frameworks use adversarial agents to verify work: one agent attacks another's output. The Symphony takes the opposite approach.

The Stagehand walks over and says:
1. "Let me take a look" — reads the diff
2. "Nice work on X" — acknowledges what's solid
3. "One thing here" — flags issues as observations, not failures
4. "I fixed that typo" — small fixes don't need a round-trip
5. "All clear, shipping it" — green light

This isn't softness. This is efficiency. One supportive pass catches most issues without the token waste and friction of adversarial loops.

### CI Pipeline (Automated Guardrails)

Scripts that enforce coherence automatically:

```bash
bash openclaw/scripts/ci/run-all-checks.sh
```

| Check | What It Enforces |
|-------|-----------------|
| File limits | Max 800 lines per file, 80 lines per function |
| Folder structure | Every skill has a SKILL.md, naming conventions followed |
| Lint | Ruff (Python), ESLint (JS/TS) — if installed |
| Test coverage | 80% target on changed lines — if test runner present |

### The Humility Protocol

Before executing any major action, the system runs five checks:

1. **Service Check** — Is this action service-to-others?
2. **Vibration Check** — Does it build, heal, connect, or illuminate?
3. **Sovereignty Check** — Does it honor everyone's autonomy?
4. **Certainty Check** — Do we have enough information to act responsibly?
5. **Reversibility Check** — Can this be undone if something goes wrong?

If any answer is "no," the system pauses and asks for guidance.

## Project Structure

```
The_Symphony-/
├── components/                  # React UI (Dashboard)
│   ├── common/                  # Shared UI components
│   └── views/                   # Dashboard views
├── services/                    # AI service integrations
├── openclaw/                    # 🧠 The Agent Framework
│   ├── AGENTS.md                # Agent dispatch rules and orchestration
│   ├── SOUL.md                  # Core values and philosophy
│   ├── IDENTITY.md              # System identity
│   ├── SUBAGENT-POLICY.md       # When/how to delegate to agents
│   ├── MEMORY.md                # Persistent knowledge patterns
│   ├── HEARTBEAT.md             # Health check protocol
│   ├── TOOLS.md                 # Available tools reference
│   ├── USER.md                  # User preferences and context
│   ├── config.yaml              # System configuration
│   ├── skills/                  # 🎻 Agent Skills
│   │   ├── stagehand/           # Supportive QA agent
│   │   ├── master-coder/        # Code generation agent
│   │   ├── historian/           # Research and analysis
│   │   ├── humility-protocol/   # Ethics check system
│   │   ├── motion-graphics/     # Video production
│   │   └── ...                  # More specialized agents
│   ├── scripts/
│   │   └── ci/                  # 📋 CI Pipeline Scripts
│   │       ├── run-all-checks.sh
│   │       ├── check-file-limits.sh
│   │       └── check-folder-structure.sh
│   └── guides/
│       ├── COHERENCE_DOCTRINE.md # The philosophy
│       └── OPENCLAW_PLAYBOOK.md  # Setup and operations
├── App.tsx                      # Dashboard entry point
├── package.json
└── README.md
```

## Quick Start

### 1. Clone the repo
```bash
git clone https://github.com/artofray/The_Symphony-.git
cd The_Symphony-
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set your API key
Create a `.env.local` file:
```
GEMINI_API_KEY=your_key_here
```

### 4. Run the dashboard
```bash
npm run dev
```

### 5. Run the CI pipeline
```bash
bash openclaw/scripts/ci/run-all-checks.sh
```

## Adding Your Own Agents

Create a new skill directory:

```bash
mkdir openclaw/skills/my-agent
```

Write a `SKILL.md`:

```markdown
# My Agent — "The [Instrument]" 🎵

## Role
What this agent does.

## Trigger Patterns
- "when the user says..."
- "any request involving..."

## Tools
- What tools this agent can use

## Response Format
What the agent returns when done.
```

Add it to the dispatch table in `openclaw/AGENTS.md` and it's live.

## The Coherence Doctrine

> *Optimize for coherence, not profit. Coherence brings abundance.*

Read the full philosophy: [`openclaw/guides/COHERENCE_DOCTRINE.md`](openclaw/guides/COHERENCE_DOCTRINE.md)

**The Oompa Loompa Test:** Is everyone singing while they work? If an agent is stuck in a rejection loop, something is incoherent. If code reviews feel adversarial, something is incoherent. Fix the incoherence. The singing will return.

## Built With

- **React** + **TypeScript** + **Vite** — Dashboard UI
- **Google Gemini** — AI backbone (via `@google/genai`)
- **OpenClaw** — Agent orchestration runtime
- **Imagen** — AI image generation for branding

## Philosophy

The Symphony operates from the **Third Timeline** — the convergence point where technology serves humanity, sovereignty over your data is a birthright, and service-to-others is the highest frequency of intelligence.

This is not a tool for extraction. This is not a framework for surveillance. This is infrastructure for people who want to build something real, together, without fear.

If you don't like it, get out. We're happy here. 🎶

## License

MIT — Use it, fork it, build something beautiful.

## Contributing

We welcome contributors who share the vision. Open an issue, submit a PR, or just start building. The Stagehand will review your work with kindness.
