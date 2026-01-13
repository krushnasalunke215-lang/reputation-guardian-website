/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./privacy.html",
  ],
  theme: {
    extend: {
      colors: {
        'trust-blue': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af', // Primary Brand Color
          900: '#1e3a8a',
          950: '#172554',
        },
        'slate-brand': {
          800: '#0f172a', // Footer / Dark sections
          900: '#020617',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right bottom, #1e40af, #1e3a8a, #0f172a)',
        'mesh': 'radial-gradient(at 40% 20%, rgba(29, 78, 216, 0.1) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(14, 165, 233, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(29, 78, 216, 0.1) 0px, transparent 50%)',
      }
    },
  },
  plugins: [],
}
