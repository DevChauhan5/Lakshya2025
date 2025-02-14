"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { PiRocketLaunchFill } from "react-icons/pi";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
        exit={{ opacity: 0, scale: 0 }}
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 z-50 cursor-pointer"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-theme-primary/10 backdrop-blur-sm border border-theme-primary/30
                   rounded-full p-3 group"
        >
          <motion.div
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <PiRocketLaunchFill
              className="w-6 h-6 text-theme-primary rotate-45 
                       transition-transform group-hover:-rotate-45"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 bg-theme-primary/30"
        style={{ scaleX, transformOrigin: "0%" }}
      />
    </>
  );
};
