import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import styles from './FloatingObject.module.css';

/* ─── Config ─── */
const MOUSE_SENSITIVITY = 0.08;
const SPRING_CONFIG = { damping: 20, stiffness: 120, mass: 0.8 };
const AUTO_ROTATE_SPEED = 0.18;

export default function FloatingObject() {
  const containerRef = useRef<HTMLDivElement>(null);
  const autoRotateRef = useRef({ x: -15, y: 25 });
  const rafRef = useRef<number>(0);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  const [hovered, setHovered] = useState(false);

  const rotateX = useMotionValue(-15);
  const rotateY = useMotionValue(25);
  const springX = useSpring(rotateX, SPRING_CONFIG);
  const springY = useSpring(rotateY, SPRING_CONFIG);

  const translateX = useSpring(0, { damping: 30, stiffness: 80 });
  const translateY = useSpring(0, { damping: 30, stiffness: 80 });

  /* ─── Auto-rotation when idle ─── */
  useEffect(() => {
    const animate = () => {
      if (!isDragging.current && !hovered) {
        autoRotateRef.current.y += AUTO_ROTATE_SPEED;
        autoRotateRef.current.x = -15 + Math.sin(autoRotateRef.current.y * 0.02) * 8;
        rotateX.set(autoRotateRef.current.x);
        rotateY.set(autoRotateRef.current.y);
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [hovered, rotateX, rotateY]);

  /* ─── Mouse follow ─── */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * MOUSE_SENSITIVITY;
      const deltaY = (e.clientY - centerY) * MOUSE_SENSITIVITY;

      translateX.set(deltaX * 0.5);
      translateY.set(deltaY * 0.5);

      if (!isDragging.current) {
        autoRotateRef.current.x = -deltaY * 1.5;
        autoRotateRef.current.y += deltaX * 0.02;
        rotateX.set(autoRotateRef.current.x);
        rotateY.set(autoRotateRef.current.y);
      }
    },
    [translateX, translateY, rotateX, rotateY],
  );

  /* ─── Drag to rotate ─── */
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      lastMouse.current = { x: e.clientX, y: e.clientY };

      autoRotateRef.current.y += dx * 0.5;
      autoRotateRef.current.x -= dy * 0.5;
      rotateX.set(autoRotateRef.current.x);
      rotateY.set(autoRotateRef.current.y);
    },
    [rotateX, rotateY],
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    translateX.set(0);
    translateY.set(0);
  }, [translateX, translateY]);

  return (
    <div
      ref={containerRef}
      className={styles.wrapper}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient glow */}
      <div className={styles.ambientGlow} />

      <motion.div
        className={styles.scene}
        style={{
          x: translateX,
          y: translateY,
          rotateX: springX,
          rotateY: springY,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* ─── Cube faces ─── */}
        <div className={`${styles.face} ${styles.front}`} />
        <div className={`${styles.face} ${styles.back}`} />
        <div className={`${styles.face} ${styles.left}`} />
        <div className={`${styles.face} ${styles.right}`} />
        <div className={`${styles.face} ${styles.top}`} />
        <div className={`${styles.face} ${styles.bottom}`} />

        {/* Inner cube */}
        <div className={styles.innerCube}>
          <div className={`${styles.innerFace} ${styles.innerFront}`} />
          <div className={`${styles.innerFace} ${styles.innerBack}`} />
          <div className={`${styles.innerFace} ${styles.innerLeft}`} />
          <div className={`${styles.innerFace} ${styles.innerRight}`} />
          <div className={`${styles.innerFace} ${styles.innerTop}`} />
          <div className={`${styles.innerFace} ${styles.innerBottom}`} />
        </div>

        {/* Center glow */}
        <div className={styles.core} />
      </motion.div>

      {/* Orbital ring */}
      <div className={styles.ring} />

      {/* Floating particles around the cube */}
      <div className={styles.orbitParticle} style={{ animationDelay: '0s' }} />
      <div className={styles.orbitParticle} style={{ animationDelay: '-2s' }} />
      <div className={styles.orbitParticle} style={{ animationDelay: '-4s' }} />

      {/* Hint text */}
      <motion.span
        className={styles.hint}
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        drag to rotate
      </motion.span>
    </div>
  );
}
