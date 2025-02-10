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

  useEffect(() => {
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
    <div className="relative flex flex-col items-center text-center w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-[1200px] mx-auto">
      {/* Main title */}
      <h1
        ref={titleRef}
        className={`${starwar.className} text-[60px] xs:text-[80px] sm:text-[100px] md:text-[130px] lg:text-[150px] xl:text-[180px] tracking-tighter relative leading-none bg-gradient-to-br from-yellow-400 via-red-500 to-purple-700 bg-clip-text text-transparent mix-blend-screen`}
      >
        LAKSHYA&apos;25
      </h1>

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        className="text-lg xs:text-xl md:text-2xl mt-4 md:mt-6 tracking-wide font-medium px-2 relative uppercase"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 opacity-80 bg-clip-text text-transparent blur-[1px]">
          Euphoria: Orbit of Wonder
        </span>
        <span className="relative bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Euphoria: Orbit of Wonder
        </span>
      </p>
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
      {/* Background Elements - with pointer-events-none */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <SpaceElements />
        </motion.div>
      </div>

      {/* Content Container - with pointer-events-auto */}
      <div className="relative w-full flex flex-col items-center justify-center min-h-[100svh] pointer-events-auto">
        <AnimatedTitle />
        <div className="relative z-50">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 md:mt-12 px-8 md:px-12 py-3 md:py-4 rounded-2xl 
                     bg-gradient-to-r from-yellow-400/10 via-orange-400/10 to-yellow-400/10
                     hover:from-yellow-400/20 hover:via-orange-400/20 hover:to-yellow-400/20
                     backdrop-blur-sm border border-yellow-400/30 
                     text-yellow-400 transition-all duration-300
                     flex items-center gap-3 group text-base md:text-lg 
                     hover:border-yellow-400/60 hover:[box-shadow:0_0_30px_rgba(255,206,107,0.15)]
                     cursor-pointer select-none"
            onClick={() => {
              const eventsSection = document.getElementById("events");
              if (eventsSection) {
                eventsSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span>Explore Events</span>
            <motion.div
              className="flex items-center"
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

            {/* Glow effect with pointer-events-none */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-yellow-400/20 blur-xl" />
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
