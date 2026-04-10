'use client';
import { useState, useEffect, useRef } from 'react';
import { useInView } from '@/hooks/useInView';

// ─────────────────────────────────────────────
// DEMO SCRIPT  ← adjust `time` (seconds) to
// match your recording once you verify timing
// ─────────────────────────────────────────────
const CARDS = [
  { time: 8,  icon: 'tooth',    label: 'Request Type',     val1: 'Appt. Booking',     val2: 'Emerg. Exam'      },
  { time: 26, icon: 'calendar', label: 'Booking Time',     val1: 'Tues, Jul 18',      val2: '10:00AM, PST'     },
  { time: 48, icon: 'medical',  label: 'Patient Insurance',val1: 'Medicaid',           val2: 'Not Accepted'     },
  { time: 65, icon: 'tag',      label: 'Special Offer',    val1: 'Emergency Special', val2: '$49.00'           },
];

const SUBTITLES = [
  { time: 78, text: "Yeah, let's do that. And, do you have parking?",                    bold: false },
  { time: 88, text: "Yes, we have a parking lot right in front of our office.",           bold: false },
  { time: 96, text: "Your appointment is confirmed for tomorrow at 10 in the morning.",   bold: true  },
];

// Deterministic bars
const BAR_COUNT = 56;
const BARS = Array.from({ length: BAR_COUNT }, (_, i) => ({
  height: Math.round((Math.sin(i * 0.38) * 0.28 + Math.sin(i * 0.91) * 0.18 + Math.sin(i * 0.21) * 0.12 + 0.6) * 55 + 32),
  dur:   (2.0 + ((i * 0.19) % 1.4)).toFixed(2),
  delay: ((i * 0.13) % 2.0).toFixed(2),
}));

// ── Icon components ──────────────────────────
function ToothIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
      <path d="M12 2C9.5 2 7.5 3.5 6.5 5.5C5.5 4.5 4 4 3 5C1.5 6.5 2 9 3 10.5C3.5 11.5 4 13 4 15C4 18 5 22 7 22C8.5 22 9 20 10 18C10.5 16.5 11 15.5 12 15.5C13 15.5 13.5 16.5 14 18C15 20 15.5 22 17 22C19 22 20 18 20 15C20 13 20.5 11.5 21 10.5C22 9 22.5 6.5 21 5C20 4 18.5 4.5 17.5 5.5C16.5 3.5 14.5 2 12 2Z"/>
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="20" height="20">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
      <rect x="8" y="14" width="3" height="3" fill="white" stroke="none"/>
    </svg>
  );
}
function MedicalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
      <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-7 14a1 1 0 01-1-1v-4H7a1 1 0 010-2h4V6a1 1 0 012 0v4h4a1 1 0 010 2h-4v4a1 1 0 01-1 1z"/>
    </svg>
  );
}
function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
      <path d="M12.586 2.586A2 2 0 0011.172 2H4a2 2 0 00-2 2v7.172a2 2 0 00.586 1.414l8 8a2 2 0 002.828 0l7.172-7.172a2 2 0 000-2.828l-8-8zM7 9a2 2 0 110-4 2 2 0 010 4z"/>
    </svg>
  );
}
const ICON_MAP = { tooth: ToothIcon, calendar: CalendarIcon, medical: MedicalIcon, tag: TagIcon };

