"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiTwitter, FiSend } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Replace with your form submission logic
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      setSubmitStatus({
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });
      
      // Clear the form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-red-900/10 to-transparent rounded-full filter blur-3xl opacity-30"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-red-500 font-mono text-sm mb-2 inline-block">Contact</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg">
            Have a project in mind or want to discuss potential opportunities? I'm always open to new ideas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-white mb-6 relative inline-block">
                <span className="relative z-10">Contact Information</span>
                <span className="absolute bottom-0 left-0 w-full h-1.5 bg-red-500/30 -z-0 -mb-1"></span>
              </h3>
              <p className="text-gray-400">Feel free to reach out through any of these platforms:</p>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <a 
                href="mailto:your.email@example.com" 
                className="flex items-start group"
              >
                <div className="shrink-0 bg-red-900/30 p-3 rounded-full border border-red-900/50 group-hover:bg-red-500/20 group-hover:border-red-500/50 transition-colors">
                  <FiMail className="h-5 w-5 text-red-400 group-hover:text-red-300 transition-colors" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-400 text-sm uppercase tracking-wider">Email</p>
                  <p className="text-white group-hover:text-red-400 transition-colors">your.email@example.com</p>
                </div>
              </a>
              
              {/* Location */}
              <div className="flex items-start">
                <div className="shrink-0 bg-gray-800/50 p-3 rounded-full border border-gray-700/50">
                  <FiMapPin className="h-5 w-5 text-gray-400" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-400 text-sm uppercase tracking-wider">Location</p>
                  <p className="text-white">Your Location</p>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="pt-4">
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">Connect with me</p>
                <div className="flex space-x-4">
                  <a 
                    href="https://github.com/yourusername" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:bg-red-500/10 hover:border-red-500/30 hover:text-white transition-all"
                    aria-label="GitHub"
                  >
                    <FiGithub className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://linkedin.com/in/yourusername" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-white transition-all"
                    aria-label="LinkedIn"
                  >
                    <FiLinkedin className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://twitter.com/yourusername" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:bg-sky-500/10 hover:border-sky-500/30 hover:text-white transition-all"
                    aria-label="Twitter"
                  >
                    <FiTwitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gray-800/50 p-8 rounded-2xl shadow-xl border border-gray-700/50 backdrop-blur-sm"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-2">Send Me a Message</h3>
              <p className="text-gray-400">I'll get back to you as soon as possible</p>
            </div>
            
            {submitStatus && (
              <div className={`p-4 mb-6 rounded-lg ${
                submitStatus.success 
                  ? 'bg-green-900/30 border border-green-800/50 text-green-300' 
                  : 'bg-red-900/30 border border-red-800/50 text-red-300'
              }`}>
                {submitStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent focus:outline-none transition-all"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent focus:outline-none transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1.5">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent focus:outline-none transition-all resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-red-900/20'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;