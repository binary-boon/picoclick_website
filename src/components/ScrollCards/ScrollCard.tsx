'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTransform, motion, useScroll } from 'framer-motion'
import { useRef } from 'react'

interface CardProps {
  i: number
  title: string
  description: string
  src: string
  url: string
  color: string
  progress: any
  range: [number, number]
  targetScale: number
}

const ScrollCard = ({
  i,
  title,
  description,
  src,
  url,
  color,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
  const scale = useTransform(progress, range, [1, targetScale])

  const isInternal = url.startsWith('/')

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="flex flex-col relative w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-[1000px] rounded-2xl sm:rounded-[25px] p-6 sm:p-8 lg:p-12 origin-top min-h-[500px] sm:h-auto lg:h-[500px] bg-opacity-100"
      >
        <h2 className="text-center m-0 text-2xl sm:text-3xl lg:text-4xl font-heading mb-4 sm:mb-6 lg:mb-0">
          {title}
        </h2>

        <div className="flex flex-col lg:flex-row h-full mt-6 sm:mt-8 lg:mt-12 gap-6 sm:gap-8 lg:gap-12">
          <div className="w-full lg:w-[40%] relative lg:top-[10%] order-2 lg:order-1">
            <p className="text-sm sm:text-base lg:text-base leading-relaxed mb-4 font-sans">
              {description}
            </p>
            <div className="mt-6">
              {isInternal ? (
                <Link
                  href={url}
                  className="inline-flex items-center gap-3 px-6 py-3 sm:px-7 sm:py-3.5 bg-black text-white text-xs sm:text-sm font-sans tracking-wide rounded-full transition-all duration-300 hover:gap-5 hover:bg-black/85 hover:shadow-lg active:scale-[0.97] group"
                >
                  View Gallery
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    <path
                      d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              ) : (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 sm:px-7 sm:py-3.5 bg-black text-white text-xs sm:text-sm font-sans tracking-wide rounded-full transition-all duration-300 hover:gap-5 hover:bg-black/85 hover:shadow-lg active:scale-[0.97] group"
                >
                  View Gallery
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    <path
                      d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>

          <div className="relative w-full lg:w-[60%] h-[250px] sm:h-[300px] lg:h-full rounded-2xl sm:rounded-[25px] overflow-hidden order-1 lg:order-2">
            <motion.div className="w-full h-full" style={{ scale: imageScale }}>
              <Image
                fill
                src={src}
                alt={title}
                className="object-cover"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 80vw, 600px"
                priority={i === 0}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ScrollCard
