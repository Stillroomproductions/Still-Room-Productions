import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Camera, Video, Film, Clapperboard, Aperture, MonitorPlay, Focus, Projector } from 'lucide-react';

const icons = [Camera, Video, Film, Clapperboard, Aperture, MonitorPlay, Focus, Projector];

function CinematicBackground() {
  const elements = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const Icon = icons[i % icons.length];
      const size = Math.random() * 60 + 40; // 40px to 100px
      const left = Math.random() * 100; // 0% to 100%
      const top = Math.random() * 100; // 0% to 100%
      
      const moveX = (Math.random() - 0.5) * 100; // gentle drift
      const moveY = (Math.random() - 0.5) * 100; 
      const duration = Math.random() * 20 + 40; // 40s to 60s
      
      const blur = Math.random() * 4 + 4; // 4px to 8px blur
      const opacity = Math.random() * 0.15 + 0.05; // slightly more visible
      
      return {
        id: i,
        Icon,
        size,
        left,
        top,
        moveX,
        moveY,
        duration,
        blur,
        opacity,
        initialRotate: Math.random() * 360,
      };
    });
  }, []);

  return (
    <div className="cinematic-bg" aria-hidden="true">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="cinematic-icon"
          initial={{
            x: 0,
            y: 0,
            opacity: 0,
            rotate: el.initialRotate,
          }}
          animate={{
            x: [0, el.moveX, 0],
            y: [0, el.moveY, 0],
            opacity: [0, el.opacity, el.opacity, 0],
            rotate: [el.initialRotate, el.initialRotate + 45, el.initialRotate + 90],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: 'absolute',
            left: `${el.left}%`,
            top: `${el.top}%`,
            width: el.size,
            height: el.size,
            filter: `blur(${el.blur}px)`, // Removed drop-shadow for performance
            willChange: 'transform, opacity', // Force GPU acceleration
            color: 'var(--color-white)',
          }}
        >
          <el.Icon width="100%" height="100%" strokeWidth={0.5} />
        </motion.div>
      ))}
      <div className="cinematic-bg-overlay"></div>
    </div>
  );
}

export default CinematicBackground;
