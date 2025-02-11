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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileNavClick = (href: string) => {
    handleNavClick(href);
    setIsMobileMenuOpen(false);
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
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        style={{ backgroundColor: `rgba(0, 0, 0, ${bgOpacity.get()})` }}
        className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-md"
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
            onClick={toggleMobileMenu}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
          >
            <motion.div
              animate={isMobileMenuOpen ? { rotate: 45 } : { rotate: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-full h-full text-theme-primary"
                strokeWidth="1.5"
              >
                <motion.path
                  d="M12 2L8 6H4L2 8V16L4 18H8L12 22L16 18H20L22 16V8L20 6H16L12 2Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={false}
                  animate={
                    isMobileMenuOpen
                      ? {
                          pathLength: [1, 0.5, 1],
                          rotate: 180,
                        }
                      : {
                          pathLength: 1,
                          rotate: 0,
                        }
                  }
                  transition={{ duration: 0.3 }}
                />
              </svg>
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.nav>

      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
        }}
        className="fixed inset-0 z-[90] md:hidden"
      >
        <motion.div
          initial={false}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            backdropFilter: isMobileMenuOpen ? "blur(10px)" : "blur(0px)",
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/80"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <motion.div
          initial={{ x: "100%" }}
          animate={{
            x: isMobileMenuOpen ? "0%" : "100%",
          }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-black/50 backdrop-blur-xl
                     flex flex-col items-center justify-center gap-8 p-8"
        >
          {navLinks.map(({ name, href }, index) => (
            <motion.button
              key={name}
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                x: isMobileMenuOpen ? 0 : 50,
              }}
              transition={{
                delay: isMobileMenuOpen ? index * 0.1 : 0,
                duration: 0.3,
              }}
              onClick={() => handleMobileNavClick(href)}
              className={`text-2xl font-medium w-full text-center py-4 rounded-xl
                         transition-colors duration-200 relative overflow-hidden
                         ${
                           activeSection === href.slice(1)
                             ? "text-theme-primary"
                             : "text-white/70"
                         }`}
            >
              <motion.div
                className="absolute inset-0 bg-white/5 rounded-xl"
                initial={false}
                whileHover={{ opacity: [0, 1] }}
                transition={{ duration: 0.2 }}
              />
              <span className="relative z-10">{name}</span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};
