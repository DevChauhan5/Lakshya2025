import { useState } from "react";
import { motion } from "framer-motion";
import { IoRocketOutline } from "react-icons/io5";
import { HiMenu } from "react-icons/hi";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const navItems = ["About", "Mission", "Timeline", "Contact"];

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 20);
    });
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-cosmic-dark/90 backdrop-blur-xl border-white/5"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="h-20 flex items-center justify-between">
          {/* Logo Section - Fixed width */}
          <motion.a
            href="/"
            className="w-[140px] flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <IoRocketOutline className="text-2xl text-white group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-orbitron text-lg text-white tracking-wide">
              LAKSHYA
            </span>
          </motion.a>

          {/* Navigation Items - Each with fixed width */}
          <div className="hidden md:flex items-center">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="w-[120px] text-center relative group"
                onHoverStart={() => setActiveItem(item)}
                onHoverEnd={() => setActiveItem(null)}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="font-quicksand text-sm text-white/90 hover:text-white transition-colors duration-300">
                  {item}
                </span>

                {/* Animated underline */}
                <motion.div
                  className="absolute -bottom-1 left-1/2 h-[2px] bg-white"
                  initial={{ width: 0, x: 20, opacity: 0 }}
                  animate={{
                    width: activeItem === item ? "60%" : 0,
                    x: activeItem === item ? -30 : 20,
                    opacity: activeItem === item ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Hover background */}
                <motion.div
                  className="absolute inset-0 rounded-md bg-white/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeItem === item ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden w-[40px] h-[40px] flex items-center justify-center rounded-md border border-white/10 bg-white/5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <HiMenu className="text-xl text-white" />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
