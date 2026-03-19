import { posts } from '@/data/posts'
import { BlogCard } from '@/components/BlogCard'
import { useStaggeredInView } from '@/hooks/useInView'

export function Home() {
  const { containerRef, visibleItems } = useStaggeredInView(posts.length, 80)

  return (
    <main className="mx-auto max-w-content px-6 pb-20 pt-32">
      {/* Page header */}
      <header className="mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          文章
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          关于技术、设计与思考的记录。
        </p>
      </header>

      {/* Article list */}
      <div ref={containerRef} className="flex flex-col gap-6">
        {posts.map((post, index) => (
          <BlogCard
            key={post.id}
            post={post}
            index={index}
            isVisible={visibleItems.has(index)}
          />
        ))}
      </div>
    </main>
  )
}
