'use client';
import { useEffect, useState } from 'react';
import { useInView, useCounter } from '@/hooks/useInView';

function StatCard({ value, suffix = '', label, delay, inView }) {
  const num = useCounter(parseInt(value) || 0, inView);
  return (
    <div className={`g-card p-5 reveal d-${delay} ${inView ? 'visible' : ''}`}>
      <div className="text-3xl font-black text-slate-900 leading-none">
        {isNaN(parseInt(value)) ? value : num}{suffix}
      </div>
      <div className="text-xs text-slate-400 font-medium mt-1.5 leading-snug">{label}</div>
    </div>
  );
}

export default function Hero() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const [ref, inView] = useInView(0.1);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-white">
      {/* Ambient blobs */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-violet-100/60 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-[500px] h-[500px] bg-teal-100/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 w-full py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            {/* Badges */}
            <div className={`flex flex-wrap gap-2 mb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '0ms' }}>
              <span className="hipaa-badge">🔒 HIPAA Compliant</span>
              <span className="badge badge-violet">⚡ Live in 5 Days</span>
              <span className="badge badge-blue">🦷 Dental AI</span>
            </div>

            {/* Headline */}
            <h1 className={`text-[56px] sm:text-[68px] lg:text-[72px] font-extrabold leading-[1.0] tracking-[-0.03em] text-slate-900 mb-6 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '80ms' }}>
              Stop losing<br />
              patients to<br />
              <span className="shimmer-text">missed calls.</span>
            </h1>

            {/* Sub */}
            <p className={`text-lg text-slate-500 font-light leading-relaxed max-w-md mb-10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '160ms' }}>
              Your AI receptionist answers every call 24/7 — books appointments, verifies insurance, and handles patient inquiries. HIPAA-compliant and live in under a week.
            </p>

            {/* CTAs */}
            <div className={`flex flex-wrap gap-3 mb-12 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '240ms' }}>
              <button onClick={() => go('demo')} className="btn-primary">
                Hear it live →
              </button>
              <button onClick={() => go('contact')} className="btn-ghost">
                Talk to sales
              </button>
            </div>

            {/* Integration logos */}
            <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '360ms' }}>
              <p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold mb-3">Integrates with</p>
              <div className="flex flex-wrap gap-2">
                {['Dentrix', 'Eaglesoft', 'Open Dental', 'Curve', 'Carestream'].map((s) => (
                  <span key={s} className="badge badge-slate">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — stat cards */}
          <div ref={ref} className="grid grid-cols-2 gap-3">
            <StatCard value="172" suffix="+" label="Calls missed per week by the avg dental office" delay="0" inView={inView} />
            <StatCard value="75" suffix="%" label="Of missed callers never call back" delay="75" inView={inView} />
            <StatCard value="1" suffix="s" label="Response time — every call answered instantly" delay="150" inView={inView} />
            <StatCard value="98" suffix="%" label="Lead capture rate with AI on the line" delay="225" inView={inView} />

            {/* Live indicator card */}
            <div className={`col-span-2 g-card p-5 reveal d-300 ${inView ? 'visible' : ''}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                    <div className="absolute inset-0 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping opacity-60" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500">AI answering right now</span>
                </div>
                <span className="badge badge-green">LIVE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">🤖</span>
                </div>
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-500 to-teal-500 rounded-full animate-pulse" style={{ width: '65%' }} />
                </div>
                <span className="text-xs text-slate-400 font-medium">Bright Smile Dental</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
