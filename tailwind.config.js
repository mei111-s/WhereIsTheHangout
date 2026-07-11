/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ube: "#2B1B3D",
        "ube-light": "#412A5C",
        guava: "#FF6F91",
        mango: "#FFC145",
        leaf: "#3D8361",
        cream: "#FFF9F2",
        ink: "#1F1330",
      },
      fontFamily: {
        display: ["var(--font-baloo)"],
        body: ["var(--font-jakarta)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        signboard: "14px",
      },
      boxShadow: {
        signboard: "0 4px 0 rgba(31,19,48,0.25)",
        card: "0 8px 24px rgba(43,27,61,0.12)",
      },
    },
  },
  plugins: [],
};
