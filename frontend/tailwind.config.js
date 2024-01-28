import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      "light", 
      "dark", 
      "cupcake",
      "forest",
      {
        mytheme: {
        
"primary": "#4ade80",
        
"secondary": "#86efac",
        
"accent": "#16a34a",
        
"neutral": "#1f2937",
        
"base-100": "#1f2937",
        
"info": "#facc15",
        
"success": "#0f766e",
        
"warning": "#831843",
        
"error": "#9f1239",
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

