import React from "react";
import { UploadButton } from "./upload-button";
import { CustomImage } from "./custom-image";
import type { CustomItem } from "~/utils/custom-items-manager";
import type { PositionedCustomItem } from "./custom-overlay";

interface CustomPanelProps {
  isActive: boolean;
  customItems: CustomItem[];
  positionedItems: PositionedCustomItem[];
  onUpload: (file: File) => void;
  onItemSelect: (item: CustomItem) => void;
}

export const CustomPanel: React.FC<CustomPanelProps> = ({
  isActive,
  customItems,
  positionedItems,
  onUpload,
  onItemSelect,
}) => {

  return (
    <div className={`panel ${isActive ? "active" : ""}`}>
      <UploadButton
        onUpload={(file) => onUpload(file)}
        activeType="custom"
        className="option-button upload-option"
      />
      {customItems.map((item) => (
        <button
          key={item.id}
          className="option-button custom-option"
          aria-pressed={positionedItems.some(p => p.dataUrl === item.dataUrl)}
          onClick={() => onItemSelect(item)}
        >
          <CustomImage dataUrl={item.dataUrl} size={24} />
        </button>
      ))}
    </div>
  );
};