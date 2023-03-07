/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      "gray-1": "#F2F4F8",
      "gray-2": "#DDE1E6",
      "dark-text": "#121619",
      "blue-1": "#0043CE",
      "alert-1": "#da1e28",
      "alert-2": "#fa4d56",
      "status-open": "#a7f0ba",
      "status-open-text": "#0e6027",
      "status-in-progress": "#f1c21b",
      "status-in-progress-text": "#4f410d",
      "status-paid": "#0043ce",
      "status-paid-text": "#D0E2FF",
    },
    extend: {
      screens: {
        sm: { max: "640px" },
      },
    },
  },
  plugins: [],
};
