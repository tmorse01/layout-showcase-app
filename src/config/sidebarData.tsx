import {
  ViewSidebar,
  Dashboard,
  Article,
  ViewColumn,
  Assignment,
  Menu,
  Tab,
  Splitscreen,
  TableChart,
  Search,
  Info,
  Keyboard,
  Fullscreen,
  Timeline,
  ViewKanban,
} from "@mui/icons-material";
import type {
  NavigationItem,
  NavigationGroup,
} from "../components/Navigation/Navigation";
import { layoutMetadata } from "./layoutVariants";

// Map layout IDs to icons
const layoutIcons: Record<string, React.ReactNode> = {
  "classic-app-shell": <ViewSidebar />,
  "dashboard-grid": <Dashboard />,
  "entity-detail": <Article />,
  "master-detail": <ViewColumn />,
  "form-workflow": <Assignment />,
  "collapsible-sidebar": <Menu />,
  "tabbed-content": <Tab />,
  "split-view": <Splitscreen />,
  "table-first": <TableChart />,
  "search-driven": <Search />,
  "right-inspector": <Info />,
  "command-centered": <Keyboard />,
  "focus-mode": <Fullscreen />,
  timeline: <Timeline />,
  kanban: <ViewKanban />,
};

/**
 * Generate navigation items from layout metadata
 */
function createNavItemsFromLayouts(
  layouts: typeof layoutMetadata
): NavigationItem[] {
  return layouts.map((layout) => ({
    label: layout.name,
    path: layout.route,
    icon: layoutIcons[layout.id],
  }));
}

/**
 * Generate navigation groups by tier
 */
function createNavGroupsByTier(): NavigationGroup[] {
  const essential = layoutMetadata.filter((l) => l.tier === "essential");
  const modern = layoutMetadata.filter((l) => l.tier === "modern");
  const advanced = layoutMetadata.filter((l) => l.tier === "advanced");

  const groups: NavigationGroup[] = [];

  if (essential.length > 0) {
    groups.push({
      label: "Essential Layouts",
      items: createNavItemsFromLayouts(essential),
    });
  }

  if (modern.length > 0) {
    groups.push({
      label: "Modern Set",
      items: createNavItemsFromLayouts(modern),
    });
  }

  if (advanced.length > 0) {
    groups.push({
      label: "Advanced & Specialized",
      items: createNavItemsFromLayouts(advanced),
    });
  }

  return groups;
}

/**
 * Default sidebar navigation items grouped by tier
 *
 * Provides navigation data that matches the layout showcase grouping.
 * Items are organized by Essential, Modern Set, and Advanced & Specialized tiers.
 */
export const defaultNavGroups: NavigationGroup[] = createNavGroupsByTier();

/**
 * Default sidebar navigation items (flat list, for backwards compatibility)
 */
export const defaultNavItems: NavigationItem[] =
  createNavItemsFromLayouts(layoutMetadata);

/**
 * Minimal navigation items (for simpler layouts)
 * Includes only the first 3 essential layouts
 */
export const minimalNavItems: NavigationItem[] = createNavItemsFromLayouts(
  layoutMetadata.filter((l) => l.tier === "essential").slice(0, 3)
);

/**
 * Primary navigation items (most commonly used)
 * Includes all essential layouts
 */
export const primaryNavItems: NavigationItem[] = createNavItemsFromLayouts(
  layoutMetadata.filter((l) => l.tier === "essential")
);
