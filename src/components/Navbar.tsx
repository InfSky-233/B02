import { Link, useLocation } from 'react-router-dom'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useScrollProgress } from '@/hooks/useScrollProgress'

interface NavbarProps {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const navLinks = [
  { to: '/', label: '文章' },
  { to: '/categories', label: '分类' },
  { to: '/about', label: '关于' },
]

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  const { isScrolled } = useScrollProgress()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 theme-transition',
        isScrolled
          ? 'bg-background/85 backdrop-blur-md shadow-[var(--shadow-subtle)]'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-wide items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-lg font-bold tracking-tight text-foreground transition-opacity duration-300 hover:opacity-70"
        >
          墨
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'link-underline text-sm tracking-wide transition-colors duration-300',
                location.pathname === link.to
                  ? 'text-foreground font-medium active'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            className="rounded-md p-2 text-muted-foreground transition-all duration-300 hover:bg-secondary hover:text-foreground active:scale-95"
            aria-label="切换主题"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="rounded-md p-2 text-muted-foreground transition-all duration-300 hover:bg-secondary hover:text-foreground"
            aria-label="切换主题"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-md p-2 text-muted-foreground transition-all duration-300 hover:bg-secondary hover:text-foreground"
            aria-label="菜单"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-500 ease-in-out md:hidden',
          mobileOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="border-t border-border bg-background/95 backdrop-blur-md px-6 py-4">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'ripple block rounded-md px-3 py-3 text-sm transition-colors duration-300',
                location.pathname === link.to
                  ? 'text-foreground font-medium bg-secondary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
