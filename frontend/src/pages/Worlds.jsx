import { useQuery } from '@tanstack/react-query'
import { useGsapEntrance } from '../hooks/useGsap'
import api from '../services/api'
import WorldCard from '../components/cards/WorldCard'
import SkeletonLoader from '../components/ui/SkeletonLoader'
import { Globe } from 'lucide-react'

export default function Worlds() {
  const pageRef = useGsapEntrance('.gsap-item')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['worlds'],
    queryFn:  () => api.get('/worlds').then(r => r.data),
  })

  return (
    <div ref={pageRef} className="max-w-6xl mx-auto">

      {/* ── HEADER ── */}
      <div className="gsap-item mb-8 relative overflow-hidden rounded-2xl p-6" style={{
        background: 'linear-gradient(135deg, rgb(var(--rpg-bg)), rgb(var(--rpg-card)))',
        border: '1px solid rgb(var(--rpg-border))',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
      }}>
        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)',
        }} />
        {/* Globe glow */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none" style={{
          width: 120, height: 120,
          background: 'radial-gradient(circle, rgba(88,166,255,0.12) 0%, transparent 70%)',
        }} />

        <div className="relative z-10">
          {/* Pixel label */}
          <div style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '8px',
            color: '#58A6FF',
            letterSpacing: '2px',
            marginBottom: 14,
            opacity: 0.8,
          }}>
            ── WORLD MAP ──
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{
              background: 'rgba(88,166,255,0.12)',
              border: '1.5px solid rgba(88,166,255,0.3)',
              boxShadow: '0 0 16px rgba(88,166,255,0.15)',
            }}>
              <Globe size={22} style={{ color: '#58A6FF' }} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-text">Mundos de Aprendizaje</h1>
              <p className="text-muted text-sm mt-0.5">Elige tu aventura y desbloquea nuevas habilidades</p>
            </div>
          </div>
        </div>
      </div>

      {isLoading && <SkeletonLoader count={6} />}

      {isError && (
        <div className="glass-card p-8 text-center">
          <p className="text-danger text-lg">⚠️ Error al cargar mundos</p>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.worlds?.map((world) => (
            <div key={world.id} className="gsap-item">
              <WorldCard world={world} locked={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
