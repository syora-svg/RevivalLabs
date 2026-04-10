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
        <div className="flex items-center justify-between h-[64px]">

          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center group">
            <svg width="140" height="42" viewBox="0 0 500 150" xmlns="http://www.w3.org/2000/svg" className="transition-opacity duration-200 group-hover:opacity-80">
              <defs>
                <linearGradient id="rlGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e3a8a"/>
                  <stop offset="100%" stopColor="#38bdf8"/>
                </linearGradient>
              </defs>
              <g transform="translate(10,20)">
                <path d="M20 100 L20 10 L70 10 Q100 10 100 40 Q100 70 70 70 L40 70 L100 120 L60 120 L20 80 Z" fill="url(#rlGradient)"/>
                <path d="M80 120 Q140 90 140 50 Q140 20 110 10 L130 10 Q170 20 170 60 Q170 110 90 130 Z" fill="#38bdf8"/>
              </g>
              <text x="200" y="85" fontFamily="Arial, Helvetica, sans-serif" fontSize="42" fill="#111111">Revival</text>
              <text x="360" y="85" fontFamily="Arial, Helvetica, sans-serif" fontSize="42" fill="#38bdf8">Labs</text>
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
