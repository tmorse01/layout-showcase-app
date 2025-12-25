/**
 * Layout system types and interfaces
 */

export type LayoutVariant =
  | 'classic-app-shell'
  | 'collapsible-sidebar'
  | 'focus-mode'
  | 'command-centered';

export interface AppFrameConfig {
  /** Show the fixed app header at the top */
  showAppHeader?: boolean;
  /** Show the sticky page-specific header below app header */
  showPageHeader?: boolean;
  /** Show the left navigation sidebar */
  showNav?: boolean;
  /** Show the right rail/sidebar */
  showRightRail?: boolean;
  /** Whether navigation is collapsed (icon-only mode) */
  navCollapsed?: boolean;
  /** Navigation width when expanded (default: 240px) */
  navWidth?: number;
  /** Navigation width when collapsed (default: 64px) */
  navCollapsedWidth?: number;
  /** Right rail width (default: 320px) */
  rightRailWidth?: number;
  /** Layout variant for specific shell patterns */
  variant?: LayoutVariant;
}

export interface LayoutMetadata {
  id: string;
  name: string;
  description: string;
  tier: 'essential' | 'modern' | 'advanced';
  route: string;
  useCases: string[];
  headerPattern: 'app-only' | 'app-page' | 'page-only' | 'none';
  features: string[];
}

