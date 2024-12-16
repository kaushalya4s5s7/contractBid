/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        royalBlue: "#1a2a6c",
        deepPurple: "#b21f1f",
        gold: "#f0c419",
        platinumWhite: "#f4f4f9",
        darkGray: "#333333",
      },
      fontFamily: {
        hero: ["Unbounded", "san-serif"],
        zero: ["Sour Gummy", "sans-serif"], // Add the custom font
      },
      animation: {
        "gradient-x": "gradient-x 15s ease infinite",
        "gradient-y": "gradient-y 15s ease infinite",
        "gradient-xy": "gradient-xy 15s ease infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-slower": "float 10s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-slower": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 15s linear infinite",
        "reverse-spin-slow": "reverse-spin 20s linear infinite",
        "bounce-slow": "bounce 3s ease-in-out infinite",
        "wave-slow": "wave 20s linear infinite",
        scan: "scan 3s linear infinite",
      },
      keyframes: {
        "gradient-y": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "center top",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "center center",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0)" },
          "50%": { transform: "translateY(-20px) rotate(5deg)" },
        },
        "reverse-spin": {
          from: {
            transform: "rotate(360deg)",
          },
        },
        wave: {
          "0%": { transform: "translateX(0) translateY(0)" },
          "100%": { transform: "translateX(-50%) translateY(-50%)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      perspective: {
        1000: "1000px",
      },
    },
  },
  plugins: [],
};
