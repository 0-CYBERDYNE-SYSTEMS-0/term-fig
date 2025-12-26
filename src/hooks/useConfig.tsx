import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { TerminalConfig } from '../types/config';
import { themes } from '../config/themes';

interface ConfigContextValue {
  config: TerminalConfig;
  updateConfig: (updates: Partial<TerminalConfig>) => void;
  resetConfig: () => void;
}

const defaultConfig: TerminalConfig = {
  terminal: 'wezterm',
  theme: 'catppuccin-mocha',
  appearance: {
    theme: 'catppuccin-mocha',
    opacity: 1.0,
    blur: 0,
  },
  font: {
    family: 'JetBrains Mono',
    size: 14,
    weight: 'normal',
    ligatures: true,
  },
  window: {
    width: 120,
    height: 30,
    paddingX: 8,
    paddingY: 4,
    decorations: true,
  },
  cursor: {
    style: 'block',
    color: themes['catppuccin-mocha'].colors.cursor,
    blinking: true,
    blinkRate: 500,
  },
  shell: {
    program: '/bin/zsh',
    args: [],
    env: {},
  },
  advanced: {
    scrollbackSize: 10000,
    copyOnSelect: false,
    audibleBell: false,
    confirmClose: false,
  },
};

const ConfigContext = createContext<ConfigContextValue | undefined>(undefined);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<TerminalConfig>(defaultConfig);

  const updateConfig = useCallback((updates: Partial<TerminalConfig>) => {
    setConfig((prev) => {
      const newConfig = { ...prev, ...updates };

      // If theme changes, update cursor color and appearance
      if (updates.appearance?.theme || updates.theme) {
        const themeName = updates.appearance?.theme || updates.theme || prev.appearance.theme;
        const themeColors = themes[themeName];
        newConfig.appearance = { ...newConfig.appearance, theme: themeName };
        newConfig.theme = themeName;
        newConfig.cursor = { ...newConfig.cursor, color: themeColors.colors.cursor };
      }

      return newConfig;
    });
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(defaultConfig);
  }, []);

  return (
    <ConfigContext.Provider value={{ config, updateConfig, resetConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within ConfigProvider');
  }
  return context;
}
