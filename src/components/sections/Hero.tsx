import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IoRocketOutline } from "react-icons/io5";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Star creation
    const stars: { x: number; y: number; size: number; speed: number }[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5,
      });
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y = (star.y + star.speed) % canvas.height;
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener("resize", setCanvasSize);
  }, []);

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-gradient-to-b from-cosmic-dark via-[#0c1a3d] to-cosmic">
      {/* Animated stars canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-50" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-cosmic-dark/80" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 flex items-center min-h-[100svh]">
        <div className="max-w-5xl mx-auto w-full py-20 md:py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center space-y-6 md:space-y-8"
          >
            {/* Enhanced main title */}
            <motion.h1
              className="font-orbitron text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-cosmic-accent leading-tight"
              animate={{ backgroundPosition: ["0%", "100%"] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              LAKSHYA'25
            </motion.h1>

            {/* Enhanced theme name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl lg:text-4xl text-cosmic-accent/90 tracking-[0.2em] leading-relaxed">
                EUPHORIA: ORBIT OF WONDER
              </h2>
              <motion.div
                className="h-[2px] bg-gradient-to-r from-transparent via-cosmic-accent to-transparent mt-3 mx-auto"
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                transition={{ delay: 1, duration: 1 }}
              />
            </motion.div>

            {/* Enhanced description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="font-quicksand text-base sm:text-lg md:text-xl text-cosmic-muted max-w-2xl mx-auto leading-relaxed px-4"
            >
              Embark on a celestial journey where innovation meets wonder,
              exploring the boundless frontiers of space and technology.
            </motion.p>

            {/* Enhanced CTA button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-8 md:mt-12 flex justify-center"
            >
              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 25px rgba(56, 189, 248, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                className="relative group overflow-hidden rounded-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cosmic-accent/20 to-cosmic-accent/40 group-hover:opacity-70 transition-opacity duration-300" />
                <div className="relative bg-gradient-to-r from-cosmic-accent/10 to-transparent border-2 border-cosmic-accent/30 hover:border-cosmic-accent/50 backdrop-blur-lg px-8 py-4 sm:px-10 sm:py-5 rounded-xl transition-all duration-300">
                  <span className="font-orbitron text-base sm:text-lg text-white flex items-center gap-3 font-medium tracking-wider">
                    REGISTER NOW
                    <motion.div
                      animate={{
                        x: [0, 5, 0],
                        rotate: [0, 15, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <IoRocketOutline className="text-xl sm:text-2xl" />
                    </motion.div>
                  </span>
                </div>
                <div className="absolute inset-0 ring-2 ring-cosmic-accent/20 rounded-xl group-hover:ring-cosmic-accent/40 transition-all duration-300" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Enhanced decorative elements */}
          <div className="absolute top-1/4 right-[5%] sm:right-[15%] w-48 h-48 sm:w-72 sm:h-72 bg-cosmic-accent/10 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 left-[5%] sm:left-[15%] w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/5 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
