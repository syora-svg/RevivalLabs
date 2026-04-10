'use client';

import { useState } from 'react';

const benefits = [
  { emoji: '⚡', title: 'Live in 3–5 Business Days', desc: 'Fastest setup in the industry' },
  { emoji: '🔒', title: 'HIPAA Compliant by Default', desc: 'BAA included with every plan' },
  { emoji: '🦷', title: 'Dental-Specific AI', desc: 'Trained on dental workflows & terminology' },
  { emoji: '🔧', title: 'Fully Managed', desc: 'We handle setup, updates & optimization' },
];

export default function ContactSales() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 800);
  };

  const inputClass = 'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all';

  return (
    <section id="contact" className="section-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="text-violet-600 font-semibold text-xs uppercase tracking-widest mb-4">Contact Sales</p>
            <h2 className="text-4xl font-bold text-slate-900 mb-5 leading-tight">
              Let's build your practice's{' '}
              <span className="gradient-text">AI receptionist.</span>
            </h2>
            <p className="text-slate-500 mb-10 text-sm leading-relaxed">
              Whether you're ready to get started or just exploring, our team will walk you through exactly how RevivalLabs works for dental practices like yours — no pressure, no jargon.
            </p>

            <div className="space-y-5 mb-10">
              {benefits.map((b) => (
                <div key={b.title} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">{b.emoji}</span>
                  </div>
                  <div>
                    <p className="text-slate-800 font-semibold text-sm">{b.title}</p>
                    <p className="text-slate-400 text-sm">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social proof note */}
            <div className="card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex -space-x-2">
                  {['SM', 'JO', 'RT', 'MD'].map((ini) => (
                    <div key={ini} className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 border-2 border-white flex items-center justify-center">
                      <span className="text-white text-[9px] font-bold">{ini}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-xs">★</span>)}
                </div>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                <span className="text-slate-800 font-semibold">500+ practices</span> already trust RevivalLabs to answer their phones, fill their schedules, and protect their patients' data.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div>
            {submitted ? (
              <div className="card p-14 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Message received!</h3>
                <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">
                  A member of our dental sales team will be in touch within 1 business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-8 space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Your Name</label>
                  <input type="text" required value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Dr. Jane Smith" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Business Email</label>
                  <input type="email" required value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="dr.smith@brightsmile.com" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Practice Name</label>
                  <input type="text" value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="Bright Smile Dental" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Message</label>
                  <textarea rows={4} value={form.message} onChange={(e) => set('message', e.target.value)}
                    placeholder="Tell us about your practice and what you're looking to solve..."
                    className={inputClass + ' resize-none'}
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70">
                  {loading ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
                  ) : 'Contact Sales →'}
                </button>
                <p className="text-center text-xs text-slate-400">We typically respond within 1 business day.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
