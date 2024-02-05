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
          "neutral-content": "#FFFFFF",
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
        '10vh': '10vh',
        '30vh': '30vh',
        '40vh': '40vh',
        'max-card-h': '38vh',
        '60vh': '60vh',
        '70vh': '70vh',
        '80vh': '80vh',
        '90vh': '90vh',
        'vh': '100vh',
        'nav-h': '10vh',
        'nav-icon-h': '8vh',
        'screen-h': '90vh',
        '40vw': '40vw',
        'max-card-w': '38vh',
      }
    }
  },
}

