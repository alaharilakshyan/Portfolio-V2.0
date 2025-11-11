'use client';

import { motion } from 'framer-motion';

export const LoadingAnimation = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  const circleSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer circle */}
      <motion.div
        className={`${circleSize} rounded-full border-4 border-red-500/20 absolute`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Middle circle */}
      <motion.div
        className={`${circleSize} rounded-full border-4 border-red-500/30 absolute`}
        animate={{
          scale: [0.8, 1, 0.8],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.2
        }}
      />
      
      {/* Inner circle with text */}
      <motion.div
        className={`${circleSize} rounded-full border-4 border-red-500/40 flex items-center justify-center`}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <span className="text-xs font-mono text-red-400">Loading...</span>
      </motion.div>
      
      {/* Animated dots */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-red-500 rounded-full"
          style={{
            width: 8,
            height: 8,
            x: Math.cos((i * 2 * Math.PI) / 3) * 30,
            y: Math.sin((i * 2 * Math.PI) / 3) * 30,
          }}
          animate={{
            scale: [0.5, 1, 0.5],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

export default LoadingAnimation;
