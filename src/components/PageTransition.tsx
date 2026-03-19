import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    isFirstRender.current = false
  }, [])

  return (
    <div
      key={location.pathname}
      className={isFirstRender.current ? '' : 'animate-fade-in'}
    >
      {children}
    </div>
  )
}
