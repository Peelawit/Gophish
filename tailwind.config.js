/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ms-blue': '#0078d4',
        'ms-gray': '#f2f2f2',
      },
      boxShadow: {
        'ms': '0 2px 6px rgba(0, 0, 0, 0.2)',
      },
      fontFamily: {
        sans: ['Segoe UI', 'Segoe UI Web (West European)'],
      },
    },
  },
  plugins: [],
} 