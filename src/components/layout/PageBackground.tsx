import { useEffect, useRef, useMemo } from "react";

const PageBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const starsRef = useRef<any[]>([]);

  // Create different types of stars for more visual variety
  const createStars = useMemo(
    () => () => {
      const stars = [];
      // Background stars (more numerous, smaller)
      for (let i = 0; i < 400; i++) {
        stars.push({
          x: Math.random(),
          y: Math.random(),
          size: Math.random() * 1.5,
          speed: Math.random() * 0.1,
          opacity: Math.random() * 0.5 + 0.2,
          baseY: Math.random(),
          type: "background",
        });
      }
      // Midground stars (medium size)
      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random(),
          y: Math.random(),
          size: Math.random() * 2 + 1,
          speed: Math.random() * 0.15,
          opacity: Math.random() * 0.6 + 0.3,
          baseY: Math.random(),
          type: "midground",
        });
      }
      // Foreground stars (fewer, larger, brighter)
      for (let i = 0; i < 50; i++) {
        stars.push({
          x: Math.random(),
          y: Math.random(),
          size: Math.random() * 2.5 + 1.5,
          speed: Math.random() * 0.2,
          opacity: Math.random() * 0.4 + 0.6,
          baseY: Math.random(),
          type: "foreground",
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

    if (starsRef.current.length === 0) {
      starsRef.current = createStars();
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 3;
      starsRef.current.forEach((star) => {
        star.x = star.x * canvas.width;
        star.baseY = star.baseY * canvas.height;
      });
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          scrollRef.current = window.scrollY * 0.5; // Reduced scroll effect
          ticking = false;
        });
        ticking = true;
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create star field effect
      starsRef.current.forEach((star, index) => {
        const scrollOffset =
          scrollRef.current *
          (star.type === "foreground"
            ? 0.3
            : star.type === "midground"
            ? 0.2
            : 0.1);
        let y = (star.baseY + star.speed * Date.now() * 0.01) % canvas.height;
        y -= scrollOffset;

        if (y < 0) y = canvas.height + y;
        if (y > canvas.height) y = y - canvas.height;

        // Enhanced star rendering
        const gradient = ctx.createRadialGradient(
          star.x,
          y,
          0,
          star.x,
          y,
          star.size *
            (star.type === "foreground" ? 3 : star.type === "midground" ? 2 : 1)
        );

        // Custom color based on star type
        const alpha =
          star.opacity * (1 + Math.sin(Date.now() * 0.001 + index) * 0.2);
        const baseColor =
          star.type === "foreground"
            ? `rgba(255, 255, 255, ${alpha})`
            : star.type === "midground"
            ? `rgba(200, 220, 255, ${alpha})`
            : `rgba(180, 200, 255, ${alpha})`;

        gradient.addColorStop(0, baseColor);
        gradient.addColorStop(0.1, baseColor);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Add cross-glow effect for brighter stars
        if (star.type === "foreground") {
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - star.size * 2, y);
          ctx.lineTo(star.x + star.size * 2, y);
          ctx.moveTo(star.x, y - star.size * 2);
          ctx.lineTo(star.x, y + star.size * 2);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [createStars]);

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-b from-cosmic-dark via-[#0c1a3d] to-cosmic" />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[1] opacity-70"
        style={{
          transform: "translate3d(0,0,0)",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      />
      <div className="fixed inset-0 z-[2] bg-gradient-radial from-transparent to-cosmic-dark/80 pointer-events-none" />
      <div className="fixed inset-0 z-[2] bg-gradient-to-b from-cosmic-dark/50 via-transparent to-cosmic/50 pointer-events-none" />
      <div className="fixed inset-0 z-[1] bg-[url('/grid.png')] opacity-5 pointer-events-none" />
    </>
  );
};

export default PageBackground;
