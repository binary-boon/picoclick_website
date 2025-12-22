'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Instagram, Facebook, Calendar } from 'lucide-react';

// Contact Form Component
function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    venue: '',
    guestCount: '',
    budget: '',
    message: '',
    hearAboutUs: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        eventDate: '',
        eventType: '',
        venue: '',
        guestCount: '',
        budget: '',
        message: '',
        hearAboutUs: '',
      });
      setIsSuccess(false);
    }, 3000);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        </motion.div>
        <h3 className="text-2xl font-light text-stone-900 mb-2">Thank You!</h3>
        <p className="text-stone-600">
          We've received your inquiry and will get back to you within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-stone-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all"
            placeholder="John"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-stone-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all"
            placeholder="Doe"
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all"
            placeholder="+91 98765 43210"
          />
        </div>
      </div>

      {/* Event Type & Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="eventType" className="block text-sm font-medium text-stone-700 mb-2">
            Event Type *
          </label>
          <select
            id="eventType"
            name="eventType"
            required
            value={formData.eventType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all bg-white"
          >
            <option value="">Select event type</option>
            <option value="wedding">Wedding</option>
            <option value="engagement">Engagement</option>
            <option value="pre-wedding">Pre-Wedding Shoot</option>
            <option value="reception">Reception</option>
            <option value="destination">Destination Wedding</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="eventDate" className="block text-sm font-medium text-stone-700 mb-2">
            Event Date *
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            required
            value={formData.eventDate}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Venue */}
      <div>
        <label htmlFor="venue" className="block text-sm font-medium text-stone-700 mb-2">
          Venue / Location
        </label>
        <input
          type="text"
          id="venue"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all"
          placeholder="e.g., The Oberoi Udaivilas, Udaipur"
        />
      </div>

      {/* Guest Count & Budget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="guestCount" className="block text-sm font-medium text-stone-700 mb-2">
            Expected Guest Count
          </label>
          <select
            id="guestCount"
            name="guestCount"
            value={formData.guestCount}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all bg-white"
          >
            <option value="">Select range</option>
            <option value="0-50">0-50</option>
            <option value="50-100">50-100</option>
            <option value="100-200">100-200</option>
            <option value="200-500">200-500</option>
            <option value="500+">500+</option>
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-stone-700 mb-2">
            Budget Range
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all bg-white"
          >
            <option value="">Select range</option>
            <option value="under-1L">Under ₹1 Lakh</option>
            <option value="1L-3L">₹1-3 Lakhs</option>
            <option value="3L-5L">₹3-5 Lakhs</option>
            <option value="5L-10L">₹5-10 Lakhs</option>
            <option value="10L+">₹10 Lakhs+</option>
          </select>
        </div>
      </div>

      {/* How did you hear about us */}
      <div>
        <label htmlFor="hearAboutUs" className="block text-sm font-medium text-stone-700 mb-2">
          How did you hear about us?
        </label>
        <select
          id="hearAboutUs"
          name="hearAboutUs"
          value={formData.hearAboutUs}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all bg-white"
        >
          <option value="">Select an option</option>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
          <option value="google">Google Search</option>
          <option value="referral">Friend/Family Referral</option>
          <option value="wedding-platform">Wedding Platform (WedMeGood, etc.)</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
          Tell us about your vision *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all resize-none"
          placeholder="Share your story, vision, special requests, or any questions you have..."
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full px-8 py-4 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-full font-medium tracking-wide hover:shadow-2xl hover:shadow-rose-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Inquiry
          </>
        )}
      </motion.button>

      <p className="text-sm text-stone-500 text-center">
        We typically respond within 24 hours. For urgent inquiries, please call us directly.
      </p>
    </form>
  );
}

// Contact Info Card Component
function ContactInfoCard({ icon: Icon, title, info, link }: { icon: any; title: string; info: string; link?: string }) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-stone-500 mb-1">{title}</h3>
          <p className="text-lg text-stone-900 font-medium">{info}</p>
        </div>
      </div>
    </motion.div>
  );

  if (link) {
    return (
      <a href={link} className="block">
        {content}
      </a>
    );
  }

  return content;
}

