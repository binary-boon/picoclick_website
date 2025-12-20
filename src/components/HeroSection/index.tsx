'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'

interface HeroSectionProps {
  muxPlaybackId: string
  title: string
  subtitle: string
}

export const HeroSection: React.FC<HeroSectionProps> = ({ muxPlaybackId, title, subtitle }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Smooth spring animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const smoothProgress = useSpring(scrollYProgress, springConfig)

  // Transform values based on scroll
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0])
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 1.1])
  const y = useTransform(smoothProgress, [0, 1], [0, 200])
  const titleY = useTransform(smoothProgress, [0, 0.5], [0, -100])
  const subtitleY = useTransform(smoothProgress, [0, 0.5], [0, -80])

  // Auto-play video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log('Video autoplay prevented:', err)
      })
    }
  }, [])

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <motion.div
        style={{ scale, opacity }}
        className="absolute inset-0 z-0"
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster={`https://image.mux.com/${muxPlaybackId}/thumbnail.jpg?time=0`}
        >
          <source
            src={`https://stream.mux.com/${muxPlaybackId}.m3u8`}
            type="application/x-mpegURL"
          />
          <source
            src={`https://stream.mux.com/${muxPlaybackId}/high.mp4`}
            type="video/mp4"
          />
        </video>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </motion.div>

      {/* Content */}
      <div className="relative z-[1] flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          style={{ y: titleY, opacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Using font-heading class for Made Saonara */}
          <h1 className="mb-6 text-5xl font-heading text-white md:text-7xl lg:text-8xl font-normal">
            {title}
          </h1>
        </motion.div>

        <motion.div
          style={{ y: subtitleY, opacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Using font-sans class for DM Sans (this is default, but being explicit) */}
          <p className="max-w-3xl text-lg font-sans text-white/90 md:text-xl lg:text-2xl">
            {subtitle}
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ y, opacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm font-sans text-white/70">Scroll to explore</span>
            <svg
              className="h-6 w-6 text-white/70"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}