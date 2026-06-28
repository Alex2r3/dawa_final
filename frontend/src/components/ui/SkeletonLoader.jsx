export default function SkeletonLoader({ fullPage = false, count = 3, className = '' }) {
  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary animate-pulse" />
          <div className="h-2 w-32 bg-border rounded-full animate-pulse" />
          <p className="text-muted text-sm">Cargando CodeQuest...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card p-5 animate-pulse">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-border" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-border rounded w-2/3" />
              <div className="h-2 bg-border rounded w-1/3" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-border rounded" />
            <div className="h-2 bg-border rounded w-4/5" />
          </div>
        </div>
      ))}
    </div>
  )
}
