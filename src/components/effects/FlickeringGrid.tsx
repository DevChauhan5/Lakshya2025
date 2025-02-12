"use client";

import { useEffect, useRef } from "react";

interface Props {
  className?: string;
  squareSize?: number;
  gridGap?: number;
  color?: string;
  maxOpacity?: number;
  flickerChance?: number;
  height?: number;
  width?: number;
}

export function FlickeringGrid({
  className = "",
  squareSize = 4,
  gridGap = 6,
  color = "#ffce6b",
  maxOpacity = 0.5,
  flickerChance = 0.1,
  height = 800,
  width = 800,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const totalSize = squareSize + gridGap;
    const rows = Math.ceil(height / totalSize);
    const cols = Math.ceil(width / totalSize);
    const opacities = new Array(rows * cols).fill(0);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const index = i * cols + j;
          if (Math.random() < flickerChance) {
            opacities[index] = Math.random() * maxOpacity;
          }

          ctx.fillStyle = color;
          ctx.globalAlpha = opacities[index];
          ctx.fillRect(j * totalSize, i * totalSize, squareSize, squareSize);
        }
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, [squareSize, gridGap, color, maxOpacity, flickerChance, height, width]);

  return (
    <canvas
      ref={canvasRef}
      height={height}
      width={width}
      className={className}
    />
  );
}
