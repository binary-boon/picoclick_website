'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Camera, Heart, Sparkles, Clock } from 'lucide-react';

// Hero Section Component
function AboutHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-stone-50 via-rose-50 to-amber-50">
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block text-rose-600 text-sm tracking-[0.3em] uppercase mb-4">
            Our Story
          </span>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-sans font-light text-stone-900 mb-6">
            Capturing Love,
            <span className="block text-rose-600 italic font-normal mt-2">One Frame at a Time</span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 max-w-3xl mx-auto font-light leading-relaxed">
            For over a decade, we've been trusted to preserve the most precious moments of life's greatest celebrations
          </p>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-rose-400/30 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-amber-400/30 to-transparent rounded-full blur-3xl"
        />
      </div>
    </section>
  );
}

// Brand Story Section
function BrandStory() {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-rose-600 text-sm tracking-[0.3em] uppercase mb-4">
              Since 2013
            </span>
            <h2 className="text-4xl md:text-5xl font-sans font-light text-stone-900 mb-6">
              Where It All <span className="text-rose-600 italic font-normal">Began</span>
            </h2>
            <div className="space-y-4 text-stone-600 leading-relaxed text-lg">
              <p>
                PicoClick Weddings was founded in 2013 by <strong className="text-stone-900">Mukesh Teli</strong> and <strong className="text-stone-900">Devendra Teli</strong>, 
                born from a simple belief: every love story deserves to be told beautifully.
              </p>
              <p>
                What started as a passion project has blossomed into a trusted name in wedding photography and cinematography. 
                With over a decade of experience, we've refined our craft while staying true to our core philosophy: let love 
                lead the lens.
              </p>
              <p>
                Each wedding we photograph becomes part of our story, enriching our perspective and deepening our commitment to 
                capturing authentic moments that last forever.
              </p>
            </div>
          </motion.div>

          {/* Right: Decorative Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-rose-100 to-amber-100 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="w-32 h-32 text-rose-600/20" />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-rose-600 to-amber-600 rounded-full blur-2xl opacity-30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Values Section
function OurValues() {
  const values = [
    {
      icon: Heart,
      title: "Authenticity First",
      description: "We capture real emotions, not posed perfection. Your genuine moments are what make your story unique and beautiful."
    },
    {
      icon: Sparkles,
      title: "Creative Excellence",
      description: "Every wedding is an opportunity to push creative boundaries while honoring timeless elegance and classic composition."
    },
    {
      icon: Camera,
      title: "Personal Connection",
      description: "We invest time in understanding your story, your dreams, and your vision to create truly personalized imagery."
    },
    {
      icon: Clock,
      title: "Timeless Quality",
      description: "Our photographs are crafted to transcend trends, ensuring your memories remain as beautiful decades from now."
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white via-stone-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-rose-600 text-sm tracking-[0.3em] uppercase mb-4">
            What Drives Us
          </span>
          <h2 className="text-4xl md:text-5xl font-sans font-light text-stone-900 mb-6">
            Our Core <span className="text-rose-600 italic font-normal">Values</span>
          </h2>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            These principles guide every decision we make and every photograph we create
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 h-full shadow-sm hover:shadow-xl transition-all border border-stone-100">
                <value.icon className="w-12 h-12 text-rose-600 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-medium text-stone-900 mb-3">{value.title}</h3>
                <p className="text-stone-600 leading-relaxed">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Founders Section
function OurFounders() {
  const founders = [
    {
      name: "Mukesh Teli",
      role: "Co-Founder",
      initial: "M"
    },
    {
      name: "Devendra Teli",
      role: "Co-Founder",
      initial: "D"
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-rose-600 text-sm tracking-[0.3em] uppercase mb-4">
            Meet The Founders
          </span>
          <h2 className="text-4xl md:text-5xl font-sans font-light text-stone-900 mb-6">
            The Visionaries Behind <span className="text-rose-600 italic font-normal">PicoClick</span>
          </h2>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            Founded in 2013 by two passionate photographers with a shared vision
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group text-center"
            >
              {/* Avatar */}
              <div className="relative mb-6 mx-auto w-56 h-56">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center text-white text-6xl font-light group-hover:scale-105 transition-transform shadow-2xl">
                  {founder.initial}
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-500/0 to-amber-500/0 group-hover:from-rose-500/20 group-hover:to-amber-500/20 transition-all" />
              </div>

              <h3 className="text-2xl font-medium text-stone-900 mb-2">{founder.name}</h3>
              <div className="text-rose-600 text-base font-medium">{founder.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-stone-900 via-rose-900/20 to-stone-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-light mb-6">
          Let's Create Something
          <span className="block text-rose-400 italic font-normal mt-2">Extraordinary Together</span>
        </h2>
        <p className="text-xl text-stone-300 mb-10 max-w-2xl mx-auto">
          Every love story is unique. We'd be honored to tell yours with the artistry and care it deserves.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-4 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-full font-medium tracking-wide hover:shadow-2xl hover:shadow-rose-500/30 transition-all"
          >
            Book a Consultation
          </motion.a>
          <motion.a
            href="/gallery"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium tracking-wide hover:bg-white/20 transition-all border border-white/20"
          >
            View Our Work
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

// Main About Page
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <AboutHero />
      <BrandStory />
      <OurFounders />
      <OurValues />
      <CTASection />
    </main>
  );
}