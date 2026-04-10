import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import styles from './CurtainTransition.module.css';

interface CurtainTransitionProps {
  children: ReactNode;
  id?: string;
}

interface CurtainPanelProps {
  index: number;
  offsetStart: number;
  scrollYProgress: MotionValue<number>;
}

const CurtainPanel = ({ index, offsetStart, scrollYProgress }: CurtainPanelProps) => {
  // Reveal should be complete when the section covers the viewport (0.5 progress)
  const end = 0.5 - offsetStart;
  const y = useTransform(scrollYProgress, [0, Math.max(end, 0.1)], ["100%", "0%"]);

  return (
    <motion.div
      className={styles.panel}
      style={{
        y,
        left: `${index * 20}%`,
        width: "21%"
      }}
    />
  );
};

export const CurtainTransition = ({ children, id }: CurtainTransitionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const offsets = [0.12, 0.06, 0, 0.06, 0.12];

  return (
    <div ref={containerRef} id={id} className={styles.container}>
      <div className={styles.stickyWrapper}>
        <div className={styles.curtain} aria-hidden>
          {offsets.map((offset, i) => (
            <CurtainPanel
              key={i}
              index={i}
              offsetStart={offset}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        <motion.div
          className={styles.content}
          style={{
            // Content matches panel reveal timing
            opacity: useTransform(scrollYProgress, [0.35, 0.5], [0, 1]),
            scale: useTransform(scrollYProgress, [0.35, 0.5], [0.98, 1])
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};
