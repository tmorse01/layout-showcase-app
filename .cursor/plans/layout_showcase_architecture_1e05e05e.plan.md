---
name: Layout Showcase Architecture
overview: Build a React + Vite app showcasing 15 canonical app shell layouts and page archetypes using a shared AppFrame component with CSS Grid, MUI for visual primitives, Base UI for interactions, and CSS Modules for styling. Includes guidance on header usage patterns.
todos:
  - id: setup-deps
    content: Install React Router, MUI, and Base UI dependencies
    status: completed
  - id: create-appframe
    content: Create AppFrame component with CSS Grid layout and CSS variables
    status: completed
    dependencies:
      - setup-deps
  - id: define-types-config
    content: Define TypeScript types and layout variant configurations
    status: completed
    dependencies:
      - create-appframe
  - id: create-header-system
    content: Create header system supporting app header and page-specific headers with height constraints
    status: completed
    dependencies:
      - define-types-config
  - id: layout-classic-app-shell
    content: Implement Classic App Shell (fixed header + left sidebar + scrollable main)
    status: pending
    dependencies:
      - create-header-system
  - id: layout-dashboard-grid
    content: Implement Dashboard Grid layout (card-based KPI layout)
    status: pending
    dependencies:
      - layout-classic-app-shell
  - id: layout-entity-detail
    content: Implement Entity Detail with sticky sub-header
    status: pending
    dependencies:
      - layout-classic-app-shell
  - id: layout-master-detail
    content: Implement Master-Detail split layout
    status: pending
    dependencies:
      - layout-classic-app-shell
  - id: layout-form-workflow
    content: Implement Form-Centric Workflow with step-based sections
    status: pending
    dependencies:
      - layout-classic-app-shell
  - id: layout-collapsible-sidebar
    content: Implement Collapsible Sidebar App Shell
    status: pending
    dependencies:
      - layout-classic-app-shell
  - id: layout-tabbed-content
    content: Implement Tabbed Content Layout
    status: pending
    dependencies:
      - layout-entity-detail
  - id: layout-split-view
    content: Implement Split View with resizable panels
    status: pending
    dependencies:
      - layout-master-detail
  - id: layout-table-first
    content: Implement Table-First Layout with dense data grid
    status: pending
    dependencies:
      - layout-collapsible-sidebar
  - id: layout-search-driven
    content: Implement Search-Driven Layout
    status: pending
    dependencies:
      - layout-classic-app-shell
  - id: layout-right-inspector
    content: Implement Right-Side Inspector Layout
    status: pending
    dependencies:
      - layout-classic-app-shell
  - id: layout-command-centered
    content: Implement Command-Centered Layout with command palette
    status: pending
    dependencies:
      - create-header-system
  - id: layout-focus-mode
    content: Implement Full-Screen Focus Mode
    status: pending
    dependencies:
      - create-header-system
  - id: layout-timeline
    content: Implement Timeline/Activity Layout
    status: pending
    dependencies:
      - layout-classic-app-shell
  - id: layout-kanban
    content: Implement Kanban/Board Layout with drag-and-drop
    status: pending
    dependencies:
      - layout-classic-app-shell
  - id: create-gallery
    content: Create Layout Gallery home page organizing all 15 layouts
    status: pending
    dependencies:
      - layout-dashboard-grid
      - layout-entity-detail
      - layout-master-detail
      - layout-form-workflow
      - layout-collapsible-sidebar
      - layout-tabbed-content
      - layout-split-view
      - layout-table-first
      - layout-search-driven
      - layout-right-inspector
      - layout-command-centered
      - layout-focus-mode
      - layout-timeline
      - layout-kanban
  - id: setup-routing
    content: Configure React Router with all 15 layout routes
    status: pending
    dependencies:
      - create-gallery
---

# Layout Showcase App - Implementation Plan

## Architecture Overview

The app will showcase 15 canonical layouts organized into three tiers: Essential (5), Complete Modern Set (10), and Advanced/Specialized (15). Each layout demonstrates specific header patterns, navigation strategies, and content organization principles.

### Header Usage Guidelines

**Fixed App Header (Global)**

- Use when: Navigation and global actions need constant visibility
- Height: 48-64px (standard), max 80px
- Contains: App logo, global nav, user menu, notifications
- Always present in app shell layouts

**Page-Specific Header (Sticky Sub-Header)**

