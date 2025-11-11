"use client";

import React, { JSX } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { FiGithub, FiExternalLink, FiCode, FiArrowRight } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaPython, FaJava } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiFirebase, SiMongodb } from 'react-icons/si';

// Define the project type for better type safety
export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  github: string;
  featured?: boolean;
};

// Technology icons mapping with proper type
type TechIcons = {
  [key: string]: JSX.Element;
};

const techIcons: TechIcons = {
  'React': <FaReact className="text-blue-400" />,
  'Next.js': <SiNextdotjs className="text-white" />,
  'TypeScript': <SiTypescript className="text-blue-600" />,
  'Node.js': <FaNodeJs className="text-green-500" />,
  'Python': <FaPython className="text-yellow-400" />,
  'Java': <FaJava className="text-red-500" />,
  'Tailwind': <SiTailwindcss className="text-cyan-400" />,
  'Firebase': <SiFirebase className="text-yellow-500" />,
  'MongoDB': <SiMongodb className="text-green-500" />,
  'TensorFlow': <span className="text-orange-500 font-bold">TF</span>,
  'Redux': <span className="text-purple-500 font-bold">Rdx</span>,
  'GraphQL': <span className="text-pink-500 font-bold">GQL</span>,
  'Material UI': <span className="text-blue-500 font-bold">MUI</span>
};

export const projects: Project[] = [
  {
    id: 'portfolio-website',
    title: "Portfolio Website",
    description: "A modern portfolio website built with Next.js, TypeScript, and Tailwind CSS, featuring smooth animations and a responsive design.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    image: "/project-portfolio.jpg",
    link: "#",
    github: "#",
    featured: true
  },
  {
    id: 'ecommerce-platform',
    title: "E-commerce Platform",
    description: "A full-stack e-commerce platform with user authentication, product catalog, and payment integration.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "/project-ecommerce.jpg",
    link: "#",
    github: "#",
    featured: true
  },
  {
    id: 'task-management',
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    tags: ["React", "Firebase", "Redux", "Material UI"],
    image: "/project-taskapp.jpg",
    link: "#",
    github: "#",
    featured: true
  },
  {
    id: 'ai-chatbot',
    title: "AI-Powered Chatbot",
    description: "An intelligent chatbot using natural language processing to provide customer support and answer queries.",
    tags: ["Python", "TensorFlow", "Flask", "React"],
    image: "/project-chatbot.jpg",
    link: "#",
    github: "#"
  },
  {
    id: 'fitness-tracker',
    title: "Fitness Tracker",
    description: "A mobile-first fitness tracking application with workout plans, progress tracking, and nutrition logging.",
    tags: ["React Native", "Node.js", "MongoDB", "GraphQL"],
    image: "/project-fitness.jpg",
    link: "#",
    github: "#"
  },
  {
    id: 'recipe-finder',
    title: "Recipe Finder",
    description: "A recipe discovery platform with advanced search, filtering, and personalized recommendations.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Spoonacular API"],
    image: "/project-recipe.jpg",
    link: "#",
    github: "#"
  }
];

// Get featured projects (first 3)
const featuredProjects = projects.filter(project => project.featured);

const Projects = ({ showAll = false }: { showAll?: boolean }) => {
  const projectsToShow = showAll ? projects : featuredProjects;
  
  // Animation variants with proper typing
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      } 
    }
  };

  // Project card component
  const ProjectCard = ({ project }: { project: Project }) => (
    <motion.div 
      variants={item}
      className="group relative h-full flex flex-col bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-red-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-red-900/10"
      whileHover={{ y: -5 }}
    >
      {/* Project Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
        <div className="absolute inset-0 flex items-center justify-center z-0 opacity-20 group-hover:opacity-30 transition-opacity">
          <FiCode className="w-16 h-16 text-white" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map(tag => (
              <span 
                key={tag} 
                className="px-2 py-0.5 bg-gray-700/70 text-xs rounded-full text-gray-200 flex items-center gap-1.5"
              >
                {techIcons[tag] || <FiCode className="w-2.5 h-2.5" />}
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-0.5 bg-gray-700/50 text-xs rounded-full text-gray-400">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Project Content */}
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-gray-300 mb-6 flex-1">{project.description}</p>
        
        {/* Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-gray-300 hover:text-white transition-colors group-has-[a:hover]:text-gray-400"
            aria-label="View Live Demo"
          >
            <FiExternalLink className="mr-1.5" /> Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors group-has-[a:hover]:text-gray-400"
            aria-label="View on GitHub"
          >
            <FiGithub className="mr-1.5" /> Code
          </a>
        </div>
      </div>
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl p-px bg-gradient-to-r from-red-500/0 via-red-500/20 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
    </motion.div>
  );

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-red-500 font-mono text-sm mb-2 inline-block">My Work</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {showAll ? 'All Projects' : 'Featured Projects'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projectsToShow.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              className="group relative h-full flex flex-col bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-red-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-red-900/10"
              whileHover={{ y: -5 }}
            >
              <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center z-0 opacity-20 group-hover:opacity-30 transition-opacity">
                  <FiCode className="w-16 h-16 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map(tag => (
                      <span 
                        key={tag} 
                        className="px-2 py-0.5 bg-gray-700/70 text-xs rounded-full text-gray-200 flex items-center gap-1.5"
                      >
                        {techIcons[tag] || <FiCode className="w-2.5 h-2.5" />}
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-0.5 bg-gray-700/50 text-xs rounded-full text-gray-400">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-300 mb-6 flex-1">{project.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    <FiExternalLink className="mr-1.5" /> Live Demo
                  </a>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <FiGithub className="mr-1.5" /> Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {!showAll && (
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/projects"
              className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden text-sm font-medium text-white border-2 border-red-600 rounded-full group hover:bg-red-600/10 transition-all duration-300 hover:shadow-lg hover:shadow-red-900/20 min-w-[180px]"
            >
              <span className="relative z-10 flex items-center gap-2">
                View All Projects
                <span className="inline-flex items-center justify-center w-5 h-5 transition-transform duration-300 group-hover:translate-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
              </span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600/0 via-red-600/10 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;