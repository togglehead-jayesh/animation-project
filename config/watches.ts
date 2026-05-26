export interface Watch {
  id: string;
  chapter: string;
  title: string;
  subtitle: string;
  price: string | null;
  features?: string[];
  ctaPrimary?: string;
  ctaSecondary?: string;
}

export const watches: Watch[] = [
  {
    id: "entry",
    chapter: "The Portal",
    title: "RUF & TUF Experience",
    subtitle: "Built for extreme conditions and survival terrain. Scroll to explore the editions.",
    price: null,
  },
  {
    id: "desert-edition",
    chapter: "Chapter I",
    title: "Desert Sandstorm Edition",
    subtitle:
      "Built for extreme heat and survival terrain. Sand-resistant titanium construction engineered for harsh desert conditions.",
    price: "₹24,999",
    features: [
      "Sand-resistant titanium body",
      "Military tactical build",
      "Heat adaptive battery system",
      "Dust-proof rugged design"
    ],
    ctaPrimary: "Buy Desert Edition — ₹24,999",
    ctaSecondary: "Explore Desert Edition"
  },
  {
    id: "arctic-edition",
    chapter: "Chapter II",
    title: "Arctic Snow Edition",
    subtitle:
      "Designed for frozen environments with ice-resistant engineering and precision cold-weather performance.",
    price: "₹26,999",
    features: [
      "Frost-resistant titanium shell",
      "Cold adaptive display system",
      "Ice-sealed tactical buttons",
      "Extreme weather durability"
    ],
    ctaPrimary: "Buy Arctic Edition — ₹26,999",
    ctaSecondary: "Explore Arctic Edition"
  },
  {
    id: "jungle-edition",
    chapter: "Chapter III",
    title: "Jungle Nature Edition",
    subtitle:
      "Crafted for rainforest exploration with moisture protection and tactical outdoor intelligence.",
    price: "₹25,999",
    features: [
      "Humidity-resistant design",
      "Tactical explorer interface",
      "Military green titanium finish",
      "Adventure survival build"
    ],
    ctaPrimary: "Buy Jungle Edition — ₹25,999",
    ctaSecondary: "Explore Jungle Edition"
  },
  {
    id: "ocean-edition",
    chapter: "Chapter IV",
    title: "Ocean Deep Sea Edition",
    subtitle:
      "Engineered for underwater exploration with deep-sea resistance and advanced waterproof construction.",
    price: "₹27,999",
    features: [
      "Deep sea waterproof system",
      "Ocean pressure resistance",
      "Marine-grade titanium body",
      "Diver survival interface"
    ],
    ctaPrimary: "Buy Ocean Edition — ₹27,999",
    ctaSecondary: "Explore Ocean Edition"
  },
  {
    id: "cyberpunk-edition",
    chapter: "Chapter V",
    title: "Cyberpunk Neon Edition",
    subtitle:
      "A futuristic urban tactical smartwatch designed for neon cities, advanced tech lifestyles, and night operations.",
    price: "₹29,999",
    features: [
      "Neon reactive UI system",
      "Carbon black tactical body",
      "Future-tech interface",
      "Night mode AI display"
    ],
    ctaPrimary: "Buy Cyberpunk Edition — ₹29,999",
    ctaSecondary: "Explore Cyberpunk Edition"
  },
  {
    id: "ruf-tuf-core",
    chapter: "The Core",
    title: "RUF & TUF",
    subtitle:
      "One watch. Five worlds. Built for every environment on Earth.",
    price: null,
    ctaPrimary: "Enter The Experience"
  }
];
