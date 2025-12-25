import { AppFrame } from "../../components/AppFrame/AppFrame";
import { BackToShowcase } from "../../components/BackToShowcase/BackToShowcase";
import { defaultNavItems } from "../../config/sidebarData";

export function Kanban() {
  return (
    <AppFrame showAppHeader showNav navItems={defaultNavItems}>
      <div style={{ padding: "24px" }}>
        <BackToShowcase />
        <h1>Kanban / Board Layout</h1>
        <p>
          Column-based layout optimized for drag-and-drop workflow management.
        </p>
        {/* TODO: Implement kanban board with columns */}
      </div>
    </AppFrame>
  );
}
