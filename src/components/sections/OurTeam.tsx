"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";

const committeeData = [
  {
    committee: "Advisory Committee",
    members: ["Avval Yadav"],
    isPrimary: true,
  },
  {
    committee: "Executive Core Committee",
    members: [
      "Pranav Lata",
      "Jagrati Kumawat",
      "Ashutosh Yadav",
      "Kanishk Gupta",
    ],
    isPrimary: true,
  },
  {
    committee: "Sponsorship & Vendorship",
    members: [
      "Shourya Mehra",
      "Vanshaj Pradhan",
      "Aman Krishna",
      "Riddhi Khunteta",
      "Somya Yadav",
    ],
  },
  {
    committee: "Media & Promotion",
    members: [
      "Qamar Raza",
      "Krish Kumawat",
      "Mouli Pandey",
      "Vartika Yadav",
      "Yuvraj Singh",
      "Kapil Saini",
      "Divyansh Dudhani",
    ],
  },
  {
    committee: "Creative Design",
    members: [
      "Navya Bhatt",
      "Kanishk Purohit",
      "Arifa Khan",
      "Vaibhav Vashishtha",
      "Sakshi Singh",
      "Sani Jain",
      "Yug Pathak",
    ],
  },
  {
    committee: "Documentation",
    members: ["Bhuwan Chhabra", "Bhelitriveda", "Agni Goswami"],
  },
  {
    committee: "Logistics",
    members: ["Anirudh Sharma", "Aditya Raj Singh Tanwar", "Saksham Verma"],
  },
  {
    committee: "Technical",
    members: ["Abhay Parmar", "Tushar Jangid"],
  },
  {
    committee: "Stage Operations",
    members: ["Pulkit Jain", "Tisha Oberoi", "Uma Todi"],
  },
  {
    committee: "Marketing & Branding",
    members: ["Karan Singh", "Mayank Khatri"],
  },
  {
    committee: "Anchoring",
    members: ["Akshara Choudhary", "Nikhil Indoria"],
  },
  {
    committee: "Food & Accommodation",
    members: ["Dhriti Arora", "Uttkarsh Singh"],
  },
  {
    committee: "Cultural",
    members: [
      "Sharma Aryan Dinesh",
      "Thrishanth Kumar S.",
      "Lavya Lalwani",
      "Sparsh Goyal",
      "Alpita Singh",
      "Suhani Agarwal",
    ],
  },
  {
    committee: "Edufun",
    members: [
      "Suhani Sharma",
      "Vishesh Panwar",
      "Lekhanshi Jhedu",
      "Farhaan Mansoori",
      "Yuvraj Singh Chouhan",
      "Jahanvi Sharma",
      "Kangna Kriplani",
      "Amrita Soni",
    ],
  },
  {
    committee: "Sports",
    members: [
      "Prayag Vyas",
      "Raman Singh",
      "Pranjal Yadav",
      "Bhavesh Khandelwal",
      "Devansu Singh",
      "Rishabh Tater",
    ],
  },
  {
    committee: "E-Sports",
    members: ["Lakshya Tikkiwal", "Garv Verma"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const memberVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
};

// Add this new variant for primary committees
const primaryCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0, 1],
    },
  },
};

export const OurTeam = () => {
  return (
    <section id="team" className="section-wrapper">
      <div className="absolute inset-0 bg-gradient-radial from-theme-dark/20 via-black to-black" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center mb-12">
          <BlurFade>
            <SectionTitle title="Our Team" />
          </BlurFade>
        </div>

        {/* Primary Committees Section */}
        <div className="mb-12 space-y-6">
          {/* Advisory Committee - Centered */}
          {committeeData
            .filter((committee) => committee.committee === "Advisory Committee")
            .map((committee) => (
              <motion.div
                key={committee.committee}
                variants={primaryCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="max-w-md mx-auto relative group p-8 rounded-xl
                  bg-gradient-to-br from-theme-primary/20 to-theme-accent/20
                  backdrop-blur-sm border-2 border-white/20
                  hover:border-white/30 transition-all duration-300"
              >
                <div className="relative z-10 text-center">
                  <h3
                    className="text-2xl font-bold mb-4 text-transparent bg-clip-text 
                    bg-gradient-to-r from-theme-primary via-theme-accent to-theme-secondary"
                  >
                    {committee.committee}
                  </h3>
                  <motion.div
                    variants={containerVariants}
                    className="flex justify-center"
                  >
                    {committee.members.map((member) => (
                      <motion.div
                        key={member}
                        variants={memberVariants}
                        className="flex items-center gap-2"
                      >
                        <span className="w-2 h-2 rounded-full bg-theme-accent" />
                        <span className="text-lg text-white/90 hover:text-white transition-colors">
                          {member}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
                <div
                  className="absolute inset-0 rounded-xl bg-white/5 opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            ))}

          {/* Executive Core Committee - Full Width */}
          {committeeData
            .filter(
              (committee) => committee.committee === "Executive Core Committee"
            )
            .map((committee) => (
              <motion.div
                key={committee.committee}
                variants={primaryCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative group p-8 rounded-xl
                  bg-gradient-to-br from-theme-primary/15 to-theme-accent/15
                  backdrop-blur-sm border-2 border-white/15
                  hover:border-white/25 transition-all duration-300"
              >
                <div className="relative z-10">
                  <h3
                    className="text-2xl font-bold mb-6 text-center text-transparent 
                    bg-clip-text bg-gradient-to-r from-theme-primary via-theme-accent to-theme-secondary"
                  >
                    {committee.committee}
                  </h3>
                  <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center"
                  >
                    {committee.members.map((member) => (
                      <motion.div
                        key={member}
                        variants={memberVariants}
                        className="flex items-center gap-2"
                      >
                        <span className="w-2 h-2 rounded-full bg-theme-accent" />
                        <span className="text-lg text-white/90 hover:text-white transition-colors">
                          {member}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
                <div
                  className="absolute inset-0 rounded-xl bg-white/5 opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            ))}
        </div>

        {/* Regular Committees Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {committeeData
            .filter((committee) => !committee.isPrimary)
            .map((committee) => (
              <motion.div
                key={committee.committee}
                variants={itemVariants}
                className="relative group p-6 rounded-xl bg-white/5
                  backdrop-blur-sm border border-white/10
                  hover:border-white/20 transition-all duration-300"
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 text-theme-primary">
                    {committee.committee}
                  </h3>
                  <motion.div
                    variants={containerVariants}
                    className="grid gap-2 grid-cols-1"
                  >
                    {committee.members.map((member) => (
                      <motion.div
                        key={member}
                        variants={memberVariants}
                        className="flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-theme-accent/50" />
                        <span className="text-white/80 hover:text-white transition-colors">
                          {member}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
                <div
                  className="absolute inset-0 rounded-xl bg-white/5 opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  );
};
