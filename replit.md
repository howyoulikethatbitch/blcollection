# Azure BL Collection

## Overview

Azure BL Collection is a static React + TypeScript + Vite library and launcher for independently hosted BL visual novels. It intentionally has no backend, authentication, database, audio, or embedded VN engine.

## Running locally

```bash
npm run dev
```

The app runs on port 5000 and is configured for Replit's proxied preview. Use `npm run build` to create the static production bundle.

## Content

Novel entries live in `src/data/novels.ts`. Each entry contains its collection type, chapter count, genres, tags, featured state, cover theme, and optional external VN URL. When a URL is present, Read story opens it in a new browser tab; entries without one remain Coming soon.

Favorites, reading history, theme, text size, and animation preferences are stored in browser localStorage. No data is sent to a server.