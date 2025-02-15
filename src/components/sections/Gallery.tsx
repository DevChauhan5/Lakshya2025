"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react"; // Add useState

// Define proper image dimensions and loading metadata
const galleryImages = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery/${i + 1}.webp`,
  alt: `Lakshya Gallery Image ${i + 1}`,
  width: 800, // Optimal width for gallery display
  height: i % 2 === 0 ? 600 : 800, // Maintain aspect ratio
  isLandscape: i % 2 === 0,
}));

// Updated image variants with blur transition
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
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: number]: boolean }>(
    {}
  ); // Track loaded state for each image

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
      className="w-full min-h-screen  py-16 px-3 sm:px-4 md:px-6"
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
                initial={{ filter: "blur(10px)" }}
                animate={{
                  filter: imagesLoaded[index] ? "blur(0px)" : "blur(10px)",
                }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-lg aspect-[3/4] w-full group bg-white/5"
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
                    className={`object-cover transition-all duration-500 ${
                      imagesLoaded[index] ? "opacity-100" : "opacity-0"
                    }`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={90}
                    priority={index < 6} // Prioritize first 6 images
                    onLoadingComplete={() => {
                      setImagesLoaded((prev) => ({
                        ...prev,
                        [index]: true,
                      }));
                    }}
                  />

                  {/* Placeholder/Loading State */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-theme-primary/10 to-theme-accent/5 transition-opacity duration-500 ${
                      imagesLoaded[index] ? "opacity-0" : "opacity-100"
                    }`}
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
                    <p className="text-white/90 text-xs drop-shadow-md line-clamp-2">
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
