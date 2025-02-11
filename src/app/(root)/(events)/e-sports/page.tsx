"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const esportsEvents = [
  {
    id: 1,
    title: "CS:GO Tournament",
  },
  {
    id: 2,
    title: "Valorant Tournament",
  },
  {
    id: 3,
    title: "BGMI Tournament",
  },
  {
    id: 4,
    title: "Call of Duty Mobile",
  },
  {
    id: 5,
    title: "Rocket League",
  },
];

const EventCard = ({ event, index }) => {
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: [0.23, 1, 0.32, 1],
        delay: index * 0.1,
      }}
      className="group cursor-pointer"
    >
      <motion.div
        whileHover={{ y: -5 }}
        className="relative aspect-[4/5] rounded-xl overflow-hidden bg-black"
      >
        <Image
          src={`/images/events/e-sports/${event.id}.webp`}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div
          className="absolute inset-0 bg-gradient-to-t 
                       from-black/90 via-black/50 to-transparent 
                       opacity-0 group-hover:opacity-100 
                       transition-all duration-500 ease-out"
        />

        <div className="absolute inset-0 flex items-end p-6">
          <motion.h3
            className="text-2xl font-bold text-white
                       translate-y-8 opacity-0
                       group-hover:translate-y-0 group-hover:opacity-100
                       transition-all duration-500 ease-out
                       relative after:absolute after:bottom-0 after:left-0
                       after:w-0 after:h-[2px] after:bg-white
                       after:transition-all after:duration-500
                       group-hover:after:w-full"
          >
            {event.title}
          </motion.h3>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ESportsEvents = () => {
  return (
    <main className="min-h-screen bg-black pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 mb-16"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-theme-primary via-theme-accent to-theme-secondary bg-clip-text text-transparent">
          E-Sports Events
        </h1>
        <p className="text-white/70 text-center mt-4 max-w-2xl mx-auto">
          The E-Sports Committee in Lakshya 2025 organizes and manages
          competitive gaming events, ensuring fair play, smooth scheduling, and
          technical support. Join us for an exciting and immersive e-sports
          experience.
        </p>
      </motion.div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {esportsEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-theme-secondary/10 rounded-full blur-3xl" />
      </div>
    </main>
  );
};

export default ESportsEvents;
