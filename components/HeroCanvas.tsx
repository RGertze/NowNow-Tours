import React, { useRef, useEffect, useState, useCallback } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
  hue: number;
}

interface HeroCanvasProps {
  className?: string;
}

/**
 * Lightweight interactive canvas component for the Hero section
 * Creates ambient floating particles with subtle mouse interaction
 * Automatically falls back to static gradient for reduced motion users
 */
const HeroCanvas: React.FC<HeroCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isCanvasSupported, setIsCanvasSupported] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Particle configuration
  const config = {
    particleCount: prefersReducedMotion ? 0 : 50,
    maxParticleSize: 4,
    minParticleSize: 1,
    particleSpeed: 0.5,
    mouseInfluence: 80,
    colors: {
      sky: [199, 89, 48], // HSL for sky-600
      orange: [25, 95, 53], // HSL for orange-500
    },
  };

  // Initialize particles
  const initParticles = useCallback((width: number, height: number) => {
    if (prefersReducedMotion || !width || !height) return [];
    
    const particles: Particle[] = [];
    
    for (let i = 0; i < config.particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * config.particleSpeed,
        vy: (Math.random() - 0.5) * config.particleSpeed,
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 100,
        size: config.minParticleSize + Math.random() * (config.maxParticleSize - config.minParticleSize),
        opacity: 0.3 + Math.random() * 0.4,
        hue: Math.random() > 0.7 ? 25 : 199, // Orange or sky blue hue
      });
    }
    
    return particles;
  }, [prefersReducedMotion, config.particleCount, config.particleSpeed, config.minParticleSize, config.maxParticleSize]);

  // Update particle positions and properties
  const updateParticles = useCallback((particles: Particle[], width: number, height: number, mouseX: number, mouseY: number) => {
    particles.forEach((particle) => {
      // Age the particle
      particle.life += 1;
      
      // Reset particle if it's too old
      if (particle.life > particle.maxLife) {
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
        particle.life = 0;
        particle.maxLife = 100 + Math.random() * 100;
        particle.opacity = 0.3 + Math.random() * 0.4;
      }
      
      // Mouse interaction - subtle attraction
      const dx = mouseX - particle.x;
      const dy = mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < config.mouseInfluence) {
        const force = (1 - distance / config.mouseInfluence) * 0.02;
        particle.vx += dx * force;
        particle.vy += dy * force;
      }
      
      // Apply some dampening
      particle.vx *= 0.99;
      particle.vy *= 0.99;
      
      // Move particle
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Boundary conditions - wrap around
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;
      
      // Pulse opacity based on life
      const lifeCycle = particle.life / particle.maxLife;
      particle.opacity = 0.2 + 0.3 * Math.sin(lifeCycle * Math.PI);
    });
  }, [config.mouseInfluence]);

  // Render particles to canvas
  const render = useCallback((canvas: HTMLCanvasElement, particles: Particle[]) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas with subtle gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'hsla(204, 100%, 97%, 0.1)'); // sky-50 with low opacity
    gradient.addColorStop(1, 'hsla(33, 100%, 96%, 0.1)'); // orange-50 with low opacity
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Render particles
    particles.forEach((particle) => {
      ctx.save();
      
      // Set particle color and opacity
      const saturation = particle.hue === 25 ? 95 : 89;
      const lightness = particle.hue === 25 ? 53 : 48;
      ctx.fillStyle = `hsla(${particle.hue}, ${saturation}%, ${lightness}%, ${particle.opacity})`;
      
      // Draw particle as a soft circle
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size
      );
      gradient.addColorStop(0, `hsla(${particle.hue}, ${saturation}%, ${lightness}%, ${particle.opacity})`);
      gradient.addColorStop(1, `hsla(${particle.hue}, ${saturation}%, ${lightness}%, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    });
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;
    
    const { width, height } = dimensions;
    if (width === 0 || height === 0) return;
    
    updateParticles(particlesRef.current, width, height, mouseRef.current.x, mouseRef.current.y);
    render(canvas, particlesRef.current);
    
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [prefersReducedMotion, dimensions, updateParticles, render]);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const container = canvas.parentElement;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      // Set canvas size with device pixel ratio for crisp rendering
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
      
      setDimensions({ width, height });
      
      // Reinitialize particles with new dimensions
      if (!prefersReducedMotion) {
        particlesRef.current = initParticles(width, height);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [prefersReducedMotion, initParticles]);

  // Start animation
  useEffect(() => {
    if (prefersReducedMotion || dimensions.width === 0) return;
    
    // Check canvas support
    const canvas = canvasRef.current;
    if (!canvas || !canvas.getContext) {
      setIsCanvasSupported(false);
      return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsCanvasSupported(false);
      return;
    }
    
    // Initialize particles
    particlesRef.current = initParticles(dimensions.width, dimensions.height);
    
    // Start animation loop
    animate();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [prefersReducedMotion, dimensions, initParticles, animate]);

  // Fallback for reduced motion or unsupported canvas
  if (prefersReducedMotion || !isCanvasSupported) {
    return (
      <div className={`canvas-fallback absolute inset-0 ${className}`} />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ 
        mixBlendMode: 'overlay',
        opacity: 0.6,
      }}
      aria-hidden="true"
    />
  );
};

export default HeroCanvas;