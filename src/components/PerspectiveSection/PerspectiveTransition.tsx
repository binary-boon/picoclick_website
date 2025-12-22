'use client';
import NextImage, { StaticImageData } from "next/image";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef, ReactNode } from "react";
import Link from "next/link";

interface PerspectiveTransitionProps {
  section1Content: ReactNode;
  section2Image: string | StaticImageData;
  section1BgColor?: string;
  galleryLink?: string;
}

export default function PerspectiveTransition({ 
  section1Content,
  section2Image,
  section1BgColor = "#C72626",
  galleryLink = "/gallery"
}: PerspectiveTransitionProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={container} className="relative h-[200vh]">
      <Section1 
        scrollYProgress={scrollYProgress} 
        content={section1Content}
        bgColor={section1BgColor}
      />
      <Section2 
        scrollYProgress={scrollYProgress} 
        image={section2Image}
        galleryLink={galleryLink}
      />
    </div>
  );
}

interface Section1Props {
  scrollYProgress: MotionValue<number>;
  content: ReactNode;
  bgColor: string;
}

const Section1 = ({ scrollYProgress, content, bgColor }: Section1Props) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <motion.div 
      style={{ 
        scale, 
        rotate,
        backgroundColor: bgColor,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)'
      }} 
      className="sticky top-0 h-screen text-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vh]"
    >
      {content}
    </motion.div>
  );
};

interface Section2Props {
  scrollYProgress: MotionValue<number>;
  image: string | StaticImageData;
  galleryLink: string;
}

const Section2 = ({ scrollYProgress, image, galleryLink }: Section2Props) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  return (
    <motion.div 
      style={{ 
        scale, 
        rotate,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)'
      }} 
      className="relative h-screen"
    >
      <NextImage 
        src={image}
        alt="section image"
        fill
        className="object-cover"
        priority
        quality={90}
      />
      
      {/* Gallery Link Overlay */}
      <div className="absolute inset-0 flex items-end justify-center pb-16 md:pb-20 z-10">
        <Link 
          href={galleryLink}
          className="group relative px-8 py-3 md:px-10 md:py-4 
                     bg-transparent text-white font-light text-base md:text-lg tracking-[0.2em]
                     border border-white/40 hover:border-white
                     transition-all duration-500 ease-out
                     hover:bg-white/5 backdrop-blur-[2px]
                     uppercase"
        >
          <span className="relative z-10 flex items-center gap-4">
            View Gallery
            <svg 
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500 ease-out" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={1}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </span>
        </Link>
      </div>
    </motion.div>
  );
};