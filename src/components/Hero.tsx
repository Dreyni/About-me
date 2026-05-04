import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import MouseTrail from './MouseTrail';
import FloatingObject from './FloatingObject';
import { ScrollReveal } from './ScrollReveal';
import { useTypingAnimation } from '../hooks/useTypingAnimation';
import { scrollTo } from '../utils/scrollTo';
import styles from './Hero.module.css';

/* ─── Typing animation ─── */
const TYPING_STRINGS = [
  'Full-Stack Developer',
  'Software Engineer',
  'Backend Systems Builder',
  'Mobile App Developer',
];

/* ─── Particle canvas ─── */
interface Particle {
  id: number; x: number; y: number;
  size: number; speedX: number; speedY: number;
  opacity: number; color: string;
}

function genParticles(): Particle[] {
  const colors = ['#0ea5e9', '#8b5cf6', '#22d3ee', '#a78bfa', '#67e8f9'];
  return Array.from({ length: 55 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    speedX: (Math.random() - 0.5) * 0.06,
    speedY: (Math.random() - 0.5) * 0.06,
    opacity: Math.random() * 0.5 + 0.15,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>(genParticles());
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      particlesRef.current = particlesRef.current.map((p) => {
        let nx = p.x + p.speedX,
          ny = p.y + p.speedY;
        if (nx < 0 || nx > 100) { p.speedX *= -1; nx = Math.max(0, Math.min(100, nx)); }
        if (ny < 0 || ny > 100) { p.speedY *= -1; ny = Math.max(0, Math.min(100, ny)); }
        return { ...p, x: nx, y: ny };
      });
      for (const p of particlesRef.current) {
        ctx.beginPath();
        ctx.arc((p.x / 100) * width, (p.y / 100) * height, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden />;
}

/* ─── Hero component ─── */
const Hero = () => {
  const typed = useTypingAnimation(TYPING_STRINGS);

  return (
    <section id="home" className={`${styles.hero} section-sticky`}>
      <MouseTrail />
      <ParticleCanvas />
      <div className={styles.gradients} aria-hidden />
      <div className={styles.gridOverlay} aria-hidden />

      <div className={styles.splitLayout}>
        <div className={styles.content}>
          <ScrollReveal>
            <h1 className={styles.name}>
              Andrei <span className="serif-italic">Capoon</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className={styles.typing}>
              <span>{typed}</span>
              <span className={styles.cursor} aria-hidden />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className={styles.desc}>
              Crafting digital experiences with <span className="serif-italic">precision</span> and <span className="serif-italic">purpose</span>. 
              Software Engineer specializing in scalable systems and refined user interfaces.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.5}>
          <FloatingObject />
        </ScrollReveal>
      </div>

      <motion.button
        className={styles.scrollBtn}
        onClick={() => scrollTo('about')}
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <ChevronDown size={30} />
      </motion.button>
    </section>
  );
};

export default Hero;
