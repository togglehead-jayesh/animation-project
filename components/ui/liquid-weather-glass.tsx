import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  draggable?: boolean;
  borderRadius?: string;
  blurIntensity?: "sm" | "md" | "lg" | "xl";
  shadowIntensity?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  glowIntensity?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  style?: React.CSSProperties;
}

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  children,
  className,
  borderRadius = "20px",
  blurIntensity = "lg",
  shadowIntensity = "xs",
  glowIntensity = "xs",
  style,
}) => {
  // Map blur intensities
  const blurClasses = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
  };

  // Map shadow intensities
  const shadowStyles = {
    none: "shadow-none",
    xs: "shadow-[0_1px_2px_rgba(0,0,0,0.4)]",
    sm: "shadow-[0_2px_4px_rgba(0,0,0,0.5)]",
    md: "shadow-[0_4px_8px_rgba(0,0,0,0.6)]",
    lg: "shadow-[0_8px_16px_rgba(0,0,0,0.7)]",
    xl: "shadow-[0_16px_32px_rgba(0,0,0,0.8)]",
  };

  // Glow styles (champagne colored glow)
  const glowStyles = {
    none: "",
    xs: "shadow-[0_0_15px_rgba(242,210,139,0.05)]",
    sm: "shadow-[0_0_25px_rgba(242,210,139,0.1)]",
    md: "shadow-[0_0_35px_rgba(242,210,139,0.15)]",
    lg: "shadow-[0_0_50px_rgba(242,210,139,0.2)]",
    xl: "shadow-[0_0_75px_rgba(242,210,139,0.25)]",
  };

  // Rim lighting (inset light from top-left)
  const rimLightStyle = "inset 1px 1px 0px rgba(255, 255, 255, 0.15), inset -1px -1px 0px rgba(0, 0, 0, 0.2)";

  return (
    <>
      {/* Hidden SVG Filter Definition */}
      <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }} aria-hidden>
        <defs>
          <filter id="glass-blur">
            <feTurbulence type="fractalNoise" baseFrequency="0.003 0.007" numOctaves="2" seed="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "transition-all duration-300 relative group overflow-hidden",
          shadowStyles[shadowIntensity],
          glowStyles[glowIntensity]
        )}
        style={{
          borderRadius,
          ...style,
        }}
      >
        {/* Hover state SVG liquid distortion overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            filter: "url(#glass-blur)",
            zIndex: -1,
          }}
        />

        {/* Inner Card Container */}
        <div
          className={cn(
            "w-full h-full relative",
            blurClasses[blurIntensity]
          )}
          style={{
            borderRadius,
            boxShadow: rimLightStyle,
          }}
        >
          <div className={cn("relative z-10", className)}>
            {children}
          </div>
        </div>
      </motion.div>
    </>
  );
};
