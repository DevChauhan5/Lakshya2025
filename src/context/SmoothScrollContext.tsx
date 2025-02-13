"use client";

import Lenis from "@studio-freight/lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface ScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: any) => void;
  scrollProgress: number;
  isScrolling: boolean;
}

const SmoothScrollContext = createContext<ScrollContextType>({
  lenis: null,
  scrollTo: () => {},
  scrollProgress: 0,
  isScrolling: false,
});

export const SmoothScrollProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    // Initialize Lenis with more balanced settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      smoothTouch: false, // Disable for mobile
      touchMultiplier: 2,
      infinite: false,
      wheelMultiplier: 1,
      normalizeWheel: false, // Disable wheel normalization
      lerp: 0.1,
    });

    setLenis(lenis);

    // Simple scroll handler without debounce
    const handleScroll = ({ progress }: { progress: number }) => {
      setScrollProgress(progress);
      setIsScrolling(true);

      // Simple timeout to reset scrolling state
      setTimeout(() => setIsScrolling(false), 100);
    };

    lenis.on("scroll", handleScroll);

    // Basic RAF
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options = {}) => {
      if (!lenis) return;

      const defaultOptions = {
        offset: 0,
        immediate: false,
        duration: 2.5, // Matched with main duration
        easing: (t: number) => {
          // Matching easing function
          const c4 = (2 * Math.PI) / 3;
          return t === 0
            ? 0
            : t === 1
            ? 1
            : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
        },
        lock: true, // Prevent user interruption during scroll
        onComplete: () => {}, // Optional callback
      };

      lenis.scrollTo(target, { ...defaultOptions, ...options });
    },
    [lenis]
  );

  return (
    <SmoothScrollContext.Provider
      value={{ lenis, scrollTo, scrollProgress, isScrolling }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
};

export const useSmoothScroll = () => {
  return useContext(SmoothScrollContext);
};

// Enhanced scroll animation hook with more options
export const useScrollAnimation = (options = {}) => {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;

  const [hasAnimated, setHasAnimated] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref || (triggerOnce && hasAnimated)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
        } else if (!triggerOnce) {
          setHasAnimated(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, triggerOnce, hasAnimated]);

  return [setRef, hasAnimated] as const;
};
