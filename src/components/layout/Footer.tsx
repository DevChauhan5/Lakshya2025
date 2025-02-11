"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { name: "About Us", href: "#about" },
      { name: "Events", href: "#events" },
      { name: "Timeline", href: "#timeline" },
      { name: "Gallery", href: "#gallery" },
    ],
  },
  {
    title: "Connect",
    links: [
      { name: "Instagram", href: "https://instagram.com" },
      { name: "Facebook", href: "https://facebook.com" },
      { name: "Twitter", href: "https://twitter.com" },
      { name: "LinkedIn", href: "https://linkedin.com" },
    ],
  },
  {
    title: "Contact",
    links: [
      {
        name: "lakshya@poornima.edu.in",
        href: "mailto:lakshya@poornima.edu.in",
      },
      { name: "+91 987654321", href: "tel:+91987654321" },
      { name: "Poornima University", href: "https://maps.google.com" },
      { name: "Jaipur, Rajasthan", href: "https://maps.google.com" },
    ],
  },
];

export const Footer = () => {
  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, 1]), {
    stiffness: 50,
    damping: 20,
  });

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-black">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src="/videos/space.webm" type="video/mp4" />
        </video>
      </div>

      {/* Content Container */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 container mx-auto px-4 py-16 md:py-24"
      >
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: sectionIndex * 0.2,
                ease: [0.23, 1, 0.32, 1],
              }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold bg-gradient-to-r from-theme-primary to-theme-accent bg-clip-text text-transparent">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: (sectionIndex * 4 + index) * 0.1,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors duration-300 text-sm md:text-base
                               flex items-center group"
                    >
                      <motion.span
                        className="inline-block"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-white/10 text-center"
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
            className="text-sm font-medium bg-gradient-to-r from-theme-primary via-theme-accent to-theme-secondary 
                       bg-[length:200%_auto] bg-clip-text text-transparent"
          >
            © {new Date().getFullYear()} Lakshya, Poornima University
          </motion.div>
          <p className="text-xs text-white/50 mt-2">
            Made with ❤️ by Development Team
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};
