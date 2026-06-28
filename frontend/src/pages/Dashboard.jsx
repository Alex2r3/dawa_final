import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'
import { useGsapEntrance, useGsapCounter } from '../hooks/useGsap'
import api from '../services/api'
import XPBar from '../components/ui/XPBar'
import SkeletonLoader from '../components/ui/SkeletonLoader'
import { useNavigate } from 'react-router-dom'
import { Zap, Globe, Trophy, TrendingUp, Swords, Star } from 'lucide-react'

// XP thresholds for level progression
const LEVEL_XP = [0, 100, 250, 500, 800, 1200, 1800, 2500, 4000, 6000, 10000]

function xpForLevel(nivel) {
  return LEVEL_XP[Math.min(nivel - 1, LEVEL_XP.length - 1)] ?? 0
}
function xpForNextLevel(nivel) {
  return LEVEL_XP[Math.min(nivel, LEVEL_XP.length - 1)] ?? LEVEL_XP[LEVEL_XP.length - 1]
}

export default function Dashboard() {
  const { user }   = useAuth()
  const navigate   = useNavigate()
  const pageRef    = useGsapEntrance('.gsap-item')

  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['stats'],
    queryFn:  () => api.get('/stats').then(r => r.data),
  })

  const { data: worldsData, isLoading: worldsLoading } = useQuery({
    queryKey: ['worlds'],
    queryFn:  () => api.get('/worlds').then(r => r.data),
  })

  const xpRef      = useGsapCounter(user?.xp_total)
  const coinsRef   = useGsapCounter(user?.monedas)

  const currentXP  = user?.xp_total  || 0
  const nivel      = user?.nivel      || 1
  const xpStart    = xpForLevel(nivel)
  const xpEnd      = xpForNextLevel(nivel)
  const xpProgress = currentXP - xpStart
  const xpNeeded   = xpEnd - xpStart

  const stats = statsData || {}

  return (
    <div ref={pageRef} className="max-w-6xl mx-auto space-y-8">

      {/* Hero welcome */}
      <div className="gsap-item glass-card p-8 relative overflow-hidden border border-primary/20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-transparent" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <img src={user?.avatar} alt={user?.username}
            className="w-20 h-20 rounded-2xl ring-4 ring-primary/40 shadow-lg shadow-primary/20" />
          <div className="flex-1">
            <p className="text-muted text-sm mb-1">¡Bienvenido de vuelta, héroe! 👾</p>
            <h1 className="text-3xl font-black text-white mb-3">{user?.username}</h1>
            <XPBar current={xpProgress} max={xpNeeded} level={nivel} />
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <div ref={xpRef} className="text-2xl font-black text-accent">0</div>
              <p className="text-muted text-xs">XP Total</p>
            </div>
            <div className="text-center">
              <div ref={coinsRef} className="text-2xl font-black text-yellow-400">0</div>
              <p className="text-muted text-xs">Monedas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      {statsLoading ? <SkeletonLoader count={4} /> : (
        <div className="gsap-item grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Zap,       label: 'Preguntas',          value: stats.total_attempts   || 0, color: 'text-primary' },
            { icon: TrendingUp,label: 'Precisión',           value: `${stats.accuracy || 0}%`, color: 'text-success' },
            { icon: Globe,     label: 'Niveles completados', value: stats.levels_completed || 0, color: 'text-secondary' },
            { icon: Star,      label: 'Racha máxima',        value: stats.max_streak       || 0, color: 'text-accent' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="stat-card hover:border-primary/30 transition-colors">
              <Icon size={20} className={color} />
              <div className={`text-2xl font-black ${color}`}>{value}</div>
              <p className="text-muted text-xs">{label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Quick actions */}
      <div className="gsap-item">
        <h2 className="text-lg font-bold text-white mb-4">Continúa jugando</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Globe,  label: 'Explorar Mundos', desc: 'Elige tu próxima aventura',     path: '/worlds',       color: 'from-primary to-secondary' },
            { icon: Trophy, label: 'Mis Logros',      desc: 'Ve tus logros desbloqueados',   path: '/achievements', color: 'from-accent to-warning' },
            { icon: Swords, label: 'Ranking Global',  desc: 'Compite con otros jugadores',   path: '/ranking',      color: 'from-secondary to-pink-500' },
          ].map(({ icon: Icon, label, desc, path, color }) => (
            <button key={path} onClick={() => navigate(path)}
              className="glass-card p-5 text-left group hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon size={22} className="text-white" />
              </div>
              <h3 className="font-bold text-white text-sm">{label}</h3>
              <p className="text-muted text-xs mt-0.5">{desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent worlds */}
      {!worldsLoading && worldsData?.worlds?.length > 0 && (
        <div className="gsap-item">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Mundos disponibles</h2>
            <button onClick={() => navigate('/worlds')} className="text-primary text-sm hover:underline">Ver todos →</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {worldsData.worlds.slice(0, 5).map(w => (
              <button key={w.id} onClick={() => navigate(`/worlds/${w.id}`)}
                className="glass-card p-4 text-center group hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{w.icono}</div>
                <p className="text-xs font-semibold text-text truncate">{w.nombre}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
