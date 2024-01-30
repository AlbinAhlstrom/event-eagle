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
          "primary": "#1eb854",
          "primary-content": "#000000",
          "secondary": "#25C13A",
          "accent": "#1DB8AB",
          "neutral": "#19362D",
          "base-100": "#171212",
          "--rounded-btn": "1.9rem",
        },
        forest: {
          "color-scheme": "dark",
          "primary": "#1eb854",
          "primary-content": "#000000",
          "secondary": "#1DB88E",
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
        '10vh': '10svh',
        '40vh': '40svh',
        '80vh': '80svh',
        '90vh': '90svh',
        'svh': '100svh',
        'nav-h': '10svh',
        'nav-icon-h': '8svh',
        'screen-h': '90svh',
      }
    }
  },
}

