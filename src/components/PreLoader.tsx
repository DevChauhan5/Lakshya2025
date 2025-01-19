import { motion } from "framer-motion";
import { IoRocketOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

interface PreLoaderProps {
  onEnter: () => void;
}

const PreLoader = ({ onEnter }: PreLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const duration = 2000; // 1.5 seconds
    const interval = 10; // Update every 10ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / steps) * 100, 100));

      if (currentStep >= steps) {
        clearInterval(timer);
        setShowButton(true);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-cosmic-dark flex items-center justify-center"
    >
      {/* Star background with lower z-index */}
      <div className="absolute inset-0 z-[101] opacity-50">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-white rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main content with higher z-index */}
      <div className="relative z-[102] text-center space-y-8">
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-6xl md:text-8xl font-orbitron font-bold bg-gradient-to-r from-white to-cosmic-accent bg-clip-text text-transparent"
        >
          LAKSHYA'25
        </motion.h1>

        <motion.div className="space-y-8">
          <div className="text-cosmic-accent font-orbitron tracking-widest">
            EUPHORIA: ORBIT OF WONDER
          </div>

          {/* Loading Bar */}
          <div className="max-w-md mx-auto px-4">
            <div className="relative h-2 bg-cosmic-accent/20 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-cosmic-accent rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
              <motion.div
                className="absolute inset-y-0 left-0 bg-white/30 rounded-full w-full"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
            <motion.p
              className="mt-2 font-syne text-cosmic-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {Math.round(progress)}%
            </motion.p>
          </div>

          {/* Enter Button */}
          {showButton && (
            <motion.button
              onClick={onEnter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group px-8 py-4 rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cosmic-accent to-cosmic-accent/50 opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative flex items-center gap-3 text-white font-orbitron">
                <span className="bg-gradient-to-r from-white to-cosmic-accent bg-clip-text text-transparent">
                  INITIATE LAUNCH
                </span>
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 15, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <IoRocketOutline className="text-xl text-cosmic-accent" />
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
