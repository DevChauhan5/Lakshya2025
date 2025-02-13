"use client";

// Add starwars font import
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { FiInstagram, FiYoutube } from "react-icons/fi";
import { FlickeringGrid } from "../effects/FlickeringGrid";

const starwar = localFont({
  src: "../../app/fonts/star.woff",
  variable: "--font-starwars",
});

// Updated social links with additional info
const socialLinks = [
  {
    name: "Instagram",
    icon: <FiInstagram size={24} />,
    href: "https://www.instagram.com/pulakshya/",
    description: "Follow us for event updates",
  },
  {
    name: "Youtube",
    icon: <FiYoutube size={24} />,
    href: "https://www.youtube.com/@PoornimaUniversityTV",
    description: "Watch our past events",
  },
];

// Update resources naming
const quickLinks = {
  Events: [
    { name: "Cultural", route: "/cultural" },
    { name: "EduFun", route: "/edufun" },
    { name: "Sports", route: "/sports" },
    { name: "E-Sports", route: "/e-sports" },
  ],
  Information: [
    { name: "About", section: "about" },
    { name: "Timeline", section: "timeline" },
    { name: "Gallery", section: "gallery" },
    { name: "Team", section: "team" },
  ],
  Resources: [
    {
      name: "📚 Rule Books",
      route:
        "https://drive.google.com/drive/folders/1NpYOjIkTDva_QlPEgzHNoxZlAajdlQF3?usp=sharing",
    },
    { name: "📅 Event Schedule", section: "timeline" },
    {
      name: "📍 Event Venue",
      route: "https://maps.app.goo.gl/9vieVUD3B8w5WBY1A",
    },
  ],
};

// Contact info simplified
const contactInfo = [
  {
    name: "Ms. Jagrati Kumawat",
    role: "Co-Chair",
    phone: "+91 9509404898",
  },
  {
    name: "Mr. Ashutosh Kumar Yadav",
    role: "Co-Chair",
    phone: "+91 8423447391",
  },
  {
    name: "Mr. Kanishk Gupta",
    role: "Co-Chair",
    phone: "+91 9256356496",
  },
];

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

  // Smooth scroll utility function
  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 80;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Handle link clicks
  const handleLinkClick = (item: {
    name: string;
    route?: string;
    section?: string;
  }) => {
    if (item.route) {
      router.push(item.route);
    } else if (item.section) {
      smoothScrollTo(item.section);
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-black pt-20 pb-8"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent z-10" />
        <FlickeringGrid
          className="absolute inset-0"
          squareSize={4}
          gridGap={6}
          color="#ffce6b"
          maxOpacity={0.15}
          flickerChance={0.05}
          height={1200}
          width={1920}
        />
      </div>

      {/* Main Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 container mx-auto px-4"
      >
        {/* Updated Logo Section with StarWars font */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-6"
          >
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full bg-white shadow-lg" />
              <Image
                src="/logo.webp"
                alt="Lakshya Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-left">
              <h2
                className={`${starwar.className} text-[28px] leading-tight
                            bg-gradient-to-br from-yellow-400 via-red-500 to-purple-700 
                            bg-clip-text text-transparent mix-blend-screen`}
              >
                LAKSHYA&apos;25
              </h2>
              <p className="text-white/60 text-sm mt-1">
                Euphoria: Orbit of Wonder
              </p>
            </div>
          </motion.div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255,206,107,0.2)",
                }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-4 rounded-lg bg-white/5 backdrop-blur-sm
                         hover:bg-white/10 transition-all duration-300"
              >
                <span className="text-theme-primary group-hover:text-theme-accent">
                  {social.icon}
                </span>
                <span
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap
                             text-xs text-white/60 opacity-0 group-hover:opacity-100
                             transition-all duration-300"
                >
                  {social.description}
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Quick Links Sections */}
          {Object.entries(quickLinks).map(([section, items], sectionIndex) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="space-y-4"
            >
              <h3
                className="text-white font-medium relative pl-3
                           before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2
                           before:w-1 before:h-3 before:bg-theme-primary before:rounded-full"
              >
                {section}
              </h3>
              <ul className="space-y-2">
                {items.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: sectionIndex * 0.1 + index * 0.05 }}
                  >
                    <motion.button
                      onClick={() => handleLinkClick(item)}
                      whileHover={{ x: 5 }}
                      className="text-white/60 hover:text-theme-primary text-sm
                               transition-colors duration-300 block text-left w-full"
                    >
                      {item.name}
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Updated Contact Section with faster animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4 lg:col-span-1"
          >
            <h3
              className="text-white font-medium relative pl-3
                         before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2
                         before:w-1 before:h-3 before:bg-theme-primary before:rounded-full"
            >
              Contact Coordinators
            </h3>
            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={contact.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="group"
                >
                  <Link
                    href={`tel:${contact.phone}`}
                    className="block p-3 rounded-lg bg-white/5 hover:bg-white/10
                           backdrop-blur-sm transition-all duration-300
                           hover:shadow-lg hover:shadow-theme-primary/5"
                  >
                    <p className="text-sm font-medium text-white">
                      {contact.name}
                    </p>
                    <p className="text-xs text-white/60">{contact.role}</p>
                    <p className="text-xs text-theme-primary mt-1">
                      {contact.phone}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Updated Footer Bar with Enhanced Credits */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()}{" "}
            <span className="text-theme-primary">Poornima University</span>
          </p>

          {/* Enhanced credit section */}
          <motion.div
            className="text-sm cursor-pointer flex items-center gap-2"
            onClick={() =>
              router.push("https://www.linkedin.com/in/dev-chauhan-in")
            }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-white/80">Crafted by</span>
            <motion.span
              className="relative font-semibold"
              animate={{
                backgroundPosition: ["200% center", "-200% center"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background:
                  "linear-gradient(to right, #f48952, #ffce6b, #f48952, #ffce6b)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              DEV CHAUHAN
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  );
};
