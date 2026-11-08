/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          950: '#1a040d',
          900: '#2b0716',
          DEFAULT: '#3B0A1E',
          800: '#4e0d27',
          700: '#64152D',
        },
        wine: {
          DEFAULT: '#64152D',
          light: '#7e1b38',
          dark: '#4c0f22',
        },
        champagne: {
          50: '#fbf8f0',
          100: '#f6f0de',
          200: '#eedfbc',
          300: '#e3ca95',
          DEFAULT: '#D6B779',
          500: '#caa05d',
          600: '#b2844a',
        },
        blush: {
          light: '#fdf3f5',
          DEFAULT: '#F4DCE2',
          dark: '#e8bdc7',
        },
        ivory: {
          DEFAULT: '#FFF8F0',
          pure: '#FFFFFF',
          dark: '#F5ECE1',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'serif'],
        handwritten: ['"Great Vibes"', 'cursive'],
        sans: ['"Montserrat"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(214, 183, 121, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 25px rgba(214, 183, 121, 0.8))' },
        }
      }
    },
  },
  plugins: [],
}

