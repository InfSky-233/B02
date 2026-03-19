import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { TagBadge } from '@/components/TagBadge'
import type { Post } from '@/data/posts'

interface BlogCardProps {
  post: Post
  index: number
  isVisible: boolean
}

export function BlogCard({ post, index, isVisible }: BlogCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [ripple, setRipple] = useState<{ x: number; y: number; show: boolean }>({
    x: 0,
    y: 0,
    show: false,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      show: true,
    })
  }

  const handleMouseLeave = () => {
    setRipple((prev) => ({ ...prev, show: false }))
  }

  return (
    <article
      data-index={index}
      className={cn(
        'stagger-item group',
        isVisible && 'visible'
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <Link to={`/post/${post.id}`} className="block">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            'relative overflow-hidden rounded-lg border border-border p-6 sm:p-8',
            'transition-all duration-300 ease-out',
            'hover:shadow-[var(--shadow-card-hover)] dark:hover:border-primary/40',
            'cursor-pointer'
          )}
        >
          {/* Gradient border overlay - 仅暗黑模式显示 */}
          {ripple.show && (
            <span
              className="pointer-events-none absolute inset-0 rounded-lg hidden dark:block"
              style={{
                padding: '2px',
                background: `radial-gradient(circle 250px at ${ripple.x}px ${ripple.y}px, #27bd51, transparent 80%)`,
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />
          )}

          {/* Ripple effect - 仅亮色模式显示 */}
          {ripple.show && (
            <span
              className="pointer-events-none absolute rounded-full bg-primary/10 dark:hidden"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 200,
                height: 200,
                transform: `translate(-50%, -50%) scale(2)`,
              }}
            />
          )}

          {/* Meta info */}
          <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span>{post.readingTime} 分钟阅读</span>
          </div>

          {/* Title */}
          <h2 className="mb-2 text-lg font-bold leading-snug text-foreground sm:text-xl">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </Link>
    </article>
  )
}