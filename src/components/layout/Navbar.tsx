"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Schedule", href: "/schedule" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 right-0 top-0 z-40 bg-black/80 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <Link href="/">
          <Image
            src="/logo.webp"
            alt="Lakshya Logo"
            width={50}
            height={50}
            className="h-auto w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden space-x-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white transition-colors hover:text-gray-300"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="z-50 md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <div className="space-y-2">
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-8 bg-white"
            ></motion.span>
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-8 bg-white"
            ></motion.span>
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-8 bg-white"
            ></motion.span>
          </div>
        </button>

        {/* Mobile Menu */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: isOpen ? "0%" : "100%" }}
          transition={{ type: "tween" }}
          className="fixed inset-y-0 right-0 flex w-full flex-col items-center justify-center bg-black p-8 md:hidden"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="py-4 text-2xl text-white"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  );
};
