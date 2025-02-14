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
  const [currentGif, setCurrentGif] = useState(1);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const gif1Duration = 4000;
    const gif2Duration = 3500;
    const totalDuration = gif1Duration + gif2Duration;
    const messageDelay = 1000; // 1 second between messages

    // Switch GIFs after first duration
    const gifTimer = setTimeout(() => {
      setCurrentGif(2);
    }, gif1Duration);

    // Change messages with delays until the last message
    const messageTimers = loadingMessages.map((_, index) => {
      if (index < loadingMessages.length) {
        return setTimeout(() => {
          setMessageIndex(index);
        }, index * messageDelay);
      }
    });

    // Total loading time
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, totalDuration);

    return () => {
      clearTimeout(gifTimer);
      clearTimeout(loadingTimer);
      messageTimers.forEach((timer) => timer && clearTimeout(timer));
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] bg-black"
        >
          <motion.div
            key={currentGif}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full"
          >
            <Image
              src={`/gifs/${currentGif}.gif`}
              alt="Loading..."
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "center" }}
            />
          </motion.div>

          {/* Enhanced Loading Message */}
          <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <motion.div
              key={messageIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity:
                  messageIndex === loadingMessages.length - 1 ? [1, 0.5, 1] : 1,
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
              className="text-white/80 text-lg sm:text-xl font-medium tracking-wider
                       bg-gradient-to-r from-theme-primary via-theme-accent to-theme-secondary
                       bg-clip-text text-transparent"
            >
              {loadingMessages[messageIndex]}
            </motion.div>

            {/* Loading dots - only show if not on last message */}
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
                className="flex gap-1"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="w-2 h-2 rounded-full bg-theme-primary"
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
