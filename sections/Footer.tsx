import React from "react";

export default function Footer() {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer style={{ backgroundColor: "#050509" }} className="py-20 px-6 md:px-12 relative z-10 border-t border-white/[0.03]">
      <div className="max-w-[1100px] mx-auto flex flex-col items-center">
        
        {/* Top Centered Logo Seal */}
        <a 
          href="#" 
          onClick={handleLogoClick}
          className="flex flex-col items-center gap-4 cursor-none mb-12 select-none group"
        >
          <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
            <svg viewBox="0 0 40 40" className="w-12 h-12 absolute inset-0">
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
                fontSize: 16,
                transform: "translateY(-1px)",
              }}
            >
              IF
            </span>
          </div>

          <div className="text-center">
            <h4
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "1.4rem",
                letterSpacing: "0.3em",
                color: "#F6F3F0",
              }}
              className="uppercase font-normal leading-tight mb-2"
            >
              RUF & TUF
            </h4>
            <p className="label-small" style={{ color: "#9E9EAE" }}>
              Tactical Smartwatch Series
            </p>
          </div>
        </a>

        {/* Thin Gold Rule (linear-gradient horizontal) */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#F2D28B]/30 to-transparent mb-16" />

        {/* 3-Column Link Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left mb-16">
          {/* Column 1 */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h5 className="label-small text-[#F2D28B]">Editions</h5>
            <ul className="space-y-2 text-xs text-[#9E9EAE]">
              {["Desert Sandstorm", "Arctic Snow", "Jungle Nature", "Ocean Deep Sea", "Cyberpunk Neon", "RUF & TUF Core"].map((name) => (
                <li key={name}>
                  <a
                    href="#hero"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-[#F6F3F0] transition-colors cursor-none"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h5 className="label-small text-[#F2D28B]">Navigate</h5>
            <ul className="space-y-2 text-xs text-[#9E9EAE]">
              <li>
                <a
                  href="#catalog"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-[#F6F3F0] transition-colors cursor-none"
                >
                  Collection
                </a>
              </li>
              <li>
                <a
                  href="#story"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-[#F6F3F0] transition-colors cursor-none"
                >
                  Story
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#F6F3F0] transition-colors cursor-none">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h5 className="label-small text-[#F2D28B]">House</h5>
            <ul className="space-y-2 text-xs text-[#9E9EAE]">
              <li>
                <a
                  href="#story"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-[#F6F3F0] transition-colors cursor-none"
                >
                  Philosophy
                </a>
              </li>
              <li>
                <a
                  href="#story"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-[#F6F3F0] transition-colors cursor-none"
                >
                  Craft
                </a>
              </li>
              <li>
                <a href="#sourcing" className="hover:text-[#F6F3F0] transition-colors cursor-none">
                  Sourcing
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full border-t border-[#F2D28B]/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-[#9E9EAE]/60" style={{ fontFamily: '"Inter", sans-serif' }}>
            © 2025 RUF & TUF. All rights reserved.
          </p>
          <p className="text-[10px] text-[#9E9EAE]/60 font-light" style={{ fontFamily: '"Inter", sans-serif' }}>
            Crafted with intention.
          </p>
        </div>

      </div>
    </footer>
  );
}
