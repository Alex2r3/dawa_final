import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { gsap } from 'gsap'
import {
  LayoutDashboard, Globe, Trophy, User,
  BarChart2, LogOut, Swords, Zap
} from 'lucide-react'
import { useEffect, useRef } from 'react'

const links = [
  { to: '/',             icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/worlds',       icon: Globe,           label: 'Mundos' },
  { to: '/achievements', icon: Trophy,          label: 'Logros' },
  { to: '/ranking',      icon: Swords,          label: 'Ranking' },
  { to: '/stats',        icon: BarChart2,       label: 'Estadísticas' },
  { to: '/profile',      icon: User,            label: 'Perfil' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const sidebarRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(sidebarRef.current,
      { x: -80, opacity: 0 },
      { x: 0,   opacity: 1, duration: 0.6, ease: 'power3.out' }
    )
  }, [])

  const handleLogout = () => {
    gsap.to(sidebarRef.current, {
      x: -80, opacity: 0, duration: 0.3,
      onComplete: () => { logout(); navigate('/login') }
    })
  }

  return (
    <aside
      ref={sidebarRef}
      className="hidden md:flex flex-col w-64 min-h-screen bg-surface/80 backdrop-blur-md border-r border-border"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-lg shadow-lg shadow-primary/30">
          CQ
        </div>
        <div>
          <h1 className="font-black text-white text-lg leading-none">CodeQuest</h1>
          <p className="text-muted text-xs mt-0.5">v1.0</p>
        </div>
      </div>

      {/* User mini-card */}
      {user && (
        <div className="mx-4 mt-4 p-3 rounded-xl bg-card/60 border border-border">
          <div className="flex items-center gap-3">
            <img src={user.avatar} alt={user.username} className="w-9 h-9 rounded-full ring-2 ring-primary/50" />
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm truncate">{user.username}</p>
              <p className="text-muted text-xs">Nivel {user.nivel}</p>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-accent font-bold flex items-center gap-1">
              <Zap size={11} /> {user.xp_total?.toLocaleString()} XP
            </span>
            <span className="text-yellow-400 font-bold">🪙 {user.monedas}</span>
          </div>
        </div>
      )}

      {/* Nav links */}
      <nav className="flex-1 px-3 mt-4 space-y-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
              ${isActive
                ? 'bg-primary/20 text-primary border border-primary/30 shadow-sm shadow-primary/20'
                : 'text-muted hover:text-text hover:bg-card/60'}`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} className={isActive ? 'text-primary' : 'text-muted group-hover:text-text'} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <button onClick={handleLogout} className="btn-danger w-full flex items-center justify-center gap-2 text-sm">
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
