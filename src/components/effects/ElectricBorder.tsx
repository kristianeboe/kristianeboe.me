"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createNoise3D } from "simplex-noise";

interface ElectricBorderProps {
  /** Primary border color (default: cyan) */
  colorA?: string;
  /** Secondary border color (default: teal) */
  colorB?: string;
  /** Border glow intensity 0-1 (default: 0.7) */
  intensity?: number;
  /** Border width in px (default: 1.5) */
  borderWidth?: number;
  /** Animation speed multiplier (default: 1) */
  speed?: number;
  /** Border radius in px (default: 12) */
  borderRadius?: number;
  children: React.ReactNode;
  className?: string;
}

export function ElectricBorder({
  colorA = "0, 220, 255",
  colorB = "0, 180, 200",
  intensity = 0.7,
  borderWidth = 1.5,
  speed = 1,
  borderRadius = 12,
  children,
  className,
}: ElectricBorderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const noise3D = useRef(createNoise3D());
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  // IntersectionObserver — only animate when visible
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry?.isIntersecting ?? false),
      { threshold: 0.1 },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !isVisible) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const time = Date.now() * 0.001 * speed;

    ctx.clearRect(0, 0, w, h);

    // Draw the electric border by tracing the perimeter
    const perimeter = 2 * (w + h);
    const steps = Math.floor(perimeter / 2);

    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const pos = t * perimeter;

      // Calculate position along the rounded rect perimeter
      let x: number, y: number;
      if (pos < w) {
        x = pos;
        y = 0;
      } else if (pos < w + h) {
        x = w;
        y = pos - w;
      } else if (pos < 2 * w + h) {
        x = w - (pos - w - h);
        y = h;
      } else {
        x = 0;
        y = h - (pos - 2 * w - h);
      }

      // Noise-based intensity variation
      const n = noise3D.current(t * 3, time * 0.8, 0);
      const alpha = Math.max(0, (0.3 + n * 0.7)) * intensity;

      // Color interpolation based on noise
      const colorMix = (noise3D.current(t * 5, 0, time * 0.5) + 1) / 2;
      const r = lerp(
        parseFloat(colorA.split(",")[0]!),
        parseFloat(colorB.split(",")[0]!),
        colorMix,
      );
      const g = lerp(
        parseFloat(colorA.split(",")[1]!),
        parseFloat(colorB.split(",")[1]!),
        colorMix,
      );
      const b = lerp(
        parseFloat(colorA.split(",")[2]!),
        parseFloat(colorB.split(",")[2]!),
        colorMix,
      );

      // Draw glow dot
      const glowSize = borderWidth + n * 2;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, glowSize * 4);
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
      grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${alpha * 0.3})`);
      grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

      ctx.fillStyle = grad;
      ctx.fillRect(x - glowSize * 4, y - glowSize * 4, glowSize * 8, glowSize * 8);
    }

    // Bright traveling pulse
    const pulseT = ((time * 0.3) % 1);
    const pulsePos = pulseT * perimeter;
    let px: number, py: number;
    if (pulsePos < w) {
      px = pulsePos;
      py = 0;
    } else if (pulsePos < w + h) {
      px = w;
      py = pulsePos - w;
    } else if (pulsePos < 2 * w + h) {
      px = w - (pulsePos - w - h);
      py = h;
    } else {
      px = 0;
      py = h - (pulsePos - 2 * w - h);
    }

    const pulseGrad = ctx.createRadialGradient(px, py, 0, px, py, 40);
    pulseGrad.addColorStop(0, `rgba(255, 255, 255, ${intensity * 0.9})`);
    pulseGrad.addColorStop(0.2, `rgba(${colorA}, ${intensity * 0.6})`);
    pulseGrad.addColorStop(1, `rgba(${colorA}, 0)`);
    ctx.fillStyle = pulseGrad;
    ctx.fillRect(px - 40, py - 40, 80, 80);

    if (!prefersReducedMotion.current) {
      animationRef.current = requestAnimationFrame(draw);
    }
  }, [colorA, colorB, intensity, borderWidth, speed, isVisible]);

  useEffect(() => {
    if (isVisible) {
      animationRef.current = requestAnimationFrame(draw);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [draw, isVisible]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative" }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: -borderWidth * 4,
          width: `calc(100% + ${borderWidth * 8}px)`,
          height: `calc(100% + ${borderWidth * 8}px)`,
          pointerEvents: "none",
          borderRadius,
          mixBlendMode: "screen",
          zIndex: 1,
        }}
      />
      <div style={{ position: "relative", zIndex: 2, borderRadius }}>
        {children}
      </div>
    </div>
  );
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
