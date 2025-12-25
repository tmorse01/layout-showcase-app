import { useState } from "react";
import { AppFrame } from "../../components/AppFrame/AppFrame";
import { defaultNavItems } from "../../config/sidebarData";

export function RightInspector() {
  const [showRightRail, setShowRightRail] = useState(true);

  return (
    <AppFrame
      showAppHeader
      showNav
      navItems={defaultNavItems}
      showRightRail={showRightRail}
      onRightRailToggle={() => setShowRightRail(!showRightRail)}
    >
      <div style={{ padding: "24px" }}>
        <h1>Right-Side Inspector Layout</h1>
        <p>
          Contextual details or settings shown in a toggleable right sidebar.
        </p>
        {/* TODO: Implement inspector panel */}
      </div>
    </AppFrame>
  );
}
