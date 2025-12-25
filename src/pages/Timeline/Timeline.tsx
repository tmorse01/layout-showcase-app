import { AppFrame } from "../../components/AppFrame/AppFrame";
import { BackToShowcase } from "../../components/BackToShowcase/BackToShowcase";
import { defaultNavItems } from "../../config/sidebarData";

export function Timeline() {
  return (
    <AppFrame showAppHeader showNav navItems={defaultNavItems}>
      <div style={{ padding: "24px" }}>
        <BackToShowcase />
        <h1>Timeline / Activity Layout</h1>
        <p>Chronological layout for logs, histories, or workflows.</p>
        {/* TODO: Implement vertical timeline */}
      </div>
    </AppFrame>
  );
}
