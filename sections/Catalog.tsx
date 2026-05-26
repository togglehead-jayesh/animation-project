import React, { useEffect, useRef } from "react";
import { watches } from "@/config/watches";

export default function Catalog() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollTriggerInstance: any = null;

    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".catalog-card");
        
        scrollTriggerInstance = gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
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

  // Filter out entry and ruf-tuf-core frames (or intro)
  const products = watches.filter((w) => w.id !== "entry" && w.id !== "ruf-tuf-core");

  return (
    <section id="catalog" style={{ backgroundColor: "#050509" }} className="py-32 px-6 md:px-12 relative z-10">
      <div className="max-w-[1100px] mx-auto">
        
        {/* Header */}
        <div className="mb-16 text-center md:text-left">
          <p className="label-small text-[#F2D28B] mb-3">The Collection</p>
          <h2 className="display-heading text-4xl md:text-5xl mb-6">Tactical Editions</h2>
          <div className="h-[1px] w-20 bg-[#F2D28B]/30 mx-auto md:mx-0" />
        </div>

        {/* 3-Column Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((watch) => (
            <div
              key={watch.id}
              className="catalog-card group bg-white/[0.03] border border-white/[0.08] hover:border-[#F2D28B]/20 rounded p-8 transition-all duration-300 transform hover:-translate-y-1 select-none flex flex-col justify-between"
              style={{ minHeight: "380px" }}
            >
              <div>
                <p className="label-small text-[#F2D28B] mb-2">{watch.chapter}</p>
                <h3 className="display-heading text-3xl mb-4 group-hover:text-[#F6F3F0] transition-colors">
                  {watch.title}
                </h3>
                <div className="h-[1px] w-full bg-white/[0.08] my-4" />
                
                {/* Features */}
                {watch.features && (
                  <div className="flex flex-col gap-2 mb-6">
                    {watch.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] tracking-wider text-[#9E9EAE] flex items-center gap-2"
                      >
                        <span className="text-[#F2D28B]">◆</span>
                        {feat}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <div className="font-normal mb-4" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.6rem", color: "#F6F3F0" }}>
                  {watch.price}
                </div>
                
                <a
                  href="#hero"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center text-xs text-[#F2D28B] tracking-widest uppercase hover:underline cursor-none"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  Discover &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
