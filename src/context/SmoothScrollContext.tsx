"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";

interface ScrollContextType {
  lenis: Lenis | null;
  scrollProgress: number;
}

const SmoothScrollContext = createContext<ScrollContextType>({
  lenis: null,
  scrollProgress: 0,
});

export const SmoothScrollProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.2,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      wheelMultiplier: 1.1,
      lerp: 0.1,
    });

    setLenis(lenis);

    lenis.on("scroll", ({ progress }: { progress: number }) => {
      setScrollProgress(progress);
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis, scrollProgress }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export const useSmoothScroll = () => {
  return useContext(SmoothScrollContext);
};

// Utility hook for scroll-based animations
export const useScrollAnimation = (threshold = 0.1) => {
  const { scrollProgress } = useSmoothScroll();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (scrollProgress > threshold && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [scrollProgress, threshold, hasAnimated]);

  return hasAnimated;
};
