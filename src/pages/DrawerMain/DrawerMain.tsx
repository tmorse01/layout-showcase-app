import { useState } from "react";
import {
  Box,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Chip,
  Button,
  IconButton,
  Divider,
  AppBar,
  Toolbar,
  Card,
  CardContent,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Inbox as InboxIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  TrendingUp as TrendingUpIcon,
  Assignment as AssignmentIcon,
  Star as StarIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { BackToShowcase } from "../../components/BackToShowcase/BackToShowcase";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import styles from "./DrawerMain.module.css";

const DRAWER_WIDTH = 240;

const navItems = [
  { label: "Dashboard", icon: <DashboardIcon />, badge: null },
  { label: "Inbox", icon: <InboxIcon />, badge: "5" },
  { label: "People", icon: <PeopleIcon />, badge: null },
  { label: "Analytics", icon: <BarChartIcon />, badge: null },
  { label: "Tasks", icon: <AssignmentIcon />, badge: "12" },
];

const secondaryNavItems = [
  { label: "Settings", icon: <SettingsIcon /> },
];

const recentActivity = [
  { title: "Q1 Report Published", time: "2 hours ago", type: "report" },
  { title: "Team standup scheduled", time: "4 hours ago", type: "meeting" },
  { title: "New user registered", time: "1 day ago", type: "user" },
  { title: "Revenue milestone reached", time: "2 days ago", type: "milestone" },
];

const kpis = [
  { label: "Total Revenue", value: "$84,254", trend: "+14%", positive: true },
  { label: "Active Users", value: "12,453", trend: "+8%", positive: true },
  { label: "Tasks Completed", value: "1,024", trend: "+22%", positive: true },
  { label: "Avg. Response Time", value: "1.4s", trend: "-5%", positive: true },
];

/**
 * Drawer + Main Layout
 *
 * Demonstrates a Material Design persistent navigation drawer alongside
 * a scrollable main content area. This pattern is common in Material-design
 * apps where the drawer stays visible on desktop but can be toggled on mobile.
 *
 * Header Pattern: app-only (app header only)
 * Features:
 * - Persistent navigation drawer
 * - Toggleable drawer (mobile-friendly)
 * - Active state tracking
 * - App bar with actions
 */
export function DrawerMain() {
  useDocumentTitle("Drawer + Main Layout - Layout Showcase");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  const drawerContent = (
    <Box className={styles.drawerContent}>
      {/* Drawer Header */}
      <Box className={styles.drawerHeader}>
        <Typography variant="h6" component="div" className={styles.appName}>
          MyApp
        </Typography>
        <Chip label="Pro" size="small" color="primary" sx={{ fontWeight: 700 }} />
      </Box>
      <Divider />

      {/* Primary Nav */}
      <List sx={{ pt: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              selected={activeItem === item.label}
              onClick={() => setActiveItem(item.label)}
              sx={{
                borderRadius: 1,
                mx: 1,
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "& .MuiListItemIcon-root": { color: "primary.contrastText" },
                  "&:hover": { bgcolor: "primary.dark" },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
              {item.badge && (
                <Chip label={item.badge} size="small" color="error" sx={{ height: 20, fontSize: "0.65rem" }} />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 1 }} />

      {/* Secondary Nav */}
      <List>
        {secondaryNavItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              selected={activeItem === item.label}
              onClick={() => setActiveItem(item.label)}
              sx={{ borderRadius: 1, mx: 1 }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* User section at bottom */}
      <Box sx={{ mt: "auto", p: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccountCircleIcon color="action" />
          <Box>
            <Typography variant="body2" fontWeight={600}>John Doe</Typography>
            <Typography variant="caption" color="text.secondary">john@example.com</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box className={styles.root}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          color: "text.primary",
        }}
      >
        <Toolbar variant="dense" sx={{ minHeight: 56 }}>
          <IconButton
            edge="start"
            onClick={toggleDrawer}
            aria-label="toggle drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Dashboard
          </Typography>
          <BackToShowcase />
          <IconButton aria-label="notifications" sx={{ ml: 1 }}>
            <NotificationsIcon />
          </IconButton>
          <IconButton aria-label="account" sx={{ ml: 0.5 }}>
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Persistent Drawer */}
      <Drawer
        variant="persistent"
        open={drawerOpen}
        sx={{
          width: drawerOpen ? DRAWER_WIDTH : 0,
          flexShrink: 0,
          transition: "width 0.2s ease",
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            top: 56,
            height: "calc(100% - 56px)",
            border: "none",
            borderRight: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        className={styles.main}
        sx={{
          ml: drawerOpen ? `${DRAWER_WIDTH}px` : 0,
          transition: "margin-left 0.2s ease",
          mt: "56px",
          minHeight: "calc(100vh - 56px)",
          bgcolor: "background.default",
        }}
      >
        <Box className={styles.content}>
          {/* Page title */}
          <Box sx={{ mb: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="h5" component="h1" fontWeight={700}>
                {activeItem}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Welcome back, here's what's happening today.
              </Typography>
            </Box>
            <Button variant="contained" startIcon={<StarIcon />}>
              New Report
            </Button>
          </Box>

          {/* KPI Cards */}
          <Box className={styles.kpiGrid}>
            {kpis.map((kpi) => (
              <Paper
                key={kpi.label}
                elevation={0}
                sx={{ p: 2.5, border: "1px solid", borderColor: "divider", borderRadius: 2 }}
              >
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {kpi.label}
                </Typography>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  {kpi.value}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TrendingUpIcon
                    sx={{ fontSize: 16, color: kpi.positive ? "success.main" : "error.main" }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: kpi.positive ? "success.main" : "error.main", fontWeight: 600 }}
                  >
                    {kpi.trend}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    vs last month
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>

          {/* Content grid */}
          <Box className={styles.contentGrid}>
            {/* Recent Activity */}
            <Paper
              elevation={0}
              sx={{ p: 3, border: "1px solid", borderColor: "divider", borderRadius: 2 }}
            >
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Recent Activity
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {recentActivity.map((item, idx) => (
                  <Box
                    key={idx}
                    sx={{ display: "flex", alignItems: "center", gap: 2 }}
                  >
                    <ScheduleIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={500}>
                        {item.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.time}
                      </Typography>
                    </Box>
                    <Chip label={item.type} size="small" variant="outlined" />
                  </Box>
                ))}
              </Box>
            </Paper>

            {/* Quick Actions */}
            <Paper
              elevation={0}
              sx={{ p: 3, border: "1px solid", borderColor: "divider", borderRadius: 2 }}
            >
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Quick Actions
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {["Create Report", "Invite Team Member", "Schedule Meeting", "Export Data"].map(
                  (action) => (
                    <Card
                      key={action}
                      variant="outlined"
                      sx={{ cursor: "pointer", "&:hover": { bgcolor: "action.hover" } }}
                    >
                      <CardContent sx={{ py: 1.5, "&:last-child": { pb: 1.5 } }}>
                        <Typography variant="body2" fontWeight={500}>
                          {action}
                        </Typography>
                      </CardContent>
                    </Card>
                  )
                )}
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
