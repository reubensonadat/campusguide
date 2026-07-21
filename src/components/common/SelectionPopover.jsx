import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Search } from 'lucide-react'

export default function SelectionPopover() {
  const [show, setShow] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [openUpwards, setOpenUpwards] = useState(false)
  const [selectedText, setSelectedText] = useState('')
  const popoverRef = useRef(null)

  const handleSelection = useCallback(() => {
    const selection = window.getSelection()
    const text = selection?.toString()?.trim()

    if (!text || text.length === 0) {
      setShow(false)
      return
    }

    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()

    const popoverWidth = 200
    const popoverHeight = 52

    let x = rect.left + rect.width / 2 - popoverWidth / 2
    let y = rect.bottom + 8

    if (x < 12) x = 12
    if (x + popoverWidth > window.innerWidth - 12) {
      x = window.innerWidth - popoverWidth - 12
    }

    const spaceBelow = window.innerHeight - y
    const spaceAbove = rect.top - 8

    if (spaceBelow < popoverHeight && spaceAbove > popoverHeight) {
      y = rect.top - popoverHeight - 8
      setOpenUpwards(true)
    } else {
      setOpenUpwards(false)
    }

    setPosition({ x, y })
    setSelectedText(text)
    setShow(true)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setShow(false)
      }
    }

    const handleScroll = () => setShow(false)

    if (show) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('scroll', handleScroll, true)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('scroll', handleScroll, true)
    }
  }, [show])

  useEffect(() => {
    const preventNativeMenu = (e) => {
      const tag = e.target?.tagName?.toLowerCase()
      if (tag !== 'input' && tag !== 'textarea') {
        e.preventDefault()
      }
    }
    document.addEventListener('contextmenu', preventNativeMenu, { passive: false })

    const onMouseUp = () => {
      setTimeout(handleSelection, 10)
    }

    const onKeyUp = (e) => {
      if (['Shift', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        setTimeout(handleSelection, 10)
      }
    }

    const onTouchEnd = () => {
      setTimeout(handleSelection, 150)
    }

    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('keyup', onKeyUp)
    document.addEventListener('touchend', onTouchEnd)

    return () => {
      document.removeEventListener('contextmenu', preventNativeMenu)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('keyup', onKeyUp)
      document.removeEventListener('touchend', onTouchEnd)
    }
  }, [handleSelection])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selectedText)
    } catch {}
    setShow(false)
  }

  const handleSearch = () => {
    const query = encodeURIComponent(selectedText)
    window.open(`https://www.google.com/search?q=${query}`, '_blank')
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          ref={popoverRef}
          initial={{ opacity: 0, scale: 0.8, y: openUpwards ? 8 : -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: openUpwards ? 8 : -8 }}
          transition={{
            type: 'spring',
            damping: 22,
            stiffness: 350,
            mass: 0.8,
          }}
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            zIndex: 2147483646,
            transformOrigin: openUpwards ? 'bottom center' : 'top center',
          }}
          className="flex items-center gap-1 px-1.5 py-1.5 bg-white/70 dark:bg-black/50 backdrop-blur-[40px] border border-black/10 dark:border-white/10 shadow-2xl rounded-2xl"
        >
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-black/80 dark:text-white/90 font-medium text-sm whitespace-nowrap"
          >
            <Copy className="w-4 h-4" strokeWidth={2.5} />
            Copy
          </button>
          <div className="w-px h-6 bg-black/5 dark:bg-white/10" />
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-black/80 dark:text-white/90 font-medium text-sm whitespace-nowrap"
          >
            <Search className="w-4 h-4" strokeWidth={2.5} />
            Search
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
