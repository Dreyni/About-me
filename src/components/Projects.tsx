import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import styles from './Projects.module.css';

interface Project {
  title: string;
  category: string;
  desc: string;
  tech: string[];
  bar: string;
  catStyle: { background: string; color: string };
}

const PROJECTS: Project[] = [
  {
    title: 'PeakFit – Fitness Platform',
    category: 'Capstone Project',
    desc: 'A full-stack mobile and web fitness platform with personalized workout tracking, trainer-client interaction, real-time data insights, and a REST API-driven backend architecture.',
    tech: ['React Native', 'Expo', 'TypeScript', 'PHP', 'MySQL', 'REST API', 'WebSocket'],
    bar: 'linear-gradient(90deg, #10b981, #34d399)',
    catStyle: { background: 'rgba(16,185,129,0.12)', color: '#34d399' },
  },
  {
    title: 'Hospital Information Management System',
    category: 'Healthcare System',
    desc: 'A complete hospital management system for patient records, staff workflows, and administrative data with efficient backend logic and relational database design.',
    tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    bar: 'linear-gradient(90deg, #6366f1, #818cf8)',
    catStyle: { background: 'rgba(99,102,241,0.12)', color: '#818cf8' },
  },
  {
    title: 'Payroll Management System',
    category: 'Enterprise System',
    desc: 'A payroll automation system handling salary computation, employee records, deductions, and report generation — reducing manual work and improving data accuracy.',
    tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'XAMPP'],
    bar: 'linear-gradient(90deg, #a78bfa, #c084fc)',
    catStyle: { background: 'rgba(167,139,250,0.12)', color: '#c084fc' },
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div ref={cardRef} className={styles.card} style={{ y }}>
        <div className={styles.bar} style={{ background: project.bar }} />
        <div className={styles.cardHead}>
          <span className={styles.cat} style={project.catStyle}>
            {project.category}
          </span>
        </div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.desc}>{project.desc}</p>
        <div className={styles.tech}>
          {project.tech.map((t) => (
            <span key={t} className={styles.chip}>
              {t}
            </span>
          ))}
        </div>
        <button className={styles.viewBtn}>
          View Project <ExternalLink size={13} />
        </button>
      </motion.div>
    </ScrollReveal>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="section section-light">
      <div className="wrap">
        <div>
          <ScrollReveal>
            <div className="sh">
              <h2 className="sh-title">
                Featured <span className="serif-italic">Work</span>
              </h2>
              <p className="sh-sub">
                Engineering solutions for complex problems — from <span className="serif-italic">architecture</span> to <span className="serif-italic">interface</span>.
              </p>
            </div>
          </ScrollReveal>

          <div className={styles.grid}>
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
