import { AppFrame } from '../../components/AppFrame/AppFrame';

export function TableFirst() {
  return (
    <AppFrame
      showAppHeader
      showNav
    >
      <div style={{ padding: '24px' }}>
        <h1>Table-First Layout</h1>
        <p>Dense, data-heavy grid as the primary focus with filters and actions nearby.</p>
        {/* TODO: Implement dense data table with filters */}
      </div>
    </AppFrame>
  );
}

