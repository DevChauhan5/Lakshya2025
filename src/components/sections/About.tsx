"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLoading } from "@/context/LoadingContext";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  // 1. First hook - useLoading
  const { isLoading } = useLoading();

  // 2. All useRef hooks
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);

  const description = `At Lakshya, we believe in creativity, innovation, and the endless possibilities of the universe. Our annual celebration not only showcases remarkable talents but also inspires dreams and breakthroughs across diverse fields. Join us on a journey where art merges with technology and every moment propels a brighter future. Our commitment to excellence shines in every performance, every event, and every smile.`;
  const words = description.split(" ");

  // 3. useGSAP hook
  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Title animation
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Words animation
        const wordElements = wordsRef.current?.children;
        if (wordElements) {
          gsap.fromTo(
            wordElements,
            { opacity: 0, y: 20, rotationX: -45 },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 0.5,
              stagger: 0.02,
              scrollTrigger: {
                trigger: wordsRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef }
  );

  if (isLoading) return null;

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-black">
      <div className="relative w-full min-h-screen">
        <video
          src="/videos/about.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          loop
        />
        <div
          ref={textContainerRef}
          className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black/60 px-4 py-16"
        >
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gold via-red to-pink bg-clip-text text-transparent"
          >
            About Us
          </h2>
          <div
            ref={wordsRef}
            className="flex flex-wrap justify-center max-w-4xl"
          >
            {words.map((word, index) => (
              <span
                key={index}
                className="text-white text-lg md:text-xl mx-1 inline-block"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
