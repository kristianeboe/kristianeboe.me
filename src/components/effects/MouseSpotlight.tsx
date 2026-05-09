"use client";

import { useEffect, useRef, useCallback } from "react";

interface MouseSpotlightProps {
  /** Spotlight radius in px (default: 200) */
  radius?: number;
  /** Spotlight intensity 0-1 (default: 0.7) */
  intensity?: number;
  /** Edge softness — ratio of soft edge to radius (default: 0.4) */
  softness?: number;
  /** Overlay darkness 0-1 (default: 0.85) */
  overlayOpacity?: number;
  /** Lerp factor for smooth following (default: 0.1) */
  lerpFactor?: number;
  children: React.ReactNode;
  className?: string;
}

export function MouseSpotlight({
  radius = 200,
  intensity = 0.7,
  softness = 0.4,
  overlayOpacity = 0.85,
  lerpFactor = 0.1,
  children,
  className,
}: MouseSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const currentPos = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);
  const isActive = useRef(false);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const updateOverlay = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (prefersReducedMotion.current) {
      currentPos.current = { ...mousePos.current };
    } else {
      currentPos.current.x +=
        (mousePos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y +=
        (mousePos.current.y - currentPos.current.y) * lerpFactor;
    }

    const { x, y } = currentPos.current;
    const innerRadius = radius * (1 - softness);
    const transparent = `rgba(0, 0, 0, ${overlayOpacity * (1 - intensity)})`;
    const opaque = `rgba(0, 0, 0, ${overlayOpacity})`;

    overlay.style.background = isActive.current
      ? `radial-gradient(circle ${radius}px at ${x}px ${y}px, ${transparent} ${innerRadius}px, ${opaque} ${radius}px)`
      : opaque;

    if (isActive.current) {
      animationRef.current = requestAnimationFrame(updateOverlay);
    }
  }, [radius, intensity, softness, overlayOpacity, lerpFactor]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Skip on mobile (no hover)
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      if (!isActive.current) {
        isActive.current = true;
        currentPos.current = { ...mousePos.current };
        animationRef.current = requestAnimationFrame(updateOverlay);
      }
    };

    const handleMouseLeave = () => {
      isActive.current = false;
      cancelAnimationFrame(animationRef.current);
      if (overlayRef.current) {
        overlayRef.current.style.background = `rgba(0, 0, 0, ${overlayOpacity})`;
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, [overlayOpacity, updateOverlay]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {children}
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          background: `rgba(0, 0, 0, ${overlayOpacity})`,
          pointerEvents: "none",
          transition: "background 0.3s ease",
          zIndex: 10,
        }}
      />
    </div>
  );
}
