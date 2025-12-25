import { useState } from "react";
import { AppFrame } from "../../components/AppFrame/AppFrame";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import {
  Button,
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
  Chip,
  Divider,
  TextField,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import {
  Save,
  Settings,
  Notifications,
  Security,
  Person,
  Language,
  Palette,
} from "@mui/icons-material";
import { defaultNavGroups } from "../../config/sidebarData";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import styles from "./TabbedContent.module.css";

/**
 * Tabbed Content Layout
 *
 * Demonstrates horizontal tabs used to switch between related views within
 * the same entity or page. This pattern is common in settings pages, entity
 * detail pages, and multi-view interfaces.
 *
 * Header Pattern: app-page (both app header and page header)
 * - App header: Global navigation (64px)
 * - Page header: Contextual actions, breadcrumbs, status (72px)
 * - Total: 136px (within 144px max constraint)
 *
 * Features:
 * - Horizontal tabs for content switching
 * - State preservation between tab switches
 * - Realistic content density in each tab
 * - Responsive tab behavior
 */
export function TabbedContent() {
  useDocumentTitle("Tabbed Content Layout - Layout Showcase");
  const [activeTab, setActiveTab] = useState(0);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
    darkMode: false,
    autoSave: true,
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSettingChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({
      ...prev,
      [key]: event.target.checked,
    }));
  };

  return (
    <AppFrame
      showAppHeader
      showPageHeader
      showNav
      navGroups={defaultNavGroups}
      pageHeaderContent={
        <PageHeader
          title="Account Settings"
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: "Settings", path: "/settings" },
          ]}
          actions={
            <>
              <Button variant="outlined" size="medium">
                Cancel
              </Button>
              <Button
                variant="contained"
                size="medium"
                startIcon={<Save />}
                sx={{ ml: 1 }}
              >
                Save Changes
              </Button>
            </>
          }
          status={
            <Chip
              label="All changes saved"
              color="success"
              size="small"
              sx={{ fontWeight: 500 }}
            />
          }
        />
      }
    >
      <div className={styles.container}>
        {/* Tabs Navigation */}
        <Paper className={styles.tabsContainer} elevation={0}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="settings tabs"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              minHeight: 48,
            }}
          >
            <Tab
              icon={<Person />}
              iconPosition="start"
              label="Profile"
              sx={{ minHeight: 48 }}
            />
            <Tab
              icon={<Notifications />}
              iconPosition="start"
              label="Notifications"
              sx={{ minHeight: 48 }}
            />
            <Tab
              icon={<Security />}
              iconPosition="start"
              label="Security"
              sx={{ minHeight: 48 }}
            />
            <Tab
              icon={<Language />}
              iconPosition="start"
              label="Language & Region"
              sx={{ minHeight: 48 }}
            />
            <Tab
              icon={<Palette />}
              iconPosition="start"
              label="Appearance"
              sx={{ minHeight: 48 }}
            />
            <Tab
              icon={<Settings />}
              iconPosition="start"
              label="Advanced"
              sx={{ minHeight: 48 }}
            />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        <Box className={styles.tabContent}>
          {activeTab === 0 && <ProfileTab />}
          {activeTab === 1 && (
            <NotificationsTab
              settings={settings}
              onSettingChange={handleSettingChange}
            />
          )}
          {activeTab === 2 && <SecurityTab />}
          {activeTab === 3 && <LanguageTab />}
          {activeTab === 4 && (
            <AppearanceTab
              settings={settings}
              onSettingChange={handleSettingChange}
            />
          )}
          {activeTab === 5 && <AdvancedTab />}
        </Box>
      </div>
    </AppFrame>
  );
}

// Profile Tab Content
function ProfileTab() {
  return (
    <div className={styles.tabPanel}>
      <Typography variant="h6" component="h2" gutterBottom>
        Profile Information
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Manage your personal information and how others see you on the platform.
      </Typography>

      <Paper className={styles.section} elevation={0}>
        <div className={styles.formGroup}>
          <TextField
            fullWidth
            label="Full Name"
            defaultValue="John Doe"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email Address"
            defaultValue="john.doe@example.com"
            variant="outlined"
            margin="normal"
            type="email"
          />
          <TextField
            fullWidth
            label="Job Title"
            defaultValue="Product Manager"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Company"
            defaultValue="Acme Corporation"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Bio"
            defaultValue="Experienced product manager with a passion for building great user experiences."
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
          />
        </div>
      </Paper>

      <Paper className={styles.section} elevation={0}>
        <Typography variant="subtitle1" component="h3" gutterBottom>
          Contact Information
        </Typography>
        <div className={styles.formGroup}>
          <TextField
            fullWidth
            label="Phone Number"
            defaultValue="+1 (555) 123-4567"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Location"
            defaultValue="San Francisco, CA"
            variant="outlined"
            margin="normal"
          />
        </div>
      </Paper>
    </div>
  );
}

