"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

// Updated sponsor data array
const sponsorsData = [
  {
    name: "Quick Smart wash",
    type: "Associate Sponsor",
    description: `Established in 2013, Quick Smart Wash Private Limited (QSW) revolutionized the laundry industry in India with its professional linen management and laundry services.
Operating from Jaipur, Rajasthan, QSW introduced the concept of 'Campus Laundromats' nationwide, offering eco-friendly cleaning through smart card-driven laundries and state-of-the-art technology`,
    logo: "/images/sponsors/1.webp",
  },
  {
    name: "College Brand Connect",
    type: "Brand Partner",
    description: `College Brand Connect is a tech platform that bridges colleges and brands for impactful collaborations. We help colleges secure sponsorships to elevate their festivals while enabling brands to engage with students effectively. Our strategic approach ensures brands become part of students' most cherished moments. By enhancing festival experiences and boosting brand visibility, we create meaningful connections. Join us in shaping the future of student and brand partnerships!`,
    logo: "/images/sponsors/3.webp",
  },
  {
    name: "Smart & Handsome",
    type: "Self Care Partner",
    description: `Smart And Handsome, formerly Fair And Handsome, has redefined men's grooming since 2005. Evolving beyond radiance, it now offers holistic skincare solutions for the modern, confident man. With innovations like the Brightening Range and Nature F1rst, it blends style with substance. Committed to quality and innovation, the brand continues to empower men with smarter skincare choices. Smart And Handsome is the symbol of modern masculinity and refined grooming.`,
    logo: "/images/sponsors/2.webp",
  },
];

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
    <section id="sponsors" ref={containerRef} className="section-wrapper">
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-theme-dark/20 via-black to-black"
        style={{ opacity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center mb-16">
          <BlurFade>
            <SectionTitle title="Our Sponsors" />
          </BlurFade>
        </div>

        {/* Sponsors Grid */}
        <div className="space-y-12 max-w-6xl mx-auto">
          {sponsorsData.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.23, 1, 0.32, 1],
                delay: index * 0.2,
              }}
            >
              <div
                className="relative backdrop-blur-sm bg-white/5 rounded-2xl p-6 md:p-8 
                            border border-white/10 overflow-hidden group"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/5 to-transparent" />

                {/* Updated Sponsor Type Badge - Improved mobile visibility */}
                <div
                  className="absolute top-4 right-4 z-10 bg-black/40 backdrop-blur-sm 
                              px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full 
                              border border-theme-primary/20"
                >
                  <span
                    className="text-theme-primary text-xs sm:text-sm font-medium 
                                 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                  >
                    {sponsor.type}
                  </span>
                </div>

                {/* Content Grid - Added more spacing on mobile */}
                <div className="relative grid md:grid-cols-[300px,1fr] gap-6 md:gap-6 items-center pt-4">
                  {/* Logo Container */}
                  <motion.div
                    className="relative aspect-square w-full max-w-[260px] mx-auto md:mx-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="absolute inset-0 bg-white rounded-xl" />
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      fill
                      className="object-contain p-6"
                      sizes="(max-width: 768px) 80vw, 300px"
                      priority={index === 0}
                      quality={90}
                    />
                  </motion.div>

                  {/* Text Content */}
                  <div className="text-center md:text-left md:pl-2">
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-2xl md:text-3xl font-bold text-white mb-3 text-left"
                    >
                      {sponsor.name}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-white/70 leading-relaxed text-left"
                    >
                      {sponsor.description}
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
