import { useEffect, useRef, useMemo } from "react";

const PageBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const starsRef = useRef<any[]>([]);

  // Create different types of stars for more visual variety
  const createStars = useMemo(
    () => () => {
      const stars = [];
      // Background stars (more numerous, dimmer)
      for (let i = 0; i < 500; i++) {
        stars.push({
          x: Math.random(),
          y: Math.random(),
          size: Math.random() * 1.2,
          speed: Math.random() * 0.08,
          opacity: Math.random() * 0.3 + 0.1, // Dimmer background stars
          baseY: Math.random(),
          type: "background",
        });
      }
      // Midground stars
      for (let i = 0; i < 150; i++) {
        stars.push({
          x: Math.random(),
          y: Math.random(),
          size: Math.random() * 1.8 + 0.8,
          speed: Math.random() * 0.12,
          opacity: Math.random() * 0.5 + 0.2,
          baseY: Math.random(),
          type: "midground",
        });
      }
      // Foreground stars (brighter, more prominent)
      for (let i = 0; i < 30; i++) {
        stars.push({
          x: Math.random(),
          y: Math.random(),
          size: Math.random() * 2.2 + 1.2,
          speed: Math.random() * 0.15,
          opacity: Math.random() * 0.6 + 0.4,
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
      {/* Darker base background */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#010408] via-[#0a1428] to-[#0c1a3d]" />

      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[1] opacity-90"
        style={{
          transform: "translate3d(0,0,0)",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      />

      {/* Enhanced overlay gradients */}
      <div className="fixed inset-0 z-[2] bg-gradient-radial from-transparent to-[#010408]/90 pointer-events-none" />
      <div className="fixed inset-0 z-[2] bg-gradient-to-b from-[#010408]/30 via-transparent to-[#010408]/30 pointer-events-none" />

      {/* Subtle noise texture */}
      <div
        className="fixed inset-0 z-[1] opacity-[0.015] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
};

export default PageBackground;
