"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import localFont from "next/font/local";
import { useRef, useEffect, useState } from "react";
import { Meteors } from "../magicui/meteors";
import { Particles } from "../magicui/particles";
import { Rings } from "../effects/Rings";

const starwar = localFont({
  src: "../../app/fonts/star.woff",
  variable: "--font-starwars",
});

const SpaceElements = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <div className="absolute inset-0 bg-black" />
      {!isMobile && (
        <>
          <Particles
            className="absolute inset-0"
            quantity={200}
            staticity={30}
            size={0.4}
            color="#ffce6b"
          />
          <div className="absolute inset-0">
            <Meteors
              number={8}
              className="from-yellow-400 via-red-500 to-purple-700"
            />
          </div>
          <Rings />
        </>
      )}
      {isMobile && (
        <div className="absolute inset-0 bg-gradient-to-b from-black via-theme-dark/5 to-black" />
      )}
    </>
  );
};

const AnimatedTitle = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const titleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), {
    stiffness: 50,
    damping: 30,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1400px] mx-auto px-4"
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Simplified glow effect for mobile */}
        {!isMobile && (
          <div className="absolute inset-0 rounded-full opacity-20 blur-3xl bg-gradient-radial from-theme-primary/30 via-transparent to-transparent" />
        )}

        {/* Main title with simplified mobile animations */}
        <motion.h1
          initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{
            duration: isMobile ? 0.5 : 1,
            ease: "easeOut",
          }}
          style={isMobile ? undefined : { y: titleY }}
          className={`${starwar.className} 
            relative text-center
            text-[50px] xs:text-[60px] sm:text-[80px] md:text-[120px] lg:text-[150px] xl:text-[180px]
            leading-[0.9] sm:leading-[0.95] md:leading-[1]
            tracking-tighter
            bg-gradient-to-br from-yellow-400 via-red-500 to-purple-700 
            bg-clip-text text-transparent mix-blend-screen
            py-2`}
        >
          LAKSHYA&apos;25
        </motion.h1>

        {/* Simplified subtitle for mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl 
                    tracking-wide font-medium px-2 relative uppercase text-center
                    bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 
                    bg-clip-text text-transparent mt-2 sm:mt-4"
        >
          Euphoria: Orbit of Wonder
        </motion.div>
      </div>
    </div>
  );
};

export const Hero = () => {
  return (
    <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center bg-black overflow-hidden">
      <SpaceElements />

      <div className="relative w-full flex flex-col items-center justify-center gap-6 sm:gap-8">
        <AnimatedTitle />

        {/* Simplified button for mobile */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => {
            document
              .getElementById("events")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl 
                   bg-gradient-to-r from-yellow-400/10 via-orange-400/10 to-yellow-400/10
                   backdrop-blur-sm border border-yellow-400/30 
                   active:scale-95 hover:border-yellow-400/60 text-yellow-400
                   transition-all duration-300 flex items-center gap-2 sm:gap-3"
        >
          <span>Explore Events</span>
          <span>→</span>
        </motion.button>
      </div>
    </section>
  );
};
