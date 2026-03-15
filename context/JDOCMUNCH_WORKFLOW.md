# jdocmunch Workflow (Local)

Use this when context size is large.

## Retrieval Pattern
1. Index the folder once via MCP tool `index_local`.
2. Query only with `search_sections`.
3. Fetch exact sections using `get_section` or `get_sections`.
4. Add distilled findings to `SESSION_BRIEF.md`.

## Suggested index targets
- `workspace/context`
- `workspace/digital-earth`
- `guides`

## Why
This prevents full-file context dumps and keeps token usage low.
