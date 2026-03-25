# ThreatBoard: Threat Intelligence Dashboard

A React-based threat intelligence dashboard built with a **manual Webpack + Babel setup** (no Create React App). Designed as a portfolio project demonstrating frontend architecture skills relevant to cybersecurity product companies.

> **Note:** Currently using mock threat data. Real-time API integration (AlienVault OTX, etc.) planned for future development.

---

## Live Demo

[View the deployed frontend](https://mandy2211.github.io/Treat-Intelligence-Dashboard/)

---
## Preview
<img width="942" height="404" alt="image" src="https://github.com/user-attachments/assets/fc51efd2-ca91-4824-a424-d087d645a85c" />

## Tech Stack

| Layer       | Choice                     | Why                                                                 |
|-------------|----------------------------|---------------------------------------------------------------------|
| UI          | React 18                   | Component-based, stateful/stateless architecture                    |
| Build       | Webpack 5 (manual)         | Full control over bundle, code splitting, aliases                   |
| Transpiler  | Babel 7                    | ES2022+ → ES5, JSX transform                                        |
| Styling     | SaSS + CSS Modules         | Scoped styles, variables, no class name collisions                  |
| Charts      | Chart.js 4                 | Lightweight, tree-shakeable                                         |
| Data layer  | OOJS class (`ThreatFeed`)  | Separates data logic from UI                                        |

---

## Architecture Decisions

### 1. Manual Webpack + Babel (not CRA)

`webpack.config.js` is hand-written and commented. Key decisions:

- **`contenthash` filenames** in production for long-term caching
- **CSS Modules** enabled only for `.module.scss` files via `auto` matcher
- **`@` alias** for clean imports (`@/components/...` vs `../../components/...`)
- **HMR** in dev, **MiniCssExtractPlugin** in production

### 2. Stateful vs Stateless Component Split

| Component          | Type                    | Reason                                                            |
|--------------------|-------------------------|-------------------------------------------------------------------|
| `App.jsx`          | **Stateful (container)**| Owns `threats`, `filters`, `sortBy` — all shared state            |
| `ThreatCard.jsx`   | Mixed                   | Owns `expanded` (local UI state only)                             |
| `StatsPanel.jsx`   | **Stateless**           | Pure render from `stats` prop                                     |
| `FilterBar.jsx`    | **Stateless**           | All state lifted to App, passed down as props                     |
| `SeverityBadge.jsx`| **Stateless**           | Derives appearance purely from `severity` prop                    |
| `Navbar.jsx`       | **Stateless**           | No props, no state, pure layout                                   |

### 3. OOJS Class — `ThreatFeed`

`src/utils/ThreatFeed.js` contains two classes:

- **`Threat`** — models a single threat indicator. Has instance methods (`isUrgent()`, `getAge()`, `toJSON()`), a static factory (`Threat.fromAPIResponse()`), and a constructor that validates/normalizes incoming data.
- **`ThreatFeed`** — data service class. Manages a cache, generates/fetches threat data, computes aggregate stats. In production, replace `getThreats()` body with a real API call to AlienVault OTX or similar.

### 4. SaSS Architecture
styles/
variables.scss ← design tokens (colors, fonts, spacing, radius)
global.scss ← reset, font import, body defaults
components/
X/X.module.scss ← scoped component styles, imported via @use "../../styles/variables"

---

## Features

- Real-time threat feed simulation
- Severity-based filtering (Low → Critical)
- Sorting by time / severity
- Expandable threat cards with detailed metadata
- Aggregated statistics panel
- Interactive charts (Chart.js)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (localhost:3000)
npm start

# Production build → /dist
npm run build
