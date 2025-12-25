import { AppFrame } from '../../components/AppFrame/AppFrame';

export function SplitView() {
  return (
    <AppFrame
      showAppHeader
      showNav
    >
      <div style={{ padding: '24px' }}>
        <h1>Split View (Resizable Panels)</h1>
        <p>Two or more resizable panes allowing users to control how space is allocated.</p>
        {/* TODO: Implement resizable panels */}
      </div>
    </AppFrame>
  );
}

