'use client';
import { useState } from 'react';
import { useInView } from '@/hooks/useInView';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();

  const set    = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const submit = (e)    => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); setDone(true); }, 700); };

  return (
    <section id="contact" className="bg-white py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div ref={ref} className="max-w-2xl mx-auto text-center mb-12">
          <p className={`text-[11px] font-bold uppercase tracking-widest text-[#0062ff] mb-3 reveal d-0 ${inView ? 'visible' : ''}`}>Contact Sales</p>
          <h2 className={`text-[36px] sm:text-[48px] font-extrabold text-[#111] tracking-tight leading-[1.1] mb-4 reveal d-75 ${inView ? 'visible' : ''}`}>
            Talk to a<br /><span className="gradient-text">dental AI specialist.</span>
          </h2>
          <p className={`text-[#888] text-[15px] font-normal reveal d-150 ${inView ? 'visible' : ''}`}>
            No jargon, no pressure. We'll show you exactly how RevivalLabs works for practices like yours.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          {done ? (
            <div className="g-card p-14 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-[20px] font-bold text-[#111] mb-2">Message received!</h3>
              <p className="text-[#888] text-[14px]">Our team will be in touch within 1 business day.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="g-card p-7 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#888] uppercase tracking-wide mb-1.5">Name</label>
                  <input required className="input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Dr. Jane Smith" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#888] uppercase tracking-wide mb-1.5">Email</label>
                  <input required type="email" className="input" value={form.email} onChange={e => set('email', e.target.value)} placeholder="dr@practice.com" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#888] uppercase tracking-wide mb-1.5">Practice</label>
                <input className="input" value={form.company} onChange={e => set('company', e.target.value)} placeholder="Bright Smile Dental" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#888] uppercase tracking-wide mb-1.5">Message</label>
                <textarea rows={3} className="input resize-none" value={form.message} onChange={e => set('message', e.target.value)} placeholder="What are you trying to solve?" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center gap-2 disabled:opacity-70">
                {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending…</> : 'Contact Sales →'}
              </button>
              <p className="text-center text-[11px] text-[#aaa]">We respond within 1 business day.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
