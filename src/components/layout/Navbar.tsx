import { useState } from "react";
import { motion } from "framer-motion";
import { IoRocketOutline } from "react-icons/io5";
import { HiMenu } from "react-icons/hi";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navItems = ["About", "Mission", "Timeline", "Contact"];

  // Add scroll listener
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 20);
    });
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-cosmic-dark/80 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <motion.a
            href="/"
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
          >
            <IoRocketOutline className="text-2xl text-white" />
            <span className="font-orbitron text-xl text-white">LAKSHYA</span>
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative font-quicksand text-sm text-white/80 hover:text-white transition-colors duration-200 px-1 py-2"
              >
                <span className="relative z-10">{item}</span>
                <span className="absolute inset-0 bg-white/10 rounded opacity-0 hover:opacity-100 transition-opacity duration-200" />
              </a>
            ))}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2 rounded border border-white/20 bg-white/5 backdrop-blur-sm font-quicksand text-white text-sm hover:bg-white/10 transition-colors duration-200"
            >
              Connect
            </motion.button>
          </div>

          <button className="md:hidden text-white">
            <HiMenu className="text-2xl" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
