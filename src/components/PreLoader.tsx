import { motion } from "framer-motion";
import { IoRocketOutline } from "react-icons/io5";

interface PreLoaderProps {
  onEnter: () => void;
}

const PreLoader = ({ onEnter }: PreLoaderProps) => {
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="space-y-4"
        >
          <div className="text-cosmic-accent font-orbitron tracking-widest">
            EUPHORIA: ORBIT OF WONDER
          </div>

          <motion.button
            onClick={onEnter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-[103] select-none cursor-pointer bg-cosmic-accent text-white px-8 py-4 rounded-full hover:bg-cosmic-accent/80 transition-all duration-300 transform hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]"
          >
            <span className="flex items-center gap-2 font-orbitron">
              LAUNCH EXPERIENCE
              <IoRocketOutline className="text-xl" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PreLoader;
