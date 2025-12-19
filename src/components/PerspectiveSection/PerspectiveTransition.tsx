'use client';
import NextImage, { StaticImageData } from "next/image";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef, ReactNode } from "react";

interface PerspectiveTransitionProps {
  section1Content: ReactNode;
  section2Image: string | StaticImageData;
  section1BgColor?: string;
}

export default function PerspectiveTransition({ 
  section1Content,
  section2Image,
  section1BgColor = "#C72626"
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
}

const Section2 = ({ scrollYProgress, image }: Section2Props) => {
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
    </motion.div>
  );
};