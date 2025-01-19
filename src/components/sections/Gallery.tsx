import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Gallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  // Simplified images array with same image and size
  const images = Array(6).fill({ src: "/gallery/img.jpg" });

  return (
    <motion.section
      ref={containerRef}
      className="relative h-screen flex flex-col justify-center overflow-hidden my-14"
      style={{ opacity }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-star-pattern opacity-30 bg-[length:30px_30px]" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-cosmic opacity-70" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-cosmic-accent bg-clip-text text-transparent">
              Celestial Captures
            </span>
          </h2>
          <p className="text-cosmic-accent/80 font-syne text-lg md:text-xl max-w-2xl mx-auto">
            Journey through the cosmic memories of LAKSHYA'25
          </p>
        </motion.div>

        {/* Gallery Grid - Modified for consistent sizing */}
        <motion.div
          style={{ y }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group aspect-square"
            >
              <div className="w-full h-full overflow-hidden rounded-xl bg-cosmic-light/30 backdrop-blur-sm">
                {/* Image Container */}
                <div className="relative w-full h-full transform transition-transform duration-500 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cosmic-dark/80" />
                  <img
                    src={image.src}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Hover Overlay */}
                  <motion.div
                    initial={false}
                    whileHover={{
                      opacity: 1,
                      backdropFilter: "blur(4px)",
                    }}
                    className="absolute inset-0 bg-cosmic-dark/40 opacity-0 transition-opacity duration-300 flex items-center justify-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      className="w-12 h-12 rounded-full bg-cosmic-accent/20 backdrop-blur-md flex items-center justify-center"
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </motion.span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Gallery;
