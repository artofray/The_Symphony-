# Symphony Beginner Guide (No Coding Background Needed)

This guide is for your first run.
You can copy/paste each command exactly as shown.

## What this system is

Think of Symphony like a small AI city running on your laptop:

- Maggie = the conductor (main coordinator)
- Agent API = control center (lets UIs and apps talk to Maggie)
- Digital Earth = map/world view in browser
- Entertainment Hub = companion/agent experience in browser
- Placement Studio = drag/drop where agents live on screen

## Before you start

1. Open **PowerShell**.
2. Go to your Symphony folder:

```powershell
cd C:\Users\admin\.openclaw
```

3. Run one-time setup:

```powershell
.\RUN_SYMPHONY.cmd init
```

## Start everything

Run:

```powershell
.\RUN_SYMPHONY.cmd start-orchestra
```

Optional (if you also want the desktop simulator):

```powershell
.\RUN_SYMPHONY.cmd start-orchestra with-sim
```

## Easiest one-command startup

If you want one click for your daily flow, run:

```powershell
.\START_MY_DAY.cmd
```

This command will:
- initialize runtime
- start orchestra stack
- import agency cast + oasis residents
- run status checks
- open Earth, Hub, and API health in your browser

## Open the apps in browser

After startup, open:

- Earth view: `http://127.0.0.1:4173/index.html`
- Entertainment hub: `http://127.0.0.1:5173`
- API health check: `http://127.0.0.1:18890/health`

If health check shows `{ "ok": true }`, your control API is running.

## First things to click

1. Open Placement Studio file:
`C:\Users\admin\.openclaw\workspace\agartha\maggie-orchestra\residents\placement-studio.html`
2. Click **Load Cast + Placements**
3. Move agents where you want
4. Click **Save All Cards**

## One-click Workspace Merge (new)

In Placement Studio, use the **Workspace Merge** section:

1. Set:
- `targetDoc` (example: `oasis-master-context`)
- `notebookId` (example: `maggie-ops`)
2. Paste file paths (one per line) into **file sources**
3. Optional: paste local repo folders into **repo sources**
4. Click **Run Merge**
5. Watch live status in the status box (auto refresh)

Tip: turn on `dryRun` first to validate before real merge.

## Daily commands you will use most

Start stack:

```powershell
.\RUN_SYMPHONY.cmd start-orchestra
```

Check status:

```powershell
.\RUN_SYMPHONY.cmd status-orchestra
.\RUN_SYMPHONY.cmd status-agent-api
```

Import/update cast:

```powershell
.\RUN_SYMPHONY.cmd import-agency-cast
.\RUN_SYMPHONY.cmd import-oasis-residents
```

Stop stack:

```powershell
.\RUN_SYMPHONY.cmd stop-orchestra
```

## If something is broken

### Problem: page says disconnected / API not found

Run:

```powershell
.\RUN_SYMPHONY.cmd status-agent-api
.\RUN_SYMPHONY.cmd stop-agent-api
.\RUN_SYMPHONY.cmd start-agent-api
```

Then reload browser.

### Problem: 404 File not found on Earth page

Use this exact URL:
`http://localhost:4173/index.html`

### Problem: merge runs but no content extracted

The file might be image-only/scanned PDF.
Use OCR first, or provide a text/markdown version.

## What to learn next (in order)

1. How to switch active agent:

```powershell
.\RUN_SYMPHONY.cmd select-agent google-workspace-agent
```

2. How to send a live task:

```powershell
.\RUN_SYMPHONY.cmd dispatch-live "Summarize latest merge output"
```

3. How to preprocess one document:

```powershell
.\RUN_SYMPHONY.cmd preprocess-doc "C:\path\to\file.pdf"
```

---

If you want, next I can create a **single “Start My Day” command** that runs:
- start-orchestra
- cast imports
- status checks
- and opens your 3 main URLs automatically.
