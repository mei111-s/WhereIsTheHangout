/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // From the requested palette (dark navy → light lavender/gray)
        navydark: "#1E212C",
        plum: "#302C40",
        violet: "#4C3D74",
        lavender: "#B39FC7",
        graylight: "#C8C5C5",

        // Semantic aliases used throughout the app (unchanged names,
        // repointed to the new palette so components didn't need edits)
        sandlight: "#252231",  // sticky header background
        blush: "#1E212C",      // page background
        blushdeep: "#4C3D74",  // pill/tag chip backgrounds
        cream: "#302C40",      // card surfaces
        ivory: "#EDEAF2",      // light text on colored buttons/banners
        maroon: "#6E58A8",     // headings, nav text, banner backgrounds
        "maroon-light": "#8A72C4",
        mauve: "#7A649E",      // borders
        cherry: "#8B6FB8",     // primary CTA / accent (deepened lavender for contrast)
        gold: "#B39FC7",       // decorative accents only (true pale lavender)
        ink: "#C8C5C5",        // primary body text
        inkmuted: "#8B8794",   // secondary/muted text
      },
      fontFamily: {
        display: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        body: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        signboard: "16px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 8px 24px rgba(175,139,135,0.14)",
        pop: "0 4px 14px rgba(229,138,160,0.35)",
      },
    },
  },
  plugins: [],
};