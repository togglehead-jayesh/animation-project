import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const editions = [
    { name: "Desert Edition", href: "#hero" },
    { name: "Arctic Edition", href: "#hero" },
    { name: "Jungle Edition", href: "#hero" },
    { name: "Ocean Edition", href: "#hero" },
    { name: "Cyberpunk Edition", href: "#hero" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
      <nav
        className={cn(
          "flex items-center gap-6 px-6 py-3 rounded-full border border-white/5 transition-all duration-500 pointer-events-auto",
          scrolled 
            ? "bg-[#050509]/80 backdrop-blur-3xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]" 
            : "bg-[#050509]/45 backdrop-blur-xl"
        )}
      >
        {/* Monogram Seal Logo */}
        <div className="flex items-center gap-3 select-none">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-10 h-10 absolute inset-0">
              <circle cx="20" cy="20" r="18.5" stroke="#F2D28B" strokeWidth="0.7" strokeOpacity="0.65" fill="none" />
              <polygon points="20,2 21.4,4.2 20,6.4 18.6,4.2" fill="#F2D28B" fillOpacity="0.65" />
              <polygon points="20,33.6 21.4,35.8 20,38 18.6,35.8" fill="#F2D28B" fillOpacity="0.65" />
              <line x1="1.5" y1="20" x2="4" y2="20" stroke="#F2D28B" strokeWidth="0.7" strokeOpacity="0.4" />
              <line x1="36" y1="20" x2="38.5" y2="20" stroke="#F2D28B" strokeWidth="0.7" strokeOpacity="0.4" />
            </svg>
            <span
              className="z-10 font-normal text-[#F2D28B]"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 13,
                transform: "translateY(-1px)",
              }}
            >
              RT
            </span>
          </div>

          <div className="flex flex-col justify-center">
            <span
              className="text-[#F2D28B]/55 font-normal leading-none"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 6.5,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
              }}
            >
              RUF & TUF
            </span>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="h-6 w-[1px] bg-white/10" />

        {/* Links & Dropdowns */}
        <div className="flex items-center gap-6 text-xs uppercase tracking-widest text-[#9E9EAE]">
          
          {/* Experience Dropdown trigger */}
          <div
            className="relative py-2 cursor-none select-none group"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span className="hover:text-[#F6F3F0] transition-colors flex items-center gap-1 cursor-none">
              Editions <span className="text-[8px] transition-transform duration-300 group-hover:rotate-180">▼</span>
            </span>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 py-3 rounded-2xl bg-[#050509]/95 border border-white/10 backdrop-blur-3xl shadow-[0_15px_40px_rgba(0,0,0,0.9)] flex flex-col gap-1 z-50"
                >
                  {editions.map((item, idx) => (
                    <motion.a
                      key={idx}
                      href={item.href}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      onClick={(e) => {
                        e.preventDefault();
                        const catalogElem = document.getElementById("catalog");
                        if (catalogElem) {
                          catalogElem.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="px-4 py-2 text-left font-medium capitalize text-xs tracking-wider text-[#9E9EAE] hover:text-[#F6F3F0] hover:bg-[#F2D28B]/5 transition-colors cursor-none block"
                      style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 14 }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="#catalog"
            className="hover:text-[#F6F3F0] transition-colors cursor-none"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Collection
          </a>
          
          <a
            href="#story"
            className="hover:text-[#F6F3F0] transition-colors cursor-none"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Story
          </a>
        </div>

        {/* Vertical Divider */}
        <div className="h-6 w-[1px] bg-white/10" />

        {/* Shop Now pill */}
        <a
          href="#catalog"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="btn-outline px-5 py-2 text-[10px] font-semibold uppercase tracking-widest cursor-none border-[#F2D28B] text-[#F2D28B]"
        >
          Shop Now
        </a>
      </nav>
    </header>
  );
}
