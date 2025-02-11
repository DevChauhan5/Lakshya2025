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

  // Smoother animation configs
  const springConfig = {
    stiffness: 45,
    damping: 15,
    mass: 0.2,
    restDelta: 0.001,
  };

  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]),
    springConfig
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]),
    springConfig
  );

  const handleClick = () => {
    router.push(category.route);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 45,
                damping: 15,
                mass: 0.2,
              },
            }
          : {}
      }
      style={{ scale, opacity }}
      onClick={handleClick}
      className="w-full aspect-[4/5] relative max-h-[70vh] cursor-pointer group"
    >
      <motion.div
        className="relative w-full h-full rounded-xl overflow-hidden"
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
        }}
      >
        {/* Image container with smoother hover effect */}
        <motion.div className="absolute inset-0 transition-transform duration-700">
          <Image
            src={category.image}
            alt={category.title}
            fill
            className="object-cover scale-[1.01] group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index < 2}
          />
        </motion.div>

        {/* Enhanced overlay with blur effect - visible on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/60 to-black/90
                     opacity-0 group-hover:opacity-100 backdrop-blur-[2px]
                     transition-all duration-500"
        />

        {/* Content container with hover reveal */}
        <motion.div
          className="absolute inset-0 p-6 flex flex-col justify-end
                     translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                     transition-all duration-500 ease-out"
        >
          {/* Title with slide effect */}
          <motion.h3
            className="text-2xl font-bold text-white mb-3
                       translate-y-4 group-hover:translate-y-0 
                       transition-transform duration-500 ease-out"
          >
            {category.title}
          </motion.h3>

          {/* Description with fade effect */}
          <motion.p
            className="text-base text-white/80 mb-6 line-clamp-2
                       translate-y-4 group-hover:translate-y-0 
                       transition-transform duration-500 delay-[50ms] ease-out"
          >
            {category.description}
          </motion.p>

          {/* Enhanced button with better hover effects */}
          <motion.button
            className="self-start px-5 py-2.5 rounded-full
                     bg-white/10 backdrop-blur-md
                     border border-white/20 text-white
                     translate-y-4 opacity-0 
                     group-hover:translate-y-0 group-hover:opacity-100
                     hover:bg-white/20 hover:border-white/40
                     transition-all duration-500 delay-[100ms] ease-out
                     flex items-center gap-2 text-sm"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View {category.title.split(" ")[0]} Events</span>
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.span>
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

      {/* Grid container with improved spacing */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div
          className="grid grid-cols-1 md:grid-cols-2 
                     gap-6 md:gap-8 lg:gap-10 mt-8
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
