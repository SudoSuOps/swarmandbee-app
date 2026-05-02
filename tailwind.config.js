/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Honey + brokerage palette — amber for the warmth, deep blacks for
        // the institutional feel. Royal jelly = the premium tier accent.
        honey: "#f5b400",
        jelly: "#fbc02d",
        propolis: "#d32f2f",
        ink: "#0f0f0f",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};
