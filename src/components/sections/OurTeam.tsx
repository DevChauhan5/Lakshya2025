"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { CommitteeDialog } from "./CommitteeDialog";

// Updated core members data with corrected image paths and dimensions
const coreMembers = [
  {
    name: "Pranav Lata",
    role: "Executive Core Committee",
    image: "/images/team/68.webp",
  },
  {
    name: "Jagrati Kumawat",
    role: "Executive Core Committee",
    image: "/images/team/69.webp",
  },
  {
    name: "Ashutosh Yadav",
    role: "Executive Core Committee",
    image: "/images/team/70.webp",
  },
  {
    name: "Kanishk Gupta",
    role: "Executive Core Committee",
    image: "/images/team/71.webp",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.4, 0.0, 0.2, 1],
    },
  }),
};

const imageVariants = {
  hover: {
    scale: 1.1,
    transition: { duration: 0.7, ease: [0.4, 0.0, 0.2, 1] },
  },
};

export const OurTeam = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0, 1]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <section
      ref={containerRef}
      id="team"
      className="relative min-h-screen bg-black overflow-hidden py-16"
    >
      {/* Background Effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-theme-dark/20 via-black to-black"
        style={{ opacity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Centered Title */}
        <div className="flex justify-center mb-12">
          <BlurFade>
            <SectionTitle title="Our Team" />
          </BlurFade>
        </div>

        <div className="flex flex-col gap-8 max-w-7xl mx-auto">
          {/* Advisory Row */}
          <div className="grid grid-cols-1 gap-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="w-full sm:w-[400px] h-[440px] mx-auto bg-black/20 rounded-xl overflow-hidden"
            >
              <div className="relative w-full h-full group">
                <motion.div
                  className="absolute inset-0"
                  variants={imageVariants}
                  whileHover="hover"
                >
                  <Image
                    src="/images/team/avval.webp"
                    alt="Avval Yadav"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-theme-primary via-theme-accent to-theme-secondary bg-clip-text text-transparent">
                    Avval Yadav
                  </h3>
                  <p className="text-md text-white/80">Advisory Committee</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Core Committee Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index + 1}
                variants={cardVariants}
                className="h-[400px] bg-black/20 rounded-xl overflow-hidden"
              >
                <div className="relative w-full h-full group">
                  <motion.div
                    className="absolute inset-0"
                    variants={imageVariants}
                    whileHover="hover"
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      priority={index < 2}
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {member.name}
                    </h3>
                    <p className="text-sm text-white/80">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div className="flex justify-center mt-8">
          <RainbowButton onClick={() => setDialogOpen(true)}>
            View All Committees
          </RainbowButton>
        </motion.div>
      </div>

      {/* Committee Dialog */}
      <CommitteeDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
};
