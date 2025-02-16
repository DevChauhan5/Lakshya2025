"use client";

import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SectionTitle } from "../ui/SectionTitle";

const posters = [
  {
    id: 1,
    title: "Day 1",
    date: "Feb 22, 2025",
    image: "/images/timeline/1.webp",
    description: "DJ Aztec",
  },
  {
    id: 2,
    title: "Day 2",
    date: "Feb 23, 2025",
    image: "/images/timeline/2.webp",
    description: "DJ Aerreo",
  },
  {
    id: 3,
    title: "Day 3",
    date: "Feb 24, 2025",
    image: "/images/timeline/3.webp",
    description: "DJ Deafox",
  },
  {
    id: 4,
    title: "Day 4",
    date: "Feb 25, 2025",
    image: "/images/timeline/4.webp",
    description: "Seedhe Maut",
  },
  {
    id: 5,
    title: "Day 5",
    date: "Feb 26, 2025",
    image: "/images/timeline/mystery.jpg", // You'll need to add this placeholder image
    description: "Revealing Soon",
    isMystery: true,
  },
];

// Add new mystery card animations
const mysteryVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  glow: {
    boxShadow: [
      "0 0 0 rgba(244,137,82,0)",
      "0 0 30px rgba(244,137,82,0.6)",
      "0 0 0 rgba(244,137,82,0)",
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  rotate: {
    rotateY: [0, 10, 0, -10, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

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

  // Add connection line animation for each card
  const cardLine = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]),
    {
      stiffness: 60,
      damping: 15,
    }
  );

  if (poster.isMystery) {
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
        className="w-full aspect-[4/5] relative max-h-[70vh] md:col-span-2 md:w-1/2 md:mx-auto"
      >
        <motion.div
          className="relative w-full h-full rounded-xl overflow-hidden 
                     backdrop-blur-sm bg-black/40 border border-white/10"
          variants={mysteryVariants}
          animate={["pulse", "glow"]}
        >
          {/* Mystery Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-conic from-theme-primary via-theme-accent to-theme-secondary opacity-10"
            />

            <motion.span
              className="text-6xl mb-4 font-bold"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ?
            </motion.span>

            <motion.h3
              className="text-2xl font-bold bg-gradient-to-r from-theme-primary via-theme-accent to-theme-secondary 
                         bg-clip-text text-transparent mb-2"
            >
              {poster.title}
            </motion.h3>

            <p className="text-white/90 mb-2">{poster.date}</p>

            <motion.p
              className="text-sm text-white/70"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Get ready for a surprise...
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    );
  }

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
      className="w-full max-w-[500px] mx-auto relative" // Changed from aspect ratio to max-width
    >
      <div className="pb-[100%] relative">
        {" "}
        {/* Added padding-bottom wrapper for 1:1 aspect ratio */}
        <motion.div
          className="absolute inset-0 rounded-xl overflow-hidden
                     shadow-xl shadow-black/20"
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
        >
          {/* Image container with background */}
          <motion.div className="absolute inset-0 bg-black/20">
            <Image
              src={poster.image}
              alt={poster.title}
              fill
              className="object-contain" // Always use contain to show full image
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={90}
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
            className="absolute bottom-0 left-4 right-0 p-4 sm:p-5 z-10"
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
            <motion.p className="text-xs sm:text-sm text-theme-secondary line-clamp-2">
              {poster.description}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Add connecting dot to timeline */}
      <motion.div
        className={`absolute top-1/2 ${
          index % 2 === 0 ? "md:right-[-34px]" : "md:left-[-34px]"
        } w-3 h-3 rounded-full bg-theme-primary hidden md:block`}
        style={{
          scale: cardLine,
          opacity: cardLine,
          boxShadow: "0 0 10px var(--theme-primary)",
        }}
      />
    </motion.div>
  );
};

const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles only on client side
    setParticles(
      [...Array(20)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  return (
    <motion.div className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-theme-primary rounded-full"
          initial={{
            x: `${particle.x}%`,
            y: "-10%",
            scale: 0,
          }}
          animate={{
            y: "110%",
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
          style={{
            filter: "blur(1px)",
            left: `${particle.x}%`,
          }}
        />
      ))}
    </motion.div>
  );
};

export const Timeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"], // Adjusted offset for better section detection
  });

  // Enhanced spring config for smoother transitions
  const springConfig = { stiffness: 50, damping: 15 };

  // Earlier fade in for title
  const titleOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.05], [0, 1]),
    springConfig
  );

  return (
    <section ref={containerRef} id="timeline" className="section-wrapper">
      {/* Remove background div and simplify gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-transparent to-transparent"
        style={{
          opacity: useSpring(
            useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]),
            springConfig
          ),
        }}
      />

      {/* Update sticky header to be more transparent */}
      <motion.div
        className="sticky top-0 pt-16 pb-4 px-4 z-[60] backdrop-blur-sm
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
        {/* Add relative positioning for line context */}
        <div className="relative">
          {/* Enhanced timeline line */}
          <motion.div
            className="absolute left-1/2 h-full w-[2px] hidden md:block"
            style={{
              background:
                "linear-gradient(180deg, transparent, var(--theme-primary) 10%, var(--theme-accent) 90%, transparent)",
              transformOrigin: "top",
              scaleY: useSpring(scrollYProgress, {
                stiffness: 40,
                damping: 15,
                restDelta: 0.001,
              }),
            }}
          >
            {/* Enhanced floating dot */}
            <motion.div
              className="absolute w-4 h-4 -left-[7px] rounded-full bg-theme-primary"
              style={{
                top: useTransform(
                  scrollYProgress,
                  (value) => `${value * 100}%`
                ),
                boxShadow: "0 0 20px var(--theme-primary)",
              }}
            >
              {/* Add trailing effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-theme-primary"
                initial={{ scale: 1, opacity: 0.3 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          {/* Restructured grid layout */}
          <div className="relative grid grid-cols-1 gap-12 md:gap-16 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {posters.slice(0, 4).map((poster, index) => (
                <div
                  key={poster.id}
                  className={`${
                    index % 2 === 0
                      ? "md:pr-12 md:translate-y-0"
                      : "md:pl-12 md:translate-y-32"
                  } py-4 sm:py-6`}
                >
                  <PosterCard
                    poster={poster}
                    index={index}
                    containerProgress={scrollYProgress}
                  />
                </div>
              ))}
            </div>

            {/* Mystery card with adjusted width */}
            <div className="w-full flex justify-center mt-12 md:mt-32">
              <div className="w-full max-w-[600px] mx-auto px-4">
                <PosterCard
                  poster={posters[4]}
                  index={4}
                  containerProgress={scrollYProgress}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <FloatingParticles />
    </section>
  );
};
