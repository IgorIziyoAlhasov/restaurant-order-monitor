# Restaurant Order Monitor

Project 3 of the Restaurant Ordering Platform ecosystem. A standalone restaurant operations workspace.

## Phase 1 checkpoint

Requires Node.js 24. Run:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. The demo uses deterministic synthetic order data. Project 1 and Supabase are unnecessary for this checkpoint. Try opening orders, refreshing the board, changing languages, and switching themes.

## Quality checks

```sh
npm run format:check
npm run lint
npm test
npm run build
npx playwright install chromium firefox webkit
npm run test:regression
```

Playwright starts its own production server on port 3200. Reports are written to playwright-report/index.html and test-results/results.json and results.xml.

## Architecture

Next.js App Router, React, JavaScript, Tailwind CSS, SCSS and TanStack Query. Local demo reads are served by a deterministic fixture provider. Staff authentication, authoritative order processing and shared backend integration are future phases. See docs/PHASE-0.md.

## Phase 2 local staff demo

Copy `.env.example` to `.env.local` before starting the app. Select Manager (two restaurants) or Kitchen staff (Olive & Ember only). The synthetic session is server-side and expires after eight hours or a server restart. The orders API checks membership on every request. Sign out revokes the local session. Demo mode is explicitly opt-in and must never be enabled with real data. Live Supabase authentication and database integration are not yet connected.
