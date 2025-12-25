import { AppFrame } from '../../components/AppFrame/AppFrame';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { Button } from '@mui/material';

export function EntityDetail() {
  return (
    <AppFrame
      showAppHeader
      showPageHeader
      showNav
      pageHeaderContent={
        <PageHeader
          title="Entity Detail"
          breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Entity Detail' }]}
          actions={<Button variant="contained">Save</Button>}
          status={<span>Active</span>}
        />
      }
    >
      <div style={{ padding: '24px' }}>
        <h1>Entity Detail (Sticky Sub-Header)</h1>
        <p>Page-specific header with actions and status that stays visible while scrolling.</p>
        {/* TODO: Add long scrollable content with tabs */}
      </div>
    </AppFrame>
  );
}

