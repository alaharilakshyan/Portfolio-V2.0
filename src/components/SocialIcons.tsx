"use client";

import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const SocialIcons = () => {
  return (
    <div className="flex space-x-4 mt-8">
      <a 
        href="https://github.com/yourusername" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-red-500 transition-colors"
        aria-label="GitHub"
      >
        <FaGithub size={20} />
      </a>
      <a 
        href="https://twitter.com/yourusername" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Twitter"
      >
        <FaTwitter size={20} />
      </a>
      <a 
        href="https://linkedin.com/in/yourusername" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-red-500 transition-colors"
        aria-label="LinkedIn"
      >
        <FaLinkedin size={20} />
      </a>
      <a 
        href="https://instagram.com/yourusername" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Instagram"
      >
        <FaInstagram size={20} />
      </a>
    </div>
  );
};

export default SocialIcons;
