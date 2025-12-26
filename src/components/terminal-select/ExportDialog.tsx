import { useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useConfig } from '../../hooks/useConfig';
import { generateConfig } from '../../config/generators';
import { downloadFile, copyToClipboard } from '../../lib/utils';

export function ExportDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { config } = useConfig();
  const [copied, setCopied] = useState(false);
  const generatedConfig = generateConfig(config);

  const handleDownload = () => {
    downloadFile(generatedConfig.content, generatedConfig.filename);
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(generatedConfig.content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Export Configuration</DialogTitle>
          <DialogDescription>
            Download or copy your {config.terminal.charAt(0).toUpperCase() + config.terminal.slice(1)} configuration
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col gap-4 mt-4">
          <div className="flex gap-2">
            <Button onClick={handleDownload} className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download {generatedConfig.filename}
            </Button>
            <Button onClick={handleCopy} variant="outline">
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col gap-2">
            <label className="text-sm font-medium">Configuration File</label>
            <Textarea
              value={generatedConfig.content}
              readOnly
              className="flex-1 font-mono text-xs resize-none"
            />
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold mb-2">Installation Instructions</h4>
            <pre className="text-xs whitespace-pre-wrap font-mono">
              {generatedConfig.instructions}
            </pre>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
