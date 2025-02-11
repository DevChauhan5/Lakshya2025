/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          primary: "#ffce6b",
          secondary: "#f0524a",
          accent: "#f48952",
          highlight: "#d82c88",
          dark: "#382f59",
          light: "#733c80",
        },
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        shine: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        spin: "spin 3s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shine: "shine 2s infinite",
      },
    },
  },
  plugins: [],
};
