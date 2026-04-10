'use client';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); };

  const links = [['Services', 'services'], ['Demo', 'demo'], ['Pricing', 'get-started']];

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm shadow-black/5 border-b border-slate-100/80' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-[60px]">

          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-md shadow-violet-300/40 group-hover:shadow-violet-400/60 transition-shadow">
              <span className="text-white font-black text-[10px]">RL</span>
            </div>
            <span className="text-slate-900 font-bold text-[15px] tracking-tight">
              Revival<span className="gradient-text">Labs.ai</span>
            </span>
          </button>

          {/* Pill nav — desktop */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/80 rounded-full px-1.5 py-1">
            {links.map(([label, id]) => (
              <button key={id} onClick={() => go(id)}
                className="text-slate-500 hover:text-slate-900 hover:bg-white text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200">
                {label}
              </button>
            ))}
          </div>

          {/* CTAs — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => go('contact')}
              className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">
              Contact
            </button>
            <button onClick={() => go('demo')} className="btn-primary text-sm py-2 px-5">
              Try Demo
            </button>
          </div>

          {/* Hamburger */}
          <button className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 transition-colors" onClick={() => setOpen(!open)}>
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 bg-slate-700 rounded transition-all ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-0.5 bg-slate-700 rounded transition-all ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-slate-700 rounded transition-all ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-64' : 'max-h-0'}`}>
        <div className="bg-white/95 backdrop-blur-xl border-b border-slate-100 px-5 py-4 space-y-1">
          {links.map(([label, id]) => (
            <button key={id} onClick={() => go(id)}
              className="block w-full text-left text-slate-600 hover:text-slate-900 text-sm font-medium py-2.5 px-3 rounded-xl hover:bg-slate-50 transition-colors">
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
