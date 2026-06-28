import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { animateAchievementPop } from '../../hooks/useGsap'
import { X, Star, Zap, Coins } from 'lucide-react'

export default function AchievementModal({ achievement, onClose }) {
  const modalRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    if (!achievement) return
    // Backdrop fade in
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    )
    // Card pop
    animateAchievementPop(modalRef.current)

    // Particle burst
    const particles = []
    const colors = ['#f59e0b', '#6366f1', '#10b981', '#8b5cf6', '#ef4444']
    for (let i = 0; i < 20; i++) {
      const el = document.createElement('div')
      el.style.cssText = `
        position: fixed;
        width: 8px; height: 8px;
        border-radius: 50%;
        background: ${colors[i % colors.length]};
        left: 50%; top: 50%;
        pointer-events: none;
        z-index: 9999;
      `
      document.body.appendChild(el)
      particles.push(el)
      gsap.fromTo(el,
        { x: 0, y: 0, opacity: 1, scale: 1 },
        {
          x: (Math.random() - 0.5) * 400,
          y: (Math.random() - 0.5) * 400,
          opacity: 0,
          scale: 0,
          duration: 1.2,
          ease: 'power2.out',
          delay: Math.random() * 0.2,
          onComplete: () => el.remove(),
        }
      )
    }
  }, [achievement])

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.2, onComplete: onClose
    })
  }

  if (!achievement) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="relative glass-card p-8 max-w-sm w-full mx-4 text-center border border-accent/40 shadow-2xl shadow-accent/20"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={handleClose} className="absolute top-4 right-4 text-muted hover:text-text">
          <X size={20} />
        </button>

        {/* Glow ring */}
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 border-2 border-accent/50 flex items-center justify-center text-5xl shadow-lg shadow-accent/30 animate-float">
          {achievement.icono}
        </div>

        {/* Badge */}
        <span className="badge bg-accent/20 text-accent border border-accent/30 text-xs mb-3 inline-block">
          ✨ Logro Desbloqueado
        </span>

        <h2 className="text-2xl font-black text-white mb-2">{achievement.nombre}</h2>
        <p className="text-muted text-sm mb-6">{achievement.descripcion}</p>

        {/* Rewards */}
        <div className="flex items-center justify-center gap-6 mb-6">
          {achievement.xp_bonus > 0 && (
            <div className="flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-xl px-4 py-2">
              <Zap size={16} className="text-accent" />
              <span className="text-accent font-bold">+{achievement.xp_bonus} XP</span>
            </div>
          )}
          {achievement.monedas_bonus > 0 && (
            <div className="flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-xl px-4 py-2">
              <span className="text-yellow-400">🪙</span>
              <span className="text-yellow-400 font-bold">+{achievement.monedas_bonus}</span>
            </div>
          )}
        </div>

        <button onClick={handleClose} className="btn-primary w-full">
          ¡Genial! 🚀
        </button>
      </div>
    </div>
  )
}
