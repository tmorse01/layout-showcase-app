import { AppFrame } from "../../components/AppFrame/AppFrame";
import { BackToShowcase } from "../../components/BackToShowcase/BackToShowcase";
import { defaultNavItems } from "../../config/sidebarData";

export function SplitView() {
  return (
    <AppFrame showAppHeader showNav navItems={defaultNavItems}>
      <div style={{ padding: "24px" }}>
        <BackToShowcase />
        <h1>Split View (Resizable Panels)</h1>
        <p>
          Two or more resizable panes allowing users to control how space is
          allocated.
        </p>
        {/* TODO: Implement resizable panels */}
      </div>
    </AppFrame>
  );
}
