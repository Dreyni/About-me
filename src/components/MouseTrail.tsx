import { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  age: number;
  maxAge: number;
}

const TRAIL_LENGTH = 28;
const MAX_AGE = 28;
const GLOW_RADIUS = 18;
const COLORS = {
  inner: 'rgba(129, 140, 248,',
  outer: 'rgba(139, 92, 246,',
};

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<TrailPoint[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      const last = pointsRef.current[pointsRef.current.length - 1];
      if (last) {
        const dx = e.clientX - last.x;
        const dy = e.clientY - last.y;
        if (dx * dx + dy * dy < 9) return;
      }

      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
        maxAge: MAX_AGE,
      });

      if (pointsRef.current.length > TRAIL_LENGTH) {
        pointsRef.current.shift();
      }
    };

    window.addEventListener('mousemove', onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pointsRef.current = pointsRef.current
        .map((p) => ({ ...p, age: p.age + 1 }))
        .filter((p) => p.age < p.maxAge);

      for (let i = 0; i < pointsRef.current.length; i++) {
        const p = pointsRef.current[i];
        const life = 1 - p.age / p.maxAge;
        const posRatio = i / Math.max(pointsRef.current.length - 1, 1);

        const radius = GLOW_RADIUS * life * (0.4 + posRatio * 0.6);
        const innerAlpha = life * 0.55 * posRatio;
        const outerAlpha = 0;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        grad.addColorStop(0, `${COLORS.inner} ${innerAlpha})`);
        grad.addColorStop(0.5, `${COLORS.outer} ${innerAlpha * 0.4})`);
        grad.addColorStop(1, `${COLORS.outer} ${outerAlpha})`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'screen',
      }}
    />
  );
}
