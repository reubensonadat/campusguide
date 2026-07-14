import { useRef, useState, useCallback } from 'react'

const MAGNETIC_RADIUS = 120
const MAX_SHIFT = 10

export default function MagneticButton({ children, className, as: Tag = 'button', style, ...props }) {
  const ref = useRef(null)
  const [shift, setShift] = useState({ x: 0, y: 0 })

  const onMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.hypot(dx, dy)

    if (dist < MAGNETIC_RADIUS) {
      const strength = 1 - dist / MAGNETIC_RADIUS
      const ease = strength * strength
      setShift({
        x: (dx / dist || 0) * MAX_SHIFT * ease,
        y: (dy / dist || 0) * MAX_SHIFT * ease,
      })
    } else {
      setShift({ x: 0, y: 0 })
    }
  }, [])

  const onMouseLeave = useCallback(() => {
    setShift({ x: 0, y: 0 })
  }, [])

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: `translate(${shift.x}px, ${shift.y}px)`,
        transition: 'transform 0.15s ease-out',
        willChange: 'transform',
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </Tag>
  )
}
