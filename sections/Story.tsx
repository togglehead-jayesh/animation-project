import React, { useEffect, useRef } from "react";
import { LiquidGlassCard } from "@/components/ui/liquid-weather-glass";
import { cn } from "@/lib/utils";

interface StoryPanelProps {
  label: string;
  title: string;
  body: string;
  imageUrl: string;
  imageRight: boolean;
  accent: string;
  caption: string;
}

const StoryPanel: React.FC<StoryPanelProps> = ({
  label,
  title,
  body,
  imageUrl,
  imageRight,
  accent,
  caption,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollTriggerInstance: any = null;

    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (panelRef.current) {
        const textCol = panelRef.current.querySelector(".story-text-col");
        const imgCol = panelRef.current.querySelector(".story-image-col");

        scrollTriggerInstance = gsap.fromTo(
          [textCol, imgCol],
          { 
            opacity: 0, 
            x: (i) => (i === 0 ? (imageRight ? -32 : 32) : (imageRight ? 32 : -32)), 
            scale: 1.04 
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: panelRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    };

    initGSAP();

    return () => {
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
    };
  }, [imageRight]);

  return (
    <div
      ref={panelRef}
      className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28 last:mb-0"
    >
      {/* Text Column */}
      <div 
        className={cn(
          "story-text-col w-full flex justify-center", 
          imageRight ? "lg:order-1" : "lg:order-2"
        )}
      >
        <LiquidGlassCard
          borderRadius="20px"
          blurIntensity="lg"
          shadowIntensity="sm"
          glowIntensity="xs"
          className="p-8 md:p-10 bg-black/25 border border-white/10"
          style={{ width: "100%", maxWidth: "500px" }}
        >
          <span 
            className="label-small mb-3 block"
            style={{ color: accent }}
          >
            {label}
          </span>
          <h3 
            className="display-heading text-3xl md:text-4xl mb-6"
            style={{ whiteSpace: "pre-line" }}
          >
            {title}
          </h3>
          <div 
            className="h-[1px] w-8 mb-6" 
            style={{ backgroundColor: accent }} 
          />
          <p className="body-copy leading-relaxed">
            {body}
          </p>
        </LiquidGlassCard>
      </div>

      {/* Image Column */}
      <div 
        className={cn(
          "story-image-col w-full relative rounded overflow-hidden shadow-2xl", 
          imageRight ? "lg:order-2" : "lg:order-1"
        )}
        style={{ height: "420px" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/25 z-10 pointer-events-none" />
        <img
          src={imageUrl}
          alt={label}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <span 
          className="absolute bottom-4 left-6 z-20 text-[9px] tracking-[0.25em] uppercase text-white/60"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          {caption}
        </span>
      </div>
    </div>
  );
};

export default function Story() {
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollTriggerInstance: any = null;

    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (quoteRef.current) {
        scrollTriggerInstance = gsap.fromTo(
          quoteRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: quoteRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    };

    initGSAP();

    return () => {
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
    };
  }, []);

  return (
    <section id="story" style={{ backgroundColor: "#050509" }} className="py-24 px-6 md:px-12 relative z-10 overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        
        {/* Panels */}
        <div className="space-y-12">
          <StoryPanel
            label="The Philosophy"
            title={`Born for extreme\nenvironments of Earth`}
            body="Each RUF & TUF edition is engineered for a specific terrain — whether it's scorching desert sandstorms, freezing alpine snow fields, humid rainforests, deep oceans, or modern cyberpunk neon cities. Five worlds, one indestructible core watch."
            imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&auto=format&fit=crop&q=80"
            imageRight={true}
            accent="#F2D28B"
            caption="Survival Testing"
          />

          <StoryPanel
            label="The Engineering"
            title={`Tactical titanium,\nzero design compromises`}
            body="Our construction process uses grade 5 aerospace titanium, military sand-adaptive seals, and high-impact custom screen glass. Designed to survive extreme temperatures, shocks, and pressures up to 100 meters underwater."
            imageUrl="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900&auto=format&fit=crop&q=80"
            imageRight={false}
            accent="#d4a0a8"
            caption="Precision Lab"
          />
        </div>

        {/* Pull Quote */}
        <div 
          ref={quoteRef}
          className="mt-32 max-w-[800px] mx-auto border-t border-b border-[#F2D28B]/10 py-12 text-center"
        >
          <blockquote 
            className="text-[#F6F3F0] font-light leading-relaxed mb-4 text-lg md:text-xl italic"
            style={{ fontFamily: '"Cormorant Garamond", serif', letterSpacing: "0.02em" }}
          >
            "A watch built not just to measure time, but to withstand it entirely."
          </blockquote>
          <cite 
            className="text-[#F2D28B] uppercase tracking-widest text-[9px]"
            style={{ fontFamily: '"Inter", sans-serif', fontStyle: "normal" }}
          >
            — RUF & TUF, Engineering Notes
          </cite>
        </div>

      </div>
    </section>
  );
}
