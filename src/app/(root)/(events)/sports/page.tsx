"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const sportsEvents = Array.from({ length: 46 }, (_, i) => ({
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
      <BlurFade delay={index * 0.1}>
        <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm">
          <Image
            src={`/images/events/sports/${event.id}.webp`}
            alt={`Sports Event ${event.id}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={index < 6 ? "eager" : "lazy"}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHyAiJRwlKycuRDEwMTAxMUQzNjk7PjU1R0dKTU1NW3JbYFllZIGChXFwf7n/2wBDARUXFx4aHh4pISk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTn/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>
      </BlurFade>
    </motion.div>
  );
};

const SportsEvents = () => {
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
          Sports Events
        </h1>
        <p className="text-white/70 text-center mt-4 max-w-2xl mx-auto">
          The Sports Committee in Lakshya 2025 organizes and manages various
          sports events, ensuring smooth scheduling, fair play, and proper
          officiating. They create a dynamic and competitive sports experience
          for all.
        </p>
      </motion.div>

      {/* Events Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sportsEvents.map((event, index) => (
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

export default SportsEvents;
