import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'
import { useGsapEntrance, useGsapCounter } from '../hooks/useGsap'
import api from '../services/api'
import XPBar from '../components/ui/XPBar'
import SkeletonLoader from '../components/ui/SkeletonLoader'
import { useNavigate } from 'react-router-dom'
import { Zap, Globe, Trophy, TrendingUp, Swords, Star, ChevronRight } from 'lucide-react'

// XP thresholds for level progression
const LEVEL_XP = [0, 100, 250, 500, 800, 1200, 1800, 2500, 4000, 6000, 10000]
function xpForLevel(nivel)     { return LEVEL_XP[Math.min(nivel - 1, LEVEL_XP.length - 1)] ?? 0 }
function xpForNextLevel(nivel) { return LEVEL_XP[Math.min(nivel, LEVEL_XP.length - 1)] ?? LEVEL_XP[LEVEL_XP.length - 1] }

// Pixel section label component
function RpgLabel({ children }) {
  return (
    <div style={{
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '8px',
      color: 'rgb(var(--rpg-muted))',
      letterSpacing: '2px',
      marginBottom: 12,
      opacity: 0.8,
    }}>
      {children}
    </div>
  )
}

export default function Dashboard() {
  const { user }   = useAuth()
  const navigate   = useNavigate()
  const pageRef    = useGsapEntrance('.gsap-item')

  const { data: statsData,  isLoading: statsLoading  } = useQuery({
    queryKey: ['stats'],
    queryFn:  () => api.get('/stats').then(r => r.data),
  })
  const { data: worldsData, isLoading: worldsLoading } = useQuery({
    queryKey: ['worlds'],
    queryFn:  () => api.get('/worlds').then(r => r.data),
  })

  const xpRef    = useGsapCounter(user?.xp_total)
  const coinsRef = useGsapCounter(user?.monedas)

  const currentXP  = user?.xp_total  || 0
  const nivel      = user?.nivel      || 1
  const xpStart    = xpForLevel(nivel)
  const xpEnd      = xpForNextLevel(nivel)
  const xpProgress = currentXP - xpStart
  const xpNeeded   = xpEnd - xpStart
  const stats      = statsData || {}

  return (
    <div ref={pageRef} className="max-w-6xl mx-auto space-y-8">

      {/* ── HERO STATUS ── */}
      <div
        className="gsap-item relative overflow-hidden rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgb(var(--rpg-bg)) 0%, rgb(var(--rpg-surface)) 60%, rgb(var(--rpg-card)) 100%)',
          border: '1px solid rgb(var(--rpg-border))',
          boxShadow: '0 8px 40px rgba(0,0,0,0.2), 0 0 0 1px rgba(88,166,255,0.04) inset',
        }}
      >
        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)',
          zIndex: 1,
        }} />
        {/* Corner glows */}
        <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none" style={{
          background: 'radial-gradient(circle, rgba(88,166,255,0.07) 0%, transparent 70%)',
        }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none" style={{
          background: 'radial-gradient(circle, rgba(188,140,255,0.05) 0%, transparent 70%)',
        }} />

        <div className="relative z-10 p-6 md:p-8">
          <RpgLabel>── HERO STATUS ──</RpgLabel>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar with glow ring */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-2xl animate-rpg-pulse pointer-events-none" style={{
                boxShadow: '0 0 0 2px rgba(88,166,255,0.6), 0 0 20px rgba(88,166,255,0.2)',
                borderRadius: 16,
              }} />
              <img
                src={user?.avatar}
                alt={user?.username}
                className="relative w-20 h-20 rounded-2xl bg-card"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.2)', border: '2px solid rgb(var(--rpg-border))' }}
              />
              {/* LV badge */}
              <div
                className="absolute -bottom-2.5 -right-2.5 z-10 px-2 py-0.5 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, #58A6FF, #BC8CFF)',
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: '7px',
                  color: '#fff',
                  boxShadow: '0 2px 10px rgba(88,166,255,0.5)',
                  whiteSpace: 'nowrap',
                }}
              >
                LV{nivel}
              </div>
            </div>

            {/* Name + XP bar */}
            <div className="flex-1 min-w-0">
              <p className="mb-1" style={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: '7px',
                color: 'rgb(var(--rpg-muted))',
                letterSpacing: '1px',
              }}>
                AVENTURERO
              </p>
              <h1 className="text-3xl font-black text-text mb-3 truncate">{user?.username}</h1>
              <XPBar current={xpProgress} max={xpNeeded} level={nivel} />
            </div>

            {/* Counters */}
            <div className="flex gap-3 flex-shrink-0">
              <div className="text-center px-4 py-3 rounded-xl bg-card border border-border">
                <div ref={xpRef} className="text-2xl font-black text-accent">0</div>
                <p className="text-xs mt-0.5 text-muted">XP Total</p>
              </div>
              <div className="text-center px-4 py-3 rounded-xl bg-card border border-border">
                <div ref={coinsRef} className="text-2xl font-black text-yellow-400">0</div>
                <p className="text-xs mt-0.5 text-muted">Monedas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BATTLE STATS ── */}
      {statsLoading ? <SkeletonLoader count={4} /> : (
        <div className="gsap-item">
          <RpgLabel>── BATTLE STATS ──</RpgLabel>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Zap,        label: 'Preguntas',         value: stats.total_attempts   || 0, color: '#58A6FF', glow: '88,166,255'   },
              { icon: TrendingUp, label: 'Precisión',         value: `${stats.accuracy || 0}%`,  color: '#3FB950', glow: '63,185,80'    },
              { icon: Globe,      label: 'Niveles Superados', value: stats.levels_completed || 0, color: '#BC8CFF', glow: '188,140,255'  },
              { icon: Star,       label: 'Racha Máxima',      value: stats.max_streak       || 0, color: '#F78166', glow: '247,129,102'  },
            ].map(({ icon: Icon, label, value, color, glow }) => (
              <div
                key={label}
                className="relative overflow-hidden rounded-xl p-5"
                style={{
                  background: `linear-gradient(135deg, rgba(${glow},0.07) 0%, rgb(var(--rpg-card)) 100%)`,
                  border: `1px solid rgba(${glow},0.2)`,
                  boxShadow: `0 4px 20px rgba(${glow},0.06)`,
                }}
              >
                {/* Corner glow */}
                <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none" style={{
                  background: `radial-gradient(circle, rgba(${glow},0.12) 0%, transparent 70%)`,
                }} />
                <div className="relative z-10">
                  <div className="w-9 h-9 rounded-lg mb-3 flex items-center justify-center" style={{
                    background: `rgba(${glow},0.12)`,
                    border: `1px solid rgba(${glow},0.25)`,
                  }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div className="text-2xl font-black" style={{ color }}>{value}</div>
                  <p className="text-xs mt-1 text-muted">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MISSION BOARD ── */}
      <div className="gsap-item">
        <RpgLabel>── TABLÓN DE MISIONES ──</RpgLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Globe,  label: 'Explorar Mundos', desc: 'Elige tu próxima aventura',    path: '/worlds',       glow: '88,166,255',  grad: 'linear-gradient(135deg,#58A6FF,#BC8CFF)' },
            { icon: Trophy, label: 'Mis Logros',      desc: 'Ve tus logros desbloqueados',  path: '/achievements', glow: '227,179,65',  grad: 'linear-gradient(135deg,#F78166,#E3B341)' },
            { icon: Swords, label: 'Ranking Global',  desc: 'Compite con otros jugadores',  path: '/ranking',      glow: '188,140,255', grad: 'linear-gradient(135deg,#BC8CFF,#F85149)' },
          ].map(({ icon: Icon, label, desc, path, glow, grad }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="relative overflow-hidden rounded-xl p-5 text-left group transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgb(var(--rpg-card))',
                border: `1px solid rgba(${glow},0.2)`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = `0 8px 32px rgba(${glow},0.2), 0 4px 20px rgba(0,0,0,0.3)`
                e.currentTarget.style.border = `1px solid rgba(${glow},0.4)`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)'
                e.currentTarget.style.border = `1px solid rgba(${glow},0.2)`
              }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none" style={{
                background: `radial-gradient(circle, rgba(${glow},0.08) 0%, transparent 70%)`,
              }} />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 shadow-lg
                           group-hover:scale-110 transition-transform duration-200"
                style={{ background: grad }}
              >
                <Icon size={22} className="text-white" />
              </div>
              <h3 className="font-bold text-text text-sm mb-1">{label}</h3>
              <p className="text-xs mb-3 text-muted">{desc}</p>
              <div className="flex items-center gap-1 text-xs font-bold" style={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: '7px',
                color: `rgb(${glow})`,
                opacity: 0.8,
              }}>
                IR <ChevronRight size={10} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── REALM MAP ── */}
      {!worldsLoading && worldsData?.worlds?.length > 0 && (
        <div className="gsap-item relative">
          <div className="flex items-center justify-between mb-4">
            <RpgLabel>── REALM MAP ──</RpgLabel>
            <button
              onClick={() => navigate('/worlds')}
              className="text-primary text-xs hover:underline transition-all"
              style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '7px', letterSpacing: '1px' }}
            >
              VER TODO →
            </button>
          </div>
          <div className="glass-card p-6 overflow-hidden relative rpg-frame bg-surface mt-4" style={{ minHeight: '300px' }}>
            {/* Background elements */}
            <div className="absolute inset-0 opacity-30 stars-bg" />
            <div className="absolute inset-0 rpg-scanlines opacity-20 pointer-events-none" />

            {/* SVG Connecting Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <defs>
                <marker id="arrow-normal" viewBox="0 0 10 10" refX="5" refY="5"
                  markerWidth="5" markerHeight="5"
                  orient="auto-start-reverse">
                  <path d="M 0 2 L 8 5 L 0 8 z" fill="rgb(var(--rpg-border))" />
                </marker>
                <marker id="arrow-pulse" viewBox="0 0 10 10" refX="5" refY="5"
                  markerWidth="5" markerHeight="5"
                  orient="auto-start-reverse">
                  <path d="M 0 2 L 8 5 L 0 8 z" fill="rgb(var(--rpg-primary))" />
                </marker>
              </defs>
              <path
                d="M 100,150 Q 250,50 400,150 T 700,150"
                fill="none"
                stroke="var(--rpg-border)"
                strokeWidth="4"
                strokeDasharray="8 8"
                markerMid="url(#arrow-normal)"
                markerEnd="url(#arrow-normal)"
              />
              <path
                d="M 100,150 Q 250,50 400,150"
                fill="none"
                stroke="var(--rpg-primary)"
                strokeWidth="4"
                strokeDasharray="8 8"
                markerEnd="url(#arrow-pulse)"
                className="animate-pulse"
              />
            </svg>

            {/* Nodes */}
            <div className="relative z-10 w-full h-full flex items-center justify-around mt-8">
              {worldsData.worlds.slice(0, 4).map((world, i) => {
                const isUnlocked = i <= 2; // Mock logic, ideally based on user progress
                return (
                  <button
                    key={world.id}
                    onClick={() => navigate(`/worlds/${world.id}`)}
                    className="relative group transition-transform duration-300 hover:scale-110 flex flex-col items-center"
                    style={{
                      transform: `translateY(${i % 2 === 0 ? '-30px' : '30px'})`
                    }}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-xl border-4"
                      style={{
                        backgroundColor: isUnlocked ? 'var(--rpg-card)' : 'var(--rpg-bg)',
                        borderColor: isUnlocked ? world.color : 'var(--rpg-border)',
                        boxShadow: isUnlocked ? `0 0 20px ${world.color}80` : 'none',
                        filter: !isUnlocked ? 'grayscale(100%) opacity(0.5)' : 'none'
                      }}
                    >
                      {world.icono}
                    </div>
                    
                    {/* Tooltip-like label */}
                    <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-card px-2 py-1 rounded border text-xs font-bold pointer-events-none z-20" style={{ borderColor: world.color, color: 'var(--rpg-text)' }}>
                      Mundo {i+1}: {world.nombre}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
