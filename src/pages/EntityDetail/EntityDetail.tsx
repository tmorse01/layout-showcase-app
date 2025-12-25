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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { defaultNavItems } from "../../config/sidebarData";
import styles from "./EntityDetail.module.css";

/**
 * Entity Detail Layout
 *
 * Demonstrates the use of a sticky page header with contextual actions and status.
 * The page header remains visible while scrolling through long content, making
 * actions and status information always accessible.
 *
 * Header Pattern: app-page (both app header and page header)
 * - App header: Global navigation (64px)
 * - Page header: Contextual actions, breadcrumbs, status (72px)
 * - Total: 136px (within 144px max constraint)
 */
export function EntityDetail() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <AppFrame
      showAppHeader
      showPageHeader
      showNav
      navItems={defaultNavItems}
      pageHeaderContent={
        <PageHeader
          title="Product #PRD-2024-001"
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: "Products", path: "/products" },
            { label: "PRD-2024-001" },
          ]}
          actions={
            <>
              <Button variant="outlined" startIcon={<Edit />}>
                Edit
              </Button>
              <Button variant="contained" color="primary">
                Save Changes
              </Button>
              <Button variant="outlined" color="error" startIcon={<Delete />}>
                Delete
              </Button>
            </>
          }
          status={
            <Chip
              label="Active"
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
            aria-label="entity detail tabs"
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              "& .MuiTab-root": {
                pointerEvents: "auto",
              },
            }}
          >
            <Tab label="Overview" />
            <Tab label="Details" />
            <Tab label="History" />
            <Tab label="Relations" />
            <Tab label="Settings" />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        <Box className={styles.tabContent}>
          {activeTab === 0 && <OverviewTab />}
          {activeTab === 1 && <DetailsTab />}
          {activeTab === 2 && <HistoryTab />}
          {activeTab === 3 && <RelationsTab />}
          {activeTab === 4 && <SettingsTab />}
        </Box>
      </div>
    </AppFrame>
  );
}

/**
 * Overview Tab - Shows summary information
 * Long content to demonstrate sticky header usefulness
 */
function OverviewTab() {
  return (
    <div className={styles.tabPanel}>
      <Typography variant="h6" gutterBottom>
        Product Overview
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        This tab demonstrates how the sticky page header remains accessible
        while scrolling through long content. The actions (Edit, Save, Delete)
        and status indicator stay visible at all times.
      </Typography>

      <div className={styles.infoGrid}>
        <Paper className={styles.infoCard} elevation={0}>
          <Typography variant="caption" color="text.secondary">
            Product Name
          </Typography>
          <Typography variant="h6">Premium Widget Pro</Typography>
        </Paper>
        <Paper className={styles.infoCard} elevation={0}>
          <Typography variant="caption" color="text.secondary">
            SKU
          </Typography>
          <Typography variant="h6">PRD-2024-001</Typography>
        </Paper>
        <Paper className={styles.infoCard} elevation={0}>
          <Typography variant="caption" color="text.secondary">
            Price
          </Typography>
          <Typography variant="h6">$299.99</Typography>
        </Paper>
        <Paper className={styles.infoCard} elevation={0}>
          <Typography variant="caption" color="text.secondary">
            Stock
          </Typography>
          <Typography variant="h6">1,234 units</Typography>
        </Paper>
      </div>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Description
      </Typography>
      <Typography variant="body1" paragraph>
        The Premium Widget Pro is our flagship product, designed for
        professionals who demand the highest quality and performance. With
        advanced features and durable construction, it's built to last.
      </Typography>

      {/* Long content to demonstrate scrolling */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Paper key={i} className={styles.contentSection} elevation={0}>
          <Typography variant="subtitle1" gutterBottom>
            Section {i + 1}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is section {i + 1} of the overview content. As you scroll down,
            notice how the page header with actions and status remains visible
            at the top, making it easy to access important actions without
            scrolling back up.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
        </Paper>
      ))}
    </div>
  );
}

/**
 * Details Tab - Shows detailed information
 */
