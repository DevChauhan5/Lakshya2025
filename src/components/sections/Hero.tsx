"use client";

import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import localFont from "next/font/local";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Rings } from "../effects/Rings";
import { Meteors } from "../magicui/meteors";

const starwar = localFont({
  src: "../../app/fonts/star.woff",
  variable: "--font-starwars",
});

const SpaceElements = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Updated planet positions
  const planets = [
    {
      src: "/images/planet1.webp",
      className: "top-[15%] -right-20 w-40 h-40 opacity-60",
    },
    {
      src: "/images/planet2.webp",
      className: "top-[60%] -left-16 w-32 h-32 opacity-50", // Moved down from 40% to 60%
    },
  ];

  return (
    <>
      {/* Background elements */}
      <div className="absolute inset-0">
        <Meteors
          number={6}
          className="!bg-gradient-to-br from-yellow-400 via-red-500 to-purple-700 
                    before:!bg-gradient-to-r before:!from-yellow-400 before:!via-red-500 before:!to-transparent"
        />
      </div>
      <Rings />

      {/* Centered Astronaut behind text - hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -15, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 12,
          delay: 0.2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%]
                   hidden md:block  here
                   w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] 
                   lg:w-[700px] lg:h-[700px] xl:w-[800px] xl:h-[800px]
                   opacity-25 pointer-events-none z-0
                   mix-blend-luminosity select-none"
      >
        <Image
          src="/images/as.webp"
          alt="Floating Astronaut"
          fill
          className="object-contain"
          sizes="(max-width: 640px) 400px, (max-width: 768px) 500px, 
                 (max-width: 1024px) 600px, (max-width: 1280px) 700px, 800px"
          priority
        />

        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black" />
      </motion.div>

      {/* Floating planets */}
      {planets.map((planet, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, 15, 0],
            rotate: [0, planet.src.includes("2") ? -10 : 10, 0],
          }}
          transition={{
            duration: 8,
            delay: index * 0.3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className={`absolute ${planet.className} z-10`} // Added z-10 to ensure planets stay above astronaut
        >
          <Image
            src={planet.src}
            alt={`Planet ${index + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100px, 200px"
            priority={index === 0}
          />
        </motion.div>
      ))}

      {/* Mobile gradient overlay */}
      {isMobile && (
        <div className="absolute inset-0 bg-gradient-to-b from-black via-theme-dark/5 to-black" />
      )}
    </>
  );
};

const AnimatedTitle = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const titleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), {
    stiffness: 50,
    damping: 30,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1400px] mx-auto px-4"
    >
      <div
        ref={titleRef}
        className="relative flex flex-col items-center justify-center z-20"
      >
        {/* Simplified glow effect for mobile */}
        {!isMobile && (
          <div className="absolute inset-0 rounded-full opacity-20 blur-3xl bg-gradient-radial from-theme-primary/30 via-transparent to-transparent" />
        )}

        {/* Main title with simplified mobile animations */}
        <motion.h1
          initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={
            isInView ? (isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }) : {}
          }
          transition={{
            duration: isMobile ? 0.5 : 1,
            ease: "easeOut",
          }}
          style={isMobile ? undefined : { y: titleY }}
          className={`${starwar.className} 
            relative text-center
            text-[50px] xs:text-[60px] sm:text-[80px] md:text-[120px] lg:text-[150px] xl:text-[180px]
            leading-[0.9] sm:leading-[0.95] md:leading-[1]
            tracking-tighter
            bg-gradient-to-br from-yellow-400 via-red-500 to-purple-700 
            bg-clip-text text-transparent mix-blend-screen
            py-2`}
        >
          LAKSHYA&apos;25
        </motion.h1>

        {/* Simplified subtitle for mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl 
                    tracking-wide font-medium px-2 relative uppercase text-center
                    bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 
                    bg-clip-text text-transparent mt-6 sm:mt-4"
        >
          Euphoria: Orbit of Wonder
        </motion.div>
      </div>
    </div>
  );
};

export const Hero = () => {
  return (
    <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden">
      <SpaceElements />

      <div className="relative w-full flex flex-col items-center justify-center gap-6 sm:gap-8">
        <AnimatedTitle />

        {/* Simplified button for mobile */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => {
            document
              .getElementById("events")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl 
                   bg-gradient-to-r from-yellow-400/10 via-orange-400/10 to-yellow-400/10
                   backdrop-blur-sm border border-yellow-400/30 
                   active:scale-95 hover:border-yellow-400/60 text-yellow-400
                   transition-all duration-300 flex items-center gap-2 sm:gap-3"
        >
          <span>Explore Events</span>
          <span>→</span>
        </motion.button>
      </div>
    </section>
  );
};
