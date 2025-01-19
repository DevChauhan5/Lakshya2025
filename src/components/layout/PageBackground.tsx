import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";

const PageBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const createStars = useMemo(
    () => () => {
      const stars = [];
      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random(),
          y: Math.random(),
          size: Math.random() * 2,
          speed: Math.random() * 0.5,
          opacity: Math.random(),
        });
      }
      return stars;
    },
    []
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    let animationFrameId: number;
    let stars = createStars();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
      stars = createStars();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star, index) => {
        const x = star.x * canvas.width;
        const y = (star.y * canvas.height + star.speed) % canvas.height;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, star.size * 2);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fill();

        stars[index].y = y / canvas.height;
        stars[index].opacity = Math.sin(Date.now() * 0.001 + index) * 0.3 + 0.7;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    document.addEventListener("scroll", handleResize);
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("scroll", handleResize);
    };
  }, [createStars]);

  return (
    <>
      {/* Fixed background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-cosmic-dark via-[#0c1a3d] to-cosmic" />

      {/* Animated stars */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[1] opacity-50"
        style={{ transform: "translate3d(0,0,0)" }}
      />

      {/* Common overlay gradients */}
      <div className="fixed inset-0 z-[2] bg-gradient-radial from-transparent to-cosmic-dark/80" />
      <div className="fixed inset-0 z-[2] bg-gradient-to-b from-cosmic-dark/50 via-transparent to-cosmic/50" />

      {/* Grid pattern */}
      <div className="fixed inset-0 z-[1] bg-[url('/grid.png')] opacity-10" />
    </>
  );
};

export default PageBackground;
