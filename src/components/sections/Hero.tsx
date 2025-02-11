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

  // Enhanced spring config for smoother animations
  const springConfig = { stiffness: 100, damping: 30, mass: 1 };

  const titleY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 200]),
    springConfig
  );
  const titleScale = useSpring(
    useTransform(scrollYProgress, [0, 1], [1, 0.8]),
    springConfig
  );
  const titleRotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -10]),
    springConfig
  );

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center text-center w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-[1200px] mx-auto"
    >
      <motion.h1
        initial={{ opacity: 0, y: 50, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        style={{ y: titleY, scale: titleScale, rotate: titleRotate }}
        className={`${starwar.className} text-[60px] xs:text-[80px] sm:text-[100px] md:text-[130px] lg:text-[150px] xl:text-[180px] tracking-tighter relative leading-none bg-gradient-to-br from-yellow-400 via-red-500 to-purple-700 bg-clip-text text-transparent mix-blend-screen`}
      >
        LAKSHYA&apos;25
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: [0.23, 1, 0.32, 1],
        }}
        className="text-lg xs:text-xl md:text-2xl mt-4 md:mt-6 tracking-wide font-medium px-2 relative uppercase"
      >
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 opacity-80 bg-clip-text text-transparent blur-[1px]"
          animate={{
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Euphoria: Orbit of Wonder
        </motion.span>
        <span className="relative bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Euphoria: Orbit of Wonder
        </span>
      </motion.p>
    </div>
  );
};

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100svh] flex flex-col items-center justify-center bg-black"
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <SpaceElements />
        </motion.div>
      </div>

      <div className="relative w-full flex flex-col items-center justify-center min-h-[100svh] pointer-events-auto">
        <AnimatedTitle />

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1],
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 30px rgba(255,206,107,0.2)",
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            const eventsSection = document.getElementById("events");
            if (eventsSection) {
              eventsSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="mt-8 md:mt-12 px-8 md:px-12 py-3 md:py-4 rounded-2xl 
                   bg-gradient-to-r from-yellow-400/10 via-orange-400/10 to-yellow-400/10
                   backdrop-blur-sm border border-yellow-400/30 
                   text-yellow-400 transition-all duration-300
                   flex items-center gap-3 group text-base md:text-lg 
                   hover:border-yellow-400/60
                   cursor-pointer select-none relative"
        >
          <span>Explore Events</span>
          <motion.div
            animate={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </motion.div>

          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 
                     bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-yellow-400/20 
                     rounded-2xl blur-xl transition-opacity duration-500 pointer-events-none"
            initial={false}
            animate={{
              scale: [0.8, 1],
              opacity: [0, 1],
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          />
        </motion.button>
      </div>
    </section>
  );
};
