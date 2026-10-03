import { useEffect, useRef } from 'react';

export function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    window.addEventListener('resize', handleResize);

    // iPadOS Pure Liquid Chromatic Fluid Orbs
    const blobs = [
      { x: width * 0.15, y: height * 0.2, r: 380, vx: 0.35, vy: 0.22, color: 'rgba(6, 182, 212, 0.24)' }, // vibrant cyan
      { x: width * 0.8, y: height * 0.3, r: 420, vx: -0.28, vy: 0.25, color: 'rgba(59, 130, 246, 0.22)' }, // deep sapphire
      { x: width * 0.45, y: height * 0.7, r: 390, vx: 0.24, vy: -0.3, color: 'rgba(129, 140, 248, 0.20)' }, // indigo fluid
      { x: width * 0.85, y: height * 0.85, r: 340, vx: -0.2, vy: -0.22, color: 'rgba(14, 165, 233, 0.18)' }, // sky blue
      { x: width * 0.3, y: height * 0.9, r: 320, vx: 0.18, vy: -0.15, color: 'rgba(168, 85, 247, 0.15)' }, // violet sheen
    ];

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render drifting chromatic liquid orbs
      for (const blob of blobs) {
        blob.x += blob.vx;
        blob.y += blob.vy;

        if (blob.x - blob.r < 0 || blob.x + blob.r > width) blob.vx *= -1;
        if (blob.y - blob.r < 0 || blob.y + blob.r > height) blob.vy *= -1;

        const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r);
        grad.addColorStop(0, blob.color);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Subtle dynamic mouse-tracking liquid highlight
      const mouseGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 320);
      mouseGrad.addColorStop(0, 'rgba(56, 189, 248, 0.06)');
      mouseGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = mouseGrad;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 320, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Canvas with liquid blobs */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />

      {/* Futuristic subtle grid layer */}
      <div 
        className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]"
      />

      {/* Subtle vignette for high-end cinematic immersion */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_transparent_50%,_#05070D_95%)]" />
    </div>
  );
}
