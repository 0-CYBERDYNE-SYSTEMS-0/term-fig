export type TerminalType = 'wezterm' | 'kitty' | 'ghostty' | 'iterm2';

export type CursorStyle = 'block' | 'underline' | 'beam';

export type ThemeName = 'catppuccin-mocha' | 'catppuccin-macchiato' | 'catppuccin-frappe' | 'catppuccin-latte' | 'dracula' | 'nord' | 'gruvbox-dark' | 'gruvbox-light' | 'solarized-dark' | 'solarized-light' | 'custom';

export interface ColorScheme {
  name: string;
  colors: {
    background: string;
    foreground: string;
    cursor: string;
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
    brightBlack: string;
    brightRed: string;
    brightGreen: string;
    brightYellow: string;
    brightBlue: string;
    brightMagenta: string;
    brightCyan: string;
    brightWhite: string;
  };
}

export interface BaseConfig {
  terminal: TerminalType;
  theme: ThemeName;
  customColors?: Partial<ColorScheme['colors']>;
}

export interface AppearanceConfig {
  theme: ThemeName;
  customColors?: Partial<ColorScheme['colors']>;
  opacity: number;
  blur: number;
}

export interface FontConfig {
  family: string;
  size: number;
  weight: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  ligatures: boolean;
}

export interface WindowConfig {
  width: number;
  height: number;
  paddingX: number;
  paddingY: number;
  decorations: boolean;
}

export interface CursorConfig {
  style: CursorStyle;
  color: string;
  blinking: boolean;
  blinkRate: number;
}

export interface ShellConfig {
  program: string;
  args: string[];
  env: Record<string, string>;
}

export interface AdvancedConfig {
  scrollbackSize: number;
  copyOnSelect: boolean;
  audibleBell: boolean;
  confirmClose: boolean;
}

export interface TerminalConfig extends BaseConfig {
  appearance: AppearanceConfig;
  font: FontConfig;
  window: WindowConfig;
  cursor: CursorConfig;
  shell: ShellConfig;
  advanced: AdvancedConfig;
}

export interface GeneratedConfig {
  filename: string;
  content: string;
  instructions: string;
}
