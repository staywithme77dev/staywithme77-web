import type { HTMLAttributes } from "react";

export function Skeleton({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`animate-pulse rounded-md bg-slate-200 ${className}`} {...props} />;
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return <div className={`space-y-3 rounded-2xl border border-slate-100 bg-white p-4 ${className}`}><Skeleton className="h-40 w-full rounded-xl" /><Skeleton className="h-5 w-2/3" /><Skeleton className="h-3 w-full" /><Skeleton className="h-3 w-4/5" /></div>;
}

export function SkeletonPage() {
  return <div className="min-h-[70vh] bg-[#f9f5f0] px-4 pb-20 pt-32"><div className="mx-auto max-w-7xl space-y-8"><div className="mx-auto max-w-md space-y-3"><Skeleton className="mx-auto h-3 w-32" /><Skeleton className="mx-auto h-10 w-64" /><Skeleton className="mx-auto h-4 w-80" /></div><div className="grid grid-cols-2 gap-4 md:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <SkeletonCard key={index} />)}</div></div></div>;
}
