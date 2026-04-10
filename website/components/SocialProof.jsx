'use client';

// Deterministic bar data — avoids SSR hydration mismatch
const BAR_COUNT = 52;
const BARS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const base   = Math.sin(i * 0.38) * 0.28 + Math.sin(i * 0.91) * 0.18 + Math.sin(i * 0.21) * 0.12;
  const height = Math.round((base + 0.6) * 65 + 30); // 30–95%
  const dur    = (1.8 + ((i * 0.17) % 1.4)).toFixed(2);
  const delay  = ((i * 0.11) % 1.8).toFixed(2);
  return { height, dur, delay };
});

const LOGOS = [
  'Sandy Lake Dentistry', 'Kare Dental', 'WDC Wellness',
  'Secure Dental', 'Pure Dental Spa', 'Unified Dental Care',
  'Coastal Smiles', 'Premier Oral Care', 'Bright Arch Dental',
  'Metro Dental Group', 'Skyline Orthodontics', 'Heritage DSO',
];

function LogoTag({ name }) {
  return (
    <span className="inline-flex items-center gap-2 mx-5 whitespace-nowrap text-[#555] font-semibold text-[15px] tracking-tight">
      <span className="w-1.5 h-1.5 rounded-full bg-[#0062ff]/40 flex-shrink-0" />
      {name}
    </span>
  );
}

export default function SocialProof() {
  const scrollToDemo = () => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative bg-white overflow-hidden" style={{ minHeight: '420px' }}>

      {/* ── Animated bar background ── */}
      <div className="absolute inset-0 flex items-end justify-center gap-[5px] px-2 pointer-events-none">
        {BARS.map((b, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md"
            style={{
              maxWidth: '28px',
              height: `${b.height}%`,
              background: 'linear-gradient(to bottom, rgba(0,98,255,0.04) 0%, rgba(0,98,255,0.18) 55%, rgba(0,98,255,0.55) 100%)',
              animation: `barPulse ${b.dur}s ease-in-out ${b.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Foreground content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-16 pb-6 px-5 text-center">
        <p className="text-[#111] text-[17px] font-semibold max-w-md leading-snug mb-8">
          Trusted by hundreds of dental groups and<br className="hidden sm:block" />
          private practices across the US and Canada
        </p>

        {/* CTA */}
        <button
          onClick={scrollToDemo}
          className="flex items-center gap-3 bg-white rounded-full shadow-lg shadow-black/10 px-5 py-3 hover:shadow-xl hover:shadow-black/15 transition-all duration-200 hover:-translate-y-0.5 border border-[#e8e4df]"
        >
          <div className="w-10 h-10 rounded-full bg-[#0062ff] flex items-center justify-center flex-shrink-0 shadow-md shadow-[#0062ff]/30">
            <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
          <span className="text-[#111] font-semibold text-[16px] pr-2">Hear it in Action</span>
        </button>
      </div>

      {/* ── Scrolling logos ── */}
      <div className="relative z-10 pb-10 mt-4">
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...LOGOS, ...LOGOS].map((name, i) => (
              <LogoTag key={i} name={name} />
            ))}
          </div>
        </div>
      </div>

      {/* keyframe injected inline for this component */}
      <style>{`
        @keyframes barPulse {
          0%, 100% { transform: scaleY(1);    opacity: 1; }
          50%       { transform: scaleY(0.72); opacity: 0.75; }
        }
      `}</style>
    </section>
  );
}
