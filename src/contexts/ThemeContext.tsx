import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { createAppTheme } from "../config/theme";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }
  return context;
}

interface ThemeContextProviderProps {
  children: ReactNode;
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Get saved preference from localStorage, default to light
    const saved = localStorage.getItem("mui-color-scheme");
    const initialMode = (saved === "dark" ? "dark" : "light") as ThemeMode;
    console.log(
      "[ThemeContext] Initial mode:",
      initialMode,
      "from localStorage:",
      saved
    );
    return initialMode;
  });

  // Create theme based on current mode
  const theme = useMemo(() => {
    console.log("[ThemeContext] Creating theme with mode:", mode);
    return createAppTheme(mode);
  }, [mode]);

  useEffect(() => {
    // Save preference to localStorage (MUI's default key)
    localStorage.setItem("mui-color-scheme", mode);
    // Update the data attribute that MUI uses
    document.documentElement.setAttribute("data-mui-color-scheme", mode);
    console.log("[ThemeContext] Mode changed to:", mode);
  }, [mode]);

  const toggleMode = () => {
    console.log("[ThemeContext] Toggle called, current mode:", mode);
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      console.log("[ThemeContext] Toggling from", prev, "to", newMode);
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <InitColorSchemeScript defaultMode="light" />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
