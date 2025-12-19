'use client'

import Image from 'next/image'
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
        <h2 className="text-center m-0 text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-0">
          {title}
        </h2>
        
        <div className="flex flex-col lg:flex-row h-full mt-6 sm:mt-8 lg:mt-12 gap-6 sm:gap-8 lg:gap-12">
          {/* Description Section */}
          <div className="w-full lg:w-[40%] relative lg:top-[10%] order-2 lg:order-1">
            <p className="text-sm sm:text-base lg:text-base leading-relaxed mb-4">
              {description}
            </p>
            <span className="flex items-center gap-2 mt-4">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm underline cursor-pointer hover:opacity-70 transition-opacity"
              >
                See more
              </a>
              <svg
                className="w-4 h-2 sm:w-5 sm:h-3 lg:w-[22px] lg:h-3"
                viewBox="0 0 22 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>

          {/* Image Section */}
          <div className="relative w-full lg:w-[60%] h-[250px] sm:h-[300px] lg:h-full rounded-2xl sm:rounded-[25px] overflow-hidden order-1 lg:order-2">
            <motion.div
              className="w-full h-full"
              style={{ scale: imageScale }}
            >
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