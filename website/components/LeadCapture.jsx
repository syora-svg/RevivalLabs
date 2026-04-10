'use client';
import { useState } from 'react';
import { useInView } from '@/hooks/useInView';

const specialties = ['General Dentistry','Orthodontics','Pediatric Dentistry','Oral Surgery','Periodontics','Cosmetic Dentistry','Med Spa','Law Firm','Home Services','Other'];

export default function LeadCapture() {
  const [form, setForm] = useState({ name: '', practice: '', email: '', phone: '', specialty: '', interest: '', notes: '' });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const submit = (e) => { e.preventDefault(); if (!form.interest) return; setLoading(true); setTimeout(() => { setLoading(false); setDone(true); }, 800); };

  return (
    <section id="get-started" className="bg-[#f8fafc] py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left copy */}
          <div ref={ref}>
            <p className={`text-[11px] font-bold uppercase tracking-widest text-violet-600 mb-3 reveal d-0 ${inView ? 'visible' : ''}`}>Get Started</p>
            <h2 className={`text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-5 reveal d-75 ${inView ? 'visible' : ''}`}>
              Your practice,<br />
              <span className="gradient-text">on autopilot.</span>
            </h2>
            <p className={`text-slate-500 text-base font-light leading-relaxed mb-10 max-w-sm reveal d-150 ${inView ? 'visible' : ''}`}>
              Tell us about your practice. A RevivalLabs specialist designs your HIPAA-compliant AI solution and reaches out within 24 hours.
            </p>

            {/* Benefits */}
            <div className={`space-y-4 reveal d-225 ${inView ? 'visible' : ''}`}>
              {[
                ['⚡', 'Live in 3–5 days', 'Fastest setup in the industry'],
                ['🔒', 'HIPAA compliant', 'BAA included with every plan'],
                ['🦷', 'Dental-native AI', 'Trained on dental terminology & workflows'],
                ['📊', 'Full analytics', 'Every call tracked, every lead captured'],
              ].map(([icon, title, sub]) => (
                <div key={title} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-lg shadow-sm flex-shrink-0">{icon}</div>
                  <div>
                    <p className="text-slate-800 font-semibold text-sm">{title}</p>
                    <p className="text-slate-400 text-xs">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className={`mt-10 g-card p-5 reveal d-300 ${inView ? 'visible' : ''}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex -space-x-2">
                  {['SM','JO','RT','MD'].map(i => (
                    <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 border-2 border-white flex items-center justify-center">
                      <span className="text-white text-[9px] font-bold">{i}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-0.5">{[...Array(5)].map((_,i) => <span key={i} className="text-amber-400 text-xs">★</span>)}</div>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">
                <strong className="text-slate-800">500+ dental practices</strong> already running on RevivalLabs AI.
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            {done ? (
              <div className="g-card p-14 text-center">
                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">You're in!</h3>
                <p className="text-slate-400 text-sm max-w-xs mx-auto">We'll reach out within 24 hours to design your custom AI solution.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="g-card p-7 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Full Name *</label>
                    <input required className="input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Dr. Jane Smith" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Practice Name *</label>
                    <input required className="input" value={form.practice} onChange={e => set('practice', e.target.value)} placeholder="Bright Smile Dental" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Email *</label>
                    <input required type="email" className="input" value={form.email} onChange={e => set('email', e.target.value)} placeholder="dr@practice.com" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Phone *</label>
                    <input required type="tel" className="input" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="(555) 000-0000" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Specialty *</label>
                    <select required className="input appearance-none" value={form.specialty} onChange={e => set('specialty', e.target.value)}>
                      <option value="">Select…</option>
                      {specialties.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">I'm interested in *</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['AI Voice Receptionist','AI Automations','Both'].map(o => (
                        <button type="button" key={o} onClick={() => set('interest', o)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                            form.interest === o ? 'bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200' : 'bg-white border-slate-200 text-slate-600 hover:border-violet-300'
                          }`}>
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Anything else?</label>
                    <textarea rows={3} className="input resize-none" value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="How many calls do you miss? Which PMS do you use?" />
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-xl p-3">
                  <span className="text-green-600 text-sm mt-0.5 flex-shrink-0">🔒</span>
                  <p className="text-green-700 text-[11px] leading-relaxed">This form does not collect PHI. All data is handled in accordance with our Privacy Policy and HIPAA standards.</p>
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full justify-center gap-2 disabled:opacity-70">
                  {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting…</> : 'Get Started →'}
                </button>
                <p className="text-center text-[11px] text-slate-400">No commitment. Reply within 24 hours.</p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
