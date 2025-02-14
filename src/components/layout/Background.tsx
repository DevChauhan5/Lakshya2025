"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export const Background = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/bg.webp"
          alt="Background"
          fill
          className="object-cover object-center"
          priority={true}
          sizes="100vw"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADQAQCdASoIAAUAAUAmJaQAA3AA/vp1oAAA" // Add a tiny blurred version of your image
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        />
      </div>
    </div>
  );
};
