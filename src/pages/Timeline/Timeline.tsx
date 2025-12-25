import { AppFrame } from "../../components/AppFrame/AppFrame";
import { defaultNavItems } from "../../config/sidebarData";
import {
  Paper,
  Typography,
  Chip,
  Avatar,
  Box,
  Divider,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FileUpload as FileUploadIcon,
  Comment as CommentIcon,
  Assignment as AssignmentIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import styles from "./Timeline.module.css";

/**
 * Timeline / Activity Layout
 *
 * Demonstrates a vertical timeline layout for chronological events, activity feeds,
 * and workflow visualization. Events are grouped by date and displayed in
 * chronological order with visual timeline indicators.
 *
 * Header Pattern: app-only
 * - App header: Global navigation (64px)
 * - No page header: Timeline content is the focus
 */

// Event types for different activity categories
type EventType =
  | "created"
  | "updated"
  | "deleted"
  | "commented"
  | "assigned"
  | "completed"
  | "uploaded"
  | "settings"
  | "security";

interface TimelineEvent {
  id: string;
  type: EventType;
  title: string;
  description: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  timestamp: string;
  date: string; // For grouping
  metadata?: {
    entity?: string;
    entityType?: string;
    changes?: string[];
  };
}

// Sample timeline events grouped by date
const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    type: "completed",
    title: "Project milestone completed",
    description: "Q1 Dashboard project has been completed and deployed to production",
    user: {
      name: "Sarah Chen",
      initials: "SC",
    },
    timestamp: "2:45 PM",
    date: "Today",
    metadata: {
      entity: "Q1 Dashboard",
      entityType: "Project",
    },
  },
  {
    id: "2",
    type: "commented",
    title: "Added comment on design review",
    description: "The new color scheme looks great. Can we also update the spacing?",
    user: {
      name: "Michael Rodriguez",
      initials: "MR",
    },
    timestamp: "1:30 PM",
    date: "Today",
    metadata: {
      entity: "Design Review #42",
      entityType: "Review",
    },
  },
  {
    id: "3",
    type: "uploaded",
    title: "Uploaded new assets",
    description: "Uploaded 12 new icon files to the design system library",
    user: {
      name: "Emily Watson",
      initials: "EW",
    },
    timestamp: "11:15 AM",
    date: "Today",
    metadata: {
      entity: "Design System",
      entityType: "Library",
      changes: ["12 new icons"],
    },
  },
  {
    id: "4",
    type: "assigned",
    title: "Task assigned",
    description: "Assigned 'Implement user authentication' to Alex Thompson",
    user: {
      name: "David Kim",
      initials: "DK",
    },
    timestamp: "10:00 AM",
    date: "Today",
    metadata: {
      entity: "Implement user authentication",
      entityType: "Task",
    },
  },
  {
    id: "5",
    type: "updated",
    title: "Updated project settings",
    description: "Changed project visibility from private to public",
    user: {
      name: "Lisa Anderson",
      initials: "LA",
    },
    timestamp: "9:20 AM",
    date: "Today",
    metadata: {
      entity: "Website Redesign",
      entityType: "Project",
      changes: ["Visibility: private → public"],
    },
  },
  {
    id: "6",
    type: "created",
    title: "Created new project",
    description: "Created new project 'Mobile App Launch' with initial setup",
    user: {
      name: "James Wilson",
      initials: "JW",
    },
    timestamp: "4:30 PM",
    date: "Yesterday",
    metadata: {
      entity: "Mobile App Launch",
      entityType: "Project",
    },
  },
  {
    id: "7",
    type: "security",
    title: "Security settings updated",
    description: "Two-factor authentication enabled for organization",
    user: {
      name: "Admin",
      initials: "AD",
    },
    timestamp: "3:15 PM",
    date: "Yesterday",
    metadata: {
      entity: "Organization Settings",
      entityType: "Security",
    },
  },
  {
    id: "8",
    type: "deleted",
    title: "Removed outdated document",
    description: "Deleted 'Old API Documentation v1.0' as it's been superseded",
    user: {
      name: "Rachel Green",
      initials: "RG",
    },
    timestamp: "2:00 PM",
    date: "Yesterday",
    metadata: {
      entity: "Old API Documentation v1.0",
      entityType: "Document",
    },
  },
  {
    id: "9",
    type: "commented",
    title: "Commented on code review",
    description: "Great refactoring! Consider extracting this logic into a utility function.",
    user: {
      name: "Tom Brown",
      initials: "TB",
    },
    timestamp: "1:45 PM",
    date: "Yesterday",
    metadata: {
      entity: "PR #234",
      entityType: "Pull Request",
    },
  },
  {
    id: "10",
    type: "completed",
    title: "Task completed",
    description: "Completed 'Setup CI/CD pipeline' ahead of schedule",
    user: {
      name: "Alex Thompson",
      initials: "AT",
    },
    timestamp: "11:00 AM",
    date: "Yesterday",
    metadata: {
      entity: "Setup CI/CD pipeline",
      entityType: "Task",
    },
  },
  {
    id: "11",
    type: "updated",
    title: "Updated user profile",
    description: "Updated profile information and added new profile picture",
    user: {
      name: "Maria Garcia",
      initials: "MG",
    },
    timestamp: "5:20 PM",
    date: "2 days ago",
    metadata: {
      entity: "User Profile",
      entityType: "Profile",
      changes: ["Profile picture", "Bio"],
    },
  },
  {
    id: "12",
    type: "created",
    title: "Created new team",
    description: "Created 'Frontend Team' with 5 members",
    user: {
      name: "Chris Lee",
      initials: "CL",
    },
    timestamp: "3:00 PM",
    date: "2 days ago",
    metadata: {
      entity: "Frontend Team",
      entityType: "Team",
    },
  },
];

