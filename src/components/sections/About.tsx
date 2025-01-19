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
      icon: <SiRocket className="text-2xl" />,
      title: "Innovation Hub",
      description: "Where groundbreaking ideas take flight",
    },
    {
      icon: <FaRegLightbulb className="text-2xl" />,
      title: "Creative Platform",
      description: "Showcase your talents and skills",
    },
    {
      icon: <IoSparkles className="text-2xl" />,
      title: "Cultural Fusion",
      description: "Blend of technology and artistry",
    },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen py-20 overflow-hidden"
    >
      <motion.div
        style={{ y, opacity }}
        className="relative container mx-auto px-4 sm:px-6"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="inline-block font-orbitron text-3xl md:text-4xl font-bold text-white mb-4 relative">
              About Lakshya
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-cosmic-accent/50"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />
            </h2>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Logo and Visual Elements */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Logo Container with Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cosmic-accent/20 to-cosmic-accent/10"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-4 rounded-full border-2 border-cosmic-accent/30 backdrop-blur-sm"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {/* Add your logo image here */}
                  <img
                    src="/logo.svg" // Add your logo path
                    alt="Lakshya Logo"
                    className="w-full h-full object-contain p-8"
                  />
                </motion.div>

                {/* Decorative Orbits */}
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="absolute inset-0 rounded-full border border-cosmic-accent/20"
                    style={{ scale: 1 + index * 0.1 }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 10 + index * 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Main Description */}
              <div className="space-y-6">
                <p className="font-quicksand text-lg text-cosmic-muted leading-relaxed">
                  Lakshya'25 is not just an event; it's a cosmic celebration of
                  innovation, creativity, and technological excellence. As VIT's
                  flagship technical festival, we bring together brilliant minds
                  from across the nation.
                </p>
                <p className="font-quicksand text-lg text-cosmic-muted leading-relaxed">
                  This year's theme, "Euphoria: Orbit of Wonder," promises an
                  unforgettable journey through cutting-edge technology,
                  spectacular performances, and mind-bending competitions.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-3 gap-6 mt-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="group relative p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cosmic-accent/50 transition-colors duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-cosmic-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    <div className="relative space-y-4">
                      <span className="inline-block p-3 rounded-lg bg-cosmic-accent/20 text-cosmic-accent">
                        {feature.icon}
                      </span>
                      <h3 className="font-orbitron text-white text-lg">
                        {feature.title}
                      </h3>
                      <p className="font-quicksand text-cosmic-muted text-sm">
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
