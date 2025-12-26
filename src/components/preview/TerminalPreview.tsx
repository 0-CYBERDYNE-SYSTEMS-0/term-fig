import { useConfig } from '../../hooks/useConfig';
import { themes } from '../../config/themes';

export function TerminalPreview() {
  const { config } = useConfig();
  const colors = config.appearance.customColors || themes[config.appearance.theme].colors;

  const getCursorStyle = () => {
    switch (config.cursor.style) {
      case 'block':
        return 'block';
      case 'underline':
        return 'underline';
      case 'beam':
        return 'bar';
      default:
        return 'block';
    }
  };

  const sampleContent = `
$ ls -la
total 32
drwxr-xr-x  5 user  staff   160 Dec 26 12:00 .
drwxr-xr-x  3 user  staff    96 Dec 26 11:30 ..
-rw-r--r--  1 user  staff  2048 Dec 26 10:15 package.json
-rw-r--r--  1 user  staff  4096 Dec 26 09:20 tsconfig.json
-rw-r--r--  1 user  staff  8192 Dec 26 08:45 vite.config.ts
drwxr-xr-x 10 user  staff   320 Dec 26 07:00 src
-rw-r--r--  1 user  staff  1024 Dec 26 06:30 README.md

$ git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean

$ npm run dev

  VITE v5.0.0  ready in 250 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose

$ echo "Hello, World!"
Hello, World!
`.trim();

  return (
    <div className="h-full flex items-center justify-center p-8 bg-muted/30">
      <div
        className="rounded-lg shadow-2xl overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: colors.background,
          width: 'min(90vw, 800px)',
          maxWidth: `${config.window.width * (config.font.size * 0.6)}px`,
        }}
      >
        {/* Terminal Header */}
        {config.window.decorations && (
          <div className="px-4 py-2 flex items-center gap-2" style={{ backgroundColor: '#1e1e2e' }}>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs opacity-70 ml-2">
              {config.terminal.charAt(0).toUpperCase() + config.terminal.slice(1)} Terminal
            </span>
          </div>
        )}

        {/* Terminal Content */}
        <div
          className="p-4 font-mono overflow-hidden"
          style={{
            color: colors.foreground,
            fontSize: `${Math.min(config.font.size, 16)}px`,
            fontFamily: `${config.font.family}, monospace`,
            paddingLeft: `${config.window.paddingX}px`,
            paddingRight: `${config.window.paddingX}px`,
            paddingTop: `${config.window.paddingY}px`,
            paddingBottom: `${config.window.paddingY}px`,
            opacity: config.appearance.opacity,
            backdropFilter: config.appearance.blur > 0 ? `blur(${config.appearance.blur}px)` : 'none',
          }}
        >
          <pre
            style={{
              cursor: getCursorStyle(),
            }}
            className="whitespace-pre-wrap break-words"
          >
            {sampleContent.split('\n').map((line, i) => (
              <div key={i}>
                {line.includes('$') ? (
                  <span>
                    <span style={{ color: colors.green }}>$</span>
                    {' '}
                    {line.substring(line.indexOf('$') + 1)}
                  </span>
                ) : (
                  <span>
                    {line.includes('VITE') && (
                      <span style={{ color: colors.cyan }}>{line}</span>
                    ) || line.includes('Local:') && (
                      <span style={{ color: colors.green }}>{line}</span>
                    ) || line.includes('Network:') && (
                      <span style={{ color: colors.blue }}>{line}</span>
                    ) || line.includes('README') && (
                      <span>
                        <span style={{ color: colors.white }}>{line.substring(0, line.indexOf('README'))}</span>
                        <span style={{ color: colors.cyan }}>{line.substring(line.indexOf('README'), line.indexOf('README') + 6)}</span>
                        <span style={{ color: colors.white }}>{line.substring(line.indexOf('README') + 6)}</span>
                      </span>
                    ) || line.includes('vite.config') && (
                      <span>
                        <span style={{ color: colors.white }}>{line.substring(0, line.indexOf('vite.config'))}</span>
                        <span style={{ color: colors.cyan }}>{line.substring(line.indexOf('vite.config'), line.indexOf('vite.config') + 12)}</span>
                        <span style={{ color: colors.white }}>{line.substring(line.indexOf('vite.config') + 12)}</span>
                      </span>
                    ) || line.includes('tsconfig') && (
                      <span>
                        <span style={{ color: colors.white }}>{line.substring(0, line.indexOf('tsconfig'))}</span>
                        <span style={{ color: colors.yellow }}>{line.substring(line.indexOf('tsconfig'), line.indexOf('tsconfig') + 10)}</span>
                        <span style={{ color: colors.white }}>{line.substring(line.indexOf('tsconfig') + 10)}</span>
                      </span>
                    ) || line.includes('package.json') && (
                      <span>
                        <span style={{ color: colors.white }}>{line.substring(0, line.indexOf('package.json'))}</span>
                        <span style={{ color: colors.magenta }}>{line.substring(line.indexOf('package.json'), line.indexOf('package.json') + 12)}</span>
                        <span style={{ color: colors.white }}>{line.substring(line.indexOf('package.json') + 12)}</span>
                      </span>
                    ) || line.includes('src') && (
                      <span>
                        <span style={{ color: colors.blue }}>{line}</span>
                      </span>
                    ) || line.includes('drwx') && (
                      <span style={{ color: colors.blue }}>{line}</span>
                    ) || line.includes('-rw') && (
                      <span style={{ color: colors.white }}>{line}</span>
                    ) || line.includes('On branch') && (
                      <span style={{ color: colors.green }}>{line}</span>
                    ) || line.includes('Your branch') && (
                      <span style={{ color: colors.brightGreen }}>{line}</span>
                    ) || line.includes('nothing to commit') && (
                      <span style={{ color: colors.green }}>{line}</span>
                    ) || line.includes('Hello') && (
                      <span style={{ color: colors.green }}>{line}</span>
                    ) || line}
                  </span>
                )}
              </div>
            ))}
          </pre>
        </div>

        {/* Cursor Indicator */}
        <div
          className="animate-pulse ml-4"
          style={{
            backgroundColor: config.cursor.color,
            width: `${config.font.size * 0.6}px`,
            height: `${config.font.size}px`,
          }}
        />
      </div>
    </div>
  );
}
