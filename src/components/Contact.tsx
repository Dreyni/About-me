import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import styles from './Contact.module.css';

interface ContactItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string | null;
  iconColor: string;
  iconBg: string;
}

interface SocialItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

const Contact = () => {
  const [ref] = useScrollAnimation<HTMLDivElement>();

  const contacts: ContactItem[] = [
    {
      icon: Mail,
      label: 'Email',
      value: 'delosreyesdrei25@gmail.com',
      href: 'mailto:delosreyesdrei25@gmail.com',
      iconColor: '#f87171',
      iconBg: 'rgba(248,113,113,0.12)',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+63 926 622 2011',
      href: 'tel:+639266222011',
      iconColor: '#34d399',
      iconBg: 'rgba(52,211,153,0.12)',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Matabungkay, Lian, Batangas',
      href: null,
      iconColor: '#60a5fa',
      iconBg: 'rgba(96,165,250,0.12)',
    },
  ];

  const socials: SocialItem[] = [
    { icon: Github,   label: 'GitHub',   href: 'https://github.com/Dreyni' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrei-capoon-7961a33a7/' },
  ];

  const handleContact = (href: string | null) => {
    if (href) window.location.href = href;
  };

  return (
    <section id="contact" className="section section-alt">
      <div className="wrap">
        <div ref={ref} className="scroll-animate">
          {/* Header */}
          <div className="sh anim-child d1">
            <h2 className="sh-title">
              Get In <span className="sh-accent">Touch</span>
            </h2>
            <div className="sh-line" />
            <p className="sh-sub">
              Open to internship opportunities, project collaborations, and professional connections.
            </p>
          </div>

          {/* Contact cards */}
          <div className={`${styles.cards} anim-child d2`}>
            {contacts.map(({ icon: Icon, label, value, href, iconColor, iconBg }) => (
              <div
                key={label}
                className={`${styles.card}${href ? ' ' + styles.clickable : ''}`}
                onClick={() => handleContact(href)}
                onKeyDown={(e) => e.key === 'Enter' && handleContact(href)}
                role={href ? 'link' : undefined}
                tabIndex={href ? 0 : undefined}
                aria-label={href ? `${label}: ${value}` : undefined}
              >
                <span
                  className={styles.cardIcon}
                  style={{ color: iconColor, background: iconBg }}
                >
                  <Icon size={22} />
                </span>
                <div>
                  <p className={styles.cardLabel}>{label}</p>
                  <p className={styles.cardValue}>{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div className={`${styles.socials} anim-child d3`}>
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                className={styles.socialBtn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon size={20} />
                <span>{label}</span>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className={`${styles.cta} anim-child d4`}>
            <h3 className={styles.ctaTitle}>Ready to work together?</h3>
            <p className={styles.ctaDesc}>
              I&apos;m actively looking for internship opportunities where I can contribute to
              real engineering projects and grow as a software developer.
            </p>
            <a href="mailto:delosreyesdrei25@gmail.com" className={styles.ctaBtn}>
              Send Me an Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
