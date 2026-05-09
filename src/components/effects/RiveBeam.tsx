"use client";

import { useEffect, useRef, useState } from "react";

/**
 * RiveBeam — Rive-powered light beam effect placeholder.
 *
 * ## How to create the .riv file:
 *
 * 1. Open the Rive editor at https://rive.app/editor
 * 2. Create a new file (1920x1080 artboard, transparent background)
 * 3. Build the beam effect:
 *    - Add a vertical rectangle shape (narrow, full height) as the beam core
 *    - Apply a vertical linear gradient fill: bright white/cyan at top → transparent at bottom
 *    - Duplicate the shape wider with lower opacity for the outer glow
 *    - Add noise/distortion via Rive's mesh deformation on the shapes
 *    - Add small circle shapes for sparkle particles
 * 4. Animate:
 *    - Create a looping timeline (~3 seconds)
 *    - Animate mesh vertices for organic beam movement
 *    - Animate sparkle positions (drift downward, fade in/out)
 *    - Animate opacity keyframes for pulsing glow
 * 5. Add a State Machine:
 *    - Create a state machine named "beam"
 *    - Add an "intensity" number input (0-1) to control beam brightness
 *    - Connect the intensity input to opacity/scale of layers
 * 6. Export as .riv and place at: public/animations/hero-beam.riv
 *
 * ## Usage:
 * ```tsx
 * <RiveBeam className="absolute inset-0" />
 * ```
 */

interface RiveBeamProps {
  /** Path to the .riv file (default: /animations/hero-beam.riv) */
  src?: string;
  /** State machine name (default: "beam") */
  stateMachine?: string;
  /** Beam intensity 0-1 passed to the state machine (default: 0.7) */
  intensity?: number;
  className?: string;
}

export function RiveBeam({
  src = "/animations/hero-beam.riv",
  stateMachine = "beam",
  intensity = 0.7,
  className,
}: RiveBeamProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasFile, setHasFile] = useState<boolean | null>(null);
  const [RiveComponent, setRiveComponent] = useState<React.ComponentType<{
    src: string;
    stateMachines: string;
    style?: React.CSSProperties;
  }> | null>(null);

  // Check if the .riv file exists
  useEffect(() => {
    fetch(src, { method: "HEAD" })
      .then((res) => setHasFile(res.ok))
      .catch(() => setHasFile(false));
  }, [src]);

  // Dynamically import Rive to avoid SSR issues
  useEffect(() => {
    import("@rive-app/react-webgl2")
      .then((mod) => {
        // The default export from @rive-app/react-webgl2 is the useRive hook
        // We'll use a simple component wrapper approach
        setRiveComponent(() => {
          const RiveWrapper = (props: {
            src: string;
            stateMachines: string;
            style?: React.CSSProperties;
          }) => {
            const riveRef = useRef<HTMLCanvasElement>(null);

            useEffect(() => {
              if (!riveRef.current) return;
              const rive = new mod.Rive({
                src: props.src,
                canvas: riveRef.current,
                stateMachines: props.stateMachines,
                autoplay: true,
                onLoad: () => {
                  // Set intensity input if available
                  const inputs = rive.stateMachineInputs(props.stateMachines);
                  const intensityInput = inputs?.find(
                    (i) => i.name === "intensity",
                  );
                  if (intensityInput && "value" in intensityInput) {
                    (intensityInput as { value: number }).value = intensity;
                  }
                },
              });
              return () => rive.cleanup();
            }, [props.src, props.stateMachines]);

            return (
              <canvas
                ref={riveRef}
                style={{
                  width: "100%",
                  height: "100%",
                  ...props.style,
                }}
              />
            );
          };
          RiveWrapper.displayName = "RiveWrapper";
          return RiveWrapper;
        });
      })
      .catch(() => {
        // Rive not available
      });
  }, [intensity]);

  if (hasFile === false) {
    return (
      <div
        ref={containerRef}
        className={className}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(0, 200, 255, 0.3)",
          fontSize: 14,
          fontFamily: "monospace",
          pointerEvents: "none",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p>Rive beam placeholder</p>
          <p style={{ fontSize: 11, opacity: 0.6, marginTop: 4 }}>
            Place .riv file at {src}
          </p>
        </div>
      </div>
    );
  }

  if (!RiveComponent || hasFile === null) {
    return (
      <div
        ref={containerRef}
        className={className}
        style={{ pointerEvents: "none" }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
    >
      <RiveComponent
        src={src}
        stateMachines={stateMachine}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
