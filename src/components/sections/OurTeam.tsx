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
    name: "Pranav Lata",
    role: "Executive Core Committee",
    image: "/images/team/68.webp",
  },
  {
    name: "Jagrati Kumawat",
    role: "Executive Core Committee",
    image: "/images/team/69.webp",
  },
  {
    name: "Ashutosh Yadav",
    role: "Executive Core Committee",
    image: "/images/team/70.webp",
  },
  {
    name: "Kanishk Gupta",
    role: "Executive Core Committee",
    image: "/images/team/71.webp",
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

          {/* Updated Core Committee Cards Grid with MagicCard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreMembers.map((member, index) => (
              <MagicCard
                key={member.name}
                className="h-[400px] relative bg-black/20 backdrop-blur-sm overflow-hidden group
                        border border-white/10 rounded-xl"
                gradientColor="rgba(0, 0, 0, 0.5)"
                gradientFrom="rgba(244, 137, 82, 0.1)"
                gradientTo="rgba(255, 206, 107, 0.1)"
                gradientOpacity={0.5}
              >
                <div className="absolute inset-0 w-full h-full">
                  {/* Image Container */}
                  <div className="relative w-full h-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      priority={index < 2}
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent 
                             opacity-60 group-hover:opacity-40 transition-all duration-300"
                  />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3
                      className="text-xl font-semibold text-white mb-2 
                               transform translate-y-4 group-hover:translate-y-0
                               transition-transform duration-300"
                    >
                      {member.name}
                    </h3>
                    <p
                      className="text-sm text-white/80
                               transform translate-y-4 group-hover:translate-y-0
                               transition-transform duration-300 delay-75"
                    >
                      {member.role}
                    </p>
                  </div>
                </div>
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
