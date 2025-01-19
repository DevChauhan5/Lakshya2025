import { motion } from "framer-motion";
import { IoRocketOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

interface PreLoaderProps {
  onEnter: () => void;
}

const PreLoader = ({ onEnter }: PreLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading experience");

  useEffect(() => {
    const duration = 2000; // Changed to 2 seconds
    const interval = 10;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (newProgress === 100) {
        clearInterval(timer);
        setLoadingText("Ready for launch!");
        setTimeout(() => setShowButton(true), 500); // Delay button appearance
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] bg-cosmic-dark flex items-center justify-center px-4 sm:px-6"
    >
      {/* Modern geometric background */}
      <div className="absolute inset-0 z-[101]">
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute bottom-0 left-0 w-full h-1/2"
            style={{
              background:
                "radial-gradient(circle at bottom, #38BDF8 0%, transparent 60%)",
              filter: "blur(80px)",
            }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Animated lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-cosmic-accent/30 to-transparent w-full"
              style={{ top: `${30 + i * 20}%` }}
              animate={{
                x: [-100, 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Content container with improved animations */}
      <div className="relative z-[102] w-full max-w-xl mx-auto text-center space-y-6 sm:space-y-8 py-8 backdrop-blur-sm">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-4"
        >
          <motion.h1
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold bg-gradient-to-r from-white to-cosmic-accent bg-clip-text text-transparent px-2"
            animate={{
              textShadow: [
                "0 0 20px rgba(56, 189, 248, 0)",
                "0 0 20px rgba(56, 189, 248, 0.5)",
                "0 0 20px rgba(56, 189, 248, 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            LAKSHYA'25
          </motion.h1>

          <p className="text-sm xs:text-base sm:text-lg text-cosmic-accent font-orbitron tracking-widest px-2">
            EUPHORIA: ORBIT OF WONDER
          </p>
        </motion.div>

        {/* Enhanced loading bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-xs mx-auto space-y-3 px-4"
        >
          <div className="relative h-1.5 bg-cosmic-accent/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-cosmic-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute inset-0 bg-white/50"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                width: "50%",
                filter: "blur(8px)",
              }}
            />
          </div>

          <div className="flex justify-between items-center text-xs sm:text-sm font-syne">
            <span className="text-cosmic-muted">{loadingText}</span>
            <span className="text-cosmic-accent">{Math.round(progress)}%</span>
          </div>
        </motion.div>

        {/* Enhanced button appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: showButton ? 1 : 0,
            y: showButton ? 0 : 20,
          }}
          transition={{ duration: 0.6 }}
        >
          {showButton && (
            <motion.button
              onClick={onEnter}
              className="group relative overflow-hidden rounded-lg px-6 py-3 sm:px-8 sm:py-4 bg-cosmic-accent/10 hover:bg-cosmic-accent/20 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cosmic-accent/20 via-cosmic-accent/10 to-transparent animate-pulse" />
              <div className="relative flex items-center justify-center gap-2 text-sm sm:text-base">
                <span className="font-orbitron text-white">
                  LAUNCH EXPERIENCE
                </span>
                <motion.div
                  animate={{
                    y: [0, -4, 0],
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <IoRocketOutline className="text-cosmic-accent text-lg sm:text-xl" />
                </motion.div>
              </div>
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PreLoader;
