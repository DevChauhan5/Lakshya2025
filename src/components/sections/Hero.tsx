"use client";

import { motion } from "framer-motion";
import { Stars } from "../effects/Stars";

export const Hero = () => {
  const title = "LAKSHYA'25";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#000000]">
      <Stars />
      <div className="relative z-10 max-w-5xl px-4 text-center">
        {/* Reduced glowing effect */}
        <div className="relative">
          <motion.div
            animate={{
              opacity: [0.6, 0.9, 0.6],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute -inset-20 z-0 rounded-full bg-gradient-to-r from-gold/10 via-pink/10 to-purple-light/10 blur-3xl"
          />
          <h1 className="relative z-10 text-8xl font-bold leading-none tracking-tighter md:text-9xl lg:text-[10rem] bg-gradient-to-br from-pink via-gold to-orange bg-clip-text text-transparent">
            LAKSHYA&apos;25
          </h1>
        </div>

        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 30px rgba(255, 206, 107, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          className="relative mt-16 overflow-hidden rounded-full bg-gradient-to-r from-gold via-red to-pink px-10 py-3 text-lg font-semibold text-purple-dark transition-all hover:from-pink hover:via-purple-light hover:to-gold"
        >
          <span className="relative">Enter Portal</span>
        </motion.button>
      </div>
    </div>
  );
};
