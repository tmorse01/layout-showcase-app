import { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
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
        </Box>
      </Box>
    </Box>
  );
}
