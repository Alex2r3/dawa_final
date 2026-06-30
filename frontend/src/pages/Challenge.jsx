import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'
import { gsap } from 'gsap'
import api from '../services/api'

// Import challenge components
import MultipleChoice from '../components/challenges/MultipleChoice'
import TrueFalse from '../components/challenges/TrueFalse'
import SortLines from '../components/challenges/SortLines'
import CompleteCode from '../components/challenges/CompleteCode'
import PredictOutput from '../components/challenges/PredictOutput'
import MatchConcepts from '../components/challenges/MatchConcepts'

// Import UI components
import Timer from '../components/ui/Timer'
import SkeletonLoader from '../components/ui/SkeletonLoader'
import AchievementModal from '../components/ui/AchievementModal'
import { useGsapEntrance } from '../hooks/useGsap'
import { ChevronLeft, Zap, Coins, AlertCircle, CheckCircle2, XCircle, ArrowRight, Play } from 'lucide-react'

export default function Challenge() {
  const { levelId } = useParams()
  const navigate    = useNavigate()
  const { refreshUser } = useAuth()
  const queryClient = useQueryClient()
  const pageRef     = useGsapEntrance('.gsap-item')

  // Page states: 'intro' | 'playing' | 'feedback' | 'summary'
  const [status, setStatus] = useState('intro')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  
  // Results details
  const [xpEarned, setXpEarned] = useState(0)
  const [coinsEarned, setCoinsEarned] = useState(0)
  const [unlockedAchievement, setUnlockedAchievement] = useState(null)

  // Current answer feedback
  const [answerFeedback, setAnswerFeedback] = useState(null)
  const [timerRunning, setTimerRunning] = useState(false)
  const [wasTimeout, setWasTimeout] = useState(false)

  // Time tracking
  const startTimeRef = useRef(null)

  // 1. Fetch Level details
  const { data: levelData, isLoading: levelLoading } = useQuery({
    queryKey: ['level-detail', levelId],
    queryFn: () => api.get(`/levels/${levelId}/detail`).then(r => r.data),
  })

  // 2. Fetch Level challenges
  const { data: challengesData, isLoading: challengesLoading } = useQuery({
    queryKey: ['level-challenges', levelId],
    queryFn: () => api.get(`/challenges/level/${levelId}`).then(r => r.data),
    enabled: status !== 'intro', // Load only when starting
  })

  const level = levelData?.level
  const challenges = challengesData?.challenges || []
  const currentChallenge = challenges[currentIndex]

  // Reset states on unmount or levelId change
  useEffect(() => {
    setStatus('intro')
    setCurrentIndex(0)
    setCorrectCount(0)
    setXpEarned(0)
    setCoinsEarned(0)
    setAnswerFeedback(null)
    setUnlockedAchievement(null)
  }, [levelId])

  const handleStart = () => {
    setStatus('playing')
    setTimerRunning(true)
    startTimeRef.current = Date.now()
  }

  const handleAnswerSubmit = async (answer) => {
    if (status !== 'playing') return
    setTimerRunning(false)

    const endTime = Date.now()
    const timeTaken = startTimeRef.current ? Math.round((endTime - startTimeRef.current) / 1000) : 5

    try {
      // POST answer to backend
      const response = await api.post(`/challenges/${currentChallenge.id}/answer`, {
        answer,
        time_taken: timeTaken
      })

      const feedback = response.data
      setAnswerFeedback(feedback)
      setStatus('feedback')

      if (feedback.is_correct) {
        setCorrectCount(c => c + 1)
        setXpEarned(x => x + (feedback.xp_earned || 0))
        setCoinsEarned(c => c + (feedback.coins_earned || 0))
      }

      // Check if any achievements were unlocked (if returned from backend)
      if (feedback.unlocked_achievements?.length > 0) {
        setUnlockedAchievement(feedback.unlocked_achievements[0])
      }
    } catch (err) {
      console.error('Error answering challenge:', err)
      // Fallback feedback on error
      setAnswerFeedback({
        is_correct: false,
        correct_answer: 'Error al verificar',
        explicacion: 'No se pudo conectar con el servidor para validar la respuesta.'
      })
      setStatus('feedback')
    }
  }

  const handleTimeout = () => {
    setWasTimeout(true)
    handleAnswerSubmit('__timeout__')
  }

  const handleNext = () => {
    setAnswerFeedback(null)
    setWasTimeout(false)

    if (currentIndex < challenges.length - 1) {
      setCurrentIndex(idx => idx + 1)
      setStatus('playing')
      setTimerRunning(true)
      startTimeRef.current = Date.now()
    } else {
      // Finished all challenges — invalidate levels query so progress count refreshes
      setStatus('summary')
      refreshUser()
      if (level?.world_id) {
        queryClient.invalidateQueries({ queryKey: ['levels', level.world_id] })
      }
    }
  }

  if (levelLoading) {
    return <SkeletonLoader fullPage />
  }

  if (!level) {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-4">
        <AlertCircle className="mx-auto text-danger" size={48} />
        <h2 className="text-xl font-bold text-text">Nivel no encontrado</h2>
        <button onClick={() => navigate('/worlds')} className="btn-primary">Volver a Mundos</button>
      </div>
    )
  }

  return (
    <div ref={pageRef} className="max-w-2xl mx-auto py-4">
      {unlockedAchievement && (
        <AchievementModal
          achievement={unlockedAchievement}
          onClose={() => setUnlockedAchievement(null)}
        />
      )}

      {/* Intro View */}
      {status === 'intro' && (
        <div className="gsap-item glass-card p-8 text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="relative z-10 space-y-4">
            <span className="text-5xl block">{level.worlds?.icono || '🌍'}</span>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 border border-primary/20 text-primary">
              MUNDO: {level.worlds?.nombre}
            </div>
            <h1 className="text-3xl font-black text-text">{level.titulo}</h1>
            <p className="text-muted max-w-md mx-auto text-sm">{level.descripcion}</p>

            {/* Rewards info */}
            <div className="flex justify-center gap-6 py-4">
              <div className="bg-card/40 border border-border p-4 rounded-2xl w-28">
                <Zap className="mx-auto text-accent mb-1" size={24} />
                <span className="text-lg font-black text-text">+{level.xp_recompensa}</span>
                <p className="text-muted text-xs">XP Base</p>
              </div>
              <div className="bg-card/40 border border-border p-4 rounded-2xl w-28">
                <Coins className="mx-auto text-yellow-400 mb-1" size={24} />
                <span className="text-lg font-black text-text">+{level.monedas_recompensa}</span>
                <p className="text-muted text-xs">Monedas</p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate(`/worlds/${level.world_id}`)}
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <ChevronLeft size={16} /> Volver a Niveles
              </button>
              <button
                onClick={handleStart}
                className="btn-primary flex items-center justify-center gap-2 px-6"
              >
                <Play size={16} fill="currentColor" /> Iniciar Nivel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Playing View */}
      {status === 'playing' && challengesLoading && (
        <SkeletonLoader count={3} />
      )}

      {status === 'playing' && !challengesLoading && currentChallenge && (
        <div className="space-y-6">
          {/* Progress bar header */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (window.confirm('¿Seguro que quieres salir? Perderás el progreso de esta sesión.')) {
                  navigate(`/worlds/${level.world_id}`)
                }
              }}
              className="text-muted hover:text-text transition-colors flex-shrink-0"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: 'rgb(var(--rpg-border))' }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(currentIndex / challenges.length) * 100}%`,
                  background: 'linear-gradient(90deg, #58A6FF, #BC8CFF)',
                  boxShadow: '0 0 8px rgba(88,166,255,0.6)',
                }}
              />
            </div>
            <span
              className="text-xs font-black tabular-nums flex-shrink-0"
              style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px', color: 'rgb(var(--rpg-muted))' }}
            >
              {currentIndex + 1}/{challenges.length}
            </span>
          </div>

          {/* Timer */}
          <div className="glass-card p-4">
            <Timer
              key={currentIndex}
              dificultad={level.dificultad}
              onExpire={handleTimeout}
              running={timerRunning}
            />
          </div>

          {/* Question Card */}
          <div className="glass-card p-6 space-y-4">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase"
              style={{
                background: 'rgba(88,166,255,0.1)',
                border: '1px solid rgba(88,166,255,0.3)',
                color: '#58A6FF',
                fontFamily: '"Press Start 2P", monospace',
                fontSize: '7px',
                letterSpacing: '0.5px',
              }}
            >
              {currentChallenge.tipo}
            </span>
            <h2 className="text-lg font-bold text-text leading-relaxed">
              {currentChallenge.pregunta}
            </h2>

            {/* Code Block if any */}
            {currentChallenge.codigo && currentChallenge.tipo !== 'complete' && (
              <pre className="code-block text-sm">
                <code>{currentChallenge.codigo}</code>
              </pre>
            )}

            {/* Sub-component based on type */}
            <div className="pt-4 border-t border-border/40">
              {currentChallenge.tipo === 'multiple' && (
                <MultipleChoice
                  key={currentChallenge.id}
                  challenge={currentChallenge}
                  onAnswer={handleAnswerSubmit}
                />
              )}
              {currentChallenge.tipo === 'truefalse' && (
                <TrueFalse
                  key={currentChallenge.id}
                  challenge={currentChallenge}
                  onAnswer={handleAnswerSubmit}
                />
              )}
              {currentChallenge.tipo === 'sort' && (
                <SortLines
                  key={currentChallenge.id}
                  challenge={currentChallenge}
                  onAnswer={handleAnswerSubmit}
                />
              )}
              {currentChallenge.tipo === 'complete' && (
                <CompleteCode
                  key={currentChallenge.id}
                  challenge={currentChallenge}
                  onAnswer={handleAnswerSubmit}
                />
              )}
              {(currentChallenge.tipo === 'predict' || currentChallenge.tipo === 'fix') && (
                <PredictOutput
                  key={currentChallenge.id}
                  challenge={currentChallenge}
                  onAnswer={handleAnswerSubmit}
                />
              )}
              {currentChallenge.tipo === 'match' && (
                <MatchConcepts
                  key={currentChallenge.id}
                  challenge={currentChallenge}
                  onAnswer={handleAnswerSubmit}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Feedback View */}
      {status === 'feedback' && answerFeedback && (
        <div className="space-y-6">
          <div className={`glass-card p-8 border-2 transition-all duration-300 relative overflow-hidden
            ${answerFeedback.is_correct ? 'border-success/40 bg-success/5' : 'border-danger/40 bg-danger/5'}`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10 bg-current rounded-full translate-x-12 -translate-y-12" />

            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              {answerFeedback.is_correct ? (
                <>
                  <CheckCircle2 size={64} className="text-success animate-bounce" />
                  <h2 className="text-2xl font-black text-success">¡Excelente trabajo!</h2>
                  <p className="text-sm text-text">Respuesta correcta.</p>
                  
                  {/* Rewards display */}
                  <div className="flex gap-4 pt-2">
                    <span className="flex items-center gap-1 text-xs font-bold text-accent bg-accent/15 px-3 py-1.5 rounded-full border border-accent/20">
                      <Zap size={14} /> +{answerFeedback.xp_earned || 0} XP
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-yellow-400 bg-yellow-400/10 px-3 py-1.5 rounded-full border border-yellow-400/20">
                      <Coins size={14} /> +{answerFeedback.coins_earned || 0} Monedas
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <XCircle size={64} className="text-danger" />
                  <h2 className="text-2xl font-black text-danger">
                    {wasTimeout ? '¡Tiempo Agotado!' : 'Respuesta Incorrecta'}
                  </h2>
                  <div className="text-left w-full space-y-3 bg-black/40 border border-border p-4 rounded-xl font-mono text-xs">
                    <div>
                      <span className="text-muted">Respuesta correcta:</span>
                      <pre className="text-success mt-1 whitespace-pre-wrap font-sans font-bold text-sm">
                        {answerFeedback.correct_answer}
                      </pre>
                    </div>
                  </div>
                </>
              )}

              {answerFeedback.explicacion && (
                <div className="text-left w-full border-t border-border/40 pt-4 mt-2">
                  <span className="text-xs text-muted font-bold block mb-1">EXPLICACIÓN:</span>
                  <p className="text-xs text-muted leading-relaxed font-medium">
                    {answerFeedback.explicacion}
                  </p>
                </div>
              )}

              <button
                onClick={handleNext}
                className={`w-full py-3.5 rounded-xl font-black flex items-center justify-center gap-2 transition-all duration-200 mt-4
                  ${answerFeedback.is_correct ? 'bg-success hover:bg-success-hover text-white shadow-lg shadow-success/20' : 'bg-danger hover:bg-danger/80 text-white shadow-lg shadow-danger/10'}`}
              >
                {currentIndex < challenges.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Summary View */}
      {status === 'summary' && (
        <div className="gsap-item glass-card p-8 text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-success/5 to-transparent" />
          <div className="relative z-10 space-y-6">
            <span className="text-6xl block">🎉</span>
            <h1 className="text-3xl font-black text-text">¡Nivel Completado!</h1>
            <p className="text-muted text-sm max-w-md mx-auto">
              Has respondido {correctCount} de {challenges.length} desafíos de forma correcta en {level.titulo}.
            </p>

            {/* Total Results */}
            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto py-2">
              <div className="bg-card/40 border border-border p-4 rounded-2xl text-center">
                <Zap className="mx-auto text-accent mb-1" size={24} />
                <span className="text-lg font-black text-accent">{xpEarned}</span>
                <p className="text-muted text-xs">XP Ganada</p>
              </div>
              <div className="bg-card/40 border border-border p-4 rounded-2xl text-center">
                <Coins className="mx-auto text-yellow-400 mb-1" size={24} />
                <span className="text-lg font-black text-yellow-400">{coinsEarned}</span>
                <p className="text-muted text-xs">Monedas</p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigate(`/worlds/${level.world_id}`)}
                className="btn-primary w-full py-3.5"
              >
                Volver a la Lista de Niveles
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
