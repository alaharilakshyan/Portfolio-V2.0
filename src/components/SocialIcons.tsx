"use client";

import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const SocialIcons = () => {
  return (
    <div className="flex items-center gap-5">
      <a 
        href="https://github.com/yourusername" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative p-2 text-gray-400 hover:text-white transition-colors"
        aria-label="GitHub"
      >
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-red-500/10 transition-colors">
          <FaGithub size={16} className="group-hover:scale-110 transition-transform" />
        </div>
      </a>
      <a 
        href="https://twitter.com/yourusername" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative p-2 text-gray-400 hover:text-white transition-colors"
        aria-label="Twitter"
      >
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-red-500/10 transition-colors">
          <FaTwitter size={16} className="group-hover:scale-110 transition-transform" />
        </div>
      </a>
      <a 
        href="https://linkedin.com/in/yourusername" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative p-2 text-gray-400 hover:text-white transition-colors"
        aria-label="LinkedIn"
      >
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-red-500/10 transition-colors">
          <FaLinkedin size={16} className="group-hover:scale-110 transition-transform" />
        </div>
      </a>
      <a 
        href="https://instagram.com/yourusername" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative p-2 text-gray-400 hover:text-white transition-colors"
        aria-label="Instagram"
      >
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-red-500/10 transition-colors">
          <FaInstagram size={16} className="group-hover:scale-110 transition-transform" />
        </div>
      </a>
    </div>
  );
};

export default SocialIcons;