- Use when: Page has contextual actions, breadcrumbs, or status that should remain visible while scrolling
- Can be fixed: Yes, when content is long and actions are frequently used
- Height: 56-72px (standard), max 96px
- Contains: Page title, breadcrumbs, primary actions, status indicators

**Max Total Fixed Height Rule**

- App header + Page header combined: **Maximum 144px total**
- Recommended: App header (64px) + Page header (72px) = 136px
- Beyond 144px risks excessive vertical space loss on smaller screens

**When to Use Each Pattern**

- **Fixed app header only**: Dashboard, list views, search results (actions are in content area)
- **Fixed app header + sticky page header**: Entity detail pages, form pages, settings (frequent actions while scrolling)
- **No fixed headers**: Full-screen focus mode, command-centered layouts (distraction-free)

### Component Hierarchy

```javascript
App (Router)
  └─ LayoutGallery (home page)
  └─ AppFrame (shared shell)
      ├─ AppHeader (fixed, optional)
      ├─ Navigation (variant-specific)
      ├─ PageHeader (sticky, optional)
      ├─ Main (scrollable)
      └─ RightRail (optional)
```



## Layout Catalog

### Top 5 (Essential)

**1. Classic App Shell** (`/layouts/classic-app-shell`)

- Fixed header (64px) + left sidebar navigation + scrollable main content
- Default pattern for most SaaS and admin apps
- Demonstrates: Basic grid structure, scroll containment
- File: `src/pages/ClassicAppShell/ClassicAppShell.tsx`

**2. Dashboard Grid** (`/layouts/dashboard-grid`)

- Card-based layout with KPIs, charts, and tables
- Uses Classic App Shell as base
- Demonstrates: Visual hierarchy, responsive grid, content density
- File: `src/pages/DashboardGrid/DashboardGrid.tsx`

**3. Entity Detail (Sticky Sub-Header)** (`/layouts/entity-detail`)

- Fixed app header + sticky page header (72px) with actions and status
- Long scrollable record with tabs
- Demonstrates: When to use page-specific header, sticky positioning
- File: `src/pages/EntityDetail/EntityDetail.tsx`

**4. Master-Detail** (`/layouts/master-detail`)

- List/table on left, detail panel on right
- Fast item inspection without navigation
- Demonstrates: Split view, state synchronization
- File: `src/pages/MasterDetail/MasterDetail.tsx`

**5. Form-Centric Workflow** (`/layouts/form-workflow`)

- Step-based or sectioned form with progress indicator
- Sticky action bar at bottom
- Demonstrates: Form layout, progress tracking, persistent actions
- File: `src/pages/FormWorkflow/FormWorkflow.tsx`

### Top 10 (Complete Modern Set) - Adds 5 more

**6. Collapsible Sidebar App Shell** (`/layouts/collapsible-sidebar`)

- Left nav collapses to icons for focus or smaller screens
- Toggle button in header
- Demonstrates: Responsive navigation, space optimization
- File: `src/pages/CollapsibleSidebar/CollapsibleSidebar.tsx`

**7. Tabbed Content Layout** (`/layouts/tabbed-content`)

- Horizontal tabs to switch between related views within same entity
- Uses Entity Detail as base, adds tab navigation
- Demonstrates: Tab patterns, content organization
- File: `src/pages/TabbedContent/TabbedContent.tsx`

**8. Split View (Resizable Panels)** (`/layouts/split-view`)

- Two or more resizable panes for user-controlled space allocation
- Extends Master-Detail with resizable functionality
- Demonstrates: Resizable panels, drag handles
- File: `src/pages/SplitView/SplitView.tsx`

**9. Table-First Layout** (`/layouts/table-first`)

- Dense, data-heavy grid as primary focus
- Filters and actions nearby (toolbar or sidebar)
- Demonstrates: Data table patterns, filter placement
- File: `src/pages/TableFirst/TableFirst.tsx`

**10. Search-Driven Layout** (`/layouts/search-driven`)

- Global or page-level search as primary entry point
- Search results with filters
- Demonstrates: Search-first UX, result organization
- File: `src/pages/SearchDriven/SearchDriven.tsx`

### Top 15 (Advanced/Specialized) - Adds 5 more

**11. Right-Side Inspector Layout** (`/layouts/right-inspector`)

- Contextual details or settings in toggleable right sidebar
- Main content adjusts when inspector opens
- Demonstrates: Right rail patterns, contextual information
- File: `src/pages/RightInspector/RightInspector.tsx`

