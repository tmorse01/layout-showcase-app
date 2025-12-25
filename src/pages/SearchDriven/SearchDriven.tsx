import { AppFrame } from "../../components/AppFrame/AppFrame";
import { BackToShowcase } from "../../components/BackToShowcase/BackToShowcase";
import { defaultNavItems } from "../../config/sidebarData";

export function SearchDriven() {
  return (
    <AppFrame showAppHeader showNav navItems={defaultNavItems}>
      <div style={{ padding: "24px" }}>
        <BackToShowcase />
        <h1>Search-Driven Layout</h1>
        <p>
          Global or page-level search as the primary entry point into content.
        </p>
        {/* TODO: Implement search-first interface */}
      </div>
    </AppFrame>
  );
}
