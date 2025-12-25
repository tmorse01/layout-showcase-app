import { type ReactNode } from "react";
import type { AppFrameConfig } from "../../types/layout";
import styles from "./AppFrame.module.css";
import { AppHeader } from "../AppHeader/AppHeader";
import { PageHeader } from "../PageHeader/PageHeader";
import { Navigation } from "../Navigation/Navigation";
import { RightRail } from "../RightRail/RightRail";
import { useHighlight } from "../../contexts/HighlightContext";

export interface AppFrameProps extends AppFrameConfig {
  children: ReactNode;
  /** Content for the app header */
  appHeaderContent?: ReactNode;
  /** Content for the page header */
  pageHeaderContent?: ReactNode;
  /** Navigation items */
  navItems?: Array<{ label: string; path: string; icon?: ReactNode }>;
  /** Custom navigation/sidebar content (overrides navItems) */
  navContent?: ReactNode;
  /** Content for the right rail */
  rightRailContent?: ReactNode;
  /** Callback when nav toggle is clicked */
  onNavToggle?: () => void;
  /** Callback when right rail toggle is clicked */
  onRightRailToggle?: () => void;
}

/**
 * AppFrame - Main application shell component
 *
 * Provides a flexible grid-based layout system supporting:
 * - Fixed app header (global navigation)
 * - Sticky page header (contextual actions)
 * - Left navigation sidebar (fixed or collapsible)
 * - Right rail sidebar (optional, toggleable)
 * - Scrollable main content area
 *
 * Header Height Constraints:
 * - App header: 48-64px (max 80px)
 * - Page header: 56-72px (max 96px)
 * - Combined max: 144px
 */
export function AppFrame({
  children,
  showAppHeader = true,
  showPageHeader = false,
  showNav = true,
  showRightRail = false,
  navCollapsed = false,
  navWidth = 240,
  navCollapsedWidth = 64,
  rightRailWidth = 320,
  appHeaderContent,
  pageHeaderContent,
  navItems = [],
  navContent,
  rightRailContent,
  onNavToggle,
  onRightRailToggle,
}: AppFrameProps) {
  // Build CSS custom properties for dynamic values
  const frameStyle = {
    "--app-header-height": showAppHeader ? "64px" : "0px",
    "--page-header-height": showPageHeader ? "72px" : "0px",
    "--nav-width": navCollapsed ? `${navCollapsedWidth}px` : `${navWidth}px`,
    "--right-rail-width": showRightRail ? `${rightRailWidth}px` : "0px",
  } as React.CSSProperties;

  // Build class names for variant states
  const frameClasses = [
    styles.frame,
    !showAppHeader && styles.noAppHeader,
    !showPageHeader && styles.noPageHeader,
    !showNav && styles.noNav,
    !showRightRail && styles.noRightRail,
  ]
    .filter(Boolean)
    .join(" ");

  const navClasses = [styles.nav, navCollapsed && styles.navCollapsed]
    .filter(Boolean)
    .join(" ");

  const { enabled: highlightEnabled } = useHighlight();

  return (
    <div className={frameClasses} style={frameStyle}>
      {showAppHeader && (
        <div className={styles.appHeader}>
          {appHeaderContent || (
            <AppHeader onNavToggle={showNav ? onNavToggle : undefined} />
          )}
          {highlightEnabled && (
            <div className={styles.highlightOverlay} data-label="App Header">
              <span className={styles.highlightLabel}>App Header</span>
            </div>
          )}
        </div>
      )}

      {showNav && (
        <div className={navClasses}>
          {navContent || (
            <Navigation items={navItems} collapsed={navCollapsed} />
          )}
          {highlightEnabled && (
            <div className={styles.highlightOverlay} data-label="Sidebar">
              <span className={styles.highlightLabel}>Sidebar</span>
            </div>
          )}
        </div>
      )}

      {showPageHeader && (
        <div className={styles.pageHeader}>
          {pageHeaderContent || <PageHeader />}
          {highlightEnabled && (
            <div className={styles.highlightOverlay} data-label="Page Header">
              <span className={styles.highlightLabel}>Page Header</span>
            </div>
          )}
        </div>
      )}

      <main className={styles.main}>
        <div className={styles.mainContent}>
          {children}
          {highlightEnabled && (
            <div
              className={`${styles.highlightOverlay} ${styles.mainHighlightOverlay}`}
              data-label="Content"
            >
              <span className={styles.highlightLabel}>Content</span>
            </div>
          )}
        </div>
      </main>

      {showRightRail && (
        <div className={styles.rightRail}>
          {rightRailContent || <RightRail onClose={onRightRailToggle} />}
          {highlightEnabled && (
            <div className={styles.highlightOverlay} data-label="Right Rail">
              <span className={styles.highlightLabel}>Right Rail</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
