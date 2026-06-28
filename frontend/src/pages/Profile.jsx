import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'
import { useGsapEntrance } from '../hooks/useGsap'
import api from '../services/api'
import SkeletonLoader from '../components/ui/SkeletonLoader'
import { User, Calendar, Zap, Coins, Trophy, Award, BarChart2 } from 'lucide-react'

export default function Profile() {
  const { user } = useAuth()
  const pageRef  = useGsapEntrance('.gsap-item')

  // Fetch stats and achievements to display inside Profile
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['stats'],
    queryFn:  () => api.get('/stats').then(r => r.data),
  })

  const { data: achievementsData, isLoading: achsLoading } = useQuery({
    queryKey: ['achievements'],
    queryFn:  () => api.get('/achievements').then(r => r.data),
  })

  const stats = statsData || {}
  const achievements = achievementsData?.achievements || []
  const unlockedAchievements = achievements.filter(a => a.unlocked)

  return (
    <div ref={pageRef} className="max-w-4xl mx-auto space-y-6">
      
      {/* Profile Header Card */}
      <div className="gsap-item glass-card p-6 md:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-transparent" />
        <div className="relative flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          
          <img
            src={user?.avatar}
            alt={user?.username}
            className="w-24 h-24 rounded-3xl ring-4 ring-primary/30 bg-card p-1 shadow-xl"
          />

          <div className="flex-1 space-y-2">
            <h1 className="text-3xl font-black text-white">{user?.username}</h1>
            <p className="text-muted text-sm flex items-center justify-center md:justify-start gap-1.5">
              <User size={14} /> {user?.email}
            </p>
            {user?.created_at && (
              <p className="text-muted text-xs flex items-center justify-center md:justify-start gap-1.5">
                <Calendar size={14} /> Miembro desde: {new Date(user.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <div className="bg-card/50 px-4 py-3 rounded-2xl border border-border text-center min-w-[80px]">
              <span className="text-[10px] text-muted font-bold block uppercase">Nivel</span>
              <span className="text-2xl font-black text-primary">{user?.nivel || 1}</span>
            </div>
            <div className="bg-card/50 px-4 py-3 rounded-2xl border border-border text-center min-w-[80px]">
              <span className="text-[10px] text-muted font-bold block uppercase">Monedas</span>
              <span className="text-2xl font-black text-yellow-400">🪙 {user?.monedas || 0}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left column: Stats summary */}
        <div className="gsap-item md:col-span-1 space-y-6">
          <div className="glass-card p-6 space-y-4">
            <h2 className="text-md font-bold text-white flex items-center gap-2 border-b border-border/40 pb-3">
              <BarChart2 size={18} className="text-primary" />
              Estadísticas básicas
            </h2>

            {statsLoading ? <SkeletonLoader count={3} /> : (
              <div className="space-y-4">
                {[
                  { label: 'Intentos Totales', value: stats.total_attempts || 0 },
                  { label: 'Respuestas Correctas', value: stats.correct_attempts || 0 },
                  { label: 'Precisión General', value: `${stats.accuracy || 0}%` },
                  { label: 'Racha Actual', value: `${stats.current_streak || 0} 🔥` },
                  { label: 'Racha Máxima', value: `${stats.max_streak || 0} ⚡` },
                  { label: 'Niveles Jugados', value: stats.levels_completed || 0 },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center text-sm border-b border-border/10 pb-2">
                    <span className="text-muted font-medium">{label}</span>
                    <span className="text-white font-bold">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column: Unlocked Achievements */}
        <div className="gsap-item md:col-span-2 space-y-6">
          <div className="glass-card p-6 space-y-4">
            <h2 className="text-md font-bold text-white flex items-center gap-2 border-b border-border/40 pb-3">
              <Award size={18} className="text-yellow-400" />
              Logros Recientes ({unlockedAchievements.length})
            </h2>

            {achsLoading ? <SkeletonLoader count={4} /> : (
              unlockedAchievements.length === 0 ? (
                <div className="text-center py-8 text-muted text-sm space-y-2">
                  <Trophy size={36} className="mx-auto opacity-30" />
                  <p>Aún no has desbloqueado ningún logro.</p>
                  <p className="text-xs">¡Sigue completando niveles para desbloquear el primero!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {unlockedAchievements.slice(0, 6).map(ach => (
                    <div key={ach.id} className="p-3.5 rounded-xl border border-yellow-500/20 bg-yellow-500/5 flex items-center gap-3">
                      <span className="text-2xl">{ach.icono}</span>
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs text-white truncate">{ach.nombre}</h4>
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
