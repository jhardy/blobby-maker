import React, { useRef, useState } from "react";
import { hatComponents } from "~/data/panel-data";

type BlobbyHatsProps = {
  hatIndex: number;
};

export const BlobbyHats: React.FC<BlobbyHatsProps> = ({ hatIndex }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState(false);
  const [scaling, setScaling] = useState(false);
  const [scale, setScale] = useState(1);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const mouseStart = useRef<{ x: number; y: number } | null>(null);
  const scaleStart = useRef<{ scale: number; x: number; y: number } | null>(
    null
  );

  const onMouseDown = (e: React.MouseEvent) => {
    // Only drag if not clicking the resize handle
    if ((e.target as HTMLElement).classList.contains("resize-handle")) return;
    setSelected(true);
    setDragging(true);
    dragStart.current = { ...pos };
    mouseStart.current = { x: e.clientX, y: e.clientY };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };
  // Click outside to deselect
  React.useEffect(() => {
    if (!selected) return;
    const onDocClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".draggable-hat")) {
        setSelected(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [selected]);
  // Resize logic
  const onResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScaling(true);
    scaleStart.current = { scale, x: e.clientX, y: e.clientY };
    window.addEventListener("mousemove", onResizeMouseMove);
    window.addEventListener("mouseup", onResizeMouseUp);
  };

  const onResizeMouseMove = (e: MouseEvent) => {
    if (!scaleStart.current) return;
    const { scale: startScale, x: startX, y: startY } = scaleStart.current;
    // Use distance from start as scale factor (simple, can be improved)
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    // Use average of dx/dy for uniform scaling
    let delta = (dx + dy) / 200; // 200px drag = double size
    let newScale = Math.max(0.2, Math.min(3, startScale + delta));
    setScale(newScale);
  };

  const onResizeMouseUp = () => {
    setScaling(false);
    window.removeEventListener("mousemove", onResizeMouseMove);
    window.removeEventListener("mouseup", onResizeMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragStart.current || !mouseStart.current) return;
    const dx = e.clientX - mouseStart.current.x;
    const dy = e.clientY - mouseStart.current.y;
    setPos({ x: dragStart.current.x + dx, y: dragStart.current.y + dy });
  };

  const onMouseUp = () => {
    setDragging(false);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  // Touch events for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    setDragging(true);
    dragStart.current = { ...pos };
    const touch = e.touches[0];
    mouseStart.current = { x: touch.clientX, y: touch.clientY };
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!dragStart.current || !mouseStart.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - mouseStart.current.x;
    const dy = touch.clientY - mouseStart.current.y;
    setPos({ x: dragStart.current.x + dx, y: dragStart.current.y + dy });
  };

  const onTouchEnd = () => {
    setDragging(false);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);
  };

  return (
    <div
      className={`hat-wrapper draggable-hat${selected ? " selected" : ""}`}
      style={{
        // position: "absolute",
        // top: 0,
        // left: "50%",
        // transform: `translate(-50%, 0) translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
        cursor: dragging ? "grabbing" : scaling ? "nwse-resize" : "grab",
        zIndex: 10,
        outline: selected ? "2px solid #4f46e5" : undefined,
      }}
      // onMouseDown={onMouseDown}
      // onTouchStart={onTouchStart}
      tabIndex={0}
      aria-label="Drag hat"
    >
      {hatComponents[hatIndex]}
      {selected && (
        <div
          className="resize-handle"
          style={{
            position: "absolute",
            right: -10,
            bottom: -10,
            width: 16,
            height: 16,
            background: "#fff",
            border: "2px solid #4f46e5",
            borderRadius: 4,
            cursor: "nwse-resize",
            zIndex: 20,
            boxShadow: "0 1px 4px #0002",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseDown={onResizeMouseDown}
        >
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M0 10L10 0" stroke="#4f46e5" strokeWidth="2" />
          </svg>
        </div>
      )}
    </div>
  );
};
