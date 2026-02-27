import {
  Box,
  Breadcrumbs,
  Chip,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import { AppFrame } from "../../components/AppFrame/AppFrame";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { defaultNavGroups } from "../../config/sidebarData";

export function BreadcrumbNavigationLayout() {
  useDocumentTitle("Breadcrumb Navigation Layout - Layout Showcase");

  return (
    <AppFrame showAppHeader showNav navGroups={defaultNavGroups}>
      <Stack spacing={2}>
        <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
          <Link underline="hover" color="inherit" href="#">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="#">
            Projects
          </Link>
          <Link underline="hover" color="inherit" href="#">
            Alpha Platform
          </Link>
          <Typography color="text.primary">Deployment Settings</Typography>
        </Breadcrumbs>

        <Paper sx={{ p: 3, border: "1px solid", borderColor: "divider" }}>
          <Typography variant="h5" gutterBottom>
            Breadcrumb Navigation Layout
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Use breadcrumbs to show hierarchical context while allowing users to
            jump back to parent sections.
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Chip label="Workspace" size="small" />
            <Chip label="Project" size="small" />
            <Chip label="Environment" size="small" />
            <Chip label="Configuration" size="small" color="primary" />
          </Box>
        </Paper>
      </Stack>
    </AppFrame>
  );
}
