import { AppFrame } from '../../components/AppFrame/AppFrame';

export function Timeline() {
  return (
    <AppFrame
      showAppHeader
      showNav
    >
      <div style={{ padding: '24px' }}>
        <h1>Timeline / Activity Layout</h1>
        <p>Chronological layout for logs, histories, or workflows.</p>
        {/* TODO: Implement vertical timeline */}
      </div>
    </AppFrame>
  );
}

