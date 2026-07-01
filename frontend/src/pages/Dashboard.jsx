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

function calculateLevelFromXP(xp) {
  for (let i = LEVEL_XP.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_XP[i]) return i + 1;
  }
  return 1;
}

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
  const nivel      = calculateLevelFromXP(currentXP) // Calcula el nivel real basado en el XP
  const xpStart    = xpForLevel(nivel)
  const xpEnd      = xpForNextLevel(nivel)
  const xpProgress = Math.max(0, currentXP - xpStart)
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
        <div className="gsap-item relative mt-8">
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
          <div className="glass-card p-6 overflow-hidden relative rpg-frame bg-surface mt-4" style={{ minHeight: '520px' }}>
            {/* Background elements */}
            <div className="absolute inset-0 opacity-30 stars-bg" />
            <div className="absolute inset-0 rpg-scanlines opacity-20 pointer-events-none" />

            {/* Duolingo Path Column */}
            <div className="relative mx-auto w-full max-w-[360px] min-h-[440px] flex flex-col justify-between py-10" style={{ zIndex: 10 }}>
              
              {/* SVG Connecting Path */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                {/* Background Curvy Path (Grey / Inactive) */}
                <path
                  d="M 135,50 C 135,110 180,100 180,160 C 180,220 225,210 225,270 C 225,330 180,320 180,380"
                  fill="none"
                  stroke="var(--rpg-border)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                
                {/* Unlocked Active Path (Glow / Colored) */}
                <path
                  d="M 135,50 C 135,110 180,100 180,160 C 180,220 225,210 225,270"
                  fill="none"
                  stroke="rgb(var(--rpg-primary))"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="4 8"
                  style={{
                    animation: 'rpg-dash-flow 2s linear infinite'
                  }}
                />
              </svg>

              {/* Nodes Stack */}
              {worldsData.worlds.slice(0, 4).map((world, i) => {
                // Mock progress and unlock state
                // World 0 (i=0): 100% complete
                // World 1 (i=1): 60% complete
                // World 2 (i=2): 15% complete (current active)
                // World 3 (i=3): Locked
                const isUnlocked = i <= 2;
                const isCurrentActive = i === 2;
                const progress = i === 0 ? 1.0 : i === 1 ? 0.6 : i === 2 ? 0.15 : 0.0;
                
                // Alignment offset matching the curves
                const getLeftStyle = (index) => {
                  const positions = ['calc(50% - 95px)', 'calc(50% - 40px)', 'calc(50% + 15px)', 'calc(50% - 40px)'];
                  return positions[index % 4];
                };

                const radius = 32;
                const strokeWidth = 5;
                const circumference = 2 * Math.PI * radius;
                const strokeDashoffset = circumference * (1 - progress);

                return (
                  <div
                    key={world.id}
                    className="relative flex justify-center w-full z-10"
                    style={{
                      height: '80px',
                    }}
                  >
                    <div
                      className="absolute"
                      style={{
                        left: getLeftStyle(i),
                        top: '0px',
                      }}
                    >
                      {/* Circle progress wrapper */}
                      <div className="relative w-20 h-20 flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                          <circle
                            cx="40"
                            cy="40"
                            r={radius}
                            className="stroke-border/20 fill-none"
                            strokeWidth={strokeWidth}
                          />
                          {isUnlocked && (
                            <circle
                              cx="40"
                              cy="40"
                              r={radius}
                              className="fill-none transition-all duration-500"
                              style={{
                                stroke: world.color || 'rgb(var(--rpg-primary))',
                                strokeWidth: strokeWidth,
                                strokeDasharray: circumference,
                                strokeDashoffset: strokeDashoffset,
                                strokeLinecap: 'round',
                                filter: isCurrentActive ? `drop-shadow(0 0 6px ${world.color})` : 'none',
                              }}
                            />
                          )}
                        </svg>

                        {/* Duolingo style 3D Bubble Button */}
                        <button
                          onClick={() => navigate(`/worlds/${world.id}`)}
                          disabled={!isUnlocked}
                          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-black relative transition-all duration-150 active:translate-y-[3px] active:border-b-[3px] hover:brightness-110"
                          style={{
                            backgroundColor: isUnlocked ? 'var(--rpg-card)' : 'var(--rpg-bg)',
                            border: `3px solid ${isUnlocked ? (world.color || 'rgb(var(--rpg-primary))') : 'var(--rpg-border)'}`,
                            borderBottomWidth: isUnlocked ? '6px' : '3px',
                            boxShadow: isUnlocked ? `0 4px 0 rgba(0,0,0,0.15)` : 'none',
                            transform: isCurrentActive ? 'scale(1.08)' : 'none',
                            cursor: isUnlocked ? 'pointer' : 'not-allowed',
                            filter: !isUnlocked ? 'grayscale(100%) opacity(0.5)' : 'none',
                          }}
                          title={world.nombre}
                        >
                          {isCurrentActive && (
                            <span className="absolute -top-3 px-1.5 py-0.5 bg-accent text-white text-[6px] rounded-full font-black border border-white animate-bounce" style={{ fontFamily: '"Press Start 2P", monospace' }}>
                              AQUÍ
                            </span>
                          )}
                          <span className="relative z-10">{isUnlocked ? world.icono : '🔒'}</span>
                        </button>
                      </div>

                      {/* Floating Label */}
                      <div className="absolute top-1/2 -translate-y-1/2 left-24 pl-2 whitespace-nowrap z-20 flex flex-col pointer-events-none">
                        <span className="text-[11px] font-black text-text" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                          Mundo {i + 1}
                        </span>
                        <span className="text-[9px] text-muted-foreground font-semibold">
                          {world.nombre}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
