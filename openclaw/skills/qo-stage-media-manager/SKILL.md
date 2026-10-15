---
name: qo-stage-media-manager
description: Inventory, stage, and verify media copies for QO performances while preserving originals and the Windows Resolume show setup. Use for media preparation and rehearsal handoff.
---
# QO secure stage media manager

Work only in explicitly selected source and staging folders on the laptop. Resolve absolute paths and check symlinks/junctions before access; reject paths escaping those roots. Do not guess drive letters. ADATA SSD and the malfunctioning desktop are excluded until Ray explicitly authorizes their scope.

Begin with a read-only manifest: relative source path, size, SHA-256 when feasible, format, duration, dimensions, frame rate, audio channels/sample rate, rights/source and verification status. Separate unavailable metadata from verified values. Inspect metadata using available tools without executing media-associated scripts.

Before conversion, establish the actual Resolume version and target composition settings, required codec, alpha/audio needs, storage allowance, show deadline and rehearsal window. Consult version-appropriate official Resolume documentation. Never infer stage compatibility from an MP4 extension or a successful render.

Preserve originals. Copy approved inputs to a separate staging folder; name derivatives uniquely and maintain source-to-output mappings. Check available space before copying. On a naming collision, preserve both files or stop for a choice; never overwrite by default. Verify copy hashes. Conversion requires separate technical validation because derivative hashes differ.

Treat downloads and uploads as untrusted. Limit accepted formats and size for the task; reject executable masquerades and path traversal. Quarantine only staging copies of failed/corrupt inputs; preserve original paths and bytes, and report failures without moving originals. Use maintained decoders; report scanner availability and results without claiming files are safe merely because scanning passed. Do not upload private recordings for remote generation without permission.

Use a small preview and metadata validation before batch conversion. Check duration, sound, loop seams, aspect ratio and black/blank frames. Mark outputs "prepared" until playback is verified in a duplicate/test composition on the target setup during an authorized rehearsal. If native app control is unavailable, provide the exact rehearsal checklist and record Ray's result.

Do not change live composition paths, MIDI/DMX routing, gain, effects, drivers, broadcast state or playback processes. Do not enable the Symphony stream restart, cron or DJ takeover workflows. An explicit request to prepare files is not live-show control authorization.

Deliver a manifest, prepared copies, exceptions and rehearsal checklist. Keep a known-good fallback and document how to return to it. Cleanup removes only newly created staging artifacts after approval; never originals.

## Acceptance
- Source hashes remain unchanged; every derivative has provenance.
- Corrupt files, insufficient disk space and duplicate filenames fail safely.
- A junction to an excluded drive is not followed.
- Prepared and rehearsed statuses are distinct; no invented playback pass.
- The current show remains usable without network, AI, or blockchain.

## Origin
Informed by The Symphony File System Manager, Archivist, Motion Graphics and DJ Booth:
https://github.com/artofray/The_Symphony-/tree/867c61d70ae97894a7b62e0ee3057ea2c56af1da/openclaw/skills
