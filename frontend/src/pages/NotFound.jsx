import { useNavigate } from 'react-router-dom'
import { useGsapEntrance } from '../hooks/useGsap'
import ThreeBackground from '../components/three/ThreeBackground'
import { AlertTriangle, Home } from 'lucide-react'

export default function NotFound() {
  const navigate = useNavigate()
  const pageRef  = useGsapEntrance('.gsap-item')

  return (
    <div className="relative min-h-screen bg-bg flex items-center justify-center overflow-hidden px-4">
      {/* Immersive 3D space backdrop */}
      <div className="absolute inset-0 z-0">
        <ThreeBackground />
      </div>

      <div ref={pageRef} className="relative z-10 max-w-md w-full text-center space-y-6 glass-card p-8 border-danger/30">
        <div className="gsap-item inline-flex p-4 bg-danger/10 border border-danger/30 rounded-3xl text-danger animate-pulse">
          <AlertTriangle size={48} />
        </div>
        
        <div className="gsap-item space-y-2">
          <h1 className="text-6xl font-black text-white font-mono tracking-widest">404</h1>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">Sistema Corrupto</h2>
          <p className="text-muted text-sm max-w-xs mx-auto">
            El archivo o ruta que estás buscando no se encuentra en la base de datos de CodeQuest.
          </p>
        </div>

        <div className="gsap-item pt-4">
          <button
            onClick={() => navigate('/')}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Home size={16} /> Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  )
}
