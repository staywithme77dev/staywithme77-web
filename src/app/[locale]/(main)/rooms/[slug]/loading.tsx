import { Skeleton } from "@/app/components/ui/Skeleton";

export default function RoomDetailLoading() {
  return (
    <div role="status" aria-label="Loading room details" className="min-h-screen bg-background px-4 pb-32 pt-36 md:pb-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-2">
          <Skeleton className="h-3 w-14" />
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3 w-28" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-12">
          <div>
            <Skeleton className="aspect-[4/3] w-full rounded-xl lg:max-h-[560px]" />
            <div className="mt-3 flex gap-2.5 overflow-hidden sm:gap-3">
              {Array.from({ length: 5 }, (_, index) => <Skeleton key={index} className="aspect-square w-[4.25rem] shrink-0 rounded-md sm:w-[calc((100%-2.5rem)/6)]" />)}
            </div>

            <div className="mt-8">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <Skeleton className="mb-3 h-3 w-28" />
                  <Skeleton className="h-9 w-3/4 sm:h-11 sm:w-2/3" />
                </div>
                <Skeleton className="h-7 w-20 rounded-full" />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Skeleton className="h-9 w-28 rounded-full" />
                <Skeleton className="h-9 w-32 rounded-full" />
                <Skeleton className="h-9 w-24 rounded-full" />
              </div>

              <div className="mt-8 border-t border-[#eadfca] pt-7">
                <Skeleton className="mb-4 h-7 w-36" />
                <Skeleton className="h-4 w-full max-w-2xl" />
                <Skeleton className="mt-2 h-4 w-11/12 max-w-2xl" />
                <Skeleton className="mt-2 h-4 w-2/3 max-w-xl" />
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {Array.from({ length: 6 }, (_, index) => <Skeleton key={index} className="h-5 w-full" />)}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-3xl border border-[#eadfca] border-t-4 border-t-accent bg-white p-5 shadow-[0_18px_50px_rgba(26,26,46,0.08)] sm:p-7 lg:sticky lg:top-28">
              <Skeleton className="mb-4 h-7 w-4/5" />
              <Skeleton className="h-10 w-36" />
              <Skeleton className="mt-5 h-28 w-full rounded-2xl" />
              <Skeleton className="mt-5 h-44 w-full rounded-2xl" />
              <Skeleton className="mt-5 h-16 w-full" />
              <Skeleton className="mt-4 h-11 w-full rounded-full" />
              <Skeleton className="mt-3 h-10 w-full rounded-full" />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Skeleton className="mb-6 h-7 w-48" />
          <div className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: 2 }, (_, index) => (
              <div key={index} className="flex gap-4 rounded-2xl border border-[#f3f4f6] bg-white p-4">
                <Skeleton className="h-20 w-24 shrink-0 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-[#eadfca] bg-white/95 px-3 py-3 shadow-[0_-8px_24px_rgba(26,26,46,0.1)] backdrop-blur-md md:hidden">
        <Skeleton className="h-12 w-full rounded-2xl" />
      </div>
    </div>
  );
}
