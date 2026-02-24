# Agent Instructions - Layout Implementation

This document provides instructions for agents building individual layouts in parallel.

## Foundation Architecture (Already Complete)

The following foundation components are already implemented and available:

- **AppFrame** (`src/components/AppFrame/`) - Main shell component with CSS Grid
- **AppHeader** (`src/components/AppHeader/`) - Fixed global header (64px)
- **PageHeader** (`src/components/PageHeader/`) - Sticky page header (72px)
- **Navigation** (`src/components/Navigation/`) - Left sidebar navigation
- **RightRail** (`src/components/RightRail/`) - Right sidebar component
- **Types & Config** (`src/types/layout.ts`, `src/config/layoutVariants.ts`)

All placeholder pages are created at `src/pages/[LayoutName]/[LayoutName].tsx`.

## Tech Standards (MUST FOLLOW)

### Styling
- **CSS Modules only** for layout styling
- Use CSS Grid for outer layout, Flexbox for inner composition
- Use CSS variables defined in `AppFrame.module.css`:
  - `--spacing-unit`, `--spacing-xs`, `--spacing-sm`, `--spacing-md`, `--spacing-lg`, `--spacing-xl`
  - `--app-header-height` (64px)
  - `--page-header-height` (72px)
  - `--nav-width` (240px)
  - `--right-rail-width` (320px)

### UI Libraries
- **MUI** for visual primitives: Typography, Paper, Button, IconButton, Chip, Divider, etc.
- **Base UI** (`@base-ui/react`) for headless interactions: Menu, Dialog, Popover, Tooltip
- **DO NOT use** MUI AppBar, Drawer, or Layout components

### Header Usage Rules

**Fixed App Header (Global)**
- Height: 48-64px (max 80px)
- Use when: Navigation and global actions need constant visibility
- Set `showAppHeader={true}` on AppFrame

**Page-Specific Header (Sticky Sub-Header)**
- Height: 56-72px (max 96px)
- Use when: Page has contextual actions, breadcrumbs, or status that should remain visible while scrolling
- Can be fixed: Yes, when content is long and actions are frequently used
- Set `showPageHeader={true}` and provide `pageHeaderContent` prop

**Max Total Fixed Height: 144px**
- App header (64px) + Page header (72px) = 136px (recommended)
- Never exceed 144px combined

**When to Use Each Pattern:**
- **App header only**: Dashboard, list views, search results (actions are in content area)
- **App + Page header**: Entity detail pages, form pages, settings (frequent actions while scrolling)
- **No fixed headers**: Full-screen focus mode, command-centered layouts (distraction-free)

### Scroll Containment
- Frame uses `min-height: 100dvh` (no overflow)
- Header/Nav: `position: fixed` or `sticky`
- Main content: `overflow: auto`, height calculated to prevent double scrollbars

## Layout Implementation Guide

### Step 1: Understand Your Layout

Each layout has metadata in `src/config/layoutVariants.ts`. Review:
- Description and use cases
- Header pattern (app-only, app-page, page-only, none)
- Features to demonstrate

### Step 2: Configure AppFrame

Import and use the `AppFrame` component with appropriate props:

```tsx
import { AppFrame } from '../../components/AppFrame/AppFrame';
import { PageHeader } from '../../components/PageHeader/PageHeader';

export function YourLayout() {
  return (
    <AppFrame
      showAppHeader={true}        // Based on header pattern
      showPageHeader={true}        // If app-page or page-only
      showNav={true}               // Usually true unless focus mode
      showRightRail={false}        // Only if needed
      navCollapsed={false}         // For collapsible sidebar variant
      pageHeaderContent={          // If showPageHeader is true
        <PageHeader
          title="Your Page Title"
          breadcrumbs={[...]}
          actions={<Button>Action</Button>}
          status={<span>Status</span>}
        />
      }
    >
      {/* Your layout content */}
    </AppFrame>
  );
}
```

### Step 3: Implement Layout Content

Create realistic content that demonstrates the layout pattern:

- **Dashboard Grid**: Cards with KPIs, charts, tables in a responsive grid
- **Entity Detail**: Long scrollable content with tabs, sticky header with actions
- **Master-Detail**: Split view with list on left, detail on right
- **Form Workflow**: Multi-step form with progress indicator, sticky actions
- **Table-First**: Dense data table with filters and toolbar
- **Search-Driven**: Prominent search bar with results below
- **Timeline**: Vertical timeline with chronological events
- **Kanban**: Column-based board with cards (visual only, no actual DnD)

### Step 4: Create CSS Module

Create `[LayoutName].module.css` in the same directory:

```css
.container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  height: 100%;
}

/* Use CSS Grid for outer layout */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
}

/* Use Flexbox for inner composition */
.row {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}
```

### Step 5: Responsive Behavior

Ensure layout works across breakpoints:
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+

