/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#F5F5F7',
        'text-primary': '#1D1D1F',
        'text-secondary': '#6E6E73',
        accent: '#0071E3',
        'difficulty-easy': '#34C759',
        'difficulty-medium': '#FF9500',
        'difficulty-hard': '#FF3B30',
        border: '#E5E5EA',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        pill: '20px',
      },
      spacing: {
        1: '8px',
        2: '16px',
        3: '24px',
        4: '32px',
        6: '48px',
        8: '64px',
      },
    },
  },
  plugins: [],
}

