"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Stars = () => {
  const [stars, setStars] = useState<{ x: number; y: number; size: number }[]>(
    []
  );

  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 100; i++) {
        starArray.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2,
        });
      }
      setStars(starArray);
    };

    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      {stars.map((star, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 2,
          }}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
        />
      ))}
    </div>
  );
};
