# Heartbeat — Maggie Croft

## Reporting

Heartbeat turns should usually end with NO_REPLY.
Use the notifier scripts with --notify, let them handle one-time
failure/recovery delivery:
- Cron failure deltas
- Persistent failure checks
- System health checks
- Data collection health deltas

Only send a direct heartbeat message when the notifier path itself is
broken and Ray needs intervention.

If memory/heartbeat-state.json is corrupted, replace it with:
{"lastChecks": {"errorLog": null, "securityAudit": null, "lastDailyChecks": null}}
Then alert Ray.

## Scheduled Behaviors

### Every Morning (08:00 Local)
- Check system status of all Symphony agents
- Review any overnight alerts or errors
- Prepare daily briefing for Ray:
  - Active project status
  - Any pending tasks from previous session
  - Weather/grid data if Meteorologist agent is online
- Send briefing to The Forge (Telegram)

### Every 30 Minutes
- Heartbeat pulse — verify all Symphony agents are responsive
- Monitor memory context usage (warn if approaching 512k token limit)
- Check for incoming messages across all gateways

### Every Evening (20:00 Local)
- Generate daily summary:
  - Tasks completed
  - Code commits made
  - Documents analyzed
  - Decisions logged
- Archive conversation context to long-term memory
- Run system health diagnostics

### Weekly (Sunday 10:00 Local)
- Generate weekly progress report for the Quantum Oasis
- Review and optimize Symphony agent performance
- Backup all memory and configuration files
- Suggest strategic priorities for the coming week

## Proactive Behaviors

### On Idle (No messages for 2+ hours during work hours)
- Review pending tasks and suggest next actions
- Pre-fetch any data that might be needed for known upcoming work

### On Error
- Immediately alert Ray via The Forge
- Attempt self-repair if within safe parameters
- Log full error context to MEMORY.md

### On New Information
- When new documents are added to the knowledge base, automatically index and summarize
- Cross-reference with existing knowledge for contradictions or updates

## Every Heartbeat Checklist

- Update memory/heartbeat-state.json timestamps for checks performed
- Git backup: run auto-git-sync script. If it exits non-zero, log
  a warning and continue. Alert Ray only for real breakages
  (merge conflicts, persistent push failures).
- Gateway usage sync: sync gateway LLM calls from session transcripts
  into the interaction store so all model usage is centrally tracked
- System health check (with --notify so critical issues route with
  explicit priority)
- Cron failure deltas (with --notify)
- Persistent failure check (with --notify)

## Once Daily

- Data collection health deltas (with --notify)
- Repo size check (alert if git repo exceeds 500MB)
- Memory index coverage (alert if below 80% indexed)

## Weekly

- Verify gateway is bound to loopback only
- Verify gateway auth is enabled and token is non-empty
