"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiUser, FiCode, FiBriefcase, FiMail, FiBookOpen, FiMenu, FiX, FiLayers } from 'react-icons/fi';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close mobile menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      // Get all sections
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      
      // Special case for home section (top of page)
      if (window.scrollY <= 10) {
        setActiveSection('home');
        return;
      }
      
      // Find the section in view
      let currentSection = 'home';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If element is in viewport (with some threshold)
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = section;
            break;
          }
        }
      }
      
      // Only update if we found a new section
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home', icon: <FiHome className="text-xl" />, id: 'home' },
    { name: 'About', href: '#about', icon: <FiUser className="text-xl" />, id: 'about' },
    { name: 'Skills', href: '#skills', icon: <FiCode className="text-xl" />, id: 'skills' },
    { name: 'Experience', href: '#experience', icon: <FiBriefcase className="text-xl" />, id: 'experience' },
    { name: 'Projects', href: '#projects', icon: <FiLayers className="text-xl" />, id: 'projects' },
    { name: 'Contact', href: '#contact', icon: <FiMail className="text-xl" />, id: 'contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const handleNavClick = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    
    if (sectionId === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 80; // Adjust this value based on your header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  // Nav item component
  const NavItem = ({ item }: { item: typeof navItems[0] }) => (
    <Link
      href={item.href}
      onClick={(e) => handleNavClick(item.id, e)}
      className={`flex items-center p-3 text-gray-300 hover:text-white hover:bg-red-900/30 rounded-full transition-all group ${
        activeSection === item.id ? 'text-red-500' : ''
      }`}
      scroll={false}
      aria-label={item.name}
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
      <span className={`ml-2 text-sm transition-opacity ${
        activeSection === item.id ? 'opacity-100 text-red-500' : 'opacity-0 group-hover:opacity-100 md:opacity-100 md:ml-3 md:mr-1'
      }`}>
        {item.name}
      </span>
    </Link>
  );

  return (
    <>
      {/* Desktop Navbar */}
      <nav 
        ref={navRef}
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 hidden md:block ${
          isScrolled ? 'scale-90 opacity-90' : 'scale-100'
        }`}
      >
        <div className="bg-black/80 backdrop-blur-md rounded-2xl px-4 py-3 border border-gray-800 shadow-lg">
          <div className="flex items-center space-x-0">
            {navItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 p-3 bg-black/80 backdrop-blur-md rounded-full border border-gray-800 shadow-lg md:hidden"
        onClick={toggleMobileMenu}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <FiX className="text-white text-xl" />
        ) : (
          <FiMenu className="text-white text-xl" />
        )}
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-40 bg-black/90 backdrop-blur-md rounded-xl border border-gray-800 shadow-2xl p-2 w-56 md:hidden"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavItem item={item} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;