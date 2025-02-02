"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLoading } from "@/context/LoadingContext";

export const PreLoader = () => {
  const { setIsLoading } = useLoading();

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      onAnimationComplete={() => setIsLoading(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/logo.webp"
          alt="Lakshya Logo"
          width={200}
          height={200}
          className="h-auto w-auto"
          priority
        />
      </motion.div>
    </motion.div>
  );
};
