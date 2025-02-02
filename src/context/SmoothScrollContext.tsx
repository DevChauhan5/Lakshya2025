"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";

const SmoothScrollContext = createContext({
  lenis: null as Lenis | null,
});

export const SmoothScrollProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    setLenis(lenis);

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
    <SmoothScrollContext.Provider value={{ lenis }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export const useSmoothScroll = () => {
  return useContext(SmoothScrollContext);
};
