import { motion } from "framer-motion";
import { FaDiscord, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { icon: <FaInstagram />, href: "#" },
    { icon: <FaTwitter />, href: "#" },
    { icon: <FaLinkedin />, href: "#" },
    { icon: <FaDiscord />, href: "#" },
  ];

  const footerSections = [
    {
      title: "CONTACT",
      items: [
        "+91 987 654 3210",
        "lakshya25@poornima.edu.in",
        "Poornima University, Jaipur",
      ],
    },
    {
      title: "QUICK LINKS",
      items: ["About", "Events", "Schedule", "Register"],
    },
    {
      title: "FOLLOW US",
      items: ["Instagram", "Twitter", "LinkedIn", "Discord"],
    },
    {
      title: "RESOURCES",
      items: ["FAQs", "Guidelines", "Terms", "Privacy"],
    },
  ];

  return (
    <footer className="relative bg-cosmic-dark overflow-hidden">
      {/* Cosmic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cosmic-dark/50 to-cosmic-dark pointer-events-none" />

      {/* Star field effect */}
      <div className="absolute inset-0 bg-star-pattern bg-repeat opacity-10" />

      <div className="relative container mx-auto px-4 pt-16 pb-8">
        {/* Main title with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-6xl md:text-8xl lg:text-9xl bg-clip-text text-transparent bg-gradient-to-b from-white via-cosmic-accent to-cosmic-accent/50">
            LAKSHYA'25
          </h2>
          <motion.div
            className="h-[2px] w-[200px] mx-auto mt-6 bg-gradient-to-r from-transparent via-cosmic-accent to-transparent"
            initial={{ width: 0 }}
            whileInView={{ width: 200 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Footer sections grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center md:text-left"
            >
              <h3 className="font-orbitron text-xl text-cosmic-accent mb-4 tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="text-cosmic-muted hover:text-cosmic-accent transition-colors font-syne"
                  >
                    <a href="#" className="hover:underline underline-offset-4">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-6 mb-8">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              className="text-cosmic-muted hover:text-cosmic-accent text-2xl transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-cosmic-muted text-sm font-syne border-t border-cosmic-light/20 pt-8"
        >
          <p className="space-x-2">
            <span>&copy; {new Date().getFullYear()} POORNIMA UNIVERSITY</span>
            <span className="hidden sm:inline">|</span>
            <span>ALL RIGHTS RESERVED</span>
          </p>
          <p className="mt-2">
            <span>Developed with ❤️ by </span>
            <a
              href="https://www.linkedin.com/in/dev-chauhan-in"
              className="text-cosmic-accent hover:underline"
            >
              Dev Chauhan
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
