"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { cn } from "@/components/ui/lib/utils";

interface GlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Glow color as CSS color string (default: cyan) */
  glowColor?: string;
  /** Glow radius in px (default: 100) */
  glowRadius?: number;
  /** Glow intensity 0-1 (default: 0.6) */
  glowIntensity?: number;
  /** Button variant matching shadcn styles */
  variant?: "default" | "outline" | "secondary" | "ghost";
  /** Button size */
  size?: "default" | "sm" | "lg";
}

export function GlowButton({
  glowColor = "rgba(0, 200, 255, 0.6)",
  glowRadius = 100,
  glowIntensity = 0.6,
  variant = "default",
  size = "default",
  className,
  children,
  ...props
}: GlowButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(circle ${glowRadius}px at ${x}px ${y}px, ${glowColor}, transparent)`;
        glowRef.current.style.opacity = String(glowIntensity);
      }
    },
    [glowColor, glowRadius, glowIntensity, prefersReducedMotion],
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (glowRef.current) {
      glowRef.current.style.opacity = "0";
    }
  }, []);

  const variantClasses = {
    default:
      "bg-primary text-primary-foreground shadow-xs dark:text-white",
    outline:
      "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
    secondary:
      "bg-secondary text-secondary-foreground border shadow-xs",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };

  const sizeClasses = {
    default: "h-9 px-4 py-2",
    sm: "h-8 px-3 text-sm",
    lg: "h-10 px-6",
  };

  return (
    <button
      ref={buttonRef}
      className={cn(
        "relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-md text-sm font-medium transition-all",
        "focus-visible:border-ring focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px]",
        "disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Glow layer */}
      <div
        ref={glowRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: -2,
          opacity: 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
          borderRadius: "inherit",
          mixBlendMode: "screen",
        }}
      />
      {/* Border glow on hover */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: -1,
          borderRadius: "inherit",
          opacity: isHovered ? 0.5 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
          boxShadow: `0 0 15px 2px ${glowColor}, inset 0 0 15px 2px ${glowColor}`,
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
