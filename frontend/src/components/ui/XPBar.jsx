import { useEffect, useRef } from 'react'
import { useGsapXPBar } from '../../hooks/useGsap'

export default function XPBar({ current, max, level }) {
  const percent = max > 0 ? Math.min((current / max) * 100, 100) : 0
  const barRef  = useGsapXPBar(percent)

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-muted font-medium">Nivel {level}</span>
        <span className="text-xs text-accent font-bold">{current.toLocaleString()} / {max.toLocaleString()} XP</span>
      </div>
      <div className="h-2.5 w-full bg-border rounded-full overflow-hidden relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 animate-pulse" />
        <div
          ref={barRef}
          style={{ width: '0%' }}
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
        >
          {/* Shine */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full" />
        </div>
      </div>
    </div>
  )
}
