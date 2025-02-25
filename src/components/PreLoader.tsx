"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const loadingMessages = [
  "Initiating Launch Sequence...",
  "Calibrating Space Coordinates...",
  "Charging Quantum Thrusters...",
  "Synchronizing Star Maps...",
  "Preparing for Takeoff...",
];

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentGif, setCurrentGif] = useState(3);
  const [messageIndex, setMessageIndex] = useState(0);
  const [exitAnimation, setExitAnimation] = useState(false);

  useEffect(() => {
    const gif1Duration = 4000;
    const gif2Duration = 5000;
    const totalDuration = gif1Duration + gif2Duration;
    const messageDelay = 1000;

    // Switch GIFs with fade transition
    const gifTimer = setTimeout(() => {
      setCurrentGif(4);
    }, gif1Duration);

    // Message sequence
    const messageTimers = loadingMessages.map((_, index) => {
      return setTimeout(() => {
        setMessageIndex(index);
      }, index * messageDelay);
    });

    // Initiate exit sequence
    const exitTimer = setTimeout(() => {
      setExitAnimation(true);
    }, totalDuration - 1000); // Start exit animation 1s before total duration

    // Complete loading sequence
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, totalDuration);

    return () => {
      clearTimeout(gifTimer);
      clearTimeout(loadingTimer);
      clearTimeout(exitTimer);
      messageTimers.forEach((timer) => timer && clearTimeout(timer));
    };
  }, []);

  // Enhanced exit animation variants
  const exitVariants = {
    initial: { scale: 1, filter: "brightness(1) blur(0px)" },
    exit: {
      scale: 1.1,
      filter: "brightness(2) blur(10px)",
      transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] bg-black flex items-center justify-center"
        >
          {/* Enhanced GIF transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentGif}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full"
            >
              <motion.div
                variants={exitVariants}
                initial="initial"
                animate={exitAnimation ? "exit" : "initial"}
                className="relative w-full h-full" // Added relative positioning
              >
                <div className="relative w-full h-full">
                  {" "}
                  {/* Added container with relative position */}
                  <Image
                    src={`/gifs/${currentGif}.webp`}
                    alt="Loading..."
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                    style={{ objectPosition: "center" }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Centered loading message container */}
          <motion.div
            className="absolute inset-0 flex items-end justify-center my-6"
            animate={{
              opacity: exitAnimation ? [1, 0] : 1,
              scale: exitAnimation ? [1, 0.95] : 1,
            }}
            transition={{ duration: 0.6 }}
          >
            <motion.div className="flex flex-col items-center gap-4 z-10">
              <motion.div
                key={messageIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity:
                    messageIndex === loadingMessages.length - 1
                      ? [1, 0.5, 1]
                      : 1,
                  y: 0,
                }}
                transition={
                  messageIndex === loadingMessages.length - 1
                    ? {
                        opacity: {
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }
                    : { duration: 0.5 }
                }
                className=" text-2xl sm:text-3xl font-medium tracking-wider
                         text-center px-6
                         text-white/80
                         rounded-lg backdrop-blur-sm"
              >
                {loadingMessages[messageIndex]}
              </motion.div>

              {messageIndex < loadingMessages.length - 1 && (
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex gap-2"
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-yellow-400 to-purple-700"
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
