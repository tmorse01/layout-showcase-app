import { AppFrame } from '../../components/AppFrame/AppFrame';

export function DashboardGrid() {
  return (
    <AppFrame
      showAppHeader
      showNav
    >
      <div style={{ padding: '24px' }}>
        <h1>Dashboard Grid</h1>
        <p>Card-based layout showing KPIs, charts, and tables with clear visual hierarchy.</p>
        {/* TODO: Implement dashboard with cards, KPIs, charts */}
      </div>
    </AppFrame>
  );
}

