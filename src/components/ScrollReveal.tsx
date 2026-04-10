import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  stagger?: number;
  delay?: number;
}

export const ScrollReveal = ({ children, width = "fit-content", stagger = 0.05, delay = 0 }: ScrollRevealProps) => {
  return (
    <div style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ 
          duration: 0.8, 
          ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for "mechanical" feel
          delay,
          staggerChildren: stagger 
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
