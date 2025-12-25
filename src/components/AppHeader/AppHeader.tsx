import { Menu as MenuIcon } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './AppHeader.module.css';

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
export function AppHeader({ onNavToggle, logo = 'Layout Showcase' }: AppHeaderProps) {
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
        {/* User menu, notifications, etc. can go here */}
      </div>
    </header>
  );
}

