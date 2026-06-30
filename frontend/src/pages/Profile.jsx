import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'
import { useGsapEntrance } from '../hooks/useGsap'
import api from '../services/api'
import SkeletonLoader from '../components/ui/SkeletonLoader'
import { User, Calendar, Zap, Trophy, Award, BarChart2, Pencil, Check, X, Loader2 } from 'lucide-react'

// ── DiceBear avatar options ───────────────────────────────────────────────────
// 12 pixel-art seeds + 3 adventurer seeds for variety
const AVATAR_SEEDS = [
  { seed: 'hero-warrior',   style: 'pixel-art' },
  { seed: 'ninja-coder',    style: 'pixel-art' },
  { seed: 'wizard-dev',     style: 'pixel-art' },
  { seed: 'ranger-algo',    style: 'pixel-art' },
  { seed: 'paladin-loop',   style: 'pixel-art' },
  { seed: 'rogue-debug',    style: 'pixel-art' },
  { seed: 'mage-array',     style: 'pixel-art' },
  { seed: 'knight-logic',   style: 'pixel-art' },
  { seed: 'archer-git',     style: 'pixel-art' },
  { seed: 'druid-css',      style: 'pixel-art' },
  { seed: 'bard-python',    style: 'pixel-art' },
  { seed: 'monk-js',        style: 'pixel-art' },
  { seed: 'berserker-rust', style: 'pixel-art' },
  { seed: 'sorcerer-go',    style: 'pixel-art' },
  { seed: 'cleric-java',    style: 'pixel-art' },
  { seed: 'enchanter-ts',   style: 'pixel-art' },
]

