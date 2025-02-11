"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { SectionTitle } from "../ui/SectionTitle";

gsap.registerPlugin(ScrollTrigger);

const posters = [
  {
    id: 1,
    title: "Day 1",
    date: "March 1, 2025",
    image: "/images/timeline/1.jpg",
    description: "Opening Ceremony & Cultural Night",
  },
  {
    id: 2,
    title: "Day 2",
    date: "March 2, 2025",
    image: "/images/timeline/2.jpg",
    description: "Sports & E-Sports Tournaments",
  },
  {
    id: 3,
    title: "Day 3",
    date: "March 3, 2025",
    image: "/images/timeline/3.jpg",
    description: "Technical Events & Workshops",
  },
  {
    id: 4,
    title: "Day 4",
    date: "March 4, 2025",
    image: "/images/timeline/4.jpg",
    description: "Star Night & Closing Ceremony",
  },
];

const PosterCard = ({ poster, index }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;

    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 100,
        rotate: index % 2 === 0 ? -10 : 10,
      },
      {
        opacity: 1,
        y: 0,
        rotate: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          end: "top center",
          toggleActions: "play none none reverse",
          scrub: 1,
        },
      }
    );

    gsap.fromTo(
      image,
      {
        scale: 1.2,
        filter: "grayscale(100%) brightness(50%)",
      },
      {
        scale: 1,
        filter: "grayscale(0%) brightness(100%)",
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=50",
          end: "top center+=100",
          toggleActions: "play none none reverse",
          scrub: 1,
        },
      }
    );
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      className="relative w-[300px] h-[450px] md:w-[400px] md:h-[600px] 
                 flex-shrink-0 overflow-hidden rounded-2xl
                 transform perspective-1000"
      whileHover={{ scale: 1.02, rotateY: 5 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black z-10" />

      <div ref={imageRef} className="absolute inset-0">
        <Image
          src={poster.image}
          alt={poster.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 300px, 400px"
          priority={index === 0}
        />
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6 z-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-3xl font-bold text-theme-primary mb-2">
          {poster.title}
        </h3>
        <p className="text-lg text-white/90 mb-1">{poster.date}</p>
        <p className="text-white/70">{poster.description}</p>
      </motion.div>
    </motion.div>
  );
};

export const Timeline = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollRef.current;

    let ctx = gsap.context(() => {
      // Horizontal scroll animation
      gsap.to(scrollContainer, {
        x: () => -(scrollContainer.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scrollContainer.scrollWidth - window.innerWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative bg-black" ref={containerRef}>
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-gradient-radial from-theme-dark/30 via-black to-black"
      />

      <div className="sticky top-0 pt-20 pb-10 px-4 z-10">
        <SectionTitle title="Timeline" />
      </div>

      <div
        ref={scrollRef}
        className="flex gap-8 md:gap-12 px-4 md:px-20 pb-20 min-h-[80vh]
                   items-center"
      >
        {/* Line connecting the posters */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-theme-primary via-theme-secondary to-theme-accent transform -translate-y-1/2" />

        {posters.map((poster, index) => (
          <PosterCard key={poster.id} poster={poster} index={index} />
        ))}
      </div>
    </section>
  );
};
