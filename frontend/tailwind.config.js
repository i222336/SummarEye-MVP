/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          green: '#00ff41',
          dim: '#00cc33',
          dark: '#003300',
          bg: '#0a0a0a',
          panel: '#111111',
          border: '#1a3a1a',
        },
        hacker: {
          red: '#ff0040',
          yellow: '#ffcc00',
          cyan: '#00ffff',
          black: '#000000',
        }
      },
      fontFamily: {
        mono: ['"Fira Code"', 'Consolas', 'Monaco', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'typewriter': 'typewriter 3s steps(40) 1s 1 normal both',
        'blink-caret': 'blink-caret 0.75s step-end infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0,255,65,0.3), 0 0 10px rgba(0,255,65,0.1)' },
          '50%': { boxShadow: '0 0 15px rgba(0,255,65,0.5), 0 0 30px rgba(0,255,65,0.2)' },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'typewriter': {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#00ff41' },
        },
      },
    },
  },
  plugins: [],
}
