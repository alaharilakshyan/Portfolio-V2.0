"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import SocialIcons from './SocialIcons';
import LoadingAnimation from './LoadingAnimation';

// Dynamically import Spline to avoid SSR issues
const Spline = dynamic(() => import('@splinetool/react-spline'), { 
  ssr: false
});

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Initial loading delay to show the animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && splineLoaded) {
      setShowContent(true);
    }
  }, [isLoading, splineLoaded]);

  const handleSplineLoad = () => {
    setSplineLoaded(true);
  };

  return (
    <section className="min-h-screen flex items-center bg-black text-white relative overflow-hidden">
      {/* Full-screen loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center gap-4"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <LoadingAnimation size="lg" />
            <motion.p 
              className="text-red-400 text-sm mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Loading your experience...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-grid-white/[0.05]" />
      
      <motion.div 
        className={`container mx-auto px-4 py-20 md:py-0 flex flex-col md:flex-row items-center justify-between min-h-[calc(100vh-80px)] ${
          showContent ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-500`}
      >
        {/* Left side - Text content */}
        <div className="md:w-1/2 text-center md:text-left z-10">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hi, I'm <span className="text-red-500">Your Name</span>
          </motion.h1>
          
          <motion.div
            className="text-xl md:text-2xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-red-500">Full Stack Developer</span> & Tech Enthusiast
          </motion.div>
          
          <motion.p 
            className="text-gray-400 mb-8 max-w-lg mx-auto md:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I craft exceptional digital experiences with modern web technologies.
            Currently focused on building responsive and user-friendly applications.
          </motion.p>
          
          <motion.div
            className="flex flex-col space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                href="#projects" 
                className="bg-gradient-to-r from-red-600 to-red-800 text-white px-8 py-3 rounded-full text-lg font-medium hover:opacity-90 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-red-900/30 flex-1 sm:flex-none text-center"
              >
                View Work
              </Link>
              <a
                href="/cv.pdf"
                download
                className="bg-transparent border-2 border-red-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-red-600/10 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-red-900/10 flex-1 sm:flex-none text-center"
              >
                Download CV
              </a>
            </div>
            
            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4"
            >
              <p className="text-gray-400 text-sm mb-2">Connect with me</p>
              <SocialIcons />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Right side - Spline 3D Model */}
        <motion.div 
          className="w-full md:w-1/2 h-[400px] md:h-[70vh] flex items-center justify-center mt-12 md:mt-0 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-red-500/30 shadow-2xl bg-black">
            <AnimatePresence>
              {!splineLoaded && (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <LoadingAnimation size="md" />
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.div 
              className="w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: splineLoaded ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {isMounted && (
                <Spline
                  scene="https://prod.spline.design/zChGX7xTEslLRtDy/scene.splinecode"
                  className="w-full h-full scale-150"
                  onLoad={handleSplineLoad}
                />
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-red-500 rounded-full flex justify-center p-1">
          <motion.div
            className="w-1 h-2 bg-red-500 rounded-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
