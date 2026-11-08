import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  rotation: number;
  rotSpeed: number;
  type: 'heart' | 'sparkle' | 'petal';
  color: string;
}

export const ClickHeartParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];

    const colors = [
      '#D6B779', // Champagne Gold
      '#F4DCE2', // Soft Blush
      '#64152D', // Wine Red
      '#caa05d', // Gold Dark
      '#ff758c', // Rose Pink
    ];

    const spawnParticles = (clientX: number, clientY: number) => {
      const count = Math.floor(Math.random() * 4) + 6;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.8 + 1.2;
        const types: ('heart' | 'sparkle' | 'petal')[] = ['heart', 'sparkle', 'petal'];
        const chosenType = types[Math.floor(Math.random() * types.length)];

        particles.push({
          x: clientX,
          y: clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2, // float upward
          size: Math.random() * 8 + 8,
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015,
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 6,
          type: chosenType,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      // Don't spawn if clicked inside admin inputs
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
      spawnParticles(e.clientX, e.clientY);
    };

    window.addEventListener('pointerdown', handlePointerDown);

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.04; // upward buoyant drift
        p.vx *= 0.96;
        p.rotation += p.rotSpeed;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.alpha);

        if (p.type === 'heart') {
          // Draw mini romantic heart
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          const s = p.size * 0.5;
          ctx.moveTo(0, s * 0.4);
          ctx.bezierCurveTo(-s * 0.6, -s * 0.3, -s * 0.8, -s * 0.9, -s * 0.3, -s * 1.1);
          ctx.bezierCurveTo(0, -s * 1.1, 0, -s * 0.7, 0, -s * 0.7);
          ctx.bezierCurveTo(0, -s * 0.7, 0, -s * 1.1, s * 0.3, -s * 1.1);
          ctx.bezierCurveTo(s * 0.8, -s * 0.9, s * 0.6, -s * 0.3, 0, s * 0.4);
          ctx.fill();
        } else if (p.type === 'sparkle') {
          // Draw four-point golden diamond star
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#D6B779';
          ctx.beginPath();
          const s = p.size * 0.6;
          ctx.moveTo(0, -s);
          ctx.quadraticCurveTo(0, 0, s, 0);
          ctx.quadraticCurveTo(0, 0, 0, s);
          ctx.quadraticCurveTo(0, 0, -s, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s);
          ctx.fill();
        } else {
          // Draw floating rose petal
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.4, p.size * 0.7, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      aria-hidden="true"
    />
  );
};

