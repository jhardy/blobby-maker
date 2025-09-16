export type PanelTypes = "color" | "eyes" | "mouths" | "hats";

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
        onClick={() => handleButtonClick("color")}
        aria-selected={activePanel === "color"}
      >
        Color
      </button>
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
    </div>
  );
};
