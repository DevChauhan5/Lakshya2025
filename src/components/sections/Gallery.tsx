"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

// Define proper image dimensions and loading metadata
const galleryImages = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery/${i + 1}.webp`,
  alt: `Lakshya Gallery Image ${i + 1}`,
  width: 800, // Optimal width for gallery display
  height: i % 2 === 0 ? 600 : 800, // Maintain aspect ratio
  isLandscape: i % 2 === 0,
}));

const imageHoverVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0, 1],
    },
  },
};

export const Gallery = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Reversed opacity animation
  const containerOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0, 1]), // Appear faster when coming into view
    {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
    }
  );

  return (
    <section
      ref={containerRef}
      id="gallery"
      className="w-full min-h-screen bg-black/95 py-16 px-3 sm:px-4 md:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-12">
          <BlurFade>
            <SectionTitle title="Gallery" />
          </BlurFade>
        </div>

        <motion.div
          style={{ opacity: containerOpacity }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-3 [&>div]:mb-3"
        >
          {galleryImages.map((image, index) => (
            <BlurFade
              key={image.id}
              delay={0.15 + index * 0.1}
              className="relative break-inside-avoid"
              inView
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-lg aspect-[3/4] w-full group"
              >
                {/* Image Container with Hover Effect */}
                <motion.div
                  className="absolute inset-0"
                  initial="initial"
                  whileHover="hover"
                  variants={imageHoverVariants}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={90}
                    priority={index < 3}
                  />
                </motion.div>

                {/* Enhanced Overlay Container */}
                <div className="absolute inset-0 group">
                  <div
                    className="absolute inset-0 bg-gradient-to-t 
                               from-black/80 via-black/20 to-transparent 
                               opacity-0 group-hover:opacity-100
                               transition-all duration-300 ease-out"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 p-3 transform translate-y-full 
                               group-hover:translate-y-0 transition-all duration-300 ease-out"
                  >
                    <h3 className="text-white text-base font-medium truncate drop-shadow-lg">
                      Lakshya&apos;24
                    </h3>
                    <p className="text-white/90 text-xs drop-shadow-md line-clamp-2 overflow-hidden">
                      Moments captured during the event
                    </p>
                  </div>
                </div>
              </motion.div>
            </BlurFade>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
