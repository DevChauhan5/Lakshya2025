import React, { useEffect, useRef, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IoRocketOutline } from "react-icons/io5";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Parallax scroll effect
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  // Optimize canvas animation with useMemo
  const createStars = useMemo(
    () => () => {
      const stars = [];
      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random(),
          y: Math.random(),
          size: Math.random() * 2,
          speed: Math.random() * 0.5,
          opacity: Math.random(),
        });
      }
      return stars;
    },
    []
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    let animationFrameId: number;
    let stars = createStars();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = createStars(); // Recreate stars on resize
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Enhanced star rendering with interactive effects
      stars.forEach((star, index) => {
        const x = star.x * canvas.width;
        const y = (star.y * canvas.height + star.speed) % canvas.height;

        // Create dynamic glow effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, star.size * 2);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Update star position with interactive effect
        stars[index].y = y / canvas.height;
        stars[index].opacity = Math.sin(Date.now() * 0.001 + index) * 0.3 + 0.7;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    render();
    setIsLoaded(true);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [createStars]);

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-[100svh] overflow-hidden bg-gradient-to-b from-cosmic-dark via-[#0c1a3d] to-cosmic"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-50"
        style={{ transform: "translate3d(0,0,0)" }} // Hardware acceleration
      />

      {/* Enhanced gradient overlay with multiple layers */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-cosmic-dark/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-dark/50 via-transparent to-cosmic/50" />

      <motion.div
        style={{ y }}
        className="relative z-10 container mx-auto px-4 sm:px-6 flex items-center min-h-[100svh]"
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
