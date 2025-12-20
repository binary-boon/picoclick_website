'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Camera, Heart, Award, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function HomeAboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white via-stone-50 to-white overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-40 left-20 w-96 h-96 bg-rose-400 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Image Section */}
          <motion.div
            style={{ opacity }}
            className="relative"
          >
            {/* Main Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Decorative frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-rose-500/20 to-amber-500/20 rounded-3xl blur-2xl" />
              
              {/* Main image with parallax */}
              <motion.div
                style={{ y: imageY }}
                className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
              >
                {/* Replace with your actual image */}
                <div className="relative w-full aspect-[4/5] bg-gradient-to-br from-stone-200 to-stone-300">
                  {/* Placeholder - Replace with actual Image component */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="w-24 h-24 text-stone-400" />
                  </div>
                  
                  {/* Uncomment and use when you have an actual image */}
                  
                  <Image
                    src="/images/a10.jpg"
                    alt="PicoClick Photography Founders"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                 
                </div>

                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent" />
              </motion.div>

              {/* Floating stat cards */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl z-20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-light text-stone-900">500+</div>
                    <div className="text-sm text-stone-600">Weddings</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -top-6 -right-6 bg-white rounded-2xl p-6 shadow-xl z-20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-light text-stone-900">25+</div>
                    <div className="text-sm text-stone-600">Awards</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Secondary decorative element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-400 to-amber-400 rounded-full blur-3xl opacity-30 -z-10"
            />
          </motion.div>

          {/* Right: Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Section label */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block text-rose-600 text-sm tracking-[0.3em] uppercase mb-4"
            >
              About Us
            </motion.span>

            {/* Main heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading text-stone-900 mb-6 leading-tight"
            >
              Capturing Love Stories
              <span className="block text-rose-600 italic font-normal mt-2 font-heading">
                Since 2013
              </span>
            </motion.h2>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 text-stone-600 text-lg leading-relaxed mb-8 font-sans"
            >
              <p>
                For over a decade, <span className="font-heading text-stone-900">PicoClick Weddings</span> has 
                been trusted to preserve the most precious moments of life's greatest celebrations. Founded by 
                Mukesh & Devendra Teli, our journey began with a simple belief: every love story deserves to be 
                told beautifully.
              </p>
              <p>
                With over 200+ weddings captured across India and beyond, we've refined our craft while staying 
                true to our core philosophy—<span className="font-medium text-stone-900">let love lead the lens</span>. 
                From intimate gatherings to grand destination weddings, we bring authenticity, artistry, and 
                attention to every frame.
              </p>
            </motion.div>

            {/* Feature highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-6 mb-10"
            >
              {[
                { icon: Heart, label: "200+ Weddings" },
                { icon: Award, label: "30+ Destinations" },
                { icon: Camera, label: "28 Team Members" },
                { icon: Sparkles, label: "4.9 Rating" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-rose-600" strokeWidth={1.5} />
                  </div>
                  <span className="text-stone-700 font-medium">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="/about"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-full font-medium tracking-wide hover:shadow-2xl hover:shadow-rose-500/30 transition-all group"
              >
                Our Story
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="/portfolio"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-stone-200 text-stone-900 rounded-full font-medium tracking-wide hover:border-rose-500 hover:text-rose-600 transition-all"
              >
                View Portfolio
              </motion.a>
            </motion.div>

            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 pt-8 border-t border-stone-200"
            >
              <p className="text-sm text-stone-500">
                Trusted by couples at India's most prestigious venues including The Oberoi, Taj Palace, and Leela Hotels
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/20 to-transparent" />
    </section>
  );
}