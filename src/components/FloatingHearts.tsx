import React, { useEffect, useRef } from 'react';

interface FloatingHeartsProps {
  isDarkMode: boolean;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  maxOpacity: number;
  rotation: number;
  rotationSpeed: number;
  type: 'heart' | 'petal';
  color: string;
}

export const FloatingHearts: React.FC<FloatingHeartsProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    // Keep count gentle and subtle - about 18 particles across full screen
    const particleCount = Math.min(22, Math.floor(width / 60));

    const colorsLight = [
      'rgba(244, 63, 94, ',   // rose-500
      'rgba(251, 113, 133, ', // rose-400
      'rgba(249, 168, 212, ', // pink-300
      'rgba(254, 205, 211, ', // rose-200
    ];

    const colorsDark = [
      'rgba(251, 113, 133, ', // rose-400
      'rgba(244, 63, 94, ',   // rose-500
      'rgba(225, 29, 72, ',   // rose-600
      'rgba(253, 164, 175, ', // rose-300
    ];

    for (let i = 0; i < particleCount; i++) {
      const palette = isDarkMode ? colorsDark : colorsLight;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 10 + Math.random() * 12,
        speedY: 0.35 + Math.random() * 0.45,
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.3,
        maxOpacity: 0.2 + Math.random() * 0.35,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        type: Math.random() > 0.4 ? 'heart' : 'petal',
        color: palette[Math.floor(Math.random() * palette.length)],
      });
    }

    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number,
      rotation: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.fillStyle = `${color}${opacity})`;
      context.beginPath();
      const topCurveHeight = size * 0.3;
      context.moveTo(0, topCurveHeight);
      // Top left curve
      context.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      // Bottom left curve
      context.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, (size + topCurveHeight) / 1.4, 0, size);
      // Bottom right curve
      context.bezierCurveTo(0, (size + topCurveHeight) / 1.4, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      // Top right curve
      context.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      context.closePath();
      context.fill();
      context.restore();
    };

    const drawPetal = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number,
      rotation: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.fillStyle = `${color}${opacity * 0.8})`;
      context.beginPath();
      context.ellipse(0, 0, size * 0.35, size * 0.7, 0, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.speedY;
        p.x += Math.sin(p.y * 0.005) * 0.5 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.opacity < p.maxOpacity) {
          p.opacity += 0.005;
        }

        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
          p.opacity = 0;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        } else {
          drawPetal(ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDarkMode]);

  return (
    <canvas
      id="floating-hearts-canvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
