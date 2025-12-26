import { useState } from 'react';
import { ConfigProvider } from './hooks/useConfig';
import { SettingsSidebar } from './components/config-editor/SettingsSidebar';
import { TerminalPreview } from './components/preview/TerminalPreview';
import { TerminalSelector } from './components/terminal-select/TerminalSelector';
import { ExportDialog } from './components/terminal-select/ExportDialog';
import { Terminal } from 'lucide-react';

function AppContent() {
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Terminal className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Terminal Config Generator</h1>
            <div className="flex-1" />
            <TerminalSelector onExport={() => setExportDialogOpen(true)} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        <div className="w-[400px] border-r">
          <SettingsSidebar />
        </div>
        <div className="flex-1">
          <TerminalPreview />
        </div>
      </main>

      {/* Export Dialog */}
      <ExportDialog open={exportDialogOpen} onOpenChange={setExportDialogOpen} />
    </div>
  );
}

function App() {
  return (
    <ConfigProvider>
      <AppContent />
    </ConfigProvider>
  );
}

export default App;
