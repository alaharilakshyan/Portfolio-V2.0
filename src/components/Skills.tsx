"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaReact, FaNodeJs, FaAws, FaDocker, FaGithub } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiNextdotjs, SiExpress, SiMongodb, SiPostgresql, SiRedux, SiGraphql } from 'react-icons/si';
import { TbBrandThreejs } from 'react-icons/tb';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement[]>([]);

  // Skills data
  const skills = [
    { name: 'React', icon: <FaReact className="text-blue-400 text-5xl" /> },
    { name: 'Next.js', icon: <SiNextdotjs className="text-white text-5xl" /> },
    { name: 'TypeScript', icon: <SiTypescript className="text-blue-600 text-5xl" /> },
    { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400 text-5xl" /> },
    { name: 'Node.js', icon: <FaNodeJs className="text-green-500 text-5xl" /> },
    { name: 'Express', icon: <SiExpress className="text-gray-300 text-5xl" /> },
    { name: 'MongoDB', icon: <SiMongodb className="text-green-500 text-5xl" /> },
    { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-700 text-5xl" /> },
    { name: 'Redux', icon: <SiRedux className="text-purple-500 text-5xl" /> },
    { name: 'GraphQL', icon: <SiGraphql className="text-pink-500 text-5xl" /> },
    { name: 'Three.js', icon: <TbBrandThreejs className="text-white text-5xl" /> },
    { name: 'Docker', icon: <FaDocker className="text-blue-500 text-5xl" /> },
    { name: 'AWS', icon: <FaAws className="text-orange-400 text-5xl" /> },
    { name: 'Git', icon: <FaGithub className="text-gray-200 text-5xl" /> },
  ];

  // Duplicate skills for infinite loop effect
  const duplicatedSkills = [...skills, ...skills];

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current || !sliderRef.current) return;

    const slider = sliderRef.current;
    let animation: gsap.core.Tween;
    let ctx: gsap.Context;

    // Auto-scroll animation
    const setupAnimation = () => {
      const progress = { value: 0 };
      const speed = 0.5; // Adjust speed here (lower = faster)
      const duration = (slider.scrollWidth / 2) / (100 / speed); // Calculate duration based on width

      animation = gsap.to(progress, {
        value: 1,
        duration: duration,
        ease: 'none',
        repeat: -1, // Infinite loop
        onUpdate: () => {
          gsap.set(slider, { x: -progress.value * (slider.scrollWidth / 2) });
        }
      });
    };

    // Hover effects
    const setupHoverEffects = () => {
      skillsRef.current.forEach((skill, index) => {
        if (!skill) return;
        
        skill.addEventListener('mouseenter', () => {
          gsap.to(skill, {
            scale: 1.2,
            y: -10,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        skill.addEventListener('mouseleave', () => {
          gsap.to(skill, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });
    };

    // Initialize animations
    ctx = gsap.context(() => {
      setupAnimation();
      setupHoverEffects();
    }, containerRef);

    // Cleanup
    return () => {
      animation?.kill();
      ctx.revert();
      skillsRef.current.forEach(skill => {
        if (skill) {
          skill.removeEventListener('mouseenter', () => {});
          skill.removeEventListener('mouseleave', () => {});
        }
      });
    };
  }, []);

  return (
    <section id="skills" className="relative py-16 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">My Skills</h2>
          <div className="w-20 h-1 bg-red-500 mx-auto"></div>
        </div>
        
        <div 
          ref={containerRef}
          className="relative w-full h-40 overflow-hidden"
        >
          <div 
            ref={sliderRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-12 will-change-transform"
          >
            {duplicatedSkills.map((skill, index) => (
              <div 
                key={`${skill.name}-${index}`}
                ref={el => {
                  if (el) skillsRef.current[index] = el;
                }}
                className="skill-item flex flex-col items-center gap-2 p-4 rounded-full hover:bg-gray-800/30 transition-all cursor-pointer group"
                title={skill.name}
              >
                {skill.icon}
                <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
