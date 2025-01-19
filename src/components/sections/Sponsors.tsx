import React from "react";
import { motion } from "framer-motion";

const Sponsors = () => {
  // Sample sponsor SVGs - replace with actual sponsor logos
  const sponsors = [
    {
      id: 1,
      svg: (
        <svg className="w-24 h-24" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="40" />
        </svg>
      ),
    },
    {
      id: 2,
      svg: (
        <svg className="w-24 h-24" viewBox="0 0 100 100" fill="currentColor">
          <rect x="20" y="20" width="60" height="60" />
        </svg>
      ),
    },
    {
      id: 3,
      svg: (
        <svg className="w-24 h-24" viewBox="0 0 100 100" fill="currentColor">
          <polygon points="50,20 80,80 20,80" />
        </svg>
      ),
    },
    // Duplicate sponsors for continuous scrolling effect
  ].concat(
    // Duplicate the array for seamless looping
    [...Array(3)].map((_, i) => ({
      id: i + 4,
      svg: (
        <svg className="w-24 h-24" viewBox="0 0 100 100" fill="currentColor">
          {i === 0 && <circle cx="50" cy="50" r="40" />}
          {i === 1 && <rect x="20" y="20" width="60" height="60" />}
          {i === 2 && <polygon points="50,20 80,80 20,80" />}
        </svg>
      ),
    }))
  );

  return (
    <section className="relative py-20 overflow-hidden bg-transparent">
      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white via-cosmic-accent to-white">
            OUR SPONSORS
          </h2>
          <motion.div
            className="h-[2px] w-[200px] mx-auto mt-6 bg-gradient-to-r from-transparent via-cosmic-accent to-transparent"
            initial={{ width: 0 }}
            whileInView={{ width: 200 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Marquee container */}
        <div className="relative w-full overflow-hidden">
          <div className="inline-flex animate-infinite-scroll">
            {/* First set of sponsors */}
            {sponsors.map((sponsor) => (
              <motion.div
                key={`first-${sponsor.id}`}
                className="flex-shrink-0 mx-8"
                whileHover={{ scale: 1.1 }}
              >
                <div className="relative group">
                  <div className="relative p-8 rounded-xl backdrop-blur-sm border border-cosmic-accent/10 transition-all duration-300 group-hover:border-cosmic-accent/30 hover:backdrop-blur-lg">
                    <div className="absolute inset-0 bg-cosmic-accent/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative text-cosmic-accent/50 group-hover:text-cosmic-accent transition-colors duration-300">
                      {sponsor.svg}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Duplicate set for seamless loop */}
            {sponsors.map((sponsor) => (
              <motion.div
                key={`second-${sponsor.id}`}
                className="flex-shrink-0 mx-8"
                whileHover={{ scale: 1.1 }}
              >
                <div className="relative group">
                  <div className="relative p-8 rounded-xl backdrop-blur-sm border border-cosmic-accent/10 transition-all duration-300 group-hover:border-cosmic-accent/30 hover:backdrop-blur-lg">
                    <div className="absolute inset-0 bg-cosmic-accent/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative text-cosmic-accent/50 group-hover:text-cosmic-accent transition-colors duration-300">
                      {sponsor.svg}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
