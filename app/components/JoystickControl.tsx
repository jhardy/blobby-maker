import React, { useCallback, useRef, useState, useEffect } from "react";

interface JoystickControlProps {
  radius?: number; // radius of the control in px
  knobRadius?: number; // radius of the knob in px
  onChange?: (x: number, y: number) => void; // x, y are normalized -1..1
}

export const JoystickControl: React.FC<JoystickControlProps> = ({
  radius = 100,
  knobRadius = 16,
  onChange,
}) => {
  const [pos, setPos] = useState({ x: 0, y: 0 }); // normalized -1..1
  const [dragging, setDragging] = useState(false);
  const circleRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ startX: 0, startY: 0, startPos: { x: 0, y: 0 } });

  // Convert mouse/touch event to normalized x/y
  const getRelativePos = (clientX: number, clientY: number) => {
    const rect = circleRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    let dx = clientX - cx;
    let dy = clientY - cy;
    // Clamp to circle
    const dist = Math.sqrt(dx * dx + dy * dy);
    const max = radius - knobRadius;
    if (dist > max) {
      dx = (dx / dist) * max;
      dy = (dy / dist) * max;
    }
    return { x: dx / max, y: dy / max };
  };

  // const handleKnobMouseDown = useCallback(
  //   (e: React.MouseEvent) => {
  //     console.log("knob down", e);
  //     e.stopPropagation(); // Prevent the control click from firing
  //     setDragging(true);
  //     const rect = controlRef.current.getBoundingClientRect();
  //     const centerX = rect.left + rect.width / 2;
  //     const centerY = rect.top + rect.height / 2;

  //     dragRef.current = {
  //       startX: e.clientX - centerX,
  //       startY: e.clientY - centerY,
  //       startPos: { ...pos },
  //     };
  //   },
  //   [pos]
  // );

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    const { x, y } = getRelativePos(e.clientX, e.clientY);
    setPos({ x, y });
    onChange?.(x, y);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!dragging) return;
      const { x, y } = getRelativePos(e.clientX, e.clientY);
      setPos({ x, y });
      onChange?.(x, y);
    },
    [dragging, getRelativePos, onChange]
  );

  const handlePointerUp = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };
    }
  }, [dragging, handlePointerMove, handlePointerUp]);

  // Allow click to move knob
  const handleCircleClick = (e: React.MouseEvent) => {
    const { x, y } = getRelativePos(e.clientX, e.clientY);
    setPos({ x, y });
    onChange?.(x, y);
  };

  // Position knob in px
  const knobX = pos.x * (radius - knobRadius);
  const knobY = pos.y * (radius - knobRadius);

  return (
    <div
      ref={circleRef}
      style={{
        width: radius * 2,
        height: radius * 2,
        borderRadius: "50%",
        background: "#eceef1",
        border: "2px solid #bfc3cb",
        position: "relative",
        margin: "0 auto",
        boxShadow: "0 0 0 12px #eceef1",
        touchAction: "none",
        userSelect: "none",
      }}
      onPointerDown={handlePointerDown}
      onClick={handleCircleClick}
      className="outer-circle"
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) translate(${knobX}px, ${knobY}px)`,
          width: knobRadius * 2,
          height: knobRadius * 2,
          borderRadius: "50%",
          background: dragging ? "#4285f4" : "#4285f4cc",
          border: "2px solid #4285f4",
          boxShadow: "0 2px 3px #4285f433",
          cursor: "pointer",
          transition: dragging ? "none" : "background 0.2s",
          zIndex: 2,
        }}
        className="joystick-knob"
        ref={controlRef}
        // onMouseDown={handleKnobMouseDown}

        onPointerDown={(e) => {
          e.stopPropagation(); // Prevent outer circle from also handling
          setDragging(true);
          const { x, y } = getRelativePos(e.clientX, e.clientY);
          setPos({ x, y });
          onChange?.(x, y);
          window.addEventListener("pointermove", handlePointerMove);
          window.addEventListener("pointerup", handlePointerUp);
        }}
      />
    </div>
  );
};
