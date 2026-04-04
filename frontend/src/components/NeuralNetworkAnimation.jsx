import { useEffect, useRef, useState } from 'react';

/**
 * NeuralNetworkAnimation — Canvas-based neural net visualization
 * with witty rotating messages during video processing.
 */

// Witty processing messages
const MESSAGES = [
  '> feeding pixels to the neural cortex...',
  '> our AI is squinting really hard at your footage...',
  '> cross-referencing suspicious activity patterns...',
  '> channeling our inner CSI "enhance"...',
  '> teaching neurons to be paranoid so you don\'t have to...',
  '> running 47 billion matrix multiplications (give or take)...',
  '> decoding shadows and silhouettes...',
  '> scanning for unauthorized loiterers...',
  '> asking the neural network nicely to cooperate...',
  '> converting caffeine into threat assessments...',
];

export default function NeuralNetworkAnimation() {
  const canvasRef = useRef(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  // Rotate messages every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % MESSAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect for current message
  useEffect(() => {
    const message = MESSAGES[messageIndex];
    let charIndex = 0;
    setDisplayedText('');

    const typeInterval = setInterval(() => {
      if (charIndex <= message.length) {
        setDisplayedText(message.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 40);

    return () => clearInterval(typeInterval);
  }, [messageIndex]);

  // Canvas neural network animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;

    // Define neural network layers
    const layers = [4, 6, 8, 6, 4, 2]; // node counts per layer
    const nodes = [];
    const connections = [];
    const particles = [];

    // Create nodes
    const layerSpacing = W / (layers.length + 1);
    layers.forEach((count, layerIdx) => {
      const x = layerSpacing * (layerIdx + 1);
      const nodeSpacing = H / (count + 1);
      for (let i = 0; i < count; i++) {
        const y = nodeSpacing * (i + 1);
        nodes.push({
          x, y,
          layer: layerIdx,
          radius: 3,
          pulse: Math.random() * Math.PI * 2,
          active: false,
        });
      }
    });

    // Create connections between adjacent layers
    let nodeOffset = 0;
    for (let l = 0; l < layers.length - 1; l++) {
      const currentLayerStart = nodeOffset;
      const currentLayerEnd = nodeOffset + layers[l];
      const nextLayerStart = currentLayerEnd;
      const nextLayerEnd = nextLayerStart + layers[l + 1];

      for (let i = currentLayerStart; i < currentLayerEnd; i++) {
        for (let j = nextLayerStart; j < nextLayerEnd; j++) {
          connections.push({
            from: i,
            to: j,
            opacity: 0.08 + Math.random() * 0.07,
          });
        }
      }
      nodeOffset += layers[l];
    }

    // Spawn traveling particles
    const spawnParticle = () => {
      // Pick a random connection
      const conn = connections[Math.floor(Math.random() * connections.length)];
      const fromNode = nodes[conn.from];
      const toNode = nodes[conn.to];
      particles.push({
        x: fromNode.x,
        y: fromNode.y,
        targetX: toNode.x,
        targetY: toNode.y,
        progress: 0,
        speed: 0.008 + Math.random() * 0.012,
        connIdx: connections.indexOf(conn),
      });
    };

    let animFrame;
    let tick = 0;

    const animate = () => {
      ctx.clearRect(0, 0, W, H);

      tick++;

      // Spawn particles periodically
      if (tick % 8 === 0) {
        spawnParticle();
      }

      // Draw connections
      connections.forEach(conn => {
        const from = nodes[conn.from];
        const to = nodes[conn.to];
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = `rgba(0, 255, 65, ${conn.opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Draw and update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          // Activate target node briefly
          const conn = connections[p.connIdx];
          if (conn) nodes[conn.to].active = true;
          particles.splice(i, 1);
          continue;
        }

        // Lerp position
        p.x = p.x + (p.targetX - p.x) * p.speed * 3;
        p.y = p.y + (p.targetY - p.y) * p.speed * 3;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#00ff41';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00ff41';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw nodes
      nodes.forEach(node => {
        node.pulse += 0.03;
        const pulseR = node.radius + Math.sin(node.pulse) * 1;

        // Glow ring for active nodes
        if (node.active) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseR + 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 255, 65, 0.15)';
          ctx.fill();
          // Deactivate after drawing
          node.active = false;
        }

        // Node dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseR, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 65, 0.7)';
        ctx.fill();

        // Inner bright dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = '#00ff41';
        ctx.fill();
      });

      animFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <div className="border border-neon-border rounded-xl p-8 text-center bg-black relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-30"></div>

      {/* Terminal-style header */}
      <div className="flex items-center gap-2 mb-4 text-xs text-neon-dim border-b border-neon-border pb-3">
        <span className="w-2 h-2 rounded-full bg-hacker-red"></span>
        <span className="w-2 h-2 rounded-full bg-hacker-yellow"></span>
        <span className="w-2 h-2 rounded-full bg-neon-green"></span>
        <span className="ml-2 text-neon-dim">neural_network_v2.exe — PROCESSING</span>
      </div>

      {/* Canvas */}
      <div className="w-full h-48 mb-6 relative">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Pulsing title */}
      <h3 className="text-xl font-bold text-neon-green text-glow-green mb-3 animate-pulse">
        NEURAL NETWORK ACTIVE
      </h3>

      {/* Typewriter message */}
      <div className="h-6 flex items-center justify-center">
        <p className="text-sm text-neon-dim font-mono">
          {displayedText}
          <span className="animate-pulse">█</span>
        </p>
      </div>

      {/* Progress indicator */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-neon-dark">
        <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
        <span>Processing frames at 2 FPS</span>
      </div>
    </div>
  );
}
