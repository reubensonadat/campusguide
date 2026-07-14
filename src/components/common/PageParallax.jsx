import { useRef, useCallback, useEffect } from 'react'

const MAX_TILT = 0.8

export default function PageParallax({ children }) {
  const ref = useRef(null)
  const tiltRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  const onMouseMove = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    tiltRef.current.targetX = ((e.clientX - cx) / (rect.width / 2)) * MAX_TILT
    tiltRef.current.targetY = ((e.clientY - cy) / (rect.height / 2)) * -MAX_TILT
  }, [])

  useEffect(() => {
    let raf
    const tick = () => {
      const t = tiltRef.current
      t.x += (t.targetX - t.x) * 0.05
      t.y += (t.targetY - t.y) * 0.05
      if (ref.current) {
        ref.current.style.transform = `perspective(1000px) rotateX(${t.y}deg) rotateY(${t.x}deg)`
      }
      if (Math.abs(t.x - t.targetX) > 0.01 || Math.abs(t.y - t.targetY) > 0.01) {
        raf = requestAnimationFrame(tick)
      }
    }
    document.addEventListener('mousemove', onMouseMove)
    raf = requestAnimationFrame(tick)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [onMouseMove])

  return (
    <div
      ref={ref}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        transition: 'transform 0.1s ease-out',
      }}
    >
      {children}
    </div>
  )
}
