import { ArrowUp } from 'lucide-react'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { cn } from '@/lib/utils'

export function ScrollToTop() {
  const { isScrolled } = useScrollProgress()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-8 right-8 z-40 flex h-10 w-10 items-center justify-center rounded-full',
        'bg-secondary text-foreground shadow-[var(--shadow-card)]',
        'transition-all duration-500 ease-out hover:shadow-[var(--shadow-elevated)]',
        'hover:scale-110 active:scale-95',
        isScrolled
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0 pointer-events-none'
      )}
      aria-label="回到顶部"
    >
      <ArrowUp size={16} />
    </button>
  )
}
