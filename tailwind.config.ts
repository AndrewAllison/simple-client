import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // darkMode: ['class', '[data-mode="dark"]'],
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui")
  ],
  theme: {
    extend: { }
  },
  daisyui: {
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    themes: [
      {
        darkTheme: {
          "primary": "#ff558f",
          "secondary": "#005ed0",
          // "secondary": "#00f2ff",
          "accent": "#46eec2",
          "neutral": "#fff",
          "base-100": "#2a3f66",
        },
        lightTheme: {
          "primary-content": "#2a3f66",
          "primary": "white",
          "secondary": "#0f766e",
          "base-100": "#fff"
        },
      },
    ],
  },
}
export default config
