# TaskFlow

TaskFlow is a premium Web3 project and task operating system designed for decentralized teams. Built as a high-fidelity front-end application integrated with Stacks L2 L1 Bitcoin anchor simulation patterns, it delivers modern sprint planning, dynamic on-chain reputation systems, and wallet-gated workspaces.

---

## Technical Overview

TaskFlow bridges advanced project management workflows with decentralized Web3 mechanics. The application utilizes Next.js App Router architectures alongside a unified global client-side state engine that manages reactive components, persistent memory structures, and simulated smart contract events.

### Core Stack
* **Framework:** Next.js (Server Components and Client Boundaries)
* **Styling & Motion:** Tailwind CSS, Framer Motion
* **State Engine:** React Context (Synced via LocalStorage)
* **Integration Layer:** Stacks Connect SDK (Simulated & Dynamic)
* **Type Safety:** TypeScript (Strict interface definitions)

---

## Architectural Breakdown

### 1. Unified State Engine (lib/AppContext.tsx)
The global state layer coordinates asynchronous inputs and dynamic updates across all routing modules:
* **Workspace Isolation:** Maintains distinct collections of projects, tasks, and member lists partitioned by workspace context.
* **Reputation Ledger:** Increases user reputation dynamically based on completed task priority (High: +70, Medium: +50, Low: +30 points).
* **Simulated Ledger Sync:** Dispatches transactional telemetry logs to the Smart Audit Stream upon updating sprint item statuses or connecting decentralized wallets.
* **Storage Synchronization:** Automatically mirrors active session parameters to `localStorage` to ensure consistency upon route switching or browser reload actions.

### 2. Layout & Shell Systems
The dashboard leverages nested route layouts:
* **Outer Framework (app/dashboard/layout.tsx):** Houses a responsive Sidebar on desktop environments and a slide-out top-drawer navigation bar for mobile sizes. Also controls the persistent workspace switcher dropdown and Stacks wallet status connections.
* **Interactive Badges:** The navigation elements read task completion lists dynamically and output real-time badge counts inside the Sidebar.

---

## Detailed Feature Index

### Interactive Kanban Boards (/dashboard/tasks)
* Interactive board split into columns: To Do, In Progress, and Completed & Verified.
* Task cards include project linkages, due dates, assignee labels, and priority chips.
* Advancing tasks to Completed triggers a Stacks Block Mining overlay, simulating smart contract verification before minting reputation credentials.

### Workspace Customization & Gating (/dashboard/workspace)
* Invite simulated team members and assign roles (Owner, Developer, Contributor, Viewer).
* Toggle Clarity smart contract gating based on STX balance parameters (Requires holding at least 100 STX on-chain to unlock workspace visibility).
* Live displays for simulated gas fees and target Clarity smart contract deployment parameters.

### Product Tabs Showcase (/product)
* Custom tab navigation switcher highlighting Kanban Boards, Clarity Proofs, Token Gating, and On-Chain Reputation.
* Each tab features a simulated live visual dashboard demonstrating the respective Web3 mechanics.

### Interactive Pricing Toggles (/pricing)
* Dynamic billing cycle toggle between Monthly and Yearly subscriptions.
* Features price updates with smooth sliding animations and a mock checkout confirmation workflow.

### Live Developer Documentation (/docs)
* Integrated instant filter search bar allowing developers to search SDK guides and REST endpoints.
* Interactive sandbox executor enabling developers to test GET /api/v1/workspace/sprints requests and view structured JSON responses.

### Milestone Upvoting Roadmap (/roadmap)
* Interactive upvote counters linked directly to the dynamic state engine.
* Suggestion pipeline letting users submit proposals directly to the DAO sprint backlog.

---

## Directory Structure

```text
stacksfrontend/
├── app/                      # Next.js routing routes
│   ├── dashboard/            # Dashboard pages
│   │   ├── projects/         # Sprint projects pages
│   │   ├── tasks/            # Interactive Kanban Board
│   │   ├── workspace/        # Settings & Token gating
│   │   └── layout.tsx        # Dynamic dashboard shell
│   ├── docs/                 # Developer portal
│   ├── pricing/              # Subscription routes
│   ├── product/              # Features showcase
│   ├── roadmap/              # Feedback upvotes
│   ├── start/                # Workspace creator
│   ├── layout.tsx            # Global layout shell
│   └── page.tsx              # Public SaaS portal homepage
├── components/
│   ├── dashboard/            # Overview widgets
│   ├── landing/              # Home blocks (Hero, Features, Testimonials)
│   ├── layout/               # StandardPage marketing wrapper
│   ├── navigation/           # Sidebar components
│   └── providers/            # Providers config
├── data/
│   └── mock-data.ts          # Core static structures
├── lib/
│   ├── AppContext.tsx        # Global state engine
│   └── utils.ts              # Styling & format helper functions
└── types/
    └── index.ts              # Project TypeScript definitions
```

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open `http://localhost:3000` inside your browser to view the local instance.

### 3. Build for Production
Verify typescript safety and bundle optimizations:
```bash
npm run build
```
This outputs a production-ready folder directory compilation of static routes and optimized page bundles.
