import type { TerminalConfig } from '../../types/config';

export function generateWezTermConfig(config: TerminalConfig): string {
  const { appearance, font, window, cursor, shell, advanced } = config;

  const colors = appearance.theme === 'custom' && appearance.customColors
    ? appearance.customColors
    : getColorsForTheme(appearance.theme);

  return `local wezterm = require 'wezterm'

local config = {}

-- Colors
config.color_scheme = '${appearance.theme}'
config.colors = {
  foreground = '${colors.foreground}',
  background = '${colors.background}',
  cursor_bg = '${cursor.color}',
  cursor_fg = '${colors.background}',
  cursor_border = '${cursor.color}',
  ansi = {
    '${colors.black}',
    '${colors.red}',
    '${colors.green}',
    '${colors.yellow}',
    '${colors.blue}',
    '${colors.magenta}',
    '${colors.cyan}',
    '${colors.white}',
  },
  brights = {
    '${colors.brightBlack}',
    '${colors.brightRed}',
    '${colors.brightGreen}',
    '${colors.brightYellow}',
    '${colors.brightBlue}',
    '${colors.brightMagenta}',
    '${colors.brightCyan}',
    '${colors.brightWhite}',
  },
}

-- Window
config.initial_cols = ${window.width}
config.initial_rows = ${window.height}
config.window_padding = {
  left = '${window.paddingX}px',
  right = '${window.paddingX}px',
  top = '${window.paddingY}px',
  bottom = '${window.paddingY}px',
}
config.window_background_opacity = ${appearance.opacity}
config.window_background_image_hsb = {
  brightness = ${appearance.opacity},
}

-- Font
config.font = wezterm.font('${font.family}', { weight = '${font.weight}' })
config.font_size = ${font.size}
config.harfbuzz_features = ${font.ligatures ? '{ "calt", "liga" }' : '{}'}

-- Cursor
config.default_cursor_style = '${cursor.style}'
config.cursor_blink_rate = ${cursor.blinking ? cursor.blinkRate : 0}
config.cursor_blink_ease_in = 'Constant'
config.cursor_blink_ease_out = 'Constant'

-- Shell
config.default_prog = { '${shell.program}'${shell.args.length > 0 ? ", " + shell.args.map(a => `'${a}'`).join(", ") : ""} }

-- Advanced
config.scrollback_lines = ${advanced.scrollbackSize}
config.selection_word_boundary = ' \t\n{}[]()"\\''
${advanced.audibleBell ? 'config.audible_bell = "Enabled"' : 'config.audible_bell = "Disabled"'}

return config
`;
}

function getColorsForTheme(_theme: string): any {
  // This would import from themes, simplified here
  return {
    foreground: '#cdd6f4',
    background: '#1e1e2e',
    black: '#45475a',
    red: '#f38ba8',
    green: '#a6e3a1',
    yellow: '#f9e2af',
    blue: '#89b4fa',
    magenta: '#f5c2e7',
    cyan: '#94e2d5',
    white: '#bac2de',
    brightBlack: '#585b70',
    brightRed: '#f38ba8',
    brightGreen: '#a6e3a1',
    brightYellow: '#f9e2af',
    brightBlue: '#89b4fa',
    brightMagenta: '#f5c2e7',
    brightCyan: '#94e2d5',
    brightWhite: '#a6adc8',
  };
}
