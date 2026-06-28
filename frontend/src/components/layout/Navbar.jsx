import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { Bell, Zap, Coins } from 'lucide-react'
import { useRef, useEffect } from 'react'

export default function Navbar() {
  const { user } = useAuth()
  const navRef   = useRef(null)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -40, opacity: 0 },
      { y: 0,   opacity: 1, duration: 0.5, ease: 'power3.out' }
    )
  }, [])

  return (
    <header
      ref={navRef}
      className="h-16 px-6 flex items-center justify-between border-b border-border bg-surface/60 backdrop-blur-md sticky top-0 z-30"
    >
      {/* Left: page title handled by each page */}
      <div className="flex items-center gap-2 md:hidden">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-sm">
          CQ
        </div>
        <span className="font-bold text-white">CodeQuest</span>
      </div>

      {/* Right: user stats */}
      {user && (
        <div className="ml-auto flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border">
            <Zap size={14} className="text-accent" />
            <span className="text-accent font-bold text-sm">{user.xp_total?.toLocaleString()}</span>
            <span className="text-muted text-xs">XP</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border">
            <span className="text-yellow-400 text-sm">🪙</span>
            <span className="text-yellow-400 font-bold text-sm">{user.monedas?.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-9 h-9 rounded-full ring-2 ring-primary/40 hover:ring-primary transition-all cursor-pointer"
            />
            <span className="hidden md:block text-sm font-medium text-text">{user.username}</span>
          </div>
        </div>
      )}
    </header>
  )
}
