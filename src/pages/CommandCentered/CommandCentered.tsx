import { AppFrame } from "../../components/AppFrame/AppFrame";

export function CommandCentered() {
  return (
    <AppFrame showAppHeader={false} showNav={false}>
      <div style={{ padding: "24px" }}>
        <h1>Command-Centered Layout</h1>
        <p>
          Minimal UI relying on command palettes or keyboard-first interactions.
        </p>
        {/* TODO: Implement command palette (Cmd+K) */}
      </div>
    </AppFrame>
  );
}
