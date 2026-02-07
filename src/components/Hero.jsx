import { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

/**
 * Hero Section Component
 * Professional introduction with staggered animations and modern design
 */
const Hero = () => {
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    const stages = [1, 2, 3, 4];
    const delays = [100, 300, 500, 700];
    const timeouts = [];

    stages.forEach((stage, index) => {
      const timeoutId = setTimeout(() => setAnimationStage(stage), delays[index]);
      timeouts.push(timeoutId);
    });

    return () => {
      timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100 overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.03)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(rgba(96,165,250,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.05)_1px,transparent_1px)]" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Name with stagger animation */}
        <div className={`transition-all duration-700 ${animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-2">
            <span className="text-gray-900 dark:text-white">Andrei </span>
            <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
              Capoon
            </span>
          </h1>
        </div>

        {/* Accent line */}
        <div className={`transition-all duration-700 delay-200 ${animationStage >= 2 ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}>
          <div className="w-24 h-1 mx-auto mb-6 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg shadow-primary/50" />
        </div>

        {/* Role with animation */}
        <div className={`transition-all duration-700 delay-300 ${animationStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xl md:text-2xl mb-6 text-gray-700 dark:text-gray-300 font-medium">
            Business Analytics Student & Aspiring Developer
          </p>
        </div>

        {/* Value proposition */}
        <div className={`transition-all duration-700 delay-500 ${animationStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Blending analytical thinking with modern development. Building systems that solve
            real-world problems through clean code and thoughtful design.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className={`transition-all duration-700 delay-700 ${animationStage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex gap-4 justify-center mb-12">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 border-2 border-gray-300 dark:border-dark-border hover:border-primary dark:hover:border-primary text-gray-700 dark:text-gray-300 rounded-lg transition-all hover:scale-105 hover:shadow-lg"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 border-2 border-gray-300 dark:border-dark-border hover:border-primary dark:hover:border-primary text-gray-700 dark:text-gray-300 rounded-lg transition-all hover:scale-105 hover:shadow-lg"
            >
              Get in Touch
            </button>
          </div>

          {/* Social links */}
          <div className="flex gap-6 justify-center text-gray-700 dark:text-gray-300">
            <a
              href="https://github.com/Dreyni"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-all hover:scale-110"
              aria-label="GitHub Profile"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/andrei-capoon-7961a33a7/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-all hover:scale-110"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:delosreyesdrei25@gmail.com"
              className="hover:text-primary transition-all hover:scale-110"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-gray-700 dark:text-gray-400" size={32} />
      </div>
    </section>
  );
};

export default Hero;