function DetailsTab() {
  return (
    <div className={styles.tabPanel}>
      <Typography variant="h6" gutterBottom>
        Product Details
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Detailed specifications and technical information about the product.
      </Typography>

      <div className={styles.detailsList}>
        {[
          { label: "Manufacturer", value: "Widget Industries Inc." },
          { label: "Model Number", value: "WID-PRO-2024" },
          { label: "Weight", value: "2.5 kg" },
          { label: "Dimensions", value: "30cm × 20cm × 15cm" },
          { label: "Material", value: "Aluminum Alloy" },
          { label: "Warranty", value: "2 years" },
          { label: "Color Options", value: "Black, Silver, Blue" },
          { label: "Certifications", value: "CE, FCC, RoHS" },
        ].map((item, index) => (
          <div key={index} className={styles.detailRow}>
            <Typography variant="body2" className={styles.detailLabel}>
              {item.label}:
            </Typography>
            <Typography variant="body2" className={styles.detailValue}>
              {item.value}
            </Typography>
          </div>
        ))}
      </div>

      {/* More long content */}
      {Array.from({ length: 10 }).map((_, i) => (
        <Paper key={i} className={styles.contentSection} elevation={0}>
          <Typography variant="subtitle1" gutterBottom>
            Technical Specification {i + 1}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Detailed technical information about feature {i + 1}. This content
            demonstrates how the sticky header pattern is useful for pages with
            extensive information.
          </Typography>
        </Paper>
      ))}
    </div>
  );
}

/**
 * History Tab - Shows activity history
 */
function HistoryTab() {
  const historyItems = [
    { date: "2024-01-15", action: "Created", user: "John Doe" },
    { date: "2024-01-16", action: "Updated", user: "Jane Smith" },
    { date: "2024-01-17", action: "Price Changed", user: "John Doe" },
    { date: "2024-01-18", action: "Stock Updated", user: "Jane Smith" },
    { date: "2024-01-19", action: "Status Changed", user: "John Doe" },
  ];

  return (
    <div className={styles.tabPanel}>
      <Typography variant="h6" gutterBottom>
        Activity History
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Complete history of changes and activities for this product.
      </Typography>

      <div className={styles.historyList}>
        {historyItems.map((item, index) => (
          <Paper key={index} className={styles.historyItem} elevation={0}>
            <div className={styles.historyContent}>
              <Typography variant="body2" fontWeight={500}>
                {item.action}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.date} by {item.user}
              </Typography>
            </div>
          </Paper>
        ))}
      </div>

      {/* More history items to demonstrate scrolling */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Paper key={i} className={styles.historyItem} elevation={0}>
          <div className={styles.historyContent}>
            <Typography variant="body2" fontWeight={500}>
              System Update #{i + 6}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              2024-01-{20 + i} by System
            </Typography>
          </div>
        </Paper>
      ))}
    </div>
  );
}

/**
 * Relations Tab - Shows related entities
 */
function RelationsTab() {
  return (
    <div className={styles.tabPanel}>
      <Typography variant="h6" gutterBottom>
        Related Products
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Products that are related to or frequently purchased with this item.
      </Typography>

      <div className={styles.relationsGrid}>
        {Array.from({ length: 12 }).map((_, i) => (
          <Paper key={i} className={styles.relationCard} elevation={0}>
            <Typography variant="subtitle1">Related Product {i + 1}</Typography>
            <Typography variant="body2" color="text.secondary">
              Complementary item description
            </Typography>
          </Paper>
        ))}
      </div>
    </div>
  );
}

/**
 * Settings Tab - Shows configuration options
 */
function SettingsTab() {
  return (
    <div className={styles.tabPanel}>
      <Typography variant="h6" gutterBottom>
        Product Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Configuration and settings for this product.
      </Typography>

      {Array.from({ length: 8 }).map((_, i) => (
        <Paper key={i} className={styles.settingSection} elevation={0}>
          <Typography variant="subtitle1" gutterBottom>
            Setting Category {i + 1}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Configuration options and settings for category {i + 1}. These
            settings control various aspects of the product's behavior and
            display.
          </Typography>
        </Paper>
      ))}
    </div>
  );
}
