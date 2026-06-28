import { useEffect, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LogOut, Map, Trophy, User, Settings, X, Home } from 'lucide-react'
import { gsap } from 'gsap'

export default function PauseMenu({ isOpen, onClose }) {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const overlayRef = useRef(null)
  const menuRef = useRef(null)

  // Sound effects
  const hoverSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3')
  const clickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3')
  hoverSound.volume = 0.2
  clickSound.volume = 0.4

  const playHover = () => hoverSound.play().catch(() => { })
  const playClick = () => clickSound.play().catch(() => { })

  const links = [
    { to: '/', icon: Home, label: 'Menú Principal' },
    { to: '/worlds', icon: Map, label: 'Mundos' },
    { to: '/ranking', icon: Trophy, label: 'Ranking' },
    { to: '/profile', icon: User, label: 'Perfil' },
    { to: '/achievements', icon: Settings, label: 'Logros' },
  ]

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      // Play open sound
      playClick()
      // Animate in
      gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.3 })
      gsap.fromTo(menuRef.current,
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' }
      )

      gsap.fromTo('.pause-item',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, delay: 0.1, ease: 'power2.out' }
      )
    } else {
      // Animate out
      gsap.to(menuRef.current, { scale: 0.8, opacity: 0, y: -20, duration: 0.2, ease: 'power2.in' })
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.3, delay: 0.1 })
    }
  }, [isOpen])

  const handleNav = (to) => {
    playClick()
    onClose()
    setTimeout(() => navigate(to), 300)
  }

  const handleLogout = () => {
    playClick()
    logout()
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl invisible"
      style={{ backgroundColor: 'rgb(var(--rpg-bg) / 0.8)' }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none rpg-scanlines opacity-20" />
      <div className="absolute inset-0 pointer-events-none stars-bg opacity-30" />

      <button
        onClick={() => { playClick(); onClose(); }}
        className="absolute top-8 right-8 text-muted hover:text-primary transition-colors pause-item"
      >
        <X size={48} />
      </button>

      <div
        ref={menuRef}
        className="w-full max-w-md p-8 glass-card rpg-frame shadow-2xl relative"
        style={{ backgroundColor: 'rgb(var(--rpg-surface) / 0.95)' }}
      >
        <div className="text-center mb-8 pause-item">
          <h2 className="text-2xl text-text mb-2" style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '16px' }}>PAUSE MENU</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="flex flex-col gap-4">
          {links.map((link) => (
            <button
              key={link.to}
              onClick={() => handleNav(link.to)}
              onMouseEnter={playHover}
              className="pause-item group relative flex items-center justify-between p-4 rounded-xl border-2 border-transparent hover:border-primary/50 transition-all duration-300"
              style={{ backgroundColor: 'rgb(var(--rpg-card) / 0.8)' }}
            >
              <div className="flex items-center gap-4 text-text group-hover:text-primary transition-colors">
                <link.icon size={24} className="group-hover:scale-110 transition-transform text-primary" />
                <span className="font-bold text-lg">{link.label}</span>
              </div>
              <div className="w-3 h-3 bg-primary rotate-45 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </button>
          ))}

          <button
            onClick={handleLogout}
            onMouseEnter={playHover}
            className="pause-item group relative flex items-center justify-between p-4 rounded-xl border-2 border-transparent hover:border-danger/50 transition-all duration-300 mt-4"
            style={{ backgroundColor: 'rgb(var(--rpg-danger) / 0.1)' }}
          >
            <div className="flex items-center gap-4 text-danger">
              <LogOut size={24} className="group-hover:scale-110 transition-transform" />
              <span className="font-bold text-lg">Cerrar Sesión</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
