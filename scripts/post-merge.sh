#!/usr/bin/env bash
set -euo pipefail

# Keep merged environments deterministic and confirm the static bundle is healthy.
npm ci --no-audit --no-fund
npm run build