// Get icon and color for event type
function getEventIcon(type: EventType) {
  switch (type) {
    case "created":
      return <CheckCircleIcon />;
    case "updated":
      return <EditIcon />;
    case "deleted":
      return <DeleteIcon />;
    case "commented":
      return <CommentIcon />;
    case "assigned":
      return <AssignmentIcon />;
    case "completed":
      return <CheckCircleIcon />;
    case "uploaded":
      return <FileUploadIcon />;
    case "settings":
      return <SettingsIcon />;
    case "security":
      return <SecurityIcon />;
    default:
      return <ScheduleIcon />;
  }
}

function getEventColor(type: EventType): "success" | "info" | "warning" | "error" | "default" {
  switch (type) {
    case "created":
    case "completed":
      return "success";
    case "updated":
    case "uploaded":
      return "info";
    case "commented":
    case "assigned":
      return "default";
    case "settings":
    case "security":
      return "warning";
    case "deleted":
      return "error";
    default:
      return "default";
  }
}

// Group events by date
function groupEventsByDate(events: TimelineEvent[]): Map<string, TimelineEvent[]> {
  const grouped = new Map<string, TimelineEvent[]>();
  events.forEach((event) => {
    const date = event.date;
    if (!grouped.has(date)) {
      grouped.set(date, []);
    }
    grouped.get(date)!.push(event);
  });
  return grouped;
}

export function Timeline() {
  useDocumentTitle("Timeline / Activity Layout - Layout Showcase");
  const groupedEvents = groupEventsByDate(timelineEvents);
  const sortedDates = Array.from(groupedEvents.keys());

  return (
    <AppFrame showAppHeader showNav navItems={defaultNavItems}>
      <div className={styles.container}>
        {/* Page Title */}
        <div className={styles.header}>
          <Typography variant="h4" component="h1" fontWeight={600}>
            Activity Timeline
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Recent activity and events across your workspace
          </Typography>
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          {sortedDates.map((date, dateIndex) => {
            const events = groupedEvents.get(date)!;
            const isLastDate = dateIndex === sortedDates.length - 1;

            return (
              <div key={date} className={styles.dateGroup}>
                {/* Date Header */}
                <div className={styles.dateHeader}>
                  <Typography variant="h6" component="h2" fontWeight={600}>
                    {date}
                  </Typography>
                  <Divider className={styles.dateDivider} />
                </div>

                {/* Events for this date */}
                <div className={styles.events}>
                  {events.map((event, eventIndex) => {
                    const isLastEvent = eventIndex === events.length - 1 && isLastDate;
                    const eventColor = getEventColor(event.type);
                    const EventIcon = getEventIcon(event.type);

                    return (
                      <div key={event.id} className={styles.event}>
                        {/* Timeline Line */}
                        <div className={styles.timelineLine}>
                          <div className={styles.timelineDot}>
                            <Chip
                              icon={EventIcon}
                              label=""
                              size="small"
                              color={eventColor}
                              className={styles.eventChip}
                            />
                          </div>
                          {!isLastEvent && <div className={styles.timelineConnector} />}
                        </div>

                        {/* Event Content */}
                        <Paper elevation={0} className={styles.eventContent}>
                          <div className={styles.eventHeader}>
                            <div className={styles.eventUser}>
                              <Avatar className={styles.avatar}>
                                {event.user.initials}
                              </Avatar>
                              <div className={styles.eventInfo}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                  {event.user.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {event.timestamp}
                                </Typography>
                              </div>
                            </div>
                            <Chip
                              label={event.type}
                              size="small"
                              color={eventColor}
                              variant="outlined"
                            />
                          </div>

                          <Typography variant="body1" fontWeight={500} className={styles.eventTitle}>
                            {event.title}
                          </Typography>

                          <Typography variant="body2" color="text.secondary" className={styles.eventDescription}>
                            {event.description}
                          </Typography>

                          {event.metadata && (
                            <div className={styles.eventMetadata}>
                              {event.metadata.entity && (
                                <Chip
                                  label={event.metadata.entity}
                                  size="small"
                                  variant="outlined"
                                  className={styles.metadataChip}
                                />
                              )}
                              {event.metadata.changes && event.metadata.changes.length > 0 && (
                                <Box className={styles.changes}>
                                  {event.metadata.changes.map((change, idx) => (
                                    <Chip
                                      key={idx}
                                      label={change}
                                      size="small"
                                      className={styles.changeChip}
                                    />
                                  ))}
                                </Box>
                              )}
                            </div>
                          )}
                        </Paper>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppFrame>
  );
}
