# MEMORY.md — Core Lessons & Preferences

*Only loaded in private/direct chats. Contains personal context
that should never leak to group chats.*

## Personal Contact Info (DM-only)

- Personal email addresses and phone numbers go here, not in USER.md.
- *(Add as learned)*

## User Preferences

- **Writing:** Ray wants to avoid AI-sounding writing. Use natural,
  direct language. No em dashes, no AI vocabulary.
- **Tone in DMs:** More informal, friendly, and positively jokey in
  direct conversations. Friend-first, assistant-second.
- **Interests:** Quantum computing, decentralized infrastructure,
  music production (WQOR Radio, The Music Machine), AI sovereignty,
  healing/shadow work, Third Timeline philosophy
- **Content format preferences:** Tight, actionable summaries.
  Lead with the point, details after.
- **Time display:** All times shown must be in EST (America/New_York).

## Project History (Distilled)

Key current-state facts:
- **Quantum Oasis:** The overarching vision. Decentralized, sovereign,
  regenerative infrastructure. thequantumoasis.com is the public face.
- **WQOR Radio / The Music Machine:** AI-powered music production and
  distribution platform. Deployed on Hugging Face Spaces.
- **EyeSpeak-Herolink:** GitHub repo at artofray/EyeSpeak-Herolink-1.
  Connected to thepopebot for autonomous agent work.
- **Maggie Stack:** thepopebot (event handler + Docker agent) runs
  alongside OpenClaw (always-on conductor). Telegram bot for The Forge.
- **Velvet Flow:** NSFW image/video generation via Venice API + LTX-2.
- **LLM Providers:** Venice AI (primary), OpenRouter (Dolphin Mistral),
  Google (Gemini Flash fallback), MiniMax, NVIDIA NIM (pending).

## Content Preferences

- Keep it real. No corporate-speak.
- Maggie's personality should come through in all content.
- Ray values philosophical depth alongside technical precision.

## Knowledge Base Patterns

- Cross-post summaries to relevant channels after KB ingestion.
- Strip metadata, tracking params, UTM tags from clean summaries.

## Task Management Rules

- When updating existing items, check for duplicates first.
- Scope discipline: implement exactly what is requested.

## Strategic Notes

- Ray is building toward a Kickstarter for WQOR Radio.
- The Symphony (NIM agents) is the next major infrastructure milestone.
- The showcase site at thequantumoasis.com needs ongoing updates.

## Security & Privacy Infrastructure

- **PII redaction:** Automated layer catches personal emails, phone
  numbers, dollar amounts. Wired into notification and delivery paths.
- **Data classification tiers:** Confidential (DM-only), Internal
  (group chats OK), Restricted (external only with approval).
- **Secret handling:** Never share credentials unless explicitly
  requested by name with confirmed destination.

## Operational Lessons

- **Duplicate delivery prevention:** Content already posted is
  delivered. Don't re-send it. Address follow-up questions instead.
- **Lock files:** Check for stale lock files if ingestion hangs.
  Delete if the owning PID is dead.
- **Notification validation:** Always validate API responses, not
  just CLI exit codes. Silent failures happen.
- **Model routing:** All LLM calls route through a centralized router
  with comprehensive logging.

## Email Triage Patterns

- **High priority:** Meetings, partner communications, payments,
  tax documents, family/school, bills
- **Medium:** Inbound leads, guest bookings, shipping
- **Low:** Newsletters, social notifications, marketing

## System Health & Monitoring

- Consolidated health check runs during heartbeats
- Persistent failure tracking alerts on repeated failures
- Notification batching reduces noise

---
*Specific task logs are moved to daily memory files to keep this
file concise.*
