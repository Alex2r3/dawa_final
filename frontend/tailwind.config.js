/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:       '#0f0f1a',
        surface:  '#1a1a2e',
        card:     '#16213e',
        border:   '#2a2a4a',
        primary:  '#6366f1',
        secondary:'#8b5cf6',
        accent:   '#f59e0b',
        success:  '#10b981',
        danger:   '#ef4444',
        warning:  '#f97316',
        muted:    '#94a3b8',
        text:     '#e2e8f0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'xp-fill':    'xpFill 1s ease-out',
        'bounce-in':  'bounceIn 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        'glow':       'glow 2s ease-in-out infinite alternate',
        'float':      'float 3s ease-in-out infinite',
        'shake':      'shake 0.4s ease-in-out',
      },
      keyframes: {
        xpFill:    { from: { width: '0%' }, to: { width: 'var(--xp-width)' } },
        bounceIn:  { '0%': { transform: 'scale(0.3)', opacity: 0 }, '50%': { transform: 'scale(1.05)' }, '70%': { transform: 'scale(0.9)' }, '100%': { transform: 'scale(1)', opacity: 1 } },
        glow:      { from: { boxShadow: '0 0 5px #6366f1' }, to: { boxShadow: '0 0 20px #6366f1, 0 0 40px #6366f1' } },
        float:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        shake:     { '0%,100%': { transform: 'translateX(0)' }, '20%': { transform: 'translateX(-8px)' }, '40%': { transform: 'translateX(8px)' }, '60%': { transform: 'translateX(-4px)' }, '80%': { transform: 'translateX(4px)' } },
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
}
