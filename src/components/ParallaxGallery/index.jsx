'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import Lenis from '@studio-freight/lenis';
import { useTransform, useScroll, motion } from 'framer-motion';

const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
];

export default function ParallaxGallery() {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start']
  });
  
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    // Optimized Lenis configuration for smoother scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      lenis.destroy();
    };
  }, []);

  return (
    <div className={styles.container}>
      
      <div className={styles.spacer}></div>
      <div className='bg-red-600 text-center z-30'><h1 className='  text-white mt-4 mb-4  text-3xl text-center '> Some Moments Deserve the World</h1> </div>

      <div ref={gallery} className={styles.gallery}>
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[9], images[10], images[11]]} y={y4} />
      </div>
      <div className={styles.spacer}>
        <div className=' bg-red-600 text-center z-30 mt-6'>
          <h3 className='py-4 text-2xl'>Captured through our lens, shared across the world</h3>
          <button className='inline-block bg-white font-heading ' >
            <a href="/socialmedia" style={{color:"black", padding:"10px 20px", fontSize:"2rem",  }} >Visit Social Media</a> 
            </button>
            </div>
            </div>
    </div>
  );
}

const Column = ({ images, y }) => {
  return (
    <motion.div 
      className={styles.column}
      style={{ y }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 30,
        mass: 1
      }}
    >
      {
        images.map((src, i) => {
          return (
            <div key={i} className={styles.imageContainer}>
              <Image 
                src={`/images/${src}`}
                alt='image'
                fill
                priority={i === 0}
                quality={90}
              />
            </div>
          );
        })
      }
    </motion.div>
  );
};