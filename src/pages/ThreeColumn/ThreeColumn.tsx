import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Button,
  Chip,
  Divider,
  Avatar,
  IconButton,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  ShoppingCart as ShoppingCartIcon,
  Star as StarIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Circle as CircleIcon,
} from "@mui/icons-material";
import { AppFrame } from "../../components/AppFrame/AppFrame";
import { defaultNavGroups } from "../../config/sidebarData";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import styles from "./ThreeColumn.module.css";

const segments = [
  { label: "Organic Search", value: 42, color: "#2196f3" },
  { label: "Direct", value: 28, color: "#4caf50" },
  { label: "Referral", value: 16, color: "#ff9800" },
  { label: "Social", value: 14, color: "#e91e63" },
];

const kpis = [
  {
    label: "Total Revenue",
    value: "$182,430",
    change: "+14.2%",
    positive: true,
    icon: <TrendingUpIcon />,
  },
  {
    label: "Active Users",
    value: "28,540",
    change: "+8.7%",
    positive: true,
    icon: <PeopleIcon />,
  },
  {
    label: "Conversion Rate",
    value: "4.8%",
    change: "+1.2%",
    positive: true,
    icon: <BarChartIcon />,
  },
  {
    label: "Avg. Order Value",
    value: "$64.20",
    change: "-2.1%",
    positive: false,
    icon: <ShoppingCartIcon />,
  },
];

const products = [
  { name: "Pro Plan", revenue: 62400, units: 520, growth: 18 },
  { name: "Starter Plan", revenue: 38200, units: 1274, growth: 7 },
  { name: "Enterprise", revenue: 48100, units: 41, growth: 24 },
  { name: "Add-ons", revenue: 12800, units: 892, growth: -3 },
  { name: "Consulting", revenue: 20930, units: 68, growth: 11 },
];

type AlertSeverity = "info" | "success" | "warning" | "error";

const alerts: { message: string; time: string; severity: AlertSeverity }[] = [
  { message: "API response time spike detected", time: "2 min ago", severity: "error" },
  { message: "Backup completed successfully", time: "15 min ago", severity: "success" },
  { message: "New enterprise signup", time: "1 hr ago", severity: "info" },
  { message: "CPU usage above 80%", time: "2 hr ago", severity: "warning" },
  { message: "Monthly report generated", time: "3 hr ago", severity: "success" },
];

const topUsers = [
  { name: "Alice Chen", plan: "Enterprise", revenue: 4200, avatar: "AC" },
  { name: "Bob Martin", plan: "Pro", revenue: 1800, avatar: "BM" },
  { name: "Carol Lin", plan: "Enterprise", revenue: 3600, avatar: "CL" },
  { name: "Dave Park", plan: "Pro", revenue: 1200, avatar: "DP" },
];

const alertIcons: Record<AlertSeverity, React.ReactNode> = {
  error: <ErrorIcon sx={{ fontSize: 16, color: "error.main" }} />,
  warning: <WarningIcon sx={{ fontSize: 16, color: "warning.main" }} />,
  success: <CheckCircleIcon sx={{ fontSize: 16, color: "success.main" }} />,
  info: <CircleIcon sx={{ fontSize: 16, color: "info.main" }} />,
};

/**
 * 3-Column Layout
 *
 * Demonstrates a three-column analytics layout with:
 * - Left sidebar: navigation/filters/segments
 * - Main area: primary KPIs and data tables
 * - Right panel: live alerts and top users
 *
 * This pattern is common in analytics dashboards, BI tools,
 * and any application that needs to display dense data with
 * contextual panels on both sides.
 *
 * Header Pattern: app-only
 * Features:
 * - Three distinct content columns
 * - Left navigation/filter sidebar
 * - Central main content with KPIs and data
 * - Right contextual panel
 */
