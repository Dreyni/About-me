import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './Navigation.module.css';

const NAV_LINKS = [
  { label: 'Home',     id: 'home'     },
  { label: 'About',    id: 'about'    },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills',   id: 'skills'   },
  { label: 'Contact',  id: 'contact'  },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setOpen(false);
  };

  return (
    <>
      <nav className={`${styles.nav}${scrolled ? ' ' + styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <button className={styles.logo} onClick={() => goTo('home')}>
            AC.
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
      </nav>

      {open && (
        <div className={styles.mobile} role="menu">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              className={styles.mobileLink}
              onClick={() => goTo(id)}
              role="menuitem"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Navigation;
