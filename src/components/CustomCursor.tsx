'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Smooth out the cursor movement with spring physics
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - (isHovered ? 20 : 8));
      cursorY.set(e.clientY - (isHovered ? 20 : 8));
    };

    // Check for hoverable elements
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Add event listeners
    window.addEventListener('mousemove', moveCursor);
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, .interactive, [role="button"]'
    );
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mouseup', handleMouseUp);
    });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('mouseup', handleMouseUp);
      });
    };
  }, [cursorX, cursorY, isHovered]);

  return (
    <motion.div
      className={`fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-difference ${
        isHovered ? 'bg-white scale-150' : 'bg-white'
      } ${isClicked ? 'scale-75' : ''}`}
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
      animate={{
        width: isHovered ? 40 : 16,
        height: isHovered ? 40 : 16,
        opacity: isHovered ? 0.8 : 1,
      }}
      transition={{
        type: 'spring',
        damping: 15,
        stiffness: 200,
      }}
    >
      <motion.div 
        className="absolute inset-0 rounded-full bg-white/30"
        animate={{
          scale: isHovered ? 0.6 : 1.5,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
        }}
      />
    </motion.div>
  );
}
