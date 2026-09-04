import { Hexagon } from 'lucide-react'

export default function Logo({ size = 'md' }) {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  }
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Hexagon className={`${sizes[size]} text-honey-500 fill-honey-500/10`} strokeWidth={2.5} />
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-honey-600">HC</span>
      </div>
      <span className="font-heading font-bold text-charcoal-800 text-lg tracking-tight">
        Bee<span className="text-honey-500">Buzz</span>
      </span>
    </div>
  )
}
