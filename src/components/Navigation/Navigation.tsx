import { type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

export interface NavigationItem {
  label: string;
  path: string;
  icon?: ReactNode;
}

export interface NavigationGroup {
  label: string;
  items: NavigationItem[];
}

export interface NavigationProps {
  items?: NavigationItem[];
  groups?: NavigationGroup[];
  collapsed?: boolean;
}

/**
 * Navigation - Left sidebar navigation component
 *
 * Supports:
 * - Expanded mode: Full labels with icons
 * - Collapsed mode: Icons only (64px width)
 * - Mobile: Overlay drawer
 * - Grouped navigation items with section headers
 */
export function Navigation({
  items,
  groups,
  collapsed = false,
}: NavigationProps) {
  const navClasses = [styles.nav, collapsed && styles.collapsed]
    .filter(Boolean)
    .join(" ");

  // If groups are provided, use them; otherwise use flat items
  const hasGroups = groups && groups.length > 0;

  return (
    <nav className={navClasses} aria-label="Main navigation">
      {hasGroups ? (
        <div className={styles.navGroups}>
          {groups.map((group, groupIndex) => (
            <div key={groupIndex} className={styles.navGroup}>
              {!collapsed && (
                <div className={styles.navGroupHeader}>
                  <span className={styles.navGroupLabel}>{group.label}</span>
                </div>
              )}
              <ul className={styles.navList}>
                {group.items.map((item) => (
                  <li key={item.path} className={styles.navItem}>
                    <NavLink
                      to={item.path}
                      title={item.label}
                      className={({ isActive }) =>
                        [styles.navLink, isActive && styles.navLinkActive]
                          .filter(Boolean)
                          .join(" ")
                      }
                    >
                      {item.icon && (
                        <span className={styles.navIcon}>{item.icon}</span>
                      )}
                      <span className={styles.navLabel}>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul className={styles.navList}>
          {items.map((item) => (
            <li key={item.path} className={styles.navItem}>
              <NavLink
                to={item.path}
                title={item.label}
                className={({ isActive }) =>
                  [styles.navLink, isActive && styles.navLinkActive]
                    .filter(Boolean)
                    .join(" ")
                }
              >
                {item.icon && (
                  <span className={styles.navIcon}>{item.icon}</span>
                )}
                <span className={styles.navLabel}>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
