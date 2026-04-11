import { useState, useEffect } from 'react';

export function useTypingAnimation(strings: string[], speed = 80, pause = 1800): string {
  const [displayed, setDisplayed] = useState('');
  const [strIndex, setStrIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[strIndex];
    if (!deleting && charIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && charIndex === 0) {
      setDeleting(false);
      setStrIndex((i) => (i + 1) % strings.length);
      return;
    }
    const t = setTimeout(
      () => {
        setCharIndex((i) => i + (deleting ? -1 : 1));
        setDisplayed(current.slice(0, charIndex + (deleting ? -1 : 1)));
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(t);
  }, [charIndex, deleting, strIndex, strings, speed, pause]);

  return displayed;
}
