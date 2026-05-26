import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }

      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // RAF Loop to Lerp Ring Pos
    let rafId: number;
    const tick = () => {
      const ring = ringRef.current;
      if (ring && isVisibleRef.current) {
        const dx = mouseRef.current.x - ringPosRef.current.x;
        const dy = mouseRef.current.y - ringPosRef.current.y;
        
        // Lerping ring
        ringPosRef.current.x += dx * 0.12;
        ringPosRef.current.y += dy * 0.12;

        ring.style.left = `${ringPosRef.current.x}px`;
        ring.style.top = `${ringPosRef.current.y}px`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // Attach hover listeners to links and buttons
    const attachHoverListeners = () => {
      const targets = document.querySelectorAll("a, button, select, input, textarea, [data-cursor-hover]");
      targets.forEach((elem) => {
        // Prevent duplicate attachments
        elem.removeEventListener("mouseenter", handleMouseEnter);
        elem.removeEventListener("mouseleave", handleMouseLeave);
        elem.addEventListener("mouseenter", handleMouseEnter);
        elem.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    const handleMouseEnter = () => {
      document.body.classList.add("cursor-hovering");
    };

    const handleMouseLeave = () => {
      document.body.classList.remove("cursor-hovering");
    };

    attachHoverListeners();

    // MutationObserver to handle dynamically added interactive elements
    const observer = new MutationObserver(() => {
      attachHoverListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      // Clean up hover class
      document.body.classList.remove("cursor-hovering");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} />
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} />
    </>
  );
}
