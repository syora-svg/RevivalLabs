'use client';
import { useInView } from '@/hooks/useInView';

const events = [
  { time: '5:00 PM',  icon: '🌙', label: 'Office closes',                detail: 'Your team goes home. AI stays on.',                         color: 'bg-[#f5f3f0] text-[#555]',   status: true },
  { time: '5:15 PM',  icon: '📞', label: 'Appointment booked',           detail: 'New patient calls after hours — cleaning booked instantly.',  color: 'bg-[#0062ff] text-white',    badge: '+1 appt' },
  { time: '6:30 PM',  icon: '📅', label: 'Reschedule handled',           detail: 'Patient moves Tuesday slot via text. Dentrix updated.',       color: 'bg-[#0044cc] text-white',    badge: 'Updated' },
  { time: '7:15 PM',  icon: '💬', label: '"Do you take Delta Dental?"',  detail: 'Insurance FAQ answered. Patient books consult.',              color: 'bg-[#1a3fff] text-white',    badge: '+1 lead' },
  { time: '8:00 PM',  icon: '🛡️', label: 'Insurance verified',           detail: '9 AM appointment coverage confirmed automatically.',          color: 'bg-[#0062ff]/80 text-white', badge: 'Verified' },
  { time: '12:00 AM', icon: '🚨', label: 'Emergency triaged',            detail: 'Severe pain call. Protocol sent. On-call dentist notified.',  color: 'bg-rose-600 text-white',     badge: 'Handled' },
  { time: '5:00 AM',  icon: '💳', label: '$340 collected',               detail: 'Outstanding balance paid via text link while you slept.',     color: 'bg-emerald-600 text-white',  badge: '+$340' },
  { time: '7:45 AM',  icon: '📋', label: 'All intake forms in',          detail: '3 new patients completed digital forms before arriving.',     color: 'bg-[#0062ff]/70 text-white', badge: '100%' },
  { time: '8:00 AM',  icon: '☀️', label: 'Office opens',                 detail: 'Full schedule. Zero missed leads. Payments collected.',        color: 'bg-amber-500 text-white',    status: true },
];

export default function Timeline() {
  const [ref, inView] = useInView(0.05);

  return (
    <section id="timeline" className="bg-[#faf9f7] py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#0062ff] mb-3">Always Working</p>
          <h2 className="text-[36px] sm:text-[48px] font-extrabold text-[#111] tracking-tight leading-[1.1] mb-4">
            Grow your practice while<br />
            <span className="gradient-text">you sleep.</span>
          </h2>
          <p className="text-[#888] text-[15px] font-normal max-w-md mx-auto">
            Here's what a typical night looks like for a RevivalLabs-powered dental practice.
          </p>
        </div>

        {/* Timeline */}
        <div ref={ref} className="relative max-w-2xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-[19px] sm:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-[#e8e4df] via-[#0062ff]/40 to-amber-300 sm:-translate-x-px" />

          <div className="space-y-5">
            {events.map((ev, i) => {
              const isRight = i % 2 !== 0;
              const delay   = Math.min(i * 75, 525);
              return (
                <div
                  key={ev.time}
                  className={`relative flex items-center gap-4 sm:gap-0 reveal d-${delay < 525 ? delay : 525} ${inView ? 'visible' : ''}`}
                  style={{ transitionDelay: `${delay}ms` }}
                >
                  {/* Dot */}
                  <div className="relative z-10 flex-shrink-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                    <div className={`w-10 h-10 rounded-full ${ev.color} flex items-center justify-center text-sm shadow-sm ring-4 ring-[#faf9f7]`}>
                      {ev.icon}
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`flex-1 sm:w-[44%] sm:flex-none ${isRight ? 'sm:ml-[56%]' : 'sm:mr-[56%] sm:text-right'}`}>
                    <div className={`g-card px-4 py-3 ${ev.status ? 'bg-[#f5f3f0]' : ''} inline-block w-full`}>
                      <div className={`flex items-center gap-2 mb-0.5 ${isRight ? '' : 'sm:flex-row-reverse'}`}>
                        <span className="text-[11px] font-bold text-[#aaa] uppercase tracking-widest">{ev.time}</span>
                        {ev.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#eff6ff] text-[#0062ff]">{ev.badge}</span>
                        )}
                      </div>
                      <p className="text-[#111] text-[14px] font-semibold">{ev.label}</p>
                      <p className="text-[#888] text-[12px] mt-0.5 leading-snug">{ev.detail}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-[#888] text-[14px] mb-5">This runs automatically for your practice, every night.</p>
          <button onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary">
            Set This Up →
          </button>
        </div>
      </div>
    </section>
  );
}
