'use client';

import { motion } from 'framer-motion';
import { Camera, Mail, Phone, MapPin, Instagram, Facebook, Heart } from 'lucide-react';
import  logo  from '../../public/picoclick_logo.png';
import Image from 'next/image';
interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Services",
    links: [
      { label: "Wedding Photography", href: "/about" },
      { label: "Engagement Shoots", href: "/about" },
      { label: "Pre-Wedding", href: "/about" },
      { label: "Destination Weddings", href: "/about" },
      { label: "Albums & Prints", href: "/contact" }
    ]
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Portfolio", href: "https://www.instagram.com/picoclick/" },
      { label: "Testimonials", href: "https://share.google/pM1ofXmkdztOZO5Ik" },
      { label: "Blog", href: "/blog" }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Terms of Serve", href: "/resources/planning-guide" },
      { label: "Cookie Policy", href: "/pricing" },
      { label: "Privacy Policy", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Terms & Privacy", href: "/terms" }
    ]
  }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-stone-900 text-stone-300 overflow-hidden">
      {/* Decorative top wave */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500" />

      {/* Main footer content */}
      <div className="relative px-6 md:px-12 lg:px-24 pt-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Brand section - Left column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4"
            >
              {/* Logo */}
              <div className="mb-6">
                <motion.a
                  href="/"
                  className="inline-flex items-center gap-3 group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center">
                    <Image alt='logo' height={100} width={100} src={logo}/>
                  </div>
                  <div>
                    <span className="block text-2xl font-heading text-white group-hover:text-rose-400 transition-colors">
                      PicoClick
                    </span>
                    <span className="block text-xs font-sans tracking-[0.2em] text-stone-400 uppercase">
                      Weddings
                    </span>
                  </div>
                </motion.a>
              </div>

              {/* Tagline */}
              <p className="text-stone-400 font-sans font-light leading-relaxed mb-8 max-w-sm">
                Capturing timeless moments and crafting love stories through the art of photography. 
                Every frame, a cherished memory.
              </p>

              {/* Social links */}
              <div className="flex gap-4">
                {[
                  { icon: Instagram, href: "https://instagram.com/picoclick", label: "Instagram" },
                  { icon: Facebook, href: "https://facebook.com/picoclick", label: "Facebook" },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-stone-800 hover:bg-gradient-to-br hover:from-rose-500 hover:to-amber-500 flex items-center justify-center transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" strokeWidth={1.5} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Links sections - Middle columns */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
              {footerSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: sectionIndex * 0.1 }}
                >
                  <h3 className="text-white font-sans font-medium mb-6 text-sm tracking-wider uppercase">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-stone-400 font-sans hover:text-rose-400 transition-colors duration-300 font-light text-sm inline-block hover:translate-x-1 transform transition-transform"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Contact info - Right column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-3"
            >
              <h3 className="text-white font-sans font-medium mb-6 text-sm tracking-wider uppercase">
                Get in Touch
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    label: "bookings@picoclick.com",
                    href: "mailto:bookings@picoclick.com"
                  },
                  {
                    icon: Phone,
                    label: "+91 861 941 7029",
                    href: "tel:+918619417029"
                  },
                  {
                    icon: MapPin,
                    label: "City center, 220, Ashok Nagar Main Rd, Near Maya Misthan, Shakti Nagar, Udaipur, Rajasthan 313001",
                    href: "#map"
                  }
                ].map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-300"
                  >
                    <contact.icon className="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-stone-400 font-sans group-hover:text-white transition-colors text-sm font-light">
                      {contact.label}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Google Maps section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            id="map"
            className="mt-16 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-stone-800"
          >
            <div className="relative w-full h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4502.042508456978!2d73.7047048!3d24.5861307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e566e71b2a65%3A0x6c791631058b0d14!2sPICOCLICK!5e1!3m2!1sen!2sin!4v1766400173048!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-700"
                title="PicoClick Photography Location"
              />
            </div>
          </motion.div>

          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 pt-8 border-t border-stone-800"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-stone-500 font-sans text-sm font-light">
                © {currentYear} PicoClick Weddings. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-stone-500 text-sm">
                <span className="font-sans font-light">Crafted with</span>
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
                <span className="font-sans font-light">for couples in love</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </footer>
  );
}