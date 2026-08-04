import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: "#fff8ed",
          100: "#ffefd4",
          200: "#ffdba8",
          300: "#ffc070",
          400: "#ff9d3a",
          500: "#ff7e15",
          600: "#f0620b",
          700: "#c7470b",
          800: "#9e3811",
          900: "#7f3012",
          950: "#451606",
        },
        crimson: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        ink: {
          50: "#f6f6f7",
          100: "#e1e3e6",
          200: "#c2c6cc",
          300: "#9ba0aa",
          400: "#747a87",
          500: "#5a606d",
          600: "#474c56",
          700: "#3a3e46",
          800: "#2d2f35",
          900: "#141b33",
          950: "#0b1330",
        },
        cream: "#fdfaf5",
        // Brand palette taken from the badge: deep purple disc, gold bus.
        royal: {
          50: "#f8f4fb",
          100: "#efe3f6",
          200: "#dfc7ec",
          300: "#c69ddc",
          400: "#a86cc7",
          500: "#8b45ac",
          600: "#72308f",
          700: "#5a1e72",
          800: "#4a1a5e",
          900: "#3a1449",
          950: "#1c0a24",
        },
        gold: {
          50: "#fdf9ef",
          100: "#faf0d3",
          200: "#f4dc9d",
          300: "#efc667",
          400: "#e9ad45",
          500: "#e3a33c",
          600: "#c4842c",
          700: "#9d6524",
          800: "#7d4f24",
          900: "#674222",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "marquee": "marquee 30s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "skeleton": "skeleton 1.6s ease-in-out infinite",
        "wheel-spin": "wheelSpin 0.7s linear infinite",
        "road-dash": "roadDash 0.6s linear infinite",
        "bus-bob": "busBob 0.9s ease-in-out infinite",
        "scenery": "scenery 5s linear infinite",
        "exhaust": "exhaust 1.2s ease-out infinite",
        // Neon loader. Durations are overridden per-element for variety.
        "smog-drift": "smogDrift 2.8s ease-out infinite",
        "speed-streak": "speedStreak 2s linear infinite",
        "road-flow": "roadFlow 0.85s linear infinite",
        "neon-flicker": "neonFlicker 4.5s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        // Sweeping highlight for image/content skeletons.
        skeleton: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        // Bus loader: wheels rotate.
        wheelSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        // Bus loader: road centre-line scrolls toward the viewer.
        roadDash: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-48px)" },
        },
        // Bus loader: gentle suspension bob.
        busBob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-2.5px)" },
        },
        // Bus loader: hills drift past (320 user-unit tile, repeated twice).
        scenery: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-320px)" },
        },
        // Bus loader: exhaust puffs.
        exhaust: {
          "0%": { opacity: "0.5", transform: "translate(0,0) scale(0.6)" },
          "100%": { opacity: "0", transform: "translate(-22px,-10px) scale(1.5)" },
        },
        // Neon loader: smog billows off the rear wheel, drifting back and up.
        smogDrift: {
          "0%": { opacity: "0", transform: "translate(0px, 0px) scale(0.35)" },
          "14%": { opacity: "var(--smog-peak, 0.45)" },
          "100%": { opacity: "0", transform: "translate(-150px, -34px) scale(2.4)" },
        },
        // Neon loader: streaks flying past the bus.
        speedStreak: {
          "0%": { opacity: "0", transform: "translateX(70px)" },
          "18%": { opacity: "0.75" },
          "100%": { opacity: "0", transform: "translateX(-300px)" },
        },
        // Neon loader: lane markings flow toward the viewer (34+26 = 60 period).
        roadFlow: {
          "0%": { strokeDashoffset: "0" },
          "100%": { strokeDashoffset: "60" },
        },
        // Neon loader: the tube settling after it powers on.
        neonFlicker: {
          "0%, 38%, 44%, 100%": { opacity: "1" },
          "41%": { opacity: "0.82" },
          "47%": { opacity: "0.9" },
        },
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
