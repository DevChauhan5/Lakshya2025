"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
  const pathname = usePathname();
  const router = useRouter();

  // Enhanced smooth animations with springs
  const bgOpacity = useSpring(useTransform(scrollY, [0, 100], [0, 0.9]), {
    stiffness: 100,
    damping: 20,
  });

  const scale = useSpring(useTransform(scrollY, [0, 100], [1, 0.95]), {
    stiffness: 200,
    damping: 25,
  });

  // Smooth scroll utility function
  const smoothScrollTo = (y: number) => {
    const documentHeight = document.documentElement.scrollHeight;
    const start = window.pageYOffset;
    const time = Math.abs(y - start) < 1000 ? 0.5 : 1; // Faster for short distances

    const startTime = performance.now();

    function scrollStep(currentTime: number) {
      const elapsed = (currentTime - startTime) / (time * 1000);
      const progress = Math.min(elapsed, 1);

      // Enhanced easing function for smoother motion
      const ease = (t: number) => 1 - Math.pow(1 - t, 4);

      window.scrollTo(0, start + (y - start) * ease(progress));

      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    }

    requestAnimationFrame(scrollStep);
  };

  const handleLogoClick = () => {
    if (pathname === "/") {
      smoothScrollTo(0);
    } else {
      router.push("/");
    }
  };

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 80;
      smoothScrollTo(offsetPosition);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.2, // Reduced threshold for earlier detection
        rootMargin: "-10% 0px -10% 0px", // Added margin to improve detection area
      }
    );

    navLinks.forEach(({ href }) => {
      const element = document.querySelector(href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      style={{ backgroundColor: `rgba(0, 0, 0, ${bgOpacity.get()})` }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
    >
      <motion.div
        style={{ scale }}
        className="container mx-auto px-4 h-20 flex items-center justify-between
                   max-w-[95vw] md:max-w-[90vw] lg:max-w-[1200px]"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="relative w-12 h-12 cursor-pointer"
          onClick={handleLogoClick}
        >
          <Image
            src="/t-logo.png"
            alt="Lakshya Logo"
            fill
            className="object-contain"
          />
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ name, href }) => (
            <motion.button
              key={name}
              onClick={() => handleNavClick(href)}
              className="relative group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.span
                className={`relative z-10 text-sm transition-all duration-500 ease-out
                           ${
                             activeSection === href.slice(1)
                               ? "bg-gradient-to-r from-theme-primary via-theme-accent to-theme-secondary bg-clip-text text-transparent"
                               : "text-white/70 group-hover:text-white"
                           }`}
              >
                {name}
              </motion.span>

              {activeSection === href.slice(1) && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute -bottom-1 left-0 right-0 h-0.5
                           bg-gradient-to-r from-theme-primary via-theme-accent to-theme-secondary"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}

              <motion.div
                className={`absolute -bottom-1 left-0 right-0 h-0.5
                         bg-gradient-to-r from-theme-primary to-theme-secondary
                         origin-left ${
                           activeSection === href.slice(1)
                             ? "opacity-0"
                             : "opacity-100"
                         }`}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
