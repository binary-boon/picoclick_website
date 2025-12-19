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
}

interface ScrollCardsContainerProps {
  projects: Project[]
  sectionTitle?: string
  sectionSubtitle?: string
}

const ScrollCardsContainer = ({ 
  projects, 
  sectionTitle = 'Your love story, filmed like a movie.' ,
  sectionSubtitle = 'Every wedding tells a unique story. We capture yours with artistry, emotion, and precision—so your memories live far beyond the day itself.'
}: ScrollCardsContainerProps) => {
  const sectionRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Title fades out when section is about to end
  const titleOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0])

  // Detect mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Initialize Lenis smooth scroll
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

    return () => {
      lenis.destroy()
    }
  }, [isMobile])

  return (
    <section ref={sectionRef} className="relative">
      {/* Sticky Title - stays at top, behind cards */}
      <div className="sticky top-0 left-0 w-full z-0 pt-20 sm:pt-24 lg:pt-32 pb-8 sm:pb-12 lg:pb-16 bg-background">
        <motion.h2 
          style={{ opacity: titleOpacity }}
          className="text-5xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-center px-4"
        >
          {sectionTitle}
        </motion.h2>

        <motion.p className="text-5xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-5xl font-bold text-center px-4">{sectionSubtitle}</motion.p>
      </div>

      {/* Cards Container - positioned relative with higher z-index */}
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