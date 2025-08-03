// tailwind.config.js
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'bg-dark': '#1f1f1f',
        'bg-card': '#2b2b2b',
        'accent': '#646cff',
      },
    },
  },
  plugins: [
  ],
}
