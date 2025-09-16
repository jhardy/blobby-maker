import type { JSX } from "react";

export const PanelPane = ({
  options,
  className,
  isActive,
  activeChildrenIndex,
  handleOptionSelect,
}: {
  options: JSX.Element[];
  className: string;
  isActive?: boolean;
  activeChildrenIndex: number;
  handleOptionSelect: (index: number) => void;
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
    </div>
  );
};
