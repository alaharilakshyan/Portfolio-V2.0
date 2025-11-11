// src/components/About.tsx
"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-red-500 mx-auto mb-12"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
            <motion.div 
              className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-red-500/40 shadow-2xl"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              style={{
                boxShadow: '0 0 25px rgba(239, 68, 68, 0.3)'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/about-image.jpg"
                  alt="Profile Picture"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                  style={{
                    objectPosition: 'center 25%',
                    transform: 'scale(1.1)'
                  }}
                  priority
                />
              </div>
            </motion.div>
            <div className="flex-1 max-w-2xl">
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm a passionate developer with expertise in modern web technologies.
                I love creating beautiful, responsive, and user-friendly applications.
                With a keen eye for design and a commitment to clean code, I bring ideas to life
                through intuitive interfaces and seamless user experiences.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;