export function ThreeColumn() {
  useDocumentTitle("3-Column Layout - Layout Showcase");
  const [selectedSegment, setSelectedSegment] = useState("All Traffic");

  return (
    <AppFrame showAppHeader showNav navGroups={defaultNavGroups}>
      <div className={styles.wrapper}>
        <div className={styles.threeColumnGrid}>
          {/* ── LEFT PANEL ────────────────────────────── */}
          <aside className={styles.leftPanel}>
            <Paper
              elevation={0}
              sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, overflow: "hidden", height: "100%" }}
            >
              <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid", borderColor: "divider" }}>
                <Typography variant="subtitle2" fontWeight={700} color="text.secondary" sx={{ textTransform: "uppercase", fontSize: "0.7rem", letterSpacing: "0.05em" }}>
                  Traffic Segments
                </Typography>
              </Box>

              {/* All Traffic item */}
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemButton
                    selected={selectedSegment === "All Traffic"}
                    onClick={() => setSelectedSegment("All Traffic")}
                    sx={{ py: 1 }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <BarChartIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="All Traffic" primaryTypographyProps={{ variant: "body2" }} />
                    <Chip label="100%" size="small" sx={{ height: 18, fontSize: "0.65rem" }} />
                  </ListItemButton>
                </ListItem>
                <Divider />

                {/* Segment items */}
                {segments.map((seg) => (
                  <Box key={seg.label}>
                    <ListItem disablePadding>
                      <ListItemButton
                        selected={selectedSegment === seg.label}
                        onClick={() => setSelectedSegment(seg.label)}
                        sx={{ py: 1 }}
                      >
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Box
                            sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: seg.color }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={seg.label} primaryTypographyProps={{ variant: "body2" }} />
                        <Chip label={`${seg.value}%`} size="small" sx={{ height: 18, fontSize: "0.65rem" }} />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </Box>
                ))}
              </List>

              {/* Segment breakdown */}
              <Box sx={{ p: 2 }}>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Share Breakdown
                </Typography>
                <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                  {segments.map((seg) => (
                    <Box key={seg.label}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          {seg.label}
                        </Typography>
                        <Typography variant="caption" fontWeight={600}>
                          {seg.value}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={seg.value}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: "action.hover",
                          "& .MuiLinearProgress-bar": { bgcolor: seg.color, borderRadius: 3 },
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>

              <Divider />

              {/* Quick links */}
              <List disablePadding>
                {[
                  { icon: <NotificationsIcon fontSize="small" />, label: "Alerts" },
                  { icon: <SettingsIcon fontSize="small" />, label: "Settings" },
                ].map((item) => (
                  <ListItem key={item.label} disablePadding>
                    <ListItemButton sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} primaryTypographyProps={{ variant: "body2" }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </aside>

          {/* ── MAIN CONTENT ──────────────────────────── */}
          <main className={styles.mainContent}>
            {/* Page header */}
            <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <Typography variant="h5" fontWeight={700}>
                  Analytics Dashboard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Showing data for: <strong>{selectedSegment}</strong>
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Tooltip title="Refresh data">
                  <IconButton size="small">
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
                <Button variant="contained" size="small" startIcon={<StarIcon />}>
                  Export
                </Button>
              </Box>
            </Box>

            {/* KPI Cards */}
            <Box className={styles.kpiGrid}>
              {kpis.map((kpi) => (
                <Paper
                  key={kpi.label}
                  elevation={0}
                  sx={{ p: 2, border: "1px solid", borderColor: "divider", borderRadius: 2 }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {kpi.label}
                    </Typography>
                    <Box sx={{ color: kpi.positive ? "success.main" : "error.main" }}>{kpi.icon}</Box>
                  </Box>
                  <Typography variant="h6" fontWeight={700}>
                    {kpi.value}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
                    {kpi.positive ? (
                      <TrendingUpIcon sx={{ fontSize: 14, color: "success.main" }} />
                    ) : (
                      <TrendingDownIcon sx={{ fontSize: 14, color: "error.main" }} />
                    )}
                    <Typography
                      variant="caption"
                      sx={{ color: kpi.positive ? "success.main" : "error.main", fontWeight: 600 }}
                    >
                      {kpi.change}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>

            {/* Products Table */}
            <Paper
              elevation={0}
              sx={{ mt: 3, border: "1px solid", borderColor: "divider", borderRadius: 2, overflow: "hidden" }}
            >
              <Box sx={{ px: 3, py: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" fontWeight={600}>
                  Product Performance
                </Typography>
                <Button size="small" variant="text">
                  View All
                </Button>
              </Box>
              <Divider />

              {/* Table header */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 120px 80px 80px",
                  px: 3,
                  py: 1,
                  bgcolor: "background.default",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                {["Product", "Revenue", "Units", "Growth"].map((h) => (
                  <Typography key={h} variant="caption" color="text.secondary" fontWeight={600}>
                    {h}
                  </Typography>
                ))}
              </Box>

              {/* Table rows */}
              {products.map((product, idx) => (
                <Box key={product.name}>
                  {idx > 0 && <Divider />}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 120px 80px 80px",
                      px: 3,
                      py: 1.5,
                      alignItems: "center",
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                  >
                    <Typography variant="body2" fontWeight={500}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2">
                      ${product.revenue.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.units.toLocaleString()}
                    </Typography>
                    <Chip
                      label={`${product.growth > 0 ? "+" : ""}${product.growth}%`}
                      size="small"
                      color={product.growth > 0 ? "success" : "error"}
                      variant="outlined"
                      sx={{ height: 20, fontSize: "0.65rem", width: "fit-content" }}
                    />
                  </Box>
                </Box>
              ))}
            </Paper>
          </main>

          {/* ── RIGHT PANEL ───────────────────────────── */}
          <aside className={styles.rightPanel}>
            {/* Alerts Panel */}
            <Paper
              elevation={0}
              sx={{ mb: 2, border: "1px solid", borderColor: "divider", borderRadius: 2, overflow: "hidden" }}
            >
              <Box sx={{ px: 2, py: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid", borderColor: "divider" }}>
                <Typography variant="subtitle2" fontWeight={700}>
                  Live Alerts
                </Typography>
                <Chip label="5" size="small" color="error" sx={{ height: 18, fontSize: "0.65rem" }} />
              </Box>
              <List disablePadding>
                {alerts.map((alert, idx) => (
                  <Box key={idx}>
                    {idx > 0 && <Divider />}
                    <ListItem
                      dense
                      secondaryAction={
                        <IconButton size="small">
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      }
                    >
                      <ListItemIcon sx={{ minWidth: 28 }}>{alertIcons[alert.severity]}</ListItemIcon>
                      <ListItemText
                        primary={alert.message}
                        secondary={alert.time}
                        primaryTypographyProps={{ variant: "caption", fontWeight: 500 }}
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                  </Box>
                ))}
              </List>
            </Paper>

            {/* Top Users Panel */}
            <Paper
              elevation={0}
              sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, overflow: "hidden" }}
            >
              <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid", borderColor: "divider" }}>
                <Typography variant="subtitle2" fontWeight={700}>
                  Top Customers
                </Typography>
              </Box>
              <List disablePadding>
                {topUsers.map((user, idx) => (
                  <Box key={user.name}>
                    {idx > 0 && <Divider />}
                    <ListItem dense>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Avatar sx={{ width: 30, height: 30, fontSize: "0.65rem", bgcolor: "primary.main" }}>
                          {user.avatar}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={user.name}
                        secondary={user.plan}
                        primaryTypographyProps={{ variant: "body2", fontWeight: 500 }}
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                      <Typography variant="caption" fontWeight={600} color="success.main">
                        ${user.revenue.toLocaleString()}
                      </Typography>
                    </ListItem>
                  </Box>
                ))}
              </List>
            </Paper>
          </aside>
        </div>
      </div>
    </AppFrame>
  );
}
