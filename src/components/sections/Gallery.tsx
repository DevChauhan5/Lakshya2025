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
      className="w-full min-h-screen bg-black/95 py-20 px-4 sm:px-6 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-16">
          <BlurFade>
            <SectionTitle title="Gallery" />
          </BlurFade>
        </div>

        <motion.div
          style={{ opacity: containerOpacity }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 [&>div]:mb-4"
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
                className={`relative group overflow-hidden rounded-xl 
                         ${
                           image.isLandscape ? "h-[300px]" : "h-[400px]"
                         } w-full`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="object-cover transition-all duration-700 
                         brightness-110 contrast-105 saturate-105
                         group-hover:scale-110 group-hover:rotate-1"
                  sizes="(max-width: 640px) 100vw, 
                         (max-width: 1024px) 50vw, 
                         33vw"
                  quality={95}
                  priority={index < 3}
                  loading={index < 3 ? "eager" : "lazy"}
                />

                {/* Lighter overlay with reduced opacity */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-t 
                           from-black/70 via-black/20 to-transparent/0
                           backdrop-blur-[1px]"
                >
                  <div
                    className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 
                                group-hover:translate-y-0 group-hover:opacity-100 
                                transition-all duration-300"
                  >
                    <h3 className="text-white text-lg font-medium truncate drop-shadow-lg">
                      Lakshya&apos;24
                    </h3>
                    <p className="text-white/90 text-sm drop-shadow-md">
                      Moments captured during the event
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </BlurFade>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
