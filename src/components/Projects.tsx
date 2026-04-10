import { ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
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

const Projects = () => {
  const [ref] = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="projects" className="section section-alt">
      <div className="wrap">
        <div ref={ref} className="scroll-animate">
          <div className="sh anim-child d1">
            <h2 className="sh-title">
              Featured <span className="sh-accent">Projects</span>
            </h2>
            <div className="sh-line" />
            <p className="sh-sub">
              Real-world systems built from concept to deployment — backend, frontend, and
              everything in between.
            </p>
          </div>

          <div className={`${styles.grid} anim-child d2`}>
            {PROJECTS.map((p) => (
              <div key={p.title} className={styles.card}>
                <div className={styles.bar} style={{ background: p.bar }} />
                <div className={styles.cardHead}>
                  <span className={styles.cat} style={p.catStyle}>
                    {p.category}
                  </span>
                </div>
                <h3 className={styles.title}>{p.title}</h3>
                <p className={styles.desc}>{p.desc}</p>
                <div className={styles.tech}>
                  {p.tech.map((t) => (
                    <span key={t} className={styles.chip}>
                      {t}
                    </span>
                  ))}
                </div>
                <button className={styles.viewBtn}>
                  View Project <ExternalLink size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
