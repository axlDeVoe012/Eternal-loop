export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#D4AF37",
        burgundy: "#1A0505",
      },
      fontFamily: { 
        serif: ["Playfair Display", "serif", "'Dancing Script'", "cursive"],
        romantic: ["Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
}
