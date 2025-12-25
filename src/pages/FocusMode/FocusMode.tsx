import { AppFrame } from '../../components/AppFrame/AppFrame';

export function FocusMode() {
  return (
    <AppFrame
      showAppHeader={false}
      showNav={false}
    >
      <div style={{ padding: '24px' }}>
        <h1>Full-Screen Focus Mode</h1>
        <p>Distraction-free layout that hides navigation for editing or reviewing.</p>
        {/* TODO: Implement focus mode with toggle */}
      </div>
    </AppFrame>
  );
}

