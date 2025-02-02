"use client";

import { motion } from "framer-motion";

export const Rings = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {[1, 2, 3, 4].map((ring) => (
        <motion.div
          key={ring}
          className="absolute border border-white/10 rounded-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            width: `${ring * 15}rem`,
            height: `${ring * 15}rem`,
          }}
          transition={{
            duration: 2,
            delay: ring * 0.2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
