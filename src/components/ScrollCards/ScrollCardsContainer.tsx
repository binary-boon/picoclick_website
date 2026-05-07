'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import ScrollCard from './ScrollCard'

export interface Project {
  title: string
  description: string
  src: string
  link: string
  color: string
  slug?: string
  type?: 'video' | 'image'
  galleryImages?: string[]
  videoPlaybackIds?: string[]
}

interface ScrollCardsContainerProps {
  projects: Project[]
  sectionTitle?: string
  sectionSubtitle?: string
}

const ScrollCardsContainer = ({
  projects,
  sectionTitle,
  sectionSubtitle,
}: ScrollCardsContainerProps) => {
  const sectionRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const titleOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const lenis = new Lenis({
      duration: isMobile ? 1.0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: isMobile ? 0.8 : 1,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [isMobile])

  return (
    <section ref={sectionRef} className="relative">
      <div className="sticky top-0 left-0 w-full z-0 pt-20 sm:pt-24 lg:pt-32 pb-8 sm:pb-12 lg:pb-16 bg-background">
        <motion.h2
          style={{ opacity: titleOpacity }}
          className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-heading text-center px-4"
        >
          {sectionTitle}
        </motion.h2>

        <motion.p className="text-base sm:text-xl md:text-xl lg:text-lg xl:text-2xl font-sans text-center px-4 sm:px-60 mt-4">
          {sectionSubtitle}
        </motion.p>
      </div>

      <div className="relative z-10">
        {projects.map((project, i) => {
          const targetScale = isMobile ? 0.9 : 1 - (projects.length - i) * 0.05
          return (
            <ScrollCard
              key={`p_${i}`}
              i={i}
              {...project}
              url={project.link}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          )
        })}
      </div>
    </section>
  )
}

export default ScrollCardsContainer
