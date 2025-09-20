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
  // const wrapperStyle: React.CSSProperties & Record<string, any> = {
  //   ...Object.entries(hatColors).reduce((acc, [key, value]) => {
  //     acc[key] = value;
  //     return acc;
  //   }, {} as Record<string, any>),
  // };

  return (
    <div className={`hat-wrapper ${hatName}`} tabIndex={0}>
      {hatComponents[hatIndex]}
    </div>
  );
};
