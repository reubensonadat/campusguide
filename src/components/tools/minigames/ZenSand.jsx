import React, { useRef, useEffect } from 'react';

export const ZenSand = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Make canvas fit the container
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const draw = (e) => {
      if (!isDrawing) return;
      if (e.cancelable && e.type !== 'mousemove') e.preventDefault();
      
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(217, 186, 140, 0.8)'; // Glowing sand color
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      lastX = x;
      lastY = y;
    };

    const startDraw = (e) => {
      if (e.cancelable && e.type !== 'mousedown') e.preventDefault();
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      lastX = clientX - rect.left;
      lastY = clientY - rect.top;
    };

    const stopDraw = () => {
      isDrawing = false;
    };

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDraw);
    canvas.addEventListener('mouseleave', stopDraw);
    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stopDraw);
    canvas.addEventListener('touchcancel', stopDraw);

    // Fade loop
    let animationId;
    const fade = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)'; // slate-900 with low opacity to create fade trail
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      animationId = requestAnimationFrame(fade);
    };
    fade();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
      if (canvas) {
        canvas.removeEventListener('mousedown', startDraw);
        canvas.removeEventListener('mousemove', draw);
        canvas.removeEventListener('mouseup', stopDraw);
        canvas.removeEventListener('mouseleave', stopDraw);
        canvas.removeEventListener('touchstart', startDraw);
        canvas.removeEventListener('touchmove', draw);
        canvas.removeEventListener('touchend', stopDraw);
        canvas.removeEventListener('touchcancel', stopDraw);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-white">
      <div className="mb-6 px-2 text-center">
        <span className="bg-white/10 px-4 py-1.5 rounded-full text-white/90 font-bold text-xs tracking-widest uppercase border border-white/10 shadow-inner">
          Zen Sand
        </span>
      </div>
      
      <p className="text-[10px] text-white/40 font-bold tracking-widest uppercase mb-6 text-center max-w-[200px]">
        Draw gently to relax. Watch it fade away.
      </p>

      <div className="relative w-[280px] h-[280px] bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full touch-none cursor-crosshair"
        />
      </div>
    </div>
  );
};
