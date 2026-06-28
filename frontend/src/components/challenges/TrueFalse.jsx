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

    const clean = (s) => String(s || '').trim().toLowerCase()
    const correctVal = clean(challenge.respuesta_correcta)
    const isCorrect = clean(value) === correctVal

    const correctRef = correctVal === 'true' ? trueRef : falseRef
    const wrongRef   = correctVal === 'true' ? falseRef : trueRef

    // ✅ Correct button → SOLID GREEN fill
    gsap.to(correctRef.current, {
      borderColor: '#3FB950',
      backgroundColor: '#3FB950',
      color: '#fff',
      scale: 1.05,
      duration: 0.4,
      ease: 'back.out(1.5)',
    })

    if (!isCorrect) {
      // ❌ Wrong button → SOLID RED fill + shake
      gsap.to(wrongRef.current, {
        borderColor: '#F85149',
        backgroundColor: '#F85149',
        color: '#fff',
        duration: 0.3,
        ease: 'power2.out',
      })
      gsap.fromTo(wrongRef.current,
        { x: 0 },
        { x: [-10, 10, -7, 7, -4, 4, 0], duration: 0.5, ease: 'none' }
      )
    } else {
      // Dim wrong option if answered correctly
      gsap.to(wrongRef.current, { opacity: 0.3, duration: 0.3 })
    }

    setTimeout(() => onAnswer(value), 900)
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* TRUE */}
      <button
        ref={trueRef}
        onClick={() => handleAnswer('true')}
        disabled={answered}
        className="p-6 rounded-2xl border-2 border-border bg-card/70 flex flex-col items-center gap-3
                   hover:border-success/60 hover:bg-success/5 hover:shadow-lg hover:shadow-success/15
                   transition-all duration-200 disabled:cursor-not-allowed group"
      >
        <CheckCircle2 size={44} className="text-success group-hover:scale-110 transition-transform" />
        <span className="text-base font-black text-text group-hover:text-success transition-colors">
          Verdadero
        </span>
      </button>

      {/* FALSE */}
      <button
        ref={falseRef}
        onClick={() => handleAnswer('false')}
        disabled={answered}
        className="p-6 rounded-2xl border-2 border-border bg-card/70 flex flex-col items-center gap-3
                   hover:border-danger/60 hover:bg-danger/5 hover:shadow-lg hover:shadow-danger/15
                   transition-all duration-200 disabled:cursor-not-allowed group"
      >
        <XCircle size={44} className="text-danger group-hover:scale-110 transition-transform" />
        <span className="text-base font-black text-text group-hover:text-danger transition-colors">
          Falso
        </span>
      </button>
    </div>
  )
}
