"use client";

import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { SectionTitle } from "../ui/SectionTitle";

const eventCategories = [
  {
    title: "Cultural Events",
    description:
      "The Cultural Committee in Lakshya 2025 plans, organizes, and executes cultural events like dance, music, drama, and fashion walk competitions.  they create a vibrant and memorable cultural experience for all.",
    image: "/images/events/cultural/poster.webp",
    gradient: "from-theme-primary/20 to-theme-dark/40",
    route: "/cultural",
  },
  {
    title: "EduFun Events",
    description:
      "The EduFun Committee in Lakshya 2025 organizes and manages educational and fun activities like quizzes, debates, and interactive games.  they create a stimulating and enjoyable learning experience for all.",
    image: "/images/events/edufun/poster.webp",
    gradient: "from-theme-secondary/20 to-theme-dark/40",
    route: "/edufun",
  },
  {
    title: "Sports Events",
    description:
      "The Sports Committee in Lakshya 2025 organizes and manages various sports events, ensuring smooth scheduling, fair play, and proper officiating.  they create a dynamic and competitive sports experience for all.",
    image: "/images/events/sports/poster.webp",
    gradient: "from-theme-accent/20 to-theme-dark/40",
    route: "/sports",
  },
  {
    title: "E-Sports Events",
    description:
      "The E-Sports Committee in Lakshya 2025 organizes and manages competitive gaming events, ensuring fair play, smooth scheduling, and technical support.  they create an exciting and immersive e-sports experience for all..",
    image: "/images/events/e-sports/poster.webp",
    gradient: "from-theme-highlight/20 to-theme-dark/40",
    route: "/e-sports",
  },
];

const EventCard = ({ category, index }) => {
  const router = useRouter();
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, {
    once: false,
    margin: "-10% 0px",
    amount: 0.3,
  });

  // Optimized scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Enhanced spring configurations for smoother animations
  const springConfig = {
    stiffness: 70,
    damping: 15,
    mass: 0.5,
  };

  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]),
    springConfig
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]),
    springConfig
  );

  // Staggered entrance animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotateX: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
        mass: 1,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ scale, opacity }}
      className="w-full aspect-square relative"
      onClick={() => router.push(category.route)}
    >
      <motion.div
        className="relative w-full h-full rounded-lg overflow-hidden 
                   group cursor-pointer"
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
        }}
      >
        {/* Image Container */}
        <div className="absolute inset-0">
          <Image
            src={category.image}
            alt={category.title}
            fill
            className="object-cover transition-all duration-700 
                     group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 2}
          />
        </div>

        {/* Hover Overlay */}
        <div
          className="absolute inset-0 transition-all duration-500
                     bg-gradient-to-b from-black/0 via-black/0 to-black/0
                     group-hover:from-black/60 group-hover:via-black/60 group-hover:to-black/90"
        >
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            {/* Title */}
            <motion.h3
              className="text-2xl font-bold text-white mb-3
                       translate-y-8 opacity-0
                       group-hover:translate-y-0 group-hover:opacity-100
                       transition-all duration-500 ease-out"
            >
              {category.title}
            </motion.h3>

            {/* View Events Button */}
            <motion.button
              className="self-start px-4 py-2 rounded-full
                       bg-white/10 backdrop-blur-sm
                       border border-white/20 text-white
                       translate-y-8 opacity-0
                       group-hover:translate-y-0 group-hover:opacity-100
                       hover:bg-white/20 transition-all duration-500 ease-out
                       text-sm flex items-center gap-2"
              style={{ transitionDelay: "100ms" }}
            >
              <span>View All Events</span>
              <span
                className="transform transition-transform duration-300 
                           group-hover:translate-x-1"
              >
                →
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Events = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Enhanced spring config for smoother animations
  const springConfig = { stiffness: 50, damping: 15 };
  const titleOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.05], [0, 1]),
    springConfig
  );

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden py-12"
    >
      {/* Optimized background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-theme-dark/20 via-black to-black"
        style={{
          opacity: useSpring(
            useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]),
            springConfig
          ),
        }}
      />

      {/* Enhanced title container */}
      <motion.div
        className="sticky top-0 pt-16 pb-4 px-4 z-[60] bg-black/50 backdrop-blur-sm
                   flex justify-center items-center w-full"
        style={{ opacity: titleOpacity }}
      >
        <div className="w-full max-w-[1400px] flex justify-center">
          <SectionTitle title="Events" />
        </div>
      </motion.div>

      {/* Optimized grid container */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4
                     gap-4 md:gap-6 mt-8
                     max-w-[1400px] mx-auto"
        >
          {eventCategories.map((category, index) => (
            <EventCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
