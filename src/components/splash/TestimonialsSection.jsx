import React from 'react'
import { motion } from 'framer-motion'

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Digital Artist',
      avatar: 'SC',
      content: 'Foiné transformed how I share my artwork. The community is incredibly supportive, and the platform\'s aesthetics make my work shine.',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Photographer',
      avatar: 'MR',
      content: 'Finally, a platform that understands visual storytelling. The image optimization is flawless, and I\'ve gained thousands of followers.',
      rating: 5
    },
    {
      name: 'Elena Volkov',
      role: 'Graphic Designer',
      avatar: 'EV',
      content: 'The attention to detail in Foiné\'s design is unmatched. It\'s not just a platform—it\'s an extension of my creative workflow.',
      rating: 5
    }
  ]

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Lexend'] text-white">
            Loved by Creators
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of creative professionals who have made Foiné their home.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="glass-panel p-8"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              <p className="text-gray-300 italic leading-relaxed">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}