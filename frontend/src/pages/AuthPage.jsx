import '../styles/auth-rpg.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock, User, Loader2, Sword, Shield, Star, Zap, Map, Scroll } from 'lucide-react'
import GoogleLoginButton from '../components/ui/GoogleLoginButton'

// ─── Validation Schemas ───────────────────────────────────────────────────────
const loginSchema = z.object({
  email:    z.string().email('ID de entrenador inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

const registerSchema = z.object({
  username: z.string().min(3, 'Mínimo 3 caracteres').max(50, 'Máximo 50'),
  email:    z.string().email('Email de aventurero inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  confirm:  z.string(),
}).refine(d => d.password === d.confirm, {
  message: 'Las contraseñas no coinciden',
  path: ['confirm'],
})

// ─── Floating Sparkle Particle ────────────────────────────────────────────────
function Sparkle({ style }) {
  return (
    <div className="sparkle-particle" style={style} />
  )
}

// ─── RPG Hero SVG (Login side) ────────────────────────────────────────────────
function HeroIllustration() {
  return (
    <div className="hero-scene">
      {/* Floating map/book */}
      <div className="hero-book">
        <div className="book-cover">
          <div className="book-emblem">⚔️</div>
          <div className="book-title">Quest<br/>Log</div>
          <div className="book-lines">
            <div className="bline" /><div className="bline" /><div className="bline w-2/3" />
          </div>
        </div>
      </div>

      {/* RPG Hero character */}
      <div className="hero-char">
        {/* Head */}
        <div className="hero-head">
          <div className="hero-face">
            <div className="hero-eyes">
              <div className="hero-eye" /><div className="hero-eye" />
            </div>
            <div className="hero-mouth" />
          </div>
          <div className="hero-hair" />
        </div>
        {/* Body */}
        <div className="hero-body">
          <div className="hero-badge">⭐</div>
        </div>
        {/* Cape */}
        <div className="hero-cape" />
        {/* Legs */}
        <div className="hero-legs">
          <div className="hero-leg" /><div className="hero-leg" />
        </div>
        {/* Sword */}
        <div className="hero-sword">
          <div className="sword-blade" />
          <div className="sword-guard" />
          <div className="sword-handle" />
        </div>
      </div>

      {/* XP bar floating UI element */}
      <div className="hud-xp">
        <div className="hud-label">⚡ XP</div>
        <div className="hud-bar-track">
          <div className="hud-bar-fill" style={{ width: '72%' }} />
        </div>
        <div className="hud-value">720 / 1000</div>
      </div>

      {/* Level badge */}
      <div className="hud-level">
        <div className="hud-lv-num">Lv.7</div>
        <div className="hud-lv-label">Coder</div>
      </div>

      {/* Floating stars */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="float-star" style={{
          left: `${10 + i * 11}%`,
          top: `${5 + (i % 4) * 20}%`,
          animationDelay: `${i * 0.4}s`,
          animationDuration: `${2 + (i % 3) * 0.7}s`,
          fontSize: `${10 + (i % 3) * 6}px`,
          opacity: 0.6 + (i % 3) * 0.15,
        }}>★</div>
      ))}
    </div>
  )
}

// ─── RPG Wizard SVG (Register side) ──────────────────────────────────────────
function WizardIllustration() {
  return (
    <div className="hero-scene wizard-scene">
      {/* Scroll/character creation panel */}
      <div className="hero-book wizard-scroll">
        <div className="book-cover scroll-cover">
          <div className="book-emblem">🌟</div>
          <div className="book-title" style={{ color: '#059669' }}>New<br/>Hero</div>
          <div className="scroll-stats">
            <div className="stat-pip"><span>STR</span><div className="pip-bar"><div style={{ width: '80%' }} /></div></div>
            <div className="stat-pip"><span>INT</span><div className="pip-bar"><div style={{ width: '95%' }} /></div></div>
            <div className="stat-pip"><span>SPD</span><div className="pip-bar"><div style={{ width: '60%' }} /></div></div>
          </div>
        </div>
      </div>

      {/* Wizard character */}
      <div className="hero-char wizard-char">
        <div className="wizard-hat">
          <div className="hat-star">⭐</div>
        </div>
        <div className="hero-head wizard-head">
          <div className="hero-face">
            <div className="hero-eyes">
              <div className="hero-eye wizard-eye" /><div className="hero-eye wizard-eye" />
            </div>
            <div className="wizard-smile" />
          </div>
          <div className="wizard-hair" />
        </div>
        <div className="hero-body wizard-body">
          <div className="hero-badge">🔮</div>
        </div>
        <div className="wizard-robe-skirt" />
        <div className="wizard-staff">
          <div className="staff-pole" />
          <div className="staff-orb">✨</div>
        </div>
      </div>

      {/* Stats HUD */}
      <div className="hud-xp wizard-hud">
        <div className="hud-label">🔮 MAGIC</div>
        <div className="hud-bar-track">
          <div className="hud-bar-fill wizard-bar" style={{ width: '45%' }} />
        </div>
        <div className="hud-value">Beginner</div>
      </div>

      <div className="hud-level wizard-level">
        <div className="hud-lv-num">Lv.1</div>
        <div className="hud-lv-label">NEW!</div>
      </div>

      {/* Floating sparkles */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="float-star wizard-star" style={{
          left: `${8 + i * 11}%`,
          top: `${8 + (i % 4) * 18}%`,
          animationDelay: `${i * 0.35}s`,
          animationDuration: `${1.8 + (i % 3) * 0.8}s`,
          fontSize: `${8 + (i % 3) * 7}px`,
          opacity: 0.5 + (i % 3) * 0.2,
        }}>✦</div>
      ))}
    </div>
  )
}

