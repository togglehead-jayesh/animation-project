import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Watch } from "@/config/watches";
import { LiquidGlassCard } from "./ui/liquid-weather-glass";

interface BuyCardProps {
  watch: Watch;
  visible: boolean;
}

export default function BuyCard({ watch, visible }: BuyCardProps) {
  // Only render if price is defined/truthy
  if (!watch.price) return null;

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={watch.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full"
        >
          <LiquidGlassCard
            borderRadius="20px"
            blurIntensity="lg"
            shadowIntensity="xs"
            glowIntensity="xs"
            className="p-6 bg-black/25 border border-white/10"
            style={{ maxWidth: 280 }}
          >
            <p
              style={{
                fontSize: 9,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#F2D28B",
                marginBottom: 8,
              }}
            >
              Watch Edition
            </p>
            <h3
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 24,
                fontWeight: 400,
                color: "#F6F3F0",
                marginBottom: 16,
              }}
            >
              {watch.title}
            </h3>

            {watch.features && watch.features.length > 0 && (
              <ul className="space-y-2 mb-6">
                {watch.features.map((feature, index) => (
                  <li
                    key={index}
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: 12,
                      color: "rgba(246, 243, 240, 0.6)",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span style={{ color: "#F2D28B", fontSize: 10 }}>◆</span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            <div
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 28,
                color: "#F6F3F0",
                marginBottom: 16,
              }}
            >
              {watch.price}
            </div>

            <button
              className="w-full py-2.5 rounded-full border border-[#F2D28B] text-[#F2D28B] hover:bg-[rgba(242,210,139,0.1)] transition-colors text-xs tracking-wider uppercase font-medium mb-3 cursor-none"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              {watch.ctaPrimary || `Buy ${watch.title}`}
            </button>

            {watch.ctaSecondary && (
              <div className="text-center">
                <a
                  href="#catalog"
                  className="text-[10px] tracking-wider text-[rgba(246,243,240,0.5)] hover:text-[#F6F3F0] underline transition-colors cursor-none uppercase"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  {watch.ctaSecondary}
                </a>
              </div>
            )}
          </LiquidGlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
