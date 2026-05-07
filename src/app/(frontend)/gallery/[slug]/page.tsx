'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/app/data/Projects'

// Dynamically import MuxPlayer (client-only, avoids SSR issues with web components)
const MuxPlayer = dynamic(() => import('@mux/mux-player-react'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video rounded-lg bg-white/5 animate-pulse" />
  ),
})

// ─── Mux helpers ───
const muxThumb = (id: string, w = 800, h = 450) =>
  `https://image.mux.com/${id}/thumbnail.jpg?width=${w}&height=${h}&fit_mode=smartcrop&time=2`

const muxGif = (id: string) =>
  `https://image.mux.com/${id}/animated.gif?width=640&fps=15&start=1&end=5`

// ─── Shared animation easings ───
const entryEase = [0.22, 1, 0.36, 1] as const

export default function GallerySlugPage() {
  const params = useParams()
  const slug = params.slug as string
  const project = projects.find((p) => p.slug === slug)

  // Lightbox state — stores index into images or videos array
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const isVideo = project?.type === 'video'
  const images = project?.galleryImages ?? []
  const videos = project?.videoPlaybackIds ?? []
  const totalItems = isVideo ? videos.length : images.length

  // ─── Keyboard nav ───
  const navigate = useCallback(
    (dir: 1 | -1) => {
      setSelectedIndex((prev) =>
        prev !== null ? (prev + dir + totalItems) % totalItems : null,
      )
    },
    [totalItems],
  )

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null)
      if (selectedIndex !== null) {
        if (e.key === 'ArrowRight') navigate(1)
        if (e.key === 'ArrowLeft') navigate(-1)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [selectedIndex, navigate])

  // ─── Body scroll lock ───
  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedIndex])

  // ─── 404 ───
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background text-foreground">
        <h1 className="text-4xl font-heading">Gallery Not Found</h1>
        <p className="text-lg text-muted-foreground font-sans">
          The gallery you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-sans border border-foreground/20 px-6 py-3 rounded-full hover:bg-foreground hover:text-background transition-all duration-300"
        >
          <ChevronLeftIcon />
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        {/* ════════ HERO HEADER ════════ */}
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: `linear-gradient(180deg, ${project.color} 0%, transparent 100%)`,
            }}
          />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-16 sm:pb-24">
            {/* Back */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-foreground transition-colors duration-300 mb-12 group"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              >
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back
            </Link>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: entryEase }}
            >
              {project.title}
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-muted-foreground font-sans max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: entryEase }}
            >
              {project.description}
            </motion.p>

            {/* Item count badge */}
            <motion.div
              className="mt-8 inline-flex items-center gap-2 text-sm font-sans text-muted-foreground border border-foreground/10 px-4 py-2 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {isVideo ? (
                <>
                  <PlayIconSmall /> {totalItems} films
                </>
              ) : (
                <>
                  <GridIconSmall /> {totalItems} photographs
                </>
              )}
            </motion.div>

            <motion.div
              className="mt-10 h-px bg-foreground/10"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: entryEase }}
              style={{ transformOrigin: 'left' }}
            />
          </div>
        </div>

        {/* ════════ GALLERY BODY ════════ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32">
          {isVideo ? (
            /* ──── VIDEO GRID ──── */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {videos.map((playbackId, index) => (
                <VideoCard
                  key={playbackId}
                  playbackId={playbackId}
                  index={index}
                  onClick={() => setSelectedIndex(index)}
                />
              ))}
            </div>
          ) : (
            /* ──── IMAGE MASONRY ──── */
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5">
              {images.map((src, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.05 + index * 0.04,
                    ease: entryEase,
                  }}
                  className="mb-4 sm:mb-5 break-inside-avoid cursor-pointer group"
                  onClick={() => setSelectedIndex(index)}
                >
                  <div className="relative overflow-hidden rounded-lg sm:rounded-xl">
                    <img
                      src={src}
                      alt={`${project.title} — photo ${index + 1}`}
                      className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      loading={index < 6 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                    <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm text-xs font-sans text-gray-700 px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {index + 1} / {totalItems}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {totalItems === 0 && (
            <div className="text-center py-24">
              <p className="text-muted-foreground font-sans text-lg">
                Gallery coming soon.
              </p>
            </div>
          )}
        </div>

        {/* ════════ BOTTOM CTA ════════ */}
        <div className="border-t border-foreground/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-heading mb-2">
                Love what you see?
              </h3>
              <p className="text-muted-foreground font-sans">
                Let&apos;s create something beautiful together.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 font-sans text-sm border border-foreground/20 px-8 py-4 rounded-full hover:bg-foreground hover:text-background transition-all duration-300 group whitespace-nowrap"
            >
              Get in Touch
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M5.5 12.5L12.5 5.5M12.5 5.5H6.5M12.5 5.5V11.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* ════════ LIGHTBOX ════════ */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
              onClick={() => setSelectedIndex(null)}
            />

            {/* Close */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M4 4L14 14M14 4L4 14"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 z-10 text-white/50 text-sm font-sans">
              {selectedIndex + 1} / {totalItems}
            </div>

            {/* Prev */}
            {totalItems > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(-1)
                }}
                className="absolute left-3 sm:left-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Previous"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M12 15L7 10L12 5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}

            {/* Next */}
            {totalItems > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(1)
                }}
                className="absolute right-3 sm:right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Next"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M8 5L13 10L8 15"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}

            {/* Content */}
            <motion.div
              key={selectedIndex}
              className="relative z-[1] w-[92vw] sm:w-[85vw] max-w-5xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              {isVideo ? (
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <MuxPlayer
                    playbackId={videos[selectedIndex]}
                    autoPlay
                    streamType="on-demand"
                    style={{
                      width: '100%',
                      height: '100%',
                      // @ts-ignore — Mux custom properties
                      '--media-object-fit': 'contain',
                    }}
                    metadata={{
                      video_title: `${project.title} — clip ${selectedIndex + 1}`,
                    }}
                  />
                </div>
              ) : (
                <img
                  src={images[selectedIndex]}
                  alt={`${project.title} — photo ${selectedIndex + 1}`}
                  className="w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ════════════════════════════════════════════
//  VIDEO CARD — thumbnail + animated hover
// ════════════════════════════════════════════
function VideoCard({
  playbackId,
  index,
  onClick,
}: {
  playbackId: string
  index: number
  onClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.08 + index * 0.1, ease: entryEase }}
      className="cursor-pointer group"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden rounded-xl sm:rounded-2xl bg-black/5">
        {/* Static thumbnail */}
        <img
          src={muxThumb(playbackId)}
          alt={`Drone clip ${index + 1}`}
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
          loading={index < 2 ? 'eager' : 'lazy'}
        />

        {/* Animated GIF on hover — layered on top */}
        {isHovered && (
          <img
            src={muxGif(playbackId)}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/25">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              className="ml-1"
            >
              <path d="M6 4L18 11L6 18V4Z" fill="white" />
            </svg>
          </div>
        </div>

        {/* Clip number */}
        <div className="absolute bottom-3 left-4 text-white/70 text-xs font-sans tracking-wide">
          CLIP {String(index + 1).padStart(2, '0')}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Tiny inline icons ───
function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M10 12L6 8L10 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PlayIconSmall() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M4 2.5L11 7L4 11.5V2.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function GridIconSmall() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1.5" y="1.5" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="8.5" y="1.5" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="1.5" y="8.5" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="8.5" y="8.5" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}
