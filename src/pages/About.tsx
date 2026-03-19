import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

export function About() {
  const { ref: bioRef, isInView: bioVisible } = useInView()
  const { ref: expRef, isInView: expVisible } = useInView()
  const { ref: contactRef, isInView: contactVisible } = useInView()

  return (
    <main className="mx-auto max-w-content px-6 pb-20 pt-32">
      {/* Header */}
      <header className="mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          关于我
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          写代码、做设计、偶尔写点文字。
        </p>
      </header>

      {/* Bio section */}
      <section
        ref={bioRef}
        className={cn(
          'mb-16 transition-all duration-700',
          bioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        )}
      >
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full bg-secondary">
            <img
              src="avatar.jpg"
              alt="头像"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="space-y-4">
            <p className="text-base leading-[1.8] text-foreground/90">
              你好，我是一名前端工程师，专注于 Web 技术和用户体验。我相信技术的价值在于解决真实的问题，而好的代码应该像好的文章一样——简洁、清晰、有结构。
            </p>
            <p className="text-base leading-[1.8] text-foreground/90">
              这个博客是我记录技术思考、设计感悟和日常随笔的地方。在这里，我会分享那些在实际工作中积累的经验，以及对技术趋势的个人理解。
            </p>
            <p className="text-base leading-[1.8] text-foreground/90">
              工作之外，我喜欢阅读、摄影和研究各种效率工具。我相信持续学习和知识分享能让整个社区变得更好。
            </p>
          </div>
        </div>
      </section>

      {/* Experience section */}
      <section
        ref={expRef}
        className={cn(
          'mb-16 transition-all duration-700 delay-100',
          expVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        )}
      >
        <h2 className="mb-8 text-xl font-bold text-foreground">技术栈</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { area: '前端开发', skills: 'React, TypeScript, Next.js, Tailwind CSS' },
            { area: '工具与工程化', skills: 'Vite, Webpack, ESLint, GitHub Actions' },
            { area: '设计', skills: 'Figma, 设计系统, 响应式设计' },
            { area: '其他', skills: 'Node.js, PostgreSQL, Docker, Linux' },
          ].map(item => (
            <div
              key={item.area}
              className="rounded-lg border border-border p-5 transition-all duration-300 hover:border-primary/20 hover:shadow-[var(--shadow-subtle)] theme-transition"
            >
              <h3 className="mb-2 text-sm font-semibold text-foreground">{item.area}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.skills}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact section */}
      <section
        ref={contactRef}
        className={cn(
          'transition-all duration-700 delay-200',
          contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        )}
      >
        <h2 className="mb-6 text-xl font-bold text-foreground">联系方式</h2>
        <div className="space-y-3">
          {[
            { label: 'GitHub', value: 'github.com/example' },
            { label: '邮箱', value: 'hello@example.com' },
            { label: 'Twitter', value: '@example' },
          ].map(item => (
            <div key={item.label} className="flex items-baseline gap-4">
              <span className="w-16 shrink-0 text-sm text-muted-foreground">{item.label}</span>
              <span className="text-sm text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
