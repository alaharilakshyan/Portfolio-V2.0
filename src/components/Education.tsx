"use client";

import { FaGraduationCap } from 'react-icons/fa';

const Education = () => {
  // Education data
  const education = [
    {
      id: 1,
      degree: 'B.Tech in Computer Science',
      institution: 'Your University',
      year: '2021 - Present',
      description: 'Currently pursuing degree with focus on web development and software engineering.'
    },
    {
      id: 2,
      degree: 'Higher Secondary (12th)',
      institution: 'Your College',
      year: '2019 - 2021',
      description: 'Completed with Computer Science as main subject.'
    }
  ];

  return (
    <section id="education" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Education</h2>
          <div className="w-20 h-1 bg-red-500 mx-auto"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          {education.map((edu) => (
            <div key={edu.id} className="mb-8 relative pl-8 border-l-2 border-gray-700">
              <div className="absolute -left-2.5 top-0 w-4 h-4 rounded-full bg-red-500"></div>
              <div className="flex items-center mb-2">
                <FaGraduationCap className="text-red-500 mr-2" />
                <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
              </div>
              <div className="text-gray-400 mb-2">{edu.institution} • {edu.year}</div>
              <p className="text-gray-300">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
