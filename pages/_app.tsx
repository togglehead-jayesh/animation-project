import type { AppProps } from "next/app";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import "@/styles/globals.css";

const Header = dynamic(() => import("@/components/Header"), { ssr: false });

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    let isMounted = true;
    let lenisInstance: any = null;
    let gsapModule: any = null;
    let onTickHandler: ((time: number) => void) | null = null;

    const init = async () => {
      const { default: Lenis } = await import("lenis");
      const gsapImport = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { ScrollToPlugin } = await import("gsap/ScrollToPlugin");

      if (!isMounted) return;

      const gsap = gsapImport.gsap;
      gsapModule = gsap;
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

      const lenis = new Lenis({
        duration: 1.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.2,
      });

      lenisInstance = lenis;
      lenis.on("scroll", ScrollTrigger.update);

      const onTick = (time: number) => lenis.raf(time * 1000);
      onTickHandler = onTick;
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
    };

    init();

    return () => {
      isMounted = false;
      if (onTickHandler && gsapModule) {
        gsapModule.ticker.remove(onTickHandler);
      }
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, []);

  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
