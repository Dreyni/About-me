import { Heart } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <p className={styles.copy}>&copy; {new Date().getFullYear()} Andrei Capoon. All rights reserved.</p>
    <p className={styles.built}>
      Built with <Heart size={13} className={styles.heart} /> using React &amp; CSS
    </p>
  </footer>
);

export default Footer;
