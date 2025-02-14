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
    date: "Feb 22, 2025",
    image: "/images/timeline/1.jpg",
    description: "DJ Aztec",
  },
  {
    id: 2,
    title: "Day 2",
    date: "Feb 23, 2025",
    image: "/images/timeline/2.jpg",
    description: "DJ Aerreo",
  },
  {
    id: 3,
    title: "Day 3",
    date: "Feb 24, 2025",
    image: "/images/timeline/3.jpg",
    description: "DJ Deafox",
  },
  {
    id: 4,
    title: "Day 4",
    date: "Feb 25, 2025",
    image: "/images/timeline/4.jpg",
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
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  glow: {
    boxShadow: [
      "0 0 0 rgba(244,137,82,0)",
      "0 0 20px rgba(244,137,82,0.5)",
      "0 0 0 rgba(244,137,82,0)",
    ],
    transition: {
      duration: 2,
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
            loading={index <= 1 ? "eager" : "lazy"} // Load first two images eagerly
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={75}
            priority={index < 2}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHyAiJRwlKycuRDEwMTAxMUQzNjk7PjU1R0dKTU1NW3JbYFllZIGChXFwf7n/2wBDARUXFx4aHh4pISk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTn/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
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
    <section
      ref={containerRef}
      id="timeline" // Added proper ID to match navbar link
      className="section-wrapper" // Using the new shared class
    >
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
