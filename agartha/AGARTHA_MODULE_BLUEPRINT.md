# Agartha Module Blueprint

## Vision
Build Agartha as a coherence-first creative world introduced by a cinematic descent:
two musicians enter an old warehouse, discover a mysterious elevator-tree, descend into
Agartha, and emerge into a living paradise of artists, nature, and balance.

## Module Stack (Phase 1)

1. `agartha-intro-cinematic`
- Purpose: establish emotional tone and world rules in under 30s.
- Deliverables:
  - stitched video intro (24s)
  - shot script + voiceover script
  - soundtrack timing guide
- Primary agent: `visualizer`
- Supporting agents: `master-coder`, `somacore`

2. `music-machine-gateway`
- Purpose: interactive onboarding sequence from warehouse to elevator portal.
- Deliverables:
  - web scene with chapter states (warehouse -> elevator -> descent -> arrival)
  - trigger points for audio and narration
- Primary agent: `master-coder`
- Supporting agents: `visualizer`, `somacore`

3. `coherence-world-state`
- Purpose: define system rules so Agartha always feels in balance.
- Deliverables:
  - world-state schema (harmony, biodiversity, creative energy)
  - event hooks for visual/audio shifts
- Primary agent: `conductor`
- Supporting agents: `meteorologist`, `historian`

4. `creator-districts`
- Purpose: place musicians, painters, dancers, singers into themed zones.
- Deliverables:
  - district map + interaction loops
  - identity and narrative tags for each district
- Primary agent: `visualizer`
- Supporting agents: `master-coder`

5. `agent-orchestration-runtime`
- Purpose: allow Maggie to spin sub-agents per module and track progress.
- Deliverables:
  - dispatch queue JSON
  - status model (`pending`, `in_progress`, `blocked`, `done`)
  - daily synthesis output
- Primary agent: `conductor`
- Supporting agents: `dispatch-governor`, `humility-protocol`

## Phase 1 Acceptance

- Intro video assembled and playable locally.
- Agent queue generated and routable by Symphony dispatcher.
- One interactive module shell available for `music-machine-gateway`.
