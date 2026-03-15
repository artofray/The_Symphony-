# Symphony OS (Maggie Orchestra)

Symphony OS is a multi-agent operating layer for cross-device AI presence.
It coordinates role-specific agents, retrieval routing, resident avatars, and scenario simulation.

New to AI/coding? Start here first:
- `README_BEGINNER.md`

## Vision

Symphony is built for:

- Human-first orchestration instead of single-model monoliths
- Fast routing with explicit roles and handoffs
- Accessibility-forward interaction (including EyeSpeak-style workflows)
- Frictionless operation with controlled friction at trust boundaries

## Core components

- `Gateway` on `:18789` (OpenClaw)
- `Agent Control API` on `:18890`
- `Digital Earth` on `:4173`
- `MY.ai Entertainment Hub` on `:5173`
- `Agartha World Simulator` (Electron, optional)

## Directory map

- `providers/` provider contracts and capability maps
- `skills/` runtime skill profiles bound to specific domains
- `retrieval/` retrieval interoperability profile and routing conventions
- `residents/` resident rosters, placement profiles, placement studio UI
- `tools/` import and preprocessing tools

## Agent architecture

Primary orchestration roles:

- Conductor: Maggie (routing + synthesis + continuity)
- Builder lane: execution and code delivery
- Companion lane: user interaction and expressive presence
- Weather lane: warning/forecast and operational alerts
- Messenger lane: Mercury-first low-latency retrieval triage

Runtime switch is driven by active profile files:

- `.runtime/active-agent-profile.json`
- `.runtime/active-agent.env`
- `.runtime/active-agent.txt`

Gemini-specific profile:

- `skills/google-workspace-agent.yaml`
- Use for Google Docs/Workspace merge and notebook-oriented workflows.

## Resident system

Resident data sources:

- Oasis roster import (`resident-registry.json`)
- Agency role import (`agency-cast.json`)

Placement and behavior:

- Placement profiles: `edge-left`, `edge-right`, `browser-porch`, `ambient-builder`
- Behavior states: `sit`, `standby`, `build-porch`, `ambient-walk`
- Visual editor: `residents/placement-studio.html`
- Placement Studio now includes a **Workspace Merge** panel (one-click `POST /workspace/merge` + live `GET /workspace/merge/latest` polling)
- Persisted state: `.runtime/resident-placements.json`

## Pitch mode

Pitch mode provides Maggie-led co-hosted presentation flow with timed handoffs.

- Script file: `pitch/pitch-script.json`
- Web player: `pitch/pitch-mode.html`
- Supports:
  - auto-advance timer
  - manual next/prev controls
  - optional browser speech synthesis
  - named speaker handoffs for co-host banter
  - live co-host mode from `GET /agency/cast`
  - per-slide co-host selection with auto-insert in speaker line and `{{cohost}}` message placeholders

## Retrieval and doc pipeline

Retrieval layer:

- Interop profile in `retrieval/mcp-retrieval-profile.json`
- Routing endpoint returns docs/code/mixed plans with tool calls

Pre-ingest document processing:

- Normalize and chunk before agent usage
- Output:
  - `.runtime/preprocessed-docs/<file>.chunks.jsonl`
  - `.runtime/preprocessed-docs/<file>.manifest.json`
  - `.runtime/preprocessed-docs/latest.manifest.json`

Notes:

- Scanned PDFs need OCR for non-zero extraction.
- Built-in warning is emitted when no extractable text is found.

## API reference

Base URL: `http://localhost:18890`

- `GET /health`
- `GET /agent/active`
- `POST /agent/select`
- `GET /retrieval/spec`
- `POST /retrieval/route`
- `GET /residents/list`
- `POST /residents/import`
- `GET /residents/placement-profiles`
- `GET /residents/placements`
- `POST /residents/placements/set`
- `GET /agency/cast`
- `POST /agency/import`
- `POST /docs/preprocess`
- `GET /docs/preprocess/latest`
- `POST /workspace/merge`
- `GET /workspace/merge/latest`
- `POST /sim/quantum-oasis/run`
- `GET /sim/quantum-oasis/latest`

## Use cases

1. Accessibility and communication
- Nonverbal communication support with observer views
- Co-hosted demos where Maggie narrates outcomes in plain language

2. Enterprise orchestration
- Multi-role AI teams across product, engineering, marketing, and support
- Fast retrieval and lower context waste through messenger routing

3. Education and workforce
- Guided agent workflows for learning and simulation
- Career-path resident agents with explainable actions

4. Creative and interactive environments
- Browser/desktop resident companions
- Ambient world-building and scene co-presence

