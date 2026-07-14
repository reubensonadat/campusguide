import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, animate, useTransform, AnimatePresence } from 'framer-motion'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const SPRING_ARROW = { stiffness: 600, damping: 40, mass: 0.3 }
const SPRING_LABEL = { stiffness: 140, damping: 22, mass: 0.9 }
const SPRING_GLOW = { stiffness: 100, damping: 16, mass: 0.8 }

const EMOJIS = ['🔥', '❤️', '👍', '🎉', '✨', '👀', '🤝', '💀', '😂', '😭']

function isClickable(el) {
  if (!el) return false
  const tag = el.tagName?.toLowerCase()
  if (tag === 'input' || tag === 'textarea') return false // handled by isText
  if (['a', 'button', 'select'].includes(tag)) return true
  if (el.getAttribute('role') === 'button' || el.getAttribute('onclick') !== null) return true
  if (getComputedStyle(el).cursor === 'pointer') return true
  let p = el.parentElement
  while (p && p !== document.body) {
    if (getComputedStyle(p).cursor === 'pointer') return true
    p = p.parentElement
  }
  return false
}

function isTextInput(el) {
  if (!el) return false
  const tag = el.tagName?.toLowerCase()
  if (tag === 'textarea') return true
  if (tag === 'input') {
    const t = (el.getAttribute('type') || 'text').toLowerCase()
    return ['text', 'search', 'email', 'url', 'password', 'number', 'tel'].includes(t)
  }
  if (el.getAttribute('contenteditable') === 'true') return true
  return false
}

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

