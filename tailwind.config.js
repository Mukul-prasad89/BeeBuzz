/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        honey: {
          50:  '#FFF8EC',
          100: '#FDEFD3',
          200: '#FBE0A8',
          300: '#F7C873',
          400: '#F5AD3D',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        charcoal: {
          50:  '#F5F5F4',
          100: '#E7E5E4',
          200: '#D6D3D1',
          300: '#A8A29E',
          400: '#78716C',
          500: '#57534E',
          600: '#44403C',
          700: '#292524',
          800: '#1C1917',
          900: '#0C0A09',
        },
        success: '#16A34A',
        warning: '#F59E0B',
        danger:  '#DC2626',
      },
      fontFamily: {
        heading: ['Sora', 'Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        brand: ['Fredoka', 'Sora', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(28,25,23,0.08)',
        'card-hover': '0 4px 12px rgba(28,25,23,0.12)',
      },
      borderRadius: {
        'card': '12px',
        'btn': '10px',
      },
      maxWidth: {
        'content': '1200px',
      },
    },
  },
  plugins: [],
}
