import { Terminal, Download, RefreshCw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { useConfig } from '../../hooks/useConfig';
import type { TerminalType } from '../../types/config';

interface TerminalSelectorProps {
  onExport: () => void;
}

export function TerminalSelector({ onExport }: TerminalSelectorProps) {
  const { config, updateConfig, resetConfig } = useConfig();

  const terminals: { value: TerminalType; label: string }[] = [
    { value: 'wezterm', label: 'WezTerm' },
    { value: 'kitty', label: 'Kitty' },
    { value: 'ghostty', label: 'Ghostty' },
    { value: 'iterm2', label: 'iTerm2' },
  ];

  return (
    <div className="flex items-center gap-4 bg-card border rounded-lg p-4">
      <div className="flex items-center gap-2">
        <Terminal className="h-5 w-5 text-primary" />
        <span className="font-medium">Terminal:</span>
      </div>

      <Select
        value={config.terminal}
        onValueChange={(value) => updateConfig({ terminal: value as TerminalType })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {terminals.map((terminal) => (
            <SelectItem key={terminal.value} value={terminal.value}>
              {terminal.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex-1" />

      <Button onClick={resetConfig} variant="outline" size="sm">
        <RefreshCw className="h-4 w-4 mr-2" />
        Reset
      </Button>

      <Button onClick={onExport} size="sm">
        <Download className="h-4 w-4 mr-2" />
        Export Config
      </Button>
    </div>
  );
}
