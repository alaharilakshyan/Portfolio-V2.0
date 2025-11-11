// src/components/Hero.tsx
"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Import Spline with proper type definitions
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div>Loading 3D model...</div>
}) as any; // Temporary type assertion to bypass TypeScript errors

// ✅ Loader animation
const SplineLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-4 border-transparent border-t-red-500 rounded-full animate-spin" />
      <div
        className="absolute inset-2 border-4 border-transparent border-b-blue-500 rounded-full animate-spin"
        style={{ animationDelay: "0.15s" }}
      />
      <div
        className="absolute inset-4 border-4 border-transparent border-l-green-500 rounded-full animate-spin"
        style={{ animationDelay: "0.3s" }}
      />
    </div>
  </div>
);

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLoad = useCallback(() => {
    console.log("Spline loaded successfully");
    setIsLoading(false);
    setError(null);
  }, []);

  const handleError = useCallback((event: any) => {
    const error = event?.error || new Error('Failed to load 3D content');
    console.error("Spline error:", error);
    setError("3D content failed to load. Please try refreshing the page.");
    setIsLoading(false);
  }, []);

  return (
    <section className="min-h-screen flex items-center bg-black text-white relative overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 py-20 md:py-0 flex flex-col md:flex-row items-center justify-between min-h-[calc(100vh-80px)]">
        {/* Left side - Text content */}
        <motion.div
          className="w-full md:w-1/2 z-10 text-center md:text-left mb-12 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-5xl font-bold mb-4">
            Hi, I'm <span className="text-red-500">Lakshyan Alahari</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-6">
            Web Developer & Designer
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg">
            I create beautiful, responsive websites and applications with modern
            technologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#contact"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-300"
            >
              Contact Me
            </a>
            <a
              href="#projects"
              className="px-6 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black rounded-lg font-medium transition-colors duration-300"
            >
              View My Work
            </a>
          </div>
        </motion.div>

        {/* Right side - 3D Spline Model (Circular) */}
<motion.div
  className="w-full md:w-1/2 aspect-square max-w-[500px] mx-auto relative"
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
>
  {isLoading && <SplineLoader />}
  <div 
    className={`w-full h-full transition-opacity duration-500 ${
      !isLoading ? 'opacity-100' : 'opacity-0'
    }`}
  >
    {error ? (
      <div className="w-full h-full flex items-center justify-center bg-gray-900/50 rounded-full">
        <p className="text-gray-400 text-center p-4">{error}</p>
      </div>
    ) : (
      <div className="w-full h-full relative">
        {/* Circular mask for the Spline model */}
        <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-red-500/30">
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 w-full h-full" style={{
                transform: 'scale(2.2) translate(18%, 0%)',
                overflow: 'visible',
                marginLeft: '5%'
              }}>
                <Spline
                  scene="https://prod.spline.design/zChGX7xTEslLRtDy/scene.splinecode"
                  onLoad={handleLoad}
                  onError={handleError}
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/10 to-transparent blur-xl opacity-70 -z-10"></div>
      </div>
    )}
  </div>
</motion.div>
      </div>
    </section>
  );
};

export default Hero;
