import { useState, useRef } from 'react'
import { gsap } from 'gsap'
import { CheckCircle2, XCircle } from 'lucide-react'

export default function MultipleChoice({ challenge, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const optionsRef = useRef(null)

  const opciones = challenge.metadata_json?.opciones || []

  const handleSelect = (opcion) => {
    if (answered) return
    setSelected(opcion)
    setAnswered(true)

    const isCorrect = opcion.trim().toLowerCase() === challenge.respuesta_correcta?.trim().toLowerCase()

    // Animate feedback
    const btns = optionsRef.current?.querySelectorAll('button')
    btns?.forEach(btn => {
      const val = btn.dataset.value
      if (val === challenge.respuesta_correcta) {
        gsap.to(btn, { borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.15)', duration: 0.3 })
      } else if (val === opcion && !isCorrect) {
        gsap.to(btn, { borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)', duration: 0.3 })
        gsap.fromTo(btn, { x: 0 }, { x: [-8, 8, -6, 6, 0], duration: 0.4, ease: 'power2.inOut' })
      }
    })

    setTimeout(() => onAnswer(opcion), 900)
  }

  return (
    <div ref={optionsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {opciones.map((op, i) => (
        <button
          key={i}
          data-value={op}
          onClick={() => handleSelect(op)}
          disabled={answered}
          className="p-4 rounded-xl border border-border bg-card/60 text-left text-sm font-medium text-text
                     hover:border-primary/50 hover:bg-primary/5 transition-all duration-200
                     disabled:cursor-not-allowed flex items-center gap-3 group"
        >
          <span className="w-7 h-7 rounded-lg bg-border flex items-center justify-center text-xs font-bold text-muted group-hover:text-primary flex-shrink-0">
            {String.fromCharCode(65 + i)}
          </span>
          {op}
        </button>
      ))}
    </div>
  )
}