// ─── Main Auth Page ───────────────────────────────────────────────────────────
export default function AuthPage({ defaultMode = 'login' }) {
  const [mode, setMode]         = useState(defaultMode)
  const [error, setError]       = useState('')
  const [transitioning, setTransitioning] = useState(false)
  const { login, register: authRegister, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const isLogin  = mode === 'login'

  const loginForm = useForm({ resolver: zodResolver(loginSchema) })
  const regForm   = useForm({ resolver: zodResolver(registerSchema) })

  const form         = isLogin ? loginForm : regForm
  const { register, handleSubmit, formState: { errors, isSubmitting } } = form

  // Reset errors on mode switch
  useEffect(() => { setError('') }, [mode])

  const switchMode = () => {
    if (transitioning) return
    setTransitioning(true)
    setTimeout(() => {
      setMode(m => m === 'login' ? 'register' : 'login')
      setTransitioning(false)
    }, 400)
  }

  const startMusicIfAllowed = () => {
    if (window.ambientAudio && localStorage.getItem('cq_music_muted') !== 'true') {
      window.ambientAudio.play().catch((err) => {
        console.log('Interaction playback failed or blocked:', err)
      })
    }
  }

  const onSubmit = async (values) => {
    try {
      setError('')
      startMusicIfAllowed()
      if (isLogin) {
        await login(values.email, values.password)
      } else {
        await authRegister(values.username, values.email, values.password)
      }
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || (isLogin ? 'Credenciales incorrectas' : 'Error al registrar'))
    }
  }

  const handleGoogleSuccess = async (credential) => {
    try {
      setError('')
      startMusicIfAllowed()
      await loginWithGoogle(credential)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión con Google')
    }
  }

  const handleGoogleError = (errMessage) => {
    setError(errMessage || 'Error al conectar con Google')
  }

  const sparkles = [
    { top: '12%', left: '8%',  animationDelay: '0s',    fontSize: '14px' },
    { top: '22%', left: '88%', animationDelay: '0.6s',  fontSize: '10px' },
    { top: '75%', left: '5%',  animationDelay: '1.1s',  fontSize: '16px' },
    { top: '85%', left: '92%', animationDelay: '0.3s',  fontSize: '12px' },
    { top: '50%', left: '3%',  animationDelay: '1.5s',  fontSize: '9px'  },
    { top: '40%', left: '95%', animationDelay: '0.8s',  fontSize: '11px' },
  ]

  return (
    <div className="auth-root">
      {/* Background */}
      <div className="auth-bg" />
      <div className="auth-bg-grid" />

      {/* Floating global sparkles */}
      {sparkles.map((s, i) => (
        <Sparkle key={i} style={{ ...s, position: 'fixed' }} />
      ))}

      {/* Main container */}
      <div className={`auth-container ${transitioning ? 'auth-transitioning' : ''}`}>

        {/* ── LEFT PANEL ── */}
        <div className={`auth-panel auth-panel-left ${isLogin ? 'is-form-side' : 'is-art-side'}`}>
          {isLogin ? (
            /* LOGIN FORM */
            <div className="auth-form-wrap">
              {/* Logo */}
              <div className="auth-logo">
                <div className="logo-icon">⚔️</div>
                <h1 className="logo-title">CodeRealm</h1>
                <p className="logo-sub">Plataforma Gamificada de Programación</p>
              </div>

              {/* Panel title */}
              <div className="panel-header">
                <div className="panel-icon-chip blue">🗺️</div>
                <div>
                  <h2 className="panel-title">¡Bienvenido, Aventurero!</h2>
                  <p className="panel-subtitle">Continúa tu gesta de código</p>
                </div>
              </div>

              {error && <div className="auth-error">⚠️ {error}</div>}

              <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                {/* Email */}
                <div className="field-group">
                  <label className="field-label">🎫 ID de Entrenador (Email)</label>
                  <div className="field-wrap">
                    <input
                      {...register('email')}
                      id="login-email"
                      type="email"
                      placeholder="heroe@coderealm.com"
                      className="auth-input"
                    />
                  </div>
                  {errors.email && <p className="field-error">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div className="field-group">
                  <label className="field-label">🔑 Contraseña Secreta</label>
                  <div className="field-wrap">
                    <input
                      {...register('password')}
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      className="auth-input"
                    />
                  </div>
                  {errors.password && <p className="field-error">{errors.password.message}</p>}
                </div>

                <button
                  id="login-submit"
                  type="submit"
                  disabled={isSubmitting}
                  className="auth-btn auth-btn-blue"
                >
                  {isSubmitting
                    ? <><Loader2 size={16} className="spin-icon" /> Cargando misión...</>
                    : <><Zap size={16} /> ¡Comenzar Aventura!</>
                  }
                </button>
              </form>

              <div className="auth-oauth-divider">
                <span className="divider-text">O continúa con</span>
              </div>

              <GoogleLoginButton onSuccess={handleGoogleSuccess} onError={handleGoogleError} text="signin_with" />

              <div className="auth-switch">
                <span>¿Primera vez en CodeRealm?</span>
                <button id="go-to-register" onClick={switchMode} className="switch-link green">
                  ✨ Únete a la Quest
                </button>
              </div>
            </div>
          ) : (
            /* REGISTER side art */
            <div className="auth-art-wrap green-art">
              <WizardIllustration />
              <div className="art-caption">
                <h3 className="art-title green-title">¡Crea tu Héroe!</h3>
                <p className="art-desc">Cada gran aventurero empieza desde cero</p>
                <div className="art-badges">
                  <span className="art-badge">🌍 10 Mundos</span>
                  <span className="art-badge">⚔️ 50 Niveles</span>
                  <span className="art-badge">🏆 20 Logros</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── CENTER DIVIDER ── */}
        <div className="auth-divider">
          <div className="divider-line" />
          <div className="divider-gem">{isLogin ? '⚔️' : '🔮'}</div>
          <div className="divider-line" />
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className={`auth-panel auth-panel-right ${isLogin ? 'is-art-side' : 'is-form-side'}`}>
          {isLogin ? (
            /* LOGIN side art */
            <div className="auth-art-wrap blue-art">
              <HeroIllustration />
              <div className="art-caption">
                <h3 className="art-title blue-title">Tu aventura te espera</h3>
                <p className="art-desc">Aprende programación como si fuera un videojuego</p>
                <div className="art-badges">
                  <span className="art-badge">💻 100 Desafíos</span>
                  <span className="art-badge">⭐ Rankings</span>
                  <span className="art-badge">🎖️ Logros</span>
                </div>
              </div>
            </div>
          ) : (
            /* REGISTER FORM */
            <div className="auth-form-wrap">
              <div className="auth-logo">
                <div className="logo-icon">🔮</div>
                <h1 className="logo-title green-logo">CodeRealm</h1>
                <p className="logo-sub">Únete a la comunidad de guerreros del código</p>
              </div>

              <div className="panel-header">
                <div className="panel-icon-chip green">📜</div>
                <div>
                  <h2 className="panel-title">Crear Personaje</h2>
                  <p className="panel-subtitle">Comienza tu leyenda hoy</p>
                </div>
              </div>

              {error && <div className="auth-error">⚠️ {error}</div>}

              <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                {/* Username */}
                <div className="field-group">
                  <label className="field-label">⚔️ Nombre de Entrenador</label>
                  <div className="field-wrap">
                    <input
                      {...register('username')}
                      id="reg-username"
                      placeholder="NombreDeHéroe"
                      className="auth-input green-input"
                    />
                  </div>
                  {errors.username && <p className="field-error">{errors.username.message}</p>}
                </div>

                {/* Email */}
                <div className="field-group">
                  <label className="field-label">🎫 Email</label>
                  <div className="field-wrap">
                    <input
                      {...register('email')}
                      id="reg-email"
                      type="email"
                      placeholder="heroe@coderealm.com"
                      className="auth-input green-input"
                    />
                  </div>
                  {errors.email && <p className="field-error">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div className="field-group">
                  <label className="field-label">🔑 Contraseña</label>
                  <div className="field-wrap">
                    <input
                      {...register('password')}
                      id="reg-password"
                      type="password"
                      placeholder="••••••••"
                      className="auth-input green-input"
                    />
                  </div>
                  {errors.password && <p className="field-error">{errors.password.message}</p>}
                </div>

                {/* Confirm */}
                <div className="field-group">
                  <label className="field-label">🛡️ Confirmar Contraseña</label>
                  <div className="field-wrap">
                    <input
                      {...register('confirm')}
                      id="reg-confirm"
                      type="password"
                      placeholder="••••••••"
                      className="auth-input green-input"
                    />
                  </div>
                  {errors.confirm && <p className="field-error">{errors.confirm.message}</p>}
                </div>

                <button
                  id="register-submit"
                  type="submit"
                  disabled={isSubmitting}
                  className="auth-btn auth-btn-green"
                >
                  {isSubmitting
                    ? <><Loader2 size={16} className="spin-icon" /> Creando héroe...</>
                    : <><Star size={16} /> ¡Unirse a la Quest!</>
                  }
                </button>
              </form>

              <div className="auth-oauth-divider">
                <span className="divider-text">O continúa con</span>
              </div>

              <GoogleLoginButton onSuccess={handleGoogleSuccess} onError={handleGoogleError} text="signup_with" />

              <div className="auth-switch">
                <span>¿Ya eres un aventurero?</span>
                <button id="go-to-login" onClick={switchMode} className="switch-link blue">
                  ⚔️ Iniciar Sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>


      {/* Bottom watermark */}
      <div className="auth-footer">
        <span>⚔️ CodeRealm · Plataforma Gamificada de Programación · 2026</span>
      </div>
    </div>
  )
}