function avatarUrl(seed, style = 'pixel-art') {
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`
}

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const queryClient = useQueryClient()
  const pageRef = useGsapEntrance('.gsap-item')

  // Edit state
  const [editing, setEditing]         = useState(false)
  const [newUsername, setNewUsername]  = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState('')
  const [saving, setSaving]           = useState(false)
  const [saveError, setSaveError]     = useState('')
  const [saveSuccess, setSaveSuccess] = useState(false)

  const { data: statsData,        isLoading: statsLoading } = useQuery({
    queryKey: ['stats'],
    queryFn:  () => api.get('/stats').then(r => r.data),
  })
  const { data: achievementsData, isLoading: achsLoading } = useQuery({
    queryKey: ['achievements'],
    queryFn:  () => api.get('/achievements').then(r => r.data),
  })

  const stats               = statsData || {}
  const achievements        = achievementsData?.achievements || []
  const unlockedAchievements = achievements.filter(a => a.unlocked)
  const nivel               = user?.nivel || 1

  const startEdit = () => {
    setNewUsername(user?.username || '')
    setSelectedAvatar(user?.avatar || '')
    setSaveError('')
    setSaveSuccess(false)
    setEditing(true)
  }

  const cancelEdit = () => {
    setEditing(false)
    setSaveError('')
  }

  const handleSave = async () => {
    if (!newUsername.trim() || newUsername.trim().length < 3) {
      setSaveError('El nombre debe tener al menos 3 caracteres')
      return
    }
    setSaving(true)
    setSaveError('')
    try {
      await updateProfile(newUsername.trim(), selectedAvatar)
      queryClient.invalidateQueries({ queryKey: ['ranking'] })
      setSaveSuccess(true)
      setTimeout(() => {
        setEditing(false)
        setSaveSuccess(false)
      }, 1200)
    } catch (err) {
      setSaveError(err.response?.data?.error || 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div ref={pageRef} className="max-w-4xl mx-auto space-y-6">

      {/* ── ADVENTURER CARD ── */}
      <div
        className="gsap-item relative overflow-hidden rounded-2xl p-6 md:p-8"
        style={{
          background: 'linear-gradient(135deg, rgba(88,166,255,0.06) 0%, rgb(var(--rpg-surface)) 50%, rgba(188,140,255,0.04) 100%)',
          border: '1px solid rgb(var(--rpg-border))',
          boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)',
        }} />
        <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none" style={{
          background: 'radial-gradient(circle, rgba(88,166,255,0.07) 0%, transparent 70%)',
        }} />

        <div className="relative z-10">
          {/* Pixel label + Edit button */}
          <div className="flex items-center justify-between mb-5">
            <div style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '8px', color: '#58A6FF', letterSpacing: '2px', opacity: 0.8,
            }}>
              ── ADVENTURER CARD ──
            </div>
            {!editing ? (
              <button
                onClick={startEdit}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105"
                style={{
                  background: 'rgba(88,166,255,0.12)',
                  border: '1px solid rgba(88,166,255,0.3)',
                  color: '#58A6FF',
                }}
              >
                <Pencil size={13} /> Editar Perfil
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={cancelEdit}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105"
                  style={{ background: 'rgba(248,81,73,0.12)', border: '1px solid rgba(248,81,73,0.3)', color: '#F85149' }}
                >
                  <X size={13} /> Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105 disabled:opacity-60"
                  style={{ background: saveSuccess ? 'rgba(63,185,80,0.2)' : 'rgba(63,185,80,0.12)', border: `1px solid ${saveSuccess ? '#3FB950' : 'rgba(63,185,80,0.3)'}`, color: '#3FB950' }}
                >
                  {saving ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
                  {saveSuccess ? '¡Guardado!' : 'Guardar'}
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-3xl animate-rpg-pulse pointer-events-none" style={{
                boxShadow: '0 0 0 2px rgba(88,166,255,0.5), 0 0 24px rgba(88,166,255,0.15)',
                borderRadius: 24,
              }} />
              <img
                src={editing ? (selectedAvatar || user?.avatar) : user?.avatar}
                alt={user?.username}
                className="w-24 h-24 rounded-3xl relative bg-white/10"
                style={{ border: '2px solid rgb(var(--rpg-border))', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
              />
              {/* Level badge */}
              <div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, #58A6FF, #BC8CFF)',
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: '7px',
                  color: '#fff',
                  boxShadow: '0 2px 12px rgba(88,166,255,0.5)',
                }}
              >
                LV {nivel}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-2 pt-2">
              {editing ? (
                <div className="space-y-1">
                  <label className="text-xs text-muted font-bold block">Nombre de Aventurero</label>
                  <input
                    value={newUsername}
                    onChange={e => setNewUsername(e.target.value)}
                    maxLength={50}
                    className="w-full px-3 py-2 rounded-xl text-sm font-bold text-text outline-none transition-all"
                    style={{
                      background: 'rgb(var(--rpg-bg))',
                      border: '1.5px solid rgba(88,166,255,0.4)',
                      boxShadow: '0 0 0 3px rgba(88,166,255,0.08)',
                    }}
                    placeholder="Tu nombre de héroe..."
                  />
                  {saveError && (
                    <p className="text-xs text-red-400 font-medium">⚠️ {saveError}</p>
                  )}
                </div>
              ) : (
                <h1 className="text-3xl font-black text-text">{user?.username}</h1>
              )}
              <p className="text-muted text-sm flex items-center justify-center md:justify-start gap-1.5">
                <User size={14} /> {user?.email}
              </p>
              {user?.created_at && (
                <p className="text-muted text-xs flex items-center justify-center md:justify-start gap-1.5">
                  <Calendar size={14} />
                  Miembro desde: {new Date(user.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              )}
            </div>

            {/* Stats chips */}
            <div className="flex gap-3 flex-shrink-0">
              <div className="text-center px-4 py-3 rounded-xl" style={{
                background: 'rgba(88,166,255,0.08)', border: '1px solid rgba(88,166,255,0.2)',
              }}>
                <span className="text-[9px] block mb-1 text-muted" style={{ fontFamily: '"Press Start 2P"' }}>NIVEL</span>
                <span className="text-2xl font-black text-primary">{nivel}</span>
              </div>
              <div className="text-center px-4 py-3 rounded-xl" style={{
                background: 'rgba(227,179,65,0.08)', border: '1px solid rgba(227,179,65,0.2)',
              }}>
                <span className="text-[9px] block mb-1 text-muted" style={{ fontFamily: '"Press Start 2P"' }}>MONEDAS</span>
                <span className="text-2xl font-black text-yellow-400">🪙 {user?.monedas || 0}</span>
              </div>
            </div>
          </div>

          {/* ── Avatar Picker (only in edit mode) ── */}
          {editing && (
            <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgb(var(--rpg-border))' }}>
              <p className="text-xs font-bold mb-3" style={{
                fontFamily: '"Press Start 2P", monospace', fontSize: '8px',
                color: '#BC8CFF', letterSpacing: '1.5px',
              }}>
                ── ELIGE TU PERSONAJE ──
              </p>
              <div className="grid grid-cols-8 gap-2">
                {AVATAR_SEEDS.map(({ seed, style }) => {
                  const url = avatarUrl(seed, style)
                  const isSelected = selectedAvatar === url
                  return (
                    <button
                      key={seed}
                      onClick={() => setSelectedAvatar(url)}
                      className="relative rounded-xl overflow-hidden transition-all duration-200 hover:scale-110 focus:outline-none"
                      title={seed}
                      style={{
                        border: isSelected ? '2.5px solid #BC8CFF' : '2px solid transparent',
                        boxShadow: isSelected ? '0 0 12px rgba(188,140,255,0.6)' : 'none',
                        background: 'rgba(255,255,255,0.06)',
                        padding: 2,
                      }}
                    >
                      <img
                        src={url}
                        alt={seed}
                        className="w-full aspect-square rounded-lg"
                        style={{ imageRendering: 'pixelated' }}
                      />
                      {isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-xl"
                          style={{ background: 'rgba(188,140,255,0.25)' }}>
                          <Check size={16} color="#fff" strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── CONTENT GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Stats column */}
        <div className="gsap-item md:col-span-1">
          <div className="relative overflow-hidden rounded-xl p-6 space-y-4 bg-card border border-border">
            <h2 className="font-bold text-text flex items-center gap-2 pb-3" style={{
              borderBottom: '1px solid rgb(var(--rpg-border))',
            }}>
              <BarChart2 size={18} style={{ color: '#58A6FF' }} />
              <span>Estadísticas</span>
            </h2>

            {statsLoading ? <SkeletonLoader count={3} /> : (
              <div className="space-y-3">
                {[
                  { label: 'Intentos Totales',     value: stats.total_attempts   || 0, color: '#58A6FF' },
                  { label: 'Respuestas Correctas', value: stats.correct_attempts || 0, color: '#3FB950' },
                  { label: 'Precisión General',    value: `${stats.accuracy || 0}%`,   color: '#3FB950' },
                  { label: 'Racha Actual',         value: `${stats.current_streak || 0} 🔥`, color: '#F85149' },
                  { label: 'Racha Máxima',         value: `${stats.max_streak || 0} ⚡`,     color: '#E3B341' },
                  { label: 'Niveles Jugados',      value: stats.levels_completed || 0, color: '#BC8CFF' },
                ].map(({ label, value, color }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center text-sm pb-2"
                    style={{ borderBottom: '1px solid rgb(var(--rpg-border) / 0.5)' }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-0.5 h-4 rounded-full" style={{ background: color }} />
                      <span className="text-muted font-medium">{label}</span>
                    </div>
                    <span className="font-black text-sm" style={{ color }}>{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Achievements column */}
        <div className="gsap-item md:col-span-2">
          <div className="relative overflow-hidden rounded-xl p-6 space-y-4 bg-card border border-border">
            <h2 className="font-bold text-text flex items-center gap-2 pb-3" style={{
              borderBottom: '1px solid rgb(var(--rpg-border))',
            }}>
              <Award size={18} style={{ color: '#E3B341' }} />
              Logros Recientes ({unlockedAchievements.length})
            </h2>

            {achsLoading ? <SkeletonLoader count={4} /> : (
              unlockedAchievements.length === 0 ? (
                <div className="text-center py-8 text-muted text-sm space-y-3">
                  <Trophy size={36} className="mx-auto opacity-20" />
                  <p>Aún no has desbloqueado ningún logro.</p>
                  <p className="text-xs">¡Sigue completando niveles para desbloquear el primero!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {unlockedAchievements.slice(0, 6).map(ach => (
                    <div
                      key={ach.id}
                      className="flex items-center gap-3 p-3.5 rounded-xl"
                      style={{
                        background: 'rgba(227,179,65,0.06)',
                        border: '1px solid rgba(227,179,65,0.2)',
                      }}
                    >
                      <span className="text-2xl">{ach.icono}</span>
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs text-text truncate">{ach.nombre}</h4>
                        <p className="text-[10px] text-muted line-clamp-1">{ach.descripcion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
