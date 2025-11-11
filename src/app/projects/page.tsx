"use client";

import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import dynamic from 'next/dynamic';

const Projects = dynamic(() => import('@/components/Projects'), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-64 bg-gray-800/50 rounded-2xl animate-pulse"></div>
      ))}
    </div>
  ),
});

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-8 group"
        >
          <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        <Projects showAll={true} />
      </div>
    </div>

    
  );
}