import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function ModalPortal({ children, lockScroll = true }) {
  useEffect(() => {
    if (!lockScroll) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [lockScroll])
  return createPortal(children, document.body)
}
