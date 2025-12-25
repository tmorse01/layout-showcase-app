import { type ReactNode } from 'react';
import { Close as CloseIcon } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import styles from './RightRail.module.css';

export interface RightRailProps {
  /** Title for the right rail */
  title?: string;
  /** Content to display in the right rail */
  children?: ReactNode;
  /** Callback when close button is clicked */
  onClose?: () => void;
}

/**
 * RightRail - Optional right sidebar component
 * 
 * Use for:
 * - Contextual details or settings
 * - Property panels
 * - Inspector views
 * - Secondary information
 */
export function RightRail({ title = 'Details', children, onClose }: RightRailProps) {
  return (
    <aside className={styles.rail} aria-label="Right sidebar">
      <div className={styles.header}>
        <Typography variant="subtitle1" className={styles.title}>
          {title}
        </Typography>
        {onClose && (
          <IconButton
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close sidebar"
            size="small"
          >
            <CloseIcon />
          </IconButton>
        )}
      </div>
      <div className={styles.content}>
        {children || <p>Right rail content goes here</p>}
      </div>
    </aside>
  );
}

