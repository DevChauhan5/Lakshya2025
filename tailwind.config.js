/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cosmic: {
          DEFAULT: "#0F172A",
          dark: "#020617",
          light: "#1E293B",
          accent: "#38BDF8",
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        audiowide: ["Audiowide", "cursive"],
        orbitron: ["Orbitron", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite",
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
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
