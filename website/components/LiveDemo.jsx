'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from '@/hooks/useInView';

// Deterministic bar data
const BAR_COUNT = 52;
const BARS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const base   = Math.sin(i * 0.38) * 0.28 + Math.sin(i * 0.91) * 0.18 + Math.sin(i * 0.21) * 0.12;
  const height = Math.round((base + 0.6) * 55 + 35);
  const dur    = (2.2 + ((i * 0.19) % 1.6)).toFixed(2);
  const delay  = ((i * 0.13) % 2.0).toFixed(2);
  return { height, dur, delay };
});

const STATE = {
  IDLE:       'idle',
  CONNECTING: 'connecting',
  ACTIVE:     'active',
  ENDED:      'ended',
  ERROR:      'error',
};

export default function LiveDemo() {
  const [callState, setCallState]       = useState(STATE.IDLE);
  const [agentTalking, setAgentTalking] = useState(false);
  const [errorMsg, setErrorMsg]         = useState('');
  const [duration, setDuration]         = useState(0);

  const clientRef = useRef(null);
  const timerRef  = useRef(null);
  const [hRef, inView] = useInView(0.1);

  useEffect(() => {
    if (callState === STATE.ACTIVE) {
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000);
    } else {
      clearInterval(timerRef.current);
      if (callState !== STATE.ACTIVE) setDuration(0);
    }
    return () => clearInterval(timerRef.current);
  }, [callState]);

  useEffect(() => {
    return () => { clientRef.current?.stopCall(); clearInterval(timerRef.current); };
  }, []);

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`;

  const startCall = useCallback(async () => {
    setCallState(STATE.CONNECTING);
    setErrorMsg('');
    try {
      const { RetellWebClient } = await import('retell-client-js-sdk');
      const res = await fetch('/api/create-call', { method: 'POST' });
      const { access_token, error } = await res.json();
      if (!access_token) throw new Error(error || 'No access token returned');

      const retell = new RetellWebClient();
      clientRef.current = retell;

      retell.on('call_started',        () => setCallState(STATE.ACTIVE));
      retell.on('call_ended',          () => setCallState(STATE.ENDED));
      retell.on('agent_start_talking', () => setAgentTalking(true));
      retell.on('agent_stop_talking',  () => setAgentTalking(false));
      retell.on('error', (err) => {
        setErrorMsg(err?.message || 'Call error — please try again.');
        setCallState(STATE.ERROR);
      });

      await retell.startCall({ accessToken: access_token });
    } catch (err) {
      setErrorMsg(err.message || 'Could not connect. Please try again.');
      setCallState(STATE.ERROR);
    }
  }, []);

  const endCall = useCallback(() => {
    clientRef.current?.stopCall();
    setCallState(STATE.ENDED);
    setAgentTalking(false);
  }, []);

  const reset = useCallback(() => {
    clientRef.current?.stopCall();
    setCallState(STATE.IDLE);
    setAgentTalking(false);
    setErrorMsg('');
    setDuration(0);
  }, []);

  const isActive = callState === STATE.ACTIVE;

  return (
    <section
      id="demo"
      className="relative overflow-hidden"
      style={{
        minHeight: '680px',
        background: isActive ? '#050c18' : '#ffffff',
        transition: 'background 1.2s cubic-bezier(0.4,0,0.2,1)',
      }}
    >

      {/* ── Dark arini-style bars — only visible when ACTIVE ── */}
      <div
        className="absolute inset-0 flex items-end justify-center gap-[6px] px-2 pointer-events-none"
        style={{ opacity: isActive ? 1 : 0, transition: 'opacity 1.4s cubic-bezier(0.4,0,0.2,1)' }}
      >
        {BARS.map((b, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{
              maxWidth: '30px',
              height: `${b.height}%`,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.01) 0%, rgba(15,35,80,0.55) 50%, rgba(10,22,55,0.9) 100%)',
              animation: isActive ? `darkBarPulse ${b.dur}s ease-in-out ${b.delay}s infinite` : 'none',
            }}
          />
        ))}

        {/* Radial center glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 55% at 50% 100%, rgba(8,20,55,0.7) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div ref={hRef} className="relative z-10 flex flex-col items-center justify-center py-20 px-5">

        {/* Header — fades between light/dark */}
        <p className={`text-[11px] font-bold uppercase tracking-widest mb-3 reveal d-0 ${inView ? 'visible' : ''} transition-colors duration-700`}
          style={{ color: isActive ? 'rgba(100,140,255,0.8)' : '#0062ff' }}>
          Live Demo
        </p>
        <h2
          className={`text-[36px] sm:text-[48px] font-extrabold tracking-tight leading-[1.1] mb-3 text-center reveal d-75 ${inView ? 'visible' : ''} transition-colors duration-700`}
          style={{ color: isActive ? '#ffffff' : '#111111' }}
        >
          Talk to the AI.<br />Right now.
        </h2>
        <p
          className={`text-[15px] font-normal max-w-sm mx-auto text-center mb-10 reveal d-150 ${inView ? 'visible' : ''} transition-colors duration-700`}
          style={{ color: isActive ? 'rgba(255,255,255,0.45)' : '#555555' }}
        >
          This is your real AI agent. Click start and speak — no scripts, no simulation.
        </p>

        {/* ── Floating card ── */}
        <div className={`w-full max-w-md reveal d-225 ${inView ? 'visible' : ''}`}>
          <div
            className="rounded-[24px] overflow-hidden"
            style={{
              background:   isActive ? 'rgba(255,255,255,0.06)' : '#ffffff',
              border:       isActive ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e8e4df',
              boxShadow:    isActive ? '0 0 60px rgba(0,50,180,0.15)' : '0 8px 40px rgba(0,0,0,0.08)',
              backdropFilter: isActive ? 'blur(20px)' : 'none',
              transition:   'all 1s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            {/* Title bar */}
            <div
              className="px-5 py-3.5 flex items-center justify-between border-b"
              style={{
                background:   isActive ? 'rgba(255,255,255,0.04)' : '#faf9f7',
                borderColor:  isActive ? 'rgba(255,255,255,0.08)' : '#e8e4df',
                transition:   'all 1s cubic-bezier(0.4,0,0.2,1)',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <span style={{ color: isActive ? 'rgba(255,255,255,0.35)' : '#999', transition: 'color 1s ease' }}
                  className="text-[12px] font-medium">
                  RevivalLabs.ai — Live Call
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-rose-500 animate-pulse' : 'bg-emerald-400 animate-pulse'}`} />
                <span className={`text-[11px] font-semibold ${isActive ? 'text-rose-400' : 'text-emerald-500'}`}>
                  {isActive ? `LIVE · ${fmt(duration)}` : 'READY'}
                </span>
              </div>
            </div>

            {/* Call UI */}
            <div className="p-8 flex flex-col items-center gap-5">

              {/* IDLE */}
              {callState === STATE.IDLE && (
                <>
                  <div className="w-20 h-20 rounded-full bg-[#0062ff] flex items-center justify-center shadow-lg shadow-[#0062ff]/30">
                    <span className="text-3xl">🎙️</span>
                  </div>
                  <div className="text-center">
                    <p className="text-[#111] font-semibold text-[15px] mb-1">Ready to connect</p>
                    <p className="text-[#888] text-[13px]">Your microphone will be requested when you start</p>
                  </div>
                  <button onClick={startCall} className="btn-primary px-10">
                    Start Live Call →
                  </button>
                </>
              )}

              {/* CONNECTING */}
              {callState === STATE.CONNECTING && (
                <>
                  <div className="w-20 h-20 rounded-full border-2 border-[#0062ff]/30 bg-[#eff6ff] flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full border-2 border-[#0062ff]/20 animate-ping" />
                    <div className="w-8 h-8 border-2 border-[#0062ff] border-t-transparent rounded-full animate-spin" />
                  </div>
                  <div className="text-center">
                    <p className="text-[#111] font-semibold text-[15px] mb-1">Connecting…</p>
                    <p className="text-[#888] text-[13px]">Allow microphone access when prompted</p>
                  </div>
                </>
              )}

              {/* ACTIVE */}
              {callState === STATE.ACTIVE && (
                <>
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                    agentTalking
                      ? 'bg-[#0062ff] shadow-[#0062ff]/50 scale-110'
                      : 'bg-white/10 border border-white/20'
                  }`}>
                    <span className="text-3xl">{agentTalking ? '🤖' : '🎙️'}</span>
                  </div>

                  <div className="flex items-center gap-[3px] h-10">
                    {[...Array(28)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-0.5 rounded-full transition-all ${agentTalking ? 'bg-[#4a9eff]' : 'bg-white/25'}`}
                        style={{
                          height: agentTalking
                            ? `${Math.floor(Math.sin(i * 0.7 + Date.now() * 0.005) * 14 + 18)}px`
                            : '4px',
                          animation: agentTalking ? `wave 0.9s ease-in-out ${i * 0.04}s infinite` : 'none',
                        }}
                      />
                    ))}
                  </div>

                  <p className="text-[14px] font-semibold text-white/80">
                    {agentTalking ? '🤖 AI is speaking…' : '🎙️ Listening…'}
                  </p>

                  <button
                    onClick={endCall}
                    className="flex items-center gap-2 px-8 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-[14px] font-bold transition-all shadow-md shadow-rose-500/30 hover:-translate-y-px"
                  >
                    📵 End Call
                  </button>
                </>
              )}

              {/* ENDED */}
              {callState === STATE.ENDED && (
                <>
                  <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                    <span className="text-3xl">✅</span>
                  </div>
                  <div className="text-center">
                    <p className="text-[#111] font-semibold text-[15px] mb-1">Call ended</p>
                    <p className="text-[#888] text-[13px]">Duration: {fmt(duration)}</p>
                  </div>
                  <button onClick={reset} className="btn-primary px-10">Call Again →</button>
                </>
              )}

              {/* ERROR */}
              {callState === STATE.ERROR && (
                <>
                  <div className="w-20 h-20 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center">
                    <span className="text-3xl">⚠️</span>
                  </div>
                  <div className="text-center">
                    <p className="text-[#111] font-semibold text-[15px] mb-1">Connection failed</p>
                    <p className="text-rose-500 text-[13px] max-w-xs">{errorMsg}</p>
                  </div>
                  <button onClick={reset} className="btn-primary px-10">Try Again →</button>
                </>
              )}
            </div>

            {/* Agent strip */}
            <div
              className="flex items-center justify-between px-5 py-3 border-t"
              style={{
                background:  isActive ? 'rgba(255,255,255,0.03)' : '#faf9f7',
                borderColor: isActive ? 'rgba(255,255,255,0.07)' : '#e8e4df',
                transition:  'all 1s cubic-bezier(0.4,0,0.2,1)',
              }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#0062ff] flex items-center justify-center">
                  <span className="text-white text-[10px] font-black">RL</span>
                </div>
                <div>
                  <p style={{ color: isActive ? 'rgba(255,255,255,0.85)' : '#111', transition: 'color 1s ease' }}
                    className="text-[13px] font-semibold">RevivalLabs AI Agent</p>
                  <p style={{ color: isActive ? 'rgba(255,255,255,0.3)' : '#999', transition: 'color 1s ease' }}
                    className="text-[11px]">Powered by Retell AI · Dental Clinic</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-emerald-500 text-[11px] font-semibold uppercase tracking-wide">Live</span>
              </div>
            </div>
          </div>

          {/* Below-card CTA */}
          <div className="text-center mt-6">
            <p style={{ color: isActive ? 'rgba(255,255,255,0.35)' : '#888', transition: 'color 1s ease' }}
              className="text-[14px] mb-3">
              Ready to deploy this for your practice?
            </p>
            <button onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary">
              Get Started →
            </button>
          </div>
        </div>

        {/* ── Arini-style subtitle at bottom when active ── */}
        <div
          className="absolute bottom-8 left-0 right-0 text-center pointer-events-none"
          style={{ opacity: isActive ? 1 : 0, transition: 'opacity 1.5s ease 0.5s' }}
        >
          <p className="text-white/50 text-[15px] italic font-light">
            Hi, I'm your RevivalLabs AI receptionist.<br />
            How may I help you today?
          </p>
        </div>
      </div>

      <style>{`
        @keyframes darkBarPulse {
          0%, 100% { transform: scaleY(1);    opacity: 0.9; }
          50%       { transform: scaleY(0.68); opacity: 0.55; }
        }
      `}</style>
    </section>
  );
}
