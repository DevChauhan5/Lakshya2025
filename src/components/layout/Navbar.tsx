"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PiPlanetDuotone, PiPlanetFill } from "react-icons/pi";

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
  const pathname = usePathname();
  const router = useRouter();

  const { scrollY } = useScroll();

  // Add the missing scale spring animation
  const scale = useSpring(useTransform(scrollY, [0, 100], [1, 0.95]), {
    stiffness: 200,
    damping: 25,
  });

  // Create smoother animations using springs
  const bgOpacity = useSpring(useTransform(scrollY, [0, 200], [0, 0.8]), {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  const blurAmount = useSpring(useTransform(scrollY, [0, 200], [0, 8]), {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  // Derived styles using motion values
  const navStyle = {
    backgroundColor: useTransform(
      bgOpacity,
      (opacity) => `rgba(0, 0, 0, ${opacity})`
    ),
    backdropFilter: useTransform(blurAmount, (blur) => `blur(${blur}px)`),
  };

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
      const navHeight = navRef.current?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
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
          } else {
            // Clear active section if we're at the top of the page
            if (window.scrollY < 100) {
              setActiveSection("");
            }
            // If scrolling down and section is leaving viewport, check if any other section is in view
            else if (
              !entry.isIntersecting &&
              entry.boundingClientRect.top < 0
            ) {
              const visibleSections = document.querySelectorAll(
                navLinks.map((link) => link.href.slice(1)).join(",")
              );
              for (const section of visibleSections) {
                const rect = section.getBoundingClientRect();
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                  setActiveSection(section.id);
                  break;
                }
              }
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    // Observe all sections
    navLinks.forEach(({ href }) => {
      const element = document.querySelector(href);
      if (element) observer.observe(element);
    });

    // Additional scroll handler for top of page
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Add new useEffect for handling body scroll
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Prevent background scrolling
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      // Re-enable scrolling
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        style={navStyle}
        className="fixed top-0 left-0 right-0 z-[100] will-change-transform"
      >
        <motion.div
          style={{ scale }}
          className="container mx-auto h-20 flex items-center justify-between
                   max-w-[95vw] md:max-w-[90vw] lg:max-w-[1200px] relative"
        >
          {/* Updated Logo with proper aspect ratio */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="relative w-12 h-12 md:w-14 md:h-14 cursor-pointer 
                     bg-white rounded-full overflow-hidden"
            onClick={handleLogoClick}
          >
            <Image
              src="/logo.webp"
              alt="Lakshya Logo"
              width={56}
              height={56}
              className="object-contain w-full h-full"
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHyAiJRwlKycuRDEwMTAxMUQzNjk7PjU1R0dKTU1NW3JbYFllZIGChXFwf7n/2wBDARUXFx4aHh4pISk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTn/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              quality={90}
            />
          </motion.div>

          <div className="hidden md:flex items-center gap-10">
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
                  className={`relative z-10 text-base font-medium transition-all duration-500 ease-out
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

          {/* Enhanced Mobile Menu Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={toggleMobileMenu}
            className="md:hidden relative w-12 h-12 flex items-center justify-center 
                     bg-white/5 backdrop-blur-md rounded-full"
          >
            <motion.div
              animate={{
                rotate: isMobileMenuOpen ? 180 : 0,
                scale: isMobileMenuOpen ? 0.9 : 1,
              }}
              transition={{
                duration: 0.4,
                ease: [0.23, 1, 0.32, 1],
                scale: { type: "spring", stiffness: 200 },
              }}
              className="text-theme-primary"
            >
              {isMobileMenuOpen ? (
                <PiPlanetFill size={28} />
              ) : (
                <PiPlanetDuotone size={28} />
              )}
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.nav>

      {/* Enhanced Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
        }}
        className="fixed inset-0 z-[90] md:hidden overflow-hidden touch-none"
      >
        {/* Enhanced Backdrop */}
        <motion.div
          initial={{ opacity: 0, backdrop: "blur(0px)" }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            backdropFilter: `blur(${isMobileMenuOpen ? 16 : 0}px)`,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/80 touch-none"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Enhanced Mobile Menu Panel */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{
            x: isMobileMenuOpen ? "0%" : "100%",
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200,
            mass: 0.8,
          }}
          className="absolute right-0 top-0 bottom-0 w-full max-w-sm 
                   bg-black/50 backdrop-blur-2xl
                   flex flex-col items-center p-6
                   overflow-y-auto touch-pan-y"
        >
          {/* Mobile Menu Items */}
          <div className="flex-1 flex flex-col items-center justify-center gap-3 w-full">
            {navLinks.map(({ name, href }, index) => (
              <motion.button
                key={name}
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : 50,
                }}
                transition={{
                  delay: isMobileMenuOpen ? index * 0.075 : 0,
                  duration: 0.3,
                  ease: [0.23, 1, 0.32, 1],
                }}
                onClick={() => handleMobileNavClick(href)}
                className={`w-full px-6 py-3.5 rounded-xl text-lg font-medium
                         bg-white/5 backdrop-blur-sm border border-white/10
                         transition-all duration-300
                         ${
                           activeSection === href.slice(1)
                             ? "text-theme-primary border-theme-primary/30"
                             : "text-white/70 hover:text-white hover:border-white/30"
                         }`}
              >
                {name}
              </motion.button>
            ))}
          </div>

          {/* Enhanced Mobile Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : 20,
            }}
            transition={{
              delay: isMobileMenuOpen ? 0.3 : 0,
              duration: 0.4,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="mt-8 text-center"
          >
            <motion.div
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="text-xs font-medium text-white/60"
            >
              © {new Date().getFullYear()}{" "}
              <span className="text-theme-primary">Poornima University</span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.4 }}
              className="text-[10px] text-white/50 mt-0.5" // Smaller text and spacing
            >
              All Rights Reserved
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};
