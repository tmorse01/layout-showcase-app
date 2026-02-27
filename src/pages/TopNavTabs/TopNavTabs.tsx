import { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  Paper,
  Button,
  Chip,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  Home as HomeIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Star as StarIcon,
  BarChart as BarChartIcon,
} from "@mui/icons-material";
import { BackToShowcase } from "../../components/BackToShowcase/BackToShowcase";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import styles from "./TopNavTabs.module.css";

const tabs = [
  { label: "Overview", icon: <HomeIcon /> },
  { label: "Analytics", icon: <BarChartIcon /> },
  { label: "Team", icon: <PeopleIcon /> },
  { label: "Settings", icon: <SettingsIcon /> },
];

const overviewStats = [
  { label: "Active Projects", value: "12", icon: <StarIcon />, color: "primary.main" },
  { label: "Completed Tasks", value: "284", icon: <CheckCircleIcon />, color: "success.main" },
  { label: "Pending Reviews", value: "7", icon: <ScheduleIcon />, color: "warning.main" },
  { label: "Team Members", value: "24", icon: <PeopleIcon />, color: "info.main" },
];

const recentItems = [
  { title: "Homepage Redesign", status: "In Progress", assignee: "AL", date: "Due Mar 15" },
  { title: "API Rate Limiting", status: "Review", assignee: "BK", date: "Due Mar 12" },
  { title: "User Onboarding", status: "Completed", assignee: "CR", date: "Mar 10" },
  { title: "Analytics Dashboard", status: "In Progress", assignee: "DS", date: "Due Mar 20" },
];

const teamMembers = [
  { name: "Alex Lee", role: "Engineering Lead", avatar: "AL", online: true },
  { name: "Beth Kim", role: "Product Manager", avatar: "BK", online: true },
  { name: "Carlos Ruiz", role: "UX Designer", avatar: "CR", online: false },
  { name: "Diana Shah", role: "Backend Dev", avatar: "DS", online: true },
  { name: "Ethan Park", role: "Frontend Dev", avatar: "EP", online: false },
];

const analyticsData = [
  { metric: "Page Views", value: "124,320", change: "+18%", positive: true },
  { metric: "Unique Visitors", value: "42,810", change: "+11%", positive: true },
  { metric: "Bounce Rate", value: "34.2%", change: "-3%", positive: true },
  { metric: "Avg. Session", value: "4m 32s", change: "+7%", positive: true },
  { metric: "Conversions", value: "1,842", change: "+24%", positive: true },
  { metric: "Revenue", value: "$28,440", change: "+16%", positive: true },
];

/**
 * Top Navigation Tabs Layout
 *
 * Demonstrates app-level tab-based navigation where the tabs live in the
 * top app bar. This is different from the Tabbed Content layout which has
 * tabs within a page. This pattern drives top-level section switching and
 * is common in mobile-first or Google-style Material apps.
 *
 * Header Pattern: app-only (tabs integrated into app bar)
 * Features:
 * - App-level tabs integrated into app bar
 * - Tab-driven section switching
 * - Persistent app bar with tabs
 * - Realistic content per tab
 */
