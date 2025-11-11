// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiHome, FiUser, FiCode, FiBriefcase, FiMail, FiBookOpen } from 'react-icons/fi';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      // Get all sections
      const sections = ['home', 'about', 'skills', 'work', 'education', 'projects', 'contact'];
      
      // Find the section in view
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home', icon: <FiHome className="text-xl" />, id: 'home' },
    { name: 'About', href: '#about', icon: <FiUser className="text-xl" />, id: 'about' },
    { name: 'Skills', href: '#skills', icon: <FiCode className="text-xl" />, id: 'skills' },
    { name: 'Work', href: '#work', icon: <FiBriefcase className="text-xl" />, id: 'work' },
    { name: 'Education', href: '#education', icon: <FiBookOpen className="text-xl" />, id: 'education' },
    { name: 'Projects', href: '#projects', icon: <FiBriefcase className="text-xl" />, id: 'projects' },
    { name: 'Contact', href: '#contact', icon: <FiMail className="text-xl" />, id: 'contact' },
  ];

  return (
    <nav className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
      isScrolled ? 'scale-90 opacity-90' : 'scale-100'
    }`}>
      <div className="bg-black/80 backdrop-blur-md rounded-full px-4 py-2 border border-gray-800 shadow-lg">
        <div className="flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="p-3 text-gray-300 hover:text-white hover:bg-red-900/30 rounded-full transition-all flex flex-col items-center group"
              scroll={false}
            >
              <div className="relative">
                {item.icon}
                {activeSection === item.id && (
                  <motion.span 
                    className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
              <span className={`text-xs mt-1 transition-opacity ${
                activeSection === item.id ? 'opacity-100 text-red-500' : 'opacity-0 group-hover:opacity-100'
              }`}>
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;