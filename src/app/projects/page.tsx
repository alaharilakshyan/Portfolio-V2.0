// src/app/projects/page.tsx
"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

const allProjects = [
  // Your full list of projects
  {
    title: "Project 1",
    description: "A brief description of project 1",
    tags: ["React", "Next.js", "Tailwind"],
    image: "/project1.jpg",
    link: "#",
    github: "#"
  },
  // Add more projects as needed
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 pb-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Projects</h1>
          <div className="w-24 h-1 bg-red-500 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-red-500/30 transition-all"
            >
              <div className="h-48 bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-700/50 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a href={project.link} className="text-red-400 hover:text-red-300">Live Demo</a>
                  <a href={project.github} className="text-gray-400 hover:text-white">GitHub</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}