Use media queries in your CSS module:
```css
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

## Layout-Specific Requirements

### 1. Classic App Shell (`/layouts/classic-app-shell`)
- Fixed app header + left sidebar + scrollable main
- Demonstrate basic structure with realistic content
- Show navigation items

### 2. Dashboard Grid (`/layouts/dashboard-grid`)
- Card-based layout with KPIs, charts, tables
- Use CSS Grid for responsive card layout
- Show visual hierarchy

### 3. Entity Detail (`/layouts/entity-detail`)
- **MUST use**: `showAppHeader={true}` AND `showPageHeader={true}`
- Sticky page header with actions and status
- Long scrollable content with tabs
- Demonstrate when page header is useful

### 4. Master-Detail (`/layouts/master-detail`)
- Split view: list/table left, detail right
- Use CSS Grid or Flexbox for split
- Show synchronized selection

### 5. Form Workflow (`/layouts/form-workflow`)
- **MUST use**: `showAppHeader={true}` AND `showPageHeader={true}`
- Multi-step form with progress indicator
- Sticky action bar (can be in page header or bottom)
- Show step navigation

### 6. Collapsible Sidebar (`/layouts/collapsible-sidebar`)
- Toggle button to collapse sidebar to icons
- Use state to manage `navCollapsed` prop
- Smooth transition animation

### 7. Tabbed Content (`/layouts/tabbed-content`)
- **MUST use**: `showPageHeader={true}`
- Horizontal tabs to switch views
- Can use MUI Tabs component or custom
- Show content switching

### 8. Split View (`/layouts/split-view`)
- Resizable panels (visual drag handles, no actual resize library needed)
- Show how space allocation works
- Use CSS Grid with `fr` units or Flexbox

### 9. Table-First (`/layouts/table-first`)
- Dense data table as primary focus
- Filters and actions in toolbar or sidebar
- Use MUI Table or Paper with custom styling

### 10. Search-Driven (`/layouts/search-driven`)
- Prominent search bar (can be in app header or main content)
- Search results with filters
- Show search-first UX pattern

### 11. Right Inspector (`/layouts/right-inspector`)
- **MUST use**: `showRightRail={true}`
- Toggleable right sidebar
- Main content adjusts when inspector opens
- Show contextual information pattern

### 12. Command-Centered (`/layouts/command-centered`)
- **MUST use**: `showAppHeader={false}`, `showNav={false}`
- Minimal UI with command palette (Cmd+K)
- Use Base UI Menu for command palette
- Keyboard-first interaction pattern

### 13. Focus Mode (`/layouts/focus-mode`)
- **MUST use**: `showAppHeader={false}`, `showNav={false}`
- Full-screen content, no navigation
- Can add toggle to enter/exit focus mode
- Distraction-free layout

### 14. Timeline (`/layouts/timeline`)
- Vertical timeline with chronological events
- Use CSS to create timeline line
- Show event grouping and ordering

### 15. Kanban (`/layouts/kanban`)
- Column-based board layout
- Horizontal scrolling columns
- Cards in columns (visual only, no DnD library)
- Use CSS Grid or Flexbox

## Code Quality Checklist

- [ ] Uses AppFrame component correctly
- [ ] Header pattern matches layout metadata
- [ ] CSS Module created and used
- [ ] Realistic content density
- [ ] Responsive across breakpoints
- [ ] No double scrollbars
- [ ] Uses MUI for visual primitives only
- [ ] Uses Base UI for interactions
- [ ] No MUI layout components (AppBar, Drawer, etc.)
- [ ] Code is clear and instructional
- [ ] Comments explain layout decisions

## File Structure

Your layout should be in:
```
src/pages/[LayoutName]/
  [LayoutName].tsx          # Main component
  [LayoutName].module.css   # Layout-specific styles
```

Example:
```
src/pages/DashboardGrid/
  DashboardGrid.tsx
  DashboardGrid.module.css
```

## Testing Your Layout

1. Run `pnpm dev`
2. Navigate to your layout route (e.g., `/layouts/dashboard-grid`)
3. Verify:
   - Header pattern is correct
   - Content scrolls properly (no double scrollbars)
   - Responsive behavior works
   - Layout demonstrates the pattern clearly

## Common Patterns

### Sticky Actions Bar
```tsx
<div className={styles.actionsBar}>
  <Button variant="contained">Save</Button>
  <Button>Cancel</Button>
</div>
```

```css
.actionsBar {
  position: sticky;
  bottom: 0;
  padding: var(--spacing-md);
  background: #fff;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
}
```

### Responsive Grid
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-md);
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

### Tabs Implementation
```tsx
import { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';

const [value, setValue] = useState(0);

<Tabs value={value} onChange={(e, v) => setValue(v)}>
  <Tab label="Overview" />
  <Tab label="Details" />
  <Tab label="History" />
</Tabs>
<Box>
  {value === 0 && <OverviewContent />}
  {value === 1 && <DetailsContent />}
  {value === 2 && <HistoryContent />}
</Box>
```

## Questions?

If you're unsure about:
- Header pattern: Check `layoutMetadata` in `src/config/layoutVariants.ts`
- AppFrame props: Check `src/components/AppFrame/AppFrame.tsx`
- CSS variables: Check `src/components/AppFrame/AppFrame.module.css`
- Component usage: Check existing placeholder implementations

## Final Notes

- Focus on **layout patterns**, not visual flair
- Keep code **readable and instructional**
- Demonstrate **realistic content density**
- Show **responsive behavior**
- Follow **header height constraints** (max 144px total)

Good luck! 🚀

