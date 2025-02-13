"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const edufunEvents = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
}));

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
    >
      <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-black">
        <Image
          src={`/images/events/edufun/${event.id}.webp`}
          alt={`EduFun Event ${event.id}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      </div>
    </motion.div>
  );
};

const EduFunEvents = () => {
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
          EduFun Events
        </h1>
        <p className="text-white/70 text-center mt-4 max-w-2xl mx-auto">
          The EduFun Committee in Lakshya 2025 organizes and manages educational
          and fun activities like quizzes, debates, and interactive games. they
          create a stimulating and enjoyable learning experience for all.
        </p>
      </motion.div>

      {/* Events Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {edufunEvents.map((event, index) => (
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

export default EduFunEvents;
