# OpenClaw Playbook — 23 System-Building Prompts

Copy/paste-ready prompts for building systems on top of OpenClaw.
Each prompt builds a functional system or implements a proven best practice.

Replace placeholders like `<your-workspace>`, `<your-messaging-platform>`,
and `<your-model>` with your own values.

---

## 1. Personal CRM

**What this builds:** A personal CRM with auto-discovery from email/calendar, semantic search, relationship scoring, follow-ups, and email draft generation.

```
Build a personal CRM with these components:

1. Contact discovery pipeline:
   - Scan your email (Gmail API or similar) and calendar for contacts
   - Filter out: newsletters, noreply senders, large meetings (>10 people),
     internal/company domains
   - Implement a learning system: build skip patterns from approve/reject decisions
   - After enough decisions (~50), suggest switching to auto-add mode

2. Database (SQLite, WAL mode):
   - contacts: name, email, company, role, priority, relationship_score
   - interactions: meetings, emails, calls with timestamps
   - follow_ups: due dates, snoozing, status tracking
   - contact_context: timeline entries with vector embeddings (768-dim)
   - contact_summaries: LLM-generated relationship summaries
   - meetings: synced from your meeting recorder (transcript, summary, attendees)
   - meeting_action_items: with assignee, ownership flag, task app link
   - company_news: high-signal news items per company

3. Natural language interface:
   - Intent detector supporting query types like:
     "Tell me about [name]", "Who at [company]?", "Follow up with [name] in 2 weeks",
     "Who needs attention?", "Stats"
   - Semantic search over contact_context embeddings
   - Integration with your messaging platform for queries and notifications

4. Relationship intelligence:
   - Relationship scorer (0-100 based on recency, frequency, priority)
   - Nudge generator for contacts needing attention
   - Relationship profiler (type, communication style, key topics)

5. Daily cron job:
   - Scan last 24h of email/calendar activity
   - Add new contacts, extract context for existing ones
   - Update relationship summaries
   - Report results to your updates channel

6. Email draft system:
   - Thread lookup via email API
   - Feed CRM context + meeting context to LLM for draft generation
   - Two-phase approval: proposed -> approved -> draft created in email client
   - Safety gate: draft creation must be explicitly enabled via config flag
```

---

## 2. Meeting Intelligence

**What this builds:** Integration with a meeting recording tool for automatic CRM updates, insight extraction, and action item tracking.

```
Build a meeting recording integration (e.g., Fathom, Otter, Fireflies):

1. API client for your meeting recorder
2. Calendar-aware polling (every 5 min during business hours)
3. Meeting processing: match attendees to CRM, extract insights, embed context
4. Action item pipeline with ownership verification and task manager integration
5. Two modes: polling (cron) and backfill (historical)
```

---

## 3. Knowledge Base (RAG System)

**What this builds:** A RAG knowledge base for ingesting web content, documents, and social posts, with semantic search and content sanitization.

```
Build a knowledge base with RAG:

1. Ingestion pipeline: URL validation, content fetch, sanitization (regex + model-based),
   chunking, embedding, SQLite storage with lock file
2. Cross-post script for summaries to other channels
3. Query engine with semantic search, tag/date filters
4. Preflight checks for paths, databases, stale lock files
5. Management: list, delete, bulk ingest
```

---

## 4. Content Pipeline

**What this builds:** A content idea pipeline with keyword triggers, deduplication, and multi-platform social analytics collection.

```
Build a content management pipeline:

1. Content idea pipeline with keyword triggers
2. Idea deduplication database (vector similarity, >40% threshold)
3. Social analytics collection (YouTube, Instagram, X/Twitter)
4. Content catalog (rolling 90-day view for daily briefings)
```

---

## 5. Business Intelligence (Nightly Council)

**What this builds:** A nightly advisory engine with multiple expert personas analyzing your data sources and producing ranked strategic recommendations.

```
Build a business intelligence council:

1. Data sync layer from business tools (chat, PM, CRM, social, financial)
2. Independent expert architecture (GrowthStrategist, RevenueGuardian, etc.)
3. Synthesis pass: merge expert findings, produce ranked recommendations
4. Delivery to strategy channel with CLI for deep dives
5. Model routing: most capable model for analysis
```

