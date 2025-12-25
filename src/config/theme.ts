import { createTheme } from "@mui/material/styles";

/**
 * MUI theme configuration
 * Creates a theme with both light and dark color schemes
 */

export const createAppTheme = (mode: "light" | "dark") => {
  return createTheme({
    palette: {
      mode,
    },
    cssVariables: true, // Enable CSS variables for theme colors
  });
};
