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
      {/* Header */}
      <div className="gsap-item mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Globe size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Mundos de Aprendizaje</h1>
            <p className="text-muted text-sm">Elige tu aventura y desbloquea nuevas habilidades</p>
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
          {data?.worlds?.map((world, i) => (
            <div key={world.id} className="gsap-item">
              <WorldCard world={world} locked={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
