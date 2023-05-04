// tailwind.config.js
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        120: "120px",
        240: "240px",
      },
    },
    colors: {
      primary: "#2a2731",
      black: "rgb(10, 23, 33)",
      white: "#ffffff",
      gray: "#656566",
      blue: "#76a9ff",
      dark: "#252f3c",
      red: "#DC143C",
      green:"#008000"
    },
    screens: {
      sm: { min: "320px", max: "639px" },
      md: { min: "640px", max: "767px" },
      lg: { min: "768px", max: "1023px" },
      xl: { min: "1024px", max: "1279px" },
      "2xl": { min: "1280px" },
    },
    left: {
      "1/5": "20%",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
