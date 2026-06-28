import { useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { useGsapEntrance } from '../hooks/useGsap'
import api from '../services/api'
import LevelCard from '../components/cards/LevelCard'
import SkeletonLoader from '../components/ui/SkeletonLoader'
import { ChevronLeft, CheckCircle2, Swords } from 'lucide-react'

export default function Levels() {
  const { worldId } = useParams()
  const navigate    = useNavigate()
  const pageRef     = useGsapEntrance('.gsap-item')

  const { data: worldData } = useQuery({
    queryKey: ['world', worldId],
    queryFn:  () => api.get(`/worlds/${worldId}`).then(r => r.data),
  })

  const { data, isLoading } = useQuery({
    queryKey: ['levels', worldId],
    queryFn:  () => api.get(`/levels/world/${worldId}`).then(r => r.data),
  })

  const world     = worldData?.world
  const levels    = data?.levels || []
  const completed = levels.filter(l => l.progress?.completed).length
  const wColor    = world?.color || '#58A6FF'
  const pct       = levels.length > 0 ? (completed / levels.length) * 100 : 0

  return (
    <div ref={pageRef} className="max-w-3xl mx-auto">

      {/* Back button */}
      <button
        onClick={() => navigate('/worlds')}
        className="gsap-item flex items-center gap-2 text-muted hover:text-text transition-colors mb-6 group"
        style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px', letterSpacing: '0.5px' }}
      >
        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        ← VOLVER AL MAPA
      </button>

      {/* World header */}
      {world && (
        <div
          className="gsap-item relative overflow-hidden rounded-2xl p-6 mb-6"
          style={{
            background: `linear-gradient(135deg, rgba(${hexToRgb(wColor)},0.06) 0%, rgb(var(--rpg-bg)) 60%, rgb(var(--rpg-card)) 100%)`,
            border: `1px solid ${wColor}35`,
            boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(${hexToRgb(wColor)},0.06) inset`,
          }}
        >
          {/* Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none" style={{
            background: `radial-gradient(circle, ${wColor}12 0%, transparent 70%)`,
          }} />
          {/* Top accent */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent, ${wColor}80, transparent)` }}
          />

          <div className="relative z-10">
            {/* Pixel label */}
            <div style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '8px',
              color: wColor,
              letterSpacing: '2px',
              marginBottom: 16,
              opacity: 0.7,
            }}>
              ── QUEST LIST ──
            </div>

            <div className="flex items-center gap-4">
              {/* World icon */}
              <div
                className="text-5xl flex-shrink-0 animate-float"
                style={{ filter: `drop-shadow(0 0 12px ${wColor}60)` }}
              >
                {world.icono}
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-black text-text">{world.nombre}</h1>
                <p className="text-muted text-sm mt-1">{world.descripcion}</p>

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs text-muted">Progreso</span>
                    <span className="text-xs font-bold" style={{ color: completed === levels.length && levels.length > 0 ? '#3FB950' : wColor }}>
                      {completed} / {levels.length} completados
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgb(var(--rpg-border))' }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        background: pct === 100
                          ? 'linear-gradient(90deg, #3FB950, #58A6FF)'
                          : `linear-gradient(90deg, ${wColor}, ${wColor}90)`,
                        boxShadow: pct > 0 ? `0 0 8px ${wColor}60` : 'none',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Completed count badge */}
              <div className="text-center flex-shrink-0 px-4 py-3 rounded-xl" style={{
                background: completed === levels.length && levels.length > 0
                  ? 'rgba(63,185,80,0.1)' : 'rgb(var(--rpg-bg))',
                border: `1px solid ${completed === levels.length && levels.length > 0 ? 'rgba(63,185,80,0.3)' : 'rgb(var(--rpg-border))'}`,
              }}>
                <div className="text-2xl font-black" style={{
                  color: completed === levels.length && levels.length > 0 ? '#3FB950' : 'rgb(var(--rpg-muted))'
                }}>
                  {completed}
                </div>
                <p className="text-muted text-xs">/{levels.length}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quest list */}
      {isLoading ? <SkeletonLoader count={5} /> : (
        <div className="space-y-2.5">
          {levels.map((level, i) => (
            <div key={level.id} className="gsap-item">
              <LevelCard level={level} index={i} locked={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Helper: convert hex color to "r,g,b" string for rgba()
function hexToRgb(hex) {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.substring(0,2), 16)
  const g = parseInt(clean.substring(2,4), 16)
  const b = parseInt(clean.substring(4,6), 16)
  if (isNaN(r) || isNaN(g) || isNaN(b)) return '88,166,255'
  return `${r},${g},${b}`
}
