import { LightMode, DarkMode, SettingsBrightness } from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useTheme } from "../../contexts/ThemeContext";

export interface ThemeToggleButtonProps {
  /** Size of the toggle button */
  size?: "small" | "medium" | "large";
  /** Additional className */
  className?: string;
}

/**
 * ThemeToggleButton - Reusable theme toggle component using MUI ToggleButton
 *
 * Displays a toggle button group with device, light, and dark mode options.
 * Uses the ThemeContext to manage theme state.
 */
export function ThemeToggleButton({
  size = "medium",
  className,
}: ThemeToggleButtonProps) {
  const { mode, setMode } = useTheme();

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMode: "device" | "light" | "dark" | null
  ) => {
    if (newMode !== null && newMode !== mode) {
      setMode(newMode);
    }
  };

  return (
    <ToggleButtonGroup
      value={mode}
      exclusive
      onChange={handleChange}
      aria-label="theme selection"
      size={size}
      className={className}
    >
      <ToggleButton
        value="device"
        aria-label="device theme"
        title="Use device theme"
      >
        <SettingsBrightness />
      </ToggleButton>
      <ToggleButton value="light" aria-label="light mode" title="Light mode">
        <LightMode />
      </ToggleButton>
      <ToggleButton value="dark" aria-label="dark mode" title="Dark mode">
        <DarkMode />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
