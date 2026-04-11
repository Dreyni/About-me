import { useRef, useState, MouseEvent } from 'react';

import { GraduationCap, MapPin, Code2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';

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
              <ScrollReveal>
                <div className="sh" style={{ textAlign: 'left', marginBottom: '24px' }}>
                  <h2 className="sh-title">About <span className="serif-italic">Me</span></h2>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2} width="100%">
                <div className={styles.swiperWrap}>
                  
                  <Swiper
                    loop={true}
                    initialSlide={6}
                    effect={'creative'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    creativeEffect={{
                      limitProgress: 3,
                      prev: {
                        translate: ['-130%', 0, -600],
                        rotate: [0, -65, 0],
                        opacity: 1,
                      },
                      next: {
                        translate: ['130%', 0, -600],
                        rotate: [0, 65, 0],
                        opacity: 1,
                      },
                    }}
                    modules={[EffectCreative]}
                    className={styles.swiper}
                  >
                    {[...stats, ...stats, ...stats, ...stats, ...stats, ...stats].map(({ icon: Icon, label, value, sub }, i) => (
                      <SwiperSlide key={`${label}-${i}`} className={styles.swiperSlide}>
                        {/* Static Stat Box */}
                        <div className={styles.statBox}>
                          <div className={styles.boxHeader}>
                            <Icon size={20} className={styles.statIcon} />
                            <span className={styles.statLabel}>{label}</span>
                          </div>
                          <p className={styles.statValue}>{value}</p>
                          <p className={styles.statSub}>{sub}</p>
                        </div>

                        {/* Embedded 3D Connector Arrow matching the wheel's rotation */}
                        <div className={styles.trackConnector}>
                          <svg width="80" height="80" viewBox="0 0 100 100" className={styles.sketchArrow}>
                            <path d="M 25,35 L 10,50 L 25,65 M 10,50 Q 50,30 90,50 M 75,35 L 90,50 L 75,65" fill="none" />
                          </svg>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </ScrollReveal>

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
    </section>
  );
};

export default About;
