import { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Chip,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Dashboard as DashboardIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Folder as FolderIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { AppFrame } from "../../components/AppFrame/AppFrame";
import { defaultNavItems } from "../../config/sidebarData";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import styles from "./CollapsibleSidebar.module.css";

export function CollapsibleSidebar() {
  useDocumentTitle("Collapsible Sidebar App Shell - Layout Showcase");
  const [collapsed, setCollapsed] = useState(false);

  // Sample project data
  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      status: "active",
      progress: 75,
      team: 5,
      deadline: "2024-03-15",
    },
    {
      id: 2,
      name: "Mobile App Launch",
      status: "active",
      progress: 45,
      team: 8,
      deadline: "2024-04-01",
    },
    {
      id: 3,
      name: "API Integration",
      status: "pending",
      progress: 20,
      team: 3,
      deadline: "2024-03-20",
    },
    {
      id: 4,
      name: "Dashboard Analytics",
      status: "active",
      progress: 90,
      team: 4,
      deadline: "2024-03-10",
    },
    {
      id: 5,
      name: "Security Audit",
      status: "pending",
      progress: 0,
      team: 2,
      deadline: "2024-03-25",
    },
  ];

  const getStatusChip = (status: string) => {
    if (status === "active") {
      return (
        <Chip
          icon={<CheckCircleIcon />}
          label="Active"
          color="success"
          size="small"
        />
      );
    }
    return (
      <Chip
        icon={<ScheduleIcon />}
        label="Pending"
        color="warning"
        size="small"
      />
    );
  };

  return (
    <AppFrame
      showAppHeader
      showNav
      navItems={defaultNavItems}
      navCollapsed={collapsed}
      onNavToggle={() => setCollapsed(!collapsed)}
    >
      <div className={styles.container}>
        {/* Header with Toggle Button */}
        <div className={styles.header}>
          <div>
            <Typography variant="h4" component="h1" className={styles.title}>
              Project Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage your projects and track progress. Collapse the sidebar to
              maximize workspace.
            </Typography>
          </div>
          <Box className={styles.headerActions}>
            <Button
              variant="outlined"
              startIcon={collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              onClick={() => setCollapsed(!collapsed)}
              className={styles.toggleButton}
            >
              {collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            </Button>
            <Button variant="contained" size="medium">
              New Project
            </Button>
          </Box>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <Card
            elevation={0}
            sx={{ border: "1px solid", borderColor: "divider" }}
          >
            <CardContent>
              <Box className={styles.statCard}>
                <Box
                  className={styles.statIcon}
                  sx={{ bgcolor: "primary.light" }}
                >
                  <DashboardIcon />
                </Box>
                <Box>
                  <Typography variant="h4" component="div">
                    {projects.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Projects
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          <Card
            elevation={0}
            sx={{ border: "1px solid", borderColor: "divider" }}
          >
            <CardContent>
              <Box className={styles.statCard}>
                <Box
                  className={styles.statIcon}
                  sx={{ bgcolor: "success.light" }}
                >
                  <TrendingUpIcon />
                </Box>
                <Box>
                  <Typography variant="h4" component="div">
                    {Math.round(
                      projects.reduce((acc, p) => acc + p.progress, 0) /
                        projects.length
                    )}
                    %
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg Progress
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          <Card
            elevation={0}
            sx={{ border: "1px solid", borderColor: "divider" }}
          >
            <CardContent>
              <Box className={styles.statCard}>
                <Box className={styles.statIcon} sx={{ bgcolor: "info.light" }}>
                  <PeopleIcon />
                </Box>
                <Box>
                  <Typography variant="h4" component="div">
                    {projects.reduce((acc, p) => acc + p.team, 0)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Team Members
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          <Card
            elevation={0}
            sx={{ border: "1px solid", borderColor: "divider" }}
          >
            <CardContent>
              <Box className={styles.statCard}>
                <Box
                  className={styles.statIcon}
                  sx={{ bgcolor: "warning.light" }}
                >
                  <WarningIcon />
                </Box>
                <Box>
                  <Typography variant="h4" component="div">
                    {
                      projects.filter(
                        (p) =>
                          p.status === "pending" ||
                          (p.deadline &&
                            new Date(p.deadline) < new Date("2024-03-20"))
                      ).length
                    }
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Needs Attention
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </div>

        {/* Projects List */}
        <Paper
          elevation={0}
          sx={{ p: 3, border: "1px solid", borderColor: "divider" }}
        >
          <div className={styles.section}>
            <Typography variant="h6" className={styles.sectionTitle}>
              Active Projects
            </Typography>
            <Typography variant="body2" className={styles.sectionDescription}>
              Track progress and manage your team's work
            </Typography>

            <div className={styles.projectsList}>
              {projects.map((project) => (
                <div key={project.id} className={styles.projectItem}>
                  <div className={styles.projectContent}>
                    <Box className={styles.projectHeader}>
                      <Box className={styles.projectTitle}>
                        <FolderIcon
                          sx={{ mr: 1, color: "text.secondary", fontSize: 20 }}
                        />
                        <Typography variant="body1" fontWeight={500}>
                          {project.name}
                        </Typography>
                      </Box>
                      {getStatusChip(project.status)}
                    </Box>
                    <Box className={styles.projectDetails}>
                      <Typography variant="body2" color="text.secondary">
                        {project.team} team members • Due {project.deadline}
                      </Typography>
                    </Box>
                    <Box className={styles.progressBar}>
                      <Box
                        className={styles.progressFill}
                        sx={{
                          width: `${project.progress}%`,
                          bgcolor:
                            project.progress >= 75
                              ? "success.main"
                              : project.progress >= 50
                              ? "info.main"
                              : "warning.main",
                        }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {project.progress}% complete
                    </Typography>
                  </div>
                  <Box className={styles.projectActions}>
                    <Button size="small" variant="outlined">
                      View
                    </Button>
                    <Button size="small" variant="contained">
                      Edit
                    </Button>
                  </Box>
                </div>
              ))}
            </div>
          </div>
        </Paper>

        {/* Info Box */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "info.light",
          }}
        >
          <Box className={styles.infoBox}>
            <Typography variant="body2">
              <strong>Tip:</strong> Use the toggle button above or the menu icon
              in the header to collapse the sidebar. This gives you more space
              for content while keeping navigation accessible via icons.
            </Typography>
          </Box>
        </Paper>
      </div>
    </AppFrame>
  );
}
