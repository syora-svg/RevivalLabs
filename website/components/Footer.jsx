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
            <svg width="400" height="100" viewBox="0 0 900 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-opacity duration-200 group-hover:opacity-70">
              <defs>
                <linearGradient id="ftWaveGrad" x1="40" y1="180" x2="340" y2="20" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#3B82F6"/>
                  <stop offset="55%" stopColor="#60A5FA"/>
                  <stop offset="100%" stopColor="#BFDBFE"/>
                </linearGradient>
                <linearGradient id="ftTextGrad" x1="355" y1="150" x2="830" y2="70" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff"/>
                  <stop offset="55%" stopColor="#e2e8f0"/>
                  <stop offset="100%" stopColor="#93c5fd"/>
                </linearGradient>
                <style>{`
                  .ft-wave-bar { fill: url(#ftWaveGrad); }
                  .ft-brand-word {
                    fill: url(#ftTextGrad);
                    font-family: Inter, Arial, Helvetica, sans-serif;
                    font-size: 76px;
                    font-weight: 800;
                    letter-spacing: -2.2px;
                  }
                `}</style>
              </defs>
              <g transform="translate(32 34)">
                <rect className="ft-wave-bar" x="0"   y="96"  width="14" height="18"  rx="7"/>
                <rect className="ft-wave-bar" x="24"  y="78"  width="14" height="36"  rx="7"/>
                <rect className="ft-wave-bar" x="48"  y="52"  width="14" height="62"  rx="7"/>
                <rect className="ft-wave-bar" x="72"  y="24"  width="14" height="90"  rx="7"/>
                <rect className="ft-wave-bar" x="96"  y="44"  width="14" height="70"  rx="7"/>
                <rect className="ft-wave-bar" x="120" y="12"  width="14" height="102" rx="7"/>
                <rect className="ft-wave-bar" x="144" y="34"  width="14" height="80"  rx="7"/>
                <rect className="ft-wave-bar" x="168" y="18"  width="14" height="96"  rx="7"/>
                <rect className="ft-wave-bar" x="192" y="42"  width="14" height="72"  rx="7"/>
                <rect className="ft-wave-bar" x="216" y="62"  width="14" height="52"  rx="7"/>
                <rect className="ft-wave-bar" x="240" y="78"  width="14" height="36"  rx="7"/>
                <rect className="ft-wave-bar" x="264" y="92"  width="14" height="22"  rx="7"/>
                <rect className="ft-wave-bar" x="288" y="100" width="14" height="14"  rx="7"/>
              </g>
              <text x="360" y="140" className="ft-brand-word">Revival Labs</text>
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
