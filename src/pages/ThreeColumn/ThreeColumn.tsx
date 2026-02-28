import { useState } from "react";
import { AppFrame } from "../../components/AppFrame/AppFrame";
import {
  Box,
  Chip,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { defaultNavGroups } from "../../config/sidebarData";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import styles from "./ThreeColumn.module.css";

const segments = ["Enterprise", "Mid-Market", "SMB", "Trials"];

const rows: Record<string, Array<{ account: string; arr: string; health: string }>> = {
  Enterprise: [
    { account: "Northstar Bank", arr: "$220k", health: "Healthy" },
    { account: "Atlas Logistics", arr: "$180k", health: "At Risk" },
    { account: "Vantage Health", arr: "$150k", health: "Healthy" },
  ],
  "Mid-Market": [
    { account: "Blue Ridge Media", arr: "$96k", health: "Healthy" },
    { account: "Acorn Retail", arr: "$88k", health: "Watch" },
    { account: "Pioneer Foods", arr: "$73k", health: "Healthy" },
  ],
  SMB: [
    { account: "Bright Studio", arr: "$24k", health: "Healthy" },
    { account: "Elm Works", arr: "$19k", health: "Watch" },
    { account: "Driftline", arr: "$15k", health: "At Risk" },
  ],
  Trials: [
    { account: "Quartz AI", arr: "$0", health: "Trial" },
    { account: "Pilot Labs", arr: "$0", health: "Trial" },
    { account: "Orbit Team", arr: "$0", health: "Trial" },
  ],
};

const alerts = [
  "Atlas Logistics usage dropped 14% this week",
  "Driftline renewal due in 5 days",
  "Acorn Retail sent support escalation",
];

const customers = ["Northstar Bank", "Blue Ridge Media", "Vantage Health", "Bright Studio"];

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
        </Paper>

        <Paper className={styles.mainColumn} elevation={1}>
          <Box className={styles.mainHeader}>
            <Typography variant="h6">{activeSegment} KPI Table</Typography>
            <Chip label={`${rows[activeSegment].length} accounts`} size="small" />
          </Box>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Account</TableCell>
                <TableCell>ARR</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows[activeSegment].map((row) => (
                <TableRow key={row.account}>
                  <TableCell>{row.account}</TableCell>
                  <TableCell>{row.arr}</TableCell>
                  <TableCell>{row.health}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Paper className={styles.rightColumn} elevation={1}>
          <Typography variant="subtitle1" gutterBottom>
            Live Alerts
          </Typography>
          <List dense>
            {alerts.map((alert) => (
              <ListItemText key={alert} primary={alert} className={styles.alertItem} />
            ))}
          </List>
          <Typography variant="subtitle1" gutterBottom>
            Priority Customers
          </Typography>
          <List dense>
            {customers.map((customer) => (
              <ListItemText key={customer} primary={customer} />
            ))}
          </List>
        </Paper>
      </div>
    </AppFrame>
  );
}
