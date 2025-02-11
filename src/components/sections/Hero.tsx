"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import localFont from "next/font/local";
import { useRef } from "react";
import { Rings } from "../effects/Rings";
import { Stars } from "../effects/Stars";

const starwar = localFont({
  src: "../../app/fonts/star.woff",
  variable: "--font-starwars",
});

const SpaceElements = () => {
  return (
    <>
      <div className="absolute inset-0 bg-black" />
      <Rings />
      <Stars />
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

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1400px] mx-auto px-4"
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Static glow effect */}
        <div className="absolute inset-0 rounded-full opacity-20 blur-3xl bg-gradient-radial from-theme-primary/30 via-transparent to-transparent" />

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          style={{ y: titleY }}
          className={`${starwar.className} 
            relative text-center
            text-[40px] xs:text-[60px] sm:text-[80px] md:text-[100px] lg:text-[130px]
            leading-[1] tracking-tighter
            bg-gradient-to-br from-yellow-400 via-red-500 to-purple-700 
            bg-clip-text text-transparent mix-blend-screen
            py-2`}
        >
          LAKSHYA&apos;25
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 text-center"
        >
          <p
            className="text-base xs:text-lg sm:text-xl md:text-2xl 
                       bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 
                       bg-clip-text text-transparent font-medium"
          >
            Euphoria: Orbit of Wonder
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export const Hero = () => {
  return (
    <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <SpaceElements />
      </motion.div>

      {/* Content */}
      <div className="relative w-full flex flex-col items-center justify-center gap-8">
        <AnimatedTitle />

        {/* Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            document
              .getElementById("events")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-8 py-3 rounded-xl bg-gradient-to-r 
                     from-yellow-400/10 via-orange-400/10 to-yellow-400/10
                     hover:from-yellow-400/20 hover:via-orange-400/20 hover:to-yellow-400/20
                     backdrop-blur-sm border border-yellow-400/30 
                     hover:border-yellow-400/60 text-yellow-400
                     transition-all duration-300 flex items-center gap-3"
        >
          <span>Explore Events</span>
          <motion.span whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            →
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
};
