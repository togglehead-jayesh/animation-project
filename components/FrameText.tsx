import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Watch } from "@/config/watches";
import { LiquidGlassCard } from "./ui/liquid-weather-glass";

interface FrameTextProps {
  watch: Watch;
  visible: boolean;
}

export default function FrameText({ watch, visible }: FrameTextProps) {
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={watch.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full"
        >
          <LiquidGlassCard
            borderRadius="20px"
            blurIntensity="lg"
            shadowIntensity="xs"
            glowIntensity="xs"
            className="p-7 bg-black/25 border border-white/10"
            style={{ maxWidth: 300 }}
          >
            {watch.chapter && (
              <p
                style={{
                  fontSize: 9,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "#F2D28B",
                  marginBottom: 14,
                }}
              >
                {watch.chapter}
              </p>
            )}
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "clamp(24px, 2.5vw, 40px)",
                fontWeight: 400,
                color: "#F6F3F0",
                letterSpacing: "0.04em",
                lineHeight: 1.1,
                marginBottom: 14,
              }}
            >
              {watch.title}
            </h2>
            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 13,
                lineHeight: 1.75,
                color: "rgba(246, 243, 240, 0.62)",
                fontWeight: 300,
              }}
            >
              {watch.subtitle}
            </p>
          </LiquidGlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
