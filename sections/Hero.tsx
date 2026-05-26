import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { watches, Watch } from "@/config/watches";
import FrameText from "@/components/FrameText";
import BuyCard from "@/components/BuyCard";

const VIDEO_SRC = "https://res.cloudinary.com/dcm5lpj1p/video/upload/0526_ctsyvv.mp4";

const TOTAL_VIDEO_DURATION = 40;
const PX_PER_SECOND = 200;
const TOTAL_SCROLL_PX = TOTAL_VIDEO_DURATION * PX_PER_SECOND; // 8000
const LERP_FACTOR = 0.08;
const SEEK_INTERVAL_MS = 1000 / 24; // ~41.67ms
const NO_PANEL_FRAMES = new Set(["entry", "ruf-tuf-core"]);

interface Segment {
  id: string;
  frameId: string;
  transitionStart: number;
  transitionEnd: number;
  loopStart: number;
  loopEnd: number;
  scrollResume: number;
}

const SEGMENTS: Segment[] = [
  {
    id: "entry",
    frameId: "entry",
    transitionStart: 0,
    transitionEnd: 1.5,
    loopStart: 1.5,
    loopEnd: 3,
    scrollResume: 3,
  },
  {
    id: "desert-edition",
    frameId: "desert-edition",
    transitionStart: 3,
    transitionEnd: 5,
    loopStart: 5,
    loopEnd: 9,
    scrollResume: 9,
  },
  {
    id: "arctic-edition",
    frameId: "arctic-edition",
    transitionStart: 9,
    transitionEnd: 11,
    loopStart: 11,
    loopEnd: 16,
    scrollResume: 16,
  },
  {
    id: "jungle-edition",
    frameId: "jungle-edition",
    transitionStart: 16,
    transitionEnd: 18,
    loopStart: 18,
    loopEnd: 23,
    scrollResume: 23,
  },
  {
    id: "ocean-edition",
    frameId: "ocean-edition",
    transitionStart: 23,
    transitionEnd: 25,
    loopStart: 25,
    loopEnd: 30,
    scrollResume: 30,
  },
  {
    id: "cyberpunk-edition",
    frameId: "cyberpunk-edition",
    transitionStart: 30,
    transitionEnd: 32,
    loopStart: 32,
    loopEnd: 37,
    scrollResume: 37,
  },
  {
    id: "outro",
    frameId: "ruf-tuf-core",
    transitionStart: 37,
    transitionEnd: 38,
    loopStart: 38,
    loopEnd: 40,
    scrollResume: 40,
  },
];

