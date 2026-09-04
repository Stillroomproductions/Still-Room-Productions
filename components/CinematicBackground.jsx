'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Camera, Video, Film, Clapperboard, Aperture, MonitorPlay, Focus, Projector } from 'lucide-react'
import Image from 'next/image'

const icons = [Camera, Video, Film, Clapperboard, Aperture, MonitorPlay, Focus, Projector]

export default function CinematicBackground({ src = '/images/_52A6916.jpg', objectPosition = '50% 50%' }) {
  const [elements, setElements] = useState(null)

  useEffect(() => {
    setElements(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        Icon: icons[i % icons.length],
        size:          Math.random() * 60 + 40,
        left:          Math.random() * 100,
        top:           Math.random() * 100,
        moveX:         (Math.random() - 0.5) * 100,
        moveY:         (Math.random() - 0.5) * 100,
        duration:      Math.random() * 20 + 40,
        blur:          Math.random() * 4 + 4,
        opacity:       Math.random() * 0.15 + 0.05,
        initialRotate: Math.random() * 360,
      }))
    )
  }, [])

  return (
    <div className="cinematic-bg" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      {src && (
        <Image
          src={src}
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition }}
          priority
          quality={90}
        />
      )}
      {elements && elements.map((el) => (
        <motion.div
          key={el.id}
          className="cinematic-icon"
          initial={{ x: 0, y: 0, opacity: 0, rotate: el.initialRotate }}
          animate={{
            x: [0, el.moveX, 0],
            y: [0, el.moveY, 0],
            opacity: [0, el.opacity, el.opacity, 0],
            rotate: [el.initialRotate, el.initialRotate + 45, el.initialRotate + 90],
          }}
          transition={{ duration: el.duration, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            left: `${el.left}%`,
            top: `${el.top}%`,
            width: el.size,
            height: el.size,
            filter: `blur(${el.blur}px)`,
            willChange: 'transform, opacity',
            color: 'var(--color-white)',
          }}
        >
          <el.Icon width="100%" height="100%" strokeWidth={0.5} />
        </motion.div>
      ))}
      <div className="cinematic-bg-overlay" />
    </div>
  )
}