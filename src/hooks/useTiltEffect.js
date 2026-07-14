import { useRef, useCallback, useEffect } from 'react'

const DRAG_SENSITIVITY = 8
const SMOOTHING = 0.08
const MAX_TILT_DEG = 35
const DECAY_RATE = 0.88

export function useTiltEffect(ref, { enabled = true, maxTilt = MAX_TILT_DEG, mode = 'drag' } = {}) {
  const stateRef = useRef({
    held: false,
    dragTiltX: 0,
    dragTiltY: 0,
    lastMoveX: 0,
    lastMoveY: 0,
    lastMoveT: 0,
  })

  const applyTilt = useCallback((tiltX, tiltY) => {
    if (ref.current) {
      ref.current.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
    }
  }, [ref])

  const animateTilt = useCallback(() => {
    const state = stateRef.current
    if (Math.abs(state.dragTiltX) < 0.1 && Math.abs(state.dragTiltY) < 0.1) {
      state.dragTiltX = 0
      state.dragTiltY = 0
      if (ref.current) {
        ref.current.style.transform = ''
      }
      return
    }
    state.dragTiltX *= DECAY_RATE
    state.dragTiltY *= DECAY_RATE
    applyTilt(state.dragTiltX, state.dragTiltY)
    requestAnimationFrame(animateTilt)
  }, [ref, applyTilt])

  // ---- DRAG MODE ----
  const handleMouseDown = useCallback((e) => {
    if (!enabled || mode !== 'drag' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const state = stateRef.current
    state.lastMoveX = e.clientX
    state.lastMoveY = e.clientY
    state.lastMoveT = performance.now()

    const originX = `${((e.clientX - rect.left) / rect.width) * 100}%`
    const originY = `${((e.clientY - rect.top) / rect.height) * 100}%`
    ref.current.style.transformOrigin = `${originX} ${originY}`
    ref.current.style.transition = 'none'
    state.held = true
  }, [enabled, mode, ref])

  useEffect(() => {
    if (!enabled || mode !== 'drag') return

    if (ref.current) {
      ref.current.style.transformStyle = 'preserve-3d'
    }

    const handleMouseMove = (e) => {
      const state = stateRef.current
      if (!state.held) return

      const now = performance.now()
      const dt = Math.max(1, now - state.lastMoveT)
      const velX = ((e.clientX - state.lastMoveX) / dt) * 16
      const velY = ((e.clientY - state.lastMoveY) / dt) * 16
      state.lastMoveX = e.clientX
      state.lastMoveY = e.clientY
      state.lastMoveT = now

      const targetTiltY = Math.max(-maxTilt, Math.min(maxTilt, velX * DRAG_SENSITIVITY))
      const targetTiltX = Math.max(-maxTilt, Math.min(maxTilt, -velY * DRAG_SENSITIVITY))

      state.dragTiltX += (targetTiltX - state.dragTiltX) * SMOOTHING
      state.dragTiltY += (targetTiltY - state.dragTiltY) * SMOOTHING
      applyTilt(state.dragTiltX, state.dragTiltY)
    }

    const handleMouseUp = () => {
      const state = stateRef.current
      if (!state.held) return
      state.held = false
      if (ref.current) ref.current.style.transition = 'transform 0.25s ease-out'
      animateTilt()
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [enabled, mode, maxTilt, ref, animateTilt, applyTilt])

  // ---- HOVER MODE ----
  useEffect(() => {
    if (!enabled || mode !== 'hover') return

    const el = ref.current
    if (!el) return

    el.style.transition = 'transform 0.15s ease-out, box-shadow 0.15s ease-out'
    el.style.transformStyle = 'preserve-3d'

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) / (rect.width / 2)
      const deltaY = (e.clientY - centerY) / (rect.height / 2)
      const tiltX = -deltaY * maxTilt * 0.45
      const tiltY = deltaX * maxTilt * 0.45

      // Add dynamic shadow based on tilt direction and tilt amount
      const shadowX = -deltaX * 8
      const shadowY = -deltaY * 8
      const blur = 10 + Math.abs(deltaX) * 8 + Math.abs(deltaY) * 8
      const opacity = 0.15 + (Math.abs(deltaX) + Math.abs(deltaY)) * 0.1

      el.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`
      el.style.boxShadow = `${shadowX}px ${shadowY}px ${blur}px rgba(0,0,0,${Math.min(opacity, 0.35)})`
    }

    const handleMouseLeave = () => {
      el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s ease-out'
      el.style.transform = ''
      el.style.boxShadow = ''
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
      el.style.transform = ''
      el.style.boxShadow = ''
    }
  }, [enabled, mode, maxTilt, ref, applyTilt])

  return { handleMouseDown }
}
