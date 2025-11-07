import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

type Heart = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rot: number;
  scale: number;
  dur: number;
  color: string;
  size: number;
};

type Sparkle = { id: number; x: number; y: number; dx: number; dy: number; dur: number; size: number };

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const Steps: React.FC = () => {
  const steps = [
    'Sudden surprise by showing up where I am right now',
    'Silently sit beside me',
    'Motivate me: I got this!!',
    'Treat me to my favorite Place/Snack/Coffee',
    'And I am yours again 💖',
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const spawnBurst = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    const cx = rect ? e.clientX - rect.left : 60;
    const cy = rect ? e.clientY - rect.top : 40;

    // spawn multiple hearts with different trajectories
    const newHearts: Heart[] = Array.from({ length: 6 }).map(() => {
      const id = Date.now() + Math.floor(Math.random() * 100000);
      const angle = rand(-0.8, 0.2); // radians bias upward
      const distance = rand(80, 220);
      const dx = Math.cos(angle) * distance * rand(0.6, 1.2);
      const dy = Math.sin(angle) * -distance * rand(0.6, 1.2); // negative to go up
      const rot = rand(-40, 60);
      const scale = rand(0.9, 1.4);
      const dur = Math.floor(rand(900, 1700));
      const hue = Math.floor(rand(330, 360));
      const color = `hsl(${hue} 86% 64%)`;
      const size = Math.floor(rand(18, 38));
      return { id, x: cx, y: cy, dx, dy, rot, scale, dur, color, size };
    });

    // sparkles
    const newSparkles: Sparkle[] = Array.from({ length: 8 }).map(() => {
      const id = Date.now() + Math.floor(Math.random() * 100000);
      const dx = rand(-60, 140);
      const dy = rand(-20, -140);
      const dur = Math.floor(rand(600, 1200));
      const size = Math.floor(rand(4, 9));
      return { id, x: cx, y: cy, dx, dy, dur, size };
    });

    setHearts((s) => [...s, ...newHearts]);
    setSparkles((s) => [...s, ...newSparkles]);

    // cleanup after longest animation
    const longest = Math.max(...newHearts.map((h) => h.dur), ...newSparkles.map((sp) => sp.dur));
    window.setTimeout(() => {
      setHearts((s) => s.filter((h) => !newHearts.find((nh) => nh.id === h.id)));
      setSparkles((s) => s.filter((sp) => !newSparkles.find((nsp) => nsp.id === sp.id)));
    }, longest + 300);
  };

  return (
    <div className="mp-card" ref={containerRef}>
      <h2 className="mp-title">Steps to Win Me Back</h2>
      <ol className="mp-list">
        {steps.map((s, i) => (
          <li key={i} className="mp-list-item">{s}</li>
        ))}
      </ol>

      <div className="mp-actions">
        <Link to="/" className="mp-btn">Back</Link>
        <button className="mp-btn primary" onClick={spawnBurst}>Click to get my Love</button>
      </div>

      {/* flying hearts overlay */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="flying-heart fancy"
          style={{
            left: h.x - h.size / 2 + 'px',
            top: h.y - h.size / 2 + 'px',
            // set css variables for animation path and appearance
            ['--tx' as any]: `${h.dx}px`,
            ['--ty' as any]: `${h.dy}px`,
            ['--rot' as any]: `${h.rot}deg`,
            ['--scale' as any]: `${h.scale}`,
            ['--dur' as any]: `${h.dur}ms`,
            ['--color' as any]: h.color,
            ['--size' as any]: `${h.size}px`,
          }}
          aria-hidden
        >
          ❤️
        </span>
      ))}

      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle"
          style={{
            left: s.x + 'px',
            top: s.y + 'px',
            ['--dx' as any]: `${s.dx}px`,
            ['--dy' as any]: `${s.dy}px`,
            ['--dur' as any]: `${s.dur}ms`,
            ['--size' as any]: `${s.size}px`,
          }}
          aria-hidden
        />
      ))}
    </div>
  );
};

export default Steps;
