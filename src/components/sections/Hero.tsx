import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IoRocketOutline } from "react-icons/io5";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update scroll configuration
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-[100svh] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        style={{ y }}
        className="relative container mx-auto px-4 sm:px-6 flex items-center min-h-[100svh]"
      >
        {/* Main content wrapper */}
        <div className="max-w-5xl mx-auto w-full py-20 md:py-0">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center space-y-6 md:space-y-8"
          >
            {/* Enhanced title animation */}
            <motion.h1
              className="font-orbitron text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundImage:
                  "linear-gradient(135deg, #fff 0%, #38BDF8 100%)",
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            >
              LAKSHYA'25
            </motion.h1>

            {/* Enhanced theme name with floating effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <motion.h2
                className="font-orbitron text-xl sm:text-2xl md:text-3xl lg:text-4xl text-cosmic-accent/90 tracking-[0.2em] leading-relaxed"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                EUPHORIA: ORBIT OF WONDER
              </motion.h2>

              {/* Animated underline with glow effect */}
              <motion.div
                className="h-[2px] bg-gradient-to-r from-transparent via-cosmic-accent to-transparent mt-3 mx-auto relative"
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                transition={{ delay: 1, duration: 1 }}
              >
                <motion.div
                  className="absolute inset-0 bg-cosmic-accent/30 blur-sm"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>

            {/* Enhanced CTA button */}
            <motion.button
              className="relative group overflow-hidden rounded-xl mt-12"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(56, 189, 248, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cosmic-accent/20 to-cosmic-accent/40"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 0%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              {/* Button content with enhanced animation */}
              <div className="relative px-8 py-4 sm:px-10 sm:py-5 backdrop-blur-lg border-2 border-cosmic-accent/30 rounded-xl">
                <motion.span
                  className="font-orbitron text-base sm:text-lg text-white flex items-center gap-3 font-medium tracking-wider"
                  animate={{
                    textShadow: ["0 0 10px #38BDF8", "0 0 20px #38BDF8"],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  REGISTER NOW
                  <motion.div
                    animate={{
                      x: [0, 5, 0],
                      rotate: [0, 15, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <IoRocketOutline className="text-xl sm:text-2xl" />
                  </motion.div>
                </motion.span>
              </div>
            </motion.button>
          </motion.div>

          {/* Enhanced decorative elements with dynamic animations */}
          <div className="pointer-events-none">
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                className="absolute w-72 h-72 rounded-full blur-[100px]"
                style={{
                  top: `${25 * index}%`,
                  left: index % 2 ? "5%" : "75%",
                  background: `rgba(56, 189, 248, ${0.05 * index})`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4 + index,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
