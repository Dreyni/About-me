import { useRef, useState, MouseEvent } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, MapPin, Code2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import styles from './About.module.css';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState('');

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const r = imgRef.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    setTilt(
      `perspective(600px) rotateX(${(y / r.height) * -8}deg) rotateY(${(x / r.width) * 8}deg) scale(1.02)`
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
    <section ref={sectionRef} className={styles.section}>
      <div className="wrap">
        <div className={styles.container}>
          <div className={styles.contentGrid}>
            <div className={styles.profileColumn}>
              <ScrollReveal delay={0.1}>
                <div
                  ref={imgRef}
                  className={styles.profileWrap}
                  onMouseMove={onMove}
                  onMouseLeave={onLeave}
                >
                  <img
                    src="/profile.jpg"
                    alt="Andrei Capoon"
                    className={styles.profileImg}
                    style={{ transform: tilt }}
                  />
                  <div className={styles.nameOverlay}>
                    <h2 className={styles.overlayName}>Andrei <span className="serif-italic">Capoon</span></h2>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className={styles.infoColumn}>
              <div className={styles.bentoHeader}>
                <ScrollReveal>
                  <h3 className={styles.subhead}>About <span className="serif-italic">Me</span></h3>
                </ScrollReveal>
              </div>

              <div className={styles.statsBento}>
                {stats.map(({ icon: Icon, label, value, sub }, i) => (
                  <ScrollReveal key={label} delay={0.2 + i * 0.1}>
                    <div className={styles.statBox}>
                      <div className={styles.boxHeader}>
                        <Icon size={20} className={styles.statIcon} />
                        <span className={styles.statLabel}>{label}</span>
                      </div>
                      <p className={styles.statValue}>{value}</p>
                      <p className={styles.statSub}>{sub}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={0.5}>
                <div className={styles.bioText}>
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
                    drawn to backend architecture and REST API design.
                  </p>
                  <p>
                    I integrate <strong>AI-assisted development tools</strong> into my workflow to write
                    cleaner, faster, and smarter code. Currently seeking internship opportunities.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
