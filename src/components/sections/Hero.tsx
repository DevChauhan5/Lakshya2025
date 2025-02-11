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

  // Simplified spring config
  const springConfig = { stiffness: 50, damping: 30, mass: 1 };

  // Only keep subtle parallax effect, remove rotation and scale
  const titleY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 100]),
    springConfig
  );

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center text-center w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-[1200px] mx-auto"
    >
      <div className="relative">
        {/* Glow effect */}
        <motion.div
          className="absolute -inset-10 bg-gradient-to-r from-yellow-500/20 via-red-500/20 to-purple-500/20 
                     rounded-full blur-3xl opacity-0"
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main title - removed rotation and scale transforms */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.23, 1, 0.32, 1],
          }}
          style={{ y: titleY }}
          className={`${starwar.className} relative text-[60px] xs:text-[80px] sm:text-[100px] md:text-[130px] 
                     lg:text-[150px] xl:text-[180px] tracking-tighter leading-none 
                     bg-gradient-to-br from-yellow-400 via-red-500 to-purple-700 
                     bg-clip-text text-transparent mix-blend-screen
                     after:absolute after:inset-0 after:bg-gradient-to-r 
                     after:from-transparent after:via-white/40 after:to-transparent
                     after:translate-x-[-200%] after:animate-shine
                     hover:after:translate-x-[200%] after:transition-transform
                     after:duration-1000 overflow-hidden`}
        >
          LAKSHYA&apos;25
        </motion.h1>
      </div>

      {/* Enhanced subtitle with split animation */}
      <div className="relative">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg xs:text-xl md:text-2xl mt-4 md:mt-6 tracking-wide font-medium px-2 relative uppercase"
        >
          {["Euphoria:", "Orbit", "of", "Wonder"].map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5 + i * 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <span className="relative">
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 
                           opacity-80 bg-clip-text text-transparent blur-[1px]"
                  animate={{
                    opacity: [0.6, 0.8, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                >
                  {word}
                </motion.span>
                <span
                  className="relative bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 
                               bg-clip-text text-transparent"
                >
                  {word}
                </span>
              </span>
            </motion.span>
          ))}
        </motion.p>
      </div>
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
      {/* Enhanced background animation */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
      >
        <SpaceElements />
      </motion.div>

      <div className="relative w-full flex flex-col items-center justify-center min-h-[100svh]">
        <AnimatedTitle />

        {/* Enhanced button with glow effect */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 30px rgba(255,206,107,0.3)",
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            const eventsSection = document.getElementById("events");
            if (eventsSection) {
              eventsSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="relative mt-8 md:mt-12 px-8 md:px-12 py-3 md:py-4 rounded-2xl 
                   overflow-hidden group"
        >
          {/* Button background with animated gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/30 to-yellow-400/20"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Button content */}
          <div className="relative flex items-center gap-3 text-yellow-400 text-base md:text-lg">
            <motion.span
              animate={{ x: 0 }}
              whileHover={{ x: -3 }}
              transition={{ duration: 0.3 }}
            >
              Explore Events
            </motion.span>
            <motion.div
              animate={{ x: 0 }}
              whileHover={{ x: 3 }}
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
          </div>

          {/* Enhanced hover glow effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            initial={false}
            animate={{
              boxShadow: [
                "0 0 0px rgba(255,206,107,0)",
                "0 0 20px rgba(255,206,107,0.3)",
                "0 0 0px rgba(255,206,107,0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.button>
      </div>
    </section>
  );
};
