/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Short viewports (Nest Hub 1024x600, laptops in split view, landscape phones).
      // Auth cards compress instead of forcing a page scroll.
      screens: {
        short: { raw: "(max-height: 700px)" },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
