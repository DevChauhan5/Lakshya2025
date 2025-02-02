"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export const About = () => {
  const textContainerRef = useRef<HTMLDivElement>(null);

  // A longer multi-sentence description.
  const description =
    "At Lakshya, we believe in creativity, innovation, and the endless possibilities of the universe. Our annual celebration not only showcases remarkable talents but also inspires dreams and breakthroughs across diverse fields. Join us on a journey where art merges with technology and every moment propels a brighter future. Our commitment to excellence shines in every performance, every event, and every smile.";
  // Split description into words for individual animation.
  const words = description.split(" ");

  useEffect(() => {
    const wordsEls = textContainerRef.current?.querySelectorAll(".word");
    if (wordsEls) {
      gsap.fromTo(
        wordsEls,
        { opacity: 0, y: 20, rotation: 10, scale: 0.7 },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.15,
          delay: 0.5,
        }
      );
    }
  }, []);

  return (
    <section className="w-full relative">
      {/* Fullscreen background video */}
      <div className="relative w-full h-screen overflow-hidden">
        <video
          src="/videos/about.mp4" // 10-sec background video
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          loop
        />
      </div>
      {/* Text overlay */}
      <div
        ref={textContainerRef}
        className="absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-black bg-opacity-40 px-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-gold via-red to-pink bg-clip-text text-transparent">
          About Us
        </h2>
        <div className="flex flex-wrap justify-center max-w-3xl">
          {words.map((word, index) => (
            <span
              key={index}
              className="word text-white text-lg md:text-xl mx-1"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
