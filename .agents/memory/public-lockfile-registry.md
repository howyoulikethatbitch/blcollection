---
name: Public lockfile registry
description: Imported JavaScript projects may carry Replit-only package tarball URLs into source control.
---

When a JavaScript project is built outside Replit, its lockfile must resolve packages through a publicly reachable npm registry.

**Why:** Replit's package firewall can write internal tarball URLs into package-lock.json; GitHub-hosted runners cannot reach those URLs, causing npm ci to fail or hang before the build begins.

**How to apply:** Before diagnosing a remote npm install failure, search package-lock.json for package-firewall.replit.local. Regenerate the lockfile against registry.npmjs.org rather than changing the application workflow or build script.