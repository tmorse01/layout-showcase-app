import { AppFrame } from "../../components/AppFrame/AppFrame";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { defaultNavItems } from "../../config/sidebarData";

export function TabbedContent() {
  return (
    <AppFrame
      showAppHeader
      showPageHeader
      showNav
      navItems={defaultNavItems}
      pageHeaderContent={<PageHeader title="Tabbed Content" />}
    >
      <div style={{ padding: "24px" }}>
        <h1>Tabbed Content Layout</h1>
        <p>
          Horizontal tabs used to switch between related views within the same
          entity.
        </p>
        {/* TODO: Implement tabs component */}
      </div>
    </AppFrame>
  );
}
