'use client';
import { useInView } from '@/hooks/useInView';

const voiceFeats = [
  'Answer every call — nights, weekends, holidays',
  'Book & reschedule appointments in real time',
  'Verify insurance eligibility automatically',
  'Triage after-hours dental emergencies',
  'Capture new patient info seamlessly',
  'Route urgent calls to on-call staff',
];

const autoFeats = [
  'Recall & reactivation campaigns',
  'Appointment reminders & confirmations',
  'Post-treatment follow-up messages',
  'Outstanding balance collection via text',
  'Intake form delivery & tracking',
  'Review request automation',
];

const hipaaItems = [
  { icon: '🔒', t: 'End-to-End Encrypted' },
  { icon: '📋', t: 'BAA Included' },
  { icon: '🛡️', t: 'HIPAA-Trained AI' },
  { icon: '📊', t: 'Full Audit Logs' },
  { icon: '🔑', t: 'Role-Based Access' },
  { icon: '✅', t: 'No PHI Misuse' },
];

function Tick({ color = 'violet' }) {
  return (
    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${color === 'teal' ? 'bg-teal-100' : 'bg-violet-100'}`}>
      <svg className={`w-2.5 h-2.5 ${color === 'teal' ? 'text-teal-600' : 'text-violet-600'}`} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </div>
  );
}

export default function Services() {
  const [ref, inView] = useInView();

  return (
    <section id="services" className="bg-[#f8fafc] py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div ref={ref} className="mb-14">
          <p className={`text-[11px] font-bold uppercase tracking-widest text-violet-600 mb-3 reveal d-0 ${inView ? 'visible' : ''}`}>
            What We Build
          </p>
          <h2 className={`text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1] max-w-xl reveal d-75 ${inView ? 'visible' : ''}`}>
            Everything handled.<br />
            <span className="gradient-text">Nothing missed.</span>
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

          {/* Voice — large */}
          <div className={`md:col-span-7 g-card p-8 border-t-[3px] border-t-violet-600 reveal d-0 ${inView ? 'visible' : ''}`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900">AI Voice Receptionist</h3>
                <p className="text-slate-500 text-sm mt-1 max-w-xs">Always-on front desk. Never holds. Never misses. Never sleeps.</p>
              </div>
              <span className="badge badge-violet hidden sm:flex">24/7</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {voiceFeats.map((f) => (
                <div key={f} className="flex items-start gap-2">
                  <Tick />
                  <span className="text-slate-600 text-[13px] leading-snug">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stat stack */}
          <div className={`md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-4 reveal d-150 ${inView ? 'visible' : ''}`}>
            <div className="g-card p-6 flex flex-col justify-between">
              <div className="text-5xl font-black gradient-text leading-none">24/7</div>
              <p className="text-slate-400 text-xs font-medium mt-3">Answering calls every minute of every day</p>
            </div>
            <div className="g-card p-6 flex flex-col justify-between bg-slate-900 border-slate-800">
              <div className="text-5xl font-black text-white leading-none">&lt;1s</div>
              <p className="text-slate-400 text-xs font-medium mt-3">Time to answer — zero hold music</p>
            </div>
          </div>

          {/* Automations */}
          <div className={`md:col-span-5 g-card p-8 border-t-[3px] border-t-teal-500 reveal d-225 ${inView ? 'visible' : ''}`}>
            <div className="w-11 h-11 rounded-xl bg-teal-100 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">AI Automations</h3>
            <p className="text-slate-500 text-sm mb-5">Eliminate repetitive admin. Keep your schedule full automatically.</p>
            <div className="space-y-2.5">
              {autoFeats.map((f) => (
                <div key={f} className="flex items-start gap-2">
                  <Tick color="teal" />
                  <span className="text-slate-600 text-[13px]">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* HIPAA */}
          <div className={`md:col-span-7 rounded-[20px] bg-slate-900 p-8 reveal d-300 ${inView ? 'visible' : ''}`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="badge badge-green mb-3">HIPAA Compliant</span>
                <h3 className="text-xl font-bold text-white">Built for healthcare. Secure by design.</h3>
                <p className="text-slate-400 text-sm mt-1">We sign a BAA with every practice. Your patients' data is protected at every step.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {hipaaItems.map((h) => (
                <div key={h.t} className="glass-dark rounded-xl px-4 py-3 flex items-center gap-2">
                  <span className="text-base">{h.icon}</span>
                  <span className="text-white text-xs font-semibold">{h.t}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
