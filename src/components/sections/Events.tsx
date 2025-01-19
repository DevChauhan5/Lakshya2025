import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IoArrowForward } from "react-icons/io5";

const eventCategories = [
  {
    id: "cultural",
    title: "Cultural Events",
    description: "Dance, Music, Drama & More",
    image: "/events/event.jpg",
    count: 12,
  },
  {
    id: "esports",
    title: "E-Sports",
    description: "BGMI, FIFA, Valorant & More",
    image: "/events/event.jpg",
    count: 8,
  },
  {
    id: "fun",
    title: "Fun & Knowledge",
    description: "Quiz, Treasure Hunt & More",
    image: "/events/event.jpg",
    count: 15,
  },
  {
    id: "sports",
    title: "Sports & Gymnasium",
    description: "Cricket, Basketball & More",
    image: "/events/event.jpg",
    count: 10,
  },
];

const Events = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={containerRef} className="relative py-20 mb-32">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-dark/30 via-transparent to-transparent" />

      {/* Content wrapper with parallax */}
      <motion.div style={{ y }} className="relative z-10">
        {/* Section title with enhanced animation */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative inline-block"
          >
            <motion.h2 className="font-orbitron text-5xl md:text-6xl font-bold text-cosmic-accent mb-4">
              Featured Events
            </motion.h2>
            <motion.div
              className="absolute -inset-x-10 -inset-y-4 bg-cosmic-accent/5 rounded-lg -z-10 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
          </motion.div>
        </div>

        {/* Event cards grid with more compact layout */}
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {eventCategories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group relative h-[300px] rounded-xl overflow-hidden"
              >
                {/* Enhanced card background with animated gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cosmic-accent/10 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 6 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Card background image with parallax effect */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-cosmic-dark/90 via-cosmic-dark/50 to-transparent z-10" />
                  <motion.img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>

                {/* Card content with enhanced animations */}
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="space-y-3"
                  >
                    <h3 className="font-orbitron text-2xl text-cosmic-accent group-hover:text-white transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-cosmic-muted text-sm leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <motion.span
                        className="text-cosmic-accent/80 text-sm"
                        whileHover={{ scale: 1.05 }}
                      >
                        {category.count} Events
                      </motion.span>
                      <motion.button
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cosmic-accent/10 backdrop-blur-sm border border-cosmic-accent/20 text-cosmic-accent text-sm font-medium group-hover:bg-cosmic-accent group-hover:text-cosmic-dark transition-all duration-300"
                      >
                        View Events
                        <IoArrowForward className="transition-transform duration-300 group-hover:translate-x-1" />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-1/2 left-0 w-96 h-96 bg-cosmic-accent/5 rounded-full blur-[120px]"
          animate={{
            x: [-100, 100],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 right-0 w-96 h-96 bg-cosmic-accent/5 rounded-full blur-[120px]"
          animate={{
            x: [100, -100],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
          }}
        />
      </div>
    </section>
  );
};

export default Events;
