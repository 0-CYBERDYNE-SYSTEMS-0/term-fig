import type { TerminalConfig } from '../../types/config';
import { themes } from '../themes';

export function generateITerm2Config(config: TerminalConfig): string {
  const { appearance, font, cursor, advanced } = config;
  const themeColors = themes[appearance.theme];
  const colors = { ...themeColors.colors, ...(appearance.customColors || {}) };

  const profile = {
    'Name': 'Terminal Config Generator Profile',
    'Guid': 'terminal-config-' + Math.random().toString(36).substr(2, 9),
    'Use Non-ASCII Font': false,
    'ASCII Ligatures': font.ligatures,
    'Cursor Color': cursor.color,
    'Cursor Type': cursor.style.charAt(0).toUpperCase() + cursor.style.slice(1),
    'Cursor Blinking': cursor.blinking,
    'Blink Allowed': cursor.blinking,
    'Font': `${font.family} ${font.size}pt`,
    'Minimum Font Size': 8,
    'Foreground Color': {
      'Red Component': hexToComponent(colors.foreground, 0),
      'Green Component': hexToComponent(colors.foreground, 1),
      'Blue Component': hexToComponent(colors.foreground, 2),
      'Alpha Component': 1,
    },
    'Background Color': {
      'Red Component': hexToComponent(colors.background, 0),
      'Green Component': hexToComponent(colors.background, 1),
      'Blue Component': hexToComponent(colors.background, 2),
      'Alpha Component': 1 - (appearance.opacity - 0.5) / 0.5,
    },
    'Ansi 0 Color': ansiColor(colors.black),
    'Ansi 1 Color': ansiColor(colors.red),
    'Ansi 2 Color': ansiColor(colors.green),
    'Ansi 3 Color': ansiColor(colors.yellow),
    'Ansi 4 Color': ansiColor(colors.blue),
    'Ansi 5 Color': ansiColor(colors.magenta),
    'Ansi 6 Color': ansiColor(colors.cyan),
    'Ansi 7 Color': ansiColor(colors.white),
    'Ansi 8 Color': ansiColor(colors.brightBlack),
    'Ansi 9 Color': ansiColor(colors.brightRed),
    'Ansi 10 Color': ansiColor(colors.brightGreen),
    'Ansi 11 Color': ansiColor(colors.brightYellow),
    'Ansi 12 Color': ansiColor(colors.brightBlue),
    'Ansi 13 Color': ansiColor(colors.brightMagenta),
    'Ansi 14 Color': ansiColor(colors.brightCyan),
    'Ansi 15 Color': ansiColor(colors.brightWhite),
    'Scrollback Lines': advanced.scrollbackSize,
    'Copy Mode': { 'Automatically Copy Selection': advanced.copyOnSelect },
    'Silence Bell': !advanced.audibleBell,
    'Prompt Before Closing': advanced.confirmClose ? 2 : 0,
  };

  return JSON.stringify({ Profiles: [profile] }, null, 2);
}

function hexToComponent(hex: string, index: number): number {
  const cleaned = hex.replace('#', '');
  const component = parseInt(cleaned.substr(index * 2, 2), 16) / 255;
  return Math.round(component * 10000) / 10000;
}

function ansiColor(hex: string) {
  return {
    'Red Component': hexToComponent(hex, 0),
    'Green Component': hexToComponent(hex, 1),
    'Blue Component': hexToComponent(hex, 2),
    'Alpha Component': 1,
  };
}
