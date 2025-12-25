import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

export interface NavigationItem {
  label: string;
  path: string;
  icon?: ReactNode;
}

export interface NavigationProps {
  items: NavigationItem[];
  collapsed?: boolean;
}

/**
 * Navigation - Left sidebar navigation component
 * 
 * Supports:
 * - Expanded mode: Full labels with icons
 * - Collapsed mode: Icons only (64px width)
 * - Mobile: Overlay drawer
 */
export function Navigation({ items, collapsed = false }: NavigationProps) {
  const navClasses = [styles.nav, collapsed && styles.collapsed]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={navClasses} aria-label="Main navigation">
      <ul className={styles.navList}>
        {items.map((item) => (
          <li key={item.path} className={styles.navItem}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                [styles.navLink, isActive && styles.navLinkActive]
                  .filter(Boolean)
                  .join(' ')
              }
            >
              {item.icon && <span className={styles.navIcon}>{item.icon}</span>}
              <span className={styles.navLabel}>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

