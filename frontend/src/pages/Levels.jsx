import { useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { useGsapEntrance } from '../hooks/useGsap'
import api from '../services/api'
import LevelCard from '../components/cards/LevelCard'
import SkeletonLoader from '../components/ui/SkeletonLoader'
import { ChevronLeft, CheckCircle2 } from 'lucide-react'

export default function Levels() {
  const { worldId } = useParams()
  const navigate    = useNavigate()
  const pageRef     = useGsapEntrance('.gsap-item')

  const { data: worldData } = useQuery({
    queryKey: ['world', worldId],
    queryFn:  () => api.get(`/worlds/${worldId}`).then(r => r.data),
  })

  const { data, isLoading } = useQuery({
    queryKey: ['levels', worldId],
    queryFn:  () => api.get(`/levels/world/${worldId}`).then(r => r.data),
  })

  const world  = worldData?.world
  const levels = data?.levels || []
  const completed = levels.filter(l => l.progress?.completed).length

  return (
    <div ref={pageRef} className="max-w-3xl mx-auto">
      {/* Back */}
      <button onClick={() => navigate('/worlds')}
        className="gsap-item flex items-center gap-2 text-muted hover:text-text transition-colors mb-6 group">
        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Volver a Mundos
      </button>

      {/* World header */}
      {world && (
        <div className="gsap-item glass-card p-6 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
          <div className="relative flex items-center gap-4">
            <div className="text-5xl">{world.icono}</div>
            <div className="flex-1">
              <h1 className="text-2xl font-black text-white">{world.nombre}</h1>
              <p className="text-muted text-sm mt-1">{world.descripcion}</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-success">{completed}</div>
              <p className="text-muted text-xs">/ {levels.length} completados</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-success to-primary rounded-full transition-all duration-700"
              style={{ width: `${levels.length > 0 ? (completed / levels.length) * 100 : 0}%` }}
            />
          </div>
        </div>
      )}

      {/* Levels list */}
      {isLoading ? <SkeletonLoader count={5} /> : (
        <div className="space-y-3">
          {levels.map((level, i) => (
            <div key={level.id} className="gsap-item">
              <LevelCard level={level} index={i} locked={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
