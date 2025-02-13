"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

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
      className="relative min-h-screen bg-black overflow-hidden py-20"
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

        {/* Updated Magic Card Container */}
        <div className="h-[600px] w-full flex items-center justify-center">
          <MagicCard
            className="flex flex-col items-center justify-center w-full max-w-3xl
                      bg-black/40 backdrop-blur-sm border border-white/10
                      rounded-xl p-6 sm:p-8"
            gradientColor="#262626"
            gradientFrom="rgba(244, 137, 82, 0.2)"
            gradientTo="rgba(255, 206, 107, 0.2)"
            gradientOpacity={0.5}
            gradientSize={400}
          >
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center w-full">
              {/* Image Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl group">
                <Image
                  src="/images/team/avval.webp"
                  alt="Avval Yadav"
                  fill
                  className="object-cover object-center scale-[1.01]
                           group-hover:scale-110 brightness-110
                           transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t 
                             from-black/60 via-black/20 to-transparent
                             group-hover:opacity-40 transition-opacity duration-700"
                />
              </div>

              {/* Text Content */}
              <div className="text-center md:text-left">
                <motion.h2
                  className="text-2xl sm:text-3xl font-bold mb-3
                           bg-gradient-to-r from-theme-primary via-theme-accent to-theme-secondary 
                           bg-clip-text text-transparent"
                >
                  Avval Yadav
                </motion.h2>
                <motion.p className="text-white/80 text-sm sm:text-base mb-6">
                  Advisory Committee
                </motion.p>

                {/* Connect Button */}
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                           bg-gradient-to-r from-theme-primary/10 to-theme-accent/10
                           hover:from-theme-primary/20 hover:to-theme-accent/20
                           border border-theme-primary/20 hover:border-theme-primary/40
                           text-white text-sm transition-all duration-300"
                >
                  <span>Connect</span>
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.span>
                </Link>
              </div>
            </div>
          </MagicCard>
        </div>
      </div>
    </section>
  );
};
