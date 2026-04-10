'use client';

export default function Footer() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-slate-950 border-t border-white/5 py-14">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-10">

          {/* Brand */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
              <span className="text-white font-black text-[11px]">RL</span>
            </div>
            <span className="text-white font-bold text-base tracking-tight">
              Revival<span className="gradient-text">Labs.ai</span>
            </span>
          </button>

          {/* Links */}
          <div className="flex flex-wrap gap-6">
            {[['Services','services'],['Demo','demo'],['Get Started','get-started'],['Contact','contact']].map(([l,id]) => (
              <button key={id} onClick={() => go(id)} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">{l}</button>
            ))}
            <span className="text-slate-500 hover:text-slate-300 text-sm cursor-pointer transition-colors">Privacy</span>
            <span className="text-slate-500 hover:text-slate-300 text-sm cursor-pointer transition-colors">Terms</span>
            <span className="text-slate-500 hover:text-slate-300 text-sm cursor-pointer transition-colors">BAA</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-8 border-t border-white/5">
          <p className="text-slate-600 text-xs">© 2026 RevivalLabs.ai — All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="hipaa-badge text-[10px]">🔒 HIPAA Compliant · BAA Available</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
