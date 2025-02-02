"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

export const Stars = () => {
  // Generate fixed star positions using useMemo to prevent hydration mismatches
  const stars = useMemo(() => {
    const starArray = [];
    const seed = 42; // Fixed seed for consistent random numbers
    const pseudoRandom = (index: number) => {
      const x = Math.sin(seed + index) * 10000;
      return Number((x - Math.floor(x)).toFixed(4)); // Round to 4 decimal places
    };

    for (let i = 0; i < 200; i++) {
      starArray.push({
        x: Number((pseudoRandom(i) * 100).toFixed(4)),
        y: Number((pseudoRandom(i + 1) * 100).toFixed(4)),
        size: Number((pseudoRandom(i + 2) * 1.5 + 0.5).toFixed(4)),
        delay: Number((pseudoRandom(i + 3) * 3).toFixed(4)),
      });
    }
    return starArray;
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      {stars.map((star, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0.5, 1, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            delay: star.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: "white",
            borderRadius: "9999px",
            filter: "blur(0.5px)",
            boxShadow: "0 0 2px rgba(255,255,255,0.5)",
          }}
        />
      ))}
    </div>
  );
};
