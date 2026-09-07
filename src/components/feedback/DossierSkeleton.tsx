export function DossierSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="border border-quant-border bg-quant-surface flex flex-col md:flex-row">
        <div className="w-full md:w-64 h-48 md:h-64 bg-quant-bg border-b md:border-b-0 md:border-r border-quant-border flex items-center justify-center p-6">
          <div className="w-32 h-32 md:w-44 md:h-44 bg-quant-surface border border-quant-border" />
        </div>
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="h-10 bg-quant-border/40 w-2/3" />
            <div className="h-4 bg-quant-border/30 w-1/4" />
            <div className="h-12 bg-quant-border/20 w-full mt-4" />
          </div>
          <div className="grid grid-cols-3 border-t border-quant-border pt-4 gap-4">
            <div className="h-8 bg-quant-border/20" />
            <div className="h-8 bg-quant-border/20" />
            <div className="h-8 bg-quant-border/20" />
          </div>
        </div>
      </div>

      {/* Chart Skeleton */}
      <div className="border border-quant-border bg-quant-surface h-72 p-6 flex flex-col justify-between">
        <div className="h-4 bg-quant-border/40 w-48" />
        <div className="flex items-center justify-center">
          <div className="w-40 h-40 rounded-none border-4 border-quant-border/30 border-t-quant-accent/50 animate-spin" />
        </div>
        <div className="h-4 bg-quant-border/20 w-32 self-end" />
      </div>

      {/* Repo Grid Skeleton */}
      <div className="border border-quant-border bg-quant-surface">
        <div className="p-4 border-b border-quant-border">
          <div className="h-4 bg-quant-border/40 w-40" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-6 border-b border-r border-quant-border space-y-3 h-36">
              <div className="h-5 bg-quant-border/40 w-3/4" />
              <div className="h-3 bg-quant-border/20 w-full" />
              <div className="h-3 bg-quant-border/20 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}