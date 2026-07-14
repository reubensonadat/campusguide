import React, { useRef, useEffect } from 'react'
import { useTiltEffect } from '../../hooks/useTiltEffect'

export default function TiltCard({ children, className, mode = 'hover', maxTilt = 35, style }) {
  const ref = useRef(null)
  const { handleMouseDown } = useTiltEffect(ref, { mode, maxTilt })

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      onMouseDown={mode === 'drag' ? handleMouseDown : undefined}
    >
      {children}
    </div>
  )
}
