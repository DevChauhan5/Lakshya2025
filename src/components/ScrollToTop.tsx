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
      // Get the viewport height
      const windowHeight = window.innerHeight;
      // Get the total scrollable height
      const documentHeight = document.documentElement.scrollHeight;
      // Get current scroll position
      const scrollPos = window.pageYOffset;

      // Show button only when:
      // 1. Scrolled past 300px from top AND
      // 2. Not at the bottom of the page (with a 20px threshold)
      const isNotAtBottom = documentHeight - (scrollPos + windowHeight) > 20;
      setIsVisible(scrollPos > 300 && isNotAtBottom);
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