---

## 6. Security

**What this builds:** A layered security system covering network hardening, access control, prompt injection defense, secret protection, and automated monitoring.

```
Implement layered security:

1. Gateway hardening (loopback only, token auth)
2. Channel access control (identity verification, allowlists)
3. Prompt injection defense (two-stage: regex + model-based scanner)
4. Secret protection (outbound redaction, PII redaction, pre-commit hooks)
5. Automated monitoring (nightly security review, cron health checks)
6. Security rules in system prompt
```

---

## 7. Cron Jobs and Automation

**What this builds:** A cron automation system with central logging, a wrapper script with reliability features, and persistent failure detection.

```
Set up cron automation:

1. Central cron log database (SQLite): log-start, log-end, query, should-run, cleanup-stale
2. Cron wrapper script with signal traps, PID lockfile, optional timeout
3. Structured payloads in agent framework scheduler
4. Reliability: persistent failure detection (3+ failures in 6h), health checks,
   duplicate prevention, stale job cleanup
```

---

## 8. Memory System

**What this builds:** A file-based memory system with daily raw capture, periodic synthesis into curated preferences, and state tracking.

```
Build a file-based memory system:

1. Daily notes (memory/YYYY-MM-DD.md): raw capture, append-only, never loaded in group chats
2. Synthesized memory (MEMORY.md): distilled patterns, DM-only
3. Periodic synthesis cron (weekly): read daily notes, update MEMORY.md
4. State tracking (memory/heartbeat-state.json)
```

---

## 9. Notification Batching

**What this builds:** A priority queue for notifications to reduce alert fatigue.

```
Build a notification priority queue:

1. Three tiers: Critical (immediate), High (hourly), Medium (3-hour)
2. Classification via config rules + optional LLM fallback
3. Queue storage in SQLite
4. Delivery layer with bypass option
5. Flush cron jobs (hourly for high, 3-hourly for medium)
```

---

## 10. Inbound Sales / Lead Pipeline

**What this builds:** An automated inbound email pipeline with LLM scoring, an editable rubric, two-layer draft safety, CRM stage tracking, and sender research.

```
Build an inbound lead/sales email pipeline:

1. Multi-account email monitoring with per-account config
2. Security quarantine (sanitization + semantic scanner)
3. Scoring with editable markdown rubric (0-100 with action buckets)
4. Email labeling (score labels + stage labels)
5. Stage tracking with state machine and audit trail
6. Reply draft generation (two-layer LLM safety: writer + reviewer)
7. Sender research with domain validation and caching
8. Escalation rules for high-signal leads
```

---

## 11. Financial Tracking

**What this builds:** Financial tracking from accounting exports with natural language queries.

```
Build financial tracking:

1. Import pipeline for CSV/Excel exports into SQLite
2. Natural language queries ("What was revenue last quarter?")
3. Confidentiality rules: DM-only, directional references only
```

---

## 12. LLM Usage and Cost Tracking

**What this builds:** Centralized logging of all LLM calls with cost estimation.

```
Build LLM usage and cost tracking:

1. Interaction store (SQLite): llm_calls + api_calls tables
2. JSONL usage logging with report generator
3. Usage dashboard aggregating all data sources
4. Gateway/framework usage sync
5. Cost estimator module with per-model pricing
```

---

## 13. Logging Infrastructure

**What this builds:** A hybrid logging system with structured event logs and automated rotation.

```
Build logging infrastructure:

1. Structured event logging (per-event JSONL + unified stream)
2. Log viewer CLI with filters
3. Nightly database ingest into SQLite
4. Log rotation (daily cron, 50MB threshold)
```

---

## 14. LLM Router

**What this builds:** A unified LLM calling interface that auto-routes to the correct provider.

```
Build a unified LLM router:

1. Main LLM wrapper with credential resolution, smoke test, auto-retry
2. Unified router: single callLlm() interface, auto-detect provider
3. Direct provider path for security-critical operations
4. Model utilities (provider detection, tier extraction, name normalization)
```

