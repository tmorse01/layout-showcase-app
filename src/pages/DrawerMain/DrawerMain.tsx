import { useState } from "react";
import {
  Box,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Menu,
  Dashboard,
  Insights,
  People,
  AttachMoney,
  TrendingUp,
} from "@mui/icons-material";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import styles from "./DrawerMain.module.css";

const drawerWidth = 240;

const sections = [
  { id: "overview", label: "Overview", icon: <Dashboard /> },
  { id: "revenue", label: "Revenue", icon: <AttachMoney /> },
  { id: "growth", label: "Growth", icon: <TrendingUp /> },
  { id: "customers", label: "Customers", icon: <People /> },
] as const;

const kpis: Record<string, Array<{ label: string; value: string; change: string }>> = {
  overview: [
    { label: "MRR", value: "$124,500", change: "+8.2%" },
    { label: "Active Users", value: "18,240", change: "+5.1%" },
    { label: "Conversion", value: "3.7%", change: "+0.3%" },
  ],
  revenue: [
    { label: "Gross Revenue", value: "$412,000", change: "+6.4%" },
    { label: "Net Revenue", value: "$367,100", change: "+4.9%" },
    { label: "ARPU", value: "$71.20", change: "+1.6%" },
  ],
  growth: [
    { label: "New Signups", value: "1,204", change: "+9.8%" },
    { label: "Expansion", value: "$37,400", change: "+11.3%" },
    { label: "Churn", value: "1.9%", change: "-0.4%" },
  ],
  customers: [
    { label: "Enterprise", value: "248", change: "+12" },
    { label: "SMB", value: "1,932", change: "+84" },
    { label: "NPS", value: "51", change: "+3" },
  ],
};

const healthRows: Record<string, Array<{ metric: string; value: string; target: string; status: string }>> = {
  overview: [
    { metric: "Activation Rate", value: "67%", target: "65%", status: "On track" },
    { metric: "Pipeline Coverage", value: "2.8x", target: "2.5x", status: "Healthy" },
    { metric: "Support SLA", value: "98.7%", target: "98%", status: "Healthy" },
  ],
  revenue: [
    { metric: "Gross Margin", value: "78%", target: "75%", status: "On track" },
    { metric: "Expansion Mix", value: "32%", target: "30%", status: "Healthy" },
    { metric: "Discount Rate", value: "7.5%", target: "<10%", status: "Healthy" },
  ],
  growth: [
    { metric: "Sales Velocity", value: "41 days", target: "45 days", status: "Healthy" },
    { metric: "Trial Conversion", value: "18.4%", target: "17%", status: "On track" },
    { metric: "Win Rate", value: "31%", target: "30%", status: "Healthy" },
  ],
  customers: [
    { metric: "Renewal Rate", value: "94.2%", target: "92%", status: "Healthy" },
    { metric: "Adoption Score", value: "73", target: "70", status: "On track" },
    { metric: "Open Escalations", value: "4", target: "<6", status: "Healthy" },
  ],
};

const recentActivity: Record<string, string[]> = {
  overview: [
    "Executive dashboard snapshot published to leadership.",
    "Weekly digest sent to all product stakeholders.",
    "Forecast confidence raised from 86% to 89%.",
  ],
  revenue: [
    "Northstar expansion opportunity advanced to commit stage.",
    "Atlas logistics invoice reconciliation completed.",
    "Quarterly pricing review prepared for finance.",
  ],
  growth: [
    "SMB campaign experiment B outperformed control by 12%.",
    "New onboarding checklist rolled out to all trial users.",
    "Lifecycle emails refreshed for churn-risk cohorts.",
  ],
  customers: [
    "Customer health score recalculated for enterprise accounts.",
    "Success team tagged 6 accounts for proactive outreach.",
    "NPS feedback digest shared with support and product.",
  ],
};

export function DrawerMain() {
  useDocumentTitle("Drawer + Main Layout - Layout Showcase");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<(typeof sections)[number]["id"]>("overview");

  return (
    <Box className={styles.pageRoot}>
      <Box className={styles.topBar}>
        <IconButton onClick={() => setDrawerOpen((prev) => !prev)} aria-label="toggle drawer">
          <Menu />
        </IconButton>
        <Typography variant="h6" component="h1">
          Drawer + Main
        </Typography>
      </Box>

      <Box className={styles.body}>
        <Drawer
          variant="persistent"
          open={drawerOpen}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              position: "relative",
              height: "calc(100vh - 64px)",
            },
          }}
        >
          <Toolbar />
          <List>
            {sections.map((section) => (
              <ListItemButton
                key={section.id}
                selected={activeSection === section.id}
                onClick={() => setActiveSection(section.id)}
              >
                <ListItemIcon>{section.icon}</ListItemIcon>
                <ListItemText primary={section.label} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>

        <Box className={styles.main} sx={{ ml: drawerOpen ? 0 : `-${drawerWidth}px` }}>
          <div className={styles.headerRow}>
            <Typography variant="h5">{sections.find((s) => s.id === activeSection)?.label}</Typography>
            <Insights color="action" />
          </div>

          <div className={styles.kpiGrid}>
            {kpis[activeSection].map((kpi) => (
              <Paper key={kpi.label} className={styles.kpiCard} elevation={1}>
                <Typography variant="body2" color="text.secondary">
                  {kpi.label}
                </Typography>
                <Typography variant="h4" component="p">
                  {kpi.value}
                </Typography>
                <Typography variant="body2" color="success.main">
                  {kpi.change}
                </Typography>
              </Paper>
            ))}
          </div>

          <div className={styles.contentGrid}>
            <Paper className={styles.panel} elevation={1}>
              <div className={styles.panelHeader}>
                <Typography variant="subtitle1">Operational Health</Typography>
                <Chip size="small" label="Live" color="success" />
              </div>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Metric</TableCell>
                    <TableCell>Value</TableCell>
                    <TableCell>Target</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {healthRows[activeSection].map((row) => (
                    <TableRow key={row.metric}>
                      <TableCell>{row.metric}</TableCell>
                      <TableCell>{row.value}</TableCell>
                      <TableCell>{row.target}</TableCell>
                      <TableCell>{row.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>

            <Paper className={styles.panel} elevation={1}>
              <Typography variant="subtitle1">Recent Activity</Typography>
              <Divider sx={{ my: 1 }} />
              <List disablePadding>
                {recentActivity[activeSection].map((activity) => (
                  <ListItemText key={activity} primary={activity} className={styles.activityItem} />
                ))}
              </List>
            </Paper>
          </div>
        </Box>
      </Box>
    </Box>
  );
}
