"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Stars } from "../effects/Stars";
import { Rings } from "../effects/Rings";
import localFont from "next/font/local";
import gsap from "gsap";

const starwar = localFont({
  src: "../../app/fonts/star.woff",
  variable: "--font-starwars",
});

const SpaceElements = () => {
  return (
    <>
      {/* Pure black background */}
      <div className="absolute inset-0 bg-black" />

      {/* Animated rings */}
      <Rings />

      {/* Stars effect with increased density */}
      <Stars />
    </>
  );
};

const AnimatedTitle = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [starPositions, setStarPositions] = useState<
    Array<{ top: number; left: number }>
  >([]);

  useEffect(() => {
    // Generate star positions once on client-side
    const positions = Array(20)
      .fill(0)
      .map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
      }));
    setStarPositions(positions);

    const title = titleRef.current;
    const subtitle = subtitleRef.current;

    gsap.fromTo(
      title,
      {
        opacity: 0,
        y: 50,
        scale: 0.8,
        rotation: -10,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      subtitle,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className="relative z-10 flex flex-col items-center text-center w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-[1200px] mx-auto">
      {/* Stars effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {starPositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            style={{
              top: `${position.top}%`,
              left: `${position.left}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center px-4">
        <h1
          ref={titleRef}
          className={`${starwar.className} text-[60px] xs:text-[80px] sm:text-[100px] md:text-[130px] lg:text-[150px] xl:text-[180px] tracking-tighter relative leading-none`}
        >
          <span className="relative inline-block whitespace-nowrap">
            <span className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-red-500 to-purple-700 opacity-80 bg-clip-text text-transparent blur-[2px]">
              LAKSHYA&apos;25
            </span>
            <span className="relative bg-gradient-to-br from-yellow-400 via-red-500 to-purple-700 bg-clip-text text-transparent">
              LAKSHYA&apos;25
            </span>
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg xs:text-xl md:text-2xl mt-4 md:mt-6 tracking-wide bg-gradient-to-r from-yellow-400 via-red-500 to-purple-700 bg-clip-text text-transparent font-semibold px-2"
        >
          Euphoria: Orbit of Wonder
        </p>
      </div>
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
      className="relative z-10 mt-8 md:mt-12 px-6 md:px-10 py-2.5 md:py-3 rounded-full 
                 bg-black/20 backdrop-blur-sm border border-yellow-400/30 
                 text-yellow-400 hover:bg-black/40 transition-all
                 flex items-center gap-2 group text-base md:text-lg 
                 hover:border-yellow-400/60 hover:[box-shadow:0_0_20px_rgba(255,206,107,0.2)]"
    >
      <span>See events</span>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
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
      className="relative w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full h-full absolute inset-0"
      >
        <SpaceElements />
      </motion.div>

      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-[100svh]">
        <AnimatedTitle />
        <AnimatedButton />
      </div>
    </section>
  );
};
