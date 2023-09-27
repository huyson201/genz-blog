import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        shadow: "url(../assets/shadow-1.svg)",
        "shadow-2": "url(../assets/shadow-2.svg)",
        "shadow-3": "url(../assets/shadow-3.svg)",
        headset: "url(../assets/headset.svg)",
        marker: "url(../assets/marker.svg)",
        security: "url(../assets/security.svg)",
        "paper-plane": "url(../assets/paper-plane.svg)",
        "primary-gradient":
          "linear-gradient(90deg,#0ea5ea,#0bd1d1 51%,#0ea5ea)",
      },
      fontFamily: {
        noto_sans: [
          "var(--noto-sans-font)",
          "var(--inter-font)",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      colors: {
        teal: "#0bd1d1",
        blue: "#0ea5ea",
        on_dark_link_active: "#2c3a47",
        on_link_active: "#1cc2e7",
        on_dark_body_bg: "#0f172a",
        on_light_body_bg: "#f9fbff",
        on_dark_text_gray: "#94a9c9",
        on_light_text_gray: "#4e658a",
        on_text_gray_2: "#66768f",
        on_dark_border: "#222f43",
        on_light_border: "#e9eef5",
        on_light_border_2: "#c2d4ee",
        on_dark_bg_2: "#222f43",
        on_light_bg_2: "#e9eef5",
        on_dark_card_bg: "#131c31",
        on_light_card_bg: "#e8edf5",
        on_dark_text_white: "#b9e0f2",
        on_light_text_white: "#344161",
        on_dark_text_hover: "#0EA5F6",
        on_light_text_hover: "#0EA5F6",
        on_dark_placeholder: "#6c757d",
        on_light_placeholder: "#7e9cc7",
      },
      backgroundSize: {
        "200%": "200%",
        "100%": "100%",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