**12. Command-Centered Layout** (`/layouts/command-centered`)

- Minimal UI relying on command palettes or keyboard-first interactions
- Command+K to open palette
- Demonstrates: Keyboard-first UX, minimal chrome
- File: `src/pages/CommandCentered/CommandCentered.tsx`

**13. Full-Screen Focus Mode** (`/layouts/focus-mode`)

- Distraction-free layout hiding navigation for editing/reviewing
- Toggle to enter/exit focus mode
- Demonstrates: Content-first approach, mode switching
- File: `src/pages/FocusMode/FocusMode.tsx`

**14. Timeline / Activity Layout** (`/layouts/timeline`)

- Chronological layout for logs, histories, or workflows
- Vertical timeline with events
- Demonstrates: Timeline patterns, chronological organization
- File: `src/pages/Timeline/Timeline.tsx`

**15. Kanban / Board Layout** (`/layouts/kanban`)

- Column-based layout optimized for drag-and-drop workflow management
- Horizontal scrolling columns
- Demonstrates: Board patterns, drag-and-drop (visual only, no actual DnD library)
- File: `src/pages/Kanban/Kanban.tsx`

## Implementation Steps

### Phase 1: Foundation Setup

**1.1 Install Dependencies**

- Add `react-router-dom` for routing
- Add `@mui/material` and `@mui/icons-material` for visual primitives
- Add `@mui/base` for headless interactions (Menu, Dialog, Popover, Tooltip)
- Configure CSS Modules support in Vite (already supported by default)

**1.2 Create Shared Layout System**

- `src/components/AppFrame/AppFrame.tsx` - Main shell component using CSS Grid
- `src/components/AppFrame/AppFrame.module.css` - Grid layout with CSS variables
- `src/components/AppHeader/AppHeader.tsx` - Fixed global header component
- `src/components/PageHeader/PageHeader.tsx` - Sticky page-specific header component
- `src/components/Navigation/Navigation.tsx` - Navigation menu component
- `src/components/RightRail/RightRail.tsx` - Optional right sidebar
- `src/types/layout.ts` - TypeScript types for shell variants and config
- `src/config/layoutVariants.ts` - Configuration for each shell variant

**1.3 Establish CSS Module Conventions**

- Breakpoints: mobile (320px), tablet (768px), desktop (1024px)
- CSS variables:
- `--app-header-height: 64px` (max 80px)
- `--page-header-height: 72px` (max 96px)
- `--max-total-header-height: 144px`
- `--nav-width: 240px` (collapsed: 64px)
- `--right-rail-width: 320px`
- Consistent class naming: `.frame`, `.appHeader`, `.pageHeader`, `.nav`, `.main`, `.rightRail`

### Phase 2: Core Shell Variants

**2.1 Classic App Shell**

- Fixed app header (64px)
- Left sidebar navigation (240px)
- Scrollable main content area
- Mobile: Hamburger menu overlay
- Base for most other layouts

**2.2 Collapsible Sidebar Variant**

- Extends Classic App Shell
- Toggle button to collapse sidebar to icons (64px width)
- State persists during session
- Smooth transition animation

**2.3 Header System**

- AppHeader: Fixed at top, always visible in shell layouts
- PageHeader: Sticky below app header, optional per page
- Height constraints enforced via CSS variables
- Documentation comments explaining when to use each

### Phase 3: Page Layouts Implementation

**3.1 Essential Layouts (Top 5)**

- Classic App Shell (base)
- Dashboard Grid
- Entity Detail with sticky sub-header
- Master-Detail
- Form-Centric Workflow

**3.2 Modern Set Additions (6-10)**

- Collapsible Sidebar
- Tabbed Content
- Split View (resizable)
- Table-First
- Search-Driven

**3.3 Advanced Layouts (11-15)**

- Right-Side Inspector
- Command-Centered
- Full-Screen Focus Mode
- Timeline/Activity
- Kanban/Board

### Phase 4: Layout Gallery & Routing

**4.1 Layout Gallery** (`/` - home page)

- Organized by tier (Essential, Modern, Advanced)
- Each layout card shows:
- Name and description
- When to use guidance
- Header pattern used (app header, page header, both, none)
- Link to live example
- File: `src/pages/LayoutGallery/LayoutGallery.tsx`

**4.2 Router Setup**

- Configure React Router in `src/main.tsx`
- Routes for all 15 layouts
- Each route uses appropriate AppFrame variant
- Navigation breadcrumbs showing current layout

