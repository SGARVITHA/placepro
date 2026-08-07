/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--color-bg-primary)',
        'bg-secondary': 'var(--color-bg-secondary)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'accent': 'var(--color-accent)',
        'difficulty-easy': 'var(--color-difficulty-easy)',
        'difficulty-medium': 'var(--color-difficulty-medium)',
        'difficulty-hard': 'var(--color-difficulty-hard)',
        'border-custom': 'var(--color-border)',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Inter"', 'sans-serif'],
      },
      borderRadius: {
        'card': 'var(--radius-card)',
        'pill': 'var(--radius-pill)',
      },
      spacing: {
        'unit': 'var(--spacing-unit)',
      },
    },
  },
  plugins: [],
}