// Notifications Tab Content
function NotificationsTab({
  settings,
  onSettingChange,
}: {
  settings: Record<string, boolean>;
  onSettingChange: (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={styles.tabPanel}>
      <Typography variant="h6" component="h2" gutterBottom>
        Notification Preferences
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Choose how you want to be notified about updates and activities.
      </Typography>

      <Paper className={styles.section} elevation={0}>
        <Typography variant="subtitle1" component="h3" gutterBottom>
          Email Notifications
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Email Notifications"
              secondary="Receive notifications via email"
            />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.emailNotifications}
                onChange={onSettingChange("emailNotifications")}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Marketing Emails"
              secondary="Receive updates about new features and promotions"
            />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.marketingEmails}
                onChange={onSettingChange("marketingEmails")}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>

      <Paper className={styles.section} elevation={0}>
        <Typography variant="subtitle1" component="h3" gutterBottom>
          Push Notifications
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Push Notifications"
              secondary="Receive push notifications in your browser"
            />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.pushNotifications}
                onChange={onSettingChange("pushNotifications")}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>

      <Paper className={styles.section} elevation={0}>
        <Typography variant="subtitle1" component="h3" gutterBottom>
          Activity Notifications
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Mentions"
              secondary="Notify me when someone mentions me"
            />
            <ListItemSecondaryAction>
              <Switch defaultChecked />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Comments"
              secondary="Notify me about new comments on my posts"
            />
            <ListItemSecondaryAction>
              <Switch defaultChecked />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Follows"
              secondary="Notify me when someone follows me"
            />
            <ListItemSecondaryAction>
              <Switch />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>
    </div>
  );
}

// Security Tab Content
function SecurityTab() {
  return (
    <div className={styles.tabPanel}>
      <Typography variant="h6" component="h2" gutterBottom>
        Security Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Manage your account security and authentication settings.
      </Typography>

      <Paper className={styles.section} elevation={0}>
        <Typography variant="subtitle1" component="h3" gutterBottom>
          Password
        </Typography>
        <div className={styles.formGroup}>
          <TextField
            fullWidth
            label="Current Password"
            type="password"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="New Password"
            type="password"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Confirm New Password"
            type="password"
            variant="outlined"
            margin="normal"
          />
          <Button variant="contained" sx={{ mt: 2, alignSelf: "flex-start" }}>
            Update Password
          </Button>
        </div>
      </Paper>

      <Paper className={styles.section} elevation={0}>
        <Typography variant="subtitle1" component="h3" gutterBottom>
          Two-Factor Authentication
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Add an extra layer of security to your account by enabling two-factor
          authentication.
        </Typography>
        <Button variant="outlined" sx={{ mt: 1 }}>
          Enable 2FA
        </Button>
      </Paper>

      <Paper className={styles.section} elevation={0}>
        <Typography variant="subtitle1" component="h3" gutterBottom>
          Active Sessions
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Current Session"
              secondary="Chrome on Windows • San Francisco, CA • Active now"
            />
            <ListItemSecondaryAction>
              <Chip label="Current" color="primary" size="small" />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Mobile Device"
              secondary="Safari on iOS • Last active 2 hours ago"
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" size="small">
                <Typography variant="caption" color="error">
                  Revoke
                </Typography>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>
    </div>
  );
}

