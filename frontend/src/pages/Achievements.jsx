import { useQuery } from '@tanstack/react-query'
import { useGsapEntrance } from '../hooks/useGsap'
import api from '../services/api'
import SkeletonLoader from '../components/ui/SkeletonLoader'
import { Trophy, Lock, Zap } from 'lucide-react'

export default function Achievements() {
  const pageRef = useGsapEntrance('.gsap-item')

  const { data, isLoading } = useQuery({
    queryKey: ['achievements'],
    queryFn:  () => api.get('/achievements').then(r => r.data),
  })

  const achievements  = data?.achievements || []
  const unlockedCount = achievements.filter(a => a.unlocked).length

  return (
    <div ref={pageRef} className="max-w-5xl mx-auto space-y-6">

      {/* ── HEADER ── */}
      <div
        className="gsap-item relative overflow-hidden rounded-2xl p-6"
        style={{
          background: 'linear-gradient(135deg, rgba(227,179,65,0.07) 0%, rgb(var(--rpg-bg)) 50%, rgb(var(--rpg-card)) 100%)',
          border: '1px solid rgba(227,179,65,0.2)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        }}
      >
        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)',
        }} />
        <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none" style={{
          background: 'radial-gradient(circle, rgba(227,179,65,0.1) 0%, transparent 70%)',
        }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, rgba(227,179,65,0.8), transparent)' }}
        />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            {/* Pixel label */}
            <div style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '8px',
              color: '#E3B341',
              letterSpacing: '2px',
              marginBottom: 12,
              opacity: 0.8,
            }}>
              ── TROPHY ROOM ──
            </div>
            <h1 className="text-2xl font-black text-text flex items-center gap-3">
              <Trophy style={{ color: '#E3B341' }} size={26} />
              Logros y Conquistas
            </h1>
            <p className="text-muted text-sm mt-1">Completa desafíos para desbloquear recompensas exclusivas.</p>
          </div>

          {/* Progress counter */}
          <div className="px-5 py-3 rounded-xl flex-shrink-0" style={{
            background: 'rgba(227,179,65,0.08)',
            border: '1px solid rgba(227,179,65,0.25)',
          }}>
            <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '7px', color: '#8B949E', letterSpacing: '1px', marginBottom: 4 }}>
              PROGRESO
            </div>
            <div className="text-2xl font-black" style={{ color: '#E3B341' }}>
              {unlockedCount}
              <span className="text-muted text-base font-semibold"> / {achievements.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── ACHIEVEMENT GRID ── */}
      {isLoading ? <SkeletonLoader count={6} /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map(ach => (
            <div
              key={ach.id}
              className={`gsap-item relative overflow-hidden rounded-xl flex gap-4 p-5 transition-all duration-300 group
                ${ach.unlocked ? 'hover:-translate-y-0.5' : 'opacity-55'}`}
              style={{
                background: ach.unlocked
                  ? 'linear-gradient(135deg, rgba(227,179,65,0.07) 0%, rgb(var(--rpg-card)) 100%)'
                  : 'rgb(var(--rpg-card))',
                border: ach.unlocked
                  ? '1px solid rgba(227,179,65,0.25)'
                  : '1px solid rgb(var(--rpg-border))',
                boxShadow: ach.unlocked ? '0 4px 20px rgba(227,179,65,0.06)' : 'none',
              }}
            >
              {/* Gold shimmer on unlocked */}
              {ach.unlocked && (
                <div
                  className="absolute top-0 left-0 right-0 pointer-events-none"
                  style={{ height: 1.5, background: 'linear-gradient(90deg, transparent, rgba(227,179,65,0.7), transparent)' }}
                />
              )}
              {ach.unlocked && (
                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full pointer-events-none" style={{
                  background: 'rgba(227,179,65,0.08)',
                  filter: 'blur(16px)',
                }} />
              )}

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 relative"
                style={{
                  background: ach.unlocked ? 'rgba(227,179,65,0.12)' : 'rgb(var(--rpg-border))',
                  border: ach.unlocked ? '1.5px solid rgba(227,179,65,0.35)' : '1px solid rgb(var(--rpg-border))',
                  boxShadow: ach.unlocked ? '0 0 16px rgba(227,179,65,0.15)' : 'none',
                }}
              >
                {ach.icono}
                {!ach.unlocked && (
                  <div className="absolute -bottom-1 -right-1 p-1 rounded-md" style={{
                    background: 'rgb(var(--rpg-bg))',
                    border: '1px solid rgb(var(--rpg-border))',
                  }}>
                    <Lock size={10} className="text-muted" />
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-sm text-text truncate">{ach.nombre}</h3>
                  {ach.unlocked_at && (
                    <span className="text-[10px] text-muted font-mono whitespace-nowrap">
                      {new Date(ach.unlocked_at).toLocaleDateString('es-ES')}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted leading-relaxed line-clamp-2">{ach.descripcion}</p>

                {/* Rewards */}
                <div className="flex gap-3 pt-1">
                  {ach.xp_bonus > 0 && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold" style={{ color: '#F78166' }}>
                      <Zap size={10} /> +{ach.xp_bonus} XP
                    </span>
                  )}
                  {ach.monedas_bonus > 0 && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-yellow-400">
                      🪙 +{ach.monedas_bonus}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
