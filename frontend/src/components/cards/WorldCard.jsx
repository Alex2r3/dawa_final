import { useNavigate } from 'react-router-dom'
import { useGsapCardHover } from '../../hooks/useGsap'
import { ChevronRight, Lock } from 'lucide-react'

export default function WorldCard({ world, locked = false }) {
  const navigate = useNavigate()
  const cardRef  = useGsapCardHover()

  return (
    <div
      ref={cardRef}
      onClick={() => !locked && navigate(`/worlds/${world.id}`)}
      className={`glass-card p-6 cursor-pointer transition-all duration-300 group relative overflow-hidden
        ${locked ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:border-primary/50'}`}
    >
      {/* Glow orb in background */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-20"
        style={{ backgroundColor: world.color }}
      />

      <div className="relative z-10">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg"
          style={{ backgroundColor: world.color + '30', border: `1px solid ${world.color}50` }}
        >
          {locked ? <Lock size={24} className="text-muted" /> : world.icono}
        </div>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-muted">Mundo {world.orden}</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{world.nombre}</h3>
            <p className="text-muted text-sm line-clamp-2">{world.descripcion}</p>
          </div>
          {!locked && (
            <ChevronRight size={20} className="text-muted group-hover:text-primary transition-colors mt-1 flex-shrink-0" />
          )}
        </div>
      </div>
    </div>
  )
}
