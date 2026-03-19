export function Footer() {
  return (
    <footer className="border-t border-border theme-transition">
      <div className="mx-auto max-w-wide px-6 py-12">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; 2024 墨 · 博客
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href="mailto:hello@example.com"
              className="link-underline text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              邮箱
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
