export type PanelTypes = "eyes" | "mouths" | "hats" | "features" | "custom";

export const PanelControl = ({
  onPanelChange,
  activePanel,
}: {
  onPanelChange: (panel: PanelTypes) => void;
  activePanel: PanelTypes;
}) => {
  const handleButtonClick = (panel: PanelTypes) => {
    onPanelChange(panel);
  };
  return (
    <div className="panel-control">
      <button
        onClick={() => handleButtonClick("eyes")}
        aria-selected={activePanel === "eyes"}
      >
        Eyes
      </button>
      <button
        onClick={() => handleButtonClick("mouths")}
        aria-selected={activePanel === "mouths"}
      >
        Mouths
      </button>
      <button
        onClick={() => handleButtonClick("hats")}
        aria-selected={activePanel === "hats"}
      >
        Hats
      </button>
      {/* <button
        onClick={() => handleButtonClick("custom")}
        aria-selected={activePanel === "custom"}
      >
        Custom
      </button> */}
      <button
        onClick={() => handleButtonClick("features")}
        aria-selected={activePanel === "features"}
      >
        Features
      </button>
    </div>
  );
};
