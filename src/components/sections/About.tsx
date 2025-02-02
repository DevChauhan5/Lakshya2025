"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" });

  const description = [
    "At Lakshya,",
    "we believe in creativity,",
    "innovation, and the endless",
    "possibilities of the universe.",
    "Our annual celebration showcases",
    "remarkable talents and inspires",
    "dreams across diverse fields.",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-transparent py-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-theme-dark/20 to-black pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center min-h-screen"
      >
        <motion.h2
          variants={titleVariants}
          className="text-6xl md:text-7xl font-bold mb-16 bg-gradient-to-r from-theme-primary via-theme-secondary to-theme-highlight bg-clip-text text-transparent"
        >
          About Us
        </motion.h2>

        <div className="max-w-4xl w-full space-y-4">
          {description.map((line, index) => (
            <motion.div
              key={index}
              variants={lineVariants}
              className="overflow-hidden"
            >
              <motion.p
                className="text-2xl md:text-3xl text-white/80 font-light"
                whileHover={{
                  color: "rgba(255, 206, 107, 0.95)",
                  x: 20,
                  transition: { duration: 0.2 },
                }}
              >
                {line}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-1/4 right-[10%] w-32 h-32 bg-theme-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-[10%] w-40 h-40 bg-theme-secondary/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </section>
  );
};
