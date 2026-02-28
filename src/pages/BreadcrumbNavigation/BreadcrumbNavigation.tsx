import { useMemo, useState } from "react";
import { AppFrame } from "../../components/AppFrame/AppFrame";
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Link,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { ChevronRight, Folder } from "@mui/icons-material";
import { defaultNavGroups } from "../../config/sidebarData";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import styles from "./BreadcrumbNavigation.module.css";

interface Node {
  name: string;
  children?: Node[];
}

const tree: Node = {
  name: "Root",
  children: [
    {
      name: "Products",
      children: [{ name: "2026" }, { name: "Roadmap" }, { name: "Launch Assets" }],
    },
    {
      name: "Customers",
      children: [{ name: "Enterprise" }, { name: "SMB" }, { name: "Trials" }],
    },
    {
      name: "Engineering",
      children: [{ name: "API" }, { name: "Frontend" }, { name: "Platform" }],
    },
  ],
};

export function BreadcrumbNavigation() {
  useDocumentTitle("Breadcrumb Navigation Layout - Layout Showcase");
  const [path, setPath] = useState<number[]>([]);

  const currentNode = useMemo(() => {
    let node = tree;
    path.forEach((index) => {
      node = node.children?.[index] ?? node;
    });
    return node;
  }, [path]);

  const breadcrumbNodes = useMemo(() => {
    const nodes: Node[] = [tree];
    let node = tree;
    path.forEach((index) => {
      const next = node.children?.[index];
      if (next) {
        nodes.push(next);
        node = next;
      }
    });
    return nodes;
  }, [path]);

  return (
    <AppFrame showAppHeader showNav navGroups={defaultNavGroups}>
      <div className={styles.container}>
        <Paper className={styles.toolbar} elevation={1}>
          <Button onClick={() => setPath((prev) => prev.slice(0, -1))} disabled={path.length === 0}>
            Back
          </Button>
          <Breadcrumbs separator={<ChevronRight fontSize="small" />}>
            {breadcrumbNodes.map((node, index) => (
              <Link
                key={node.name}
                component="button"
                underline="hover"
                color={index === breadcrumbNodes.length - 1 ? "text.primary" : "inherit"}
                onClick={() => setPath(path.slice(0, index))}
              >
                {node.name}
              </Link>
            ))}
          </Breadcrumbs>
          <Chip label={`/${breadcrumbNodes.map((node) => node.name.toLowerCase()).join("/")}`} size="small" />
        </Paper>

        <Paper className={styles.browser} elevation={1}>
          <Box className={styles.heading}>
            <Typography variant="h6">{currentNode.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {currentNode.children?.length ?? 0} items
            </Typography>
          </Box>

          {currentNode.children && currentNode.children.length > 0 ? (
            <List disablePadding>
              {currentNode.children.map((child, index) => (
                <ListItemButton
                  key={child.name}
                  onClick={() => {
                    if (child.children) {
                      setPath((prev) => [...prev, index]);
                    }
                  }}
                >
                  <Folder fontSize="small" color="action" />
                  <ListItemText primary={child.name} sx={{ ml: 1.5 }} />
                </ListItemButton>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              This folder has no subfolders.
            </Typography>
          )}
        </Paper>
      </div>
    </AppFrame>
  );
}
