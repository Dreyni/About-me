import { Heart } from 'lucide-react';

/**
 * Footer Component
 * Simple footer with copyright and attribution
 * Design: Minimal, centered, subtle
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-dark-bg border-t border-gray-200 dark:border-dark-border py-8 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
          &copy; {currentYear} Andrei Capoon. All rights reserved.
        </p>
        <p className="text-gray-500 dark:text-gray-500 text-xs flex items-center justify-center gap-1">
          Built with <Heart size={14} className="text-red-500 fill-red-500" /> using React & Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
