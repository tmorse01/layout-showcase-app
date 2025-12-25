import { AppFrame } from '../../components/AppFrame/AppFrame';

export function SearchDriven() {
  return (
    <AppFrame
      showAppHeader
      showNav
    >
      <div style={{ padding: '24px' }}>
        <h1>Search-Driven Layout</h1>
        <p>Global or page-level search as the primary entry point into content.</p>
        {/* TODO: Implement search-first interface */}
      </div>
    </AppFrame>
  );
}

