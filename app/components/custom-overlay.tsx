import React from "react";
import { CustomImage } from "./custom-image";

export interface PositionedCustomItem {
  id: string;
  dataUrl: string;
  position: { x: number; y: number };
  scale: number;
  rotation: number;
}

interface CustomOverlayProps {
  items: PositionedCustomItem[];
  activeItemId?: string | null;
  onItemClick?: (id: string) => void;
}

export const CustomOverlay: React.FC<CustomOverlayProps> = ({
  items,
  activeItemId,
  onItemClick,
}) => {
  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className={`custom-overlay-item ${
            activeItemId === item.id ? "active" : ""
          }`}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `
              translate(calc(-50% + ${item.position.x * 75}px), calc(-50% + ${item.position.y * 75}px))
              rotate(${item.rotation}deg)
              scale(${item.scale})
            `,
            cursor: onItemClick ? "pointer" : "default",
            zIndex: 10,
          }}
          onClick={() => onItemClick?.(item.id)}
        >
          <CustomImage dataUrl={item.dataUrl} size={60} />
        </div>
      ))}
    </>
  );
};