export default function CustomCursor() {
  const [profile] = useLocalStorage('ucc_profile', { name: '', phone: '', avatarUrl: '' })
  const cursorName = profile.name?.trim() || 'Student'

  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mql = window.matchMedia('(pointer: coarse)')
    setIsTouch(mql.matches)
    const handler = (e) => setIsTouch(e.matches)
    if (mql.addEventListener) {
      mql.addEventListener('change', handler)
      return () => mql.removeEventListener('change', handler)
    }
  }, [])

  const mouseX = useMotionValue(-9999)
  const mouseY = useMotionValue(-9999)

  const arrowX = useSpring(mouseX, SPRING_ARROW)
  const arrowY = useSpring(mouseY, SPRING_ARROW)
  const labelX = useSpring(mouseX, SPRING_LABEL)
  const labelY = useSpring(mouseY, SPRING_LABEL)
  const glowX = useSpring(mouseX, SPRING_GLOW)
  const glowY = useSpring(mouseY, SPRING_GLOW)

  const [pressed, setPressed] = useState(false)
  const [pointer, setPointer] = useState(false)
  const [textMode, setTextMode] = useState(false)
  const [emojiMode, setEmojiMode] = useState(false)
  const [currentEmoji, setCurrentEmoji] = useState('🔥')
  const [bursts, setBursts] = useState([])
  const burstId = useRef(0)
  const scale = useMotionValue(1)

  useEffect(() => {
    animate(scale, pressed ? 0.85 : 1, {
      type: 'spring', stiffness: 500, damping: 28, mass: 0.4,
    })
  }, [pressed, scale])

  const velocityRef = useRef({ x: 0, y: 0, t: 0 })
  const [labelTilt, setLabelTilt] = useState(0)
  const labelRotate = useSpring(labelTilt, { stiffness: 200, damping: 24, mass: 0.6 })

  const labelOffsetX = 34
  const labelOffsetY = 24
  const labelFinalX = useTransform(labelX, v => v + labelOffsetX)
  const labelFinalY = useTransform(labelY, v => v + labelOffsetY)

  // Emoji mode: hold Shift
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Shift') {
        setEmojiMode(true)
        setCurrentEmoji(EMOJIS[Math.floor(Math.random() * EMOJIS.length)])
      }
    }
    const onKeyUp = (e) => {
      if (e.key === 'Shift') setEmojiMode(false)
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  const onMouseMove = useCallback((e) => {
    const now = performance.now()
    const dt = Math.max(1, now - velocityRef.current.t)
    const vx = ((e.clientX - velocityRef.current.x) / dt) * 1000
    const vy = ((e.clientY - velocityRef.current.y) / dt) * 1000
    velocityRef.current = { x: e.clientX, y: e.clientY, t: now }

    mouseX.set(e.clientX)
    mouseY.set(e.clientY)

    const speed = Math.hypot(vx, vy)
    const norm = Math.min(1, speed / 1500)
    const sign = vx === 0 ? 0 : vx > 0 ? 1 : -1
    setLabelTilt(sign * norm * 20)

    const el = document.elementFromPoint(e.clientX, e.clientY)
    setPointer(isClickable(el))
    setTextMode(isTextInput(el))
  }, [mouseX, mouseY])

  const audioCtxRef = useRef(null)

  const playClick = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }
      const ctx = audioCtxRef.current
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = 800
      osc.type = 'sine'
      gain.gain.setValueAtTime(0.03, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.06)
    } catch {}
  }, [])

  const onMouseDown = useCallback((e) => {
    setPressed(true)
    playClick()

    // Click burst
    const id = ++burstId.current
    const count = 6
    const particles = Array.from({ length: count }, (_, i) => ({
      id: `${id}-${i}`,
      x: e.clientX,
      y: e.clientY,
      angle: (i / count) * Math.PI * 2 + randomBetween(-0.3, 0.3),
      dist: randomBetween(20, 50),
      size: randomBetween(2, 5),
      color: i % 2 === 0 ? '#ffffff' : 'rgba(255,255,255,0.5)',
    }))
    setBursts(prev => [...prev, ...particles])
    setTimeout(() => {
      setBursts(prev => prev.filter(p => !p.id.startsWith(`${id}-`)))
    }, 600)
  }, [])

  const onMouseUp = useCallback(() => {
    setPressed(false)
  }, [])

  useEffect(() => {
    if (isTouch) return
    const style = document.createElement('style')
    style.id = 'custom-cursor-hide'
    style.textContent = '* { cursor: none !important; }'
    document.head.appendChild(style)
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    return () => {
      const s = document.getElementById('custom-cursor-hide')
      if (s) s.remove()
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [isTouch, onMouseMove, onMouseDown, onMouseUp])

  if (isTouch) return null

  const cursorW = pressed ? 26 : textMode ? 18 : pointer ? 24 : 26
  const cursorViewBox = `0 0 ${cursorW} ${cursorW}`
  const origin = textMode ? '9px 9px' : pointer ? '12px 12px' : pressed ? '13px 13px' : '0% 0%'

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999999, pointerEvents: 'none' }}>
      {/* Cursor glow */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0, left: 0,
          x: glowX,
          y: glowY,
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      {/* Click burst particles */}
      <AnimatePresence>
        {bursts.map(p => (
          <motion.div
            key={p.id}
            initial={{
              x: p.x,
              y: p.y,
              scale: 0,
              opacity: 1,
            }}
            animate={{
              x: p.x + Math.cos(p.angle) * p.dist,
              y: p.y + Math.sin(p.angle) * p.dist,
              scale: 1,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: p.color,
              pointerEvents: 'none',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Label */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0, left: 0,
          x: labelFinalX,
          y: labelFinalY,
          rotate: labelRotate,
          scale,
          background: emojiMode ? 'transparent' : '#1a1a1a',
          color: '#fff',
          borderRadius: 999,
          padding: emojiMode ? 0 : '5px 12px',
          fontSize: emojiMode ? 22 : 11,
          fontWeight: 600,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          whiteSpace: 'nowrap',
          letterSpacing: 0.1,
          boxShadow: emojiMode ? 'none' : '0 4px 14px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1)',
          transformOrigin: '0% 50%',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {emojiMode ? currentEmoji : cursorName}
      </motion.div>

      {/* Cursor icon */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0, left: 0,
          x: arrowX,
          y: arrowY,
          scale,
          width: cursorW,
          height: cursorW,
          transformOrigin: origin,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {pressed ? (
          <svg width={cursorW} height={cursorW} viewBox={cursorViewBox} fill="none" style={{ display: 'block' }}>
            <circle cx={cursorW / 2} cy={cursorW / 2} r={cursorW * 0.35} fill="white" stroke="rgba(0,0,0,0.15)" strokeWidth={1} />
            <circle cx={cursorW / 2} cy={cursorW / 2} r={cursorW * 0.13} fill="#1a1a1a" />
          </svg>
        ) : textMode ? (
          <svg width={18} height={18} viewBox="0 0 18 18" fill="none" style={{ display: 'block' }}>
            <rect x="8" y="1" width="2" height="16" rx="1" fill="white" />
            <rect x="3" y="4" width="2" height="10" rx="0.8" fill="rgba(255,255,255,0.4)" />
            <rect x="13" y="4" width="2" height="10" rx="0.8" fill="rgba(255,255,255,0.4)" />
          </svg>
        ) : pointer ? (
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
            <circle cx="12" cy="12" r="9" stroke="white" strokeWidth={1.5} opacity={0.6} />
            <line x1="12" y1="3" x2="12" y2="7" stroke="white" strokeWidth={1.5} strokeLinecap="round" />
            <line x1="12" y1="17" x2="12" y2="21" stroke="white" strokeWidth={1.5} strokeLinecap="round" />
            <line x1="3" y1="12" x2="7" y2="12" stroke="white" strokeWidth={1.5} strokeLinecap="round" />
            <line x1="17" y1="12" x2="21" y2="12" stroke="white" strokeWidth={1.5} strokeLinecap="round" />
            <circle cx="12" cy="12" r="2" fill="white" />
          </svg>
        ) : (
          <svg width={26} height={26} viewBox="0 0 26 26" fill="none" style={{ display: 'block' }}>
            <path
              d="M3 2 L22 13 L13 15 L10 23 Z"
              fill="white"
              stroke="rgba(0,0,0,0.15)"
              strokeWidth={1}
              strokeLinejoin="round"
            />
          </svg>
        )}
      </motion.div>
    </div>
  )
}
