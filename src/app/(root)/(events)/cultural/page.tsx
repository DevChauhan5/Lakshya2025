"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const culturalEvents = [
  {
    id: 1,
    title: "Dance Competition",
    description: "Solo & Group Dance Performances",
  },
  {
    id: 2,
    title: "Music Night",
    description: "Live Band & Singing Competition",
  },
  { id: 3, title: "Fashion Show", description: "Ethnic & Western Rounds" },
  { id: 4, title: "Theatre Play", description: "Drama & Street Play" },
  { id: 5, title: "Poetry Slam", description: "Hindi & English Poetry" },
  { id: 6, title: "Battle of Bands", description: "Rock & Pop Music" },
  {
    id: 7,
    title: "Classical Night",
    description: "Indian Classical Performances",
  },
  { id: 8, title: "Folk Dance", description: "Traditional Dance Forms" },
  { id: 9, title: "Rap Battle", description: "Hip-Hop & Freestyle" },
  { id: 10, title: "Stand-Up Comedy", description: "Open Mic Night" },
  { id: 11, title: "Art Exhibition", description: "Painting & Sculptures" },
  { id: 12, title: "Photography", description: "Photo Exhibition" },
  { id: 13, title: "Short Films", description: "Film Screening" },
  { id: 14, title: "Beat Boxing", description: "Solo Performance" },
  { id: 15, title: "Cultural Quiz", description: "Art & Culture Knowledge" },
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
        {/* Image */}
        <Image
          src={`/images/events/cultural/${event.id}.webp`}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
          <motion.h3 className="text-xl font-bold text-white mb-2 transform opacity-0 group-hover:opacity-100 transition-all duration-500">
            {event.title}
          </motion.h3>
          <motion.p className="text-sm text-white/80 transform opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">
            {event.description}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CulturalEvents = () => {
  return (
    <main className="min-h-screen bg-black pt-24 pb-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 mb-16"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-theme-primary via-theme-accent to-theme-secondary bg-clip-text text-transparent">
          Cultural Events
        </h1>
        <p className="text-white/70 text-center mt-4 max-w-2xl mx-auto">
          The Cultural Committee in Lakshya 2025 plans, organizes, and executes
          cultural events like dance, music, drama, and fashion walk
          competitions. they create a vibrant and memorable cultural experience
          for all.
        </p>
      </motion.div>

      {/* Events Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {culturalEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-theme-secondary/10 rounded-full blur-3xl" />
      </div>
    </main>
  );
};

export default CulturalEvents;
