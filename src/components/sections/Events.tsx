"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
    route: "/cultural",
  },
  {
    title: "EduFun Events",
    description:
      "Hackathons, robotics, and coding challenges that push innovation boundaries.",
    image: "/images/events/edufun/poster.webp",
    gradient: "from-theme-secondary/20 to-theme-dark/40",
    route: "/edufun",
  },
  {
    title: "Sports Events",
    description:
      "Athletic competitions and team sports that test skill and sportsmanship.",
    image: "/images/events/sports/poster.webp",
    gradient: "from-theme-accent/20 to-theme-dark/40",
    route: "/sports",
  },
  {
    title: "E-Sports Events",
    description:
      "Debates, quizzes, and writing competitions that showcase intellectual prowess.",
    image: "/images/events/e-sports/poster.webp",
    gradient: "from-theme-highlight/20 to-theme-dark/40",
    route: "/e-sports",
  },
];

const EventCard = ({ category, index, direction }) => {
  const router = useRouter();
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      // Enhanced entrance animation with direction
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          x: direction === "left" ? -100 : 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom-=100",
            end: "top center+=100",
            toggleActions: "play none none reverse",
            scrub: 0.5, // Smooth scrubbing effect
          },
        }
      );

      // Image scale animation
      gsap.fromTo(
        imageRef.current,
        {
          scale: 1.2,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom-=50",
            end: "top center",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [direction]);

  const handleClick = () => {
    // Add exit animation before navigation
    gsap.to(cardRef.current, {
      scale: 0.95,
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        router.push(category.route);
      },
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group rounded-xl overflow-hidden w-full cursor-pointer"
      onClick={handleClick}
      style={{
        height: "min(600px, 90vh)", // Responsive height
        aspectRatio: "4/5", // Better aspect ratio for mobile
      }}
    >
      {/* Image container */}
      <div className="absolute inset-0">
        <Image
          ref={imageRef}
          src={category.image}
          alt={category.title}
          fill
          sizes="(max-width: 480px) 100vw, 
                 (max-width: 768px) 90vw,
                 (max-width: 1024px) 45vw,
                 40vw"
          priority={index < 2}
          className="object-cover object-center transform opacity-0
                     group-hover:scale-105 md:group-hover:scale-110 
                     transition-transform duration-1000 
                     ease-[cubic-bezier(0.08,0.82,0.17,1)]"
          style={{
            willChange: "transform",
            transformOrigin:
              direction === "left" ? "right center" : "left center",
          }}
          quality={90}
          placeholder="blur"
          blurDataURL={`data:image/jpeg;base64,${BLUR_HASH}`}
        />
      </div>

      {/* Enhanced gradient overlay - Optimized for mobile */}
      <div
        className={`absolute inset-0 
                    md:opacity-0 md:group-hover:opacity-100 
                    opacity-100
                    transition-all duration-700 ease-out
                    bg-gradient-to-t ${category.gradient}
                    backdrop-blur-[1px] md:backdrop-blur-sm`}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      {/* Content container - Always visible on mobile */}
      <div
        ref={contentRef}
        className="absolute inset-0 p-4 sm:p-6 md:p-8 lg:p-10 
                   flex flex-col justify-end
                   md:opacity-0 md:group-hover:opacity-100 opacity-100
                   transform md:translate-y-10 md:group-hover:translate-y-0 
                   transition-all duration-700 ease-[cubic-bezier(0.08,0.82,0.17,1)] z-10"
      >
        <div className="space-y-2 md:space-y-3">
          <h3
            className="text-xl sm:text-2xl md:text-3xl font-bold text-white 
                        drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
          >
            {category.title}
          </h3>
          <p
            className="text-white/95 text-sm sm:text-base md:text-lg 
                       leading-relaxed line-clamp-3 md:line-clamp-none
                       drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
          >
            {category.description}
          </p>
        </div>

        <motion.button
          onClick={(e) => {
            e.stopPropagation(); // Prevent double navigation
            handleClick();
          }}
          whileHover={{ scale: 1.05, x: 10 }}
          whileTap={{ scale: 0.95 }}
          className="mt-3 sm:mt-4 md:mt-6 self-start 
                     px-4 sm:px-5 md:px-6 
                     py-2 sm:py-2.5 md:py-3 
                     rounded-full text-sm sm:text-base
                     bg-white/10 backdrop-blur-md
                     border border-white/30 text-white
                     hover:bg-white/20 hover:border-white/50
                     transition-all duration-500 
                     flex items-center gap-2
                     relative overflow-hidden"
        >
          <span className="relative z-10 whitespace-nowrap">
            View {category.title.split(" ")[0]} Events
          </span>
          <span className="relative z-10 transform group-hover:translate-x-1 transition-transform duration-500">
            →
          </span>

          {/* Button hover effect */}
          <motion.div
            className="absolute inset-0 bg-white/10"
            initial={false}
            animate={{ x: "-100%" }}
            whileHover={{ x: "0%" }}
            transition={{ duration: 0.3 }}
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
      // Section background animation
      gsap.fromTo(
        ".events-bg",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "center center",
            toggleActions: "play none none reverse",
            scrub: 1,
          },
        }
      );

      // Grid stagger animation
      gsap.from(".event-grid", {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".event-grid",
          start: "top bottom-=100",
          end: "top center+=100",
          toggleActions: "play none none reverse",
          scrub: 0.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background elements with events-bg class */}
      <div className="events-bg absolute inset-0 bg-gradient-radial from-theme-dark/20 via-black to-black" />
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

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="section-title">
          <SectionTitle title="Events" />
        </div>

        <div
          className="event-grid grid grid-cols-1 md:grid-cols-2 
                        gap-4 sm:gap-6 md:gap-8 
                        mt-8 sm:mt-12 md:mt-16"
        >
          {eventCategories.map((category, index) => (
            <EventCard
              key={index}
              category={category}
              index={index}
              direction={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
