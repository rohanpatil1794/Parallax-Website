/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Wired to next/font CSS variables defined in app/layout.jsx
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "var(--font-inter)", "sans-serif"],
      },
      colors: {
        ink: "#0C4A6E",
        // Primary — sky blue ("clear skies")
        brand: {
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
          800: "#075985",
          900: "#0C4A6E",
          950: "#082F49",
        },
        // CTA — adventure ember orange
        ember: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
        },
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(8, 47, 73, 0.25)",
        "card-hover": "0 22px 50px -18px rgba(8, 47, 73, 0.45)",
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px -20px rgba(8,47,73,0.6)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.21, 0.6, 0.36, 1) both",
        "fade-in": "fade-in 0.8s ease both",
        "bounce-soft": "bounce-soft 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
