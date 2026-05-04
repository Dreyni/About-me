import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { scrollTo } from '../utils/scrollTo';
import styles from './Navigation.module.css';

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  // Transitions: 
  // - Background opacity: 0 -> 0.9
  // - Border opacity: 0 -> 1
  // - Position (Y): 0 -> margin shift
  const navBg = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0)", "rgba(0, 0, 0, 0.8)"]);
  const navBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(12px)"]);
  const navBorder = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]);

  const goTo = (id: string) => {
    scrollTo(id);
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        className={styles.nav}
        style={{
          backgroundColor: navBg,
          backdropFilter: navBlur,
          borderBottom: "1px solid",
          borderColor: navBorder
        }}
      >
        <div className={styles.inner}>
          <button className={styles.logo} onClick={() => goTo('home')}>
            Andrei <span className="serif-italic">C.</span>
          </button>
          <ul className={styles.links} role="list">
            {NAV_LINKS.map(({ label, id }) => (
              <li key={id}>
                <button className={styles.link} onClick={() => goTo(id)}>
                  {label}
                </button>
              </li>
            ))}
          </ul>
          <button
            className={styles.hamburger}
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.mobile}
            role="menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {NAV_LINKS.map(({ label, id }, i) => (
              <motion.button
                key={id}
                className={styles.mobileLink}
                onClick={() => goTo(id)}
                role="menuitem"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                {label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
