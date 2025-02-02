"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Stars } from "../effects/Stars";
import { useLoading } from "@/context/LoadingContext";
import { useGSAP } from "@gsap/react";

const ClientStars = () => {
  return <Stars />;
};

const AnimatedNebula = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: -1,
        background:
          "radial-gradient(circle_at_center, rgba(128,0,128,0.5), transparent)",
      }}
    />
  );
};

// Updated AnimatedButton component with responsive Tailwind classes instead of fixed inline styles.
const AnimatedButton = () => {
  return (
    <button
      className="relative mt-4 sm:mt-16 overflow-hidden rounded-full bg-gradient-to-r from-gold via-red to-pink 
                 px-4 py-2 sm:px-10 sm:py-3 text-base sm:text-lg font-semibold text-purple-dark transition-all 
                 hover:from-pink hover:via-purple-light hover:to-gold"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = "0 0 30px rgba(255, 206, 107, 0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "scale(0.95)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <span className="relative">Enter Portal</span>
    </button>
  );
};

export const Hero = () => {
  const { isLoading } = useLoading();
  const [isMounted, setIsMounted] = useState(false);
  const title = "LAKSHYA'25";
  const lettersContainerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!isLoading) {
      setIsMounted(true);
    }
  }, [isLoading]);

  useGSAP(
    () => {
      const letters = lettersContainerRef.current?.querySelectorAll(".letter");
      if (letters) {
        gsap.fromTo(
          letters,
          { opacity: 0, y: 50, rotationX: -90, scale: 0.5 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power4.out",
          }
        );
      }
    },
    { scope: lettersContainerRef, deps: [isMounted] }
  );

  if (isLoading) return null;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#000000]">
      {isMounted && <ClientStars />}
      {isMounted && <AnimatedNebula />}
      <div className="relative z-10 max-w-7xl px-4 text-center">
        <div className="relative">
          <h1
            ref={lettersContainerRef}
            // Increase letter sizes and reduce spacing: using larger responsive sizes and tighter tracking.
            className="relative z-10 flex justify-center items-center tracking-tighter text-6xl sm:text-8xl md:text-[10rem] lg:text-[14rem] xl:text-[16rem]"
          >
            {Array.from(title).map((char, index) =>
              char === " " ? (
                <span key={index} className="w-0.5 inline-block">
                  &nbsp;
                </span>
              ) : (
                <svg
                  key={index}
                  // Reduced horizontal margins for less spacing between letters.
                  className="letter inline-block overflow-hidden -mx-0.5 cursor-pointer"
                  width="2em"
                  height="2em"
                  viewBox="0 0 120 120"
                >
                  <defs>
                    <mask id={`mask-letter-${index}`}>
                      <rect width="100%" height="100%" fill="black" />
                      <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="100"
                        fontWeight="bold"
                        fill="white"
                        style={{ filter: "url(#glow)" }}
                      >
                        {char}
                      </text>
                    </mask>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <g mask={`url(#mask-letter-${index})`}>
                    <foreignObject width="100%" height="100%">
                      <div className="w-full h-full">
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                          src={`/videos/hero/${index + 1}.webm`}
                        />
                      </div>
                    </foreignObject>
                  </g>
                </svg>
              )
            )}
          </h1>
        </div>
        <div id="hero-button" className="mt-8 sm:mt-16">
          {isMounted && <AnimatedButton />}
        </div>
      </div>
    </div>
  );
};
