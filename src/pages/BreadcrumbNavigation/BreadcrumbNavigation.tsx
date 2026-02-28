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
import { ChevronRight, Description, Folder } from "@mui/icons-material";
import { defaultNavGroups } from "../../config/sidebarData";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import styles from "./BreadcrumbNavigation.module.css";

interface Node {
  name: string;
  children?: Node[];
  kind?: "folder" | "file";
}

const tree: Node = {
  name: "Root",
  children: [
    {
      name: "Products",
      children: [
        {
          name: "Mobile App",
          children: [
            {
              name: "iOS",
              children: [
                {
                  name: "Sprint 18",
                  children: [{ name: "stories.md", kind: "file" }, { name: "qa-results.csv", kind: "file" }],
                },
                { name: "Design", children: [{ name: "tokens.json", kind: "file" }] },
              ],
            },
            {
              name: "Android",
              children: [
                {
                  name: "Release Train",
                  children: [{ name: "v3.2", children: [{ name: "notes.md", kind: "file" }] }],
                },
              ],
            },
          ],
        },
        {
          name: "Web Platform",
          children: [
            {
              name: "Roadmap",
              children: [{ name: "Q3", children: [{ name: "epics.md", kind: "file" }] }, { name: "Q4" }],
            },
            { name: "Launch Assets", children: [{ name: "deck-v6.pptx", kind: "file" }] },
          ],
        },
      ],
    },
    {
      name: "Customers",
      children: [
        {
          name: "Enterprise",
          children: [
            {
              name: "Northstar Bank",
              children: [{ name: "QBR", children: [{ name: "2026-Q1.pdf", kind: "file" }] }, { name: "Renewal" }],
            },
            {
              name: "Atlas Logistics",
              children: [{ name: "Escalations", children: [{ name: "incident-441.txt", kind: "file" }] }],
            },
          ],
        },
        {
          name: "SMB",
          children: [{ name: "Playbooks", children: [{ name: "onboarding.md", kind: "file" }] }, { name: "Campaigns" }],
        },
        { name: "Trials", children: [{ name: "Week 1" }, { name: "Week 2" }] },
      ],
    },
    {
      name: "Engineering",
      children: [
        {
          name: "API",
          children: [{ name: "Auth", children: [{ name: "contracts.yaml", kind: "file" }] }, { name: "Billing" }],
        },
        {
          name: "Frontend",
          children: [{ name: "Design System", children: [{ name: "figma-links.md", kind: "file" }] }, { name: "App Shell" }],
        },
        {
          name: "Platform",
          children: [{ name: "Observability", children: [{ name: "slo-report.md", kind: "file" }] }, { name: "Infra" }],
        },
      ],
    },
  ],
};

const notesBySection: Record<string, string[]> = {
  Products: ["Weekly release sync every Tuesday.", "Design QA checklist required before launch."],
  Customers: ["Enterprise reviews tracked in shared workspace.", "Escalations are triaged daily at 10:00 AM."],
  Engineering: ["API contracts are versioned before rollout.", "Platform SLO report updates every Friday."],
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

  const topSection = breadcrumbNodes[1]?.name;
  const sectionNotes = notesBySection[topSection] ?? [
    "Use the tree to drill into folders and files.",
    "Breadcrumb links can jump to any ancestor level.",
  ];

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
          <Chip label={`Depth: ${path.length}`} size="small" variant="outlined" />
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
                  key={`${child.name}-${index}`}
                  onClick={() => {
                    if (child.children) {
                      setPath((prev) => [...prev, index]);
                    }
                  }}
                >
                  {child.children ? (
                    <Folder fontSize="small" color="action" />
                  ) : (
                    <Description fontSize="small" color="disabled" />
                  )}
                  <ListItemText
                    primary={child.name}
                    secondary={child.children ? `${child.children.length} items` : "File"}
                    sx={{ ml: 1.5 }}
                  />
                </ListItemButton>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              This folder has no subfolders.
            </Typography>
          )}
          <Box sx={{ px: 1, pt: 1 }}>
            <Typography variant="subtitle2">Workspace Notes</Typography>
            {sectionNotes.map((note) => (
              <Typography key={note} variant="body2" color="text.secondary">
                • {note}
              </Typography>
            ))}
          </Box>
        </Paper>
      </div>
    </AppFrame>
  );
}
