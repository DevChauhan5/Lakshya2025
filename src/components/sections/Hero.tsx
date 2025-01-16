import React from "react";
import { motion } from "framer-motion";
import { IoRocketOutline } from "react-icons/io5";
import { FiArrowDown } from "react-icons/fi";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-cosmic-dark overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial from-cosmic to-cosmic-dark" />
      <div className="absolute inset-0 bg-[url('/grid.png')] opacity-20" />

      <div className="relative z-10 container mx-auto px-6 pt-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="font-orbitron text-6xl md:text-8xl font-bold tracking-tight text-white mb-6">
              LAKSHYA
              <span className="block text-4xl md:text-6xl mt-2 tracking-widest text-cosmic-accent/90">
                2025
              </span>
            </h1>

            <p className="font-quicksand text-cosmic-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Pioneering the next generation of space exploration and
              technological advancement
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex justify-center gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 px-8 py-4 rounded-lg transition-all duration-300"
            >
              <span className="font-orbitron text-white flex items-center gap-2">
                Explore Mission
                <IoRocketOutline className="text-xl group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute top-1/3 right-[10%] w-64 h-64 bg-cosmic-accent/5 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/3 left-[10%] w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <FiArrowDown className="text-cosmic-muted text-2xl" />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
