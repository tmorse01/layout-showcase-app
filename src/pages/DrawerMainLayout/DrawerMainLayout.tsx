import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
  IconButton,
  Toolbar,
} from "@mui/material";
import { Menu as MenuIcon, ChevronLeft } from "@mui/icons-material";
import { AppFrame } from "../../components/AppFrame/AppFrame";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

const drawerWidth = 280;

export function DrawerMainLayout() {
  useDocumentTitle("Drawer + Main Layout - Layout Showcase");
  const [open, setOpen] = useState(true);

  return (
    <AppFrame showAppHeader showNav={false}>
      <Box sx={{ position: "relative", minHeight: "100%" }}>
        <Toolbar disableGutters sx={{ mb: 2 }}>
          <IconButton onClick={() => setOpen((prev) => !prev)}>
            {open ? <ChevronLeft /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" sx={{ ml: 1 }}>
            Drawer + Main Layout
          </Typography>
        </Toolbar>

        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          sx={{
            width: open ? drawerWidth : 0,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              position: "absolute",
              top: 64,
              height: "calc(100% - 64px)",
              boxSizing: "border-box",
              borderRight: "1px solid",
              borderColor: "divider",
            },
          }}
        >
          <List>
            {["Overview", "Orders", "Customers", "Catalog", "Settings"].map(
              (item) => (
                <ListItemButton key={item} selected={item === "Overview"}>
                  <ListItemText primary={item} />
                </ListItemButton>
              )
            )}
          </List>
        </Drawer>

        <Box
          sx={{
            ml: open ? `${drawerWidth + 24}px` : 0,
            transition: "margin 200ms ease",
          }}
        >
          <Paper sx={{ p: 3, border: "1px solid", borderColor: "divider" }}>
            <Typography variant="h5" gutterBottom>
              Main Content Area
            </Typography>
            <Typography color="text.secondary">
              This layout uses a persistent Material Design drawer for navigation
              and a dedicated main content region that expands when the drawer is
              collapsed.
            </Typography>
          </Paper>
        </Box>
      </Box>
    </AppFrame>
  );
}
