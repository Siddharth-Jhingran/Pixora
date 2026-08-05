import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function PixoraSkeleton() {
  return (
    // Main background container (matching the dark gradient look)
    <div className="min-h-screen w-full bg-[#1A1821] text-zinc-100 p-4 md:p-8">
      {/* --- HEADER SKELETON --- */}
      <header className="flex items-center justify-between pb-10 border-b border-zinc-800/50 mb-10">
        {/* Logo & Subtitle */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-lg bg-zinc-700/50" /> {/* Pixora Logo */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-24 bg-zinc-700/50" /> {/* "Pixora" title */}
            <Skeleton className="h-3 w-40 bg-zinc-700/50" /> {/* Subtitle text */}
          </div>
        </div>
        
        {/* Header Action Buttons */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-32 rounded-full bg-zinc-700/50" /> {/* "Create Post" */}
          <Skeleton className="h-10 w-28 rounded-full bg-zinc-700/50" /> {/* "Log Out" */}
        </div>
      </header>

      {/* --- FEED LAYOUT CONTAINER --- */}
      <div className="max-w-5xl mx-auto space-y-12">
        {/* --- CATEGORY TABS SKELETON --- */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-36 rounded-full bg-zinc-700/50" />
          ))}
        </div>

        {/* --- MAIN POST CARD SKELETON --- */}
        <Card className="bg-[#121118] border-zinc-800 overflow-hidden rounded-3xl shadow-xl">
          {/* Card Header (User Info) */}
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-6 pb-4">
            <Skeleton className="h-14 w-14 rounded-full bg-zinc-700/50" /> {/* User Avatar */}
            <div className="flex-1 space-y-2.5">
              <Skeleton className="h-5 w-40 bg-zinc-700/50" /> {/* Username */}
              <Skeleton className="h-3.5 w-60 bg-zinc-700/50" /> {/* User Tagline */}
            </div>
          </CardHeader>

          {/* Card Content (Main Image) */}
          <CardContent className="p-0 border-t border-b border-zinc-800">
            <div className="aspect-[16/11] w-full">
              <Skeleton className="h-full w-full rounded-none bg-zinc-800/80" />
            </div>
          </CardContent>

          {/* Card Footer (Tags and Time) */}
          <CardFooter className="flex items-center justify-between p-6 pt-5">
            <Skeleton className="h-8 w-24 rounded-full bg-zinc-700/50" /> {/* "Featured" tag */}
            <Skeleton className="h-4 w-16 bg-zinc-700/50" /> {/* Time */}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}