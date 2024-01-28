import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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

