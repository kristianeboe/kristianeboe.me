"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createNoise3D } from "simplex-noise";

interface HeroBeamProps {
  color?: string;
  intensity?: number;
  beamWidth?: number;
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
  const [phase, setPhase] = useState<"hidden" | "entering" | "visible">(
    "hidden",
  );
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  // Dramatic entrance: hidden → entering → visible
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("entering"), 200);
    const t2 = setTimeout(() => setPhase("visible"), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
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
      const grad = ctx.createLinearGradient(cx, 0, cx, h);
      grad.addColorStop(0, `rgba(${color}, ${intensity * 0.9})`);
      grad.addColorStop(0.4, `rgba(${color}, ${intensity * 0.4})`);
      grad.addColorStop(1, `rgba(${color}, 0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(cx - beamWidth / 2, 0, beamWidth, h);
      return;
    }

    // Wide ambient glow — the "room light" that makes the beam feel real
    const ambientGlow = ctx.createRadialGradient(
      cx,
      0,
      0,
      cx,
      h * 0.3,
      beamWidth * 6,
    );
    ambientGlow.addColorStop(0, `rgba(${color}, ${intensity * 0.35})`);
    ambientGlow.addColorStop(0.3, `rgba(${color}, ${intensity * 0.15})`);
    ambientGlow.addColorStop(0.6, `rgba(${color}, ${intensity * 0.05})`);
    ambientGlow.addColorStop(1, `rgba(${color}, 0)`);
    ctx.fillStyle = ambientGlow;
    ctx.fillRect(0, 0, w, h);

    // Secondary spread glow for volume
    const spreadGlow = ctx.createRadialGradient(
      cx,
      h * 0.1,
      0,
      cx,
      h * 0.5,
      beamWidth * 3,
    );
    spreadGlow.addColorStop(0, `rgba(${color}, ${intensity * 0.5})`);
    spreadGlow.addColorStop(0.2, `rgba(${color}, ${intensity * 0.3})`);
    spreadGlow.addColorStop(0.5, `rgba(${color}, ${intensity * 0.1})`);
    spreadGlow.addColorStop(1, `rgba(${color}, 0)`);
    ctx.fillStyle = spreadGlow;
    ctx.fillRect(0, 0, w, h);

    // Main beam with noise distortion — wider and brighter
    const segments = 100;
    for (let i = 0; i < segments; i++) {
      const y = (i / segments) * h;
      const noiseVal = noise3D.current(0, y * 0.004, time * 0.5);
      const offsetX = noiseVal * beamWidth * 0.25;
      const falloff = 1 - (i / segments) * 0.6;

      const grad = ctx.createLinearGradient(
        cx + offsetX - beamWidth * 0.8,
        y,
        cx + offsetX + beamWidth * 0.8,
        y,
      );
      grad.addColorStop(0, `rgba(${color}, 0)`);
      grad.addColorStop(0.15, `rgba(${color}, ${intensity * falloff * 0.3})`);
      grad.addColorStop(0.3, `rgba(${color}, ${intensity * falloff * 0.6})`);
      grad.addColorStop(0.5, `rgba(${color}, ${intensity * falloff})`);
      grad.addColorStop(0.7, `rgba(${color}, ${intensity * falloff * 0.6})`);
      grad.addColorStop(0.85, `rgba(${color}, ${intensity * falloff * 0.3})`);
      grad.addColorStop(1, `rgba(${color}, 0)`);

      ctx.fillStyle = grad;
      ctx.fillRect(0, y, w, h / segments + 1);
    }

    // Hot white core — the brightest part of the beam
    const coreWidth = beamWidth * 0.15;
    for (let i = 0; i < segments; i++) {
      const y = (i / segments) * h;
      const noiseVal = noise3D.current(1, y * 0.006, time * 0.7);
      const offsetX = noiseVal * coreWidth * 0.4;
      const falloff = Math.pow(1 - i / segments, 0.8);

      const coreGrad = ctx.createLinearGradient(
        cx + offsetX - coreWidth * 2,
        y,
        cx + offsetX + coreWidth * 2,
        y,
      );
      coreGrad.addColorStop(0, `rgba(${color}, 0)`);
      coreGrad.addColorStop(
        0.3,
        `rgba(${color}, ${intensity * falloff * 0.5})`,
      );
      coreGrad.addColorStop(
        0.5,
        `rgba(255, 255, 255, ${Math.min(intensity * falloff * 1.4, 1)})`,
      );
      coreGrad.addColorStop(
        0.7,
        `rgba(${color}, ${intensity * falloff * 0.5})`,
      );
      coreGrad.addColorStop(1, `rgba(${color}, 0)`);

      ctx.fillStyle = coreGrad;
      ctx.globalCompositeOperation = "screen";
      ctx.fillRect(0, y, w, h / segments + 1);
    }
    ctx.globalCompositeOperation = "source-over";

    // Top flare — bright point source at the beam origin
    const flareGrad = ctx.createRadialGradient(cx, 0, 0, cx, 0, beamWidth);
    flareGrad.addColorStop(
      0,
      `rgba(255, 255, 255, ${Math.min(intensity * 1.2, 1)})`,
    );
    flareGrad.addColorStop(0.1, `rgba(${color}, ${intensity * 0.8})`);
    flareGrad.addColorStop(0.4, `rgba(${color}, ${intensity * 0.2})`);
    flareGrad.addColorStop(1, `rgba(${color}, 0)`);
    ctx.fillStyle = flareGrad;
    ctx.fillRect(cx - beamWidth, 0, beamWidth * 2, beamWidth);

    // Sparkle particles — more and brighter
    const particleCount = 35;
    for (let i = 0; i < particleCount; i++) {
      const seed = i * 137.5;
      const px = cx + noise3D.current(seed, 0, time * 0.3) * beamWidth * 0.8;
      const py =
        ((((seed * 0.7 + time * 50 * (0.5 + (i % 3) * 0.25)) % h) + h) % h);
      const sparkleAlpha =
        Math.max(0, noise3D.current(seed, time, 0)) * intensity;
      const size = 1.5 + noise3D.current(seed, 0, time * 0.2) * 2;

      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${sparkleAlpha})`;
      ctx.fill();

      // Sparkle glow halo
      if (sparkleAlpha > 0.3) {
        const haloGrad = ctx.createRadialGradient(px, py, 0, px, py, size * 4);
        haloGrad.addColorStop(
          0,
          `rgba(${color}, ${sparkleAlpha * 0.4})`,
        );
        haloGrad.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = haloGrad;
        ctx.fillRect(px - size * 4, py - size * 4, size * 8, size * 8);
      }
    }

    animationRef.current = requestAnimationFrame(draw);
  }, [color, intensity, beamWidth, speed]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationRef.current);
  }, [draw]);

  useEffect(() => {
    const handleResize = () => {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = requestAnimationFrame(draw);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [draw]);

  const clipY = phase === "hidden" ? 0 : 100;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        opacity: phase === "hidden" ? 0 : 1,
        clipPath: `inset(0 0 ${100 - clipY}% 0)`,
        transition:
          phase === "entering"
            ? "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), clip-path 1.4s cubic-bezier(0.16, 1, 0.3, 1)"
            : "opacity 0.4s ease-out",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
