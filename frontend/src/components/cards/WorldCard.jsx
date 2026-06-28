import { useNavigate } from 'react-router-dom'
import { useGsapCardHover } from '../../hooks/useGsap'
import { ChevronRight, Lock } from 'lucide-react'

export default function WorldCard({ world, locked = false }) {
  const navigate = useNavigate()
  const cardRef  = useGsapCardHover()
  const wColor   = world.color || '#58A6FF'

  return (
    <div
      ref={cardRef}
      onClick={() => !locked && navigate(`/worlds/${world.id}`)}
      className={`relative overflow-hidden rounded-2xl group transition-all duration-300
        ${locked ? 'opacity-50 cursor-not-allowed grayscale' : 'cursor-pointer hover:-translate-y-1'}`}
      style={{
        background: 'linear-gradient(145deg, rgb(var(--rpg-card)), rgb(var(--rpg-bg)))',
        border: '1px solid rgb(var(--rpg-border))',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
      }}
      onMouseEnter={e => {
        if (locked) return
        e.currentTarget.style.border = `1px solid ${wColor}50`
        e.currentTarget.style.boxShadow = `0 8px 32px ${wColor}18, 0 4px 24px rgba(0,0,0,0.4)`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.border = '1px solid rgb(var(--rpg-border))'
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.2)'
      }}
    >
      {/* World-color top accent line */}
      <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${wColor}90, transparent)` }} />

      {/* Atmospheric background glow */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none transition-opacity duration-300"
        style={{ background: wColor, opacity: 0.06, filter: 'blur(30px)' }}
      />

      {/* REALM # pixel badge */}
      <div
        className="absolute top-3 right-3"
        style={{
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '7px',
          background: 'rgb(var(--rpg-surface) / 0.55)',
          border: '1px solid rgb(var(--rpg-border))',
          borderRadius: 6,
          padding: '3px 8px',
          color: 'rgb(var(--rpg-muted))',
          backdropFilter: 'blur(4px)',
          letterSpacing: '0.5px',
        }}
      >
        #{world.orden}
      </div>

      <div className="relative z-10 p-6">
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-lg
                     group-hover:scale-110 transition-transform duration-300"
          style={{
            background: `linear-gradient(135deg, ${wColor}22, ${wColor}0d)`,
            border: `1.5px solid ${wColor}40`,
            boxShadow: `0 4px 16px ${wColor}18`,
          }}
        >
          {locked ? <Lock size={24} className="text-muted" /> : world.icono}
        </div>

        {/* Text */}
        <h3 className="text-lg font-black text-text mb-1 group-hover:text-primary transition-colors truncate">
          {world.nombre}
        </h3>
        <p className="text-muted text-xs leading-relaxed line-clamp-2 mb-4">{world.descripcion}</p>

        {/* CTA */}
        {!locked && (
          <div className="flex items-center justify-between">
            <span
              style={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: '7px',
                color: wColor,
                opacity: 0.85,
                letterSpacing: '0.5px',
              }}
            >
              EXPLORAR
            </span>
            <ChevronRight
              size={18}
              className="text-muted group-hover:text-primary group-hover:translate-x-1 transition-all"
            />
          </div>
        )}
      </div>
    </div>
  )
}
