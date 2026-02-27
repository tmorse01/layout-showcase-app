import { useState } from "react";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import {
  Home as HomeIcon,
  Folder as FolderIcon,
  Description as DescriptionIcon,
  FolderOpen as FolderOpenIcon,
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Share as ShareIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";
import { AppFrame } from "../../components/AppFrame/AppFrame";
import { defaultNavGroups } from "../../config/sidebarData";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import styles from "./BreadcrumbNavigation.module.css";

type BreadcrumbItem = { label: string; id: string };

type ContentItem = {
  id: string;
  name: string;
  type: "folder" | "file";
  modified: string;
  size?: string;
  items?: number;
};

const fileSystem: Record<string, { items: ContentItem[]; description: string }> = {
  root: {
    description: "All your files and folders",
    items: [
      { id: "projects", name: "Projects", type: "folder", modified: "Today", items: 4 },
      { id: "documents", name: "Documents", type: "folder", modified: "Yesterday", items: 12 },
      { id: "design", name: "Design Assets", type: "folder", modified: "3 days ago", items: 7 },
      { id: "readme", name: "README.md", type: "file", modified: "1 week ago", size: "4 KB" },
      { id: "license", name: "LICENSE", type: "file", modified: "1 month ago", size: "1 KB" },
    ],
  },
  projects: {
    description: "Active and archived project files",
    items: [
      { id: "website", name: "Website Redesign", type: "folder", modified: "Today", items: 8 },
      { id: "mobile", name: "Mobile App", type: "folder", modified: "2 days ago", items: 15 },
      { id: "api", name: "API Documentation", type: "folder", modified: "1 week ago", items: 3 },
      { id: "overview", name: "Project Overview.pdf", type: "file", modified: "Today", size: "2.3 MB" },
    ],
  },
  website: {
    description: "Website redesign project files",
    items: [
      { id: "wireframes", name: "Wireframes", type: "folder", modified: "Yesterday", items: 5 },
      { id: "specs", name: "Specifications.docx", type: "file", modified: "Today", size: "890 KB" },
      { id: "mockups", name: "Mockups.fig", type: "file", modified: "Yesterday", size: "12 MB" },
      { id: "notes", name: "Meeting Notes.md", type: "file", modified: "3 days ago", size: "14 KB" },
    ],
  },
  documents: {
    description: "General documents and reports",
    items: [
      { id: "q1report", name: "Q1 Report.pdf", type: "file", modified: "1 week ago", size: "1.4 MB" },
      { id: "contracts", name: "Contracts", type: "folder", modified: "2 weeks ago", items: 6 },
      { id: "policies", name: "Company Policies.docx", type: "file", modified: "1 month ago", size: "220 KB" },
    ],
  },
};

/**
 * Breadcrumb Navigation Layout
 *
 * Demonstrates hierarchical navigation with a prominent breadcrumb trail.
 * Users can navigate through content hierarchies (like a file browser) and
 * always know where they are. This pattern is common in file managers,
 * CMS systems, and any app with deep content hierarchies.
 *
 * Header Pattern: app-only
 * Features:
 * - Interactive breadcrumb trail
 * - Folder/file hierarchy navigation
 * - Back button support
 * - Current path indicator
 */
export function BreadcrumbNavigation() {
  useDocumentTitle("Breadcrumb Navigation Layout - Layout Showcase");
  const [path, setPath] = useState<BreadcrumbItem[]>([{ label: "Home", id: "root" }]);

  const currentId = path[path.length - 1].id;
  const currentData = fileSystem[currentId] ?? fileSystem["root"];

  const navigateTo = (item: ContentItem) => {
    if (item.type === "folder" && fileSystem[item.id]) {
      setPath((prev) => [...prev, { label: item.name, id: item.id }]);
    }
  };

  const navigateToBreadcrumb = (index: number) => {
    setPath((prev) => prev.slice(0, index + 1));
  };

  const navigateBack = () => {
    if (path.length > 1) {
      setPath((prev) => prev.slice(0, -1));
    }
  };

  return (
    <AppFrame showAppHeader showNav navGroups={defaultNavGroups}>
      <div className={styles.container}>
        {/* Page Header with Breadcrumb */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
            {path.length > 1 && (
              <Button
                startIcon={<ArrowBackIcon />}
                size="small"
                onClick={navigateBack}
                variant="outlined"
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            )}
            {/* Breadcrumb trail */}
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="file navigation breadcrumb"
              sx={{ flex: 1 }}
            >
              {path.map((crumb, index) => {
                const isLast = index === path.length - 1;
                return isLast ? (
                  <Typography
                    key={crumb.id}
                    color="text.primary"
                    variant="body2"
                    fontWeight={600}
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    {index === 0 ? (
                      <HomeIcon sx={{ fontSize: 16 }} />
                    ) : (
                      <FolderOpenIcon sx={{ fontSize: 16 }} />
                    )}
                    {crumb.label}
                  </Typography>
                ) : (
                  <Link
                    key={crumb.id}
                    component="button"
                    variant="body2"
                    onClick={() => navigateToBreadcrumb(index)}
                    sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer" }}
                    underline="hover"
                    color="text.secondary"
                  >
                    {index === 0 ? (
                      <HomeIcon sx={{ fontSize: 16 }} />
                    ) : (
                      <FolderIcon sx={{ fontSize: 16 }} />
                    )}
                    {crumb.label}
                  </Link>
                );
              })}
            </Breadcrumbs>

            {/* Actions */}
            <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
              <Button size="small" startIcon={<ShareIcon />} variant="outlined">
                Share
              </Button>
              <Button size="small" startIcon={<EditIcon />} variant="contained">
                New Folder
              </Button>
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary">
            {currentData.description}
          </Typography>
        </Paper>

        {/* File/Folder List */}
        <Paper
          elevation={0}
          sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, overflow: "hidden" }}
        >
          {/* Column headers */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 120px 100px 80px",
              px: 2,
              py: 1,
              bgcolor: "background.default",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              Name
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              Modified
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              Size / Items
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              Type
            </Typography>
          </Box>

          {/* Items */}
          <List disablePadding>
            {currentData.items.map((item, idx) => (
              <Box key={item.id}>
                {idx > 0 && <Divider />}
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => navigateTo(item)}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 120px 100px 80px",
                      alignItems: "center",
                      py: 1.5,
                      px: 2,
                      cursor: item.type === "folder" && fileSystem[item.id] ? "pointer" : "default",
                    }}
                    disabled={item.type === "file"}
                  >
                    {/* Name */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: "auto" }}>
                        {item.type === "folder" ? (
                          <FolderIcon sx={{ color: "warning.main" }} />
                        ) : (
                          <DescriptionIcon sx={{ color: "info.main" }} />
                        )}
                      </ListItemIcon>
                      <Box>
                        <ListItemText
                          primary={item.name}
                          primaryTypographyProps={{ variant: "body2", fontWeight: item.type === "folder" ? 600 : 400 }}
                          sx={{ m: 0 }}
                        />
                        {item.type === "folder" && fileSystem[item.id] && (
                          <Typography variant="caption" color="primary.main">
                            Click to open →
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    {/* Modified */}
                    <Typography variant="body2" color="text.secondary">
                      {item.modified}
                    </Typography>
                    {/* Size/Items */}
                    <Typography variant="body2" color="text.secondary">
                      {item.type === "folder" ? `${item.items} items` : item.size}
                    </Typography>
                    {/* Type */}
                    <Chip
                      label={item.type}
                      size="small"
                      variant="outlined"
                      color={item.type === "folder" ? "warning" : "default"}
                      sx={{ height: 20, fontSize: "0.65rem", width: "fit-content" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Box>
            ))}
          </List>
        </Paper>

        {/* Path summary */}
        <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Current path:
          </Typography>
          <Typography variant="caption" fontFamily="monospace" color="text.primary">
            /{path.map((p) => p.label).join("/")}
          </Typography>
          <Chip
            label={`${currentData.items.length} items`}
            size="small"
            sx={{ ml: "auto", height: 20, fontSize: "0.65rem" }}
          />
        </Box>
      </div>
    </AppFrame>
  );
}