const segmentFromTime = (time: number): Segment => {
  return SEGMENTS.find((s) => time >= s.transitionStart && time <= s.scrollResume) || SEGMENTS[0];
};

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const vidRef = useRef<HTMLVideoElement>(null);

  // Mode and state tracking using Refs for high performance RAF access
  const modeRef = useRef<"IDLE" | "SCRUB" | "LOOP">("IDLE");
  const lastProgressRef = useRef(0);
  const lastProgressMsRef = useRef(Date.now());
  const isResettingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastSeekMsRef = useRef(0);
  const targetTimeRef = useRef(0);
  const smoothedTimeRef = useRef(0);

  // States to trigger UI rendering
  const [mode, setMode] = useState<"IDLE" | "SCRUB" | "LOOP">("IDLE");
  const [currentFrame, setCurrentFrame] = useState<Watch>(watches[0]);

  useEffect(() => {
    let isMounted = true;
    // 1. Preload / setup video state
    const video = vidRef.current;
    if (video) {
      video.load();
      video.play().catch(() => {});
    }

    // 2. Initialize ScrollTrigger pin dynamics
    let scrollTriggerInstance: any = null;

    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      
      if (!isMounted) return;

      gsap.registerPlugin(ScrollTrigger);

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: `+=${TOTAL_SCROLL_PX}`,
        pin: stageRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (isResettingRef.current) return;

          const p = self.progress;

          // Scroll stop detection (filter out tiny inertial vibrations)
          if (Math.abs(p - lastProgressRef.current) > 0.0008) {
            lastProgressRef.current = p;
            lastProgressMsRef.current = Date.now();

            // Resume to SCRUB mode if we were looping
            if (modeRef.current === "LOOP") {
              modeRef.current = "SCRUB";
              setMode("SCRUB");
            }
          }

          // IDLE boundary
          if (p < 0.004) {
            if (modeRef.current !== "IDLE") {
              modeRef.current = "IDLE";
              setMode("IDLE");
              setCurrentFrame(watches[0]);
              targetTimeRef.current = 0;
              smoothedTimeRef.current = 0;
            }
            return;
          }

          // Transitioning from IDLE to SCRUB
          if (modeRef.current === "IDLE") {
            modeRef.current = "SCRUB";
            setMode("SCRUB");
          }

          // Calculate time
          let nextTime = p * TOTAL_VIDEO_DURATION;

          // Clamp nextTime based on segments to prevent skipping over boundaries
          const currentSeg = segmentFromTime(nextTime);
          nextTime = Math.max(currentSeg.transitionStart, Math.min(nextTime, currentSeg.scrollResume));

          targetTimeRef.current = nextTime;

          // Update current frame mapping
          const matchedFrame = watches.find((w) => w.id === currentSeg.frameId) || watches[0];
          setCurrentFrame(matchedFrame);

          // Auto-Reset at very bottom
          if (p > 0.98 && !isResettingRef.current) {
            isResettingRef.current = true;
            setTimeout(async () => {
              const { ScrollToPlugin } = await import("gsap/ScrollToPlugin");
              gsap.registerPlugin(ScrollToPlugin);
              
              gsap.to(window, {
                scrollTo: 0,
                duration: 2.5,
                ease: "power3.inOut",
                onComplete: () => {
                  if (!isMounted) return;
                  isResettingRef.current = false;
                  modeRef.current = "IDLE";
                  setMode("IDLE");
                  setCurrentFrame(watches[0]);
                  targetTimeRef.current = 0;
                  smoothedTimeRef.current = 0;
                  if (vidRef.current) {
                    vidRef.current.currentTime = 0;
                    vidRef.current.play().catch(() => {});
                  }
                },
              });
            }, 1500);
          }
        },
      });
    };

    initGSAP();

    // 3. Setup the High-Performance RAF loop
    const loop = (timestamp: number) => {
      const videoElement = vidRef.current;

      if (videoElement && isMounted) {
        if (modeRef.current === "IDLE") {
          // Play the entry/intro loop in IDLE mode (between 0 and 3 seconds)
          if (videoElement.paused) {
            videoElement.play().catch(() => {});
          }
          if (videoElement.currentTime >= 3 || videoElement.currentTime < 0) {
            videoElement.currentTime = 0;
          }
        } else if (modeRef.current === "SCRUB") {
          // LERP calculations
          const delta = targetTimeRef.current - smoothedTimeRef.current;
          if (Math.abs(delta) > 0.0005) {
            smoothedTimeRef.current += delta * LERP_FACTOR;
          }

          // Throttled seeking to 24fps limit
          const timeSinceLastSeek = timestamp - lastSeekMsRef.current;
          if (
            timeSinceLastSeek >= SEEK_INTERVAL_MS &&
            videoElement.readyState >= 2 &&
            Math.abs(smoothedTimeRef.current - videoElement.currentTime) > 0.002
          ) {
            videoElement.currentTime = smoothedTimeRef.current;
            lastSeekMsRef.current = timestamp;
          }

          // Detect stop -> Switch to LOOP
          const silenceDuration = Date.now() - lastProgressMsRef.current;
          if (silenceDuration > 550) {
            const currentSeg = segmentFromTime(videoElement.currentTime);
            // Ensure we are within loop range
            if (videoElement.currentTime >= currentSeg.loopStart && videoElement.currentTime < currentSeg.loopEnd) {
              modeRef.current = "LOOP";
              setMode("LOOP");
              videoElement.play().catch(() => {});
            }
          }
        } else if (modeRef.current === "LOOP") {
          // Keep video looping within loopStart and loopEnd boundaries
          const currentSeg = segmentFromTime(videoElement.currentTime);
          
          if (videoElement.paused) {
            videoElement.play().catch(() => {});
          }

          if (videoElement.currentTime >= currentSeg.loopEnd || videoElement.currentTime < currentSeg.loopStart) {
            videoElement.currentTime = currentSeg.loopStart;
          }
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      isMounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
    };
  }, []);

  const isIdle = mode === "IDLE";
  const showPanels = !isIdle && !NO_PANEL_FRAMES.has(currentFrame.id);

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        position: "relative",
        background: "#050509",
        minHeight: `calc(100vh + ${TOTAL_SCROLL_PX}px)`,
      }}
    >
      <div
        ref={stageRef}
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Single Video Element */}
        <video
          ref={vidRef}
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 2,
            willChange: "transform",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>

        {/* Vignette (radial overlay, no side borders) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            pointerEvents: "none",
            background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(5,5,9,0.55) 100%)",
          }}
        />

        {/* Scroll hint (IDLE only) */}
        <AnimatePresence>
          {isIdle && (
            <motion.div
              key="scroll-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute",
                bottom: 36,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  width: 1,
                  height: 44,
                  background: "linear-gradient(to bottom, transparent, #F2D28B)",
                  animation: "scrollLine 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 9,
                  letterSpacing: "0.32em",
                  color: "rgba(242,210,139,0.65)",
                  textTransform: "uppercase",
                }}
              >
                Scroll
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product panels (SCRUB/LOOP + non-entry/outro frames only) */}
        {showPanels && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 4,
              display: "grid",
              gridTemplateColumns: "minmax(280px,1fr) 2.4fr minmax(280px,1fr)",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "80px 20px 80px 44px",
                pointerEvents: "auto",
              }}
            >
              <FrameText watch={currentFrame} visible={true} />
            </div>
            <div />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                padding: "80px 44px 80px 20px",
                pointerEvents: "auto",
              }}
            >
              <BuyCard watch={currentFrame} visible={true} />
            </div>
          </div>
        )}

        {/* Chapter dots (SCRUB/LOOP only, exclude entry+outro) */}
        {!isIdle && (
          <div
            style={{
              position: "absolute",
              bottom: 28,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 6,
              display: "flex",
              gap: 8,
            }}
          >
            {SEGMENTS.filter((s) => s.id !== "entry" && s.id !== "outro").map((seg) => (
              <div
                key={seg.id}
                title={seg.id}
                style={{
                  width: currentFrame.id === seg.frameId ? 24 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: currentFrame.id === seg.frameId ? "#F2D28B" : "rgba(246,243,240,0.22)",
                  transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