// Main Contact Page
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-stone-900 via-rose-900/20 to-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-rose-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <span className="inline-block text-rose-400 text-sm tracking-[0.3em] uppercase mb-4">
            Get in Touch
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-light mb-6">
            Let's Create
            <span className="block text-rose-400 italic font-normal mt-2">Magic Together</span>
          </h1>
          <p className="text-xl text-stone-300 max-w-2xl mx-auto">
            Have a question or ready to book? We'd love to hear about your special day and how we can capture it beautifully.
          </p>
        </motion.div>
      </section>

      {/* Quick Contact Info */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ContactInfoCard
              icon={Phone}
              title="Call Us"
              info="+91 861 941 7029"
              link="tel:+918619417029"
            />
            <ContactInfoCard
              icon={Mail}
              title="Email Us"
              info="picoclickudr@gmail.com"
              link="mailto:picoclickudr@gmail.com"
            />
            <ContactInfoCard
              icon={MapPin}
              title="Visit Us"
              info="City center, 220, Ashok Nagar Main Rd, Near Maya Misthan, Shakti Nagar, Udaipur, Rajasthan 313001"
              link="#map"
            />
            <ContactInfoCard
              icon={Clock}
              title="Working Hours"
              info="Mon-Sat, 10AM-7PM"
            />
          </div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
                <h2 className="text-3xl font-sans font-light text-stone-900 mb-2">
                  Send us an <span className="text-rose-600 italic font-normal">Inquiry</span>
                </h2>
                <p className="text-stone-600 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
                <ContactForm />
              </div>
            </motion.div>

            {/* Right: Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Why Choose Us */}
              <div className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-3xl p-8">
                <h3 className="text-2xl font-sans font-light text-stone-900 mb-6">
                  Why Choose <span className="text-rose-600 italic">Us?</span>
                </h3>
                <ul className="space-y-4">
                  {[
                    "500+ Weddings Captured",
                    "Award-Winning Photography",
                    "Experienced Team of 12",
                    "24-Hour Response Time",
                    "Customized Packages",
                    "Destination Coverage",
                  ].map((item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 text-stone-700"
                    >
                      <CheckCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h3 className="text-xl font-sans font-light text-stone-900 mb-6">
                  Follow Our <span className="text-rose-600 italic">Journey</span>
                </h3>
                <div className="space-y-4">
                  <a
                    href="https://instagram.com/picoclick"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-stone-50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Instagram className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-stone-900">Instagram</div>
                      <div className="text-sm text-stone-500">@picoclick</div>
                    </div>
                  </a>
                  <a
                    href="https://facebook.com/picoclick"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-stone-50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Facebook className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-stone-900">Facebook</div>
                      <div className="text-sm text-stone-500">@picoclick</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Quick Booking */}
              <div className="bg-gradient-to-br from-stone-900 to-rose-900/20 rounded-3xl p-8 text-white">
                <Calendar className="w-12 h-12 mb-4 text-rose-400" />
                <h3 className="text-xl font-sans font-light mb-2">
                  Need it <span className="text-rose-400 italic">Fast?</span>
                </h3>
                <p className="text-stone-300 text-sm mb-4">
                  Book a consultation call directly and let's discuss your wedding in detail.
                </p>
                <motion.a
                  href="/book-consultation"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block w-full px-6 py-3 bg-white text-stone-900 rounded-full font-medium text-center hover:shadow-xl transition-all"
                >
                  Book Consultation
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    

      {/* FAQ Quick Links */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-sans font-light text-stone-900 mb-4">
              Have <span className="text-rose-600 italic font-normal">Questions?</span>
            </h2>
            <p className="text-stone-600 mb-8">
              Check out our FAQ section for quick answers to common questions
            </p>
            <motion.a
              href="/faq"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-10 py-4 bg-stone-900 text-white rounded-full font-medium hover:shadow-2xl transition-all"
            >
              View FAQs
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}