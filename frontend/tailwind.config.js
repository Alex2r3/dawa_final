/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── Dark/Light Theme RPG Palette ─────────────────────────────
        bg:        'rgb(var(--rpg-bg) / <alpha-value>)',
        surface:   'rgb(var(--rpg-surface) / <alpha-value>)',
        card:      'rgb(var(--rpg-card) / <alpha-value>)',
        border:    'rgb(var(--rpg-border) / <alpha-value>)',
        primary:   'rgb(var(--rpg-primary) / <alpha-value>)',
        secondary: 'rgb(var(--rpg-secondary) / <alpha-value>)',
        accent:    'rgb(var(--rpg-accent) / <alpha-value>)',
        success:   'rgb(var(--rpg-success) / <alpha-value>)',
        danger:    'rgb(var(--rpg-danger) / <alpha-value>)',
        warning:   'rgb(var(--rpg-warning) / <alpha-value>)',
        muted:     'rgb(var(--rpg-muted) / <alpha-value>)',
        text:      'rgb(var(--rpg-text) / <alpha-value>)',
      },
      fontFamily: {
        sans:  ['Nunito', 'Inter', 'system-ui', 'sans-serif'],
        mono:  ['Fira Code', 'monospace'],
        pixel: ['"Press Start 2P"', 'monospace'],
      },
      animation: {
        'xp-fill':    'xpFill 1s ease-out',
        'bounce-in':  'bounceIn 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        'glow':       'glow 2s ease-in-out infinite alternate',
        'float':      'float 3s ease-in-out infinite',
        'shake':      'shake 0.4s ease-in-out',
        'rpg-pulse':  'rpgPulse 2s ease-in-out infinite',
      },
      keyframes: {
        xpFill:    { from: { width: '0%' }, to: { width: 'var(--xp-width)' } },
        bounceIn:  { '0%': { transform: 'scale(0.3)', opacity: 0 }, '50%': { transform: 'scale(1.05)' }, '70%': { transform: 'scale(0.9)' }, '100%': { transform: 'scale(1)', opacity: 1 } },
        glow:      { from: { boxShadow: '0 0 5px #58A6FF' }, to: { boxShadow: '0 0 20px #58A6FF, 0 0 40px #58A6FF' } },
        float:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        shake:     { '0%,100%': { transform: 'translateX(0)' }, '20%': { transform: 'translateX(-8px)' }, '40%': { transform: 'translateX(8px)' }, '60%': { transform: 'translateX(-4px)' }, '80%': { transform: 'translateX(4px)' } },
        rpgPulse:  { '0%,100%': { opacity: 1, transform: 'scale(1)' }, '50%': { opacity: 0.75, transform: 'scale(0.97)' } },
      },
      backdropBlur: { xs: '2px' },
      boxShadow: {
        'rpg':      '0 0 0 2px #30363D, 0 4px 16px rgba(0,0,0,0.5)',
        'rpg-blue': '0 0 0 2px #30363D, 0 4px 20px rgba(88,166,255,0.25)',
        'rpg-purple':'0 0 0 2px #30363D, 0 4px 20px rgba(188,140,255,0.25)',
      },
    },
  },
  plugins: [],
}
