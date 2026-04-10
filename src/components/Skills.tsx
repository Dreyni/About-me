import { Brain, Code2, Database, Wrench, Cpu, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import styles from './Skills.module.css';

interface SkillCat {
  icon: LucideIcon;
  title: string;
  color: string;
  bg: string;
  skills: string[];
}

const CATS: SkillCat[] = [
  {
    icon: Code2,
    title: 'Programming & Dev',
    color: '#818cf8',
    bg: 'rgba(99,102,241,0.1)',
    skills: ['PHP', 'JavaScript', 'TypeScript (Basic)', 'Node.js (Basic)'],
  },
  {
    icon: Cpu,
    title: 'Frontend',
    color: '#38bdf8',
    bg: 'rgba(56,189,248,0.1)',
    skills: ['HTML5', 'CSS3', 'React Native', 'Expo'],
  },
  {
    icon: Database,
    title: 'Backend & Database',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.1)',
    skills: ['MySQL', 'REST API Development', 'CRUD Operations', 'Database Design'],
  },
  {
    icon: Brain,
    title: 'AI-Assisted Dev',
    color: '#c084fc',
    bg: 'rgba(192,132,252,0.1)',
    skills: [
      'Prompt Engineering',
      'GitHub Copilot',
      'OpenAI Codex',
      'MCP Protocol',
      'AI-assisted Debugging',
    ],
  },
  {
    icon: Wrench,
    title: 'Tools & Workflow',
    color: '#fb923c',
    bg: 'rgba(251,146,60,0.1)',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'XAMPP'],
  },
  {
    icon: Users,
    title: 'Soft Skills',
    color: '#f472b6',
    bg: 'rgba(244,114,182,0.1)',
    skills: [
      'Problem-Solving',
      'Communication',
      'Teamwork',
      'Adaptability',
      'Fast Learner',
      'Attention to Detail',
    ],
  },
];

const Skills = () => {
  const [ref] = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="skills" className="section">
      <div className="wrap">
        <div ref={ref} className="scroll-animate">
          <div className="sh anim-child d1">
            <h2 className="sh-title">
              Technical <span className="sh-accent">Skills</span>
            </h2>
            <div className="sh-line" />
            <p className="sh-sub">
              A practical toolkit for building full-stack applications and shipping real software.
            </p>
          </div>

          <div className={styles.grid}>
            {CATS.map((cat, i) => {
              const Icon = cat.icon;
              const delay = `d${Math.min(i + 2, 7)}`;
              return (
                <div key={cat.title} className={`${styles.card} anim-child ${delay}`}>
                  <div className={styles.head}>
                    <span
                      className={styles.iconWrap}
                      style={{ background: cat.bg, color: cat.color }}
                    >
                      <Icon size={20} />
                    </span>
                    <h3 className={styles.title}>{cat.title}</h3>
                  </div>
                  <ul className={styles.list}>
                    {cat.skills.map((s) => (
                      <li key={s} className={styles.item}>
                        <span className={styles.dot} style={{ background: cat.color }} />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
