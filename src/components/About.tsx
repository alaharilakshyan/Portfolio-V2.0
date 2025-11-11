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
          
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-red-500/30 shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Image
                src="/profile.jpg" // Replace with your image path
                alt="Profile Picture"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
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