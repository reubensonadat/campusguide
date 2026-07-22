import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Search, Check } from 'lucide-react'

// ─── constants ───────────────────────────────────────────────────────────────
const LONG_PRESS_MS  = 450   // how long to hold before popover shows
const MOVE_THRESHOLD = 8     // px of drift allowed before cancelling
const POPOVER_W      = 216   // must match rough rendered width
const POPOVER_H      = 52

// ─── helpers ─────────────────────────────────────────────────────────────────
const isInteractive = (el) => {
  if (!el) return false
  const tag = el.tagName?.toLowerCase()
  return (
    tag === 'input' ||
    tag === 'textarea' ||
    tag === 'select' ||
    tag === 'button' ||
    tag === 'a' ||
    el.isContentEditable ||
    el.closest('button, a, input, textarea, select, [role="button"]')
  )
}

const extractText = (el) => {
  if (!el) return ''
  // Walk up to find meaningful text (skip tiny wrappers like icons)
  let node = el
  while (node && (node.innerText || '').trim().length < 2 && node.parentElement) {
    node = node.parentElement
  }
  // Trim to a reasonable snippet
  return (node?.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 200)
}

// ─── component ───────────────────────────────────────────────────────────────
export default function SelectionPopover() {
  const [state, setState] = useState({
    show: false,
    x: 0,
    y: 0,
    openUpwards: false,
    text: '',
    copied: false,
  })
  const popoverRef   = useRef(null)
  const timerRef     = useRef(null)
  const startPosRef  = useRef({ x: 0, y: 0 })
  const highlightRef = useRef(null)   // the DOM element we highlighted
  const justOpenedRef = useRef(false) // prevent immediate dismiss

  // ── remove highlight glow ──
  const clearHighlight = () => {
    if (highlightRef.current) {
      highlightRef.current.style.removeProperty('background-color')
      highlightRef.current.style.removeProperty('border-radius')
      highlightRef.current.style.removeProperty('transition')
      highlightRef.current = null
    }
  }

  const close = () => {
    clearHighlight()
    setState(s => ({ ...s, show: false, copied: false }))
  }

  // ── position calculation ──
  const calcPosition = (touchX, touchY, targetEl) => {
    // Try to get element rect for better positioning
    const rect = targetEl?.getBoundingClientRect?.()
    const refX  = rect ? rect.left + rect.width  / 2 : touchX
    const refTop = rect ? rect.top : touchY

    let x = refX - POPOVER_W / 2
    let y = refTop - POPOVER_H - 12   // prefer above
    let openUpwards = false

    // Clamp horizontally
    if (x < 12) x = 12
    if (x + POPOVER_W > window.innerWidth - 12) x = window.innerWidth - POPOVER_W - 12

    // If not enough room above, go below
    if (y < 60) {
      y = (rect ? rect.bottom : touchY) + 12
      openUpwards = false
    } else {
      openUpwards = true
    }

    return { x, y, openUpwards }
  }

  // ── touch handlers ──
  useEffect(() => {
    const onTouchStart = (e) => {
      const touch = e.touches[0]
      if (!touch) return
      if (isInteractive(e.target)) return

      startPosRef.current = { x: touch.clientX, y: touch.clientY }

      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        const text = extractText(e.target)
        if (!text) return

        // Apply highlight glow to the element
        clearHighlight()
        const highlightEl = e.target
        highlightEl.style.transition = 'background-color 0.15s'
        highlightEl.style.backgroundColor = 'rgba(99,102,241,0.18)'
        highlightEl.style.borderRadius = '6px'
        highlightRef.current = highlightEl

        // Haptic if available
        try { navigator.vibrate?.(30) } catch {}

        const { x, y, openUpwards } = calcPosition(touch.clientX, touch.clientY, highlightEl)

        justOpenedRef.current = true
        setTimeout(() => { justOpenedRef.current = false }, 350)

        setState({ show: true, x, y, openUpwards, text, copied: false })
      }, LONG_PRESS_MS)
    }

    const onTouchMove = (e) => {
      const touch = e.touches[0]
      if (!touch) return
      const dx = Math.abs(touch.clientX - startPosRef.current.x)
      const dy = Math.abs(touch.clientY - startPosRef.current.y)
      if (dx > MOVE_THRESHOLD || dy > MOVE_THRESHOLD) {
        clearTimeout(timerRef.current)
      }
    }

    const onTouchEnd = () => {
      clearTimeout(timerRef.current)
      // Do NOT call handleSelection — we don't use getSelection
    }

    // Dismiss on touch-outside (but not on the very first tap that opened it)
    const onTouchStartOutside = (e) => {
      if (justOpenedRef.current) return
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        close()
      }
    }

    const onScroll = () => {
      clearTimeout(timerRef.current)
      close()
    }

    document.addEventListener('touchstart',  onTouchStart,        { passive: true })
    document.addEventListener('touchmove',   onTouchMove,         { passive: true })
    document.addEventListener('touchend',    onTouchEnd,          { passive: true })
    document.addEventListener('scroll',      onScroll,            { passive: true, capture: true })

    // Separate listener for outside-tap dismiss
    document.addEventListener('touchstart',  onTouchStartOutside, { passive: true })

    return () => {
      document.removeEventListener('touchstart',  onTouchStart)
      document.removeEventListener('touchmove',   onTouchMove)
      document.removeEventListener('touchend',    onTouchEnd)
      document.removeEventListener('scroll',      onScroll,       true)
      document.removeEventListener('touchstart',  onTouchStartOutside)
      clearTimeout(timerRef.current)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── actions ──
  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(state.text) } catch {}
    try { navigator.vibrate?.(20) } catch {}
    setState(s => ({ ...s, copied: true }))
    clearHighlight()
    setTimeout(close, 900)
  }

  const handleSearch = () => {
    close()
    // Navigate to the app's guide search
    const ev = new CustomEvent('APP_SEARCH', { detail: { query: state.text } })
    window.dispatchEvent(ev)
    // Fallback: push to guide route if event not caught
    setTimeout(() => {
      if (window.location.pathname !== '/guide') {
        window.history.pushState({}, '', `/guide?q=${encodeURIComponent(state.text)}`)
        window.dispatchEvent(new PopStateEvent('popstate'))
      }
    }, 50)
  }

  // ── render ──
  return (
    <AnimatePresence>
      {state.show && (
        <motion.div
          ref={popoverRef}
          initial={{ opacity: 0, scale: 0.85, y: state.openUpwards ? 6 : -6 }}
          animate={{ opacity: 1, scale: 1,    y: 0 }}
          exit={{    opacity: 0, scale: 0.85, y: state.openUpwards ? 6 : -6 }}
          transition={{ type: 'spring', damping: 24, stiffness: 380, mass: 0.7 }}
          style={{
            position:        'fixed',
            left:            state.x,
            top:             state.y,
            zIndex:          2147483647,
            transformOrigin: state.openUpwards ? 'bottom center' : 'top center',
          }}
          className="flex items-center gap-0.5 px-1 py-1 bg-white/80 dark:bg-zinc-900/90 backdrop-blur-[32px] border border-black/10 dark:border-white/10 shadow-2xl rounded-2xl"
          // Prevent this element's touch from being treated as "outside"
          onTouchStart={e => e.stopPropagation()}
        >
          <button
            onPointerDown={handleCopy}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl active:bg-black/5 dark:active:bg-white/10 transition-colors text-black/80 dark:text-white/90 font-medium text-sm whitespace-nowrap"
          >
            {state.copied
              ? <Check className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />
              : <Copy  className="w-4 h-4" strokeWidth={2.5} />
            }
            {state.copied ? 'Copied!' : 'Copy'}
          </button>

          <div className="w-px h-6 bg-black/10 dark:bg-white/10 shrink-0" />

          <button
            onPointerDown={handleSearch}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl active:bg-black/5 dark:active:bg-white/10 transition-colors text-black/80 dark:text-white/90 font-medium text-sm whitespace-nowrap"
          >
            <Search className="w-4 h-4" strokeWidth={2.5} />
            Search
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
