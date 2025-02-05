"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Stars } from "../effects/Stars";
import { Rings } from "../effects/Rings";

const SpaceElements = () => {
  // Fixed positions for orbs to prevent hydration mismatch
  const orbPositions = [
    { top: 15, left: 25 },
    { top: 35, left: 75 },
    { top: 65, left: 15 },
    { top: 45, left: 85 },
    { top: 75, left: 45 },
  ];

  return (
    <>
      {/* Deep space gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-theme-light via-theme-dark to-black" />

      {/* Animated rings */}
      <Rings />

      {/* Stars effect with increased density */}
      <Stars />

      {/* Additional glowing orbs */}
      {orbPositions.map((position, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-theme-primary rounded-full"
          style={{
            top: `${position.top}%`,
            left: `${position.left}%`,
            filter: "blur(1px)`",
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
};

const AnimatedTitle = () => {
  return (
    <div className="relative z-10 flex flex-col items-center text-center">
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 bg-theme-primary/10 blur-[120px] rounded-full"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.h1
        className="text-[130px] sm:text-[150px] md:text-[180px] font-bold tracking-tighter text-theme-primary
                   [text-shadow:0_0_30px_rgba(255,206,107,0.3)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        LAKSHYA&apos;25
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-xl md:text-2xl text-white/80 mt-6 tracking-wide"
      >
        Explore the infinite.
      </motion.p>
    </div>
  );
};

const AnimatedButton = () => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      whileHover={{ scale: 1.05 }}
      className="relative z-10 mt-12 px-10 py-3 rounded-full bg-theme-dark/10 backdrop-blur-sm
                 border border-theme-primary/20 text-theme-primary hover:bg-theme-dark/20 transition-all
                 flex items-center gap-2 group text-lg hover:border-theme-primary/50
                 hover:[box-shadow:0_0_20px_rgba(255,206,107,0.3)]"
    >
      <span>See events</span>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="group-hover:translate-x-1 transition-transform"
      >
        <path d="M5 12h14m-7-7 7 7-7 7" />
      </motion.svg>
    </motion.button>
  );
};

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full h-full absolute inset-0"
      >
        <SpaceElements />
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
        <AnimatedTitle />
        <AnimatedButton />
      </div>
    </section>
  );
};
