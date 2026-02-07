import { Brain, Code2, Database, Wrench, Settings } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * Skills Section Component
 * Displays technical skills grouped by category
 * Design: Grid layout with icons and organized skill groups
 */
const Skills = () => {
  const [sectionRef] = useScrollAnimation();

  const skillCategories = [
    {
      title: 'AI & Analytics',
      icon: Brain,
      colorClass: 'text-purple-400',
      borderClass: 'border-purple-400/30',
      shadowClass: 'hover:shadow-purple-400/20',
      dotClass: 'bg-purple-400',
      skills: ['AI Prompt Engineering', 'Data Analysis Fundamentals', 'Data Visualization Concepts']
    },
    {
      title: 'Frontend',
      icon: Code2,
      colorClass: 'text-blue-400',
      borderClass: 'border-blue-400/30',
      shadowClass: 'hover:shadow-blue-400/20',
      dotClass: 'bg-blue-400',
      skills: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript']
    },
    {
      title: 'Backend',
      icon: Database,
      colorClass: 'text-green-400',
      borderClass: 'border-green-400/30',
      shadowClass: 'hover:shadow-green-400/20',
      dotClass: 'bg-green-400',
      skills: ['PHP', 'Node.js (Basic)', 'MySQL']
    },
    {
      title: 'Tools',
      icon: Wrench,
      colorClass: 'text-orange-400',
      borderClass: 'border-orange-400/30',
      shadowClass: 'hover:shadow-orange-400/20',
      dotClass: 'bg-orange-400',
      skills: ['Git', 'GitHub', 'VS Code', 'XAMPP', 'Postman']
    },
    {
      title: 'IT Support & Technical Operations',
      icon: Settings,
      colorClass: 'text-cyan-400',
      borderClass: 'border-cyan-400/30',
      shadowClass: 'hover:shadow-cyan-400/20',
      dotClass: 'bg-cyan-400',
      skills: ['IT Support (basic troubleshooting, user assistance, system setup)', 'Hardware Maintenance (PC assembly, diagnostics, peripheral setup, basic repairs)']
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-dark-bg transition-colors duration-300">
      <div ref={sectionRef} className="max-w-6xl mx-auto scroll-animate">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Technical <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit for building data-driven applications and solving real-world problems
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary mx-auto rounded-full mt-4"></div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={index}
                className={`bg-gray-50 dark:bg-dark-card border ${category.borderClass} rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-xl ${category.shadowClass} scroll-animate-delay-${(index % 6) + 1}`}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`${category.colorClass} bg-white dark:bg-dark-bg p-2 rounded-lg`}>
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{category.title}</h3>
                </div>

                {/* Skills List */}
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li
                      key={skillIndex}
                      className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-2 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${category.dotClass}`}></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Additional Context */}
        <div className="mt-12 bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-8 text-center">
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            Continuously expanding my technical expertise through hands-on projects and modern development practices. 
            <span className="block mt-2 text-accent-primary font-semibold">
              Eager to learn new technologies and adapt to industry standards
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
