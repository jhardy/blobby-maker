import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import {
  PanelControl,
  type PanelTypes,
} from "~/components/controls/panel-control";
import { useState } from "react";
import { PanelPane } from "~/components/panels/panel";
import {
  colorSwatches,
  eyeComponents,
  hatComponents,
  mouthComponents,
} from "~/data/panel-data";
import { BlobbyPreview } from "~/components/blobby-preview";

export const Welcome = () => {
  const [activePanel, setActivePanel] = useState<PanelTypes>("color");

  const [activeColor, setActiveColor] = useState(0);
  const [activeEye, setActiveEye] = useState(0);
  const [activeMouth, setActiveMouth] = useState(0);
  const [activeHat, setActiveHat] = useState(0);

  const handlePanelChange = (panel: PanelTypes) => {
    setActivePanel(panel);
  };
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-row items-start gap-16 min-h-0 builder-wrapper">
        <div className="panels">
          <PanelControl
            onPanelChange={handlePanelChange}
            activePanel={activePanel}
          />

          <PanelPane
            options={colorSwatches}
            className="color-options"
            isActive={activePanel === "color"}
            activeChildrenIndex={activeColor}
            handleOptionSelect={setActiveColor}
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
        </div>
        <BlobbyPreview
          colorIndex={activeColor}
          eyeIndex={activeEye}
          mouthIndex={activeMouth}
          hatIndex={activeHat}
        />
      </div>
    </main>
  );
};
