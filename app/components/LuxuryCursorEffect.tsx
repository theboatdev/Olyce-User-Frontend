'use client';

import { useEffect, useRef } from 'react';

interface Props {
  text?: string;
  spacing?: number;
  color?: string;
}

export default function LuxuryCursorEffect({
  text = "DISCOVER SRI LANKA • ",
  spacing = 35,
  color = "rgba(255, 255, 255, 0.9)"
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let lastMousePos = { x: -1000, y: -1000 };
    let charIndex = 0;
    let fontLoaded = false;

    // Resize
    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Preload font
    const loadFont = async () => {
      if (document.fonts) {
        try {
          await document.fonts.load("52px 'Playfair Display'");
          fontLoaded = true;
        } catch {
          fontLoaded = true; // Fallback to system fonts
        }
      } else {
        fontLoaded = true;
      }
    };
    
    loadFont();

    // Particle
    class Particle {
      x: number;
      y: number;
      char: string;
      life: number;
      age: number;
      stickyFrames: number;
      vy: number;
      vx: number;
      scale: number;
      rotation: number;
      rotationSpeed: number;
      baseY: number;

      constructor(x: number, y: number, char: string) {
        this.x = x;
        this.y = y;
        this.baseY = y;
        this.char = char;
        this.life = 1.0;
        this.age = 0;
        this.stickyFrames = 45 + Math.random() * 25;
        this.vy = -0.5 - Math.random() * 0.7;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.scale = 0.85 + Math.random() * 0.3;
        this.rotation = (Math.random() - 0.5) * 0.25;
        this.rotationSpeed = (Math.random() - 0.5) * 0.015;
      }

      update() {
        this.age++;
        
        if (this.age > this.stickyFrames) {
          this.x += this.vx;
          this.y += this.vy;
          this.rotation += this.rotationSpeed;
          this.life -= 0.011;
          this.vy -= 0.01;
        } else {
          const floatOffset = Math.sin(this.age * 0.08) * 1.2;
          this.y = this.baseY + floatOffset;
          this.rotation = Math.sin(this.age * 0.05) * 0.08;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.life <= 0) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(this.scale, this.scale);

        // Color parsing
        const match = color.match(/(\d+),\s*(\d+),\s*(\d+)/);
        const fillColor = match 
          ? `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${this.life})`
          : `rgba(255, 255, 255, ${this.life})`;

        // Font - use system font immediately if custom font not loaded
        ctx.font = fontLoaded 
          ? "italic bold 52px 'Playfair Display', Georgia, serif"
          : "italic bold 52px Georgia, serif";
        ctx.fillStyle = fillColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Glow
        if (this.age < this.stickyFrames) {
          ctx.shadowColor = fillColor;
          ctx.shadowBlur = 20;
        } else {
          ctx.shadowBlur = 8;
          ctx.shadowColor = fillColor;
        }

        ctx.fillText(this.char, 0, 0);
        
        // Outline
        if (match) {
          ctx.strokeStyle = `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${this.life * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.strokeText(this.char, 0, 0);
        }
        
        ctx.restore();
      }
    }

    // Mouse handler
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const currentPos = { 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top 
      };
      
      const dx = currentPos.x - lastMousePos.x;
      const dy = currentPos.y - lastMousePos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > spacing) {
        particles.push(new Particle(currentPos.x, currentPos.y, text[charIndex]));
        charIndex = (charIndex + 1) % text.length;
        lastMousePos = currentPos;
        
        if (particles.length > 150) {
          particles = particles.slice(-150);
        }
      }
    };

    // Attach to window for full coverage
    window.addEventListener('mousemove', onMouseMove);

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.life <= 0) {
          particles.splice(i, 1);
        } else {
          p.draw(ctx);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [text, spacing, color]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
