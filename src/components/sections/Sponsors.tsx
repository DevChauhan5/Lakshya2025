"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

// Single sponsor data
const sponsorData = {
  name: "Quick Smart wash",
  description: `Established in 2013, Quick Smart Wash Private Limited (QSW) revolutionized the laundry industry in India with its professional linen management and laundry services.
Operating from Jaipur, Rajasthan, QSW introduced the concept of 'Campus Laundromats' nationwide, offering eco-friendly cleaning through smart card-driven laundries and state-of-the-art technology`,
  logo: "/images/sponsors/1.webp",
};

export const Sponsors = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 50, damping: 15 };
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0, 1]),
    springConfig
  );

  return (
    <section
      id="sponsors"
      ref={containerRef}
      className="relative min-h-[80vh] bg-black overflow-hidden py-20"
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
            <SectionTitle title="Our Sponsor" />
          </BlurFade>
        </div>

        {/* Sponsor Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div
            className="relative backdrop-blur-sm bg-white/5 rounded-2xl p-8 md:p-12
                        border border-white/10 overflow-hidden group"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/5 to-transparent" />

            {/* Content Grid */}
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              {/* Logo Container */}
              <motion.div
                className="relative aspect-square w-full max-w-[300px] mx-auto md:mx-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute inset-0 bg-white/80 rounded-xl" />
                <Image
                  src={sponsorData.logo}
                  alt={sponsorData.name}
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 768px) 80vw, 40vw"
                  priority
                  quality={90}
                />
              </motion.div>

              {/* Text Content */}
              <div className="text-center md:text-left">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-2xl md:text-3xl font-bold text-white mb-4"
                >
                  {sponsorData.name}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-white/70 mb-6 leading-relaxed"
                >
                  {sponsorData.description}
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
