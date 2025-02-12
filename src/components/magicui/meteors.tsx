"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface MeteorsProps {
  number?: number;
  className?: string;
}

export const Meteors = ({ number = 20, className }: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    []
  );

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      top: -10,
      left: Math.floor(Math.random() * 100) + "%",
      animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          style={style}
          className={cn(
            "absolute h-1 w-1 rotate-[215deg] animate-meteor rounded-[9999px]",
            "before:absolute before:top-1/2 before:h-[2px] before:w-[50px]",
            "before:-translate-y-[50%] before:transform",
            "before:opacity-[0.3]",
            className
          )}
        />
      ))}
    </>
  );
};
