import {
  colorSwatches,
  eyeComponents,
  mouthComponents,
  hatComponents,
} from "~/data/panel-data";
import React, { useState } from "react";
import { JoystickControl } from "./JoystickControl";
import { BlobbyHats } from "./blobby-hats";
import { IconSpacingHorizontal } from "./icons/spacing-horizontal";
import { IconSpacingVertical } from "./icons/spacing-vertical";
import { IconRotate } from "./icons/rotate";

type ActiveBlobbyProps = {
  colorIndex: number;
  eyeIndex: number;
  mouthIndex: number;
  hatIndex: number;
};

export const BlobbyPreview = ({
  colorIndex,
  eyeIndex,
  mouthIndex,
  hatIndex,
}: ActiveBlobbyProps) => {
  const [eyeSpace, setEyeSpace] = useState(40);
  const [mouthSpace, setMouthSpace] = useState(0);
  const [faceRotation, setFaceRotation] = useState(0);

  const [facePos, setFacePos] = useState({ x: 0, y: 0 }); // normalized -1..1

  const faceStyle: React.CSSProperties = {
    ["--eye-space" as any]: `${eyeSpace}px`,
    ["--mouth-space" as any]: `${mouthSpace}px`,
    ["--face-rotation" as any]: `${faceRotation}deg`,
    ["--face-x" as any]: `${facePos.x * 40}px`, // adjust 40px as max offset
    ["--face-y" as any]: `${facePos.y * 40}px`,
  };

  return (
    <div className="blobby-maker-controls">
      <div className="blobby-preview">
        <div className="color">{colorSwatches[colorIndex]}</div>
        <div className="face" style={faceStyle}>
          {eyeComponents[eyeIndex]}
          {mouthComponents[mouthIndex]}
        </div>
        {/* Hat is now handled by BlobbyHats */}
        <BlobbyHats hatIndex={hatIndex} />
      </div>
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
              onChange={(e) => setEyeSpace(Number(e.target.value))}
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
              max={40}
              value={mouthSpace}
              onChange={(e) => setMouthSpace(Number(e.target.value))}
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
              onChange={(e) => setFaceRotation(Number(e.target.value))}
            />
          </label>
        </div>
        <JoystickControl
          radius={40}
          knobRadius={8}
          onChange={(x, y) => setFacePos({ x, y })}
        />
      </div>
    </div>
  );
};
