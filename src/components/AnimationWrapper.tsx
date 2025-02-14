"use client";

import { motion } from "framer-motion";

interface AnimationWrapperProps {
  children: React.ReactNode;
}
export const AnimationWrapper = ({ children }: AnimationWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
