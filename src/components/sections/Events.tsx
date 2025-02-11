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
    margin: "-15% 0px",
    amount: 0.4,
  });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Optimized animations config
  const springConfig = { stiffness: 70, damping: 15, mass: 0.5 };

  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]),
    springConfig
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]),
    springConfig
  );

  const handleClick = () => {
    router.push(category.route);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
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
      onClick={handleClick}
      className="w-full aspect-[4/5] relative max-h-[70vh] cursor-pointer"
    >
      <motion.div
        className="relative w-full h-full rounded-xl overflow-hidden"
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
      >
        {/* Image container */}
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={category.image}
            alt={category.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index < 2}
          />
        </motion.div>

        {/* Enhanced gradient overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: useTransform(
              scrollYProgress,
              [0, 1],
              [
                `linear-gradient(to bottom, transparent, ${category.gradient})`,
                `linear-gradient(to bottom, rgba(0,0,0,0.3), ${category.gradient})`,
              ]
            ),
          }}
        />

        {/* Content */}
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
                  },
                }
              : {}
          }
        >
          <motion.h3
            className="text-xl sm:text-2xl font-bold text-white mb-2"
            whileHover={{ x: 10 }}
          >
            {category.title}
          </motion.h3>
          <motion.p className="text-sm sm:text-base text-white/80 line-clamp-2 mb-4">
            {category.description}
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05, x: 10 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-full text-sm
                     bg-white/10 backdrop-blur-sm
                     border border-white/20 text-white
                     hover:bg-white/20 hover:border-white/40
                     transition-colors duration-300
                     flex items-center gap-2"
          >
            <span>View Events</span>
            <span>→</span>
          </motion.button>
        </motion.div>
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

  // Enhanced spring config
  const springConfig = { stiffness: 50, damping: 15 };

  // Earlier fade in for title
  const titleOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.05], [0, 1]),
    springConfig
  );

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden py-16"
    >
      {/* Background with parallax */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-theme-dark/20 via-black to-black"
        style={{
          opacity: useSpring(
            useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]),
            springConfig
          ),
        }}
      />

      {/* Centered title container */}
      <motion.div
        className="sticky top-0 pt-16 pb-4 px-4 z-50 bg-black/50 backdrop-blur-sm
                   flex justify-center items-center w-full"
        style={{ opacity: titleOpacity }}
      >
        <div className="w-full max-w-[1400px] flex justify-center">
          <SectionTitle title="Events" />
        </div>
      </motion.div>

      {/* Grid container */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div
          className="grid grid-cols-1 md:grid-cols-2 
                     gap-4 md:gap-6 lg:gap-8 mt-8
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