// Language Tab Content
function LanguageTab() {
  return (
    <div className={styles.tabPanel}>
      <Typography variant="h6" component="h2" gutterBottom>
        Language & Region
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Customize your language, region, and date/time preferences.
      </Typography>

      <Paper className={styles.section} elevation={0}>
        <div className={styles.formGroup}>
          <TextField
            fullWidth
            select
            label="Language"
            defaultValue="en"
            variant="outlined"
            margin="normal"
            SelectProps={{
              native: true,
            }}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="ja">Japanese</option>
          </TextField>
          <TextField
            fullWidth
            select
            label="Region"
            defaultValue="us"
            variant="outlined"
            margin="normal"
            SelectProps={{
              native: true,
            }}
          >
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
            <option value="au">Australia</option>
            <option value="de">Germany</option>
          </TextField>
          <TextField
            fullWidth
            select
            label="Time Zone"
            defaultValue="pst"
            variant="outlined"
            margin="normal"
            SelectProps={{
              native: true,
            }}
          >
            <option value="pst">Pacific Standard Time (PST)</option>
            <option value="est">Eastern Standard Time (EST)</option>
            <option value="cst">Central Standard Time (CST)</option>
            <option value="mst">Mountain Standard Time (MST)</option>
            <option value="utc">UTC</option>
          </TextField>
          <TextField
            fullWidth
            select
            label="Date Format"
            defaultValue="mm/dd/yyyy"
            variant="outlined"
            margin="normal"
            SelectProps={{
              native: true,
            }}
          >
            <option value="mm/dd/yyyy">MM/DD/YYYY</option>
            <option value="dd/mm/yyyy">DD/MM/YYYY</option>
            <option value="yyyy-mm-dd">YYYY-MM-DD</option>
          </TextField>
        </div>
      </Paper>
    </div>
  );
}

// Appearance Tab Content
function AppearanceTab({
  settings,
  onSettingChange,
}: {
  settings: Record<string, boolean>;
  onSettingChange: (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={styles.tabPanel}>
      <Typography variant="h6" component="h2" gutterBottom>
        Appearance Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Customize the look and feel of your interface.
      </Typography>

      <Paper className={styles.section} elevation={0}>
        <Typography variant="subtitle1" component="h3" gutterBottom>
          Theme
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Dark Mode"
              secondary="Use dark theme for the interface"
            />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.darkMode}
                onChange={onSettingChange("darkMode")}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>

      <Paper className={styles.section} elevation={0}>
        <Typography variant="subtitle1" component="h3" gutterBottom>
          Editor Preferences
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Auto-save"
              secondary="Automatically save changes as you work"
            />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.autoSave}
                onChange={onSettingChange("autoSave")}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>

      <Paper className={styles.section} elevation={0}>
        <Typography variant="subtitle1" component="h3" gutterBottom>
          Display Density
        </Typography>
        <div className={styles.formGroup}>
          <TextField
            fullWidth
            select
            label="Density"
            defaultValue="comfortable"
            variant="outlined"
            margin="normal"
            SelectProps={{
              native: true,
            }}
          >
            <option value="comfortable">Comfortable</option>
            <option value="compact">Compact</option>
            <option value="spacious">Spacious</option>
          </TextField>
        </div>
      </Paper>
    </div>
  );
}

// Advanced Tab Content
function AdvancedTab() {
  return (
    <div className={styles.tabPanel}>
      <Typography variant="h6" component="h2" gutterBottom>
        Advanced Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Advanced configuration options for power users.
      </Typography>

      <Paper className={styles.section} elevation={0}>
        <Typography variant="subtitle1" component="h3" gutterBottom>
          Data Management
        </Typography>
        <div className={styles.formGroup}>
          <Button variant="outlined" color="primary" sx={{ mr: 2 }}>
            Export Data
          </Button>
          <Button variant="outlined" color="error">
            Delete Account
          </Button>
        </div>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Export your data or permanently delete your account and all associated
          data.
        </Typography>
      </Paper>

      <Paper className={styles.section} elevation={0}>
        <Typography variant="subtitle1" component="h3" gutterBottom>
          API Access
        </Typography>
        <div className={styles.formGroup}>
          <TextField
            fullWidth
            label="API Key"
            defaultValue="sk_live_••••••••••••••••"
            variant="outlined"
            margin="normal"
            type="password"
            InputProps={{
              readOnly: true,
            }}
          />
          <Button variant="outlined" sx={{ mt: 1, alignSelf: "flex-start" }}>
            Regenerate API Key
          </Button>
        </div>
      </Paper>

      <Paper className={styles.section} elevation={0}>
        <Typography variant="subtitle1" component="h3" gutterBottom>
          Developer Options
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Enable Debug Mode"
              secondary="Show additional debugging information"
            />
            <ListItemSecondaryAction>
              <Switch />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Beta Features"
              secondary="Enable access to experimental features"
            />
            <ListItemSecondaryAction>
              <Switch />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>
    </div>
  );
}
