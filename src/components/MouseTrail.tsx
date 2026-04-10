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
  inner: 'rgba(59, 130, 246,',
  outer: 'rgba(255, 255, 255,',
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
    const host = canvas.parentElement;
    if (!host) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        return;
      }

      const last = pointsRef.current[pointsRef.current.length - 1];
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        if (dx * dx + dy * dy < 9) return;
      }

      pointsRef.current.push({
        x,
        y,
        age: 0,
        maxAge: MAX_AGE,
      });

      if (pointsRef.current.length > TRAIL_LENGTH) {
        pointsRef.current.shift();
      }
    };

    const onLeave = () => {
      pointsRef.current = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    host.addEventListener('mousemove', onMove);
    host.addEventListener('mouseleave', onLeave);

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
      host.removeEventListener('mousemove', onMove);
      host.removeEventListener('mouseleave', onLeave);
      ro.disconnect();
    };
  }, []);

    return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
        mixBlendMode: 'screen',
      }}
    />
  );
}
