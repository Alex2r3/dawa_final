import { useNavigate } from 'react-router-dom'
import { useGsapCardHover } from '../../hooks/useGsap'
import { CheckCircle2, Clock, Zap, ChevronRight, Lock } from 'lucide-react'

const DIFFICULTY_LABEL = {
  facil:   { label: 'Fácil',   cls: 'badge-facil' },
  medio:   { label: 'Medio',   cls: 'badge-medio' },
  dificil: { label: 'Difícil', cls: 'badge-dificil' },
  experto: { label: 'Experto', cls: 'badge-experto' },
  leyenda: { label: 'Leyenda', cls: 'badge-leyenda' },
}

export default function LevelCard({ level, index, locked = false }) {
  const navigate = useNavigate()
  const cardRef  = useGsapCardHover()
  const diff     = DIFFICULTY_LABEL[level.dificultad] || DIFFICULTY_LABEL.facil
  const completed = level.progress?.completed

  return (
    <div
      ref={cardRef}
      onClick={() => !locked && navigate(`/challenge/${level.id}`)}
      className={`glass-card p-5 cursor-pointer group relative overflow-hidden transition-all duration-300
        ${completed ? 'border-success/30' : ''}
        ${locked ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary/40'}`}
    >
      {completed && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-success to-transparent" />
      )}

      <div className="flex items-start gap-4">
        {/* Number */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0
          ${completed ? 'bg-success/20 text-success border border-success/30' : 'bg-primary/10 text-primary border border-primary/20'}`}>
          {completed ? <CheckCircle2 size={18} /> : index + 1}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-bold text-white text-sm">{level.titulo}</h3>
            <span className={`badge ${diff.cls}`}>{diff.label}</span>
          </div>
          <p className="text-muted text-xs mb-3 line-clamp-1">{level.descripcion}</p>

          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="flex items-center gap-1">
              <Clock size={12} /> {level.tiempo_limite}s
            </span>
            <span className="flex items-center gap-1 text-accent">
              <Zap size={12} /> +{level.xp_recompensa} XP
            </span>
            <span className="flex items-center gap-1 text-yellow-400">
              🪙 +{level.monedas_recompensa}
            </span>
          </div>

          {completed && level.progress?.best_score && (
            <div className="mt-2 text-xs text-success font-medium">
              ✓ Mejor: {level.progress.best_score} pts
              {level.progress.best_time && ` · ${level.progress.best_time}s`}
            </div>
          )}
        </div>

        <div className="flex-shrink-0">
          {locked ? <Lock size={16} className="text-muted" /> : (
            <ChevronRight size={18} className="text-muted group-hover:text-primary transition-colors" />
          )}
        </div>
      </div>
    </div>
  )
}
