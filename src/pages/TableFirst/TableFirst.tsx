import { AppFrame } from "../../components/AppFrame/AppFrame";
import { BackToShowcase } from "../../components/BackToShowcase/BackToShowcase";
import { defaultNavItems } from "../../config/sidebarData";

export function TableFirst() {
  return (
    <AppFrame showAppHeader showNav navItems={defaultNavItems}>
      <div style={{ padding: "24px" }}>
        <BackToShowcase />
        <h1>Table-First Layout</h1>
        <p>
          Dense, data-heavy grid as the primary focus with filters and actions
          nearby.
        </p>
        {/* TODO: Implement dense data table with filters */}
      </div>
    </AppFrame>
  );
}
