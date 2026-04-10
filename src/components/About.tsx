import { useRef, useState, MouseEvent } from 'react';
import { GraduationCap, MapPin, Code2 } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import styles from './About.module.css';

const About = () => {
  const [ref] = useScrollAnimation<HTMLDivElement>();
  const imgRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState('');

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const r = imgRef.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    setTilt(
      `perspective(600px) rotateX(${(y / r.height) * -28}deg) rotateY(${(x / r.width) * 28}deg) scale(1.06)`
    );
  };
  const onLeave = () => setTilt('');

  const stats = [
    {
      icon: GraduationCap,
      label: 'Degree',
      value: 'BSIT — Business Analytics',
      sub: 'Batangas State University · 2023–2026',
    },
    {
      icon: Code2,
      label: 'Focus',
      value: 'Full-Stack Engineering',
      sub: 'Web · Mobile · REST APIs',
    },
    {
      icon: MapPin,
      label: 'Based',
      value: 'Lian, Batangas, PH',
      sub: 'Open to remote & on-site',
    },
  ];

  return (
    <section id="about" className="section">
      <div className="wrap">
        <div ref={ref} className="scroll-animate">
          {/* Section header */}
          <div className="sh anim-child d1">
            <h2 className="sh-title">
              About <span className="sh-accent">Me</span>
            </h2>
            <div className="sh-line" />
          </div>

          <div className={`${styles.card} anim-child d2`}>
            {/* Profile image */}
            <div
              ref={imgRef}
              className={styles.profileWrap}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
            >
              <div className={styles.profileGlow} />
              <img
                src="/profile.jpg"
                alt="Andrei Capoon"
                className={styles.profileImg}
                style={{ transform: tilt }}
              />
            </div>

            {/* Stat cards */}
            <div className={styles.stats}>
              {stats.map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className={styles.stat}>
                  <Icon size={22} className={styles.statIcon} />
                  <div>
                    <p className={styles.statLabel}>{label}</p>
                    <p className={styles.statValue}>{value}</p>
                    <p className={styles.statSub}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bio */}
            <div className={styles.bio}>
              <p>
                I&apos;m a third-year{' '}
                <strong>Bachelor of Science in Information Technology</strong> student majoring
                in Business Analytics at Batangas State University. My core focus is{' '}
                <strong>full-stack software engineering</strong> — building functional,
                complete systems from the ground up.
              </p>
              <p>
                I develop web and mobile applications using{' '}
                <strong>PHP, JavaScript, MySQL,</strong> and <strong>React Native</strong>. I&apos;m
                drawn to backend architecture, REST API design, and end-to-end application
                development that solves real-world problems.
              </p>
              <p>
                I integrate <strong>AI-assisted development tools</strong> — including GitHub
                Copilot, OpenAI Codex, and MCP integrations — into my workflow to write
                cleaner, faster, and smarter code.
              </p>
              <p>
                Currently preparing for <strong>internship opportunities</strong> where I can
                contribute to real engineering teams, work on production-grade systems, and
                continue growing as a software developer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
