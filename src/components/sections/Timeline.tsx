"use client";

import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { SectionTitle } from "../ui/SectionTitle";

const posters = [
  {
    id: 1,
    title: "Day 1",
    date: "March 1, 2025",
    image: "/images/timeline/1.jpg",
    description: "Opening Ceremony & Cultural Night",
  },
  {
    id: 2,
    title: "Day 2",
    date: "March 2, 2025",
    image: "/images/timeline/2.jpg",
    description: "Sports & E-Sports Tournaments",
  },
  {
    id: 3,
    title: "Day 3",
    date: "March 3, 2025",
    image: "/images/timeline/3.jpg",
    description: "Technical Events & Workshops",
  },
  {
    id: 4,
    title: "Day 4",
    date: "March 4, 2025",
    image: "/images/timeline/4.jpg",
    description: "Star Night & Closing Ceremony",
  },
];

const PosterCard = ({ poster, index, containerProgress }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, {
    once: false,
    margin: "-15% 0px",
    amount: 0.4,
  });

  // Optimized animations config
  const springConfig = {
    stiffness: 70,
    damping: 15,
    mass: 0.5,
  };

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Smoother scale animation
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]),
    springConfig
  );

  // Enhanced opacity transition
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]),
    springConfig
  );

  // Direction-based animations
  const isLeftCard = index % 2 === 0;
  const xOffset = isLeftCard ? -50 : 50;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: xOffset }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              transition: {
                type: "spring",
                stiffness: 50,
                damping: 20,
                mass: 1,
              },
            }
          : {}
      }
      style={{ scale, opacity }}
      className="w-full aspect-[4/5] relative max-h-[70vh]" // Adjusted aspect ratio and max height
    >
      <motion.div
        className="relative w-full h-full rounded-xl overflow-hidden
                   shadow-xl shadow-black/20"
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
      >
        {/* Image with dynamic blur effect */}
        <motion.div className="absolute inset-0">
          <Image
            src={poster.image}
            alt={poster.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index < 2}
          />
        </motion.div>

        {/* Enhanced gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b 
                     from-black/0 via-black/50 to-black"
          style={{
            opacity: useSpring(
              useTransform(scrollYProgress, [0, 0.5], [0.5, 0.8]),
              springConfig
            ),
          }}
        />

        {/* Adjusted content padding and spacing */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.23, 1, 0.32, 1],
                  },
                }
              : {}
          }
        >
          <motion.h3 className="text-xl sm:text-2xl font-bold text-theme-primary mb-1.5">
            {poster.title}
          </motion.h3>
          <motion.p className="text-sm sm:text-base text-white/90 mb-1">
            {poster.date}
          </motion.p>
          <motion.p className="text-xs sm:text-sm text-white/70 line-clamp-2">
            {poster.description}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const Timeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Enhanced spring config for smoother transitions
  const springConfig = { stiffness: 50, damping: 15 };

  // Earlier fade in for title
  const titleOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.05], [0, 1]),
    springConfig
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-black overflow-hidden py-16"
    >
      {/* Background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-theme-dark/20 via-black to-black"
        style={{
          opacity: useSpring(
            useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]),
            springConfig
          ),
        }}
      />

      {/* Centered and earlier visible title */}
      <motion.div
        className="sticky top-0 pt-16 pb-4 px-4 z-50 bg-black/50 backdrop-blur-sm
                   flex justify-center items-center w-full"
        style={{
          opacity: titleOpacity,
        }}
      >
        <div className="w-full max-w-[1400px] flex justify-center">
          <SectionTitle title="Timeline" />
        </div>
      </motion.div>

      {/* Rest of the component */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div
          className="grid grid-cols-1 md:grid-cols-2 
                     gap-4 md:gap-6 lg:gap-8 mt-8
                     max-w-[1400px] mx-auto"
        >
          {posters.map((poster, index) => (
            <PosterCard
              key={poster.id}
              poster={poster}
              index={index}
              containerProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Adjusted connecting line position */}
        <motion.div
          className="absolute left-1/2 top-[25%] bottom-[25%] w-[2px]
                     bg-gradient-to-b from-theme-primary via-theme-secondary to-theme-accent
                     hidden md:block -translate-x-[1px]"
          style={{
            scaleY: useSpring(scrollYProgress, { stiffness: 30, damping: 15 }),
            opacity: useSpring(
              useTransform(scrollYProgress, [0, 0.2], [0, 1]),
              { stiffness: 30, damping: 15 }
            ),
          }}
        />
      </div>
    </section>
  );
};
