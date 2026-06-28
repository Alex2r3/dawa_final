import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'
import { useGsapEntrance } from '../hooks/useGsap'
import api from '../services/api'
import SkeletonLoader from '../components/ui/SkeletonLoader'
import { Trophy, Zap } from 'lucide-react'

export default function Ranking() {
  const { user: currentUser } = useAuth()
  const pageRef = useGsapEntrance('.gsap-item')

  const { data, isLoading } = useQuery({
    queryKey: ['ranking'],
    queryFn:  () => api.get('/ranking').then(r => r.data),
  })

  const ranking    = data?.ranking || []
  const myPosition = data?.my_position

  const top3  = ranking.slice(0, 3)
  const others = ranking.slice(3)

  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean)

  const podiumConf = {
    1: { border: 'rgba(227,179,65,0.4)', bg: 'rgba(227,179,65,0.06)', icon: '👑', glow: '227,179,65', color: '#E3B341', height: 'h-40 md:h-48', label: '1er Lugar' },
    2: { border: 'rgba(192,192,192,0.4)', bg: 'rgba(192,192,192,0.04)', icon: '🥈', glow: '192,192,192', color: '#C0C0C0', height: 'h-32 md:h-40', label: '2do Lugar' },
    3: { border: 'rgba(176,106,45,0.4)', bg: 'rgba(176,106,45,0.04)', icon: '🥉', glow: '176,106,45', color: '#B06A2D', height: 'h-24 md:h-32', label: '3er Lugar' },
  }

  return (
    <div ref={pageRef} className="max-w-4xl mx-auto space-y-6">

      {/* ── HEADER ── */}
      <div
        className="gsap-item relative overflow-hidden rounded-2xl p-6"
        style={{
          background: 'linear-gradient(135deg, rgba(227,179,65,0.07) 0%, rgb(var(--rpg-surface)) 50%, rgb(var(--rpg-card)) 100%)',
          border: '1px solid rgba(227,179,65,0.2)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
        }}
      >
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
            <div style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '8px', color: '#E3B341', letterSpacing: '2px', marginBottom: 12, opacity: 0.8,
            }}>
              ── HALL OF FAME ──
            </div>
            <h1 className="text-2xl font-black text-text flex items-center gap-3">
              <Trophy style={{ color: '#E3B341' }} size={26} />
              Salón de la Fama
            </h1>
            <p className="text-muted text-sm mt-1">Los mejores programadores de CodeRealm compitiendo por la gloria.</p>
          </div>
          {myPosition && (
            <div className="px-4 py-3 rounded-xl flex-shrink-0" style={{
              background: 'rgba(88,166,255,0.08)',
              border: '1px solid rgba(88,166,255,0.25)',
            }}>
              <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '7px', color: 'rgb(var(--rpg-muted))', marginBottom: 4, letterSpacing: '1px' }}>
                MI POSICIÓN
              </div>
              <span className="text-lg font-black text-primary"># {myPosition}</span>
            </div>
          )}
        </div>
      </div>

      {isLoading ? <SkeletonLoader count={5} /> : (
        <>
          {/* Podium */}
          {top3.length > 0 && (
            <div className="gsap-item grid grid-cols-3 items-end gap-2 md:gap-4 pt-8 pb-6 max-w-2xl mx-auto">
              {podiumOrder[0] && podiumOrder[0].position === 2 && (
                <PodiumColumn item={podiumOrder[0]} conf={podiumConf[2]} isMe={podiumOrder[0].id === currentUser?.id} />
              )}
              {podiumOrder.find(p => p.position === 1) && (
                <PodiumColumn
                  item={podiumOrder.find(p => p.position === 1)}
                  conf={podiumConf[1]}
                  isMe={podiumOrder.find(p => p.position === 1).id === currentUser?.id}
                />
              )}
              {podiumOrder.find(p => p.position === 3) && (
                <PodiumColumn
                  item={podiumOrder.find(p => p.position === 3)}
                  conf={podiumConf[3]}
                  isMe={podiumOrder.find(p => p.position === 3).id === currentUser?.id}
                />
              )}
            </div>
          )}

          {/* Leaderboard table */}
          <div className="gsap-item relative overflow-hidden rounded-xl bg-card border border-border">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-muted">
                <thead style={{ background: 'rgb(var(--rpg-surface) / 0.8)', borderBottom: '1px solid rgb(var(--rpg-border))' }}>
                  <tr>
                    <th className="p-4 w-20 text-center" style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px', color: 'rgb(var(--rpg-muted))', letterSpacing: '1px' }}>POS</th>
                    <th className="p-4" style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px', color: 'rgb(var(--rpg-muted))', letterSpacing: '1px' }}>USUARIO</th>
                    <th className="p-4 text-center" style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px', color: 'rgb(var(--rpg-muted))', letterSpacing: '1px' }}>LVL</th>
                    <th className="p-4 text-right" style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px', color: 'rgb(var(--rpg-muted))', letterSpacing: '1px' }}>COINS</th>
                    <th className="p-4 text-right" style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px', color: 'rgb(var(--rpg-muted))', letterSpacing: '1px' }}>XP</th>
                  </tr>
                </thead>
                <tbody>
                  {others.map(player => (
                    <tr
                      key={player.id}
                      className="hover:bg-primary/5 transition-colors"
                      style={{
                        borderBottom: '1px solid rgb(var(--rpg-border) / 0.5)',
                        background: player.id === currentUser?.id
                          ? 'linear-gradient(135deg, rgba(88,166,255,0.06), transparent)'
                          : 'transparent',
                        outline: player.id === currentUser?.id ? '1px solid rgba(88,166,255,0.15)' : 'none',
                      }}
                    >
                      <td className="p-4 text-center font-black text-text">#{player.position}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={player.avatar}
                            alt={player.username}
                            className="w-8 h-8 rounded-lg"
                            style={{ border: '1px solid rgb(var(--rpg-border))' }}
                          />
                          <span className="font-bold text-text text-xs">
                            {player.username}
                            {player.id === currentUser?.id && (
                              <span className="ml-2 text-[9px] text-primary font-black uppercase">(Tú)</span>
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-center font-black text-primary">{player.nivel}</td>
                      <td className="p-4 text-right font-semibold text-yellow-400 font-mono">🪙 {player.monedas}</td>
                      <td className="p-4 text-right font-black font-mono text-accent">{player.xp_total} XP</td>
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

function PodiumColumn({ item, conf, isMe }) {
  return (
    <div className="flex flex-col items-center select-none">
      <span className="text-3xl mb-1 animate-bounce filter drop-shadow-md">{conf.icon}</span>

      {/* Avatar */}
      <div
        className="relative mb-3 rounded-full p-0.5"
        style={{
          border: `2px solid ${conf.border}`,
          boxShadow: `0 0 16px rgba(${conf.glow},0.3)`,
        }}
      >
        <img
          src={item.avatar}
          alt={item.username}
          className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-surface"
        />
        <div
          className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center font-black text-xs text-text shadow-lg bg-card"
          style={{ border: `1.5px solid ${conf.border}` }}
        >
          #{item.position}
        </div>
      </div>

      {/* Podium block */}
      <div
        className={`w-full ${conf.height} rounded-t-2xl flex flex-col items-center justify-center p-3 text-center`}
        style={{
          background: conf.bg,
          border: `1px solid ${conf.border}`,
          borderBottom: 'none',
          boxShadow: `0 -4px 20px rgba(${conf.glow},0.1) inset`,
        }}
      >
        <span className="text-xs font-bold text-text truncate max-w-[80px] md:max-w-[120px] block">
          {item.username}
        </span>
        {isMe && (
          <span className="text-[8px] md:text-[10px] text-primary font-black uppercase tracking-wider block mt-0.5">(Tú)</span>
        )}
        <div className="flex items-center gap-1 text-[10px] md:text-xs font-black font-mono mt-2 text-accent">
          <Zap size={10} /> {item.xp_total} XP
        </div>
        <div className="text-[9px] md:text-xs text-yellow-400 font-semibold font-mono mt-1">
          🪙 {item.monedas}
        </div>
      </div>
    </div>
  )
}