## Technical Specifications

### CSS Grid Layout Structure

```css
.frame {
  display: grid;
  grid-template-areas:
    "appHeader appHeader appHeader"
    "nav pageHeader rightRail"
    "nav main rightRail";
  grid-template-rows: 
    var(--app-header-height) 
    var(--page-header-height, 0) 
    1fr;
  grid-template-columns: 
    var(--nav-width) 
    1fr 
    var(--right-rail-width, 0);
  min-height: 100dvh;
}
```



### Scroll Containment Rules

- Frame: `min-height: 100dvh` (no overflow)
- AppHeader: `position: fixed`, `top: 0`, `z-index: 1000`
- PageHeader: `position: sticky`, `top: var(--app-header-height)`, `z-index: 999`
- Navigation: `position: fixed` or `sticky` depending on variant
- Main: `overflow: auto`, `height: calc(100dvh - var(--app-header-height) - var(--page-header-height, 0))`

### Header Height Constraints

- App header: 48-64px standard, max 80px
- Page header: 56-72px standard, max 96px
- Combined max: 144px (enforced via CSS calc and max-height)
- Documentation in code comments explaining rationale

### MUI Usage Guidelines

- Use: Typography, Paper, Button, IconButton, Icons, Chip, Divider
- Avoid: AppBar, Drawer, Layout components (build custom with CSS Grid)
- Use Base UI: Menu, Dialog, Popover, Tooltip for interactions
- Use Base UI Menu for command palette

### File Structure

```javascript
src/
  components/
    AppFrame/
      AppFrame.tsx
      AppFrame.module.css
    AppHeader/
      AppHeader.tsx
      AppHeader.module.css
    PageHeader/
      PageHeader.tsx
      PageHeader.module.css
    Navigation/
      Navigation.tsx
      Navigation.module.css
    RightRail/
      RightRail.tsx
      RightRail.module.css
  pages/
    LayoutGallery/
      LayoutGallery.tsx
      LayoutGallery.module.css
    ClassicAppShell/
      ClassicAppShell.tsx
      ClassicAppShell.module.css
    DashboardGrid/
      DashboardGrid.tsx
      DashboardGrid.module.css
    EntityDetail/
      EntityDetail.tsx
      EntityDetail.module.css
    MasterDetail/
      MasterDetail.tsx
      MasterDetail.module.css
    FormWorkflow/
      FormWorkflow.tsx
      FormWorkflow.module.css
    CollapsibleSidebar/
      CollapsibleSidebar.tsx
      CollapsibleSidebar.module.css
    TabbedContent/
      TabbedContent.tsx
      TabbedContent.module.css
    SplitView/
      SplitView.tsx
      SplitView.module.css
    TableFirst/
      TableFirst.tsx
      TableFirst.module.css
    SearchDriven/
      SearchDriven.tsx
      SearchDriven.module.css
    RightInspector/
      RightInspector.tsx
      RightInspector.module.css
    CommandCentered/
      CommandCentered.tsx
      CommandCentered.module.css
    FocusMode/
      FocusMode.tsx
      FocusMode.module.css
    Timeline/
      Timeline.tsx
      Timeline.module.css
    Kanban/
      Kanban.tsx
      Kanban.module.css
  config/
    layoutVariants.ts
    layoutMetadata.ts (descriptions, use cases, header patterns)
  types/
    layout.ts
  App.tsx (router setup)
```



## Key Implementation Details

1. **AppFrame Component**: Accepts `variant` prop and `config` object to control shell behavior (showAppHeader, showPageHeader, showNav, showRightRail, navCollapsed)
2. **CSS Variables**: Defined in `AppFrame.module.css` for consistent theming and height management
3. **Header System**: Separate AppHeader and PageHeader components with clear documentation on when to use each
4. **Responsive Breakpoints**: Mobile-first approach with CSS media queries
5. **Content Density**: Each page includes realistic content to demonstrate layout behavior
6. **Documentation**: Inline comments explaining header usage patterns and layout decisions
7. **Layout Metadata**: Configuration file with descriptions, use cases, and header patterns for gallery display

## Success Criteria

- All 15 layouts functional and accessible via routes
- Header usage patterns clearly demonstrated and documented
- Height constraints respected (max 144px total fixed headers)
- Responsive behavior works across breakpoints
- Scroll containment correct (no double scrollbars)