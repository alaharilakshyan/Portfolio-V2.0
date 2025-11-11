"use client";

import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Experience = () => {
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
  ];

  // Education data
  const education = [
    {
      id: 1,
      degree: 'Master of Computer Science',
      institution: 'Tech University',
      duration: '2017 - 2019',
      location: 'San Francisco, CA',
      description: 'Specialized in Artificial Intelligence and Machine Learning. Completed thesis on "Advanced Neural Networks for Computer Vision".',
      skills: ['Machine Learning', 'Deep Learning', 'Data Structures', 'Algorithms']
    },
    {
      id: 2,
      degree: 'Bachelor of Science in Computer Science',
      institution: 'State University',
      duration: '2013 - 2017',
      location: 'Boston, MA',
      description: 'Focused on software engineering principles and web development. Participated in various hackathons and coding competitions.',
      skills: ['Web Development', 'Database Systems', 'Software Engineering']
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

  const ExperienceCard = ({ exp, isEducation = false }: { exp: any, isEducation?: boolean }) => (
    <motion.div 
      className={`relative pl-8 pb-12 border-l-2 ${isEducation ? 'border-blue-500' : 'border-red-500'} last:pb-0`}
      variants={item}
    >
      <div className={`absolute -left-2.5 top-0 w-5 h-5 rounded-full ${isEducation ? 'bg-blue-500' : 'bg-red-500'} flex items-center justify-center`}>
        {isEducation ? (
          <FaGraduationCap className="text-white text-xs" />
        ) : (
          <FaBriefcase className="text-white text-xs" />
        )}
      </div>
      
      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-red-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-900/10">
        <div className="flex flex-col space-y-1 mb-3">
          <h3 className="text-xl font-bold text-white">
            {isEducation ? exp.degree : exp.role}
          </h3>
          <p className="text-gray-300">
            {isEducation ? exp.institution : exp.company}
          </p>
        </div>
        
        <div className="flex items-center text-sm text-gray-400 mb-4 space-x-4">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-1.5" />
            <span>{exp.duration}</span>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-1.5" />
            <span>{exp.location}</span>
          </div>
        </div>
        
        <p className="text-gray-300 mb-4">{exp.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {exp.skills.map((skill: string, index: number) => (
            <span 
              key={index}
              className="px-3 py-1 bg-gray-700/50 text-sm rounded-full text-gray-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="experience" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Experience & Education
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto rounded-full"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Work Experience Column */}
          <div>
            <motion.div 
              className="flex items-center mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-2 bg-red-500/20 rounded-lg">
                <FaBriefcase className="text-red-500 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-white ml-4">Work Experience</h3>
            </motion.div>
            
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative"
            >
              {workExperience.map((exp) => (
                <ExperienceCard key={exp.id} exp={exp} />
              ))}
            </motion.div>
          </div>

          {/* Education Column */}
          <div>
            <motion.div 
              className="flex items-center mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <FaGraduationCap className="text-blue-500 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-white ml-4">Education</h3>
            </motion.div>
            
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              {education.map((edu) => (
                <ExperienceCard key={edu.id} exp={edu} isEducation />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
