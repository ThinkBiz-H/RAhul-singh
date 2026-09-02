/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F39C12",
          hover: "#D98200",
        },
        navy: "#2F3942",
        ink: "#2E2E2E",
        surface: "#F7F7F7",
        line: "#E5E5E5",
      },
      fontFamily: {
        sans: ["'Noto Sans'", "'Noto Sans Devanagari'", "system-ui", "sans-serif"],
        display: ["'Baloo 2'", "'Noto Sans Devanagari'", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1180px",
      },
      boxShadow: {
        card: "0 2px 14px rgba(47,57,66,0.08)",
        cardHover: "0 10px 30px rgba(47,57,66,0.16)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-in-out",
      },
    },
  },
  plugins: [],
};
