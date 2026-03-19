import { cn } from '@/lib/utils'

interface TagBadgeProps {
  tag: string
  isActive?: boolean
  onClick?: () => void
  size?: 'sm' | 'md'
}

export function TagBadge({ tag, isActive = false, onClick, size = 'sm' }: TagBadgeProps) {
  const Component = onClick ? 'button' : 'span'
  return (
    <Component
      onClick={onClick}
      className={cn(
        'inline-flex items-center rounded-sm font-medium transition-all duration-300',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-primary/10',
        onClick && 'cursor-pointer active:scale-95'
      )}
    >
      {tag}
    </Component>
  )
}
