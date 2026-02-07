import { useRef, useState } from 'react';
import { GraduationCap, Sparkles, Code } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * About Me Section Component
 * Professional summary highlighting education, experience, and interests
 * Design: Clean card layout with subtle accents
 */
const About = () => {
  const [sectionRef] = useScrollAnimation();
  const profileRef = useRef(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e) => {
    if (!profileRef.current) return;
    
    const rect = profileRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const rotateX = (y / rect.height) * -40;
    const rotateY = (x / rect.width) * 40;
    
    setTransform(`perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.15)`);
  };

  const handleMouseLeave = () => {
    setTransform('');
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-dark-bg transition-colors duration-300">
      <div ref={sectionRef} className="max-w-5xl mx-auto scroll-animate">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            About <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary mx-auto rounded-full"></div>
        </div>

        {/* Content Card */}
        <div className="bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-8 sm:p-10 shadow-xl transition-colors duration-300">
          {/* Profile Photo */}
          <div className="flex justify-center mb-8">
            <div 
              ref={profileRef}
              className="relative group cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full blur opacity-75 group-hover:opacity-100 group-hover:blur-xl transition duration-500 group-hover:duration-300 animate-pulse"></div>
              <img
                src="/profile.jpg"
                alt="Andrei Capoon"
                className="relative w-32 h-32 rounded-full object-cover border-4 border-dark-bg transition-all duration-200 ease-out"
                style={{ transform: transform }}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Education Highlight */}
            <div className="text-center p-6 bg-white dark:bg-dark-bg rounded-lg border border-gray-200 dark:border-dark-border hover:border-accent-primary transition-colors duration-300">
              <GraduationCap className="w-10 h-10 mx-auto mb-3 text-accent-primary" />
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Education</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                BSIT Major in Business Analytics<br />
                Batangas State University<br />
                <span className="text-accent-secondary">2023–2026</span>
              </p>
            </div>

            {/* Focus Area */}
            <div className="text-center p-6 bg-white dark:bg-dark-bg rounded-lg border border-gray-200 dark:border-dark-border hover:border-accent-secondary transition-colors duration-300">
              <Code className="w-10 h-10 mx-auto mb-3 text-accent-secondary" />
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Development</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                System development<br />
                Data-driven applications<br />
                <span className="text-accent-primary">Full-stack projects</span>
              </p>
            </div>

            {/* Interest Area */}
            <div className="text-center p-6 bg-white dark:bg-dark-bg rounded-lg border border-gray-200 dark:border-dark-border hover:border-accent-primary transition-colors duration-300">
              <Sparkles className="w-10 h-10 mx-auto mb-3 text-accent-primary" />
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                AI-assisted solutions<br />
                Data visualization<br />
                <span className="text-accent-secondary">Modern tech</span>
              </p>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p className="text-lg">
              I am a <span className="text-accent-primary font-semibold">Bachelor of Science in Information Technology</span> student 
              majoring in <span className="text-accent-secondary font-semibold">Business Analytics</span> at Batangas State University – 
              ARASOF Nasugbu. My academic journey has equipped me with a strong foundation in both technical development and analytical thinking.
            </p>
            
            <p className="text-lg">
              Through various projects, I&apos;ve gained hands-on experience in <span className="text-accent-primary font-semibold">system development</span>, 
              building solutions that address real-world business needs. From hospital information systems to payroll automation, 
              I focus on creating efficient, data-driven applications that improve operational workflows.
            </p>
            
            <p className="text-lg">
              I&apos;m particularly interested in leveraging <span className="text-accent-secondary font-semibold">AI-assisted problem solving</span> and 
              modern development practices to create intelligent systems. Currently working on my capstone thesis project—a data-driven 
              fitness platform—I&apos;m eager to apply these skills in a professional internship environment where I can contribute meaningfully 
              while continuing to learn and grow.
            </p>
          </div>

          {/* Location Badge */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-dark-border">
            <p className="text-center text-gray-600 dark:text-gray-400">
              📍 <span className="text-gray-900 dark:text-gray-300">Lian, Batangas, Philippines</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
