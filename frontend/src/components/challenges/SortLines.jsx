import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Send } from 'lucide-react'

function SortableItem({ id, content }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = { transform: CSS.Transform.toString(transform), transition }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-3 rounded-xl border bg-card/80 font-mono text-sm text-green-400
        transition-all duration-150 select-none
        ${isDragging
          ? 'border-primary/80 bg-primary/10 shadow-lg shadow-primary/20 scale-105 z-50'
          : 'border-border hover:border-primary/40'}`}
    >
      <button
        {...attributes}
        {...listeners}
        className="text-muted hover:text-primary cursor-grab active:cursor-grabbing p-0.5"
      >
        <GripVertical size={16} />
      </button>
      <code>{content}</code>
    </div>
  )
}

export default function SortLines({ challenge, onAnswer }) {
  const lineas = challenge.metadata_json?.lineas || []
  const [items, setItems] = useState(() =>
    lineas.map((l, i) => ({ id: `line-${i}`, content: l }))
  )
  const [submitted, setSubmitted] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = ({ active, over }) => {
    if (over && active.id !== over.id) {
      setItems(prev => {
        const oldIdx = prev.findIndex(i => i.id === active.id)
        const newIdx = prev.findIndex(i => i.id === over.id)
        return arrayMove(prev, oldIdx, newIdx)
      })
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
    const answer = items.map(i => i.content).join('\n')
    setTimeout(() => onAnswer(answer), 300)
  }

  return (
    <div className="space-y-4">
      <p className="text-muted text-sm">Arrastra las líneas para ordenarlas correctamente:</p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {items.map(item => (
              <SortableItem key={item.id} id={item.id} content={item.content} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <button
        onClick={handleSubmit}
        disabled={submitted}
        className="btn-primary flex items-center gap-2 disabled:opacity-50"
      >
        <Send size={16} />
        Confirmar orden
      </button>
    </div>
  )
}
