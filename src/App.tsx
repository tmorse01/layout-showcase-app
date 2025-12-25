import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LayoutGallery } from './pages/LayoutGallery/LayoutGallery';
import { ClassicAppShell } from './pages/ClassicAppShell/ClassicAppShell';
import { DashboardGrid } from './pages/DashboardGrid/DashboardGrid';
import { EntityDetail } from './pages/EntityDetail/EntityDetail';
import { MasterDetail } from './pages/MasterDetail/MasterDetail';
import { FormWorkflow } from './pages/FormWorkflow/FormWorkflow';
import { CollapsibleSidebar } from './pages/CollapsibleSidebar/CollapsibleSidebar';
import { TabbedContent } from './pages/TabbedContent/TabbedContent';
import { SplitView } from './pages/SplitView/SplitView';
import { TableFirst } from './pages/TableFirst/TableFirst';
import { SearchDriven } from './pages/SearchDriven/SearchDriven';
import { RightInspector } from './pages/RightInspector/RightInspector';
import { CommandCentered } from './pages/CommandCentered/CommandCentered';
import { FocusMode } from './pages/FocusMode/FocusMode';
import { Timeline } from './pages/Timeline/Timeline';
import { Kanban } from './pages/Kanban/Kanban';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutGallery />} />
        <Route path="/layouts/classic-app-shell" element={<ClassicAppShell />} />
        <Route path="/layouts/dashboard-grid" element={<DashboardGrid />} />
        <Route path="/layouts/entity-detail" element={<EntityDetail />} />
        <Route path="/layouts/master-detail" element={<MasterDetail />} />
        <Route path="/layouts/form-workflow" element={<FormWorkflow />} />
        <Route path="/layouts/collapsible-sidebar" element={<CollapsibleSidebar />} />
        <Route path="/layouts/tabbed-content" element={<TabbedContent />} />
        <Route path="/layouts/split-view" element={<SplitView />} />
        <Route path="/layouts/table-first" element={<TableFirst />} />
        <Route path="/layouts/search-driven" element={<SearchDriven />} />
        <Route path="/layouts/right-inspector" element={<RightInspector />} />
        <Route path="/layouts/command-centered" element={<CommandCentered />} />
        <Route path="/layouts/focus-mode" element={<FocusMode />} />
        <Route path="/layouts/timeline" element={<Timeline />} />
        <Route path="/layouts/kanban" element={<Kanban />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
