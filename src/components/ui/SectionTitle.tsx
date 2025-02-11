import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  className?: string;
}

export const SectionTitle = ({ title, className = "" }: SectionTitleProps) => {
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.h2
      variants={titleVariants}
      className={`text-6xl md:text-7xl font-bold mb-16 
        bg-gradient-to-r from-theme-primary via-theme-accent to-theme-secondary
        bg-clip-text text-transparent text-center
        relative inline-block
        after:content-[''] after:absolute after:-bottom-4 after:left-1/2 
        after:-translate-x-1/2 after:w-24 after:h-1
        after:bg-gradient-to-r after:from-theme-primary after:to-theme-secondary
        ${className}`}
    >
      {title}
    </motion.h2>
  );
};
