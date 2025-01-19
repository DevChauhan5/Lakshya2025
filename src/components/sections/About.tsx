import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SiRocket } from "react-icons/si";
import { FaRegLightbulb } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const features = [
    {
      icon: <SiRocket className="text-3xl" />,
      title: "Tech Innovation",
      description:
        "Pioneering the future with cutting-edge technology showcase",
    },
    {
      icon: <FaRegLightbulb className="text-3xl" />,
      title: "Creative Excellence",
      description: "Platform for brilliant minds to showcase innovative ideas",
    },
    {
      icon: <IoSparkles className="text-3xl" />,
      title: "Cultural Nexus",
      description: "Where technology meets art in spectacular harmony",
    },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      <motion.div
        style={{ y, opacity }}
        className="relative container mx-auto px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="font-quicksand text-cosmic-accent text-sm uppercase tracking-[0.2em] mb-4 block">
              About The Event
            </span>
            <h2 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-cosmic-accent/80">
              LAKSHYA 2025
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cosmic-accent to-transparent mx-auto" />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Logo and Visual Elements */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Modern Logo Container */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cosmic-accent/10 to-transparent rounded-2xl backdrop-blur-sm border border-cosmic-accent/20" />
                <motion.div
                  className="relative p-8"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src="/logo.svg"
                    alt="Lakshya Logo"
                    className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                  />
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -inset-4 border border-cosmic-accent/20 rounded-2xl"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 bg-cosmic-accent/5 rounded-2xl blur-xl"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Right Column - Enhanced Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              {/* Main Description with enhanced typography */}
              <div className="space-y-6">
                <motion.p
                  className="font-quicksand text-xl md:text-2xl text-white/90 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="text-cosmic-accent">Lakshya'25</span> is
                  Poornima Universiy's prestigious flagship technical festival
                  that brings together the brightest minds and innovative
                  spirits.
                </motion.p>
                <motion.p
                  className="font-quicksand text-lg text-cosmic-muted leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  This year's theme{" "}
                  <span className="text-cosmic-accent font-medium">
                    "Euphoria: Orbit of Wonder"
                  </span>{" "}
                  promises an unparalleled fusion of technology, creativity, and
                  entertainment.
                </motion.p>
              </div>

              {/* Enhanced Features Grid */}
              <div className="grid sm:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="group relative p-6 rounded-xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-cosmic-accent/50 transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="absolute inset-0 bg-cosmic-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    <div className="relative space-y-4">
                      <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-cosmic-accent/10 text-cosmic-accent group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </span>
                      <h3 className="font-orbitron text-white text-lg font-semibold">
                        {feature.title}
                      </h3>
                      <p className="font-quicksand text-cosmic-muted/90 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
