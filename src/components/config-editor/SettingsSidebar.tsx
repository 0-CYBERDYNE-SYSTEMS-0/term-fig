import { useState } from 'react';
import { Palette, Type, Layout, MousePointer, Terminal, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import { Input } from '../ui/input';
import { ColorPicker } from '../ui/color-picker';
import { useConfig } from '../../hooks/useConfig';
import type { ThemeName, CursorStyle } from '../../types/config';
import { themeNames, themes } from '../../config/themes';

export function SettingsSidebar() {
  const { config, updateConfig } = useConfig();
  const [activeTab, setActiveTab] = useState('appearance');

  return (
    <div className="w-full h-full overflow-y-auto p-6 bg-muted/20">
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-6">
          <TabsTrigger value="appearance" className="flex flex-col gap-1 p-2">
            <Palette className="h-4 w-4" />
            <span className="text-xs">Theme</span>
          </TabsTrigger>
          <TabsTrigger value="fonts" className="flex flex-col gap-1 p-2">
            <Type className="h-4 w-4" />
            <span className="text-xs">Fonts</span>
          </TabsTrigger>
          <TabsTrigger value="window" className="flex flex-col gap-1 p-2">
            <Layout className="h-4 w-4" />
            <span className="text-xs">Window</span>
          </TabsTrigger>
          <TabsTrigger value="cursor" className="flex flex-col gap-1 p-2">
            <MousePointer className="h-4 w-4" />
            <span className="text-xs">Cursor</span>
          </TabsTrigger>
          <TabsTrigger value="shell" className="flex flex-col gap-1 p-2">
            <Terminal className="h-4 w-4" />
            <span className="text-xs">Shell</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex flex-col gap-1 p-2">
            <Settings className="h-4 w-4" />
            <span className="text-xs">Advanced</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize colors and visual effects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select
                  value={config.appearance.theme}
                  onValueChange={(value) => updateConfig({ appearance: { ...config.appearance, theme: value as ThemeName } })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {themeNames.map((theme) => (
                      <SelectItem key={theme} value={theme}>
                        {themes[theme].name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Opacity ({(config.appearance.opacity * 100).toFixed(0)}%)</Label>
                <Slider
                  value={config.appearance.opacity}
                  onValueChange={(value) => updateConfig({ appearance: { ...config.appearance, opacity: value } })}
                  min={0.1}
                  max={1}
                  step={0.05}
                />
              </div>

              <div className="space-y-2">
                <Label>Blur ({config.appearance.blur}px)</Label>
                <Slider
                  value={config.appearance.blur}
                  onValueChange={(value) => updateConfig({ appearance: { ...config.appearance, blur: value } })}
                  min={0}
                  max={20}
                  step={1}
                />
              </div>

              {config.appearance.theme === 'custom' && (
                <div className="space-y-4 pt-4 border-t">
                  <Label className="text-sm font-semibold">Custom Colors</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(themes.custom.colors).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <Label className="text-xs capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                        <ColorPicker
                          value={config.appearance.customColors?.[key as keyof typeof themes.custom.colors] || value}
                          onChange={(color) => updateConfig({
                            appearance: {
                              ...config.appearance,
                              customColors: { ...config.appearance.customColors, [key]: color }
                            }
                          })}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fonts" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Fonts</CardTitle>
              <CardDescription>Configure font family, size, and style</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Font Family</Label>
                <Select
                  value={config.font.family}
                  onValueChange={(value) => updateConfig({ font: { ...config.font, family: value } })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JetBrains Mono">JetBrains Mono</SelectItem>
                    <SelectItem value="Fira Code">Fira Code</SelectItem>
                    <SelectItem value="Source Code Pro">Source Code Pro</SelectItem>
                    <SelectItem value="Hack">Hack</SelectItem>
                    <SelectItem value="Monaco">Monaco</SelectItem>
                    <SelectItem value="Menlo">Menlo</SelectItem>
                    <SelectItem value="Consolas">Consolas</SelectItem>
                    <SelectItem value="SF Mono">SF Mono</SelectItem>
                    <SelectItem value="Cascadia Code">Cascadia Code</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Font Size ({config.font.size}px)</Label>
                <Slider
                  value={config.font.size}
                  onValueChange={(value) => updateConfig({ font: { ...config.font, size: value } })}
                  min={8}
                  max={32}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <Label>Font Weight</Label>
                <Select
                  value={config.font.weight}
                  onValueChange={(value) => updateConfig({ font: { ...config.font, weight: value as any } })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">Thin (100)</SelectItem>
                    <SelectItem value="200">Extra Light (200)</SelectItem>
                    <SelectItem value="300">Light (300)</SelectItem>
                    <SelectItem value="400">Normal (400)</SelectItem>
                    <SelectItem value="500">Medium (500)</SelectItem>
                    <SelectItem value="600">Semi Bold (600)</SelectItem>
                    <SelectItem value="700">Bold (700)</SelectItem>
                    <SelectItem value="800">Extra Bold (800)</SelectItem>
                    <SelectItem value="900">Black (900)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label>Ligatures</Label>
                <Switch
                  checked={config.font.ligatures}
                  onCheckedChange={(checked) => updateConfig({ font: { ...config.font, ligatures: checked } })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="window" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Window</CardTitle>
              <CardDescription>Configure window dimensions and decorations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Width ({config.window.width} chars)</Label>
                  <Slider
                    value={config.window.width}
                    onValueChange={(value) => updateConfig({ window: { ...config.window, width: value } })}
                    min={40}
                    max={200}
                    step={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Height ({config.window.height} rows)</Label>
                  <Slider
                    value={config.window.height}
                    onValueChange={(value) => updateConfig({ window: { ...config.window, height: value } })}
                    min={10}
                    max={100}
                    step={1}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Padding X ({config.window.paddingX}px)</Label>
                  <Slider
                    value={config.window.paddingX}
                    onValueChange={(value) => updateConfig({ window: { ...config.window, paddingX: value } })}
                    min={0}
                    max={32}
                    step={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Padding Y ({config.window.paddingY}px)</Label>
                  <Slider
                    value={config.window.paddingY}
                    onValueChange={(value) => updateConfig({ window: { ...config.window, paddingY: value } })}
                    min={0}
                  max={32}
                    step={1}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label>Window Decorations</Label>
                <Switch
                  checked={config.window.decorations}
                  onCheckedChange={(checked) => updateConfig({ window: { ...config.window, decorations: checked } })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cursor" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Cursor</CardTitle>
              <CardDescription>Configure cursor appearance and behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Cursor Style</Label>
                <Select
                  value={config.cursor.style}
                  onValueChange={(value) => updateConfig({ cursor: { ...config.cursor, style: value as CursorStyle } })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="block">Block</SelectItem>
                    <SelectItem value="underline">Underline</SelectItem>
                    <SelectItem value="beam">Beam</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Cursor Color</Label>
                <ColorPicker
                  value={config.cursor.color}
                  onChange={(color) => updateConfig({ cursor: { ...config.cursor, color } })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Blinking</Label>
                <Switch
                  checked={config.cursor.blinking}
                  onCheckedChange={(checked) => updateConfig({ cursor: { ...config.cursor, blinking: checked } })}
                />
              </div>

              {config.cursor.blinking && (
                <div className="space-y-2">
                  <Label>Blink Rate ({config.cursor.blinkRate}ms)</Label>
                  <Slider
                    value={config.cursor.blinkRate}
                    onValueChange={(value) => updateConfig({ cursor: { ...config.cursor, blinkRate: value } })}
                    min={100}
                    max={2000}
                    step={50}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shell" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Shell</CardTitle>
              <CardDescription>Configure shell program and environment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Shell Program</Label>
                <Input
                  value={config.shell.program}
                  onChange={(e) => updateConfig({ shell: { ...config.shell, program: e.target.value } })}
                  placeholder="/bin/zsh"
                />
              </div>

              <div className="space-y-2">
                <Label>Arguments (comma separated)</Label>
                <Input
                  value={config.shell.args.join(', ')}
                  onChange={(e) => updateConfig({
                    shell: {
                      ...config.shell,
                      args: e.target.value.split(',').map(a => a.trim()).filter(Boolean)
                    }
                  })}
                  placeholder="-l"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Advanced</CardTitle>
              <CardDescription>Advanced configuration options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Scrollback Size ({config.advanced.scrollbackSize} lines)</Label>
                <Slider
                  value={config.advanced.scrollbackSize}
                  onValueChange={(value) => updateConfig({ advanced: { ...config.advanced, scrollbackSize: value } })}
                  min={100}
                  max={100000}
                  step={100}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Copy on Select</Label>
                  <Switch
                    checked={config.advanced.copyOnSelect}
                    onCheckedChange={(checked) => updateConfig({ advanced: { ...config.advanced, copyOnSelect: checked } })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Audible Bell</Label>
                  <Switch
                    checked={config.advanced.audibleBell}
                    onCheckedChange={(checked) => updateConfig({ advanced: { ...config.advanced, audibleBell: checked } })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Confirm on Close</Label>
                  <Switch
                    checked={config.advanced.confirmClose}
                    onCheckedChange={(checked) => updateConfig({ advanced: { ...config.advanced, confirmClose: checked } })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
