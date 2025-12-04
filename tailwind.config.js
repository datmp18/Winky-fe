/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-1px)" },
          "75%": { transform: "translateX(1px)" },
        },
      },
      animation: {
        shake: "shake 0.2s ease-in-out 1",
      },
      fontFamily: {
        tiktok: ['"IBM Plex Sans"', 'TikTokFont', 'Arial', 'Tahoma', 'PingFangSC', 'sans-serif'],
      },
    },
  },
  plugins: [],
}