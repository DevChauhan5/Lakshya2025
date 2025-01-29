"use client";

import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { Stars } from "../effects/Stars";

const AnimatedLetter = ({
  letter,
  index,
}: {
  letter: string;
  index: number;
}) => {
  const controls = useAnimationControls();

  useEffect(() => {
    const interval = setInterval(() => {
      controls.start({
        y: [0, -15, 0],
        rotate: [0, -5, 5, 0],
        transition: {
          duration: 0.8,
          ease: "easeInOut",
        },
      });
    }, 2000 + index * 100);

    return () => clearInterval(interval);
  }, [controls, index]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: index * 0.1,
        },
      }}
      className="inline-block"
      whileHover={{
        scale: 1.2,
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.3 },
      }}
    >
      <motion.span
        animate={controls}
        className={`inline-block ${
          index % 2 === 0
            ? "bg-gradient-to-r from-gold via-orange to-red"
            : "bg-gradient-to-r from-pink via-purple-light to-gold"
        } bg-clip-text text-transparent`}
      >
        {letter}
      </motion.span>
    </motion.span>
  );
};

export const Hero = () => {
  const title = "LAKSHYA'25";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-purple-dark to-black">
      <Stars />

      <div className="relative z-10 text-center">
        <h1 className="space-x-3 text-8xl font-bold leading-tight md:text-9xl lg:text-[12rem]">
          {title.split("").map((letter, index) => (
            <AnimatedLetter key={index} letter={letter} index={index} />
          ))}
        </h1>

        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 30px rgba(255, 206, 107, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          className="relative mt-12 overflow-hidden rounded-full bg-gradient-to-r from-gold via-red to-pink px-12 py-4 text-xl font-semibold text-purple-dark transition-all"
        >
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-pink via-gold to-red"
            animate={{
              x: ["0%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{ opacity: 0.5 }}
          />
          <span className="relative">Enter Portal</span>
        </motion.button>
      </div>
    </div>
  );
};
