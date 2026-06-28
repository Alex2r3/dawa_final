import { useState, useRef } from 'react'
import { gsap } from 'gsap'
import { CheckCircle2, XCircle } from 'lucide-react'

export default function TrueFalse({ challenge, onAnswer }) {
  const [answered, setAnswered] = useState(false)
  const trueRef  = useRef(null)
  const falseRef = useRef(null)

  const handleAnswer = (value) => {
    if (answered) return
    setAnswered(true)

    const isCorrect = value === challenge.respuesta_correcta

    const correctRef = challenge.respuesta_correcta === 'true' ? trueRef : falseRef
    const wrongRef   = challenge.respuesta_correcta === 'true' ? falseRef : trueRef

    gsap.to(correctRef.current, { borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.2)', scale: 1.05, duration: 0.3 })
    if (!isCorrect) {
      gsap.to(wrongRef.current,  { borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)', duration: 0.3 })
      gsap.fromTo(wrongRef.current, { x: 0 }, { x: [-10, 10, -6, 6, 0], duration: 0.4, ease: 'power2.inOut' })
    }

    setTimeout(() => onAnswer(value), 800)
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        ref={trueRef}
        onClick={() => handleAnswer('true')}
        disabled={answered}
        className="p-6 rounded-2xl border-2 border-border bg-card/60 flex flex-col items-center gap-3
                   hover:border-success/60 hover:bg-success/5 transition-all duration-200 disabled:cursor-not-allowed"
      >
        <CheckCircle2 size={36} className="text-success" />
        <span className="text-lg font-bold text-white">Verdadero</span>
      </button>
      <button
        ref={falseRef}
        onClick={() => handleAnswer('false')}
        disabled={answered}
        className="p-6 rounded-2xl border-2 border-border bg-card/60 flex flex-col items-center gap-3
                   hover:border-danger/60 hover:bg-danger/5 transition-all duration-200 disabled:cursor-not-allowed"
      >
        <XCircle size={36} className="text-danger" />
        <span className="text-lg font-bold text-white">Falso</span>
      </button>
    </div>
  )
}
