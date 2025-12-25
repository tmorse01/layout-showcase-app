import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Folder as FolderIcon,
  Analytics as AnalyticsIcon,
  People as PeopleIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  CreditCard as CreditCardIcon,
  Help as HelpIcon,
  Description as DescriptionIcon,
  CalendarToday as CalendarIcon,
  BarChart as BarChartIcon,
  Inventory as InventoryIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import type { NavigationItem } from "../components/Navigation/Navigation";

/**
 * Default sidebar navigation items
 *
 * Provides example navigation data that can be used across layouts with sidebars.
 * Includes common navigation items with icons for typical SaaS/admin applications.
 */
export const defaultNavItems: NavigationItem[] = [
  {
    label: "Dashboard",
    path: "/layouts/dashboard-grid",
    icon: <DashboardIcon />,
  },
  {
    label: "Projects",
    path: "/layouts/master-detail",
    icon: <FolderIcon />,
  },
  {
    label: "Analytics",
    path: "/layouts/table-first",
    icon: <AnalyticsIcon />,
  },
  {
    label: "Team",
    path: "/layouts/entity-detail",
    icon: <PeopleIcon />,
  },
  {
    label: "Documents",
    path: "/layouts/tabbed-content",
    icon: <DescriptionIcon />,
  },
  {
    label: "Calendar",
    path: "/layouts/timeline",
    icon: <CalendarIcon />,
  },
  {
    label: "Reports",
    path: "/layouts/split-view",
    icon: <BarChartIcon />,
  },
  {
    label: "Inventory",
    path: "/layouts/kanban",
    icon: <InventoryIcon />,
  },
  {
    label: "Messages",
    path: "/layouts/search-driven",
    icon: <EmailIcon />,
  },
  {
    label: "Notifications",
    path: "/layouts/right-inspector",
    icon: <NotificationsIcon />,
  },
  {
    label: "Settings",
    path: "/layouts/classic-app-shell",
    icon: <SettingsIcon />,
  },
  {
    label: "Security",
    path: "/layouts/form-workflow",
    icon: <SecurityIcon />,
  },
  {
    label: "Billing",
    path: "/layouts/collapsible-sidebar",
    icon: <CreditCardIcon />,
  },
  {
    label: "Profile",
    path: "/layouts/entity-detail",
    icon: <PersonIcon />,
  },
  {
    label: "Help",
    path: "/layouts/command-centered",
    icon: <HelpIcon />,
  },
];

/**
 * Minimal navigation items (for simpler layouts)
 */
export const minimalNavItems: NavigationItem[] = [
  {
    label: "Dashboard",
    path: "/layouts/dashboard-grid",
    icon: <DashboardIcon />,
  },
  {
    label: "Projects",
    path: "/layouts/master-detail",
    icon: <FolderIcon />,
  },
  {
    label: "Settings",
    path: "/layouts/classic-app-shell",
    icon: <SettingsIcon />,
  },
];

/**
 * Primary navigation items (most commonly used)
 */
export const primaryNavItems: NavigationItem[] = [
  {
    label: "Dashboard",
    path: "/layouts/dashboard-grid",
    icon: <DashboardIcon />,
  },
  {
    label: "Projects",
    path: "/layouts/master-detail",
    icon: <FolderIcon />,
  },
  {
    label: "Analytics",
    path: "/layouts/table-first",
    icon: <AnalyticsIcon />,
  },
  {
    label: "Team",
    path: "/layouts/entity-detail",
    icon: <PeopleIcon />,
  },
  {
    label: "Settings",
    path: "/layouts/classic-app-shell",
    icon: <SettingsIcon />,
  },
];
