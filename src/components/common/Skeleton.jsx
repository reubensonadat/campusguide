export function Skeleton({ className, style }) {
  return (
    <div
      className={`animate-pulse bg-slate-200 rounded-xl ${className || ''}`}
      style={style}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3">
      <Skeleton className="w-full h-32 rounded-xl" />
      <Skeleton className="w-3/4 h-4" />
      <Skeleton className="w-1/2 h-3" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="w-16 h-6 rounded-full" />
        <Skeleton className="w-20 h-6 rounded-full" />
      </div>
    </div>
  )
}

export function ListSkeleton({ rows = 4 }) {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="w-2/3 h-4" />
            <Skeleton className="w-1/3 h-3" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function MapPageSkeleton() {
  return (
    <div className="absolute inset-0 flex">
      <div className="w-96 p-4 space-y-4 bg-white/80 backdrop-blur-sm border-r border-slate-200">
        <Skeleton className="w-full h-10 rounded-xl" />
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-16 rounded-xl" />
          ))}
        </div>
      </div>
      <div className="flex-1 bg-slate-100 flex items-center justify-center">
        <Skeleton className="w-3/4 h-3/4 rounded-2xl" />
      </div>
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <Skeleton className="w-48 h-8" />
      <Skeleton className="w-full h-48 rounded-2xl" />
      <div className="space-y-3">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-5/6 h-4" />
        <Skeleton className="w-2/3 h-4" />
      </div>
      <div className="grid grid-cols-2 gap-4 pt-4">
        <Skeleton className="h-32 rounded-2xl" />
        <Skeleton className="h-32 rounded-2xl" />
      </div>
    </div>
  )
}
