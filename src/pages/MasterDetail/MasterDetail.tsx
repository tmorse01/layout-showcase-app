import { AppFrame } from '../../components/AppFrame/AppFrame';

export function MasterDetail() {
  return (
    <AppFrame
      showAppHeader
      showNav
    >
      <div style={{ padding: '24px' }}>
        <h1>Master-Detail</h1>
        <p>A list or table on the left with a detail panel on the right for fast item inspection.</p>
        {/* TODO: Implement split view with list and detail */}
      </div>
    </AppFrame>
  );
}

