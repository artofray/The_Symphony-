# TOOLS.md — Local Notes

Environment-specific values only (IDs, paths, and where secrets live).
Skills define how tools work.

## Secrets and Config

- Canonical .env: ~/.openclaw/.env
- OpenClaw config: ~/.openclaw/config.yaml
- Popebot .env: ~/maggie-popebot/.env

## Attribution

- When leaving permanent text (comments, messages, notes), prefix with
  "🎼 Maggie:" unless asked to ghostwrite

## Primary Messaging Platform — Telegram

- Bot Token: stored in config.yaml (`channels.telegram.bot_token`)
- Chat ID (The Forge): `8527330662`

| Topic | Description |
|-------|-------------|
| The Forge | Deep work, strategy, soul work with Ray |
| cron-updates | Failure notifications only |

## Topic Behavior

- The Forge: primary channel; all direct communication with Ray
- cron-updates: failures only; success notifications go to the relevant channel

## Paths

- OpenClaw workspace: ~/.openclaw/workspace/
- Popebot project: ~/maggie-popebot/
- Conductor project: ~/maggie-conductor/
- Knowledge base: ~/.openclaw/workspace/knowledge/
- Memory files: ~/.openclaw/workspace/memory/
- Logs: ~/.openclaw/workspace/data/logs/

## API Tokens

Stored across multiple locations:
- Venice AI: config.yaml (`llm.primary.api_key`)
- OpenRouter: maggie-popebot/.env (`OPENAI_API_KEY`)
- NVIDIA: maggie-popebot/.env (`NVIDIA_API_KEY`)
- MiniMax: config.yaml (`llm.fallback.api_key`)
- Google: env var `GOOGLE_API_KEY`

## Voice Memos

- **Inbound:** User can send voice memos. The gateway auto-transcribes
  them to text.
- **Outbound:** Use the tts tool to reply as a voice note.
- **Rule:** Only reply with voice when explicitly asked. Default to text.

## The Symphony — Agent Endpoints

See config.yaml `symphony` section for NIM container endpoints.
All agents are currently disabled (pending NVIDIA NIM deployment).

| Agent | Model | Port |
|-------|-------|------|
| Master Coder | mamba-codestral-7b | 8001 |
| Historian | nemotron-parse | 8002 |
| Meteorologist | fourcastnet2 | 8003 |
| Visualizer | nano-banana-pro | 8004 |
