import { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  Chip,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import {
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  CreditCard as CreditCardIcon,
  People as PeopleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { AppFrame } from "../../components/AppFrame/AppFrame";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { defaultNavGroups } from "../../config/sidebarData";
import styles from "./ClassicAppShell.module.css";

export function ClassicAppShell() {
  useDocumentTitle("Classic App Shell - Layout Showcase");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30");

  // Sample team members data
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "Admin",
      status: "active",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael@example.com",
      role: "Editor",
      status: "active",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily@example.com",
      role: "Viewer",
      status: "pending",
    },
    {
      id: 4,
      name: "David Kim",
      email: "david@example.com",
      role: "Editor",
      status: "active",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      email: "lisa@example.com",
      role: "Viewer",
      status: "inactive",
    },
  ];

  // Sample recent activity
  const recentActivity = [
    {
      action: "User login",
      user: "Sarah Johnson",
      time: "2 minutes ago",
      type: "security",
    },
    {
      action: "Settings updated",
      user: "Michael Chen",
      time: "1 hour ago",
      type: "settings",
    },
    {
      action: "Team member added",
      user: "Emily Rodriguez",
      time: "3 hours ago",
      type: "team",
    },
    {
      action: "Billing updated",
      user: "System",
      time: "1 day ago",
      type: "billing",
    },
    {
      action: "Password changed",
      user: "David Kim",
      time: "2 days ago",
      type: "security",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active: styles.statusActive,
      inactive: styles.statusInactive,
      pending: styles.statusPending,
    };
    return (
      <span
        className={`${styles.statusBadge} ${
          statusClasses[status as keyof typeof statusClasses]
        }`}
      >
        {status === "active" && <CheckCircleIcon sx={{ fontSize: 14 }} />}
        {status === "pending" && <ScheduleIcon sx={{ fontSize: 14 }} />}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <AppFrame showAppHeader showNav navGroups={defaultNavGroups}>
      <div className={styles.container}>
        {/* Page Header */}
        <div className={styles.header}>
          <div>
            <Typography variant="h4" component="h1" className={styles.title}>
              Settings
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage your account settings, team, and preferences
            </Typography>
          </div>
          <Button variant="contained" size="medium">
            Save Changes
          </Button>
        </div>

        {/* Account Settings Section */}
        <Paper
          elevation={0}
          sx={{ p: 3, border: "1px solid", borderColor: "divider" }}
        >
          <div className={styles.section}>
            <Typography variant="h6" className={styles.sectionTitle}>
              Account Settings
            </Typography>
            <Typography variant="body2" className={styles.sectionDescription}>
              Update your account information and preferences
            </Typography>

            <div className={styles.formSection}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <TextField
                    label="Full Name"
                    defaultValue="John Doe"
                    fullWidth
                    variant="outlined"
                  />
                </div>
                <div className={styles.formGroup}>
                  <TextField
                    label="Email Address"
                    type="email"
                    defaultValue="john.doe@example.com"
                    fullWidth
                    variant="outlined"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <TextField
                    label="Company"
                    defaultValue="Acme Corporation"
                    fullWidth
                    variant="outlined"
                  />
                </div>
                <div className={styles.formGroup}>
                  <TextField
                    label="Job Title"
                    defaultValue="Product Manager"
                    fullWidth
                    variant="outlined"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <TextField
                    label="Phone Number"
                    defaultValue="+1 (555) 123-4567"
                    fullWidth
                    variant="outlined"
                  />
                </div>
                <div className={styles.formGroup}>
                  <FormControl fullWidth>
                    <InputLabel>Timezone</InputLabel>
                    <Select label="Timezone" defaultValue="America/New_York">
                      <MenuItem value="America/New_York">
                        Eastern Time (ET)
                      </MenuItem>
                      <MenuItem value="America/Chicago">
                        Central Time (CT)
                      </MenuItem>
                      <MenuItem value="America/Denver">
                        Mountain Time (MT)
                      </MenuItem>
                      <MenuItem value="America/Los_Angeles">
                        Pacific Time (PT)
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
        </Paper>

        {/* Security Settings Section */}
        <Paper
          elevation={0}
          sx={{ p: 3, border: "1px solid", borderColor: "divider" }}
        >
          <div className={styles.section}>
            <Typography variant="h6" className={styles.sectionTitle}>
              <SecurityIcon
                sx={{ mr: 1, verticalAlign: "middle", fontSize: 20 }}
              />
              Security
            </Typography>
            <Typography variant="body2" className={styles.sectionDescription}>
              Manage your security settings and authentication methods
            </Typography>

            <div className={styles.formSection}>
              <FormControlLabel
                control={
                  <Switch
                    checked={twoFactorEnabled}
                    onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">
                      Two-Factor Authentication
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Add an extra layer of security to your account
                    </Typography>
                  </Box>
                }
              />

              <Divider className={styles.divider} />

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <TextField
                    label="Current Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                  />
                </div>
                <div className={styles.formGroup}>
                  <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <FormControl fullWidth>
                    <InputLabel>Session Timeout</InputLabel>
                    <Select
                      label="Session Timeout"
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(e.target.value)}
                    >
                      <MenuItem value="15">15 minutes</MenuItem>
                      <MenuItem value="30">30 minutes</MenuItem>
                      <MenuItem value="60">1 hour</MenuItem>
                      <MenuItem value="120">2 hours</MenuItem>
                      <MenuItem value="never">Never</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className={styles.formGroup}>
                  <Button variant="outlined" fullWidth>
                    View Active Sessions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Paper>

        {/* Team Management Section */}
        <Paper
          elevation={0}
          sx={{ p: 3, border: "1px solid", borderColor: "divider" }}
        >
          <div className={styles.section}>
            <div className={styles.header}>
              <div>
                <Typography variant="h6" className={styles.sectionTitle}>
                  <PeopleIcon
                    sx={{ mr: 1, verticalAlign: "middle", fontSize: 20 }}
                  />
                  Team Management
                </Typography>
                <Typography
                  variant="body2"
                  className={styles.sectionDescription}
                >
                  Manage team members and their access levels
                </Typography>
              </div>
              <Button variant="contained" size="small">
                Invite Member
              </Button>
            </div>

            <div className={styles.listSection}>
              {teamMembers.map((member) => (
                <div key={member.id} className={styles.listItem}>
                  <div className={styles.listItemContent}>
                    <Typography
                      variant="body1"
                      className={styles.listItemTitle}
                    >
                      {member.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      className={styles.listItemDescription}
                    >
                      {member.email} • {member.role}
                    </Typography>
                  </div>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {getStatusBadge(member.status)}
                    <IconButton size="small" aria-label="edit">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" aria-label="delete" color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </div>
              ))}
            </div>
          </div>
        </Paper>

        {/* Notifications Section */}
        <Paper
          elevation={0}
          sx={{ p: 3, border: "1px solid", borderColor: "divider" }}
        >
          <div className={styles.section}>
            <Typography variant="h6" className={styles.sectionTitle}>
              <NotificationsIcon
                sx={{ mr: 1, verticalAlign: "middle", fontSize: 20 }}
              />
              Notifications
            </Typography>
            <Typography variant="body2" className={styles.sectionDescription}>
              Configure how and when you receive notifications
            </Typography>

            <div className={styles.formSection}>
              <FormControlLabel
                control={
                  <Switch
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">Email Notifications</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Receive important updates via email
                    </Typography>
                  </Box>
                }
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={pushNotifications}
                    onChange={(e) => setPushNotifications(e.target.checked)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">Push Notifications</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Get real-time alerts in your browser
                    </Typography>
                  </Box>
                }
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={marketingEmails}
                    onChange={(e) => setMarketingEmails(e.target.checked)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">Marketing Emails</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Receive updates about new features and promotions
                    </Typography>
                  </Box>
                }
              />
            </div>
          </div>
        </Paper>

        {/* Billing Section */}
        <Paper
          elevation={0}
          sx={{ p: 3, border: "1px solid", borderColor: "divider" }}
        >
          <div className={styles.section}>
            <Typography variant="h6" className={styles.sectionTitle}>
              <CreditCardIcon
                sx={{ mr: 1, verticalAlign: "middle", fontSize: 20 }}
              />
              Billing & Subscription
            </Typography>
            <Typography variant="body2" className={styles.sectionDescription}>
              Manage your subscription and payment methods
            </Typography>

            <div className={styles.cardGrid}>
              <div className={styles.card}>
                <Typography variant="body1" className={styles.cardTitle}>
                  Current Plan
                </Typography>
                <Typography variant="h5" component="div" sx={{ my: 1 }}>
                  Professional
                </Typography>
                <Typography variant="body2" className={styles.cardContent}>
                  $99/month • Billed annually
                </Typography>
                <Button variant="outlined" size="small" sx={{ mt: 2 }}>
                  Change Plan
                </Button>
              </div>

              <div className={styles.card}>
                <Typography variant="body1" className={styles.cardTitle}>
                  Payment Method
                </Typography>
                <Typography
                  variant="body2"
                  className={styles.cardContent}
                  sx={{ my: 1 }}
                >
                  •••• •••• •••• 4242
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Expires 12/2025
                </Typography>
                <Button variant="outlined" size="small" sx={{ mt: 2 }}>
                  Update Card
                </Button>
              </div>

              <div className={styles.card}>
                <Typography variant="body1" className={styles.cardTitle}>
                  Next Billing Date
                </Typography>
                <Typography variant="h6" component="div" sx={{ my: 1 }}>
                  March 15, 2024
                </Typography>
                <Typography variant="body2" className={styles.cardContent}>
                  $99.00 will be charged
                </Typography>
                <Button variant="outlined" size="small" sx={{ mt: 2 }}>
                  View Invoices
                </Button>
              </div>
            </div>
          </div>
        </Paper>

        {/* Recent Activity Section */}
        <Paper
          elevation={0}
          sx={{ p: 3, border: "1px solid", borderColor: "divider" }}
        >
          <div className={styles.section}>
            <Typography variant="h6" className={styles.sectionTitle}>
              Recent Activity
            </Typography>
            <Typography variant="body2" className={styles.sectionDescription}>
              Track important changes and events in your account
            </Typography>

            <div className={styles.listSection}>
              {recentActivity.map((activity, index) => (
                <div key={index} className={styles.listItem}>
                  <div className={styles.listItemContent}>
                    <Typography
                      variant="body1"
                      className={styles.listItemTitle}
                    >
                      {activity.action}
                    </Typography>
                    <Typography
                      variant="body2"
                      className={styles.listItemDescription}
                    >
                      {activity.user} • {activity.time}
                    </Typography>
                  </div>
                  <Chip
                    label={activity.type}
                    size="small"
                    color={activity.type === "security" ? "error" : "default"}
                  />
                </div>
              ))}
            </div>
          </div>
        </Paper>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <Button variant="outlined" size="large">
            Cancel
          </Button>
          <Button variant="contained" size="large">
            Save All Changes
          </Button>
        </div>
      </div>
    </AppFrame>
  );
}
