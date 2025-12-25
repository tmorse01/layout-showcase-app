import { type ReactNode } from "react";
import { Typography } from "@mui/material";
import styles from "./PageHeader.module.css";

export interface PageHeaderProps {
  /** Page title */
  title?: string;
  /** Breadcrumb items */
  breadcrumbs?: Array<{ label: string; path?: string }>;
  /** Primary actions (buttons, etc.) */
  actions?: ReactNode;
  /** Status indicator */
  status?: ReactNode;
}

/**
 * PageHeader - Sticky page-specific header component
 *
 * Height: 72px (max 96px)
 * Use when: Page has contextual actions, breadcrumbs, or status that should remain visible while scrolling
 * Can be fixed: Yes, when content is long and actions are frequently used
 * Contains: Page title, breadcrumbs, primary actions, status indicators
 *
 * Note: Combined with app header, max total height is 144px
 */
export function PageHeader({
  title,
  breadcrumbs,
  actions,
  status,
}: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, index) => (
              <span key={index}>
                {crumb.path ? (
                  <a href={crumb.path}>{crumb.label}</a>
                ) : (
                  <span>{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <span className={styles.breadcrumbSeparator}> / </span>
                )}
              </span>
            ))}
          </nav>
        )}
        {title && (
          <Typography variant="h5" component="h1" className={styles.title}>
            {title}
          </Typography>
        )}
      </div>
      <div className={styles.right}>
        {status && <div className={styles.status}>{status}</div>}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </header>
  );
}
