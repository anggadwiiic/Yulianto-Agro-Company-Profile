/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // DESIGN.md
        base: "#F8F9FA", // Global Background / White Alter
        dark: "#040922", // Dark / Text
        "header-gradient": "#040820", // Header Gradient Base
        primary: "#2E5C31", // Primary Green
        "primary-dark": "#1E3D21", // Primary Dark (Hover)
        "accent-cream": "#FFE9B3", // Accent Cream
      },
      fontFamily: {
        // Plus Jakarta Sans
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
