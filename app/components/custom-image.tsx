import React from "react";

interface CustomImageProps {
  dataUrl: string;
  size?: number;
  className?: string;
}

export const CustomImage: React.FC<CustomImageProps> = ({
  dataUrl,
  size = 40,
  className = "",
}) => {
  return (
    <div
      className={`custom-image-wrapper ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: "relative",
      }}
    >
      <img
        src={dataUrl}
        alt="Custom uploaded item"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
};