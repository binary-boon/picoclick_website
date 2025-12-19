'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Camera, Heart, Award, Users, MapPin, Star, Sparkles, Clock } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto">
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
            <div className="space-y-4 text-stone-600 leading-relaxed">
              <p>
                PicoClick Photography was born from a simple belief: every love story deserves to be told beautifully. 
                What started as a passion project in 2013 has blossomed into one of India's most sought-after wedding 
                photography studios.
              </p>
              <p>
                Founded by husband-and-wife duo Arjun and Priya Mehta, our journey began with a camera, a dream, and 
                an unwavering commitment to capturing authentic moments. Over 500 weddings later, we've refined our 
                craft while staying true to our core philosophy: let love lead the lens.
              </p>
              <p>
                Today, our team of 12 talented photographers and cinematographers travels across India and beyond, 
                documenting celebrations from intimate gatherings to grand destination weddings. Each wedding we 
                photograph becomes part of our story, enriching our perspective and deepening our commitment to 
                excellence.
              </p>
            </div>
          </motion.div>

          {/* Right: Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { icon: Heart, number: "500+", label: "Weddings Captured" },
              { icon: Award, number: "25+", label: "Awards Won" },
              { icon: Users, number: "12", label: "Team Members" },
              { icon: Star, number: "4.9", label: "Average Rating" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-gradient-to-br from-stone-50 to-rose-50 rounded-2xl p-8 text-center group hover:shadow-xl transition-shadow"
              >
                <stat.icon className="w-8 h-8 text-rose-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-light text-stone-900 mb-2">{stat.number}</div>
                <div className="text-sm text-stone-600">{stat.label}</div>
              </motion.div>
            ))}
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
      icon: Users,
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <value.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-light text-stone-900 mb-3">{value.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Luxury Venues Section
function LuxuryVenues() {
  const venues = [
    {
      name: "The Oberoi Udaivilas",
      location: "Udaipur, Rajasthan",
      events: "45+ Weddings",
      image: "🏰"
    },
    {
      name: "Taj Lake Palace",
      location: "Udaipur, Rajasthan",
      events: "38+ Weddings",
      image: "🏛️"
    },
    {
      name: "The Leela Palace",
      location: "Bangalore, Karnataka",
      events: "52+ Weddings",
      image: "👑"
    },
    {
      name: "Taj Falaknuma Palace",
      location: "Hyderabad, Telangana",
      events: "41+ Weddings",
      image: "🕌"
    },
    {
      name: "ITC Grand Bharat",
      location: "Gurugram, Haryana",
      events: "35+ Weddings",
      image: "🏨"
    },
    {
      name: "JW Marriott",
      location: "Jaipur, Rajasthan",
      events: "48+ Weddings",
      image: "✨"
    },
    {
      name: "Rambagh Palace",
      location: "Jaipur, Rajasthan",
      events: "29+ Weddings",
      image: "🎭"
    },
    {
      name: "The Taj Mahal Palace",
      location: "Mumbai, Maharashtra",
      events: "44+ Weddings",
      image: "🌟"
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-rose-400 text-sm tracking-[0.3em] uppercase mb-4">
            Prestigious Locations
          </span>
          <h2 className="text-4xl md:text-5xl font-sans font-light mb-6">
            Luxury Venues We've <span className="text-rose-400 italic font-normal">Illuminated</span>
          </h2>
          <p className="text-xl text-stone-300 max-w-2xl mx-auto">
            Trusted by India's most prestigious hotels and palaces to capture their grandest celebrations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
              className="group relative bg-stone-800 rounded-2xl p-6 hover:bg-gradient-to-br hover:from-stone-800 hover:to-stone-700 transition-all"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{venue.image}</div>
              <h3 className="text-lg font-medium mb-2 group-hover:text-rose-400 transition-colors">
                {venue.name}
              </h3>
              <div className="flex items-center gap-2 text-stone-400 text-sm mb-3">
                <MapPin className="w-4 h-4" />
                <span>{venue.location}</span>
              </div>
              <div className="text-rose-400 text-sm font-medium">
                {venue.events}
              </div>
              
              {/* Decorative line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-rose-500 to-amber-500 group-hover:w-full transition-all duration-500 rounded-b-2xl" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-stone-400 text-sm">
            And many more luxury destinations across India and internationally
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Team Section
function OurTeam() {
  const team = [
    {
      name: "Arjun Mehta",
      role: "Founder & Lead Photographer",
      bio: "15+ years of experience capturing love stories. Award-winning photographer with a fine arts background.",
      specialty: "Creative Direction"
    },
    {
      name: "Priya Mehta",
      role: "Co-Founder & Creative Director",
      bio: "Specializes in candid moments and emotional storytelling. Featured in Vogue Weddings.",
      specialty: "Candid Photography"
    },
    {
      name: "Vikram Singh",
      role: "Senior Photographer",
      bio: "Master of lighting and composition. 10+ years experience in luxury wedding photography.",
      specialty: "Portrait Photography"
    },
    {
      name: "Aisha Patel",
      role: "Lead Cinematographer",
      bio: "Creates cinematic wedding films. Background in documentary filmmaking.",
      specialty: "Wedding Films"
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-rose-600 text-sm tracking-[0.3em] uppercase mb-4">
            Meet The Artists
          </span>
          <h2 className="text-4xl md:text-5xl font-sans font-light text-stone-900 mb-6">
            Our Talented <span className="text-rose-600 italic font-normal">Team</span>
          </h2>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            A collective of passionate photographers and cinematographers dedicated to your story
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group text-center"
            >
              {/* Avatar */}
              <div className="relative mb-6 mx-auto w-48 h-48">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center text-white text-5xl font-light group-hover:scale-105 transition-transform">
                  {member.name.charAt(0)}
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-500/0 to-amber-500/0 group-hover:from-rose-500/20 group-hover:to-amber-500/20 transition-all" />
              </div>

              <h3 className="text-xl font-medium text-stone-900 mb-1">{member.name}</h3>
              <div className="text-rose-600 text-sm mb-3">{member.role}</div>
              <p className="text-stone-600 text-sm leading-relaxed mb-3">{member.bio}</p>
              <div className="inline-block px-4 py-2 bg-stone-100 rounded-full text-xs text-stone-700">
                {member.specialty}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Awards & Recognition Section
