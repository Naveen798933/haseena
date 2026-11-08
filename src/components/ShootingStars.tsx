import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export const ShootingStars: React.FC = () => {
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

    const stars: Star[] = [];

    const spawnStar = () => {
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.3; // ~45 deg angle
      stars.push({
        x: Math.random() * (width * 0.8),
        y: Math.random() * (height * 0.4),
        length: Math.random() * 80 + 70,
        speed: Math.random() * 10 + 12,
        angle,
        opacity: 0,
        life: 0,
        maxLife: Math.random() * 40 + 35,
      });
    };

    // Spawn shooting stars periodically
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        spawnStar();
      }
    }, 4500);

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = stars.length - 1; i >= 0; i--) {
        const star = stars[i];
        star.life++;
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        // Fade in and out
        if (star.life < 10) {
          star.opacity = star.life / 10;
        } else if (star.life > star.maxLife - 15) {
          star.opacity = (star.maxLife - star.life) / 15;
        }

        if (star.life >= star.maxLife) {
          stars.splice(i, 1);
          continue;
        }

        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y - Math.sin(star.angle) * star.length;

        const grad = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
        grad.addColorStop(0, 'rgba(214, 183, 121, 0)');
        grad.addColorStop(0.7, `rgba(214, 183, 121, ${Math.max(0, star.opacity * 0.4)})`);
        grad.addColorStop(1, `rgba(255, 248, 240, ${Math.max(0, star.opacity)})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(star.x, star.y);
        ctx.stroke();

        // Glowing star head
        ctx.fillStyle = `rgba(255, 248, 240, ${Math.max(0, star.opacity)})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#D6B779';
        ctx.beginPath();
        ctx.arc(star.x, star.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      style={{ mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  );
};
