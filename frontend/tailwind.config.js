import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        customForest: {
          "color-scheme": "dark",
          "primary": "#13944b",
          "primary-content": "#000000",
          "secondary": "#25C13A",
          "accent": "#1DB8AB",
          "neutral": "#19362D",
          "base-100": "#171212",
          "--rounded-btn": "1.9rem",
        },
      },
    ],
  },
  plugins: [daisyui],
  theme: {
    extend: {
      spacing: {
        'nav': '10dvh',
        '10vh': '10dvh',
        '40vh': '40dvh',
        '80vh': '80dvh',
      }
    }
  },
}

