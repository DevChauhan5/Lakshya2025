"use client";

import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { SectionTitle } from "../ui/SectionTitle";

gsap.registerPlugin(ScrollTrigger);

const BLUR_HASH =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const eventCategories = [
  {
    title: "Cultural Events",
    description:
      "Dance, music, theatre, and art competitions that celebrate creativity and expression.",
    image: "/images/events/cultural/poster.webp",
    gradient: "from-theme-primary/20 to-theme-dark/40",
  },
  {
    title: "EduFun Events",
    description:
      "Hackathons, robotics, and coding challenges that push innovation boundaries.",
    image: "/images/events/edufun/poster.webp",
    gradient: "from-theme-secondary/20 to-theme-dark/40",
  },
  {
    title: "Sports Events",
    description:
      "Athletic competitions and team sports that test skill and sportsmanship.",
    image: "/images/events/sports/poster.webp",
    gradient: "from-theme-accent/20 to-theme-dark/40",
  },
  {
    title: "Literary Events",
    description:
      "Debates, quizzes, and writing competitions that showcase intellectual prowess.",
    image: "/images/events/e-sports/poster.webp",
    gradient: "from-theme-highlight/20 to-theme-dark/40",
  },
];

const EventCard = ({ category, index }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-10%" });

  useEffect(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="relative group rounded-xl overflow-hidden aspect-square"
    >
      {/* Image container */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          ref={imageRef}
          src={category.image}
          alt={category.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={index < 2}
          className="object-cover object-center transform scale-100 opacity-0
                     group-hover:scale-105 transition-all duration-700 ease-out"
          style={{ willChange: "transform" }}
          onLoad={(e) => {
            e.target.style.opacity = "1";
          }}
          quality={90}
          placeholder="blur"
          blurDataURL={`data:image/jpeg;base64,${BLUR_HASH}`}
        />
      </div>

      {/* Gradient overlay - only visible on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${category.gradient} opacity-0
                    group-hover:opacity-90 transition-all duration-500 ease-out`}
      />

      {/* Content - hidden by default, visible on hover */}
      <div
        className="relative z-10 p-8 h-full flex flex-col justify-between opacity-0 
                      group-hover:opacity-100 transition-all duration-500 ease-out"
      >
        <div
          className="transform translate-y-8 group-hover:translate-y-0 
                      transition-transform duration-500 ease-out"
        >
          <h3 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            {category.title}
          </h3>
          <p className="text-white/90 text-lg drop-shadow-lg">
            {category.description}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="self-start px-6 py-3 rounded-full bg-theme-dark/30 backdrop-blur-sm
                     border border-white/20 text-white hover:bg-theme-dark/50 
                     transition-all flex items-center gap-2 group/btn
                     transform translate-y-8 group-hover:translate-y-0 
                     transition-all duration-500 ease-out"
        >
          <span>Click to view all {category.title.toLowerCase()}</span>
          <motion.span
            className="group-hover/btn:translate-x-2 transition-transform duration-300"
            children="→"
          />
        </motion.button>
      </div>
    </motion.div>
  );
};

export const Events = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".event-grid", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
        y: 100,
        opacity: 0,
        duration: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 bg-black overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-radial from-theme-dark/20 via-black to-black" />
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(115,60,128,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(115,60,128,0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle title="Events" />

        <div className="event-grid grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {eventCategories.map((category, index) => (
            <EventCard key={index} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
