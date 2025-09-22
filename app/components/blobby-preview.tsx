import {
  colorSwatches,
  eyeComponents,
  mouthComponents,
  faceFeatureComponents,
} from "~/data/panel-data";
import React from "react";
import { BlobbyHats } from "./blobby-hats";

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
          {/* {faceFeatureComponents[faceFeatureIndex]} */}
          {eyeComponents[eyeIndex]}
          {mouthComponents[mouthIndex]}
        </div>
        {/* Hat is now handled by BlobbyHats */}
        <BlobbyHats
          hatIndex={hatIndex}
          hatColors={hatColors}
          hatFlipped={false}
        />
      </div>
    </div>
  );
};
