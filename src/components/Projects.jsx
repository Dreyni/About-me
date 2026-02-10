import { ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Projects = () => {
  const [sectionRef] = useScrollAnimation();

  const projects = [
    {
      title: 'Hospital Information Management System',
      description: 'Designed and developed a system to manage patient records, hospital data, and administrative workflows. Focused on data organization, accuracy, and efficient information retrieval to support hospital operations.',
      techStack: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
      category: 'Healthcare System',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Payroll Management System',
      description: 'Built a system to automate payroll computation, employee records, and reporting. Improved efficiency and reduced manual errors through structured data processing.',
      techStack: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'XAMPP'],
      category: 'Enterprise Solution',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'PeakFit – A Data-Driven Platform for Personalized Fitness',
      description: 'Developed a personalized fitness application tailored to individual users, tracking performance and health-related data to support data-driven insights, personalized progress monitoring, and informed decision-making.',
      techStack: ['React Native', 'Expo', 'TypeScript', 'PHP', 'MySQL', 'REST API', 'React Navigation', 'Chart Kit', 'WebSocket'],
      category: 'Capstone Thesis Project',
      gradient: 'from-green-500 to-emerald-500',
      featured: true
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-dark-card transition-colors duration-300">
      <div ref={sectionRef} className="max-w-6xl mx-auto scroll-animate">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Featured <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Real-world applications demonstrating system development, data management, and problem-solving skills
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl p-6 hover:border-accent-primary transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent-primary/20 scroll-animate-delay-${index + 1} ${
                project.featured ? 'md:col-span-2 lg:col-span-3' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${project.gradient} text-white`}>
                  {project.category}
                </span>
                {project.featured && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                    ⭐ Featured
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-accent-primary transition-colors">
                {project.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.techStack.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-xs px-3 py-1 bg-gray-100 dark:bg-dark-card border border-accent-primary/30 text-accent-primary rounded-md hover:bg-accent-primary/10 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center text-sm text-gray-500 dark:text-gray-500 group-hover:text-accent-primary transition-colors">
                <span>View details</span>
                <ExternalLink size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            All projects focused on <span className="text-accent-primary">data accuracy</span>, 
            <span className="text-accent-secondary"> efficient workflows</span>, and 
            <span className="text-accent-primary"> user-centered design</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
