/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // brand palette
        brand: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          950: '#2E1065',
        },
        neon: {
          purple: '#C084FC',
          violet: '#A855F7',
          indigo: '#818CF8',
        },
        surface: {
          0: '#0A0514',
          1: '#0F0A1F',
          2: '#15102A',
          3: '#1B1638',
          4: '#241B45',
        },
        ink: {
          0: '#FFFFFF',
          1: '#E9E4FF',
          2: '#B9B1D6',
          3: '#8A82A8',
          4: '#5A5378',
        },
      },
      backgroundImage: {
        'aurora':
          'radial-gradient(1200px 600px at 20% 10%, rgba(124,58,237,0.35), transparent 60%), radial-gradient(900px 500px at 80% 20%, rgba(168,85,247,0.28), transparent 60%), radial-gradient(700px 500px at 50% 100%, rgba(99,102,241,0.25), transparent 60%)',
        'grid-fade':
          'linear-gradient(to bottom, rgba(10,5,20,0) 0%, rgba(10,5,20,0.9) 100%)',
        'noise':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.55 0 0 0 0 0.3 0 0 0 0 0.9 0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(139,92,246,0.35)',
        'glow': '0 10px 60px rgba(124,58,237,0.35)',
        'glow-lg': '0 20px 120px rgba(124,58,237,0.45)',
        'inset-glow': 'inset 0 0 40px rgba(139,92,246,0.12)',
        'card': '0 10px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-20px) translateX(10px)' },
        },
        floatSlow: {
          '0%,100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-30px) scale(1.05)' },
        },
        auroraShift: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        pulseSoft: {
          '0%,100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        gradientText: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        floatSlow: 'floatSlow 12s ease-in-out infinite',
        aurora: 'auroraShift 18s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        pulseSoft: 'pulseSoft 3s ease-in-out infinite',
        spinSlow: 'spinSlow 20s linear infinite',
        gradientText: 'gradientText 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
