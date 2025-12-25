import { useState, type ReactNode } from "react";
import { AppFrame } from "../../components/AppFrame/AppFrame";
import { defaultNavItems } from "../../config/sidebarData";
import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  IconButton,
  Button,
} from "@mui/material";
import {
  Folder,
  Description,
  Code,
  Visibility,
  DragIndicator,
  Settings,
  Refresh,
} from "@mui/icons-material";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import styles from "./SplitView.module.css";

// Sample file structure
interface FileNode {
  id: string;
  name: string;
  type: "folder" | "file";
  icon?: ReactNode;
  children?: FileNode[];
}

const fileTree: FileNode[] = [
  {
    id: "1",
    name: "src",
    type: "folder",
    icon: <Folder />,
    children: [
      { id: "1-1", name: "components", type: "folder", icon: <Folder /> },
      { id: "1-2", name: "pages", type: "folder", icon: <Folder /> },
      { id: "1-3", name: "App.tsx", type: "file", icon: <Code /> },
      { id: "1-4", name: "index.tsx", type: "file", icon: <Code /> },
    ],
  },
  {
    id: "2",
    name: "public",
    type: "folder",
    icon: <Folder />,
    children: [
      { id: "2-1", name: "index.html", type: "file", icon: <Description /> },
      { id: "2-2", name: "favicon.ico", type: "file", icon: <Description /> },
    ],
  },
  {
    id: "3",
    name: "package.json",
    type: "file",
    icon: <Description />,
  },
  {
    id: "4",
    name: "README.md",
    type: "file",
    icon: <Description />,
  },
];

// Sample code content
const sampleCode = `import { useState } from 'react';
import { AppFrame } from '../../components/AppFrame/AppFrame';

export function SplitView() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  return (
    <AppFrame showAppHeader showNav>
      <div className={styles.container}>
        {/* File Tree Panel */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <Typography variant="subtitle2" fontWeight={600}>
              Files
            </Typography>
          </div>
          <div className={styles.panelContent}>
            {/* File tree content */}
          </div>
        </div>

        {/* Editor Panel */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <Typography variant="subtitle2" fontWeight={600}>
              Editor
            </Typography>
          </div>
          <div className={styles.panelContent}>
            {/* Code editor */}
          </div>
        </div>

        {/* Preview Panel */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <Typography variant="subtitle2" fontWeight={600}>
              Preview
            </Typography>
          </div>
          <div className={styles.panelContent}>
            {/* Preview content */}
          </div>
        </div>
      </div>
    </AppFrame>
  );
}`;

const samplePreview = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Split View Layout</title>
</head>
<body>
  <div class="container">
    <h1>Split View Layout</h1>
    <p>This demonstrates a resizable panel layout commonly used in:</p>
    <ul>
      <li>Code editors (VS Code, WebStorm)</li>
      <li>Design tools (Figma, Sketch)</li>
      <li>Data analysis tools</li>
    </ul>
  </div>
</body>
</html>`;

export function SplitView() {
  useDocumentTitle("Split View (Resizable Panels) - Layout Showcase");
  const [selectedFile, setSelectedFile] = useState<string | null>("1-3");

  const renderFileTree = (nodes: FileNode[], level = 0) => {
    return nodes.map((node) => (
      <div key={node.id}>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedFile === node.id}
            onClick={() => node.type === "file" && setSelectedFile(node.id)}
            className={styles.fileItem}
            sx={{ pl: `${12 + level * 16}px` }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              {node.icon || (
                <Description sx={{ fontSize: 18, color: "text.secondary" }} />
              )}
            </ListItemIcon>
            <ListItemText
              primary={node.name}
              primaryTypographyProps={{
                variant: "body2",
                fontSize: "0.875rem",
              }}
            />
          </ListItemButton>
        </ListItem>
        {node.children && (
          <div className={styles.fileTreeChildren}>
            {renderFileTree(node.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <AppFrame showAppHeader showNav navItems={defaultNavItems}>
      <div className={styles.container}>
        {/* Split View Container */}
        <div className={styles.splitContainer}>
          {/* Left Panel - File Tree */}
          <Paper className={styles.panel} elevation={0}>
            <div className={styles.panelHeader}>
              <Typography variant="subtitle2" fontWeight={600}>
                Files
              </Typography>
              <IconButton size="small">
                <Settings fontSize="small" />
              </IconButton>
            </div>
            <Divider />
            <div className={styles.panelContent}>
              <List dense disablePadding>
                {renderFileTree(fileTree)}
              </List>
            </div>
          </Paper>

          {/* Drag Handle */}
          <div className={styles.dragHandle} aria-label="Resize panels">
            <DragIndicator className={styles.dragIcon} />
          </div>

          {/* Middle Panel - Code Editor */}
          <Paper className={styles.panel} elevation={0}>
            <div className={styles.panelHeader}>
              <Typography variant="subtitle2" fontWeight={600}>
                Editor
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                <Chip
                  label="TypeScript"
                  size="small"
                  sx={{ height: 20, fontSize: "0.7rem" }}
                />
                <IconButton size="small">
                  <Refresh fontSize="small" />
                </IconButton>
              </Box>
            </div>
            <Divider />
            <div className={styles.panelContent}>
              <div className={styles.codeEditor}>
                <div className={styles.codeHeader}>
                  <Typography variant="caption" color="text.secondary">
                    App.tsx
                  </Typography>
                </div>
                <pre className={styles.codeContent}>
                  <code>{sampleCode}</code>
                </pre>
              </div>
            </div>
          </Paper>

          {/* Drag Handle */}
          <div className={styles.dragHandle} aria-label="Resize panels">
            <DragIndicator className={styles.dragIcon} />
          </div>

          {/* Right Panel - Preview */}
          <Paper className={styles.panel} elevation={0}>
            <div className={styles.panelHeader}>
              <Typography variant="subtitle2" fontWeight={600}>
                Preview
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Visibility />}
                  sx={{ textTransform: "none", fontSize: "0.75rem" }}
                >
                  Open in Browser
                </Button>
              </Box>
            </div>
            <Divider />
            <div className={styles.panelContent}>
              <div className={styles.preview}>
                <div className={styles.previewHeader}>
                  <Typography variant="caption" color="text.secondary">
                    index.html
                  </Typography>
                </div>
                <div className={styles.previewContent}>
                  <pre className={styles.codeContent}>
                    <code>{samplePreview}</code>
                  </pre>
                </div>
              </div>
            </div>
          </Paper>
        </div>

        {/* Info Section */}
        <Box className={styles.infoSection}>
          <Typography variant="body2" color="text.secondary">
            <strong>Split View Layout:</strong> This layout demonstrates resizable
            panels with visual drag handles. In a real implementation, users can
            drag the handles to adjust panel widths. Common use cases include
            code editors, design tools, and data analysis interfaces.
          </Typography>
        </Box>
      </div>
    </AppFrame>
  );
}
