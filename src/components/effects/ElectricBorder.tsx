"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createNoise3D } from "simplex-noise";

interface ElectricBorderProps {
  colorA?: string;
  colorB?: string;
  intensity?: number;
  borderWidth?: number;
  speed?: number;
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
    const pad = borderWidth * 8;
    canvas.width = (rect.width + pad * 2) * dpr;
    canvas.height = (rect.height + pad * 2) * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const time = Date.now() * 0.001 * speed;

    ctx.clearRect(0, 0, w + pad * 2, h + pad * 2);
    ctx.save();
    ctx.translate(pad, pad);

    // Ambient glow around the entire border
    const ambientGrad = ctx.createRadialGradient(
      w / 2,
      h / 2,
      Math.min(w, h) * 0.3,
      w / 2,
      h / 2,
      Math.max(w, h) * 0.8,
    );
    ambientGrad.addColorStop(0, `rgba(${colorA}, 0)`);
    ambientGrad.addColorStop(0.7, `rgba(${colorA}, ${intensity * 0.03})`);
    ambientGrad.addColorStop(1, `rgba(${colorA}, 0)`);
    ctx.fillStyle = ambientGrad;
    ctx.fillRect(-pad, -pad, w + pad * 2, h + pad * 2);

    // Draw the electric border segments — brighter and thicker
    const perimeter = 2 * (w + h);
    const steps = Math.floor(perimeter / 1.5);

    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const pos = t * perimeter;

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

      const n = noise3D.current(t * 3, time * 0.8, 0);
      const alpha = Math.max(0, 0.4 + n * 0.6) * intensity;

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

      const glowSize = borderWidth * 1.5 + n * 3;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, glowSize * 5);
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
      grad.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${alpha * 0.5})`);
      grad.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${alpha * 0.15})`);
      grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

      ctx.fillStyle = grad;
      ctx.fillRect(
        x - glowSize * 5,
        y - glowSize * 5,
        glowSize * 10,
        glowSize * 10,
      );
    }

    // Two traveling pulses at different speeds for more energy
    const pulseConfigs = [
      { speedMul: 0.25, size: 60, whiteIntensity: 1.0 },
      { speedMul: 0.4, size: 40, whiteIntensity: 0.7 },
    ];

    for (const pulse of pulseConfigs) {
      const pulseT = ((time * pulse.speedMul) % 1);
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

      const pulseGrad = ctx.createRadialGradient(
        px,
        py,
        0,
        px,
        py,
        pulse.size,
      );
      pulseGrad.addColorStop(
        0,
        `rgba(255, 255, 255, ${intensity * pulse.whiteIntensity})`,
      );
      pulseGrad.addColorStop(
        0.15,
        `rgba(${colorA}, ${intensity * 0.8})`,
      );
      pulseGrad.addColorStop(0.5, `rgba(${colorA}, ${intensity * 0.2})`);
      pulseGrad.addColorStop(1, `rgba(${colorA}, 0)`);

      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = pulseGrad;
      ctx.fillRect(
        px - pulse.size,
        py - pulse.size,
        pulse.size * 2,
        pulse.size * 2,
      );
      ctx.globalCompositeOperation = "source-over";
    }

    ctx.restore();

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

  const pad = borderWidth * 8;

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
          inset: -pad,
          width: `calc(100% + ${pad * 2}px)`,
          height: `calc(100% + ${pad * 2}px)`,
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
