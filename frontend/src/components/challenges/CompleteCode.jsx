import { useState } from 'react'
import { Send } from 'lucide-react'

export default function CompleteCode({ challenge, onAnswer }) {
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value.trim() || submitted) return
    setSubmitted(true)
    setTimeout(() => onAnswer(value.trim()), 300)
  }

  // Highlight the blank
  const parts = challenge.codigo?.split('___') || []

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {challenge.codigo && (
        <div className="code-block text-sm">
          {parts.map((part, i) => (
            <span key={i}>
              {part}
              {i < parts.length - 1 && (
                <span className="inline-block bg-primary/20 border border-primary/50 rounded px-2 text-primary font-bold">
                  {value || '___'}
                </span>
              )}
            </span>
          ))}
        </div>
      )}
      <div>
        <label className="text-xs text-muted font-medium mb-2 block">
          Completa el espacio en blanco:
        </label>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          disabled={submitted}
          placeholder="Escribe aquí..."
          className="input font-mono"
          autoFocus
        />
      </div>
      <button type="submit" disabled={submitted || !value.trim()} className="btn-primary flex items-center gap-2">
        <Send size={16} /> Enviar
      </button>
    </form>
  )
}
