import { Box, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { AppFrame } from "../../components/AppFrame/AppFrame";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { defaultNavGroups } from "../../config/sidebarData";

export function ThreeColumnLayout() {
  useDocumentTitle("3-Column Layout - Layout Showcase");

  return (
    <AppFrame
      showAppHeader
      showNav
      showRightRail
      navGroups={defaultNavGroups}
      rightRailWidth={320}
      rightRailContent={
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Analytics Panel
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Conversion Rate" secondary="5.8%" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Active Users" secondary="12,480" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Revenue (MTD)" secondary="$84,320" />
            </ListItem>
          </List>
        </Box>
      }
    >
      <Paper sx={{ p: 3, border: "1px solid", borderColor: "divider" }}>
        <Typography variant="h5" gutterBottom>
          3-Column Layout
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          This pattern combines a left sidebar for navigation, a central work
          area, and a right analytics panel for live metrics.
        </Typography>
        <Typography variant="body2">
          Central content remains the primary focus while analytics stay visible
          for decision-making workflows.
        </Typography>
      </Paper>
    </AppFrame>
  );
}
