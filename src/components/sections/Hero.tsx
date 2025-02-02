"use client";

import { motion } from "framer-motion";
import { Stars } from "../effects/Stars";
import { useEffect, useState } from "react";

const ClientStars = () => {
  return <Stars />;
};

const AnimatedNebula = () => {
  return (
    <motion.div
      initial={{ rotate: 0, opacity: 0.2 }}
      animate={{ rotate: 360, opacity: [0.2, 0.8, 0.2] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 z-[-1] bg-[radial-gradient(circle_at_center,_rgba(128,0,128,0.5),transparent)]"
    />
  );
};

const AnimatedBackground = () => {
  return (
    <motion.div
      initial={{ opacity: 0.7, scale: 0.9, rotate: -10 }}
      animate={{
        opacity: [0.7, 1, 0.7],
        scale: [0.9, 1, 0.9],
        rotate: [-10, 10, -10],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
      className="absolute -inset-20 z-0 rounded-full bg-gradient-to-r from-[#8a2be2]/20 via-[#4b0082]/20 to-[#00008b]/20 blur-3xl"
    />
  );
};

const AnimatedButton = () => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.1,
        boxShadow: "0 0 30px rgba(255, 206, 107, 0.6)",
      }}
      whileTap={{ scale: 0.95 }}
      className="relative mt-16 overflow-hidden rounded-full bg-gradient-to-r from-gold via-red to-pink px-10 py-3 text-lg font-semibold text-purple-dark transition-all hover:from-pink hover:via-purple-light hover:to-gold"
    >
      <span className="relative">Enter Portal</span>
    </motion.button>
  );
};

// New component rendering a letter with its background video masked to the letter shape.
const LetterVideo = ({ letter, index }: { letter: string; index: number }) => {
  // For spaces, simply output a spacer.
  if (letter === " ") {
    return <span className="w-2 inline-block">&nbsp;</span>;
  }

  return (
    <motion.svg
      width="1em"
      height="1em"
      viewBox="0 0 100 100"
      className="inline-block overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.15, duration: 0.3 }}
    >
      <defs>
        <mask id={`mask-letter-${index}`}>
          {/* Full rectangle in black, then white text for the mask shape */}
          <rect width="100%" height="100%" fill="black" />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="80"
            fontWeight="bold"
            fill="white"
          >
            {letter}
          </text>
        </mask>
      </defs>
      <g mask={`url(#mask-letter-${index})`}>
        <foreignObject width="100%" height="100%">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src={`/videos/hero/${index + 1}.webm`}
          />
        </foreignObject>
      </g>
    </motion.svg>
  );
};

export const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const title = "LAKSHYA'25";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#000000]">
      {isMounted && <ClientStars />}
      {isMounted && <AnimatedNebula />}
      <div className="relative z-10 max-w-5xl px-4 text-center">
        <div className="relative">
          {isMounted && <AnimatedBackground />}
          {/* Render each letter via LetterVideo so that video shows inside the letter shape */}
          {isMounted && (
            <h1 className="relative z-10 flex justify-center space-x-1 md:space-x-2 text-6xl sm:text-8xl md:text-9xl lg:text-[10rem]">
              {Array.from(title).map((char, index) => (
                <LetterVideo key={index} letter={char} index={index} />
              ))}
            </h1>
          )}
        </div>
        {isMounted && <AnimatedButton />}
      </div>
    </div>
  );
};
