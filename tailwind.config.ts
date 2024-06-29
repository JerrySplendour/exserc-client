import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        slidedown: {
          from: { opacity: "0", transform: 'translateY(-15%)' },
          to: { opacity: '1', transform: 'none' },
        },
        slideup: {
          from: { opacity: "0", transform: 'translateX(25%)' },
          to: { opacity: '1', transform: 'none' },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slidedown": "slidedown 0.8s ease-in-out",
        "slideup": "slideup 0.8s ease-in-out"
      },
      colors: {
        primary: {
          1: "#9A65CF"
        },
        black: {
          1: "#3C3742",
          2: "#3C374280"
        }
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config