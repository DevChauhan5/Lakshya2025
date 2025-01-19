import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IoRocketOutline } from "react-icons/io5";
import { FiArrowDown } from "react-icons/fi";

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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-cosmic-dark via-[#0c1a3d] to-cosmic">
      {/* Animated stars canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-50" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-cosmic-dark/80" />

      <div className="relative z-10 container mx-auto px-6 pt-32">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            {/* Main title with enhanced styling */}
            <motion.h1
              className="font-orbitron text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-cosmic-accent"
              animate={{ backgroundPosition: ["0%", "100%"] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              LAKSHYA'25
            </motion.h1>

            {/* Theme name with animated underline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative mt-4"
            >
              <h2 className="font-orbitron text-2xl md:text-4xl text-cosmic-accent/90 tracking-wider">
                EUPHORIA: ORBIT OF WONDER
              </h2>
              <motion.div
                className="h-[2px] bg-gradient-to-r from-transparent via-cosmic-accent to-transparent mt-2 mx-auto"
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                transition={{ delay: 1, duration: 1 }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="font-quicksand text-cosmic-muted text-lg md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed"
            >
              Embark on a celestial journey where innovation meets wonder,
              exploring the boundless frontiers of space and technology.
            </motion.p>
          </motion.div>

          {/* Enhanced CTA button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12 flex justify-center gap-6"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(56, 189, 248, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              className="group bg-gradient-to-r from-cosmic-accent/20 to-cosmic-accent/10 backdrop-blur-lg border border-cosmic-accent/30 hover:border-cosmic-accent/50 px-8 py-4 rounded-lg transition-all duration-300"
            >
              <span className="font-orbitron text-white flex items-center gap-2">
                Begin Journey
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <IoRocketOutline className="text-xl" />
                </motion.div>
              </span>
            </motion.button>
          </motion.div>

          {/* Enhanced decorative elements */}
          <div className="absolute top-1/4 right-[15%] w-72 h-72 bg-cosmic-accent/10 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 left-[15%] w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] animate-pulse-slow delay-1000" />

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          >
            <FiArrowDown className="text-cosmic-accent text-2xl animate-glow" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
