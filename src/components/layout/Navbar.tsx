"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Register ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const navLinks = [
  { name: "Timeline", href: "#timeline" },
  { name: "Events", href: "#events" },
  { name: "Sponsors", href: "#sponsors" },
  { name: "Gallery", href: "#gallery" },
  { name: "Our Team", href: "#team" },
];

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // Transform navbar background opacity based on scroll
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);
  const scale = useTransform(scrollY, [0, 100], [1, 0.95]);

  useEffect(() => {
    // Initial entrance animation
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.5,
    });

    // Intersection Observer for active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    navLinks.forEach(({ href }) => {
      const element = document.querySelector(href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      // Fixed smooth scroll implementation
      const offsetY = 80; // Navbar height offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offsetY;

      gsap.to(window, {
        duration: 1,
        scrollTo: offsetPosition,
        ease: "power3.inOut",
      });
    }
  };

  return (
    <motion.nav
      ref={navRef}
      style={{ backgroundColor: `rgba(0, 0, 0, ${bgOpacity.get()})` }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
    >
      <motion.div
        style={{ scale }}
        className="container mx-auto px-4 h-20 flex items-center justify-between
                   max-w-[95vw] md:max-w-[90vw] lg:max-w-[1200px]"
      >
        {/* Logo with updated scroll behavior */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-12 h-12 cursor-pointer"
          onClick={() => {
            gsap.to(window, {
              duration: 1,
              scrollTo: 0,
              ease: "power3.inOut",
            });
          }}
        >
          <Image
            src="/t-logo.png"
            alt="Lakshya Logo"
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ name, href }) => (
            <motion.button
              key={name}
              onClick={() => handleClick(href)}
              className="relative text-white/70 hover:text-white
                        transition-colors duration-300 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">{name}</span>

              {/* Active indicator */}
              {activeSection === href.slice(1) && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute -bottom-1 left-0 right-0 h-0.5
                           bg-gradient-to-r from-theme-primary/50 to-theme-secondary/50"
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Hover indicator */}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5
                         bg-gradient-to-r from-theme-primary to-theme-secondary
                         origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-white p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </motion.button>
      </motion.div>
    </motion.nav>
  );
};
