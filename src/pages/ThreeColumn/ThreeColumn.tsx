import { useState } from "react";
import { AppFrame } from "../../components/AppFrame/AppFrame";
import {
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Flag, Person, WarningAmber } from "@mui/icons-material";
import { defaultNavGroups } from "../../config/sidebarData";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import styles from "./ThreeColumn.module.css";

const segments = ["Enterprise", "Mid-Market", "SMB", "Trials"];

const rows: Record<
  string,
  Array<{ account: string; arr: string; health: string; csOwner: string; renewal: string }>
> = {
  Enterprise: [
    { account: "Northstar Bank", arr: "$220k", health: "Healthy", csOwner: "A. Cole", renewal: "Jun 18" },
    { account: "Atlas Logistics", arr: "$180k", health: "At Risk", csOwner: "N. Diaz", renewal: "May 02" },
    { account: "Vantage Health", arr: "$150k", health: "Healthy", csOwner: "S. Ray", renewal: "Aug 14" },
    { account: "Pioneer Insurance", arr: "$132k", health: "Watch", csOwner: "M. Lee", renewal: "Apr 26" },
    { account: "Harbor Energy", arr: "$118k", health: "Healthy", csOwner: "T. Reed", renewal: "Jul 07" },
  ],
  "Mid-Market": [
    { account: "Blue Ridge Media", arr: "$96k", health: "Healthy", csOwner: "H. Tran", renewal: "Jun 01" },
    { account: "Acorn Retail", arr: "$88k", health: "Watch", csOwner: "R. Young", renewal: "Apr 12" },
    { account: "Pioneer Foods", arr: "$73k", health: "Healthy", csOwner: "K. Moss", renewal: "May 24" },
    { account: "Echo Labs", arr: "$62k", health: "Watch", csOwner: "P. Singh", renewal: "May 16" },
    { account: "Saffron Ops", arr: "$55k", health: "Healthy", csOwner: "C. Park", renewal: "Jul 20" },
  ],
  SMB: [
    { account: "Bright Studio", arr: "$24k", health: "Healthy", csOwner: "I. Cruz", renewal: "Mar 31" },
    { account: "Elm Works", arr: "$19k", health: "Watch", csOwner: "D. Fox", renewal: "Apr 09" },
    { account: "Driftline", arr: "$15k", health: "At Risk", csOwner: "I. Cruz", renewal: "Mar 29" },
    { account: "Willow Apps", arr: "$13k", health: "Healthy", csOwner: "D. Fox", renewal: "May 18" },
    { account: "Orbit Team", arr: "$11k", health: "Watch", csOwner: "D. Fox", renewal: "May 28" },
  ],
  Trials: [
    { account: "Quartz AI", arr: "$0", health: "Trial", csOwner: "J. Bell", renewal: "Trial Day 9" },
    { account: "Pilot Labs", arr: "$0", health: "Trial", csOwner: "J. Bell", renewal: "Trial Day 6" },
    { account: "Nimbus Studio", arr: "$0", health: "Trial", csOwner: "L. Hart", renewal: "Trial Day 11" },
    { account: "Trackline", arr: "$0", health: "Trial", csOwner: "L. Hart", renewal: "Trial Day 13" },
    { account: "Parcel Mind", arr: "$0", health: "Trial", csOwner: "J. Bell", renewal: "Trial Day 4" },
  ],
};

const segmentSummary: Record<string, { pipeline: string; risk: string; expansion: string }> = {
  Enterprise: { pipeline: "$1.2M", risk: "2 accounts", expansion: "$410k" },
  "Mid-Market": { pipeline: "$740k", risk: "3 accounts", expansion: "$250k" },
  SMB: { pipeline: "$330k", risk: "4 accounts", expansion: "$92k" },
  Trials: { pipeline: "$190k", risk: "N/A", expansion: "$0" },
};

const alerts: Record<string, string[]> = {
  Enterprise: [
    "Atlas Logistics usage dropped 14% this week.",
    "Pioneer Insurance requested executive business review.",
    "Northstar legal redlines pending for renewal terms.",
  ],
  "Mid-Market": [
    "Acorn Retail sent support escalation.",
    "Echo Labs expansion call rescheduled to Friday.",
    "Saffron Ops reached 92% seat utilization.",
  ],
  SMB: [
    "Driftline renewal due in 5 days.",
    "Elm Works has 3 unresolved onboarding tasks.",
    "Orbit Team marked integration setup complete.",
  ],
  Trials: [
    "Pilot Labs trial champion invited additional teammates.",
    "Parcel Mind requested pricing estimate.",
    "Nimbus Studio reached activation milestone 2/3.",
  ],
};

const customers: Record<string, string[]> = {
  Enterprise: ["Northstar Bank", "Vantage Health", "Harbor Energy"],
  "Mid-Market": ["Blue Ridge Media", "Acorn Retail", "Pioneer Foods"],
  SMB: ["Bright Studio", "Elm Works", "Willow Apps"],
  Trials: ["Quartz AI", "Pilot Labs", "Nimbus Studio"],
};

