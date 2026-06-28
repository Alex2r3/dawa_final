import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'
import { useGsapEntrance } from '../hooks/useGsap'
import api from '../services/api'
import SkeletonLoader from '../components/ui/SkeletonLoader'
import { User, Calendar, Zap, Trophy, Award, BarChart2 } from 'lucide-react'

export default function Profile() {
  const { user } = useAuth()
  const pageRef  = useGsapEntrance('.gsap-item')

  const { data: statsData,        isLoading: statsLoading } = useQuery({
    queryKey: ['stats'],
    queryFn:  () => api.get('/stats').then(r => r.data),
  })
  const { data: achievementsData, isLoading: achsLoading  } = useQuery({
    queryKey: ['achievements'],
    queryFn:  () => api.get('/achievements').then(r => r.data),
  })

  const stats               = statsData || {}
  const achievements        = achievementsData?.achievements || []
  const unlockedAchievements = achievements.filter(a => a.unlocked)
  const nivel               = user?.nivel || 1

  return (
    <div ref={pageRef} className="max-w-4xl mx-auto space-y-6">

      {/* ── ADVENTURER CARD ── */}
      <div
        className="gsap-item relative overflow-hidden rounded-2xl p-6 md:p-8"
        style={{
          background: 'linear-gradient(135deg, rgba(88,166,255,0.06) 0%, rgb(var(--rpg-surface)) 50%, rgba(188,140,255,0.04) 100%)',
          border: '1px solid rgb(var(--rpg-border))',
          boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)',
        }} />
        <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none" style={{
          background: 'radial-gradient(circle, rgba(88,166,255,0.07) 0%, transparent 70%)',
        }} />

        <div className="relative z-10">
          {/* Pixel label */}
          <div style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '8px', color: '#58A6FF', letterSpacing: '2px', marginBottom: 20, opacity: 0.8,
          }}>
            ── ADVENTURER CARD ──
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-3xl animate-rpg-pulse pointer-events-none" style={{
                boxShadow: '0 0 0 2px rgba(88,166,255,0.5), 0 0 24px rgba(88,166,255,0.15)',
                borderRadius: 24,
              }} />
              <img
                src={user?.avatar}
                alt={user?.username}
                className="w-24 h-24 rounded-3xl relative"
                style={{ border: '2px solid rgb(var(--rpg-border))', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
              />
              {/* Level badge */}
              <div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, #58A6FF, #BC8CFF)',
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: '7px',
                  color: '#fff',
                  boxShadow: '0 2px 12px rgba(88,166,255,0.5)',
                }}
              >
                LV {nivel}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-2 pt-2">
              <h1 className="text-3xl font-black text-text">{user?.username}</h1>
              <p className="text-muted text-sm flex items-center justify-center md:justify-start gap-1.5">
                <User size={14} /> {user?.email}
              </p>
              {user?.created_at && (
                <p className="text-muted text-xs flex items-center justify-center md:justify-start gap-1.5">
                  <Calendar size={14} />
                  Miembro desde: {new Date(user.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              )}
            </div>

            {/* Stats chips */}
            <div className="flex gap-3 flex-shrink-0">
              <div className="text-center px-4 py-3 rounded-xl" style={{
                background: 'rgba(88,166,255,0.08)', border: '1px solid rgba(88,166,255,0.2)',
              }}>
                <span className="text-[9px] block mb-1 text-muted" style={{ fontFamily: '"Press Start 2P"' }}>NIVEL</span>
                <span className="text-2xl font-black text-primary">{nivel}</span>
              </div>
              <div className="text-center px-4 py-3 rounded-xl" style={{
                background: 'rgba(227,179,65,0.08)', border: '1px solid rgba(227,179,65,0.2)',
              }}>
                <span className="text-[9px] block mb-1 text-muted" style={{ fontFamily: '"Press Start 2P"' }}>MONEDAS</span>
                <span className="text-2xl font-black text-yellow-400">🪙 {user?.monedas || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Stats column */}
        <div className="gsap-item md:col-span-1">
          <div className="relative overflow-hidden rounded-xl p-6 space-y-4 bg-card border border-border">
            <h2 className="font-bold text-text flex items-center gap-2 pb-3" style={{
              borderBottom: '1px solid rgb(var(--rpg-border))',
            }}>
              <BarChart2 size={18} style={{ color: '#58A6FF' }} />
              <span>Estadísticas</span>
            </h2>

            {statsLoading ? <SkeletonLoader count={3} /> : (
              <div className="space-y-3">
                {[
                  { label: 'Intentos Totales',     value: stats.total_attempts   || 0, color: '#58A6FF' },
                  { label: 'Respuestas Correctas', value: stats.correct_attempts || 0, color: '#3FB950' },
                  { label: 'Precisión General',    value: `${stats.accuracy || 0}%`,   color: '#3FB950' },
                  { label: 'Racha Actual',          value: `${stats.current_streak || 0} 🔥`, color: '#F85149' },
                  { label: 'Racha Máxima',          value: `${stats.max_streak || 0} ⚡`,     color: '#E3B341' },
                  { label: 'Niveles Jugados',       value: stats.levels_completed || 0, color: '#BC8CFF' },
                ].map(({ label, value, color }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center text-sm pb-2"
                    style={{ borderBottom: '1px solid rgb(var(--rpg-border) / 0.5)' }}
                  >
                    {/* Left accent bar */}
                    <div className="flex items-center gap-2">
                      <div className="w-0.5 h-4 rounded-full" style={{ background: color }} />
                      <span className="text-muted font-medium">{label}</span>
                    </div>
                    <span className="font-black text-sm" style={{ color }}>{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Achievements column */}
        <div className="gsap-item md:col-span-2">
          <div className="relative overflow-hidden rounded-xl p-6 space-y-4 bg-card border border-border">
            <h2 className="font-bold text-text flex items-center gap-2 pb-3" style={{
              borderBottom: '1px solid rgb(var(--rpg-border))',
            }}>
              <Award size={18} style={{ color: '#E3B341' }} />
              Logros Recientes ({unlockedAchievements.length})
            </h2>

            {achsLoading ? <SkeletonLoader count={4} /> : (
              unlockedAchievements.length === 0 ? (
                <div className="text-center py-8 text-muted text-sm space-y-3">
                  <Trophy size={36} className="mx-auto opacity-20" />
                  <p>Aún no has desbloqueado ningún logro.</p>
                  <p className="text-xs">¡Sigue completando niveles para desbloquear el primero!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {unlockedAchievements.slice(0, 6).map(ach => (
                    <div
                      key={ach.id}
                      className="flex items-center gap-3 p-3.5 rounded-xl"
                      style={{
                        background: 'rgba(227,179,65,0.06)',
                        border: '1px solid rgba(227,179,65,0.2)',
                      }}
                    >
                      <span className="text-2xl">{ach.icono}</span>
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs text-text truncate">{ach.nombre}</h4>
                        <p className="text-[10px] text-muted line-clamp-1">{ach.descripcion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
