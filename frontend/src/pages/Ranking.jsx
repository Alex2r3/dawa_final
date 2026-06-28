import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'
import { useGsapEntrance } from '../hooks/useGsap'
import api from '../services/api'
import SkeletonLoader from '../components/ui/SkeletonLoader'
import { Trophy, Award, Zap, Coins } from 'lucide-react'

export default function Ranking() {
  const { user: currentUser } = useAuth()
  const pageRef = useGsapEntrance('.gsap-item')

  const { data, isLoading } = useQuery({
    queryKey: ['ranking'],
    queryFn:  () => api.get('/ranking').then(r => r.data),
  })

  const ranking = data?.ranking || []
  const myPosition = data?.my_position

  // Split into Top 3 and others
  const top3 = ranking.slice(0, 3)
  const others = ranking.slice(3)

  // Order podium: 2nd place, 1st place, 3rd place for standard visual order
  const podiumOrder = [
    top3[1], // 2nd
    top3[0], // 1st
    top3[2], // 3rd
  ].filter(Boolean)

  const podiumColors = {
    1: { border: 'border-yellow-400/40 bg-yellow-400/5', icon: '👑', medal: 'text-yellow-400', height: 'h-40 md:h-48', label: '1er Lugar' },
    2: { border: 'border-slate-300/40 bg-slate-300/5', icon: '🥈', medal: 'text-slate-300', height: 'h-32 md:h-40', label: '2do Lugar' },
    3: { border: 'border-amber-600/40 bg-amber-600/5', icon: '🥉', medal: 'text-amber-600', height: 'h-24 md:h-32', label: '3er Lugar' },
  }

  return (
    <div ref={pageRef} className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="gsap-item flex flex-col md:flex-row justify-between items-start md:items-center gap-4 glass-card p-6 border-primary/20">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <Trophy className="text-yellow-400" size={28} />
            Salón de la Fama
          </h1>
          <p className="text-muted text-sm mt-1">Los mejores programadores de CodeQuest compitiendo por la gloria.</p>
        </div>
        {myPosition && (
          <div className="bg-card/50 px-4 py-2 rounded-xl border border-border">
            <span className="text-[10px] text-muted block font-bold uppercase">Mi posición</span>
            <span className="text-lg font-black text-primary"># {myPosition}</span>
          </div>
        )}
      </div>

      {isLoading ? <SkeletonLoader count={5} /> : (
        <>
          {/* Podium */}
          {top3.length > 0 && (
            <div className="gsap-item grid grid-cols-3 items-end gap-2 md:gap-4 pt-10 pb-6 border-b border-border/20 max-w-2xl mx-auto">
              
              {/* 2nd Place (Renders first on left if exists) */}
              {podiumOrder[0] && podiumOrder[0].position === 2 && (
                <PodiumColumn item={podiumOrder[0]} conf={podiumColors[2]} isCurrentUser={podiumOrder[0].id === currentUser?.id} />
              )}

              {/* 1st Place (Center) */}
              {podiumOrder.find(p => p.position === 1) && (
                <PodiumColumn
                  item={podiumOrder.find(p => p.position === 1)}
                  conf={podiumColors[1]}
                  isCurrentUser={podiumOrder.find(p => p.position === 1).id === currentUser?.id}
                />
              )}

              {/* 3rd Place (Right if exists) */}
              {podiumOrder.find(p => p.position === 3) && (
                <PodiumColumn
                  item={podiumOrder.find(p => p.position === 3)}
                  conf={podiumColors[3]}
                  isCurrentUser={podiumOrder.find(p => p.position === 3).id === currentUser?.id}
                />
              )}

            </div>
          )}

          {/* Leaders List */}
          <div className="gsap-item glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-muted">
                <thead className="bg-card/80 text-xs font-semibold uppercase text-muted tracking-wider border-b border-border/40">
                  <tr>
                    <th className="p-4 w-20 text-center">Pos</th>
                    <th className="p-4">Usuario</th>
                    <th className="p-4 text-center">Nivel</th>
                    <th className="p-4 text-right">Monedas</th>
                    <th className="p-4 text-right">XP Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/10 bg-card/10">
                  {others.map(player => (
                    <tr
                      key={player.id}
                      className={`hover:bg-primary/5 transition-colors
                        ${player.id === currentUser?.id ? 'bg-primary/10 border-y border-primary/20' : ''}`}
                    >
                      <td className="p-4 text-center font-bold text-white">
                        #{player.position}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={player.avatar} alt={player.username} className="w-8 h-8 rounded-lg bg-card border border-border" />
                          <div>
                            <span className="font-bold text-white block text-xs">
                              {player.username}
                              {player.id === currentUser?.id && (
                                <span className="ml-2 text-[10px] text-primary font-bold uppercase">(Tú)</span>
                              )}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center font-bold text-primary">
                        {player.nivel}
                      </td>
                      <td className="p-4 text-right font-semibold text-yellow-400 font-mono">
                        🪙 {player.monedas}
                      </td>
                      <td className="p-4 text-right font-black text-accent font-mono">
                        {player.xp_total} XP
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function PodiumColumn({ item, conf, isCurrentUser }) {
  return (
    <div className="flex flex-col items-center select-none">
      
      {/* Crown/Crown Icon */}
      <span className="text-3xl mb-1 filter drop-shadow-md animate-bounce">{conf.icon}</span>

      {/* Avatar Container */}
      <div className={`relative mb-3 rounded-full p-0.5 border-2 ${conf.border}`}>
        <img
          src={item.avatar}
          alt={item.username}
          className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-surface"
        />
        <div className={`absolute -bottom-2 -right-2 w-7 h-7 rounded-full border border-border flex items-center justify-center font-bold text-xs bg-surface text-white shadow-lg`}>
          #{item.position}
        </div>
      </div>

      {/* Podium block */}
      <div className={`w-full ${conf.height} rounded-t-2xl border-t border-x ${conf.border} flex flex-col items-center justify-center p-3 text-center`}>
        <span className="text-xs font-bold text-white truncate max-w-[80px] md:max-w-[120px] block">
          {item.username}
        </span>
        {isCurrentUser && (
          <span className="text-[8px] md:text-[10px] text-primary font-black uppercase tracking-wider block mt-0.5">(Tú)</span>
        )}

        <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-accent font-black font-mono mt-2">
          <Zap size={10} className="text-accent" /> {item.xp_total} XP
        </div>
        <div className="flex items-center gap-1 text-[9px] md:text-xs text-yellow-400 font-semibold font-mono mt-1">
          🪙 {item.monedas}
        </div>
      </div>
    </div>
  )
}
