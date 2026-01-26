# Terminal Config Generator

A beautiful web-based configuration generator for WezTerm, Kitty, Ghostty, and iTerm2 terminal emulators. Visually customize your terminal settings, preview changes in real-time, and export ready-to-use configuration files.

## Features

- **Multi-Terminal Support**: Generate configs for WezTerm, Kitty, Ghostty, and iTerm2
- **Visual Configuration**: Adjust settings through intuitive UI controls
- **Real-time Preview**: See your changes instantly in a live terminal mockup
- **Beautiful Themes**: Built-in Catppuccin (all variants), Dracula, Nord, Gruvbox, Solarized, and Custom themes
- **Complete Customization**:
  - Theme and color palette
  - Font family, size, weight, and ligatures
  - Window dimensions, padding, opacity, and blur effects
  - Cursor style, color, and blinking behavior
  - Shell program and arguments
  - Advanced options (scrollback, copy on select, audible bell, etc.)
- **Easy Export**: Download or copy configuration files with installation instructions

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
 components/
    ui/                    # shadcn/ui base components
    config-editor/          # Settings sidebar components
    preview/               # Terminal preview component
    terminal-select/       # Terminal selector and export dialog
 config/
    schemas/               # Terminal type schemas
    generators/            # Config file generators
    themes/               # Color scheme definitions
 hooks/
    useConfig.ts          # Config state management
 types/
    config.ts            # TypeScript type definitions
 lib/
    utils.ts             # Utility functions
 App.tsx                  # Main application component
```

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI + Tailwind CSS)
- **Icons**: Lucide React
- **Color Picker**: react-colorful
- **State Management**: React Context API

## Usage

1. Select your terminal type from the dropdown in the header
2. Use the sidebar tabs to navigate through different settings categories
3. Adjust settings using sliders, selects, toggles, and color pickers
4. Preview your changes in real-time in the terminal preview panel
5. Click "Export Config" to download or copy your configuration file
6. Follow the installation instructions to apply your new config

## Custom Themes

Choose "Custom" from the theme dropdown to manually adjust each terminal color using the color picker.

## License

MIT