5. Strategy and policy demonstration
- Scenario simulation for adoption outcomes and impact storytelling
- Structured metrics output for pilot briefs and decks

## Deployment

### Local Windows deployment

1. Initialize runtime scaffolding:
```powershell
.\RUN_SYMPHONY.cmd init
```

2. Copy and fill env:
```powershell
Copy-Item .\workspace\agartha\maggie-orchestra\.env.maggie-orchestra.example .\workspace\agartha\maggie-orchestra\.env.maggie-orchestra
```

3. Start full stack:
```powershell
.\RUN_SYMPHONY.cmd start-orchestra
```

4. Optional simulator:
```powershell
.\RUN_SYMPHONY.cmd start-orchestra with-sim
```

5. Validate:
```powershell
.\RUN_SYMPHONY.cmd status-orchestra
.\RUN_SYMPHONY.cmd status-agent-api
```

6. Stop:
```powershell
.\RUN_SYMPHONY.cmd stop-orchestra
```

### Resident and cast deployment

Import Oasis residents:
```powershell
.\RUN_SYMPHONY.cmd import-oasis-residents
```

Import agency role cast:
```powershell
.\RUN_SYMPHONY.cmd import-agency-cast
```

Open studio:

- `workspace/agartha/maggie-orchestra/residents/placement-studio.html`

### Document preprocessing deployment

CLI:
```powershell
.\RUN_SYMPHONY.cmd preprocess-doc "C:\path\to\file.pdf"
```

API:
```powershell
POST /docs/preprocess
{
  "inputPath": "C:\\path\\to\\file.pdf",
  "chunkSize": 1200,
  "overlap": 120
}
```

Workspace merge API:
```powershell
POST /workspace/merge
{
  "sourceDocs": [
    { "type": "file", "path": "C:\\Users\\admin\\Downloads\\roundtable part 1 (1).pdf" },
    { "type": "repo", "localPath": "C:\\Users\\admin\\.openclaw\\workspace\\_merge_work\\The-Oasis", "url": "https://github.com/artofray/The-Oasis.git", "ref": "main" }
  ],
  "targetDoc": "oasis-master-context",
  "notebookId": "maggie-ops",
  "mergePolicy": {
    "mode": "append_with_dedupe",
    "priority": ["target", "newer_source"],
    "conflict": "preserve_both_with_tags"
  },
  "chunkSize": 1200,
  "overlap": 120
}
```

OpenAPI schema:
- `api/agent-control-api.openapi.yaml`

### Production deployment pattern

Recommended topology:

- Gateway + Agent API on secured host
- UI and resident studio behind reverse proxy
- Runtime state on persistent disk
- Token/auth handled by environment and secret manager

Recommended controls:

- TLS termination at edge
- API token rotation
- role-based access to mutation endpoints
- audit logs for profile switches and placement writes

## Command reference

- `RUN_SYMPHONY.cmd start-orchestra`
- `RUN_SYMPHONY.cmd status-orchestra`
- `RUN_SYMPHONY.cmd stop-orchestra`
- `RUN_SYMPHONY.cmd start-agent-api`
- `RUN_SYMPHONY.cmd status-agent-api`
- `RUN_SYMPHONY.cmd stop-agent-api`
- `RUN_SYMPHONY.cmd dispatch-live "text"`
- `RUN_SYMPHONY.cmd select-agent weather-agent`
- `RUN_SYMPHONY.cmd select-agent google-workspace-agent`
- `RUN_SYMPHONY.cmd run-qo-sim`
- `RUN_SYMPHONY.cmd import-oasis-residents`
- `RUN_SYMPHONY.cmd import-agency-cast`
- `RUN_SYMPHONY.cmd set-resident-placement "resident-id" "edge-left"`
- `RUN_SYMPHONY.cmd preprocess-doc "C:\path\to\file.pdf"`

## Troubleshooting

1. API looks down but port is up:
- stale PID or external process may exist
- run `status-agent-api` then `stop-agent-api` then `start-agent-api`

2. Preprocess returns zero chunks:
- document has no extractable text
- run OCR first or provide exported text/markdown

3. Cast import succeeds but endpoint misses updates:
- restart agent API after importing

4. Gemini tasks fail:
- verify `GEMINI_API_KEY` in `.env.maggie-orchestra`
- select `google-workspace-agent` and test via `dispatch-live`

## Related docs

- `residents/placement-studio.html`
- `residents/resident-placement-profiles.json`
- `residents/resident-registry.json`
- `residents/agency-cast.json`
- `pitch/pitch-mode.html`
- `pitch/pitch-script.json`
- `MARKETING_MATERIAL.md`
