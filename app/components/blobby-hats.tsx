import React, { useRef, useState } from "react";
import { hatComponents } from "~/data/panel-data";
import { hatNames } from "~/data/hat-configs";

type BlobbyHatsProps = {
  hatIndex: number;
  hatColors?: Record<string, string>;
};

export const BlobbyHats: React.FC<BlobbyHatsProps> = ({
  hatIndex,
  hatColors = {},
}) => {
  const hatName = hatNames[hatIndex] || "";
  // Merge hat colors into style
  const wrapperStyle: React.CSSProperties = {
    ...Object.entries(hatColors).reduce((acc, [key, value]) => {
      acc[key as any] = value;
      return acc;
    }, {} as React.CSSProperties),
  };

  return (
    <div className={`hat-wrapper ${hatName}`} style={wrapperStyle} tabIndex={0}>
      {hatComponents[hatIndex]}
    </div>
  );
};
