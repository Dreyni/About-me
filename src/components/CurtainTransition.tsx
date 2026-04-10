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
  // Staggered rise: each panel takes roughly 30% of scroll distance to reach top
  const end = offsetStart + 0.3;
  const y = useTransform(scrollYProgress, [offsetStart, Math.min(end, 1)], ["100%", "0%"]);

  return (
    <motion.div
      className={styles.panel}
      style={{
        y,
        left: `${index * 20}%`,
        width: "20.5%" // Tiny overlap to prevent pixel gaps
      }}
    />
  );
};

export const CurtainTransition = ({ children, id }: CurtainTransitionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Offset ["start end", "end end"] means tracking from when 
  // the container starts entering the viewport until it covers it.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Balanced "Mountain" offsets: center (index 2) leads.
  // Pattern: [0.1, 0.05, 0, 0.05, 0.1]
  const offsets = [0.08, 0.04, 0, 0.04, 0.08];

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
            opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]),
            y: useTransform(scrollYProgress, [0.1, 0.4], [50, 0])
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};
