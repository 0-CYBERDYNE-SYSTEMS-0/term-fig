import type { TerminalConfig, GeneratedConfig, TerminalType } from '../../types/config';
import { generateWezTermConfig } from './wezterm';
import { generateKittyConfig } from './kitty';
import { generateGhosttyConfig } from './ghostty';
import { generateITerm2Config } from './iterm2';

const generators: Record<TerminalType, (config: TerminalConfig) => string> = {
  wezterm: generateWezTermConfig,
  kitty: generateKittyConfig,
  ghostty: generateGhosttyConfig,
  iterm2: generateITerm2Config,
};

const filenames: Record<TerminalType, string> = {
  wezterm: '.wezterm.lua',
  kitty: 'kitty.conf',
  ghostty: 'config',
  iterm2: 'profile.json',
};

const instructions: Record<TerminalType, string> = {
  wezterm: `Place this file in your home directory (\`~/.wezterm.lua\`) or in \`~/.config/wezterm/wezterm.lua\`.

WezTerm will automatically reload the configuration when the file changes.

You can also manually reload with Ctrl+Shift+R.`,
  kitty: `Place this file in \`~/.config/kitty/kitty.conf\`.

Reload the configuration by pressing Ctrl+Shift+F5 or sending the SIGUSR1 signal to kitty.`,
  ghostty: `Place this file in \`~/.config/ghostty/config\`.

On macOS, you can also place it in \`~/Library/Application Support/com.mitchellh.ghostty/config\`.

Ghostty will automatically reload the configuration when the file changes.`,
  iterm2: `Save this as a JSON file in the DynamicProfiles directory:
- \`~/Library/Application Support/iTerm2/DynamicProfiles/\`

iTerm2 will automatically detect and load the profile.`,
};

export function generateConfig(config: TerminalConfig): GeneratedConfig {
  const content = generators[config.terminal](config);
  return {
    filename: filenames[config.terminal],
    content,
    instructions: instructions[config.terminal],
  };
}
