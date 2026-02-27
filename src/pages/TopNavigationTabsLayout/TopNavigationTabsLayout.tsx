import { useState } from "react";
import { AppFrame } from "../../components/AppFrame/AppFrame";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";

const tabPanels = [
  {
    label: "Overview",
    title: "Overview Dashboard",
    description: "Track key performance indicators and recent activity in one place.",
  },
  {
    label: "Campaigns",
    title: "Campaign Management",
    description: "Create, schedule, and monitor campaign performance across channels.",
  },
  {
    label: "Audiences",
    title: "Audience Segments",
    description: "Manage audience definitions and targeting rules for each segment.",
  },
  {
    label: "Reports",
    title: "Reports",
    description: "Review scheduled and on-demand reports with export options.",
  },
];

export function TopNavigationTabsLayout() {
  useDocumentTitle("Top Navigation Tabs Layout - Layout Showcase");
  const [activeTab, setActiveTab] = useState(0);

  return (
    <AppFrame showAppHeader showNav={false}>
      <Paper sx={{ border: "1px solid", borderColor: "divider", mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(_event, value) => setActiveTab(value)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabPanels.map((panel) => (
            <Tab key={panel.label} label={panel.label} />
          ))}
        </Tabs>
      </Paper>

      <Box>
        <Typography variant="h5" gutterBottom>
          {tabPanels[activeTab].title}
        </Typography>
        <Typography color="text.secondary">
          {tabPanels[activeTab].description}
        </Typography>
      </Box>
    </AppFrame>
  );
}
