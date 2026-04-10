import { useEffect, useRef, useState } from 'react';

interface Options {
  threshold?: number;
  rootMargin?: string;
}

export const useScrollAnimation = <T extends HTMLElement = HTMLElement>(
  options: Options = {}
): [React.RefObject<T>, boolean] => {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (noMotion) {
      el.classList.add('animate-visible');
      setVisible(true);
      return;
    }

    el.classList.add('animate-hidden');

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('animate-hidden');
          el.classList.add('animate-visible');
          setVisible(true);
        } else {
          el.classList.remove('animate-visible');
          el.classList.add('animate-hidden');
          setVisible(false);
        }
      },
      {
        threshold: options.threshold ?? 0.1,
        rootMargin: options.rootMargin ?? '0px 0px -8% 0px',
      }
    );

    io.observe(el);
    return () => io.unobserve(el);
  }, [options.threshold, options.rootMargin]);

  return [ref, visible];
};
