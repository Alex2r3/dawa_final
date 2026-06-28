import { useQuery } from '@tanstack/react-query'
import { useGsapEntrance } from '../hooks/useGsap'
import api from '../services/api'
import SkeletonLoader from '../components/ui/SkeletonLoader'
import {
  ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend
} from 'recharts'
import { BarChart2, Zap, Trophy, Timer, CheckCircle, Flame, Star } from 'lucide-react'

export default function Statistics() {
  const pageRef = useGsapEntrance('.gsap-item')

  const { data, isLoading } = useQuery({
    queryKey: ['stats-extended'],
    queryFn:  () => api.get('/stats').then(r => r.data),
  })

  const stats = data || {}

  const chartData = (stats.daily_activity || []).map(d => {
    const parts = d.day.split('-')
    const dateLabel = parts.length >= 3 ? `${parts[2]}/${parts[1]}` : d.day
    return { fecha: dateLabel, Intentos: d.total || 0, Aciertos: d.correct || 0 }
  })
  const defaultChartData = chartData.length > 0 ? chartData : [{ fecha: 'Sin Datos', Intentos: 0, Aciertos: 0 }]

  return (
    <div ref={pageRef} className="max-w-5xl mx-auto space-y-6">

      {/* ── HEADER ── */}
      <div
        className="gsap-item relative overflow-hidden rounded-2xl p-6"
        style={{
          background: 'linear-gradient(135deg, rgba(88,166,255,0.07) 0%, rgb(var(--rpg-surface)) 50%, rgb(var(--rpg-card)) 100%)',
          border: '1px solid rgba(88,166,255,0.2)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)',
        }} />
        <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none" style={{
          background: 'radial-gradient(circle, rgba(88,166,255,0.1) 0%, transparent 70%)',
        }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, rgba(88,166,255,0.8), transparent)' }}
        />

        <div className="relative z-10">
          <div style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '8px', color: '#58A6FF', letterSpacing: '2px', marginBottom: 12, opacity: 0.8,
          }}>
            ── BATTLE LOGS ──
          </div>
          <h1 className="text-2xl font-black text-text flex items-center gap-3">
            <BarChart2 style={{ color: '#58A6FF' }} size={26} />
            Estadísticas y Rendimiento
          </h1>
          <p className="text-muted text-sm mt-1">Monitorea tu aprendizaje y precisión a lo largo del tiempo.</p>
        </div>
      </div>

      {isLoading ? <SkeletonLoader count={4} /> : (
        <>
          {/* ── STAT CARDS ── */}
          <div className="gsap-item grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Zap,       label: 'XP Acumulada',   value: stats.xp_total   || 0,          color: '#F78166', glow: '247,129,102' },
              { icon: CheckCircle,label: 'Precisión',      value: `${stats.accuracy || 0}%`,      color: '#3FB950', glow: '63,185,80'   },
              { icon: Timer,     label: 'Tiempo Promedio', value: `${stats.avg_time || 0}s`,      color: '#BC8CFF', glow: '188,140,255' },
              { icon: Flame,     label: 'Racha Máxima',    value: `${stats.max_streak || 0} 🔥`,  color: '#F85149', glow: '248,81,73'   },
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
                  <div className="text-2xl font-black font-mono" style={{ color }}>{value}</div>
                  <p className="text-xs mt-1 uppercase tracking-wider text-muted">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── COMPLETION CARDS ── */}
          <div className="gsap-item grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative overflow-hidden rounded-xl p-5 flex items-center gap-4" style={{
              background: 'linear-gradient(135deg, rgba(63,185,80,0.07) 0%, rgb(var(--rpg-card)) 100%)',
              border: '1px solid rgba(63,185,80,0.2)',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1.5,
                background: 'linear-gradient(90deg, transparent, rgba(63,185,80,0.6), transparent)' }}
              />
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-success flex-shrink-0" style={{
                background: 'rgba(63,185,80,0.12)', border: '1.5px solid rgba(63,185,80,0.3)',
                boxShadow: '0 0 16px rgba(63,185,80,0.15)',
              }}>
                <CheckCircle size={22} />
              </div>
              <div>
                <span className="text-[10px] text-muted font-black uppercase tracking-wider block">Niveles Superados</span>
                <span className="text-2xl font-black text-text">{stats.levels_completed || 0}</span>
              </div>
            </div>

            <div className="gsap-item relative overflow-hidden rounded-xl p-5 flex items-center gap-4" style={{
              background: 'linear-gradient(135deg, rgba(247,129,102,0.07) 0%, rgb(var(--rpg-card)) 100%)',
              border: '1px solid rgba(247,129,102,0.2)',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1.5,
                background: 'linear-gradient(90deg, transparent, rgba(247,129,102,0.6), transparent)' }}
              />
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{
                color: '#F78166', background: 'rgba(247,129,102,0.12)', border: '1.5px solid rgba(247,129,102,0.3)',
                boxShadow: '0 0 16px rgba(247,129,102,0.15)',
              }}>
                <Trophy size={22} />
              </div>
              <div>
                <span className="text-[10px] text-muted font-black uppercase tracking-wider block">Mundos Conquistados</span>
                <span className="text-2xl font-black text-text">{stats.worlds_completed || 0}</span>
              </div>
            </div>
          </div>

          {/* ── ACTIVITY CHART ── */}
          <div className="gsap-item relative overflow-hidden rounded-xl p-6 bg-card border border-border">
            <h3 className="font-bold text-text text-sm mb-6 flex items-center gap-2">
              <Star size={16} style={{ color: '#E3B341' }} />
              Actividad Reciente (Últimos 7 días)
            </h3>
            <div className="w-full h-[280px] text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={defaultChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorIntentos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#58A6FF" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#58A6FF" stopOpacity={0}   />
                    </linearGradient>
                    <linearGradient id="colorAciertos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#3FB950" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3FB950" stopOpacity={0}   />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="fecha" stroke="#8B949E" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#8B949E" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#161B22', borderColor: '#30363D', borderRadius: 12 }}
                    labelStyle={{ color: '#C9D1D9', fontWeight: 'bold' }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="Intentos" stroke="#58A6FF" strokeWidth={2.5} fillOpacity={1} fill="url(#colorIntentos)" />
                  <Area type="monotone" dataKey="Aciertos" stroke="#3FB950" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAciertos)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
