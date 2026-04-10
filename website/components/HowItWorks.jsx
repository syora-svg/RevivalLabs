'use client';

const steps = [
  {
    number: '01',
    emoji: '🎯',
    title: 'We Learn Your Practice',
    description: 'We start with a discovery call to understand your services, tone, patient FAQs, and workflows. Every AI is built specifically for your practice — not from a generic template.',
    color: 'bg-violet-100',
    iconColor: 'text-violet-600',
  },
  {
    number: '02',
    emoji: '⚙️',
    title: 'We Build & Integrate',
    description: 'We configure your AI agent and connect it to your practice management software (Dentrix, Eaglesoft, Open Dental, etc.) and any other tools you use. You review and approve everything.',
    color: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
  },
  {
    number: '03',
    emoji: '🚀',
    title: 'You Go Live in Days',
    description: 'Most practices are fully live within 3–5 business days. We handle all setup, HIPAA documentation, and testing. You just approve and flip the switch.',
    color: 'bg-teal-100',
    iconColor: 'text-teal-600',
  },
  {
    number: '04',
    emoji: '📈',
    title: 'Your Practice Runs 24/7',
    description: 'Your AI handles hundreds of calls and automations simultaneously — every night, every weekend. As your practice grows, it scales with you. No additional staff, no burnout.',
    color: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-violet-600 font-semibold text-xs uppercase tracking-widest mb-4">Simple Onboarding</p>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            From sign-up to{' '}
            <span className="gradient-text">fully automated</span>
            {' '}in under a week.
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
            No technical setup on your end. We handle everything — including HIPAA documentation and system integration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, i) => (
            <div key={step.number} className="card card-hover p-6 relative">
              {/* Number watermark */}
              <div className="absolute top-4 right-5 text-5xl font-black text-slate-100 select-none">
                {step.number}
              </div>
              <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center mb-4`}>
                <span className="text-2xl">{step.emoji}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>

              {/* Connector arrow */}
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white rounded-full border border-slate-200 items-center justify-center shadow-sm">
                  <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-lg mb-1">Ready to get started?</p>
            <p className="text-violet-200 text-sm">Join dental practices already running on RevivalLabs AI.</p>
          </div>
          <button
            onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex-shrink-0 bg-white text-violet-700 font-bold text-sm px-7 py-3.5 rounded-xl hover:bg-violet-50 transition-colors shadow-lg"
          >
            Get Started Today →
          </button>
        </div>
      </div>
    </section>
  );
}
