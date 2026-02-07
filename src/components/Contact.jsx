import { useEffect, useState } from 'react';
import { Mail, Github, Linkedin, Phone, MapPin, X } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * Contact Section Component
 * Professional contact information with social links
 * Design: Clean, minimal layout with hover effects
 */
const Contact = () => {
  const [showMap, setShowMap] = useState(false);
  const [sectionRef] = useScrollAnimation();

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showMap) {
        setShowMap(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showMap]);

  const contactInfo = [
    {
      id: 'email',
      icon: Mail,
      label: 'Email',
      value: 'delosreyesdrei25@gmail.com',
      link: 'mailto:delosreyesdrei25@gmail.com',
      color: 'text-red-400'
    },
    {
      id: 'phone',
      icon: Phone,
      label: 'Phone',
      value: '+63 926 622 2011',
      link: 'tel:+639266222011',
      color: 'text-green-400'
    },
    {
      id: 'location',
      icon: MapPin,
      label: 'Location',
      value: 'Matabungkay, Lian, Batangas',
      link: null,
      color: 'text-blue-400',
      isMap: true
    }
  ];

  const socialLinks = [
    {
      id: 'github',
      icon: Github,
      name: 'GitHub',
      url: 'https://github.com/Dreyni',
      color: 'hover:text-gray-400'
    },
    {
      id: 'linkedin',
      icon: Linkedin,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/andrei-capoon-7961a33a7/',
      color: 'hover:text-blue-500'
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-dark-card transition-colors duration-300">
      <div ref={sectionRef} className="max-w-4xl mx-auto scroll-animate">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Contacts <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent"></span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Open to internship opportunities and professional connections. Let&apos;s discuss how I can contribute to your team.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary mx-auto rounded-full mt-4"></div>
        </div>

        {/* Contact Information */}
        <div className="bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl p-8 mb-8 transition-colors duration-300">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((item) => {
              const IconComponent = item.icon;
              const content = (
                <>
                  <div className={`${item.color} bg-gray-100 dark:bg-dark-card p-3 rounded-lg mb-3 inline-block`}>
                    <IconComponent size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{item.label}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.value}</p>
                </>
              );

              const handleClick = () => {
                if (item.isMap) {
                  setShowMap(true);
                } else if (item.link) {
                  window.location.href = item.link;
                }
              };

              const handleKeyDown = (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClick();
                }
              };

              return (
                <div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  className="text-center p-6 bg-gray-50 dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border hover:border-accent-primary transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={handleClick}
                  onKeyDown={handleKeyDown}
                  aria-label={`${item.label}: ${item.value}`}
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>

        {/* Map Modal Popup */}
        {showMap && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowMap(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="map-modal-title"
          >
            <div 
              className="bg-dark-card border border-accent-primary rounded-xl overflow-hidden max-w-4xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowMap(false)}
                className="absolute top-4 right-4 z-10 bg-dark-bg border border-accent-primary text-accent-primary p-2 rounded-lg hover:bg-accent-primary hover:text-white transition-all"
                aria-label="Close map"
              >
                <X size={24} />
              </button>
              
              {/* Map Header */}
              <div className="bg-dark-bg border-b border-dark-border p-4">
                <h3 id="map-modal-title" className="text-xl font-bold text-white flex items-center gap-2">
                  <MapPin className="text-accent-primary" aria-hidden="true" />
                  My Location - Matabungkay, Lian, Batangas
                </h3>
              </div>
              
              {/* Embedded Map */}
              <iframe
                src="https://www.google.com/maps?q=13.951028,120.624028&z=15&output=embed"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Andrei Capoon Location - Matabungkay, Lian, Batangas"
              ></iframe>
            </div>
          </div>
        )}

        {/* Social Links */}
        <div className="text-center mb-8">
          <p className="text-gray-600 dark:text-gray-400 mb-6">Connect with me on:</p>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group bg-gray-100 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-lg p-4 transition-all duration-300 hover:scale-110 hover:border-accent-primary ${social.color}`}
                  aria-label={social.name}
                >
                  <IconComponent size={28} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/20 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Ready to Collaborate?</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            I&apos;m actively seeking internship opportunities where I can apply my skills and grow professionally.
          </p>
          <a
            href="mailto:delosreyesdrei25@gmail.com"
            className="inline-block px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-primary/50"
          >
            Send Me an Email
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
