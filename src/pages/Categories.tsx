import { useState } from 'react'
import { posts, getAllCategories, getAllTags } from '@/data/posts'
import { BlogCard } from '@/components/BlogCard'
import { TagBadge } from '@/components/TagBadge'
import { useStaggeredInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

export function Categories() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allCategories = getAllCategories()
  const allTags = getAllTags()

  const filteredPosts = posts.filter(post => {
    if (activeCategory && post.category !== activeCategory) return false
    if (activeTag && !post.tags.includes(activeTag)) return false
    return true
  })

  const { containerRef, visibleItems } = useStaggeredInView(filteredPosts.length, 80)

  const clearFilters = () => {
    setActiveCategory(null)
    setActiveTag(null)
  }

  return (
    <main className="mx-auto max-w-content px-6 pb-20 pt-32">
      {/* Header */}
      <header className="mb-12">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          分类与标签
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          按主题浏览所有文章。
        </p>
      </header>

      {/* Categories */}
      <section className="mb-8">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          分类
        </h2>
        <div className="flex flex-wrap gap-2">
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(activeCategory === cat ? null : cat)
              }}
              className={cn(
                'rounded-sm px-4 py-1.5 text-sm font-medium transition-all duration-300',
                'hover:scale-[1.04] active:scale-95',
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-primary/10'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Tags */}
      <section className="mb-12">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          标签
        </h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <TagBadge
              key={tag}
              tag={tag}
              size="md"
              isActive={activeTag === tag}
              onClick={() => {
                setActiveTag(activeTag === tag ? null : tag)
              }}
            />
          ))}
        </div>
      </section>

      {/* Active filters */}
      {(activeCategory || activeTag) && (
        <div className="mb-8 flex items-center gap-3 text-sm text-muted-foreground">
          <span>
            筛选结果：{filteredPosts.length} 篇文章
          </span>
          <button
            onClick={clearFilters}
            className="text-primary transition-colors duration-300 hover:text-primary/80"
          >
            清除筛选
          </button>
        </div>
      )}

      {/* Post list */}
      <div ref={containerRef} className="flex flex-col gap-6">
        {filteredPosts.map((post, index) => (
          <BlogCard
            key={post.id}
            post={post}
            index={index}
            isVisible={visibleItems.has(index)}
          />
        ))}
        {filteredPosts.length === 0 && (
          <p className="py-12 text-center text-muted-foreground">
            没有找到匹配的文章。
          </p>
        )}
      </div>
    </main>
  )
}
