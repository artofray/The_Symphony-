# Context Pack

Purpose: minimal, high-signal context for future sessions with strict token discipline.

## Load Order (token-efficient)
1. `workspace/context/SESSION_BRIEF.md`
2. `workspace/context/CODEX_WEBAPP_SUMMARY_2026-03-09.md`
3. Only then open code files referenced by those summaries.

## Rules
- Never load whole repos when a specific file section is enough.
- Prefer indexed docs retrieval (`jdocmunch`) over raw full-file reads.
- Update this pack after major UI/architecture changes.

## Current Focus
- Digital Earth twin + city zoom UX
- Quantum Oasis module panel/filter integration
- Multi-device Maggie orchestration scripts in `.openclaw/scripts/workflow`
