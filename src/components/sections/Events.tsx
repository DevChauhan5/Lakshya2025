"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SectionTitle } from "../ui/SectionTitle";

gsap.registerPlugin(ScrollTrigger);

const eventCategories = [
  {
    title: "Cultural Events",
    description:
      "Dance, music, theatre, and art competitions that celebrate creativity and expression.",
    image: "/images/cultural.jpg",
    gradient: "from-theme-primary/20 to-theme-dark/40",
  },
  {
    title: "Technical Events",
    description:
      "Hackathons, robotics, and coding challenges that push innovation boundaries.",
    image: "/images/technical.jpg",
    gradient: "from-theme-secondary/20 to-theme-dark/40",
  },
  {
    title: "Sports Events",
    description:
      "Athletic competitions and team sports that test skill and sportsmanship.",
    image: "/images/sports.jpg",
    gradient: "from-theme-accent/20 to-theme-dark/40",
  },
  {
    title: "Literary Events",
    description:
      "Debates, quizzes, and writing competitions that showcase intellectual prowess.",
    image: "/images/literary.jpg",
    gradient: "from-theme-highlight/20 to-theme-dark/40",
  },
];

const EventCard = ({ category, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="relative group rounded-xl overflow-hidden"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-b ${category.gradient} opacity-80 
                      group-hover:opacity-90 transition-opacity duration-500`}
      />

      <div className="relative z-10 p-8 h-[400px] flex flex-col justify-between">
        <div>
          <h3 className="text-3xl font-bold text-white mb-4">
            {category.title}
          </h3>
          <p className="text-white/80">{category.description}</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="self-start px-6 py-2 rounded-full bg-theme-dark/30 backdrop-blur-sm
                     border border-white/20 text-white hover:bg-theme-dark/50 
                     transition-all flex items-center gap-2 group/btn"
        >
          <span>Explore Events</span>
          <motion.span
            className="group-hover/btn:translate-x-1 transition-transform"
            children="→"
          />
        </motion.button>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/50 rounded-full"
            animate={{
              y: ["0%", "100%"],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.8,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${30 + i * 20}%`,
              top: "-10%",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export const Events = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".event-grid", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
        y: 100,
        opacity: 0,
        duration: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 bg-black overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-radial from-theme-dark/20 via-black to-black" />
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(115,60,128,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(115,60,128,0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle title="Events" />

        <div className="event-grid grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {eventCategories.map((category, index) => (
            <EventCard key={index} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
