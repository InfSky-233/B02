import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getPostById } from '@/data/posts'
import { ReadingProgress } from '@/components/ReadingProgress'
import { TagBadge } from '@/components/TagBadge'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

function CodeBlock({ content }: { content: string }) {
  return (
    <div className="code-block my-6 overflow-x-auto bg-secondary p-4 text-sm leading-relaxed">
      <pre className="text-foreground">
        <code>{content}</code>
      </pre>
    </div>
  )
}

function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let codeBlock: string[] = []
  let inCodeBlock = false
  let key = 0

  for (const line of lines) {
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(<CodeBlock key={key++} content={codeBlock.join('\n')} />)
        codeBlock = []
        inCodeBlock = false
      } else {
        inCodeBlock = true
      }
      continue
    }

    if (inCodeBlock) {
      codeBlock.push(line)
      continue
    }

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="mb-4 mt-10 text-xl font-bold text-foreground">
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="mb-3 mt-8 text-lg font-semibold text-foreground">
          {line.slice(4)}
        </h3>
      )
    } else if (line.startsWith('- **')) {
      const match = line.match(/- \*\*(.+?)\*\*(.*)/)
      if (match) {
        elements.push(
          <li key={key++} className="mb-2 ml-4 list-disc text-base leading-relaxed text-foreground/90">
            <strong className="font-semibold text-foreground">{match[1]}</strong>
            {match[2]}
          </li>
        )
      }
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={key++} className="mb-2 ml-4 list-disc text-base leading-relaxed text-foreground/90">
          {renderInlineCode(line.slice(2))}
        </li>
      )
    } else if (/^\d+\. /.test(line)) {
      const match = line.match(/^\d+\. (.+)/)
      if (match) {
        elements.push(
          <li key={key++} className="mb-2 ml-4 list-decimal text-base leading-relaxed text-foreground/90">
            {renderInlineCode(match[1])}
          </li>
        )
      }
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-4" />)
    } else {
      elements.push(
        <p key={key++} className="mb-4 text-base leading-[1.8] text-foreground/90">
          {renderInlineCode(line)}
        </p>
      )
    }
  }

  return elements
}

function renderInlineCode(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`)/)
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="rounded-sm bg-secondary px-1.5 py-0.5 text-[0.85em] font-medium text-accent-foreground"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    // Handle bold text
    const boldParts = part.split(/(\*\*[^*]+\*\*)/)
    return boldParts.map((bp, j) => {
      if (bp.startsWith('**') && bp.endsWith('**')) {
        return <strong key={`${i}-${j}`} className="font-semibold text-foreground">{bp.slice(2, -2)}</strong>
      }
      return bp
    })
  })
}

export function ArticleDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const post = getPostById(id || '')
  const { ref: contentRef, isInView } = useInView({ threshold: 0.05 })

  if (!post) {
    return (
      <main className="mx-auto max-w-content px-6 pb-20 pt-32 text-center">
        <h1 className="mb-4 text-2xl font-bold text-foreground">文章未找到</h1>
        <p className="mb-8 text-muted-foreground">抱歉，您访问的文章不存在。</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-primary transition-colors duration-300 hover:text-primary/80"
        >
          <ArrowLeft size={16} />
          返回首页
        </Link>
      </main>
    )
  }

  return (
    <>
      <ReadingProgress />
      <main className="mx-auto max-w-content px-6 pb-20 pt-32">
        {/* Back link */}
        <button
          onClick={() => navigate(-1)}
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground hover:gap-3"
        >
          <ArrowLeft size={14} />
          返回
        </button>

        {/* Article header */}
        <header className="mb-12">
          <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
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
          <h1 className="mb-6 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        </header>

        {/* Article content */}
        <article
          ref={contentRef}
          className={cn(
            'prose-custom transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          {renderContent(post.content)}
        </article>

        {/* Bottom divider */}
        <div className="mt-16 border-t border-border pt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground hover:gap-3"
          >
            <ArrowLeft size={14} />
            所有文章
          </Link>
        </div>
      </main>
    </>
  )
}
