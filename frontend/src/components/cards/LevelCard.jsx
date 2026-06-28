import { useNavigate } from 'react-router-dom'
import { useGsapCardHover } from '../../hooks/useGsap'
import { CheckCircle2, Clock, Zap, ChevronRight, Lock } from 'lucide-react'

const DIFF = {
  facil:   { label: 'Fácil',   color: '#3FB950', glow: '63,185,80'   },
  medio:   { label: 'Medio',   color: '#58A6FF', glow: '88,166,255'  },
  dificil: { label: 'Difícil', color: '#E3B341', glow: '227,179,65'  },
  experto: { label: 'Experto', color: '#F85149', glow: '248,81,73'   },
  leyenda: { label: 'Leyenda', color: '#BC8CFF', glow: '188,140,255' },
}

export default function LevelCard({ level, index, locked = false }) {
  const navigate  = useNavigate()
  const cardRef   = useGsapCardHover()
  const diff      = DIFF[level.dificultad] || DIFF.facil
  const completed = level.progress?.completed

  return (
    <div
      ref={cardRef}
      onClick={() => !locked && navigate(`/challenge/${level.id}`)}
      className={`relative overflow-hidden rounded-xl group transition-all duration-300
        ${locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-0.5'}`}
      style={{
        background: completed
          ? 'linear-gradient(135deg, rgba(63,185,80,0.05) 0%, rgb(var(--rpg-card)) 100%)'
          : 'linear-gradient(135deg, rgb(var(--rpg-card)), rgb(var(--rpg-bg)))',
        border: completed
          ? '1px solid rgba(63,185,80,0.25)'
          : '1px solid rgb(var(--rpg-border))',
        boxShadow: completed
          ? '0 0 0 1px rgba(63,185,80,0.08) inset'
          : 'none',
      }}
    >
      {/* Completed shimmer top line */}
      {completed && (
        <div style={{ height: 1.5, background: 'linear-gradient(90deg, transparent, #3FB950, transparent)' }} />
      )}

      <div className="flex items-center gap-4 p-4">
        {/* Quest number badge */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center font-black flex-shrink-0
                     group-hover:scale-110 transition-transform duration-200"
          style={{
            background: completed
              ? 'linear-gradient(135deg, rgba(63,185,80,0.2), rgba(63,185,80,0.06))'
              : 'linear-gradient(135deg, rgba(88,166,255,0.12), rgba(88,166,255,0.04))',
            border: completed
              ? '1.5px solid rgba(63,185,80,0.4)'
              : '1.5px solid rgba(88,166,255,0.25)',
            color: completed ? '#3FB950' : '#58A6FF',
            boxShadow: completed
              ? '0 0 12px rgba(63,185,80,0.2)'
              : '0 0 8px rgba(88,166,255,0.1)',
          }}
        >
          {completed ? (
            <CheckCircle2 size={20} />
          ) : (
            <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '9px' }}>
              {String(index + 1).padStart(2, '0')}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-bold text-text text-sm">{level.titulo}</h3>
            {/* Difficulty gem */}
            <span
              className="text-[10px] font-black px-2 py-0.5 rounded-full"
              style={{
                background: `rgba(${diff.glow},0.12)`,
                border: `1px solid rgba(${diff.glow},0.3)`,
                color: diff.color,
              }}
            >
              {diff.label}
            </span>
          </div>
          <p className="text-muted text-xs mb-2.5 line-clamp-1">{level.descripcion}</p>

          {/* Rewards row */}
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-muted">
              <Clock size={11} /> {level.tiempo_limite}s
            </span>
            <span className="flex items-center gap-1 font-bold" style={{ color: '#F78166' }}>
              <Zap size={11} /> +{level.xp_recompensa} XP
            </span>
            <span className="flex items-center gap-1 font-bold" style={{ color: '#E3B341' }}>
              🪙 +{level.monedas_recompensa}
            </span>
          </div>

          {/* Best score badge */}
          {completed && level.progress?.best_score && (
            <div className="mt-1.5 text-[10px] font-bold" style={{ color: '#3FB950' }}>
              ✓ Mejor: {level.progress.best_score} pts
              {level.progress.best_time && ` · ${level.progress.best_time}s`}
            </div>
          )}
        </div>

        {/* Right icon */}
        <div className="flex-shrink-0">
          {locked
            ? <Lock size={16} className="text-muted" />
            : <ChevronRight size={18} className="text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
          }
        </div>
      </div>
    </div>
  )
}
