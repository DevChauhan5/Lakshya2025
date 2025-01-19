import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiClock } from "react-icons/fi";
import { ImStarFull } from "react-icons/im";

interface TimelineEvent {
  day: number;
  date: string;
  events: {
    time: string;
    title: string;
    description: string;
  }[];
}

const timelineData: TimelineEvent[] = [
  {
    day: 1,
    date: "March 14, 2025",
    events: [
      {
        time: "09:00 AM",
        title: "Opening Ceremony",
        description:
          "Inauguration of Lakshya'25 with distinguished guests and cultural performances",
      },
      {
        time: "10:30 AM",
        title: "Keynote Address",
        description:
          "Visionary talk by industry leaders on future technology trends",
      },
      {
        time: "02:00 PM",
        title: "Hack Horizon",
        description:
          "24-hour hackathon kickoff with exciting problem statements",
      },
      {
        time: "04:00 PM",
        title: "Tech Workshops",
        description:
          "Parallel workshops on AI, Blockchain, and Cloud Computing",
      },
      {
        time: "07:00 PM",
        title: "Cultural Night",
        description: "Evening of music, dance, and artistic performances",
      },
    ],
  },
  {
    day: 2,
    date: "March 15, 2025",
    events: [
      {
        time: "09:00 AM",
        title: "CodeCraft Finals",
        description: "Competitive programming championship showdown",
      },
      {
        time: "11:00 AM",
        title: "Robotics Arena",
        description: "Robot wars and autonomous vehicle demonstrations",
      },
      {
        time: "02:00 PM",
        title: "Innovation Expo",
        description: "Showcase of student projects and startup exhibitions",
      },
      {
        time: "04:30 PM",
        title: "Panel Discussion",
        description: "Tech leaders debate on 'Future of AI and Ethics'",
      },
      {
        time: "07:30 PM",
        title: "StarGaze Concert",
        description: "Live music performance under the stars",
      },
    ],
  },
  {
    day: 3,
    date: "March 16, 2025",
    events: [
      {
        time: "10:00 AM",
        title: "Design Derby",
        description: "UI/UX design competition finals",
      },
      {
        time: "12:00 PM",
        title: "Tech Talks",
        description: "Lightning talks by industry experts and alumni",
      },
      {
        time: "02:30 PM",
        title: "CTF Challenge",
        description: "Cybersecurity capture the flag event",
      },
      {
        time: "05:00 PM",
        title: "Startup Pitch",
        description: "Student entrepreneurs pitch to venture capitalists",
      },
      {
        time: "08:00 PM",
        title: "Comedy Night",
        description: "Stand-up comedy show featuring top comedians",
      },
    ],
  },
  {
    day: 4,
    date: "March 17, 2025",
    events: [
      {
        time: "10:00 AM",
        title: "Hackathon Finale",
        description: "Project presentations and demonstrations",
      },
      {
        time: "01:00 PM",
        title: "Gaming Tournament",
        description: "eSports finals and VR gaming experience",
      },
      {
        time: "03:30 PM",
        title: "Award Ceremony",
        description: "Recognition of winners across all competitions",
      },
      {
        time: "05:00 PM",
        title: "Closing Ceremony",
        description: "Grand finale with special performances",
      },
      {
        time: "07:00 PM",
        title: "Farewell Party",
        description: "DJ night and celebration",
      },
    ],
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  // Add floating animation variant
  const floatingAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity }}
      className="py-20 md:py-32 relative"
    >
      {/* Simplified Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20 relative"
      >
        <motion.div
          animate={{
            filter: ["blur(4px)", "blur(0px)"],
            scale: [0.9, 1],
          }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <h2 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-cosmic-accent to-white bg-clip-text text-transparent bg-[length:200%_100%] animate-text-shimmer">
            LAKSHYA'25 TIMELINE
          </h2>
        </motion.div>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="w-24 h-1 bg-gradient-to-r from-transparent via-cosmic-accent to-transparent mx-auto mt-4 rounded-full"
        />
      </motion.div>

      {/* Timeline Container with enhanced styling */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative">
          {/* Enhanced Vertical Line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-cosmic-accent via-cosmic-accent/50 to-transparent"
          />

          {/* Timeline Events with enhanced animations */}
          {timelineData.map((day, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={floatingAnimation}
              className="mb-20"
            >
              {/* Enhanced Day Marker */}
              <div className="relative flex justify-center mb-8 group">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="relative bg-cosmic-dark border-2 border-cosmic-accent rounded-full p-3 z-10 cursor-pointer transition-colors duration-300 group-hover:border-white"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="bg-cosmic-accent w-4 h-4 rounded-full"
                  />
                </motion.div>
                {/* Enhanced glow effect */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-cosmic-accent/20 rounded-full filter blur-xl"
                />
              </div>

              {/* Enhanced Day Content */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative max-w-2xl mx-auto group"
              >
                <div className="bg-cosmic-dark/80 backdrop-blur-sm border border-cosmic-accent/20 rounded-2xl p-6 transition-all duration-300 group-hover:border-cosmic-accent/60 group-hover:shadow-[0_0_30px_rgba(56,189,248,0.1)]">
                  {/* Enhanced day header */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-4"
                  >
                    <span className="bg-cosmic-accent/10 px-4 py-2 rounded-full font-orbitron text-2xl text-cosmic-accent flex items-center gap-2">
                      Day {day.day}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <ImStarFull className="w-4 h-4" />
                      </motion.div>
                    </span>
                    <p className="text-cosmic-accent/80 font-syne">
                      {day.date}
                    </p>
                  </motion.div>

                  {/* Enhanced events list */}
                  <div className="space-y-4">
                    {day.events.map((event, eventIndex) => (
                      <motion.div
                        key={eventIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: eventIndex * 0.1 }}
                        whileHover={{ x: 10 }}
                        className="group/event flex gap-4 p-3 rounded-lg hover:bg-cosmic-accent/5 transition-colors duration-300"
                      >
                        <div className="text-cosmic-accent/70 font-mono w-24 flex-shrink-0 flex items-center gap-2">
                          <FiClock className="group-hover/event:text-cosmic-accent transition-colors" />
                          {event.time}
                        </div>
                        <div>
                          <h4 className="text-white font-syne font-semibold group-hover/event:text-cosmic-accent transition-colors">
                            {event.title}
                          </h4>
                          <p className="text-cosmic-muted mt-1 group-hover/event:text-cosmic-accent/70 transition-colors">
                            {event.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute w-64 h-64 bg-cosmic-accent/5 rounded-full blur-3xl ${
              i === 1
                ? "top-0 left-0"
                : i === 2
                ? "top-1/2 right-0"
                : "bottom-0 left-1/3"
            }`}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
