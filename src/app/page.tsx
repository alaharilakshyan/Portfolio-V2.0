// src/app/page.tsx
"use client";

import { useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Poppins, Space_Grotesk } from 'next/font/google';
import Head from 'next/head';

// Loading components for better UX
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen w-full bg-black">
    <div className="w-12 h-12 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>
  </div>
);

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
  ssr: true,
  loading: () => (
    <section id="hero" className="min-h-screen flex items-center justify-center">
      <LoadingSpinner />
    </section>
  )
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

const Work = dynamic(() => import('@/components/Work'), { 
  ssr: true,
  loading: () => (
    <section id="work" className="py-16 bg-gray-900">
      <LoadingSpinner />
    </section>
  )
});

const Education = dynamic(() => import('@/components/Education'), { 
  ssr: true,
  loading: () => (
    <section id="education" className="py-16 bg-gray-900">
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


export default function Home() {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId) {
          const element = document.querySelector(targetId);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className={`min-h-screen bg-gray-900 text-white ${poppins.variable} font-sans overflow-x-hidden`}>
      <Head>
        <title>Your Name - Portfolio</title>
        <meta name="description" content="Professional portfolio showcasing my work and skills" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MotionBackground />
      <Navbar />
      
      <div className="relative z-10">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
          <About />
          <Skills />
          <Work />
          <Education />
          <Projects />
          <Contact />
        </Suspense>
      </div>
    </div>
  );
}