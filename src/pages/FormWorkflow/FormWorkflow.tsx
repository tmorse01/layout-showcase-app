import { AppFrame } from '../../components/AppFrame/AppFrame';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { Button } from '@mui/material';

export function FormWorkflow() {
  return (
    <AppFrame
      showAppHeader
      showPageHeader
      showNav
      pageHeaderContent={
        <PageHeader
          title="Form Workflow"
          actions={<Button variant="contained">Next Step</Button>}
        />
      }
    >
      <div style={{ padding: '24px' }}>
        <h1>Form-Centric Workflow</h1>
        <p>Step-based or sectioned form layout with clear progress and persistent actions.</p>
        {/* TODO: Implement multi-step form with progress indicator */}
      </div>
    </AppFrame>
  );
}

