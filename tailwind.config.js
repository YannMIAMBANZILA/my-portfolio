module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F172A', // Dark slate/blue
        primary: '#F97316', // Orange
        'text-main': '#F3F4F6', // Light gray/white
        'text-muted': '#9CA3AF', // Muted gray
        'card-bg': '#1E293B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Assuming Inter is available or fallback
      }
    },
  },
  plugins: [],
}
