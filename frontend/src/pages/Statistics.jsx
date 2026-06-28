import { useQuery } from '@tanstack/react-query'
import { useGsapEntrance } from '../hooks/useGsap'
import api from '../services/api'
import SkeletonLoader from '../components/ui/SkeletonLoader'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts'
import { BarChart2, Zap, Trophy, Timer, CheckCircle, Flame, Star } from 'lucide-react'

export default function Statistics() {
  const pageRef = useGsapEntrance('.gsap-item')

  const { data, isLoading } = useQuery({
    queryKey: ['stats-extended'],
    queryFn:  () => api.get('/stats').then(r => r.data),
  })

  const stats = data || {}

  // Format daily activity dates for display (e.g., "YYYY-MM-DD" -> "DD/MM")
  const chartData = (stats.daily_activity || []).map(d => {
    const parts = d.day.split('-')
    const dateLabel = parts.length >= 3 ? `${parts[2]}/${parts[1]}` : d.day
    return {
      fecha: dateLabel,
      Intentos: d.total || 0,
      Aciertos: d.correct || 0,
    }
  })

  // Fallback helper if chartData is empty
  const defaultChartData = chartData.length > 0 ? chartData : [
    { fecha: 'Sin Datos', Intentos: 0, Aciertos: 0 }
  ]

  return (
    <div ref={pageRef} className="max-w-5xl mx-auto space-y-6">
      
      {/* Title Header */}
      <div className="gsap-item flex flex-col md:flex-row justify-between items-start md:items-center gap-4 glass-card p-6 border-secondary/20">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <BarChart2 className="text-primary" size={28} />
            Estadísticas y Rendimiento
          </h1>
          <p className="text-muted text-sm mt-1">Monitorea tu aprendizaje y precisión a lo largo del tiempo.</p>
        </div>
      </div>

      {isLoading ? <SkeletonLoader count={4} /> : (
        <>
          {/* Main Grid: Cards */}
          <div className="gsap-item grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Zap, label: 'XP Acumulada', value: stats.xp_total || 0, color: 'text-accent', bg: 'accent' },
              { icon: CheckCircle, label: 'Precisión', value: `${stats.accuracy || 0}%`, color: 'text-success', bg: 'success' },
              { icon: Timer, label: 'Tiempo Promedio', value: `${stats.avg_time || 0}s`, color: 'text-secondary', bg: 'secondary' },
              { icon: Flame, label: 'Racha Máxima', value: `${stats.max_streak || 0} 🔥`, color: 'text-danger', bg: 'danger' },
            ].map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} className="stat-card hover:border-primary/20 transition-all duration-300">
                <div className={`p-2.5 rounded-xl bg-card border border-border/40 ${color}`}>
                  <Icon size={20} />
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-black text-white font-mono">{value}</div>
                  <p className="text-muted text-xs font-semibold uppercase tracking-wider">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Level & World completions */}
          <div className="gsap-item grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-5 flex items-center gap-4 border-success/10 bg-gradient-to-r from-success/5 to-transparent">
              <div className="w-12 h-12 rounded-2xl bg-success/15 border border-success/30 flex items-center justify-center text-success flex-shrink-0">
                <CheckCircle size={24} />
              </div>
              <div>
                <span className="text-[10px] text-muted font-black uppercase tracking-wider block">Niveles Superados</span>
                <span className="text-2xl font-black text-white">{stats.levels_completed || 0}</span>
              </div>
            </div>

            <div className="gsap-item glass-card p-5 flex items-center gap-4 border-accent/10 bg-gradient-to-r from-accent/5 to-transparent">
              <div className="w-12 h-12 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent flex-shrink-0">
                <Trophy size={24} />
              </div>
              <div>
                <span className="text-[10px] text-muted font-black uppercase tracking-wider block">Mundos Conquistados</span>
                <span className="text-2xl font-black text-white">{stats.worlds_completed || 0}</span>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="gsap-item glass-card p-6">
            <h3 className="font-bold text-white text-sm mb-6 flex items-center gap-2">
              <Star size={16} className="text-yellow-400" />
              Actividad Reciente (Últimos 7 días)
            </h3>
            
            <div className="w-full h-[300px] text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={defaultChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorIntentos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAciertos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="fecha" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a1a2e', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    labelStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="Intentos" stroke="#4f46e5" strokeWidth={2.5} fillOpacity={1} fill="url(#colorIntentos)" />
                  <Area type="monotone" dataKey="Aciertos" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAciertos)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
