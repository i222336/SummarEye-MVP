import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg pointer-events-none"></div>

      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-20"></div>

      {/* Subtle green glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-neon-green/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 text-center px-6">
        {/* Terminal prompt style title */}
        <div className="mb-8">
          <div className="text-xs text-neon-dim mb-4 tracking-widest uppercase">
            {'>'} system.initialize()
          </div>

          <h1 className="text-6xl font-bold text-neon-green text-glow-green tracking-tight mb-2">
            Summar<span className="text-white">Eye</span>
          </h1>

          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></span>
            <span className="text-sm text-neon-dim tracking-wider">.ai // SURVEILLANCE INTELLIGENCE</span>
          </div>
        </div>

        <p className="text-neon-dim text-base max-w-xl leading-relaxed mb-12">
          Upload your CCTV footage. Let the neural network scan every frame.
          <br />
          Get a smart event timeline — <span className="text-neon-green">instantly</span>.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="group relative px-8 py-3 border-2 border-neon-green text-neon-green font-bold text-sm uppercase tracking-wider rounded hover:bg-neon-green hover:text-black transition-all duration-300 glow-green"
          >
            <span className="relative z-10">{'>'} Open Dashboard</span>
          </Link>

          <Link
            to="/upload"
            className="px-8 py-3 border border-neon-border text-neon-dim font-medium text-sm uppercase tracking-wider rounded hover:border-neon-green hover:text-neon-green transition-all duration-300"
          >
            Upload Footage
          </Link>
        </div>

        {/* Decorative terminal output */}
        <div className="mt-16 text-left bg-neon-panel border border-neon-border rounded-lg p-4 max-w-md w-full">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-neon-border">
            <span className="w-2 h-2 rounded-full bg-hacker-red"></span>
            <span className="w-2 h-2 rounded-full bg-hacker-yellow"></span>
            <span className="w-2 h-2 rounded-full bg-neon-green"></span>
            <span className="ml-2 text-[10px] text-neon-dark">summareye@terminal:~</span>
          </div>
          <div className="text-[11px] text-neon-dim space-y-1 font-mono">
            <p><span className="text-neon-green">$</span> loading yolov8n.pt .............. <span className="text-neon-green">OK</span></p>
            <p><span className="text-neon-green">$</span> loading weapon_model.pt ......... <span className="text-neon-green">OK</span></p>
            <p><span className="text-neon-green">$</span> detection engine ready</p>
            <p><span className="text-neon-green">$</span> awaiting surveillance feed<span className="animate-pulse">█</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
