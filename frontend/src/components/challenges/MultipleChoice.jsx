import { useState, useRef } from 'react'
import { gsap } from 'gsap'

export default function MultipleChoice({ challenge, onAnswer }) {
  const [answered, setAnswered] = useState(false)
  const optionsRef = useRef(null)

  const opciones = challenge.metadata_json?.opciones || []

  const handleSelect = (opcion) => {
    if (answered) return
    setAnswered(true)

    const clean = (s) => (s || '').trim().toLowerCase()
    const correctVal = clean(challenge.respuesta_correcta)
    const isCorrect = clean(opcion) === correctVal

    const btns = optionsRef.current?.querySelectorAll('button')
    btns?.forEach(btn => {
      const val = clean(btn.dataset.value)
      const isCorrectBtn = val === correctVal
      const isSelectedWrong = val === clean(opcion) && !isCorrect

      if (isCorrectBtn) {
        // ✅ SOLID GREEN fill — fully opaque
        gsap.to(btn, {
          borderColor: '#3FB950',
          backgroundColor: '#3FB950',
          color: '#fff',
          scale: val === clean(opcion) ? 1.03 : 1,
          duration: 0.35,
          ease: 'back.out(1.5)',
        })
        const badge = btn.querySelector('[data-badge]')
        if (badge) gsap.to(badge, { borderColor: 'rgba(255,255,255,0.4)', backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', duration: 0.3 })
      } else if (isSelectedWrong) {
        // ❌ SOLID RED fill — fully opaque
        gsap.to(btn, {
          borderColor: '#F85149',
          backgroundColor: '#F85149',
          color: '#fff',
          duration: 0.3,
          ease: 'power2.out',
        })
        const badge = btn.querySelector('[data-badge]')
        if (badge) gsap.to(badge, { borderColor: 'rgba(255,255,255,0.4)', backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', duration: 0.3 })
        // Shake
        gsap.fromTo(btn, { x: 0 }, { x: [-10, 10, -7, 7, -4, 4, 0], duration: 0.5, ease: 'none' })
      } else {
        // Dim the other buttons
        gsap.to(btn, { opacity: 0.35, duration: 0.3 })
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
          className="relative p-4 rounded-xl border-2 border-border bg-card/70 text-left text-sm font-bold text-text
                     hover:border-primary/60 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10
                     transition-all duration-200 disabled:cursor-not-allowed flex items-center gap-3 group"
        >
          {/* Letter badge */}
          <span
            data-badge
            className="w-8 h-8 rounded-lg border border-border bg-surface flex items-center justify-center
                       text-xs font-black text-muted group-hover:text-primary group-hover:border-primary/40
                       flex-shrink-0 transition-colors font-mono"
          >
            {String.fromCharCode(65 + i)}
          </span>
          <span className="leading-snug">{op}</span>
        </button>
      ))}
    </div>
  )
}
