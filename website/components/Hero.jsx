'use client';
import { useEffect, useState } from 'react';
import { useInView, useCounter } from '@/hooks/useInView';
import HIPAABadge from '@/components/HIPAABadge';

function StatCard({ value, suffix = '', label, delay, inView }) {
  const num = useCounter(parseInt(value) || 0, inView);
  return (
    <div className={`g-card p-5 reveal d-${delay} ${inView ? 'visible' : ''}`}>
      <div className="text-[32px] font-black text-[#111111] leading-none tracking-tight">
        {isNaN(parseInt(value)) ? value : num}{suffix}
      </div>
      <div className="text-[13px] text-[#888] font-normal mt-2 leading-snug">{label}</div>
    </div>
  );
}

export default function Hero() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const [ref, inView] = useInView(0.1);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-[#faf9f7]">
      {/* Soft ambient blob */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(0,98,255,0.07) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(0,98,255,0.04) 0%, transparent 70%)' }} />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 w-full py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            {/* Badges */}
            <div className={`flex flex-wrap gap-2 mb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '0ms' }}>
              <HIPAABadge variant="inline" />
              <span className="badge badge-blue">⚡ Live in 5 Days</span>
              <span className="badge badge-blue">🦷 Built for Dentists</span>
            </div>

            {/* Headline */}
            <h1 className={`text-[52px] sm:text-[64px] lg:text-[72px] font-extrabold leading-[1.02] tracking-[-0.03em] text-[#111111] mb-6 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '80ms' }}>
              Stop losing<br />
              patients to<br />
              <span className="shimmer-text">missed calls.</span>
            </h1>

            {/* Sub */}
            <p className={`text-[17px] text-[#555] font-normal leading-relaxed max-w-md mb-10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '160ms' }}>
              Your AI receptionist answers every call 24/7 — books appointments, verifies insurance, and handles patient inquiries. HIPAA-compliant and live in under a week.
            </p>

            {/* CTAs */}
            <div className={`flex flex-wrap gap-3 mb-12 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '240ms' }}>
              <button
                onClick={() => {
                  document.getElementById('recorded-demo')?.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => window.dispatchEvent(new CustomEvent('startRecordedDemo')), 700);
                }}
                className="btn-primary flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                Play Demo
              </button>
              <button onClick={() => go('demo')} className="btn-ghost">
                📞 Place a Live Test Call
              </button>
            </div>

            {/* Integration logos */}
            <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '360ms' }}>
              <p className="text-[11px] text-[#aaa] uppercase tracking-widest font-semibold mb-3">Integrates with</p>
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
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-60" />
                  </div>
                  <span className="text-[13px] font-semibold text-[#555]">AI answering right now</span>
                </div>
                <span className="badge badge-green">LIVE</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#eff6ff] flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">🤖</span>
                </div>
                <div className="flex-1 bg-[#f0ede9] rounded-full h-1.5 overflow-hidden">
                  <div className="h-full bg-[#0062ff] rounded-full animate-pulse" style={{ width: '65%' }} />
                </div>
                <span className="text-[13px] text-[#888] font-medium">Bright Smile Dental</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