export function TopNavTabs() {
  useDocumentTitle("Top Navigation Tabs Layout - Layout Showcase");
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, value: number) => {
    setActiveTab(value);
  };

  return (
    <Box className={styles.root}>
      {/* App Bar with integrated tabs */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* Top toolbar row */}
        <Toolbar variant="dense" sx={{ minHeight: 56, gap: 1 }}>
          <Typography variant="h6" fontWeight={700} sx={{ flex: 1 }}>
            WorkSpace
          </Typography>
          <BackToShowcase />
          <IconButton size="small" aria-label="notifications">
            <NotificationsIcon />
          </IconButton>
          <IconButton size="small" aria-label="account">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>

        {/* Tab row */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="top navigation tabs"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: 44,
            "& .MuiTab-root": { minHeight: 44, py: 0 },
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.label}
              icon={tab.icon}
              iconPosition="start"
              label={tab.label}
              sx={{ minHeight: 44, textTransform: "none", fontWeight: 500 }}
            />
          ))}
        </Tabs>
      </AppBar>

      {/* Tab content */}
      <Box component="main" className={styles.main}>
        {/* Overview Tab */}
        {activeTab === 0 && (
          <Box className={styles.tabContent}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
              <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Overview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your project summary for this week
                </Typography>
              </Box>
              <Button variant="contained" startIcon={<AddIcon />}>
                New Project
              </Button>
            </Box>

            {/* Stats */}
            <Box className={styles.statsGrid}>
              {overviewStats.map((stat) => (
                <Paper
                  key={stat.label}
                  elevation={0}
                  sx={{ p: 2.5, border: "1px solid", borderColor: "divider", borderRadius: 2 }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                    <Box
                      sx={{
                        color: stat.color,
                        display: "flex",
                        p: 0.75,
                        borderRadius: 1,
                        bgcolor: `${stat.color}20`,
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                  <Typography variant="h4" fontWeight={700}>
                    {stat.value}
                  </Typography>
                </Paper>
              ))}
            </Box>

            {/* Recent activity */}
            <Paper
              elevation={0}
              sx={{ mt: 3, border: "1px solid", borderColor: "divider", borderRadius: 2, overflow: "hidden" }}
            >
              <Box sx={{ px: 3, py: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" fontWeight={600}>
                  Recent Items
                </Typography>
                <Button size="small" variant="text">
                  View All
                </Button>
              </Box>
              <Divider />
              {recentItems.map((item, idx) => (
                <Box key={idx}>
                  {idx > 0 && <Divider />}
                  <Box
                    sx={{
                      px: 3,
                      py: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      "&:hover": { bgcolor: "action.hover" },
                      cursor: "pointer",
                    }}
                  >
                    <Avatar sx={{ width: 32, height: 32, fontSize: "0.75rem", bgcolor: "primary.main" }}>
                      {item.assignee}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={500}>
                        {item.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.date}
                      </Typography>
                    </Box>
                    <Chip
                      label={item.status}
                      size="small"
                      color={
                        item.status === "Completed"
                          ? "success"
                          : item.status === "Review"
                          ? "warning"
                          : "default"
                      }
                    />
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Paper>
          </Box>
        )}

        {/* Analytics Tab */}
        {activeTab === 1 && (
          <Box className={styles.tabContent}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                Analytics
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Performance metrics for the last 30 days
              </Typography>
            </Box>

            <Box className={styles.analyticsGrid}>
              {analyticsData.map((item) => (
                <Paper
                  key={item.metric}
                  elevation={0}
                  sx={{ p: 3, border: "1px solid", borderColor: "divider", borderRadius: 2 }}
                >
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {item.metric}
                  </Typography>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    {item.value}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <TrendingUpIcon sx={{ fontSize: 16, color: item.positive ? "success.main" : "error.main" }} />
                    <Typography
                      variant="caption"
                      sx={{ color: item.positive ? "success.main" : "error.main", fontWeight: 600 }}
                    >
                      {item.change}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      vs previous period
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Box>
        )}

        {/* Team Tab */}
        {activeTab === 2 && (
          <Box className={styles.tabContent}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
              <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Team
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {teamMembers.filter((m) => m.online).length} members online
                </Typography>
              </Box>
              <Button variant="contained" startIcon={<AddIcon />}>
                Invite Member
              </Button>
            </Box>

            <Paper elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
              <List disablePadding>
                {teamMembers.map((member, idx) => (
                  <Box key={member.name}>
                    {idx > 0 && <Divider />}
                    <ListItem
                      secondaryAction={
                        <IconButton size="small">
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Box sx={{ position: "relative", display: "inline-block" }}>
                          <Avatar sx={{ bgcolor: "primary.main" }}>{member.avatar}</Avatar>
                          {member.online && (
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 2,
                                right: 2,
                                width: 10,
                                height: 10,
                                bgcolor: "success.main",
                                borderRadius: "50%",
                                border: "2px solid white",
                              }}
                            />
                          )}
                        </Box>
                      </ListItemAvatar>
                      <ListItemText
                        primary={member.name}
                        secondary={member.role}
                      />
                      <Chip
                        label={member.online ? "Online" : "Offline"}
                        size="small"
                        color={member.online ? "success" : "default"}
                        variant="outlined"
                        sx={{ mr: 1 }}
                      />
                    </ListItem>
                  </Box>
                ))}
              </List>
            </Paper>
          </Box>
        )}

        {/* Settings Tab */}
        {activeTab === 3 && (
          <Box className={styles.tabContent}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                Settings
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage your workspace preferences
              </Typography>
            </Box>

            {["General", "Notifications", "Integrations", "Billing"].map((section) => (
              <Paper
                key={section}
                elevation={0}
                sx={{
                  mb: 2,
                  p: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {section}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Configure {section.toLowerCase()} settings for your workspace
                  </Typography>
                </Box>
                <Button size="small" variant="outlined">
                  Configure
                </Button>
              </Paper>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
