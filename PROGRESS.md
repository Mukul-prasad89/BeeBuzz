# Honey Chain — Build Progress

## Project Location
`/Users/vikash/Desktop/honeyChain/honey-chain/`

## Tech Stack
- React 18 + Vite 6 (JavaScript only, NO TypeScript)
- Tailwind CSS 3 with custom honey/charcoal design system
- Recharts for charts, Lucide React for icons, Zustand for state
- html5-qrcode for QR scanning, react-router-dom v6

## Status: BUILD PASSES ✅

## What's Built

### Config & Design System
- `tailwind.config.js` — honey-50 to honey-900, charcoal-50 to charcoal-900, success/warning/danger
- `src/index.css` — Google Fonts (Sora, Inter, JetBrains Mono), CSS variables, component classes (btn-primary, card, badge, proof-box, etc.)
- `.env` — VITE_API_BASE_URL + VITE_USE_MOCK=true

### Store (Zustand)
- `src/store/authStore.js` — token, profile, role, login/logout
- `src/store/toastStore.js` — toast notifications with auto-dismiss

### Utils
- `src/utils/formatters.js` — formatDate, timeAgo, formatKg, formatINR, truncateHash, delay

### Mock API Layer
- `src/api/mock/seed.js` — 6 hives, 3 alerts, 5 batches (incl. HC-BAD-9999 tampered), 8 beekeepers, 4 clusters, lab data
- `src/api/mock/mockApi.js` — Full mock implementation of all API endpoints with in-memory state
- `src/api/apiClient.js` — Axios instance
- `src/api/index.js` — Exports mockApi (swap to realApi when backend ready)

### UI Components (src/components/ui/)
- Button, Card, Badge, StatCard, Toast, Modal, EmptyState, LoadingSpinner, Skeleton
- ProofBox (blockchain tx display with copy), TimelineStepper, StepWizard

### Layout Components (src/components/layout/)
- Logo (hexagon + wordmark), TopBar, Sidebar (desktop), BottomBar (mobile)
- AppShell (sidebar + content), PublicLayout (header + footer), RoleGuard

### Domain Components (src/components/domain/)
- HiveCard, AlertItem, HealthScoreGauge, SensorChart (Recharts)
- BatchRow, VerifyBanner, ScanFrame (html5-qrcode)

### Pages — All 12 routes implemented

#### Public
- `/` — Landing page (hero, how-it-works, stats, CTA)
- `/scan` — QR scanner with camera + manual fallback + demo chip
- `/verify/:batchId` — Consumer verification (verify banner, product card, timeline, beekeeper card, proof box)
- `/login` — Role selector → phone → OTP (mock: any 4 digits)

#### Beekeeper (protected, role=beekeeper)
- `/beekeeper` — Dashboard (greeting, alerts, KPI strip, hives grid)
- `/beekeeper/hive/:hiveId` — Hive detail (3 sensor charts, health gauge, prediction)
- `/beekeeper/harvest/new` — 3-step wizard (details → review → success with QR)
- `/beekeeper/batches` — Batch history list

#### Admin (protected, role=admin)
- `/admin` — Cluster overview (KPI cards, bar chart, activity feed, cluster table)
- `/admin/beekeepers` — Beekeeper table with approve action
- `/admin/batches` — Full ledger with search + status filter

#### Laboratory (protected, role=lab)
- `/lab` — Pending test queue + result form + completed tests list

### Routing (src/App.jsx)
- Public routes under PublicLayout
- Protected routes under AppShell with RoleGuard
- Catch-all redirects to `/`

## Demo Flow
1. Open `/` → Landing page
2. Click "Scan to Verify" → try `HC-2025-0042` (verified) or `HC-BAD-9999` (tampered)
3. Click "Login" → pick role → enter any phone → enter any 4 digits
4. Beekeeper: see hives, alerts, register harvest → mint → get QR
5. Admin: see stats, approve beekeepers, view batches
6. Lab: submit test results → batch leaves pending queue

## What's NOT Built (per spec — backend teammate's responsibility)
- Real blockchain SDK / ethers.js
- QR code generation (frontend only displays backend-provided QR images)
- Real OTP SMS
- AI/ML computation
- IoT data collection
- Real backend integration (set VITE_USE_MOCK=false when ready)

## Remaining Tasks
- [ ] Verify all pages render correctly in browser
- [ ] Check responsive design (mobile/tablet/desktop)
- [ ] Add smooth page transitions (Framer Motion — optional)
- [ ] README.md and API_CONTRACT.md (spec requires these)
- [ ] Any polish / bug fixes after visual inspection

## Context Recovery
If context runs out, read this file + `instructions.txt` to understand full scope.
All source is in `/Users/vikash/Desktop/honeyChain/honey-chain/src/`.
Build command: `npm run build` (from project root).
Dev server: `npm run dev` (port 5173).
