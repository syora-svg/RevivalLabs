'use client';
import HIPAABadge from '@/components/HIPAABadge';

export default function Footer() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 py-14">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-10">

          {/* Brand */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center group">
            <svg width="140" height="42" viewBox="0 0 500 150" xmlns="http://www.w3.org/2000/svg" className="transition-opacity duration-200 group-hover:opacity-70">
              <defs>
                <linearGradient id="rlGradientFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e3a8a"/>
                  <stop offset="100%" stopColor="#38bdf8"/>
                </linearGradient>
              </defs>
              <g transform="translate(10,20)">
                <path d="M20 100 L20 10 L70 10 Q100 10 100 40 Q100 70 70 70 L40 70 L100 120 L60 120 L20 80 Z" fill="url(#rlGradientFooter)"/>
                <path d="M80 120 Q140 90 140 50 Q140 20 110 10 L130 10 Q170 20 170 60 Q170 110 90 130 Z" fill="#38bdf8"/>
              </g>
              <text x="200" y="85" fontFamily="Arial, Helvetica, sans-serif" fontSize="42" fill="#ffffff">Revival</text>
              <text x="360" y="85" fontFamily="Arial, Helvetica, sans-serif" fontSize="42" fill="#38bdf8">Labs</text>
            </svg>
          </button>

          {/* Links */}
          <div className="flex flex-wrap gap-6">
            {[['How It Works','timeline'],['Demo','demo'],['Get Started','get-started'],['Contact','contact']].map(([l,id]) => (
              <button key={id} onClick={() => go(id)} className="text-[#555] hover:text-[#ccc] text-[14px] transition-colors">{l}</button>
            ))}
            <span className="text-[#555] hover:text-[#ccc] text-[14px] cursor-pointer transition-colors">Privacy</span>
            <span className="text-[#555] hover:text-[#ccc] text-[14px] cursor-pointer transition-colors">Terms</span>
            <span className="text-[#555] hover:text-[#ccc] text-[14px] cursor-pointer transition-colors">BAA</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-8 border-t border-white/5">
          <p className="text-[#444] text-[12px]">© 2026 RevivalLabs.ai — All rights reserved.</p>
          <div className="flex items-center gap-2">
            <HIPAABadge variant="dark" />
          </div>
        </div>
      </div>
    </footer>
  );
}