// ── Action Card ──────────────────────────────
function ActionCard({ card, visible }) {
  const Icon = ICON_MAP[card.icon];
  return (
    <div
      className="w-full max-w-[420px]"
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        transition: 'opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div
        className="flex items-center gap-4 px-5 py-4 rounded-[50px]"
        style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}
      >
        {/* Blue icon circle */}
        <div className="w-12 h-12 rounded-full bg-[#0062ff] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#0062ff]/40">
          <Icon />
        </div>
        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-white/50 text-[12px] font-medium mb-0.5">{card.label}:</p>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-white font-bold text-[17px] leading-tight">{card.val1}</span>
            <span className="text-white/30 text-[17px]">|</span>
            <span className="text-white font-bold text-[17px] leading-tight">{card.val2}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────
export default function PreRecordedDemo() {
  const [playing,  setPlaying]  = useState(false);
  const [started,  setStarted]  = useState(false);
  const [loading,  setLoading]  = useState(false); // splash screen state
  const [skipped,  setSkipped]  = useState(false);
  const [elapsed,  setElapsed]  = useState(0);
  const [subtitle, setSubtitle] = useState(null);
  const [boldSub,  setBoldSub]  = useState(false);

  const audioRef = useRef(null);
  const rafRef   = useRef(null);
  const [secRef, inView] = useInView(0.15);

  // Tick loop — update elapsed from audio
  const tick = () => {
    if (audioRef.current) {
      const t = audioRef.current.currentTime;
      setElapsed(t);
      const active = [...SUBTITLES].reverse().find(s => t >= s.time);
      if (active) { setSubtitle(active.text); setBoldSub(active.bold); }
      else         { setSubtitle(null); }
    }
    rafRef.current = requestAnimationFrame(tick);
  };

  const play = () => {
    if (!audioRef.current) return;
    // Show loading splash for 2.5s, then start audio
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      audioRef.current?.play();
      setPlaying(true);
      setStarted(true);
      rafRef.current = requestAnimationFrame(tick);
    }, 2500);
  };

  const skip = () => {
    if (audioRef.current) audioRef.current.pause();
    cancelAnimationFrame(rafRef.current);
    setSkipped(true);
    setPlaying(false);
  };

  useEffect(() => {
    const audio = audioRef.current;
    const onEnd = () => { setPlaying(false); cancelAnimationFrame(rafRef.current); };
    audio?.addEventListener('ended', onEnd);
    return () => {
      audio?.removeEventListener('ended', onEnd);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Listen for hero CTA event
  useEffect(() => {
    const handler = () => play();
    window.addEventListener('startRecordedDemo', handler);
    return () => window.removeEventListener('startRecordedDemo', handler);
  }, []);

  const visibleCards = CARDS.filter(c => elapsed >= c.time);
  const isActive     = started && !skipped;
  const isDone       = skipped || (!playing && started && elapsed >= 100);

  return (
    <section
      id="recorded-demo"
      className="relative overflow-hidden"
      style={{
        minHeight: '700px',
        background: isActive ? '#050c18' : '#ffffff',
        transition: 'background 1.2s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {/* Hidden audio */}
      <audio ref={audioRef} src="/demo.m4a" preload="auto" />

      {/* ── Loading splash — full cover, above everything ── */}
      {loading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-8 text-center"
          style={{ background: '#050c18' }}>
          <h2 style={{ color: '#ffffff', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: '20px' }}>
            Starting demo...
          </h2>
          <p style={{ color: 'rgba(180,190,210,0.65)', fontSize: 'clamp(16px, 1.5vw, 22px)', fontWeight: 400, lineHeight: 1.6, maxWidth: '400px', marginBottom: '16px' }}>
            For the full experience,<br />ensure your volume is on.
          </p>
          <p style={{ color: 'rgba(160,175,200,0.45)', fontSize: 'clamp(14px, 1.3vw, 19px)', fontWeight: 400 }}>
            This Audio has NOT been edited.
          </p>
        </div>
      )}

      {/* ── Animated bars — only when active ── */}
      <div
        className="absolute inset-0 flex items-end justify-center gap-[5px] px-2 pointer-events-none"
        style={{ opacity: isActive ? 1 : 0, transition: 'opacity 1.4s ease' }}
      >
        {BARS.map((b, i) => (
          <div key={i} className="flex-1 rounded-t-sm" style={{
            maxWidth: '28px',
            height: `${b.height}%`,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.01) 0%, rgba(15,35,80,0.5) 50%, rgba(10,22,55,0.88) 100%)',
            animation: isActive ? `darkBarPulse ${b.dur}s ease-in-out ${b.delay}s infinite` : 'none',
          }} />
        ))}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 50% at 50% 100%, rgba(8,20,55,0.65) 0%, transparent 70%)' }} />
      </div>

      {/* ── Foreground ── */}
      <div ref={secRef} className="relative z-10 flex flex-col items-center py-20 px-5">

        {/* Header */}
        <p
          className={`text-[11px] font-bold uppercase tracking-widest mb-3 reveal d-0 ${inView ? 'visible' : ''}`}
          style={{ color: isActive ? 'rgba(100,160,255,0.8)' : '#0062ff', transition: 'color 1s ease' }}
        >
          See It In Action
        </p>
        <h2
          className={`text-[36px] sm:text-[48px] font-extrabold tracking-tight leading-[1.1] mb-3 text-center reveal d-75 ${inView ? 'visible' : ''}`}
          style={{ color: isActive ? '#ffffff' : '#111111', transition: 'color 1s ease' }}
        >
          Watch a real call.<br />Live results.
        </h2>
        <p
          className={`text-[15px] max-w-sm mx-auto text-center mb-12 reveal d-150 ${inView ? 'visible' : ''}`}
          style={{ color: isActive ? 'rgba(255,255,255,0.4)' : '#555555', transition: 'color 1s ease' }}
        >
          A dental patient books an emergency exam — handled entirely by the AI.
        </p>

        {/* ── Idle play button ── */}
        {!started && (
          <button
            onClick={play}
            className="flex items-center gap-3 bg-white rounded-full shadow-lg shadow-black/10 px-5 py-3 hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 border border-[#e8e4df] mb-8"
          >
            <div className="w-12 h-12 rounded-full bg-[#0062ff] flex items-center justify-center flex-shrink-0 shadow-md shadow-[#0062ff]/30">
              <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
            <span className="text-[#111] font-semibold text-[17px] pr-2">Play Demo</span>
          </button>
        )}

        {/* ── Action cards ── */}
        {isActive && (
          <div className="flex flex-col items-center gap-3 w-full max-w-[460px] mb-8">
            {CARDS.map((card, i) => (
              <ActionCard key={i} card={card} visible={elapsed >= card.time} />
            ))}
          </div>
        )}

        {/* ── Waveform / progress bar ── */}
        {isActive && (
          <div className="w-full max-w-[460px] mb-10">
            <div className="flex items-center gap-3">
              <button
                onClick={() => { playing ? audioRef.current?.pause() : audioRef.current?.play(); setPlaying(p => !p); }}
                className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition-colors flex-shrink-0"
              >
                {playing
                  ? <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z"/></svg>
                  : <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/></svg>
                }
              </button>
              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0062ff] rounded-full transition-all duration-300"
                  style={{ width: `${(elapsed / 107.69) * 100}%` }}
                />
              </div>
              <span className="text-white/30 text-[12px] font-mono flex-shrink-0">
                {String(Math.floor(elapsed / 60)).padStart(2,'0')}:{String(Math.floor(elapsed % 60)).padStart(2,'0')}
              </span>
            </div>
          </div>
        )}

        {/* ── Subtitle ── */}
        <div
          className="text-center mb-10 min-h-[80px] flex items-end justify-center"
          style={{ opacity: subtitle ? 1 : 0, transition: 'opacity 0.5s ease' }}
        >
          <p className={`max-w-md mx-auto leading-relaxed ${boldSub ? 'text-white font-semibold italic text-[20px]' : 'text-white/50 text-[15px]'}`}
            style={{ transition: 'font-size 0.4s ease, color 0.4s ease' }}>
            {subtitle}
          </p>
        </div>

        {/* ── Skip / Done button ── */}
        {isActive && !skipped && (
          <button
            onClick={skip}
            className="flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/15 text-white/50 hover:text-white/80 hover:border-white/30 transition-all text-[14px] font-medium"
            style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
            </svg>
            Skip Demo
          </button>
        )}

        {/* ── After skip / ended ── */}
        {isDone && (
          <div className="flex flex-col items-center gap-4 mt-6">
            <p className="text-white/50 text-[15px] text-center max-w-sm">
              That's your AI receptionist — ready to handle every call for your practice.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary flex items-center gap-2"
              >
                📞 Test It Yourself
              </button>
              <button
                onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all text-[15px] font-semibold"
                style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)' }}
              >
                Get Started →
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes darkBarPulse {
          0%, 100% { transform: scaleY(1);    opacity: 0.9; }
          50%       { transform: scaleY(0.68); opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
