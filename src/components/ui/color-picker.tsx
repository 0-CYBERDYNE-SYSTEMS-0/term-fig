import * as React from "react"
import { HexColorPicker } from "react-colorful"
import { cn } from "../../lib/utils"

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  ({ value, onChange, className }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)}>
        <HexColorPicker
          color={value}
          onChange={onChange}
          style={{ width: '100%', height: '200px' }}
        />
        <div className="flex items-center gap-2">
          <div
            className="h-8 w-8 rounded border border-input"
            style={{ backgroundColor: value }}
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      </div>
    );
  }
);
ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
