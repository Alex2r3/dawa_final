import { useState } from 'react'
import { Send } from 'lucide-react'

export default function PredictOutput({ challenge, onAnswer }) {
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value.trim() || submitted) return
    setSubmitted(true)
    setTimeout(() => onAnswer(value.trim()), 300)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-xs text-muted font-medium mb-2 block">¿Cuál es la salida?</label>
        <textarea
          value={value}
          onChange={e => setValue(e.target.value)}
          disabled={submitted}
          placeholder="Escribe la salida exacta..."
          rows={3}
          className="input font-mono text-sm resize-none"
        />
      </div>
      <button type="submit" disabled={submitted || !value.trim()} className="btn-primary flex items-center gap-2">
        <Send size={16} /> Enviar respuesta
      </button>
    </form>
  )
}
