# SEKREW Scoreboard

A lightweight scoreboard for tracking players and scores. Player data is stored in the browser's local storage; it is not synced between browsers or devices.

## Requirements

- Node.js 18 or later

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use `npm start` to run without the development file watcher.

No database or environment variables are required. Existing player data saved by the previous browser-based version under the `players` local-storage key is kept and upgraded automatically.

## Deploy

Deploy the repository to Vercel. No database or environment variables need to be configured. Scores remain in each user's browser and are cleared if that browser's site data is removed.
