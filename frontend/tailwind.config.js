/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-app': '#FBFBF9',
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#F4F5F0',
        'text-primary': '#171717',
        'text-secondary': '#666666',
        accent: '#16793A',
        'accent-hover': '#115d2c',
        'accent-light': '#E8F3EB',
        'difficulty-easy': '#22C55E',
        'difficulty-medium': '#F59E0B',
        'difficulty-hard': '#EF4444',
        border: '#EBEBEB',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        pill: '9999px',
        lg: '12px',
      },
      boxShadow: {
        'card': '0px 2px 8px rgba(0, 0, 0, 0.04)',
        'card-hover': '0px 4px 16px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}

