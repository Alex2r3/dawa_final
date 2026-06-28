import { useState } from 'react'
import { Send } from 'lucide-react'

export default function MatchConcepts({ challenge, onAnswer }) {
  // metadata_json: { pairs: [{left: "concepto", right: "definicion"}, ...] }
  const pairs   = challenge.metadata_json?.pairs || []
  const lefts   = pairs.map(p => p.left)
  const rights  = [...pairs.map(p => p.right)].sort(() => Math.random() - 0.5)

  const [selected, setSelected]   = useState(null)  // currently selected left item
  const [matches, setMatches]     = useState({})     // { left: right }
  const [submitted, setSubmitted] = useState(false)

  const handleLeft = (item) => {
    if (submitted) return
    setSelected(selected === item ? null : item)
  }

  const handleRight = (item) => {
    if (!selected || submitted) return
    setMatches(prev => ({ ...prev, [selected]: item }))
    setSelected(null)
  }

  const handleSubmit = () => {
    if (submitted) return
    setSubmitted(true)
    // Build answer string: "left1:right1|left2:right2"
    const answer = Object.entries(matches).map(([k, v]) => `${k}:${v}`).join('|')
    setTimeout(() => onAnswer(answer), 300)
  }

  const matchedRights = new Set(Object.values(matches))

  return (
    <div className="space-y-4">
      <p className="text-muted text-sm">Relaciona cada concepto con su definición:</p>
      <div className="grid grid-cols-2 gap-4">
        {/* Left column */}
        <div className="space-y-2">
          <p className="text-xs text-muted font-semibold uppercase tracking-wider mb-3">Conceptos</p>
          {lefts.map(item => (
            <button
              key={item}
              onClick={() => handleLeft(item)}
              disabled={submitted || item in matches}
              className={`w-full p-3 rounded-xl border text-sm font-medium text-left transition-all duration-200
                ${selected === item        ? 'border-primary bg-primary/20 text-primary' :
                  item in matches          ? 'border-success/50 bg-success/10 text-success' :
                  'border-border bg-card/60 text-text hover:border-primary/40'}`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Right column */}
        <div className="space-y-2">
          <p className="text-xs text-muted font-semibold uppercase tracking-wider mb-3">Definiciones</p>
          {rights.map(item => (
            <button
              key={item}
              onClick={() => handleRight(item)}
              disabled={submitted || matchedRights.has(item)}
              className={`w-full p-3 rounded-xl border text-sm text-left transition-all duration-200
                ${matchedRights.has(item)  ? 'border-success/50 bg-success/10 text-success' :
                  selected                 ? 'border-secondary/50 bg-secondary/5 text-text hover:border-secondary' :
                  'border-border bg-card/60 text-muted'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitted || Object.keys(matches).length < pairs.length}
        className="btn-primary flex items-center gap-2 disabled:opacity-50"
      >
        <Send size={16} /> Confirmar
      </button>
    </div>
  )
}
