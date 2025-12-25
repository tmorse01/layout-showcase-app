import { useState } from "react";
import { AppFrame } from "../../components/AppFrame/AppFrame";
import { BackToShowcase } from "../../components/BackToShowcase/BackToShowcase";
import { defaultNavItems } from "../../config/sidebarData";

export function CollapsibleSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AppFrame
      showAppHeader
      showNav
      navItems={defaultNavItems}
      navCollapsed={collapsed}
      onNavToggle={() => setCollapsed(!collapsed)}
    >
      <div style={{ padding: "24px" }}>
        <BackToShowcase />
        <h1>Collapsible Sidebar</h1>
        <p>
          App shell where the left nav can collapse to icons for focus or
          smaller screens.
        </p>
        {/* TODO: Add toggle button and demonstrate collapsed state */}
      </div>
    </AppFrame>
  );
}
