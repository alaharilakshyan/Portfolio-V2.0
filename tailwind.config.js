/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins, var(--font-geist-sans))', 'sans-serif'],
        heading: ['var(--font-geist-sans, sans-serif)'],
        mono: ['var(--font-geist-mono, monospace)'],
      },
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          hover: '#2563eb',
        },
        gray: {
          100: '#f3f4f6',
          300: '#d1d5db',
          800: '#1f2937',
          900: '#111827',
        },
        red: {
          500: '#ef4444',
          600: '#dc2626',
        },
      },
    },
  },
  plugins: [],
}