function AwardsRecognition() {
  const awards = [
    { year: "2024", title: "Best Wedding Photographer", org: "WeddingSutra Awards" },
    { year: "2024", title: "Excellence in Photography", org: "India Wedding Awards" },
    { year: "2023", title: "Top 10 Photographers", org: "Vogue Weddings" },
    { year: "2023", title: "Creative Excellence Award", org: "Wedding Wishlist" },
    { year: "2022", title: "Best Destination Wedding", org: "Brides Today" },
    { year: "2022", title: "People's Choice Award", org: "WedMeGood" },
  ];

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white via-rose-50/30 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-rose-600 text-sm tracking-[0.3em] uppercase mb-4">
            Recognition
          </span>
          <h2 className="text-4xl md:text-5xl font-sans font-light text-stone-900 mb-6">
            Awards & <span className="text-rose-600 italic font-normal">Accolades</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award, index) => (
            <motion.div
              key={`${award.year}-${award.title}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 p-6 bg-white rounded-xl hover:shadow-lg transition-shadow"
            >
              <Award className="w-6 h-6 text-rose-600 flex-shrink-0 mt-1" />
              <div>
                <div className="text-rose-600 text-sm font-medium mb-1">{award.year}</div>
                <div className="text-stone-900 font-medium mb-1">{award.title}</div>
                <div className="text-stone-500 text-sm">{award.org}</div>
              </div>
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
            href="/portfolio"
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
      <OurValues />
      <LuxuryVenues />
      <OurTeam />
      <AwardsRecognition />
      <CTASection />
    </main>
  );
}