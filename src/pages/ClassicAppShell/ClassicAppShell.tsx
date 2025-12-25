import { AppFrame } from '../../components/AppFrame/AppFrame';
import { Dashboard as DashboardIcon, Settings as SettingsIcon, Person as PersonIcon } from '@mui/icons-material';

const navItems = [
  { label: 'Dashboard', path: '/layouts/dashboard-grid', icon: <DashboardIcon /> },
  { label: 'Settings', path: '/layouts/classic-app-shell', icon: <SettingsIcon /> },
  { label: 'Profile', path: '/layouts/entity-detail', icon: <PersonIcon /> },
];

export function ClassicAppShell() {
  return (
    <AppFrame
      showAppHeader
      showNav
      navItems={navItems}
    >
      <div style={{ padding: '24px' }}>
        <h1>Classic App Shell</h1>
        <p>Fixed header with left sidebar navigation and scrollable main content.</p>
        <p>This is the default pattern for most SaaS and admin apps.</p>
        {/* TODO: Add realistic content to demonstrate layout */}
      </div>
    </AppFrame>
  );
}

