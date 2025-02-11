"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FiGithub, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";
import {
  IoLocationOutline,
  IoMailOutline,
  IoHomeOutline,
} from "react-icons/io5";

const socialLinks = [
  {
    name: "Instagram",
    icon: <FiInstagram size={20} />,
    href: "https://instagram.com",
  },
  {
    name: "Twitter",
    icon: <FiTwitter size={20} />,
    href: "https://twitter.com",
  },
  {
    name: "LinkedIn",
    icon: <FiLinkedin size={20} />,
    href: "https://linkedin.com",
  },
  { name: "GitHub", icon: <FiGithub size={20} />, href: "https://github.com" },
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
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="/videos/space3.mp4" type="video/mp4" />
        </video>

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
        {/* Logo and Mission */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-20 h-20 mx-auto mb-6"
          >
            <Image
              src="/t-logo.png"
              alt="Lakshya Logo"
              fill
              className="object-contain"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-white/60 text-sm"
          >
            Join us in this grand celebration of talent, culture, and innovation
            at Lakshya 2025
          </motion.p>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
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
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
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

          {/* Connect Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="col-span-1 lg:col-span-2"
          >
            <h3 className="text-lg font-semibold text-white mb-6">
              Connect With Us
            </h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  transition={{
                    delay: 0.4 + index * 0.1,
                    duration: 0.2,
                  }}
                  className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center
                           hover:bg-theme-primary/20 hover:text-theme-primary
                           transition-all duration-300 text-white/60"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="border-t border-white/10 pt-8 mt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
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
              © {new Date().getFullYear()} Lakshya, Poornima University
            </motion.div>
            <motion.p
              className="text-white/40 text-xs"
              whileHover={{ color: "rgba(255, 255, 255, 0.8)" }}
            >
              Crafted with ❤️ by Development Team
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};
