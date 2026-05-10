"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createNoise3D } from "simplex-noise";

interface HeroBeamProps {
  /** CSS color for the beam (default: cyan) */
  color?: string;
  /** Beam intensity 0-1 (default: 0.6) */
  intensity?: number;
  /** Beam width in px (default: 120) */
  beamWidth?: number;
  /** Animation speed multiplier (default: 1) */
  speed?: number;
  className?: string;
}

export function HeroBeam({
  color = "0, 200, 255",
  intensity = 0.6,
  beamWidth = 120,
  speed = 1,
  className,
}: HeroBeamProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const noise3D = useRef(createNoise3D());
  const [entered, setEntered] = useState(false);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const cx = w / 2;
    const time = Date.now() * 0.001 * speed;

    ctx.clearRect(0, 0, w, h);

    if (prefersReducedMotion.current) {
      // Static beam for reduced motion
      const grad = ctx.createLinearGradient(cx, 0, cx, h);
      grad.addColorStop(0, `rgba(${color}, ${intensity * 0.8})`);
      grad.addColorStop(0.5, `rgba(${color}, ${intensity * 0.3})`);
      grad.addColorStop(1, `rgba(${color}, 0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(cx - beamWidth / 2, 0, beamWidth, h);
      return;
    }

    // Outer glow (wide, soft)
    const outerGlow = ctx.createRadialGradient(
      cx,
      h * 0.05,
      0,
      cx,
      h * 0.5,
      beamWidth * 4,
    );
    outerGlow.addColorStop(0, `rgba(${color}, ${intensity * 0.4})`);
    outerGlow.addColorStop(0.3, `rgba(${color}, ${intensity * 0.15})`);
    outerGlow.addColorStop(0.7, `rgba(${color}, ${intensity * 0.05})`);
    outerGlow.addColorStop(1, `rgba(${color}, 0)`);
    ctx.fillStyle = outerGlow;
    ctx.fillRect(0, 0, w, h);

    // Main beam with noise distortion
    const segments = 80;
    for (let i = 0; i < segments; i++) {
      const y = (i / segments) * h;
      const noiseVal = noise3D.current(0, y * 0.005, time * 0.5);
      const offsetX = noiseVal * beamWidth * 0.3;
      const falloff = 1 - (i / segments) * 0.7;

      const grad = ctx.createLinearGradient(
        cx + offsetX - beamWidth / 2,
        y,
        cx + offsetX + beamWidth / 2,
        y,
      );
      grad.addColorStop(0, `rgba(${color}, 0)`);
      grad.addColorStop(0.2, `rgba(${color}, ${intensity * falloff * 0.4})`);
      grad.addColorStop(0.4, `rgba(${color}, ${intensity * falloff * 0.7})`);
      grad.addColorStop(0.5, `rgba(${color}, ${intensity * falloff * 0.9})`);
      grad.addColorStop(0.6, `rgba(${color}, ${intensity * falloff * 0.7})`);
      grad.addColorStop(0.8, `rgba(${color}, ${intensity * falloff * 0.4})`);
      grad.addColorStop(1, `rgba(${color}, 0)`);

      ctx.fillStyle = grad;
      ctx.fillRect(0, y, w, h / segments + 1);
    }

    // Inner bright core
    const coreWidth = beamWidth * 0.25;
    const coreGrad = ctx.createLinearGradient(cx, 0, cx, h);
    coreGrad.addColorStop(0, `rgba(255, 255, 255, ${Math.min(intensity * 1.2, 1)})`);
    coreGrad.addColorStop(0.2, `rgba(${color}, ${intensity * 0.8})`);
    coreGrad.addColorStop(0.5, `rgba(${color}, ${intensity * 0.4})`);
    coreGrad.addColorStop(0.8, `rgba(${color}, ${intensity * 0.1})`);
    coreGrad.addColorStop(1, `rgba(${color}, 0)`);

    for (let i = 0; i < segments; i++) {
      const y = (i / segments) * h;
      const noiseVal = noise3D.current(1, y * 0.008, time * 0.7);
      const offsetX = noiseVal * coreWidth * 0.5;

      ctx.fillStyle = coreGrad;
      ctx.globalCompositeOperation = "screen";
      ctx.fillRect(
        cx + offsetX - coreWidth / 2,
        y,
        coreWidth,
        h / segments + 1,
      );
    }
    ctx.globalCompositeOperation = "source-over";

    // Sparkle particles
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      const seed = i * 137.5;
      const px =
        cx +
        noise3D.current(seed, 0, time * 0.3) * beamWidth * 0.6;
      const py =
        ((((seed * 0.7 + time * 60 * (0.5 + (i % 3) * 0.25)) % h) + h) % h);
      const sparkleAlpha =
        Math.max(0, noise3D.current(seed, time, 0)) * intensity * 0.8;
      const size = 1 + noise3D.current(seed, 0, time * 0.2) * 1.5;

      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${sparkleAlpha})`;
      ctx.fill();
    }

    animationRef.current = requestAnimationFrame(draw);
  }, [color, intensity, beamWidth, speed]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationRef.current);
  }, [draw]);

  // Resize handling
  useEffect(() => {
    const handleResize = () => {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = requestAnimationFrame(draw);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [draw]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        opacity: entered ? 1 : 0,
        transform: entered ? "scaleX(1)" : "scaleX(0)",
        transition: "opacity 1.5s ease-out, transform 1.2s ease-out",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          mixBlendMode: "lighten",
        }}
      />
    </div>
  );
}
