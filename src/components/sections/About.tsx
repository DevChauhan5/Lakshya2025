"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useSmoothScroll } from "@/context/SmoothScrollContext";
import Image from "next/image";

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  const description = [
    {
      type: "heading",
      text: "Lakshya is the flagship annual cultural and sports fest of Poornima University,",
    },
    {
      type: "text",
      text: "a grand five-day celebration of art, music, sports, and creativity.",
    },
    {
      type: "highlight",
      text: "More than just a fest, Lakshya is a movement of passion, unity, and self-expression,",
    },
    {
      type: "text",
      text: "bringing together students from diverse backgrounds to showcase their talents.",
    },
    {
      type: "spacer",
    },
    {
      type: "text",
      text: "With electrifying artist performances, thrilling sports competitions,",
    },
    {
      type: "text",
      text: "engaging games, and immersive activities,",
    },
    {
      type: "highlight",
      text: "Lakshya is an unforgettable experience where creativity meets competition.",
    },
    {
      type: "text",
      text: "It serves as a platform for self-discovery, teamwork, and cultural celebration,",
    },
    {
      type: "text",
      text: "fostering innovation, sportsmanship, and lifelong memories.",
    },
    {
      type: "spacer",
    },
    {
      type: "highlight",
      text: "At Lakshya, dreams take flight, talents shine, and the impossible becomes reality—",
    },
    {
      type: "heading",
      text: "a fest that unites, inspires, and transforms!",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, x: -50, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom ease curve for smoother animation
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-transparent py-20"
    >
      {/* Background gradient with parallax effect */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-b from-black via-theme-dark/20 to-black pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{ y }}
        className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center min-h-screen"
      >
        <SectionTitle title="About Us" />

        <div className="max-w-4xl w-full space-y-6">
          {description.map((item, index) =>
            item.type === "spacer" ? (
              <div key={index} className="h-6" />
            ) : (
              <motion.div
                key={index}
                variants={lineVariants}
                className="overflow-hidden"
              >
                <motion.p
                  className={`text-xl md:text-2xl font-light 
                    ${
                      item.type === "heading"
                        ? "text-theme-primary font-medium"
                        : ""
                    }
                    ${
                      item.type === "highlight"
                        ? "text-white/90"
                        : "text-white/70"
                    }
                    transform-gpu`}
                  whileHover={{
                    x: 20,
                    transition: {
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                >
                  {item.text}
                </motion.p>
              </motion.div>
            )
          )}
        </div>

        {/* Enhanced decorative elements with smoother animations */}
        <motion.div
          className="absolute top-1/4 right-[10%] w-32 h-32 bg-theme-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-[10%] w-40 h-40 bg-theme-secondary/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </section>
  );
};
