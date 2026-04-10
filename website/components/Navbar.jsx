'use client';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); };

  const links = [['How It Works', 'timeline'], ['Demo', 'demo'], ['Get Started', 'get-started']];

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/90 backdrop-blur-xl border-b border-[#e8e4df]/80 shadow-sm shadow-black/4'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-[80px]">

          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center group">
            <svg width="400" height="100" viewBox="0 0 900 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-opacity duration-200 group-hover:opacity-80">
              <defs>
                <linearGradient id="navWaveGrad" x1="40" y1="180" x2="340" y2="20" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#1D4ED8"/>
                  <stop offset="55%" stopColor="#3B82F6"/>
                  <stop offset="100%" stopColor="#BFDBFE"/>
                </linearGradient>
                <linearGradient id="navTextGrad" x1="355" y1="150" x2="830" y2="70" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#0F172A"/>
                  <stop offset="55%" stopColor="#1E3A8A"/>
                  <stop offset="100%" stopColor="#60A5FA"/>
                </linearGradient>
                <style>{`
                  .nav-wave-bar {
                    fill: url(#navWaveGrad);
                    transform-box: fill-box;
                    transform-origin: center bottom;
                    opacity: 0;
                    animation: navRise 700ms cubic-bezier(.2,.8,.2,1) forwards;
                  }
                  .nav-brand-word {
                    fill: url(#navTextGrad);
                    font-family: Inter, Arial, Helvetica, sans-serif;
                    font-size: 76px;
                    font-weight: 800;
                    letter-spacing: -2.2px;
                    opacity: 0;
                    animation: navTextIn 700ms ease-out 220ms forwards;
                  }
                  .nav-wave-bar:nth-child(1)  { animation-delay: 0ms; }
                  .nav-wave-bar:nth-child(2)  { animation-delay: 40ms; }
                  .nav-wave-bar:nth-child(3)  { animation-delay: 80ms; }
                  .nav-wave-bar:nth-child(4)  { animation-delay: 120ms; }
                  .nav-wave-bar:nth-child(5)  { animation-delay: 160ms; }
                  .nav-wave-bar:nth-child(6)  { animation-delay: 200ms; }
                  .nav-wave-bar:nth-child(7)  { animation-delay: 240ms; }
                  .nav-wave-bar:nth-child(8)  { animation-delay: 280ms; }
                  .nav-wave-bar:nth-child(9)  { animation-delay: 320ms; }
                  .nav-wave-bar:nth-child(10) { animation-delay: 360ms; }
                  .nav-wave-bar:nth-child(11) { animation-delay: 400ms; }
                  .nav-wave-bar:nth-child(12) { animation-delay: 440ms; }
                  .nav-wave-bar:nth-child(13) { animation-delay: 480ms; }
                  @keyframes navRise {
                    0%   { opacity: 0; transform: scaleY(0.2); }
                    70%  { opacity: 1; transform: scaleY(1.05); }
                    100% { opacity: 1; transform: scaleY(1); }
                  }
                  @keyframes navTextIn {
                    0%   { opacity: 0; transform: translateY(6px); }
                    100% { opacity: 1; transform: translateY(0); }
                  }
                  @media (prefers-reduced-motion: reduce) {
                    .nav-wave-bar, .nav-brand-word { animation: none; opacity: 1; transform: none; }
                  }
                `}</style>
              </defs>
              <g transform="translate(32 34)">
                <rect className="nav-wave-bar" x="0"   y="96"  width="14" height="18"  rx="7"/>
                <rect className="nav-wave-bar" x="24"  y="78"  width="14" height="36"  rx="7"/>
                <rect className="nav-wave-bar" x="48"  y="52"  width="14" height="62"  rx="7"/>
                <rect className="nav-wave-bar" x="72"  y="24"  width="14" height="90"  rx="7"/>
                <rect className="nav-wave-bar" x="96"  y="44"  width="14" height="70"  rx="7"/>
                <rect className="nav-wave-bar" x="120" y="12"  width="14" height="102" rx="7"/>
                <rect className="nav-wave-bar" x="144" y="34"  width="14" height="80"  rx="7"/>
                <rect className="nav-wave-bar" x="168" y="18"  width="14" height="96"  rx="7"/>
                <rect className="nav-wave-bar" x="192" y="42"  width="14" height="72"  rx="7"/>
                <rect className="nav-wave-bar" x="216" y="62"  width="14" height="52"  rx="7"/>
                <rect className="nav-wave-bar" x="240" y="78"  width="14" height="36"  rx="7"/>
                <rect className="nav-wave-bar" x="264" y="92"  width="14" height="22"  rx="7"/>
                <rect className="nav-wave-bar" x="288" y="100" width="14" height="14"  rx="7"/>
              </g>
              <text x="360" y="140" className="nav-brand-word">Revival Labs</text>
            </svg>
          </button>

          {/* Pill nav — desktop */}
          <div className="hidden md:flex items-center gap-0.5 bg-[#f0ede9] rounded-full px-1.5 py-1">
            {links.map(([label, id]) => (
              <button key={id} onClick={() => go(id)}
                className="text-[#555] hover:text-[#111] hover:bg-white text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200">
                {label}
              </button>
            ))}
          </div>

          {/* CTAs — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => go('contact')}
              className="text-[#555] hover:text-[#111] text-sm font-medium transition-colors">
              Contact
            </button>
            <button onClick={() => go('demo')} className="btn-primary text-sm py-2 px-5">
              Try Demo
            </button>
          </div>

          {/* Hamburger */}
          <button className="md:hidden p-1.5 rounded-lg hover:bg-[#f0ede9] transition-colors" onClick={() => setOpen(!open)}>
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 bg-[#333] rounded transition-all ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-0.5 bg-[#333] rounded transition-all ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-[#333] rounded transition-all ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-72' : 'max-h-0'}`}>
        <div className="bg-white/95 backdrop-blur-xl border-b border-[#e8e4df] px-5 py-4 space-y-1">
          {links.map(([label, id]) => (
            <button key={id} onClick={() => go(id)}
              className="block w-full text-left text-[#555] hover:text-[#111] text-sm font-medium py-2.5 px-3 rounded-xl hover:bg-[#f5f3f0] transition-colors">
              {label}
            </button>
          ))}
          <div className="flex gap-2 pt-2">
            <button onClick={() => go('contact')} className="flex-1 btn-ghost text-sm py-2.5">Contact</button>
            <button onClick={() => go('demo')} className="flex-1 btn-primary text-sm py-2.5">Try Demo</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
