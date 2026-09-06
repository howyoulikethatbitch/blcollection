---
name: Post-merge setup hooks
description: Replit-specific requirement for reliable dependency and build setup after task merges.
---

Imported projects that define workflows do not automatically have a post-merge setup command. Configure a short, idempotent script in `.replit` under `[postMerge]` so merged environments reinstall from the lockfile and rebuild before workflow reconciliation.

**Why:** A merged GitHub Pages follow-up failed with `HOOK_NOT_FOUND` even though the app workflow itself was healthy.

**How to apply:** Use a non-interactive script such as `npm ci --no-audit --no-fund` followed by the project build command, and give it a timeout with enough buffer for dependency installation.