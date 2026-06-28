import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { Timer as TimerIcon, AlertTriangle } from 'lucide-react'

const DIFFICULTY_TIME = {
  facil:   60,
  medio:   45,
  dificil: 30,
  experto: 20,
  leyenda: 15,
}

export default function Timer({ dificultad = 'facil', onExpire, running = true }) {
  const limit     = DIFFICULTY_TIME[dificultad] ?? 60
  const [time, setTime] = useState(limit)
  const intervalRef = useRef(null)
  const barRef      = useRef(null)
  const numRef      = useRef(null)

  // Animate bar shrinking with GSAP
  useEffect(() => {
    if (!running || !barRef.current) return
    gsap.fromTo(barRef.current,
      { width: '100%' },
      { width: '0%', duration: limit, ease: 'none' }
    )
    gsap.fromTo(barRef.current,
      { backgroundColor: '#10b981' },
      { backgroundColor: '#ef4444', duration: limit, ease: 'none' }
    )
  }, [running, limit])

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setTime(t => {
        if (t <= 1) {
          clearInterval(intervalRef.current)
          onExpire?.()
          return 0
        }
        // Urgency shake when < 10s
        if (t === 10 && numRef.current) {
          gsap.fromTo(numRef.current,
            { scale: 1 },
            { scale: 1.3, duration: 0.15, yoyo: true, repeat: 3, ease: 'power2.inOut' }
          )
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [running])

  const pct = (time / limit) * 100
  const isUrgent = pct < 30

  return (
    <div className={`flex flex-col gap-1.5 ${isUrgent ? 'animate-pulse' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {isUrgent ? (
            <AlertTriangle size={15} className="text-danger" />
          ) : (
            <TimerIcon size={15} className="text-muted" />
          )}
          <span className="text-xs text-muted font-medium">Tiempo</span>
        </div>
        <span
          ref={numRef}
          className={`text-lg font-black tabular-nums ${isUrgent ? 'text-danger' : 'text-text'}`}
        >
          {time}s
        </span>
      </div>
      <div className="h-2 w-full bg-border rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{ width: '100%', backgroundColor: '#10b981' }}
        />
      </div>
    </div>
  )
}
