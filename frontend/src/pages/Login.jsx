import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { gsap } from 'gsap'
import ThreeBackground from '../components/three/ThreeBackground'
import { Mail, Lock, Loader2, Zap } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email:    z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

export default function Login() {
  const { login }  = useAuth()
  const navigate   = useNavigate()
  const cardRef    = useRef(null)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 60, scale: 0.95 },
      { opacity: 1, y: 0,  scale: 1, duration: 0.7, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  const onSubmit = async ({ email, password }) => {
    try {
      setError('')
      await login(email, password)
      gsap.to(cardRef.current, {
        scale: 1.05, opacity: 0, duration: 0.3,
        onComplete: () => navigate('/')
      })
    } catch (err) {
      setError(err.response?.data?.error || 'Credenciales incorrectas')
      gsap.fromTo(cardRef.current, { x: 0 }, { x: [-12, 12, -8, 8, 0], duration: 0.4, ease: 'power2.inOut' })
    }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <ThreeBackground />

      <div ref={cardRef} className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-3xl shadow-2xl shadow-primary/40 mb-4 animate-float">
            CQ
          </div>
          <h1 className="text-3xl font-black gradient-text">CodeQuest</h1>
          <p className="text-muted mt-1 text-sm">Aprende programación jugando 🎮</p>
        </div>

        <div className="glass-card p-8 border border-border/60 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-1">Bienvenido de vuelta</h2>
          <p className="text-muted text-sm mb-6">Continúa tu aventura de código</p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-danger/10 border border-danger/30 text-danger text-sm flex items-center gap-2">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-xs text-muted font-medium block mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input {...register('email')} type="email" placeholder="tu@email.com" className="input pl-10" />
              </div>
              {errors.email && <p className="text-danger text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-xs text-muted font-medium block mb-1.5">Contraseña</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input {...register('password')} type="password" placeholder="••••••••" className="input pl-10" />
              </div>
              {errors.password && <p className="text-danger text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Zap size={18} />}
              {isSubmitting ? 'Entrando...' : 'Iniciar Sesión'}
            </button>
          </form>

          <p className="text-center text-muted text-sm mt-6">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-primary hover:text-secondary font-semibold transition-colors">
              Regístrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
