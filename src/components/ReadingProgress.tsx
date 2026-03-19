import { useScrollProgress } from '@/hooks/useScrollProgress'

export function ReadingProgress() {
  const { progress } = useScrollProgress()

  if (progress <= 0) return null

  return (
    <div
      className="reading-progress"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  )
}
