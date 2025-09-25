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
import { DownloadButton } from "~/components/download-button";
import { UploadButton, type UploadType } from "~/components/upload-button";
import { getCustomItemsManager, type CustomItem } from "~/utils/custom-items-manager";
import { CustomImage } from "~/components/custom-image";
import { CustomPanel } from "~/components/custom-panel";
import { type PositionedCustomItem } from "~/components/custom-overlay";

export const Welcome = () => {
  const [activePanel, setActivePanel] = useState<PanelTypes>("eyes");
  const [customItems, setCustomItems] = useState<Record<UploadType, CustomItem[]>>({
    eyes: [],
    mouths: [],
    hats: [],
    features: [],
    custom: [],
  });
  const [activeCustomEye, setActiveCustomEye] = useState<CustomItem | null>(null);
  const [activeCustomMouth, setActiveCustomMouth] = useState<CustomItem | null>(null);
  const [activeCustomHat, setActiveCustomHat] = useState<CustomItem | null>(null);
  const [positionedCustomItems, setPositionedCustomItems] = useState<PositionedCustomItem[]>([]);
  const [activeCustomItemId, setActiveCustomItemId] = useState<string | null>(null);

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

  // Load custom items on mount
  useEffect(() => {
    const manager = getCustomItemsManager();
    setCustomItems({
      eyes: manager.getItemsByType("eyes"),
      mouths: manager.getItemsByType("mouths"),
      hats: manager.getItemsByType("hats"),
      features: manager.getItemsByType("features"),
      custom: manager.getItemsByType("custom"),
    });
  }, []);

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

  const handleUpload = async (file: File, type: UploadType) => {
    const manager = getCustomItemsManager();
    const newItem = await manager.addItem(file, type);

    setCustomItems(prev => ({
      ...prev,
      [type]: [newItem, ...prev[type]],
    }));
  };

  const handleCustomItemSelect = (item: CustomItem) => {
    switch (item.type) {
      case "eyes":
        setActiveCustomEye(item);
        setActiveEye(-1); // Deselect regular eye
        break;
      case "mouths":
        setActiveCustomMouth(item);
        setActiveMouth(-1); // Deselect regular mouth
        break;
      case "hats":
        setActiveCustomHat(item);
        setActiveHat(-1); // Deselect regular hat
        break;
      case "custom":
        // Add as positioned item
        const newItem: PositionedCustomItem = {
          id: `positioned-${Date.now()}`,
          dataUrl: item.dataUrl,
          position: { x: 0, y: 0 },
          scale: 1,
          rotation: 0,
        };
        setPositionedCustomItems(prev => [...prev, newItem]);
        setActiveCustomItemId(newItem.id);
        break;
    }
  };

  const handleCustomPositionChange = (x: number, y: number) => {
    if (!activeCustomItemId) return;
    setPositionedCustomItems(prev =>
      prev.map(item =>
        item.id === activeCustomItemId
          ? { ...item, position: { x, y } }
          : item
      )
    );
  };

  const handleCustomScaleChange = (scale: number) => {
    if (!activeCustomItemId) return;
    setPositionedCustomItems(prev =>
      prev.map(item =>
        item.id === activeCustomItemId
          ? { ...item, scale }
          : item
      )
    );
  };

  const handleCustomRotationChange = (rotation: number) => {
    if (!activeCustomItemId) return;
    setPositionedCustomItems(prev =>
      prev.map(item =>
        item.id === activeCustomItemId
          ? { ...item, rotation }
          : item
      )
    );
  };

  const handleRemoveCustomItem = (id: string) => {
    setPositionedCustomItems(prev => prev.filter(item => item.id !== id));
    setActiveCustomItemId(null);
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
            customEye={activeCustomEye}
            customMouth={activeCustomMouth}
            customHat={activeCustomHat}
            positionedCustomItems={positionedCustomItems}
            activeCustomItemId={activeCustomItemId}
            onCustomItemClick={setActiveCustomItemId}
          />
          <DownloadButton />
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
              handleOptionSelect={(index) => {
                setActiveEye(index);
                setActiveCustomEye(null);
              }}
              customItems={customItems.eyes}
              onCustomItemSelect={handleCustomItemSelect}
              extraButtons={
                <UploadButton
                  onUpload={handleUpload}
                  activeType="eyes"
                  className="option-button upload-option"
                />
              }
            />

            <PanelPane
              options={mouthComponents}
              className="mouth-options"
              isActive={activePanel === "mouths"}
              activeChildrenIndex={activeMouth}
              handleOptionSelect={(index) => {
                setActiveMouth(index);
                setActiveCustomMouth(null);
              }}
              customItems={customItems.mouths}
              onCustomItemSelect={handleCustomItemSelect}
              extraButtons={
                <UploadButton
                  onUpload={handleUpload}
                  activeType="mouths"
                  className="option-button upload-option"
                />
              }
            />
            <PanelPane
              options={hatComponents}
              className="hat-options"
              isActive={activePanel === "hats"}
              handleOptionSelect={(index) => {
                setActiveHat(index);
                setActiveCustomHat(null);
              }}
              activeChildrenIndex={activeHat}
              customItems={customItems.hats}
              onCustomItemSelect={handleCustomItemSelect}
              extraButtons={
                <UploadButton
                  onUpload={handleUpload}
                  activeType="hats"
                  className="option-button upload-option"
                />
              }
            />

            <CustomPanel
              isActive={activePanel === "custom"}
              customItems={customItems.custom}
              positionedItems={positionedCustomItems}
              onUpload={async (file) => {
                await handleUpload(file, "custom");
              }}
              onItemSelect={handleCustomItemSelect}
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
          activeCustomItem={positionedCustomItems.find(item => item.id === activeCustomItemId) || null}
          onCustomPositionChange={handleCustomPositionChange}
          onCustomScaleChange={handleCustomScaleChange}
          onCustomRotationChange={handleCustomRotationChange}
          onRemoveCustomItem={handleRemoveCustomItem}
        />
      </div>
    </main>
  );
};
