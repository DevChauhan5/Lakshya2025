/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cosmic: {
          DEFAULT: "#0F172A",
          dark: "#010408", // Darker space color
          light: "#1E293B",
          accent: "#38BDF8",
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        audiowide: ["Audiowide", "cursive"],
        orbitron: ["Orbitron", "sans-serif"],
        syne: ["Syne", "sans-serif"], // Replace grotesk with syne
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite",
        "text-shimmer": "text-shimmer 2.5s ease-in-out infinite",
        marquee: "marquee 25s linear infinite",
        marquee2: "marquee2 25s linear infinite",
        "infinite-scroll": "infinite-scroll 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        glow: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.6 },
        },
        "text-shimmer": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "star-pattern":
          "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
      },
      letterSpacing: {
        "widest-xl": "0.2em",
      },
      screens: {
        xs: "400px",
      },
      minHeight: {
        screen: "100vh",
        "screen-small": "100svh",
      },
    },
  },
  plugins: [],
};
