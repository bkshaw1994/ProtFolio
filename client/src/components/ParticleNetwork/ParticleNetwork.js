import React, { useEffect, useRef } from 'react';

const ParticleNetwork = React.memo(() => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle settings
    const particleCount = Math.min(Math.floor((width * height) / 18000), 65);
    const maxDistance = 120;
    const mouseRadius = 150;

    const particles = [];
    const mouse = { x: null, y: null };

    const createParticle = () => ({
      x: Math.random() * width, // NOSONAR - safe for non-security UI canvas animation
      y: Math.random() * height, // NOSONAR - safe for non-security UI canvas animation
      vx: (Math.random() - 0.5) * 0.8, // NOSONAR - safe for non-security UI canvas animation
      vy: (Math.random() - 0.5) * 0.8, // NOSONAR - safe for non-security UI canvas animation
      radius: Math.random() * 1.5 + 1.2 // NOSONAR - safe for non-security UI canvas animation
    });

    const updateParticle = (p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    };

    const drawParticle = (p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(2, 132, 199, 0.6)';
      ctx.fill();
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    canvas.parentElement.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect particles with web lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        updateParticle(p1);
        drawParticle(p1);

        // Connect to mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p1.x;
          const dy = mouse.y - p1.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseRadius) {
            const alpha = (1 - dist / mouseRadius) * 0.45;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Connect to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas.parentElement) {
        canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
        canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-60"
    />
  );
});

export default ParticleNetwork;