---

## 15. Self-Improvement

**What this builds:** Error capture, automated review councils, tiered testing.

```
Build self-improvement systems:

1. Learnings directory (LEARNINGS.md, ERRORS.md, FEATURE_REQUESTS.md)
2. Automated review councils (platform health, security, innovation scout)
3. Tiered testing (nightly free, weekly with LLM calls, weekly E2E)
4. Proactive error reporting via messaging platform
```

---

## 16. Backup and Recovery

**What this builds:** Automated encrypted backups, git sync, restore scripts.

```
Build backup and recovery:

1. Database backup (hourly): auto-discover DBs, encrypt, upload to cloud
2. Git sync (hourly): auto-commit, pull before push, PID guard
3. Restore script with manifest-based path restoration
4. Integrity drill: validate download, decryption, checksums
```

---

## 17. Agent Prompt File Organization

**What this builds:** A structured set of system prompt files with strict scoping.

```
See the merged prompt files already implemented in this workspace:
AGENTS.md, SOUL.md, IDENTITY.md, USER.md, TOOLS.md,
HEARTBEAT.md, MEMORY.md, SUBAGENT-POLICY.md

Governance rules:
1. No duplication across files
2. TOOLS.md is for IDs and paths, not documentation
3. MEMORY.md is for learned patterns, not restated rules
4. Every line in auto-loaded files costs tokens on every request
```

---

## 18. Dual Prompt Stacks with Sync

**What this builds:** Two parallel prompt configurations for different model families.

```
Set up dual prompt stacks:

1. Primary stack (e.g., Claude-optimized): natural language style
2. Secondary stack (e.g., GPT-optimized): XML tags, ALL-CAPS emphasis
3. Both must contain identical operational facts
4. Automated sync review script (nightly diff for discrepancies)
5. Model swap procedure with canary message verification
```

---

## 19. Data Classification and Privacy Controls

**What this builds:** Context-aware access control enforced through the system prompt.

```
Already implemented in AGENTS.md:
- Three data tiers (Confidential, Internal, Restricted)
- Context-aware gating rules
- Conditional MEMORY.md loading
- Identity separation (USER.md vs MEMORY.md)
- Outbound PII redaction
```

---

## 20. Diagnostic Toolkit

**What this builds:** Health check scripts and cron job debugging tools.

```
Build a diagnostic toolkit:

1. System health check script with pass/fail summary and exponential backoff
2. Cron job debugging tools (query, persistent failure detector, stale cleaner)
3. Unified log viewer with filters and quick-access aliases
4. Model/provider diagnostics (status, canary test, usage dashboard)
```

---

## 21. Health Data Pipeline

**What this builds:** A pipeline pulling biometric data from wearables.

```
Build a health data pipeline:

1. Connector scripts per data source (Oura, Apple Health, Withings)
2. Unified JSONL timeline (append-only)
3. Morning cron job with LLM analysis and coaching tips
4. Trend analysis over weeks/months
```

---

## 22. Wearable Memory Capture

**What this builds:** A wearable transcription system that captures conversations to daily files.

```
Build a wearable memory capture system:

1. Stream handler for transcription device
2. Backup poll every 10 minutes with deduplication
3. Natural language search interface via messaging platform
4. Privacy: Confidential tier, never loaded in group chats
```

---

## 23. Migrate to the Claude Agents SDK (OAuth)

**What this builds:** A unified LLM router with Anthropic OAuth authentication.

```
Build a unified LLM routing layer using the Anthropic Claude Agent SDK:

1. MODEL UTILITIES (shared/model-utils.js): aliases, provider detection
2. CALL LOGGER (shared/interaction-store.js): SQLite WAL, auto-redact, cost estimation
3. ANTHROPIC SDK WRAPPER (shared/anthropic-agent-sdk.js): OAuth token resolution,
   startup smoke test, timeout handling
4. UNIFIED ROUTER (shared/llm-router.js): single runLlm() entry point,
   auto-detect provider from model name

Setup: npm install @anthropic-ai/claude-agent-sdk, run "claude login",
add CLAUDE_CODE_OAUTH_TOKEN to .env
```
