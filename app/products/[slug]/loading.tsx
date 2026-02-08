export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-8">
        <div className="h-4 w-32 animate-pulse rounded bg-stone-200" />
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Image skeleton */}
        <div className="relative aspect-square w-full animate-pulse rounded-lg bg-stone-200" />

        {/* Content skeleton */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="h-8 w-48 animate-pulse rounded bg-stone-200" />
            <div className="mt-2 h-6 w-24 animate-pulse rounded bg-stone-200" />
          </div>

          <div className="h-12 w-full animate-pulse rounded-full bg-stone-200" />

          <div className="border-t border-stone-200 pt-6">
            <div className="mb-3 h-4 w-24 animate-pulse rounded bg-stone-200" />
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-stone-200" />
              <div className="h-4 w-full animate-pulse rounded bg-stone-200" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-stone-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
