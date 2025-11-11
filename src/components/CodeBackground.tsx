'use client';

import { TypeAnimation } from 'react-type-animation';
import { useEffect, useState } from 'react';

const CodeBackground = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to trigger the animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const codeSnippets = [
    'const portfolio = {\n  name: "Your Name",\n  role: "Full Stack Developer",\n  skills: ["JavaScript", "React", "Node.js", "TypeScript"],\n  experience: 3\n};',
    'function Project({ title, description }) {\n  return (\n    <div className="project">\n      <h3>{title}</h3>\n      <p>{description}</p>\n    </div>\n  );\n}',
    'const skills = [\n  { name: "React", level: 90 },\n  { name: "Node.js", level: 85 },\n  { name: "TypeScript", level: 80 },\n  { name: "CSS/Tailwind", level: 90 }\n];',
    'const contact = {\n  email: "your.email@example.com",\n  github: "github.com/username",\n  linkedin: "linkedin.com/in/username"\n};',
  ];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-linear-to-br from-red-900/30 to-black/80 backdrop-blur-sm"></div>
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="w-full max-w-3xl">
          <div className="bg-black/90 border border-red-900/50 rounded-lg p-6 font-mono text-sm text-red-400 overflow-hidden shadow-2xl">
            <div className="flex space-x-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-600"></div>
              <div className="w-3 h-3 rounded-full bg-red-800"></div>
              <div className="w-3 h-3 rounded-full bg-red-900"></div>
            </div>
            <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <TypeAnimation
                sequence={[
                  codeSnippets[0],
                  2000,
                  codeSnippets[1],
                  2000,
                  codeSnippets[2],
                  2000,
                  codeSnippets[3],
                  2000,
                ]}
                speed={75}
                style={{ whiteSpace: 'pre-line' }}
                repeat={Infinity}
                className="whitespace-pre"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBackground;
