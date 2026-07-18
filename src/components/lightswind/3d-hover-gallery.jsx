import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const defaultItems = [
  { 
    id: 1, 
    title: 'Campus Map', 
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1470&auto=format&fit=crop', 
    description: 'Explore every corner.' 
  },
  { 
    id: 2, 
    title: 'Library', 
    image: 'https://images.unsplash.com/photo-1548048026-5a1a941d93d3?q=80&w=1470&auto=format&fit=crop', 
    description: 'Quiet study zones.' 
  },
  { 
    id: 3, 
    title: 'Sports Complex', 
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop', 
    description: 'Stay active.' 
  },
  { 
    id: 4, 
    title: 'Cafeteria', 
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1374&auto=format&fit=crop', 
    description: 'Great food & vibes.' 
  },
];

const HoverCard = ({ item }) => {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative h-[400px] w-[300px] rounded-2xl cursor-pointer group"
    >
      <div
        className="absolute inset-0 rounded-2xl bg-cover bg-center shadow-2xl transition-all duration-300 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden border border-white/10"
        style={{
          backgroundImage: `url(${item.image})`,
          transform: "translateZ(30px)",
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300" />
        
        {/* Glare effect */}
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)",
            left: glareX,
            top: glareY,
            transform: "translate(-50%, -50%)",
            width: "200%",
            height: "200%",
          }}
        />
      </div>
      
      {/* Content wrapper with 3D offset */}
      <div 
        className="absolute bottom-6 left-6 right-6 pointer-events-none flex flex-col justify-end"
        style={{ transform: "translateZ(80px)" }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 shrink-0 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white font-bold text-sm shadow-lg">
            {item.id}
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight drop-shadow-md truncate">{item.title}</h3>
        </div>
        <p className="text-sm text-gray-200 drop-shadow-md font-medium line-clamp-2">{item.description}</p>
        
        <div className="mt-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-auto">
          <button className="px-5 py-2.5 w-full bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/30 hover:border-white/50 text-white text-sm font-semibold rounded-xl shadow-lg transition-colors">
            Explore
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function ThreeDHoverGallery({ items = defaultItems, className = "" }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-10 py-12 px-4 w-full bg-transparent ${className}`} style={{ perspective: "1200px" }}>
      {items.map((item) => (
        <HoverCard key={item.id} item={item} />
      ))}
    </div>
  );
}
