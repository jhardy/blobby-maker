import React from "react";
import { blobbySwatchNames } from "~/data/panel-data";
import { hatConfigs, hatNames } from "~/data/hat-configs";
import { JoystickControl } from "./JoystickControl";
import { IconSpacingHorizontal } from "./icons/spacing-horizontal";
import { IconSpacingVertical } from "./icons/spacing-vertical";
import { IconRotate } from "./icons/rotate";
import { ColorPickerSwatch } from "./color-picker-swatch";
import type { PositionedCustomItem } from "./custom-overlay";
import { DownloadButton } from "./download-button";

type BlobbyControlsProps = {
  colorIndex: number;
  hatIndex: number;
  eyeSpace: number;
  mouthSpace: number;
  faceRotation: number;
  facePos: { x: number; y: number };
  hatColors: Record<string, string>;
  onColorChange?: (index: number) => void;
  onEyeSpaceChange: (value: number) => void;
  onMouthSpaceChange: (value: number) => void;
  onFaceRotationChange: (value: number) => void;
  onFacePosChange: (x: number, y: number) => void;
  onHatColorChange: (cssVar: string, value: string) => void;
  // Custom item controls
  activeCustomItem?: PositionedCustomItem | null;
  onCustomPositionChange?: (x: number, y: number) => void;
  onCustomScaleChange?: (scale: number) => void;
  onCustomRotationChange?: (rotation: number) => void;
  onRemoveCustomItem?: (id: string) => void;
};

export const BlobbyControls = ({
  colorIndex,
  hatIndex,
  eyeSpace,
  mouthSpace,
  faceRotation,
  facePos,
  hatColors,
  onColorChange,
  onEyeSpaceChange,
  onMouthSpaceChange,
  onFaceRotationChange,
  onFacePosChange,
  onHatColorChange,
  activeCustomItem,
  onCustomPositionChange,
  onCustomScaleChange,
  onCustomRotationChange,
  onRemoveCustomItem,
}: BlobbyControlsProps) => {
  return (
    <div className="control-items">
      <div className="customize-section">
        <h3>Face</h3>
        <div className="face-controls">
          <div className="eye-mouth-controls">
            <label>
              <span className="control-label">
                <IconSpacingHorizontal />
              </span>
              <input
                type="range"
                min={0}
                max={60}
                value={eyeSpace}
                onChange={(e) => onEyeSpaceChange(Number(e.target.value))}
              />
            </label>
            <br />
            <label>
              <span className="control-label">
                <IconSpacingVertical />
              </span>
              <input
                type="range"
                min={0}
                max={20}
                value={mouthSpace}
                onChange={(e) => onMouthSpaceChange(Number(e.target.value))}
              />
            </label>
            <br />
            <label>
              <span className="control-label">
                <IconRotate />
              </span>
              <input
                type="range"
                min={-180}
                max={180}
                value={faceRotation}
                onChange={(e) => onFaceRotationChange(Number(e.target.value))}
              />
            </label>
          </div>
          <JoystickControl
            radius={40}
            knobRadius={8}
            onChange={(x, y) => onFacePosChange(x, y)}
          />
        </div>
      </div>

      {/* Custom Item Controls */}
      {activeCustomItem && (
        <div className="customize-section">
          <h3>
            Custom Item
            <button
              className="remove-custom-btn"
              onClick={() => onRemoveCustomItem?.(activeCustomItem.id)}
              aria-label="Remove custom item"
            >
              ×
            </button>
          </h3>
          <div className="face-controls">
            <div className="eye-mouth-controls">
              <label>
                <span className="control-label">
                  <IconSpacingHorizontal />
                </span>
                <input
                  type="range"
                  min={0.5}
                  max={2}
                  step={0.1}
                  value={activeCustomItem.scale}
                  onChange={(e) =>
                    onCustomScaleChange?.(Number(e.target.value))
                  }
                />
              </label>
              <br />
              <label>
                <span className="control-label">
                  <IconRotate />
                </span>
                <input
                  type="range"
                  min={-180}
                  max={180}
                  step={5}
                  value={activeCustomItem.rotation}
                  onChange={(e) =>
                    onCustomRotationChange?.(Number(e.target.value))
                  }
                />
              </label>
            </div>
            <JoystickControl
              radius={40}
              knobRadius={8}
              value={activeCustomItem.position}
              onChange={(x, y) => onCustomPositionChange?.(x, y)}
            />
          </div>
        </div>
      )}

      <div className="customize-section">
        <h3>Body</h3>
        <div className="color-controls">
          {blobbySwatchNames.map((color, index) => {
            return (
              <button
                className={`swatch ${color} ${
                  colorIndex === index ? "active" : ""
                }`}
                key={`body-color${index}`}
                onClick={() => onColorChange?.(index)}
                type="button"
                aria-label={`Select ${color} color`}
              />
            );
          })}
        </div>
      </div>

      {/* Hat Color Controls */}
      {hatIndex > 0 && (
        <div className="customize-section">
          <h3>Hat</h3>
          <div className="color-controls">
            {hatConfigs[hatNames[hatIndex]]?.colors.map((color) => (
              <ColorPickerSwatch
                key={color.cssVar}
                id={`hat-color-${color.cssVar}`}
                color={hatColors[color.cssVar] || color.default}
                onChange={(value) => onHatColorChange(color.cssVar, value)}
                label={color.name}
              />
            ))}
          </div>
        </div>
      )}

      <div className="customize-section">
        <DownloadButton />
      </div>
    </div>
  );
};
