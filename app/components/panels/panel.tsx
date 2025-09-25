import type { JSX } from "react";
import { CustomImage } from "../custom-image";
import type { CustomItem } from "~/utils/custom-items-manager";

export const PanelPane = ({
  options,
  className,
  isActive,
  activeChildrenIndex,
  handleOptionSelect,
  customItems = [],
  onCustomItemSelect,
  extraButtons,
}: {
  options: JSX.Element[];
  className: string;
  isActive?: boolean;
  activeChildrenIndex: number;
  handleOptionSelect: (index: number) => void;
  customItems?: CustomItem[];
  onCustomItemSelect?: (item: CustomItem) => void;
  extraButtons?: JSX.Element;
}) => {
  return (
    <div className={`panel ${className} ${isActive ? "active" : ""}`}>
      {options.map((item, index) => (
        <button
          key={`${className}-${index}`}
          className="option-button"
          aria-pressed={activeChildrenIndex === index}
          onClick={() => handleOptionSelect(index)}
        >
          {item}
        </button>
      ))}
      {customItems.map((item) => (
        <button
          key={item.id}
          className="option-button custom-option"
          aria-pressed={false}
          onClick={() => onCustomItemSelect?.(item)}
        >
          <CustomImage dataUrl={item.dataUrl} size={24} />
        </button>
      ))}
      {extraButtons}
    </div>
  );
};
