"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Stars } from "../effects/Stars";
import { useLoading } from "@/context/LoadingContext";

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

const AnimatedBackground = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: "-20px",
        zIndex: 0,
        borderRadius: "50%",
        background:
          "linear-gradient(to right, rgba(138,43,226,0.2), rgba(75,0,130,0.2), rgba(0,0,139,0.2))",
        filter: "blur(3xl)",
      }}
    />
  );
};

const AnimatedButton = () => {
  return (
    <button
      style={{
        position: "relative",
        marginTop: "16px",
        overflow: "hidden",
        borderRadius: "50%",
        background: "linear-gradient(to right, gold, red, pink)",
        padding: "10px 20px",
        fontSize: "1.125rem",
        fontWeight: "600",
        color: "purple-dark",
        transition: "all 0.3s",
      }}
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
      <span style={{ position: "relative" }}>Enter Portal</span>
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

  useEffect(() => {
    if (isMounted && lettersContainerRef.current) {
      const letters = lettersContainerRef.current.querySelectorAll(".letter");
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
  }, [isMounted]);

  if (isLoading) return null;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#000000]">
      {isMounted && <ClientStars />}
      {isMounted && <AnimatedNebula />}
      <div className="relative z-10 max-w-7xl px-4 text-center">
        <div className="relative">
          {isMounted && <AnimatedBackground />}
          <h1
            ref={lettersContainerRef}
            className="relative z-10 flex justify-center items-center space-x-0 text-7xl sm:text-9xl md:text-[12rem] lg:text-[14rem]"
          >
            {Array.from(title).map((char, index) =>
              char === " " ? (
                <span key={index} className="w-0.5 inline-block">
                  &nbsp;
                </span>
              ) : (
                <svg
                  key={index}
                  className="letter inline-block overflow-hidden -mx-1 cursor-pointer"
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
        <div id="hero-button" className="mt-16">
          {isMounted && <AnimatedButton />}
        </div>
      </div>
    </div>
  );
};
