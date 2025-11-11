'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTextHovered, setIsTextHovered] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);

  // Smooth out the cursor movement with spring physics
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - (isHovered || isImageHovered ? 20 : 8));
      cursorY.set(e.clientY - (isHovered || isImageHovered ? 20 : 8));
    };

    // Check for hoverable elements
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, input, textarea, .interactive, [role="button"]')) {
        setIsHovered(true);
      } else if (target.matches('img, .image-hover')) {
        setIsImageHovered(true);
      } else if (target.matches('p, h1, h2, h3, h4, h5, h6, span, div, li, label, th, td, cite, blockquote, figcaption, .text-hover')) {
        setIsTextHovered(true);
      }
    };
    
    const handleMouseLeave = () => {
      setIsHovered(false);
      setIsTextHovered(false);
      setIsImageHovered(false);
    };
    
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Add event listeners
    window.addEventListener('mousemove', moveCursor);
    
    // Add hover effect for interactive elements
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY, isHovered, isImageHovered]);

  return (
    <motion.div
      className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] ${
        isTextHovered 
          ? 'mix-blend-difference bg-white' 
          : isImageHovered
            ? 'backdrop-blur-md bg-white/20 border-2 border-white/30'
            : isHovered 
              ? 'bg-white/80 backdrop-blur-sm' 
              : 'bg-white/30 backdrop-blur-sm'
      }`}
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
      animate={{
        width: isTextHovered ? 60 : isHovered || isImageHovered ? 32 : 16,
        height: isTextHovered ? 60 : isHovered || isImageHovered ? 32 : 16,
        scale: isClicked ? 0.8 : 1,
      }}
      transition={{
        type: 'spring',
        damping: isTextHovered ? 10 : 20,
        stiffness: isTextHovered ? 100 : 300,
        mass: 0.5,
      }}
    >
      {isTextHovered && (
        <motion.div 
          className="absolute inset-0 rounded-full bg-white/20"
          animate={{
            scale: 0.6,
          }}
          transition={{
            duration: 0.3,
          }}
        />
      )}
      {isImageHovered && (
        <motion.div 
          className="absolute inset-0 rounded-full border-2 border-white/50"
          animate={{
            scale: 0.8,
          }}
          transition={{
            duration: 0.3,
          }}
        />
      )}
    </motion.div>
  );
}