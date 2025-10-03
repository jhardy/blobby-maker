import {
  colorSwatches,
  eyeComponents,
  mouthComponents,
  faceFeatureComponents,
} from "~/data/panel-data";
import React from "react";
import { BlobbyHats } from "./blobby-hats";
import { CustomImage } from "./custom-image";
import type { CustomItem } from "~/utils/custom-items-manager";
import { CustomOverlay, type PositionedCustomItem } from "./custom-overlay";

type BlobbyPreviewProps = {
  colorIndex: number;
  eyeIndex: number;
  mouthIndex: number;
  hatIndex: number;
  faceFeatureIndex?: number;
  eyeSpace?: number;
  mouthSpace?: number;
  faceRotation?: number;
  facePos?: { x: number; y: number };
  hatColors?: Record<string, string>;
  customEye?: CustomItem | null;
  customMouth?: CustomItem | null;
  customHat?: CustomItem | null;
  positionedCustomItems?: PositionedCustomItem[];
  activeCustomItemId?: string | null;
  onCustomItemClick?: (id: string) => void;
};

export const BlobbyPreview = ({
  colorIndex,
  eyeIndex,
  mouthIndex,
  hatIndex,
  faceFeatureIndex = 0,
  eyeSpace = 40,
  mouthSpace = 0,
  faceRotation = 0,
  facePos = { x: 0, y: 0 },
  hatColors = {},
  customEye = null,
  customMouth = null,
  customHat = null,
  positionedCustomItems = [],
  activeCustomItemId = null,
  onCustomItemClick,
}: BlobbyPreviewProps) => {
  const faceStyle: React.CSSProperties = {
    ["--eye-space" as any]: `${eyeSpace}px`,
    ["--mouth-space" as any]: `${mouthSpace}px`,
    ["--face-rotation" as any]: `${faceRotation}deg`,
    ["--face-x" as any]: `${facePos.x * 40}px`, // adjust 40px as max offset
    ["--face-y" as any]: `${facePos.y * 40}px`,
  };

  const wrapperStyle: React.CSSProperties & Record<string, any> = {
    ...Object.entries(hatColors).reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, any>
    ),
  };

  return (
    <div className="preview-wrapper">
      <div className="blobby-preview" style={wrapperStyle}>
        <div className="color">{colorSwatches[colorIndex]}</div>
        <div className="face" style={faceStyle}>
          {faceFeatureComponents[faceFeatureIndex]}
          {customEye ? (
            <div className="eyes custom-eyes">
              <CustomImage dataUrl={customEye.dataUrl} size={60} />
            </div>
          ) : (
            eyeIndex >= 0 && eyeComponents[eyeIndex]
          )}
          {customMouth ? (
            <div className="mouth custom-mouth">
              <CustomImage dataUrl={customMouth.dataUrl} size={40} />
            </div>
          ) : (
            mouthIndex >= 0 && mouthComponents[mouthIndex]
          )}
        </div>
        {/* Hat is now handled by BlobbyHats or custom hat */}
        {customHat ? (
          <div className="hat-wrapper custom-hat-wrapper">
            <CustomImage dataUrl={customHat.dataUrl} size={100} />
          </div>
        ) : (
          <BlobbyHats
            hatIndex={hatIndex}
            hatColors={hatColors}
            hatFlipped={false}
          />
        )}

        {/* Custom positioned overlay items */}
        <CustomOverlay
          items={positionedCustomItems}
          activeItemId={activeCustomItemId}
          onItemClick={onCustomItemClick}
        />
      </div>
    </div>
  );
};
