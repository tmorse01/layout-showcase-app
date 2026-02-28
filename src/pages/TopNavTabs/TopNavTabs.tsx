import { useState } from "react";
import { AppFrame } from "../../components/AppFrame/AppFrame";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import styles from "./TopNavTabs.module.css";

const sections = [
  {
    id: "overview",
    title: "Overview",
    description: "Top-level app section focused on executive metrics and performance summaries.",
  },
  {
    id: "customers",
    title: "Customers",
    description: "Customer lifecycle trends, engagement cohorts, and account health indicators.",
  },
  {
    id: "operations",
    title: "Operations",
    description: "Operational status, throughput, reliability, and workload balancing across teams.",
  },
  {
    id: "settings",
    title: "Settings",
    description: "Global app preferences, access controls, and environment configuration.",
  },
] as const;

export function TopNavTabs() {
  useDocumentTitle("Top Navigation Tabs Layout - Layout Showcase");
  const [activeTab, setActiveTab] = useState(0);

  return (
    <AppFrame
      showAppHeader
      showNav={false}
      appHeaderContent={
        <div className={styles.headerWrap}>
          <AppHeader logo="Top Navigation Tabs" />
          <Tabs
            value={activeTab}
            onChange={(_event, value: number) => setActiveTab(value)}
            textColor="inherit"
            indicatorColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            className={styles.tabs}
          >
            {sections.map((section) => (
              <Tab key={section.id} label={section.title} />
            ))}
          </Tabs>
        </div>
      }
    >
      <div className={styles.container}>
        <Paper className={styles.panel} elevation={1}>
          <Typography variant="h4" component="h1" gutterBottom>
            {sections[activeTab].title}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {sections[activeTab].description}
          </Typography>
          <Box className={styles.kpiRow}>
            <Paper className={styles.kpiCard} variant="outlined">
              <Typography variant="body2" color="text.secondary">
                Primary KPI
              </Typography>
              <Typography variant="h5">{["92%", "84", "99.95%", "27"][activeTab]}</Typography>
            </Paper>
            <Paper className={styles.kpiCard} variant="outlined">
              <Typography variant="body2" color="text.secondary">
                Weekly Change
              </Typography>
              <Typography variant="h5">{["+2.4%", "+6", "+0.1%", "+3"][activeTab]}</Typography>
            </Paper>
          </Box>
        </Paper>
      </div>
    </AppFrame>
  );
}
