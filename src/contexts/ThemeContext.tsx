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

type ThemeMode = "device" | "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  resolvedMode: "light" | "dark"; // The actual mode being used (device resolves to system preference)
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void; // Kept for backward compatibility
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

// Helper function to get system preference
const getSystemPreference = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    // Get saved preference from localStorage, default to device
    const saved = localStorage.getItem("mui-color-scheme");
    if (saved === "light" || saved === "dark" || saved === "device") {
      return saved as ThemeMode;
    }
    return "device";
  });

  // Track system preference to trigger updates when it changes
  const [systemPreference, setSystemPreference] = useState<"light" | "dark">(
    getSystemPreference
  );

  // Resolved mode: if mode is "device", use system preference, otherwise use mode
  const resolvedMode = useMemo(() => {
    if (mode === "device") {
      return systemPreference;
    }
    return mode;
  }, [mode, systemPreference]);

  // Listen to system preference changes when in device mode
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const newPreference = getSystemPreference();
      setSystemPreference(newPreference);
      // Update the data attribute immediately
      if (mode === "device") {
        document.documentElement.setAttribute(
          "data-mui-color-scheme",
          newPreference
        );
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [mode]);

  // Create theme based on resolved mode
  const theme = useMemo(() => {
    console.log(
      "[ThemeContext] Creating theme with mode:",
      mode,
      "resolved to:",
      resolvedMode
    );
    return createAppTheme(resolvedMode);
  }, [mode, resolvedMode]);

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem("mui-color-scheme", mode);
    // Update the data attribute that MUI uses (use resolved mode)
    document.documentElement.setAttribute(
      "data-mui-color-scheme",
      resolvedMode
    );
    console.log("[ThemeContext] Mode changed to:", mode, "resolved:", resolvedMode);
  }, [mode, resolvedMode]);

  const setMode = (newMode: ThemeMode) => {
    console.log("[ThemeContext] Setting mode to:", newMode);
    setModeState(newMode);
  };

  const toggleMode = () => {
    console.log("[ThemeContext] Toggle called, current mode:", mode);
    // Cycle through: device -> light -> dark -> device
    setModeState((prev) => {
      const nextMode =
        prev === "device" ? "light" : prev === "light" ? "dark" : "device";
      console.log("[ThemeContext] Toggling from", prev, "to", nextMode);
      return nextMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ mode, resolvedMode, setMode, toggleMode }}>
      <InitColorSchemeScript defaultMode="light" />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
