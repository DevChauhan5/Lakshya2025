"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

// Updated core members data with corrected image paths and dimensions
const coreMembers = [
  {
    name: "Naman Agrawal",
    role: "Core Executive",
    image: "/images/team/avval.webp",
    width: 800,
    height: 1000,
    // Add proper blur data URL for each image
  },
  {
    name: "Shubham Sharma",
    role: "Core Executive",
    image: "/images/team/avval.webp", // Temporarily using same image
    width: 800,
    height: 1000,
  },
  {
    name: "Arpit Singh",
    role: "Core Executive",
    image: "/images/team/avval.webp", // Temporarily using same image
    width: 800,
    height: 1000,
  },
  {
    name: "Yash Sharma",
    role: "Core Executive",
    image: "/images/team/avval.webp", // Temporarily using same image
    width: 800,
    height: 1000,
  },
];

export const OurTeam = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0, 1]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      id="team"
      className="relative min-h-screen bg-black overflow-hidden py-16"
    >
      {/* Background Effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-theme-dark/20 via-black to-black"
        style={{ opacity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Centered Title */}
        <div className="flex justify-center mb-16">
          <BlurFade>
            <SectionTitle title="Our Team" />
          </BlurFade>
        </div>

        <div className="flex flex-col gap-12 max-w-7xl mx-auto">
          {/* Advisory Card */}
          <div className="h-[500px] md:h-[400px] w-full flex items-center justify-center">
            <MagicCard
              className="flex flex-col items-center justify-center w-full max-w-3xl
                        bg-black/40 backdrop-blur-sm border border-white/10
                        rounded-xl p-4 sm:p-6"
              gradientColor="#262626"
            >
              <div className="grid md:grid-cols-2 gap-6 items-center w-full">
                {/* Image Container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg group">
                  <Image
                    src="/images/team/avval.webp"
                    alt="Avval Yadav"
                    fill
                    className="object-cover brightness-110 group-hover:scale-105
                             transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>

                {/* Text Content */}
                <div className="text-center md:text-left p-4">
                  <h2
                    className="text-2xl sm:text-3xl font-bold mb-2
                               bg-gradient-to-r from-theme-primary via-theme-accent to-theme-secondary 
                               bg-clip-text text-transparent"
                  >
                    Avval Yadav
                  </h2>
                  <p className="text-white/80">Advisory Committee</p>
                </div>
              </div>
            </MagicCard>
          </div>

          {/* Enhanced Core Committee Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {coreMembers.map((member, index) => (
              <MagicCard
                key={member.name}
                className="bg-black/40 backdrop-blur-sm border border-white/10
                          rounded-xl overflow-hidden group"
                gradientColor="#262626"
                gradientFrom="rgba(244, 137, 82, 0.1)"
                gradientTo="rgba(255, 206, 107, 0.1)"
                gradientOpacity={0.5}
              >
                <motion.div
                  className="relative aspect-[3/4] w-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                >
                  {/* Image Container */}
                  <div className="absolute inset-0 rounded-t-xl overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={member.width}
                      height={member.height}
                      className="object-cover h-full w-full brightness-105 
                               scale-[1.01] group-hover:scale-110
                               transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw,
                             (max-width: 1200px) 50vw,
                             25vw"
                      quality={95}
                      priority={index < 2}
                      placeholder="blur"
                      blurDataURL={
                        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHyAiJRwlKycuRDEwMTAxMUQzNjk7PjU1R0dKTU1NW3JbYFllZIGChXFwf7n/2wBDARUXFx4aHh4pISk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTn/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                      }
                    />
                  </div>

                  {/* Creative Info Panel - Slides up on hover */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t 
                              from-black/95 via-black/80 to-transparent backdrop-blur-sm
                              p-6 translate-y-[60%] group-hover:translate-y-0
                              transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  >
                    <motion.h3
                      className="text-xl font-semibold text-white mb-3
                               translate-y-[-20px] group-hover:translate-y-0
                               transition-transform duration-500 delay-100"
                    >
                      {member.name}
                    </motion.h3>

                    <motion.p
                      className="text-sm text-white/80 translate-y-[-10px] 
                               group-hover:translate-y-0 transition-transform 
                               duration-500 delay-200"
                    >
                      {member.role}
                    </motion.p>

                    {/* Social Links - Fade in on hover */}
                    <motion.div
                      className="mt-4 flex gap-3 opacity-0 group-hover:opacity-100
                               translate-y-[-10px] group-hover:translate-y-0
                               transition-all duration-500 delay-300"
                    >
                      {/* Add social icons/links if needed */}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </MagicCard>
            ))}
          </div>

          {/* View All Button */}
          <motion.div className="flex justify-center mt-8">
            <RainbowButton>View All Committees</RainbowButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
