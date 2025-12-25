import { useState } from 'react';
import { AppFrame } from '../../components/AppFrame/AppFrame';

export function CollapsibleSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AppFrame
      showAppHeader
      showNav
      navCollapsed={collapsed}
      onNavToggle={() => setCollapsed(!collapsed)}
    >
      <div style={{ padding: '24px' }}>
        <h1>Collapsible Sidebar</h1>
        <p>App shell where the left nav can collapse to icons for focus or smaller screens.</p>
        {/* TODO: Add toggle button and demonstrate collapsed state */}
      </div>
    </AppFrame>
  );
}

