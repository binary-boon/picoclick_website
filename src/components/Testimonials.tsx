'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image?: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah & Michael Chen",
    role: "Wedding - June 2024",
    content: "Every single photograph was a masterpiece. They captured not just moments, but emotions we didn't even know we felt. Our families still cry happy tears looking through our album.",
    date: "June 15, 2024"
  },
  {
    id: 2,
    name: "Priya & Raj Malhotra",
    role: "Wedding - August 2024",
    content: "The attention to detail was extraordinary. From the intricate mehndi designs to the grand baraat, every cultural element was beautifully documented. These photos are our greatest treasure.",
    date: "August 22, 2024"
  },
  {
    id: 3,
    name: "Emily & James Rodriguez",
    role: "Wedding - September 2024",
    content: "Working with this team felt like having friends at our wedding who just happened to be incredibly talented photographers. Natural, authentic, and absolutely stunning results.",
    date: "September 8, 2024"
  },
  {
    id: 4,
    name: "Aisha & Omar Hassan",
    role: "Wedding - October 2024",
    content: "They understood our vision perfectly and brought it to life in ways we never imagined. The golden hour shots are ethereal, and the candid moments are pure magic.",
    date: "October 12, 2024"
  },
  {
    id: 5,
    name: "Jessica & David Park",
    role: "Wedding - November 2024",
    content: "From our engagement shoot to the big day, every session was a joy. The photos are timeless, elegant, and capture our love story in the most beautiful way possible.",
    date: "November 3, 2024"
  },
  {
    id: 6,
    name: "Sophia & Lucas Martinez",
    role: "Wedding - December 2024",
    content: "Simply phenomenal. The way they played with light and shadow, the composition, the raw emotion captured in every frame - this is art at its finest. Worth every penny and more.",
    date: "December 1, 2024"
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative py-32 px-6 md:px-12 lg:px-24 overflow-hidden bg-gradient-to-b from-stone-50 via-rose-50/30 to-stone-50"
    >
      {/* Interactive gradient background that follows cursor */}
      <motion.div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: isHovering ? 0.4 : 0,
        }}
      >
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
          animate={{
            x: mousePosition.x - 300,
            y: mousePosition.y - 300,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200,
            mass: 0.5,
          }}
          style={{
            background: 'radial-gradient(circle, rgba(251, 113, 133, 0.6) 0%, rgba(244, 63, 94, 0.4) 25%, rgba(251, 191, 36, 0.3) 50%, transparent 70%)',
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
          animate={{
            x: mousePosition.x - 250,
            y: mousePosition.y - 250,
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 150,
            mass: 0.8,
          }}
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.5) 0%, rgba(245, 158, 11, 0.3) 30%, rgba(251, 113, 133, 0.2) 60%, transparent 80%)',
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-[80px]"
          animate={{
            x: mousePosition.x - 200,
            y: mousePosition.y - 200,
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 100,
            mass: 1,
          }}
          style={{
            background: 'radial-gradient(circle, rgba(244, 63, 94, 0.4) 0%, rgba(251, 113, 133, 0.3) 40%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Static decorative background elements (fallback) */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-10 w-96 h-96 bg-rose-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="relative max-w-7xl mx-auto"
      >
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-rose-600 font-sans text-sm tracking-[0.3em] uppercase mb-4">
              Kind Words
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading text-stone-900 mb-6">
              Love Stories
              <span className="block text-rose-600 font-heading italic font-normal mt-2">Shared</span>
            </h2>
            <p className="text-stone-600 font-sans text-lg md:text-xl max-w-2xl mx-auto font-light">
              Every couple has a unique story, and we're honored to be part of these beautiful journeys
            </p>
          </motion.div>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.21, 0.45, 0.27, 0.9]
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-500">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-rose-100 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Quote mark */}
                <div className="text-rose-300 text-6xl font-heading leading-none mb-4 opacity-30">
                  "
                </div>

                {/* Content */}
                <blockquote className="text-stone-700 font-sans text-base leading-relaxed mb-6 font-light relative z-10">
                  {testimonial.content}
                </blockquote>

                {/* Author info */}
                <div className="relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center text-white font-heading text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-stone-900 font-sans font-medium">
                        {testimonial.name}
                      </p>
                      <p className="text-stone-500 font-sans text-sm font-light">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-rose-500 to-amber-500 group-hover:w-full transition-all duration-700 rounded-b-2xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <p className="text-stone-600 font-sans text-lg mb-6 font-light">
            Ready to create your own beautiful story?
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-4 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-full font-sans font-medium tracking-wide hover:shadow-2xl hover:shadow-rose-500/30 transition-all duration-300"
          >
            Let's Talk
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}