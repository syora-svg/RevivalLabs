const testimonials = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Owner, Bright Smile Dental — Phoenix, AZ',
    quote: "We were missing 40% of our after-hours calls. Since RevivalLabs went live, every call is answered, every appointment is booked, and our HIPAA compliance audit was a breeze. It paid for itself in week one.",
    rating: 5, initials: 'SM', color: 'from-violet-500 to-indigo-600',
  },
  {
    name: 'Dr. James Ortega',
    role: 'Orthodontist, Ortho Excellence — Dallas, TX',
    quote: "My front desk was drowning. The AI handles new patient intake calls, insurance questions, and appointment scheduling. My team now focuses on chairside care instead of phone work.",
    rating: 5, initials: 'JO', color: 'from-indigo-500 to-blue-600',
  },
  {
    name: 'Dr. Rachel Thompson',
    role: 'Managing Partner, Thompson Family Dental — Chicago, IL',
    quote: "The HIPAA compliance piece was my biggest concern. RevivalLabs walked us through every safeguard. Now I sleep soundly knowing patients are handled properly after hours.",
    rating: 5, initials: 'RT', color: 'from-teal-500 to-emerald-600',
  },
  {
    name: 'Dr. Mike DeLuca',
    role: 'General Dentist, Smile Studio — Miami, FL',
    quote: "We integrated with Dentrix in under 48 hours. Appointments book directly into our schedule. No double entry, no missed slots. Our collections have gone up because the AI follows up on every outstanding balance.",
    rating: 5, initials: 'MD', color: 'from-violet-500 to-purple-600',
  },
  {
    name: 'Dr. Priya Nair',
    role: 'Pediatric Dentist, Tiny Smiles Dental — Austin, TX',
    quote: "Parents call at all hours asking about emergencies, scheduling, insurance — the AI handles all of it flawlessly. My practice feels bigger than it is without any extra overhead.",
    rating: 5, initials: 'PN', color: 'from-blue-500 to-teal-500',
  },
  {
    name: 'Dr. Carlos Reyes',
    role: 'Prosthodontist, Elite Dental Arts — Los Angeles, CA',
    quote: "I was skeptical AI could handle the nuance of dental consultations. It exceeded my expectations. The voice sounds natural, it handles objections well, and every lead is captured.",
    rating: 5, initials: 'CR', color: 'from-indigo-500 to-violet-600',
  },
];

export default function SocialProof() {
  return (
    <section id="social-proof" className="section-gray py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-violet-600 font-semibold text-xs uppercase tracking-widest mb-4">Trusted by Dental Practices</p>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Real Practices. Real Results.
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
            Dentists across the country are capturing more patients, reducing no-shows, and running leaner practices with RevivalLabs AI.
          </p>
        </div>

        {/* Proof stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-14">
          {[
            { value: '3×',   label: 'Faster patient response' },
            { value: '90%',  label: 'Reduction in missed calls' },
            { value: '60%',  label: 'More appointments booked' },
            { value: '100%', label: 'HIPAA compliant' },
          ].map((s) => (
            <div key={s.label} className="card p-6 text-center">
              <div className="text-4xl font-black gradient-text mb-1">{s.value}</div>
              <div className="text-xs text-slate-500 font-medium leading-snug">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="card card-hover p-6">
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <span className="text-white text-xs font-bold">{t.initials}</span>
                </div>
                <div>
                  <p className="text-slate-800 text-sm font-semibold">{t.name}</p>
                  <p className="text-slate-400 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
