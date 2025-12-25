import { useState } from "react";
import { AppFrame } from "../../components/AppFrame/AppFrame";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Chip,
  Box,
  Avatar,
  Button,
  IconButton,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  Business,
  CalendarToday,
  Star,
  Edit,
  Delete,
  MoreVert,
} from "@mui/icons-material";
import { defaultNavItems } from "../../config/sidebarData";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import styles from "./MasterDetail.module.css";

// Sample data for master list
interface Contact {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  status: "active" | "inactive" | "pending";
  lastContact: string;
  avatar?: string;
}

const contacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Product Manager",
    company: "TechCorp Inc.",
    status: "active",
    lastContact: "2 days ago",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    role: "Software Engineer",
    company: "DevSolutions",
    status: "active",
    lastContact: "1 week ago",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    role: "Design Lead",
    company: "Creative Studio",
    status: "pending",
    lastContact: "3 days ago",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@example.com",
    role: "Marketing Director",
    company: "Growth Labs",
    status: "active",
    lastContact: "5 days ago",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    role: "Sales Manager",
    company: "SalesForce Pro",
    status: "inactive",
    lastContact: "2 weeks ago",
  },
  {
    id: "6",
    name: "James Wilson",
    email: "james.wilson@example.com",
    role: "CTO",
    company: "InnovateTech",
    status: "active",
    lastContact: "1 day ago",
  },
  {
    id: "7",
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    role: "Operations Manager",
    company: "Global Systems",
    status: "active",
    lastContact: "4 days ago",
  },
];

const getStatusColor = (
  status: Contact["status"]
): "success" | "warning" | "default" => {
  switch (status) {
    case "active":
      return "success";
    case "pending":
      return "warning";
    default:
      return "default";
  }
};

export function MasterDetail() {
  useDocumentTitle("Master–Detail - Layout Showcase");
  const [selectedId, setSelectedId] = useState<string | null>(
    contacts[0]?.id || null
  );

  const selectedContact = contacts.find((c) => c.id === selectedId) || null;

  return (
    <AppFrame showAppHeader showNav navItems={defaultNavItems}>
      <div className={styles.container}>
        {/* Master List - Left Panel */}
        <Paper className={styles.masterPanel} elevation={1}>
          <div className={styles.masterHeader}>
            <Typography variant="h6" component="h2">
              Contacts
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {contacts.length} total
            </Typography>
          </div>
          <Divider />
          <List className={styles.masterList} disablePadding>
            {contacts.map((contact) => (
              <ListItem key={contact.id} disablePadding>
                <ListItemButton
                  selected={selectedId === contact.id}
                  onClick={() => setSelectedId(contact.id)}
                  className={styles.listItem}
                >
                  <Avatar className={styles.avatar}>
                    {contact.name.charAt(0)}
                  </Avatar>
                  <ListItemText
                    primary={
                      <Box className={styles.listItemPrimary}>
                        <Typography variant="body2" fontWeight={500}>
                          {contact.name}
                        </Typography>
                        <Chip
                          label={contact.status}
                          size="small"
                          color={getStatusColor(contact.status)}
                          className={styles.statusChip}
                        />
                      </Box>
                    }
                    secondary={
                      <Box className={styles.listItemSecondary}>
                        <Typography variant="caption" color="text.secondary">
                          {contact.role} • {contact.company}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {contact.lastContact}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Detail Panel - Right Panel */}
        <Paper className={styles.detailPanel} elevation={1}>
          {selectedContact ? (
            <>
              <div className={styles.detailHeader}>
                <Box className={styles.detailTitle}>
                  <Avatar className={styles.detailAvatar}>
                    {selectedContact.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" component="h1">
                      {selectedContact.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedContact.role} at {selectedContact.company}
                    </Typography>
                  </Box>
                </Box>
                <Box className={styles.detailActions}>
                  <Chip
                    label={selectedContact.status}
                    size="small"
                    color={getStatusColor(selectedContact.status)}
                  />
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Box>
              </div>
              <Divider />

              <div className={styles.detailContent}>
                {/* Contact Information */}
                <section className={styles.detailSection}>
                  <Typography
                    variant="subtitle2"
                    className={styles.sectionTitle}
                  >
                    Contact Information
                  </Typography>
                  <Box className={styles.infoList}>
                    <Box className={styles.infoItem}>
                      <Email className={styles.infoIcon} />
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Email
                        </Typography>
                        <Typography variant="body2">
                          {selectedContact.email}
                        </Typography>
                      </Box>
                    </Box>
                    <Box className={styles.infoItem}>
                      <Phone className={styles.infoIcon} />
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Phone
                        </Typography>
                        <Typography variant="body2">
                          +1 (555) 123-4567
                        </Typography>
                      </Box>
                    </Box>
                    <Box className={styles.infoItem}>
                      <LocationOn className={styles.infoIcon} />
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Location
                        </Typography>
                        <Typography variant="body2">
                          San Francisco, CA
                        </Typography>
                      </Box>
                    </Box>
                    <Box className={styles.infoItem}>
                      <Business className={styles.infoIcon} />
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Company
                        </Typography>
                        <Typography variant="body2">
                          {selectedContact.company}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </section>

                <Divider />

                {/* Activity Timeline */}
                <section className={styles.detailSection}>
                  <Typography
                    variant="subtitle2"
                    className={styles.sectionTitle}
                  >
                    Recent Activity
                  </Typography>
                  <Box className={styles.activityList}>
                    <Box className={styles.activityItem}>
                      <CalendarToday className={styles.activityIcon} />
                      <Box className={styles.activityContent}>
                        <Typography variant="body2" fontWeight={500}>
                          Last contacted
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {selectedContact.lastContact}
                        </Typography>
                      </Box>
                    </Box>
                    <Box className={styles.activityItem}>
                      <Email className={styles.activityIcon} />
                      <Box className={styles.activityContent}>
                        <Typography variant="body2" fontWeight={500}>
                          Email sent
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          1 week ago
                        </Typography>
                      </Box>
                    </Box>
                    <Box className={styles.activityItem}>
                      <Star className={styles.activityIcon} />
                      <Box className={styles.activityContent}>
                        <Typography variant="body2" fontWeight={500}>
                          Added to favorites
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          2 weeks ago
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </section>

                <Divider />

                {/* Action Buttons */}
                <Box className={styles.actionButtons}>
                  <Button
                    variant="contained"
                    startIcon={<Edit />}
                    size="medium"
                  >
                    Edit Contact
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Delete />}
                    size="medium"
                    color="error"
                  >
                    Delete
                  </Button>
                </Box>
              </div>
            </>
          ) : (
            <Box className={styles.emptyState}>
              <Typography variant="h6" color="text.secondary">
                Select a contact to view details
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click on any contact in the list to see their information
              </Typography>
            </Box>
          )}
        </Paper>
      </div>
    </AppFrame>
  );
}
