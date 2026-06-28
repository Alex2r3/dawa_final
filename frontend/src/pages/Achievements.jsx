import { useQuery } from '@tanstack/react-query'
import { useGsapEntrance } from '../hooks/useGsap'
import api from '../services/api'
import SkeletonLoader from '../components/ui/SkeletonLoader'
import { Trophy, Lock, Zap, Coins } from 'lucide-react'

export default function Achievements() {
  const pageRef = useGsapEntrance('.gsap-item')

  const { data, isLoading } = useQuery({
    queryKey: ['achievements'],
    queryFn:  () => api.get('/achievements').then(r => r.data),
  })

  const achievements = data?.achievements || []
  const unlockedCount = achievements.filter(a => a.unlocked).length

  return (
    <div ref={pageRef} className="max-w-5xl mx-auto space-y-6">
      {/* Title block */}
      <div className="gsap-item flex flex-col md:flex-row justify-between items-start md:items-center gap-4 glass-card p-6 border-accent/20">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <Trophy className="text-yellow-400" size={28} />
            Logros y Conquistas
          </h1>
          <p className="text-muted text-sm mt-1">Completa desafíos para desbloquear recompensas exclusivas.</p>
        </div>
        <div className="bg-card/50 px-4 py-2.5 rounded-xl border border-border">
          <span className="text-xs text-muted block font-bold uppercase">Progreso</span>
          <span className="text-2xl font-black text-yellow-400">
            {unlockedCount} <span className="text-muted text-sm font-semibold">/ {achievements.length}</span>
          </span>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? <SkeletonLoader count={6} /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map(ach => (
            <div
              key={ach.id}
              className={`gsap-item glass-card p-5 transition-all duration-300 relative overflow-hidden flex gap-4
                ${ach.unlocked 
                  ? 'border-yellow-500/25 bg-gradient-to-br from-yellow-500/5 to-transparent hover:border-yellow-500/40' 
                  : 'opacity-60 border-border bg-card/25'}`}
            >
              {/* Highlight orb for unlocked */}
              {ach.unlocked && (
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-yellow-500/10 rounded-full blur-xl pointer-events-none" />
              )}

              {/* Icon container */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 relative
                ${ach.unlocked ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-border text-muted border border-border/40'}`}>
                {ach.icono}
                {!ach.unlocked && (
                  <div className="absolute -bottom-1 -right-1 bg-surface p-1 rounded-md border border-border">
                    <Lock size={10} className="text-muted" />
                  </div>
                )}
              </div>

              {/* Text info */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-sm text-white truncate">{ach.nombre}</h3>
                  {ach.unlocked_at && (
                    <span className="text-[10px] text-muted font-mono whitespace-nowrap">
                      {new Date(ach.unlocked_at).toLocaleDateString('es-ES')}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted leading-relaxed line-clamp-2">{ach.descripcion}</p>

                {/* Rewards */}
                <div className="flex gap-3 pt-2">
                  {ach.xp_bonus > 0 && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-accent">
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
