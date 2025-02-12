"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { FiInstagram, FiYoutube } from "react-icons/fi";
import {
  IoHomeOutline,
  IoLocationOutline,
  IoMailOutline,
} from "react-icons/io5";
import { FlickeringGrid } from "../effects/FlickeringGrid";

const socialLinks = [
  {
    name: "Instagram",
    icon: <FiInstagram size={24} />,
    href: "https://www.instagram.com/pulakshya/",
  },
  {
    name: "Youtube",
    icon: <FiYoutube size={24} />,
    href: "https://www.youtube.com/@PoornimaUniversityTV",
  },
];

const contactInfo = [
  {
    icon: <IoMailOutline size={20} />,
    text: "lakshya@poornima.edu.in",
    href: "mailto:lakshya@poornima.edu.in",
  },
  {
    icon: <IoHomeOutline size={20} />,
    text: "+91 987654321",
    href: "tel:+91987654321",
  },
  {
    icon: <IoLocationOutline size={20} />,
    text: "Poornima University, Jaipur",
    href: "https://maps.google.com",
  },
];

const quickLinks = [
  "About",
  "Events",
  "Timeline",
  "Gallery",
  "Team",
  "Contact",
].map((link) => ({ name: link, href: `#${link.toLowerCase()}` }));

export const Footer = () => {
  const footerRef = useRef(null);
  const router = useRouter();
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
      {/* Dynamic Background with FlickeringGrid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent z-10" />
        <FlickeringGrid
          className="absolute inset-0"
          squareSize={4}
          gridGap={6}
          color="#ffce6b"
          maxOpacity={0.3}
          flickerChance={0.1}
          height={1200}
          width={1920}
        />

        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-theme-primary/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-theme-secondary/20 rounded-full blur-[100px]"
        />
      </div>

      {/* Main Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 container mx-auto px-4 pt-20 pb-12"
      >
        {/* Enhanced Logo and Mission */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
            className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-8" // Increased size
          >
            {/* Black circle background with glow */}
            <div
              className="absolute inset-0 rounded-full bg-black 
                          shadow-[0_0_40px_rgba(244, 137, 82, 1)] 
                          before:absolute before:inset-0 
                          before:rounded-full before:blur-xl 
                          before:bg-theme-accent/20
                          after:absolute after:inset-0 
                          after:rounded-full after:bg-black" // Added solid black background
            />
            <Image
              src="/logo.webp"
              alt="Lakshya Logo"
              width={192} // Increased from 160
              height={192} // Increased from 160
              className="object-contain relative z-10 p-4
                       transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-2xl mx-auto text-white/60 text-base sm:text-lg
                     leading-relaxed tracking-wide"
          >
            Join us in this grand celebration of talent, culture, and innovation
            at Lakshya 2025
          </motion.p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3
              className="text-xl font-semibold text-white mb-6 
                         relative after:absolute after:bottom-0 after:left-0 
                         after:w-12 after:h-0.5 after:bg-theme-primary"
            >
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-theme-primary transition-colors duration-300 text-sm
                             flex items-center space-x-2 group"
                  >
                    <motion.span
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

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-4"
          >
            <h3
              className="text-xl font-semibold text-white mb-6
                         relative after:absolute after:bottom-0 after:left-0 
                         after:w-12 after:h-0.5 after:bg-theme-primary"
            >
              Contact Us
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.li
                  key={info.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center space-x-3 text-white/60 group"
                >
                  <span className="text-theme-primary">{info.icon}</span>
                  <Link
                    href={info.href}
                    className="text-sm hover:text-theme-primary transition-colors duration-300"
                  >
                    {info.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Section - Simplified */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-6"
          >
            <h3
              className="text-xl font-semibold text-white mb-6
                         relative after:absolute after:bottom-0 after:left-0 
                         after:w-12 after:h-0.5 after:bg-theme-primary"
            >
              Follow Us
            </h3>
            <div className="flex justify-center sm:justify-start">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(255, 206, 107, 0.2)",
                  }}
                  transition={{
                    duration: 0.2,
                    type: "spring",
                    stiffness: 300,
                  }}
                  className="w-14 h-14 rounded-full bg-white/5 
                           flex items-center justify-center
                           text-theme-primary transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Enhanced Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="border-t border-white/10 pt-8 mt-8"
        >
          <div
            className="flex flex-col sm:flex-row justify-between 
                        items-center gap-4 text-center sm:text-left"
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
              className="text-sm bg-gradient-to-r from-theme-primary via-theme-accent to-theme-secondary 
                       bg-[length:200%_auto] bg-clip-text text-transparent"
            >
              © Copyright {new Date().getFullYear()} Poornima University
            </motion.div>
            <motion.p
              className="text-sm cursor-pointer"
              style={{ color: "rgba(255, 255, 255, 0.8)" }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                router.push("https://www.linkedin.com/in/dev-chauhan-in")
              }
            >
              Crafted with ❤️ by{" "}
              <span
                className="bg-gradient-to-r from-theme-primary via-theme-accent to-theme-secondary 
                       bg-[length:200%_auto] bg-clip-text text-transparent font-semibold  "
              >
                DEV CHAUHAN
              </span>
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};
