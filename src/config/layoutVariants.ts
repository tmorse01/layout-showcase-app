import type { LayoutMetadata } from "../types/layout";

// Re-export the type for convenience
export type { LayoutMetadata };

/**
 * Metadata for all 15 layouts
 * Used by the Layout Gallery and for documentation
 */
export const layoutMetadata: LayoutMetadata[] = [
  // Top 5 (Essential)
  {
    id: "classic-app-shell",
    name: "Classic App Shell",
    description:
      "Fixed header with left sidebar navigation and scrollable main content. The default for most SaaS and admin apps.",
    tier: "essential",
    route: "/layouts/classic-app-shell",
    useCases: [
      "SaaS applications",
      "Admin dashboards",
      "Content management systems",
    ],
    headerPattern: "app-only",
    features: [
      "Fixed app header",
      "Left sidebar navigation",
      "Scrollable main content",
    ],
  },
  {
    id: "dashboard-grid",
    name: "Dashboard Grid",
    description:
      "Card-based layout showing KPIs, charts, and tables with clear visual hierarchy.",
    tier: "essential",
    route: "/layouts/dashboard-grid",
    useCases: [
      "Analytics dashboards",
      "Executive summaries",
      "Data visualization",
    ],
    headerPattern: "app-only",
    features: ["Card-based grid", "KPI displays", "Responsive layout"],
  },
  {
    id: "entity-detail",
    name: "Entity Detail (Sticky Sub-Header)",
    description:
      "Page-specific header with actions and status that stays visible while scrolling a long record.",
    tier: "essential",
    route: "/layouts/entity-detail",
    useCases: ["Record detail pages", "Product pages", "User profiles"],
    headerPattern: "app-page",
    features: ["Sticky page header", "Contextual actions", "Tabbed content"],
  },
  {
    id: "master-detail",
    name: "Master–Detail",
    description:
      "A list or table on the left with a detail panel on the right for fast item inspection.",
    tier: "essential",
    route: "/layouts/master-detail",
    useCases: ["Email clients", "File browsers", "Data management"],
    headerPattern: "app-only",
    features: ["Split view", "Synchronized selection", "Fast navigation"],
  },
  {
    id: "form-workflow",
    name: "Form-Centric Workflow",
    description:
      "Step-based or sectioned form layout with clear progress and persistent actions.",
    tier: "essential",
    route: "/layouts/form-workflow",
    useCases: ["Multi-step forms", "Wizards", "Data entry"],
    headerPattern: "app-page",
    features: ["Step indicators", "Sticky actions", "Progress tracking"],
  },
  // Top 10 (Modern Set) - Adds 5 more
  {
    id: "collapsible-sidebar",
    name: "Collapsible Sidebar App Shell",
    description:
      "App shell where the left nav can collapse to icons for focus or smaller screens.",
    tier: "modern",
    route: "/layouts/collapsible-sidebar",
    useCases: [
      "Space-constrained interfaces",
      "Focus modes",
      "Responsive design",
    ],
    headerPattern: "app-only",
    features: [
      "Collapsible navigation",
      "Icon-only mode",
      "Space optimization",
    ],
  },
  {
    id: "tabbed-content",
    name: "Tabbed Content Layout",
    description:
      "Horizontal tabs used to switch between related views within the same entity.",
    tier: "modern",
    route: "/layouts/tabbed-content",
    useCases: [
      "Entity detail pages",
      "Settings pages",
      "Multi-view interfaces",
    ],
    headerPattern: "app-page",
    features: ["Horizontal tabs", "Content switching", "State preservation"],
  },
  {
    id: "split-view",
    name: "Split View (Resizable Panels)",
    description:
      "Two or more resizable panes allowing users to control how space is allocated.",
    tier: "modern",
    route: "/layouts/split-view",
    useCases: ["Code editors", "Design tools", "Data analysis"],
    headerPattern: "app-only",
    features: ["Resizable panels", "Drag handles", "Customizable layout"],
  },
  {
    id: "table-first",
    name: "Table-First Layout",
    description:
      "Dense, data-heavy grid as the primary focus with filters and actions nearby.",
    tier: "modern",
    route: "/layouts/table-first",
    useCases: ["Data tables", "Spreadsheet-like interfaces", "Admin panels"],
    headerPattern: "app-only",
    features: ["Dense data grid", "Inline filters", "Toolbar actions"],
  },
  {
    id: "search-driven",
    name: "Search-Driven Layout",
    description:
      "Global or page-level search as the primary entry point into content.",
    tier: "modern",
    route: "/layouts/search-driven",
    useCases: ["Search interfaces", "Documentation", "Content discovery"],
    headerPattern: "app-only",
    features: ["Prominent search", "Search results", "Filter integration"],
  },
  // Top 15 (Advanced/Specialized) - Adds 5 more
  {
    id: "right-inspector",
    name: "Right-Side Inspector Layout",
    description:
      "Contextual details or settings shown in a toggleable right sidebar.",
    tier: "advanced",
    route: "/layouts/right-inspector",
    useCases: ["Design tools", "Property panels", "Contextual help"],
    headerPattern: "app-only",
    features: [
      "Toggleable right rail",
      "Contextual information",
      "Space adaptation",
    ],
  },
  {
    id: "command-centered",
    name: "Command-Centered Layout",
    description:
      "Minimal UI relying on command palettes or keyboard-first interactions.",
    tier: "advanced",
    route: "/layouts/command-centered",
    useCases: [
      "Developer tools",
      "Power user interfaces",
      "Keyboard-first apps",
    ],
    headerPattern: "none",
    features: ["Command palette", "Keyboard shortcuts", "Minimal chrome"],
  },
  {
    id: "focus-mode",
    name: "Full-Screen Focus Mode",
    description:
      "Distraction-free layout that hides navigation for editing or reviewing.",
    tier: "advanced",
    route: "/layouts/focus-mode",
    useCases: ["Writing interfaces", "Review modes", "Presentation views"],
    headerPattern: "none",
    features: ["Full-screen content", "Hidden navigation", "Mode toggle"],
  },
  {
    id: "timeline",
    name: "Timeline / Activity Layout",
    description: "Chronological layout for logs, histories, or workflows.",
    tier: "advanced",
    route: "/layouts/timeline",
    useCases: ["Activity feeds", "Event logs", "Workflow visualization"],
    headerPattern: "app-only",
    features: ["Vertical timeline", "Chronological order", "Event grouping"],
  },
  {
    id: "kanban",
    name: "Kanban / Board Layout",
    description:
      "Column-based layout optimized for drag-and-drop workflow management.",
    tier: "advanced",
    route: "/layouts/kanban",
    useCases: ["Project management", "Task boards", "Workflow visualization"],
    headerPattern: "app-only",
    features: ["Column layout", "Card organization", "Horizontal scrolling"],
  },
];

/**
 * Get layout metadata by ID
 */
export function getLayoutMetadata(id: string): LayoutMetadata | undefined {
  return layoutMetadata.find((layout) => layout.id === id);
}

/**
 * Get layouts by tier
 */
export function getLayoutsByTier(
  tier: LayoutMetadata["tier"]
): LayoutMetadata[] {
  return layoutMetadata.filter((layout) => layout.tier === tier);
}
