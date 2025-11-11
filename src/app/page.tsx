// src/app/page.tsx
"use client";

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Poppins, Space_Grotesk } from 'next/font/google';
import Head from 'next/head';

// Load fonts with proper configuration
const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  adjustFontFallback: false,
});

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  adjustFontFallback: false,
});

// Simple loading spinner that matches the design system
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center h-screen w-full bg-black space-y-6">
    <div className="relative w-24 h-24">
      <div className="absolute inset-0 border-4 border-transparent border-t-red-500 rounded-full animate-spin"></div>
      <div className="absolute inset-2 border-4 border-transparent border-b-blue-500 rounded-full animate-spin" style={{ animationDelay: '0.15s' }}></div>
      <div className="absolute inset-4 border-4 border-transparent border-l-green-500 rounded-full animate-spin" style={{ animationDelay: '0.3s' }}></div>
      <div className="absolute inset-0 m-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
    </div>
    <div className="text-center">
      <h2 className="text-xl font-bold text-white mb-2">Loading Portfolio</h2>
      <div className="flex justify-center space-x-1">
        {[...Array(3)].map((_, i) => (
          <span 
            key={i}
            className="w-2 h-2 bg-white rounded-full inline-block"
            style={{
              animation: `bounce 1.4s infinite ${i * 0.16}s`,
            }}
          />
        ))}
      </div>
    </div>
    
    <style jsx global>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      @keyframes bounce {
        0%, 80%, 100% { 
          transform: scale(0);
        } 
        40% { 
          transform: scale(1.0);
        }
      }
      .animate-spin-slow {
        animation: spin 3s linear infinite;
      }
      .animate-spin-slow-reverse {
        animation: spin 4s linear infinite reverse;
      }
    `}</style>
  </div>
);

// Dynamic imports with better loading states
const MotionBackground = dynamic(() => import('@/components/MotionBackground'), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-bg" />
});

const Navbar = dynamic(() => import('@/components/Navbar'), { 
  ssr: true,
  loading: () => (
    <header className="fixed top-0 left-0 right-0 h-16 bg-bg/80 backdrop-blur-md z-50 border-b border-border/50" />
  )
});

const Hero = dynamic(() => import('@/components/Hero'), { 
  ssr: false, // Disable SSR for Spline component
  loading: () => <LoadingSpinner />,
});

const About = dynamic(() => import('@/components/About'), { 
  ssr: true,
  loading: () => (
    <section id="about" className="min-h-screen flex items-center justify-center">
      <LoadingSpinner />
    </section>
  )
});

const Skills = dynamic(() => import('@/components/Skills'), { 
  ssr: true,
  loading: () => (
    <section id="skills" className="py-16 bg-gray-900">
      <LoadingSpinner />
    </section>
  )
});

const Experience = dynamic(() => import('@/components/Experience'), { 
  ssr: true,
  loading: () => (
    <section id="experience" className="py-20 bg-bg">
      <LoadingSpinner />
    </section>
  )
});

const Projects = dynamic(() => import('@/components/Projects'), { 
  ssr: true,
  loading: () => (
    <section id="projects" className="min-h-screen flex items-center justify-center">
      <LoadingSpinner />
    </section>
  )
});

const Contact = dynamic(() => import('@/components/Contact'), { 
  ssr: true,
  loading: () => (
    <section id="contact" className="py-20 bg-gray-900 min-h-[50vh]">
      <LoadingSpinner />
    </section>
  )
});

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
  ssr: false,
});

function HomeContent() {
  return (
    <div className={`${poppins.variable} ${spaceGrotesk.variable} font-sans min-h-screen bg-bg text-text`}>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="Welcome to my portfolio" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CustomCursor />
      <MotionBackground />
      <Navbar />
      
      <main className="relative z-10">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </Suspense>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HomeContent />
    </Suspense>
  );
}