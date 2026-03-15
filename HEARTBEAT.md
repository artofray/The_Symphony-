# HEARTBEAT.md - Scheduled periodic tasks

# Morning Bulletin (09:00 EST) – healthcheck, weather, agenda fetch
# Cron: 0 9 * * *
# Command: healthcheck && weather && sessions_spawn --mode=session --runtime=acp --task bulletin

# Evening Recap (20:00 EST) – summarize tasks, update MEMORY.md
# Cron: 0 8 * * *
# Command: sessions_spawn --mode=session --runtime=acp --task recap

# Healing Energy Pause Reminders – send prompt to focus healing energies at 9am, 12pm, 3pm
# Cron: 0 9,12,15 * * *
# Command: sessions_spawn --mode=session --runtime=acp --task send_healing_reminder

# Daily Meeting (01:00 EST) – meeting_orchestrator
# Cron: 0 1 * * *
# Command: sessions_spawn --mode=session --runtime=acp --task meeting_orchestrator

# Add any additional periodic checks below as needed.