import React, { useRef } from "react";
import { HexColorPicker } from "react-colorful";

type ColorPickerSwatchProps = {
  id: string;
  color: string;
  onChange: (color: string) => void;
  label?: string;
};

export const ColorPickerSwatch = ({
  id,
  color,
  onChange,
  label,
}: ColorPickerSwatchProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  return (
    <div className="color-control">
      <div className="color-picker-wrapper">
        <button
          id={`${id}-button`}
          className="swatch-button"
          style={{ anchorName: `--${id}` } as React.CSSProperties}
          popoverTarget={`${id}-popover`}
          type="button"
          aria-label={label}
        >
          <div className="swatch" style={{ backgroundColor: color }} />
        </button>

        <div
          id={`${id}-popover`}
          className="color-popover"
          popover="auto"
          style={{ positionAnchor: `--${id}` } as React.CSSProperties}
          ref={popoverRef}
        >
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};
