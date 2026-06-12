/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          base: '#242628',
          raised: '#2C2F32',
          overlay: '#343739',
          border: 'rgba(255,255,255,0.07)',
        },
        text: {
          primary: '#E8E4DF',
          muted: '#8A8580',
          faint: '#4A4744',
        },
        accent: {
          DEFAULT: '#8B2635',
          dim: 'rgba(139,38,53,0.12)',
          light: '#A63344',
        },
        amber: {
          fill: 'rgba(180,120,40,0.15)',
          text: '#B47828',
        },
      },
      fontFamily: {
        primary: ['Satoshi', 'sans-serif'],
        accent: ['Recoleta', 'serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
    },
  },
  plugins: [],
};
