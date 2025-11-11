"use client";

import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Work = () => {
  // Work experience data
  const workExperience = [
    {
      id: 1,
      role: 'Full Stack Developer',
      company: 'Tech Innovations Inc.',
      duration: '2021 - Present',
      location: 'Remote',
      description: 'Led the development of scalable web applications using modern technologies. Collaborated with cross-functional teams to deliver high-quality software solutions.',
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS']
    },
    {
      id: 2,
      role: 'Frontend Developer',
      company: 'Digital Creations',
      duration: '2019 - 2021',
      location: 'New York, NY',
      description: 'Developed responsive user interfaces and implemented interactive features. Worked closely with designers to ensure pixel-perfect implementation of UI/UX designs.',
      skills: ['React', 'Redux', 'JavaScript', 'SASS', 'Jest']
    },
    {
      id: 3,
      role: 'Web Developer Intern',
      company: 'StartUp Hub',
      duration: '2018 - 2019',
      location: 'San Francisco, CA',
      description: 'Assisted in developing and maintaining web applications. Gained experience in full-stack development and agile methodologies.',
      skills: ['HTML/CSS', 'JavaScript', 'jQuery', 'PHP', 'MySQL']
    }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="work" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Work Experience
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-red-500 mx-auto"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        <motion.div 
          className="max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {workExperience.map((exp, index) => (
            <motion.div 
              key={exp.id}
              className={`relative pl-8 pb-12 border-l-2 border-gray-700 ${index !== workExperience.length - 1 ? '' : 'pb-0'}`}
              variants={item}
            >
              <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                <FaBriefcase className="text-white text-xs" />
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-red-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-900/10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  <div className="flex items-center text-sm text-gray-400 mt-1 md:mt-0">
                    <FaCalendarAlt className="mr-2 text-red-500" />
                    <span>{exp.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-400 text-sm mb-4">
                  <span className="text-red-400 font-medium">{exp.company}</span>
                  <span className="mx-2">•</span>
                  <FaMapMarkerAlt className="text-red-500 mr-1" />
                  <span>{exp.location}</span>
                </div>
                
                <p className="text-gray-300 mb-4">{exp.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.skills.map((skill, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Work;
