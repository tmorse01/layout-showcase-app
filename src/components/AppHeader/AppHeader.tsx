import { Menu as MenuIcon, Label as LabelIcon } from "@mui/icons-material";
import { IconButton, Typography, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { useHighlight } from "../../contexts/HighlightContext";
import { ThemeToggleButton } from "../ThemeToggleButton/ThemeToggleButton";
import styles from "./AppHeader.module.css";

export interface AppHeaderProps {
  /** Callback when nav toggle button is clicked (mobile) */
  onNavToggle?: () => void;
  /** Logo/brand text */
  logo?: string;
}

/**
 * AppHeader - Fixed global header component
 *
 * Height: 64px (max 80px)
 * Use when: Navigation and global actions need constant visibility
 * Contains: App logo, global nav, user menu, notifications
 */
export function AppHeader({
  onNavToggle,
  logo = "Layout Showcase",
}: AppHeaderProps) {
  const { enabled: highlightEnabled, toggle: toggleHighlight } = useHighlight();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {onNavToggle && (
          <IconButton
            onClick={onNavToggle}
            className={styles.menuButton}
            aria-label="Toggle navigation"
          >
            <MenuIcon />
          </IconButton>
        )}
        <Link to="/" className={styles.logo}>
          <Typography variant="h6" component="span">
            {logo}
          </Typography>
        </Link>
      </div>
      <div className={styles.right}>
        <Tooltip
          title={
            highlightEnabled ? "Hide section labels" : "Show section labels"
          }
        >
          <IconButton
            onClick={toggleHighlight}
            aria-label="Toggle section highlights"
            color={highlightEnabled ? "primary" : "inherit"}
          >
            <LabelIcon />
          </IconButton>
        </Tooltip>
        <ThemeToggleButton size="small" />
      </div>
    </header>
  );
}
