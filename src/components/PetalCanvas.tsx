import React, { useEffect, useRef } from 'react';

interface PetalCanvasProps {
  density?: number;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  color: string;
  opacity: number;
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeSpeed: number;
  maxOpacity: number;
}

export const PetalCanvas: React.FC<PetalCanvasProps> = ({ density = 30 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Rose petal color palette (luxury wine, blush, rose burgundy)
    const petalColors = [
      'rgba(100, 21, 45, 0.75)',   // Wine Red
      'rgba(126, 27, 56, 0.75)',   // Wine Light
      'rgba(168, 50, 78, 0.65)',   // Deep Rose
      'rgba(244, 220, 226, 0.55)',  // Soft Blush
      'rgba(214, 183, 121, 0.45)',  // Champagne Gold Accent
    ];

    // Create Petals
    const petals: Petal[] = Array.from({ length: density }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 12 + 10,
      speedY: Math.random() * 1.2 + 0.8,
      speedX: Math.random() * 0.8 - 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      flip: Math.random() * Math.PI,
      flipSpeed: Math.random() * 0.03 + 0.01,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      opacity: Math.random() * 0.5 + 0.5,
    }));

    // Create Golden Sparkles / Dust
    const sparkles: Sparkle[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speedY: -(Math.random() * 0.5 + 0.2), // float upwards
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.8,
      fadeSpeed: (Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      maxOpacity: Math.random() * 0.7 + 0.3,
    }));

    // Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Golden Sparkles
      sparkles.forEach((s) => {
        s.y += s.speedY;
        s.x += s.speedX;
        s.opacity += s.fadeSpeed;

        if (s.opacity > s.maxOpacity || s.opacity < 0.1) {
          s.fadeSpeed = -s.fadeSpeed;
        }

        if (s.y < 0) s.y = height;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;

        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(214, 183, 121, ${Math.max(0, s.opacity)})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(214, 183, 121, 0.8)';
        ctx.fill();
        ctx.restore();
      });

      // Render Falling Rose Petals
      petals.forEach((p) => {
        // Natural swaying motion
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.flip) * 0.6;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        // Mouse gentle wind repulsion
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 3;
          p.y += (dy / dist) * force * 3;
        }

        // Reset if offscreen bottom
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        // Draw organic petal shape
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.scale(1, Math.cos(p.flip));

        ctx.beginPath();
        // Heart-curved organic petal path
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size, p.size / 3, 0, p.size);
        ctx.bezierCurveTo(p.size, p.size / 3, p.size / 2, -p.size / 2, 0, 0);

        ctx.fillStyle = p.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      style={{ mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  );
};
