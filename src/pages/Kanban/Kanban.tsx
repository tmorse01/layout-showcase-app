import { useState, useMemo, useEffect } from "react";
import { AppFrame } from "../../components/AppFrame/AppFrame";
import { defaultNavItems } from "../../config/sidebarData";
import {
  Paper,
  Typography,
  Button,
  Chip,
  Avatar,
  AvatarGroup,
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Flag as FlagIcon,
  AccessTime as AccessTimeIcon,
  AttachFile as AttachFileIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import styles from "./Kanban.module.css";

// Task card data structure
interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "high" | "medium" | "low";
  assignees: string[];
  dueDate?: string;
  attachments?: number;
  labels?: string[];
}

// Column data structure
interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

// LocalStorage key for persisting column visibility
const STORAGE_KEY = "kanban-column-visibility";

// Default visible columns (used when localStorage is empty)
const DEFAULT_VISIBLE_COLUMNS = [
  "backlog",
  "todo",
  "in-progress",
  "code-review",
  "qa-testing",
  "blocked",
  "review",
  "done",
];

export function Kanban() {
  useDocumentTitle("Kanban / Board Layout - Layout Showcase");

  // Load initial state from localStorage or use defaults
  const loadVisibleColumns = (): Set<string> => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as string[];
        return new Set(parsed);
      }
    } catch (error) {
      console.warn(
        "Failed to load column visibility from localStorage:",
        error
      );
    }
    return new Set(DEFAULT_VISIBLE_COLUMNS);
  };

  // State for column visibility - initialized from localStorage
  const [visibleColumns, setVisibleColumns] =
    useState<Set<string>>(loadVisibleColumns);
  const [settingsAnchor, setSettingsAnchor] = useState<null | HTMLElement>(
    null
  );
  const [boardRef, setBoardRef] = useState<HTMLDivElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Save to localStorage whenever visibleColumns changes
  useEffect(() => {
    try {
      const columnsArray = Array.from(visibleColumns);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(columnsArray));
    } catch (error) {
      console.warn("Failed to save column visibility to localStorage:", error);
    }
  }, [visibleColumns]);

  // Track horizontal scroll position for visual indicators
  useEffect(() => {
    if (!boardRef) return;

    const handleScroll = () => {
      const scrollLeft = boardRef.scrollLeft;
      setIsScrolled(scrollLeft > 10); // Show left shadow when scrolled right
    };

    boardRef.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => {
      boardRef.removeEventListener("scroll", handleScroll);
    };
  }, [boardRef]);

  // All available columns with comprehensive task data
  // Memoized to prevent recreation on every render
  const allColumns: Column[] = useMemo(
    () => [
      {
        id: "backlog",
        title: "Backlog",
        tasks: [
          {
            id: "b1",
            title: "Research new authentication methods",
            description:
              "Evaluate OAuth2, SAML, and JWT for enterprise customers",
            priority: "medium",
            assignees: ["AB", "CD"],
            labels: ["Research", "Security"],
          },
          {
            id: "b2",
            title: "Plan mobile app redesign",
            priority: "low",
            assignees: ["EF"],
            dueDate: "2024-02-01",
            labels: ["Planning", "Mobile"],
          },
          {
            id: "b3",
            title: "Investigate performance bottlenecks",
            description: "Profile application and identify slow queries",
            priority: "high",
            assignees: ["GH"],
            attachments: 2,
            labels: ["Performance", "Backend"],
          },
          {
            id: "b4",
            title: "Design new icon set",
            priority: "low",
            assignees: ["IJ"],
            labels: ["Design"],
          },
        ],
      },
      {
        id: "todo",
        title: "To Do",
        tasks: [
          {
            id: "t1",
            title: "Design new landing page",
            description:
              "Create wireframes and mockups for the new landing page",
            priority: "high",
            assignees: ["JD", "SM"],
            dueDate: "2024-01-15",
            attachments: 3,
            labels: ["Design", "Frontend"],
          },
          {
            id: "t2",
            title: "Set up CI/CD pipeline",
            description: "Configure GitHub Actions for automated testing",
            priority: "medium",
            assignees: ["AB"],
            labels: ["DevOps"],
          },
          {
            id: "t3",
            title: "Write API documentation",
            priority: "low",
            assignees: ["CD"],
            dueDate: "2024-01-20",
            labels: ["Documentation"],
          },
          {
            id: "t4",
            title: "Create user personas",
            description: "Develop detailed user personas for design team",
            priority: "medium",
            assignees: ["KL"],
            labels: ["Research", "UX"],
          },
        ],
      },
      {
        id: "in-progress",
        title: "In Progress",
        tasks: [
          {
            id: "i1",
            title: "Implement user authentication",
            description: "Add OAuth2 support and session management",
            priority: "high",
            assignees: ["EF", "GH"],
            dueDate: "2024-01-12",
            attachments: 2,
            labels: ["Backend", "Security"],
          },
          {
            id: "i2",
            title: "Optimize database queries",
            description: "Review and optimize slow queries in production",
            priority: "medium",
            assignees: ["IJ"],
            labels: ["Backend", "Performance"],
          },
          {
            id: "i3",
            title: "Create user onboarding flow",
            priority: "medium",
            assignees: ["KL"],
            attachments: 1,
            labels: ["UX", "Frontend"],
          },
          {
            id: "i4",
            title: "Build analytics dashboard",
            description: "Create real-time analytics visualization",
            priority: "high",
            assignees: ["MN", "OP"],
            dueDate: "2024-01-18",
            attachments: 4,
            labels: ["Frontend", "Analytics"],
          },
        ],
      },
      {
        id: "code-review",
        title: "Code Review",
        tasks: [
          {
            id: "cr1",
            title: "Review payment integration PR",
            description: "PR #1245 - Stripe payment gateway integration",
            priority: "high",
            assignees: ["QR", "ST"],
            dueDate: "2024-01-11",
            attachments: 1,
            labels: ["Backend", "Review"],
          },
          {
            id: "cr2",
            title: "Review UI component library",
            description: "PR #1248 - New button and input components",
            priority: "medium",
            assignees: ["UV"],
            labels: ["Frontend", "Review"],
          },
          {
            id: "cr3",
            title: "Review API rate limiting",
            priority: "medium",
            assignees: ["WX"],
            labels: ["Backend", "Review"],
          },
        ],
      },
      {
        id: "qa-testing",
        title: "QA Testing",
        tasks: [
          {
            id: "qa1",
            title: "Test checkout flow",
            description: "End-to-end testing of payment and checkout",
            priority: "high",
            assignees: ["YZ", "AA"],
            dueDate: "2024-01-13",
            attachments: 2,
            labels: ["QA", "Testing"],
          },
          {
            id: "qa2",
            title: "Test mobile responsiveness",
            description: "Verify all pages on mobile devices",
            priority: "medium",
            assignees: ["BB"],
            labels: ["QA", "Mobile"],
          },
          {
            id: "qa3",
            title: "Performance testing",
            description: "Load testing for high traffic scenarios",
            priority: "high",
            assignees: ["CC", "DD"],
            labels: ["QA", "Performance"],
          },
          {
            id: "qa4",
            title: "Accessibility audit",
            priority: "medium",
            assignees: ["EE"],
            labels: ["QA", "Accessibility"],
          },
        ],
      },
      {
        id: "blocked",
        title: "Blocked",
        tasks: [
          {
            id: "bl1",
            title: "Waiting for API access",
            description: "Need API keys from third-party service",
            priority: "high",
            assignees: ["FF"],
            labels: ["Blocked", "External"],
          },
          {
            id: "bl2",
            title: "Design approval pending",
            description: "Waiting for stakeholder sign-off",
            priority: "medium",
            assignees: ["GG"],
            labels: ["Blocked", "Design"],
          },
        ],
      },
      {
        id: "review",
        title: "Review",
        tasks: [
          {
            id: "r1",
            title: "Refactor payment module",
            description: "Code review for the refactored payment processing",
            priority: "high",
            assignees: ["MN", "OP"],
            dueDate: "2024-01-10",
            attachments: 5,
            labels: ["Backend", "Refactor"],
          },
          {
            id: "r2",
            title: "Update marketing copy",
            priority: "low",
            assignees: ["QR"],
            labels: ["Content"],
          },
          {
            id: "r3",
            title: "Review security audit findings",
            description: "Address security vulnerabilities",
            priority: "high",
            assignees: ["ST", "UV"],
            attachments: 3,
            labels: ["Security", "Review"],
          },
        ],
      },
      {
        id: "done",
        title: "Done",
        tasks: [
          {
            id: "d1",
            title: "Fix mobile responsive issues",
            description:
              "Resolved all responsive layout problems on mobile devices",
            priority: "medium",
            assignees: ["ST"],
            labels: ["Frontend", "Bug Fix"],
          },
          {
            id: "d2",
            title: "Deploy staging environment",
            priority: "high",
            assignees: ["UV"],
            labels: ["DevOps"],
          },
          {
            id: "d3",
            title: "Create user feedback survey",
            priority: "low",
            assignees: ["WX"],
            labels: ["Research"],
          },
          {
            id: "d4",
            title: "Implement dark mode",
            description: "Added dark theme support across all pages",
            priority: "medium",
            assignees: ["YZ"],
            labels: ["Frontend", "Feature"],
          },
          {
            id: "d5",
            title: "Set up error tracking",
            priority: "medium",
            assignees: ["AA"],
            labels: ["DevOps", "Monitoring"],
          },
        ],
      },
      {
        id: "archived",
        title: "Archived",
        tasks: [
          {
            id: "a1",
            title: "Legacy feature removal",
            description: "Removed deprecated features from codebase",
            priority: "low",
            assignees: ["BB"],
            labels: ["Cleanup"],
          },
          {
            id: "a2",
            title: "Old documentation cleanup",
            priority: "low",
            assignees: ["CC"],
            labels: ["Documentation"],
          },
        ],
      },
    ],
    []
  ); // Empty deps - allColumns is static data

  // Filter columns based on visibility
  const columns = useMemo(
    () => allColumns.filter((col) => visibleColumns.has(col.id)),
    [visibleColumns, allColumns]
  );

  // Validate and clean up visibleColumns on mount (in case columns were removed/renamed)
  // This runs after allColumns is defined
  useEffect(() => {
    const validColumnIds = new Set(allColumns.map((col) => col.id));
    const currentColumns = Array.from(visibleColumns);
    const hasInvalidColumns = currentColumns.some(
      (id) => !validColumnIds.has(id)
    );

    if (hasInvalidColumns) {
      // Filter out invalid column IDs
      const cleaned = new Set(
        currentColumns.filter((id) => validColumnIds.has(id))
      );
      // If no valid columns remain, use defaults
      if (cleaned.size === 0) {
        setVisibleColumns(new Set(DEFAULT_VISIBLE_COLUMNS));
      } else {
        setVisibleColumns(cleaned);
      }
    }
    // Only run once on mount - we check allColumns but don't want to re-run if it changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "default";
    }
  };

  const getPriorityLabel = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "High";
      case "medium":
        return "Medium";
      case "low":
        return "Low";
    }
  };

  // Toggle column visibility
  const toggleColumnVisibility = (columnId: string) => {
    setVisibleColumns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(columnId)) {
        newSet.delete(columnId);
      } else {
        newSet.add(columnId);
      }
      return newSet;
    });
  };

  // Show/hide all columns
  const showAllColumns = () => {
    setVisibleColumns(new Set(allColumns.map((col) => col.id)));
  };

  const hideAllColumns = () => {
    setVisibleColumns(new Set());
  };

  const handleSettingsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsAnchor(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsAnchor(null);
  };

  // Calculate total tasks across visible columns
  const totalTasks = useMemo(
    () => columns.reduce((sum, col) => sum + col.tasks.length, 0),
    [columns]
  );

  return (
    <AppFrame showAppHeader showNav navItems={defaultNavItems}>
      <div className={styles.container}>
        {/* Board Header */}
        <div className={styles.header}>
          <div>
            <Typography variant="h4" component="h1" className={styles.title}>
              Project Board
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {totalTasks} tasks across {columns.length} columns
            </Typography>
          </div>
          <div className={styles.headerActions}>
            <Tooltip title="Column Visibility Settings">
              <IconButton
                onClick={handleSettingsOpen}
                className={styles.settingsButton}
                size="small"
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={settingsAnchor}
              open={Boolean(settingsAnchor)}
              onClose={handleSettingsClose}
              PaperProps={{
                className: styles.settingsMenu,
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <div className={styles.settingsMenuHeader}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Column Visibility
                </Typography>
              </div>
              <Divider />
              <div className={styles.settingsMenuContent}>
                {allColumns.map((column) => (
                  <MenuItem
                    key={column.id}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleColumnVisibility(column.id);
                    }}
                    className={styles.settingsMenuItem}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={visibleColumns.has(column.id)}
                          size="small"
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleColumnVisibility(column.id);
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                      }
                      label={
                        <div className={styles.columnMenuItem}>
                          <Typography variant="body2">
                            {column.title}
                          </Typography>
                          <Chip
                            label={column.tasks.length}
                            size="small"
                            className={styles.columnMenuCount}
                          />
                        </div>
                      }
                    />
                  </MenuItem>
                ))}
              </div>
              <Divider />
              <div className={styles.settingsMenuActions}>
                <Button
                  size="small"
                  onClick={() => {
                    showAllColumns();
                    handleSettingsClose();
                  }}
                >
                  Show All
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    hideAllColumns();
                    handleSettingsClose();
                  }}
                >
                  Hide All
                </Button>
              </div>
            </Menu>
            <Button variant="contained" startIcon={<AddIcon />} size="medium">
              New Task
            </Button>
          </div>
        </div>

        {/* Kanban Board - Horizontal Scrolling */}
        {columns.length === 0 ? (
          <div className={styles.emptyState}>
            <VisibilityOffIcon className={styles.emptyStateIcon} />
            <Typography variant="h6" color="text.secondary">
              No columns visible
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Use the settings button to show columns
            </Typography>
            <Button
              variant="outlined"
              onClick={showAllColumns}
              startIcon={<VisibilityIcon />}
              className={styles.showAllButton}
            >
              Show All Columns
            </Button>
          </div>
        ) : (
          <div
            ref={setBoardRef}
            className={styles.board}
            data-scrolled={isScrolled}
          >
            {columns.map((column) => (
              <div key={column.id} className={styles.column}>
                {/* Column Header */}
                <div className={styles.columnHeader}>
                  <div className={styles.columnTitle}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {column.title}
                    </Typography>
                    <Chip
                      label={column.tasks.length}
                      size="small"
                      className={styles.countChip}
                    />
                  </div>
                  <Tooltip title="Column Options">
                    <IconButton size="small" className={styles.columnMenu}>
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </div>

                {/* Column Content - Scrollable */}
                <div className={styles.columnContent}>
                  {column.tasks.map((task) => (
                    <Paper
                      key={task.id}
                      className={styles.taskCard}
                      elevation={1}
                    >
                      {/* Task Header */}
                      <div className={styles.taskHeader}>
                        {task.labels && task.labels.length > 0 && (
                          <div className={styles.taskLabels}>
                            {task.labels.map((label, idx) => (
                              <Chip
                                key={idx}
                                label={label}
                                size="small"
                                className={styles.labelChip}
                              />
                            ))}
                          </div>
                        )}
                        <IconButton size="small" className={styles.taskMenu}>
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </div>

                      {/* Task Title */}
                      <Typography
                        variant="subtitle2"
                        component="h3"
                        className={styles.taskTitle}
                      >
                        {task.title}
                      </Typography>

                      {/* Task Description */}
                      {task.description && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          className={styles.taskDescription}
                        >
                          {task.description}
                        </Typography>
                      )}

                      {/* Task Footer */}
                      <div className={styles.taskFooter}>
                        <div className={styles.taskMeta}>
                          {task.priority && (
                            <Chip
                              icon={<FlagIcon />}
                              label={getPriorityLabel(task.priority)}
                              size="small"
                              color={getPriorityColor(task.priority)}
                              className={styles.priorityChip}
                            />
                          )}
                          {task.dueDate && (
                            <Chip
                              icon={<AccessTimeIcon />}
                              label={new Date(task.dueDate).toLocaleDateString(
                                "en-US",
                                { month: "short", day: "numeric" }
                              )}
                              size="small"
                              className={styles.dateChip}
                            />
                          )}
                          {task.attachments && task.attachments > 0 && (
                            <Chip
                              icon={<AttachFileIcon />}
                              label={task.attachments}
                              size="small"
                              className={styles.attachmentChip}
                            />
                          )}
                        </div>
                        {task.assignees && task.assignees.length > 0 && (
                          <AvatarGroup max={3} className={styles.assignees}>
                            {task.assignees.map((assignee, idx) => (
                              <Avatar
                                key={idx}
                                sx={{
                                  width: 24,
                                  height: 24,
                                  fontSize: "0.75rem",
                                  bgcolor: "primary.main",
                                }}
                              >
                                {assignee}
                              </Avatar>
                            ))}
                          </AvatarGroup>
                        )}
                      </div>
                    </Paper>
                  ))}

                  {/* Add Task Button */}
                  <Button
                    startIcon={<AddIcon />}
                    className={styles.addTaskButton}
                    fullWidth
                  >
                    Add Task
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppFrame>
  );
}
