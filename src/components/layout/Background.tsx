"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export const Background = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <Image
        src="/images/bg.webp"
        alt="Space Background"
        fill
        className="object-cover object-center"
        priority
        quality={90}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
      />
    </div>
  );
};
