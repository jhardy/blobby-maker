import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import {
  PanelControl,
  type PanelTypes,
} from "~/components/controls/panel-control";
import { useState, useEffect } from "react";
import { PanelPane } from "~/components/panels/panel";
import {
  eyeComponents,
  hatComponents,
  mouthComponents,
  faceFeatureComponents,
} from "~/data/panel-data";
import { BlobbyPreview } from "~/components/blobby-preview";
import { BlobbyControls } from "~/components/blobby-controls";
import { hatConfigs, hatNames } from "~/data/hat-configs";

export const Welcome = () => {
  const [activePanel, setActivePanel] = useState<PanelTypes>("eyes");

  const [activeColor, setActiveColor] = useState(0);
  const [activeEye, setActiveEye] = useState(0);
  const [activeMouth, setActiveMouth] = useState(0);
  const [activeHat, setActiveHat] = useState(0);
  const [activeFaceFeature, setActiveFaceFeature] = useState(0);

  // Control states
  const [eyeSpace, setEyeSpace] = useState(40);
  const [mouthSpace, setMouthSpace] = useState(4);
  const [faceRotation, setFaceRotation] = useState(0);
  const [facePos, setFacePos] = useState({ x: 0, y: 0 });
  const [hatColors, setHatColors] = useState<Record<string, string>>({});

  // Initialize hat colors when hat changes
  useEffect(() => {
    const hatName = hatNames[activeHat];
    const config = hatConfigs[hatName];
    if (config) {
      const initialColors: Record<string, string> = {};
      config.colors.forEach((color) => {
        initialColors[color.cssVar] = color.default;
      });
      setHatColors(initialColors);
    }
  }, [activeHat]);

  const handlePanelChange = (panel: PanelTypes) => {
    setActivePanel(panel);
  };

  const handleHatColorChange = (cssVar: string, value: string) => {
    setHatColors((prev) => ({ ...prev, [cssVar]: value }));
  };
  return (
    <main className="flex items-center justify-center pb-4">
      <div className="flex-1 flex flex-row items-start gap-8 min-h-0 builder-wrapper">
        <div className="preview-and-panels">
          <BlobbyPreview
            colorIndex={activeColor}
            eyeIndex={activeEye}
            mouthIndex={activeMouth}
            hatIndex={activeHat}
            faceFeatureIndex={activeFaceFeature}
            eyeSpace={eyeSpace}
            mouthSpace={mouthSpace}
            faceRotation={faceRotation}
            facePos={facePos}
            hatColors={hatColors}
          />
          <div className="panels">
            <PanelControl
              onPanelChange={handlePanelChange}
              activePanel={activePanel}
            />

            <PanelPane
              options={eyeComponents}
              className="eye-options"
              isActive={activePanel === "eyes"}
              activeChildrenIndex={activeEye}
              handleOptionSelect={setActiveEye}
            />

            <PanelPane
              options={mouthComponents}
              className="mouth-options"
              isActive={activePanel === "mouths"}
              activeChildrenIndex={activeMouth}
              handleOptionSelect={setActiveMouth}
            />
            <PanelPane
              options={hatComponents}
              className="hat-options"
              isActive={activePanel === "hats"}
              handleOptionSelect={setActiveHat}
              activeChildrenIndex={activeHat}
            />
            {/* <PanelPane
              options={faceFeatureComponents}
              className="face-feature-options"
              isActive={activePanel === "features"}
              handleOptionSelect={setActiveFaceFeature}
              activeChildrenIndex={activeFaceFeature}
            /> */}
          </div>
        </div>

        <BlobbyControls
          colorIndex={activeColor}
          hatIndex={activeHat}
          eyeSpace={eyeSpace}
          mouthSpace={mouthSpace}
          faceRotation={faceRotation}
          facePos={facePos}
          hatColors={hatColors}
          onColorChange={setActiveColor}
          onEyeSpaceChange={setEyeSpace}
          onMouthSpaceChange={setMouthSpace}
          onFaceRotationChange={setFaceRotation}
          onFacePosChange={(x, y) => setFacePos({ x, y })}
          onHatColorChange={handleHatColorChange}
        />
      </div>
    </main>
  );
};
