import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { Moon, Sun, Zap, Menu, Volume2, VolumeX } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

export default function Navbar({ onMenuClick, isMuted, onMuteToggle }) {
  const { user } = useAuth()
  const navRef   = useRef(null)
  
  // Theme toggle state
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'dark')

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', newTheme)
    setTheme(newTheme)
  }

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -40, opacity: 0 },
      { y: 0,   opacity: 1, duration: 0.5, ease: 'power3.out' }
    )
  }, [])

  return (
    <header
      ref={navRef}
      className="h-20 px-6 flex items-center justify-between sticky top-0 z-30 w-full"
      style={{ 
        background: 'linear-gradient(180deg, rgb(var(--rpg-bg) / 0.9) 0%, rgb(var(--rpg-bg) / 0) 100%)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgb(var(--rpg-border) / 0.3)' 
      }}
    >
      {/* Left: Pause Menu trigger + Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="w-12 h-12 rounded-xl flex items-center justify-center border-2 border-transparent hover:border-primary/50 text-text hover:text-primary transition-all hover:scale-105 active:scale-95 shadow-lg group relative"
          style={{ backgroundColor: 'rgb(var(--rpg-card) / 0.8)' }}
        >
          <Menu size={24} className="group-hover:text-primary transition-colors" />
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-lg relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgb(var(--rpg-primary)), rgb(var(--rpg-secondary)))' }}>
            <div className="absolute inset-0 rpg-scanlines opacity-50" />
            <span className="relative z-10 text-white font-black text-xs">CR</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-black text-text text-sm leading-tight" style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '10px' }}>Code<br/>Realm</h1>
          </div>
        </div>
      </div>

      {/* Right: user stats and theme toggle */}
      {user && (
        <div className="ml-auto flex items-center gap-4">
          <button
            onClick={onMuteToggle}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-card border border-border text-muted hover:text-text transition-colors"
            title={isMuted ? "Activar música" : "Silenciar música"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-card border border-border text-muted hover:text-text transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
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