const notes: Record<string, string[]> = {
  Enterprise: ["Northstar expansion package pending signature.", "Atlas account plan updated after exec call."],
  "Mid-Market": ["Acorn escalation ownership moved to pod B.", "Echo Labs usage trend improving for week-over-week."],
  SMB: ["Driftline save plan shared with support lead.", "Willow Apps completed all onboarding milestones."],
  Trials: ["Parcel Mind requested sandbox extension.", "Quartz AI passed initial integration checklist."],
};

export function ThreeColumn() {
  useDocumentTitle("3-Column Layout - Layout Showcase");
  const [activeSegment, setActiveSegment] = useState(segments[0]);

  return (
    <AppFrame showAppHeader showNav navGroups={defaultNavGroups}>
      <div className={styles.layout}>
        <Paper className={styles.leftColumn} elevation={1}>
          <Typography variant="subtitle1" gutterBottom>
            Segments
          </Typography>
          <List disablePadding>
            {segments.map((segment) => (
              <ListItemButton
                key={segment}
                selected={segment === activeSegment}
                onClick={() => setActiveSegment(segment)}
              >
                <ListItemText primary={segment} />
              </ListItemButton>
            ))}
          </List>
          <Divider sx={{ my: 1.5 }} />
          <Typography variant="subtitle2" gutterBottom>
            Segment Playbook
          </Typography>
          <List dense>
            <ListItem disablePadding>
              <ListItemIcon sx={{ minWidth: 28 }}>
                <Flag fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText primary="Prep weekly business review" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon sx={{ minWidth: 28 }}>
                <Person fontSize="small" color="action" />
              </ListItemIcon>
              <ListItemText primary="Assign owners for top risks" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon sx={{ minWidth: 28 }}>
                <WarningAmber fontSize="small" color="warning" />
              </ListItemIcon>
              <ListItemText primary="Escalate blockers in success standup" />
            </ListItem>
          </List>
        </Paper>

        <Paper className={styles.mainColumn} elevation={1}>
          <Box className={styles.mainHeader}>
            <Typography variant="h6">{activeSegment} KPI Table</Typography>
            <Chip label={`${rows[activeSegment].length} accounts`} size="small" />
          </Box>
          <Box className={styles.summaryGrid}>
            <Paper variant="outlined" className={styles.summaryCard}>
              <Typography variant="caption" color="text.secondary">
                Pipeline
              </Typography>
              <Typography variant="h6">{segmentSummary[activeSegment].pipeline}</Typography>
            </Paper>
            <Paper variant="outlined" className={styles.summaryCard}>
              <Typography variant="caption" color="text.secondary">
                Accounts at Risk
              </Typography>
              <Typography variant="h6">{segmentSummary[activeSegment].risk}</Typography>
            </Paper>
            <Paper variant="outlined" className={styles.summaryCard}>
              <Typography variant="caption" color="text.secondary">
                Expansion Potential
              </Typography>
              <Typography variant="h6">{segmentSummary[activeSegment].expansion}</Typography>
            </Paper>
          </Box>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Account</TableCell>
                <TableCell>ARR</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>CS Owner</TableCell>
                <TableCell>Next Renewal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows[activeSegment].map((row) => (
                <TableRow key={row.account}>
                  <TableCell>{row.account}</TableCell>
                  <TableCell>{row.arr}</TableCell>
                  <TableCell>{row.health}</TableCell>
                  <TableCell>{row.csOwner}</TableCell>
                  <TableCell>{row.renewal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Divider sx={{ my: 1.5 }} />
          <Typography variant="subtitle2" gutterBottom>
            Segment Notes
          </Typography>
          <List dense>
            {notes[activeSegment].map((note) => (
              <ListItemText key={note} primary={note} />
            ))}
          </List>
        </Paper>

        <Paper className={styles.rightColumn} elevation={1}>
          <Typography variant="subtitle1" gutterBottom>
            Live Alerts
          </Typography>
          <List dense>
            {alerts[activeSegment].map((alert) => (
              <ListItemText key={alert} primary={alert} className={styles.alertItem} />
            ))}
          </List>
          <Typography variant="subtitle1" gutterBottom>
            Priority Customers
          </Typography>
          <List dense>
            {customers[activeSegment].map((customer) => (
              <ListItemText key={customer} primary={customer} />
            ))}
          </List>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1" gutterBottom>
            Next Actions
          </Typography>
          <List dense>
            <ListItemText primary="Review adoption trend anomalies" />
            <ListItemText primary="Confirm owner assignments by EOD" />
            <ListItemText primary="Prepare renewal risk summary" />
          </List>
        </Paper>
      </div>
    </AppFrame>
  );
}
