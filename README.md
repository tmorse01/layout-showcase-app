# Layout Showcase App

A React app that demonstrates **15 canonical app shell layouts**—from classic SaaS shells to advanced patterns like Kanban and command-centered UIs. Use it as a reference for building consistent, user-friendly application layouts.

## Tech Stack

- **React 19** with **React Compiler** (Babel plugin)
- **Vite 7** for dev server and builds
- **TypeScript**
- **React Router 7** for routing
- **MUI (Material UI) 7** and **Emotion** for components and styling
- **Base UI** (optional primitives)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (default: http://localhost:5173)
npm run dev

# Type-check and build for production
npm run build

# Preview production build
npm run preview
```

## Layouts

Layouts are grouped into three tiers: **Essential**, **Modern**, and **Advanced**.

### Essential (5)

| Layout                | Route                        | Description                                                                                    |
| --------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------- |
| **Classic App Shell** | `/layouts/classic-app-shell` | Fixed header, left sidebar nav, scrollable main content. Default for most SaaS and admin apps. |
| **Dashboard Grid**    | `/layouts/dashboard-grid`    | Card-based KPIs, charts, and tables with clear visual hierarchy.                               |
| **Entity Detail**     | `/layouts/entity-detail`     | Sticky page header with actions and status for long record pages.                              |
| **Master–Detail**     | `/layouts/master-detail`     | List/table on the left, detail panel on the right (e.g. email clients, file browsers).         |
| **Form Workflow**     | `/layouts/form-workflow`     | Step-based or sectioned forms with progress and persistent actions.                            |

### Modern (5)

| Layout                  | Route                          | Description                                                          |
| ----------------------- | ------------------------------ | -------------------------------------------------------------------- |
| **Collapsible Sidebar** | `/layouts/collapsible-sidebar` | Left nav collapses to icons for focus or smaller screens.            |
| **Tabbed Content**      | `/layouts/tabbed-content`      | Horizontal tabs to switch between related views in the same entity.  |
| **Split View**          | `/layouts/split-view`          | Resizable panes with drag handles (e.g. code editors, design tools). |
| **Table-First**         | `/layouts/table-first`         | Dense data grid as primary focus with filters and toolbar actions.   |
| **Search Driven**       | `/layouts/search-driven`       | Global or page-level search as the main entry point.                 |

### Advanced (5)

| Layout               | Route                       | Description                                                      |
| -------------------- | --------------------------- | ---------------------------------------------------------------- |
| **Right Inspector**  | `/layouts/right-inspector`  | Toggleable right sidebar for contextual details or settings.     |
| **Command Centered** | `/layouts/command-centered` | Minimal UI with command palette and keyboard-first interactions. |
| **Focus Mode**       | `/layouts/focus-mode`       | Full-screen, distraction-free layout with hidden navigation.     |
| **Timeline**         | `/layouts/timeline`         | Vertical timeline for logs, activity feeds, and workflows.       |
| **Kanban**           | `/layouts/kanban`           | Column-based board with drag-and-drop cards.                     |

## Project Structure

```
src/
├── App.tsx                 # Router and route definitions
├── main.tsx
├── config/
│   ├── layoutVariants.ts   # Metadata for all 15 layouts
│   └── sidebarData.tsx     # Nav items and icons
├── components/             # Shared UI (AppFrame, AppHeader, Navigation, etc.)
├── pages/                  # One folder per layout (e.g. LayoutGallery, SplitView)
├── types/
│   └── layout.ts           # LayoutMetadata, AppFrameConfig, LayoutVariant
```

- **Layout Gallery** (`/`) — Home page with filterable grid of all layouts.
- **Layout pages** (`/layouts/:id`) — Individual demos; each uses a shared `AppFrame` where applicable and documents the pattern.

## Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start Vite dev server              |
| `npm run build`   | Run `tsc -b` then `vite build`     |
| `npm run preview` | Serve the production build locally |
| `npm run lint`    | Run ESLint                         |

## License

See repository for license information.
