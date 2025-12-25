import { useState } from "react";
import { AppFrame } from "../../components/AppFrame/AppFrame";
import { RightRail } from "../../components/RightRail/RightRail";
import {
  Button,
  Typography,
  Paper,
  Chip,
  Divider,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  Palette as PaletteIcon,
  Code as CodeIcon,
  Image as ImageIcon,
  Description as DescriptionIcon,
  Settings as SettingsIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { defaultNavGroups } from "../../config/sidebarData";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import styles from "./RightInspector.module.css";

/**
 * Right Inspector Layout
 *
 * Demonstrates a toggleable right sidebar that shows contextual information
 * about selected items. The main content adjusts automatically when the
 * inspector is opened or closed.
 *
 * Header Pattern: app-only
 * - App header: Global navigation (64px)
 * - No page header: Actions are in the main content area
 *
 * Use Cases:
 * - Design tools (property panels)
 * - File browsers (file details)
 * - Component libraries (component properties)
 * - Contextual help and information
 */

interface InspectorItem {
  id: number;
  name: string;
  type: string;
  icon: React.ReactNode;
  category: string;
  description: string;
  properties: Record<string, unknown>;
  usage: string;
  lastModified: string;
}

export function RightInspector() {
  useDocumentTitle("Right-Side Inspector Layout - Layout Showcase");
  const [showRightRail, setShowRightRail] = useState(true);
  const [selectedItem, setSelectedItem] = useState<number | null>(0);

  const items = [
    {
      id: 0,
      name: "Primary Button",
      type: "Component",
      icon: <CodeIcon />,
      category: "Buttons",
      description: "Main action button used throughout the application",
      properties: {
        variant: "contained",
        color: "primary",
        size: "medium",
        disabled: false,
      },
      usage: "Used for primary actions like 'Save', 'Submit', 'Create'",
      lastModified: "2024-01-15",
    },
    {
      id: 1,
      name: "Brand Logo",
      type: "Asset",
      icon: <ImageIcon />,
      category: "Images",
      description: "Company logo in SVG format",
      properties: {
        format: "SVG",
        dimensions: "200 × 60px",
        size: "12.5 KB",
        colorMode: "Vector",
      },
      usage: "Displayed in header and footer",
      lastModified: "2024-01-10",
    },
    {
      id: 2,
      name: "Color Palette",
      type: "Theme",
      icon: <PaletteIcon />,
      category: "Design Tokens",
      description: "Primary color palette for the application",
      properties: {
        primary: "#1976d2",
        secondary: "#dc004e",
        error: "#d32f2f",
        warning: "#ed6c02",
        success: "#2e7d32",
      },
      usage: "Used across all components and screens",
      lastModified: "2024-01-12",
    },
    {
      id: 3,
      name: "User Profile Card",
      type: "Component",
      icon: <CodeIcon />,
      category: "Cards",
      description: "Card component displaying user information",
      properties: {
        variant: "elevation",
        elevation: 2,
        padding: "16px",
        borderRadius: "8px",
      },
      usage: "User profiles, team member displays",
      lastModified: "2024-01-14",
    },
    {
      id: 4,
      name: "API Documentation",
      type: "Document",
      icon: <DescriptionIcon />,
      category: "Documentation",
      description: "Complete API reference documentation",
      properties: {
        format: "Markdown",
        pages: 45,
        lastUpdated: "2024-01-18",
        version: "2.1.0",
      },
      usage: "Developer reference and integration guide",
      lastModified: "2024-01-18",
    },
    {
      id: 5,
      name: "Settings Panel",
      type: "Component",
      icon: <SettingsIcon />,
      category: "Forms",
      description: "Configuration panel for application settings",
      properties: {
        sections: 8,
        fields: 32,
        validation: "enabled",
        autoSave: true,
      },
      usage: "User preferences and system configuration",
      lastModified: "2024-01-16",
    },
  ];

  const selectedItemData = selectedItem !== null ? items[selectedItem] : null;

  return (
    <AppFrame
      showAppHeader
      showNav
      navGroups={defaultNavGroups}
      showRightRail={showRightRail}
      onRightRailToggle={() => setShowRightRail(!showRightRail)}
      rightRailContent={
        selectedItemData ? (
          <RightRail
            title={selectedItemData.name}
            onClose={() => setShowRightRail(false)}
          >
            <InspectorContent item={selectedItemData} />
          </RightRail>
        ) : (
          <RightRail
            title="Inspector"
            onClose={() => setShowRightRail(false)}
          >
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Select an item to view details
              </Typography>
            </Box>
          </RightRail>
        )
      }
    >
      <div className={styles.container}>
        {/* Header with Toggle Button */}
        <div className={styles.header}>
          <Typography variant="h5" component="h1">
            Component Library
          </Typography>
          <Button
            variant="outlined"
            startIcon={showRightRail ? <VisibilityOffIcon /> : <VisibilityIcon />}
            onClick={() => setShowRightRail(!showRightRail)}
          >
            {showRightRail ? "Hide Inspector" : "Show Inspector"}
          </Button>
        </div>

        <Typography variant="body2" color="text.secondary" className={styles.subtitle}>
          Click on an item to view its details in the inspector panel. The
          inspector can be toggled on and off, and the main content adjusts
          automatically.
        </Typography>

        {/* Items List */}
        <Paper className={styles.itemsContainer} elevation={0}>
          <List disablePadding>
            {items.map((item) => (
              <ListItem
                key={item.id}
                disablePadding
                className={selectedItem === item.id ? styles.selectedItem : ""}
              >
                <ListItemButton
                  onClick={() => {
                    setSelectedItem(item.id);
                    if (!showRightRail) {
                      setShowRightRail(true);
                    }
                  }}
                  selected={selectedItem === item.id}
                >
                  <ListItemIcon className={styles.itemIcon}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    secondary={
                      <>
                        <Chip
                          label={item.type}
                          size="small"
                          sx={{ mr: 1, height: 20, fontSize: "0.7rem" }}
                        />
                        {item.category}
                      </>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Additional Content to Demonstrate Layout Adjustment */}
        <div className={styles.infoSection}>
          <Typography variant="h6" gutterBottom>
            About This Layout
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            The Right Inspector pattern is commonly used in design tools,
            development environments, and content management systems. It provides
            contextual information without cluttering the main workspace.
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Notice how the main content area automatically adjusts its width
            when you toggle the inspector. This creates a responsive layout
            that maximizes screen space while keeping important details
            accessible.
          </Typography>
        </div>
      </div>
    </AppFrame>
  );
}

/**
 * Inspector Content Component
 * Displays detailed information about the selected item
 */
function InspectorContent({ item }: { item: InspectorItem }) {
  return (
    <div className={styles.inspectorContent}>
      {/* Basic Information */}
      <Box className={styles.section}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          DESCRIPTION
        </Typography>
        <Typography variant="body2" paragraph>
          {item.description}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Properties */}
      <Box className={styles.section}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          PROPERTIES
        </Typography>
        <div className={styles.propertiesList}>
          {Object.entries(item.properties).map(([key, value]) => (
            <div key={key} className={styles.propertyRow}>
              <Typography variant="caption" className={styles.propertyKey}>
                {key}:
              </Typography>
              <Typography variant="body2" className={styles.propertyValue}>
                {typeof value === "object" ? JSON.stringify(value) : String(value)}
              </Typography>
            </div>
          ))}
        </div>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Usage */}
      <Box className={styles.section}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          USAGE
        </Typography>
        <Typography variant="body2" paragraph>
          {item.usage}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Metadata */}
      <Box className={styles.section}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          METADATA
        </Typography>
        <div className={styles.propertiesList}>
          <div className={styles.propertyRow}>
            <Typography variant="caption" className={styles.propertyKey}>
              Category:
            </Typography>
            <Typography variant="body2" className={styles.propertyValue}>
              {item.category}
            </Typography>
          </div>
          <div className={styles.propertyRow}>
            <Typography variant="caption" className={styles.propertyKey}>
              Last Modified:
            </Typography>
            <Typography variant="body2" className={styles.propertyValue}>
              {item.lastModified}
            </Typography>
          </div>
        </div>
      </Box>
    </div>
  );
}
