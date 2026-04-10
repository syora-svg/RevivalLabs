'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from '@/hooks/useInView';

const INDUSTRIES = [
  'Dental Office', 'Med Spa', 'Law Firm', 'Home Services',
  'Medical Clinic', 'Retail Store', 'Real Estate', 'Fitness Studio',
];

// Call state machine
const STATE = {
  IDLE:        'idle',
  CONNECTING:  'connecting',
  ACTIVE:      'active',
  ENDED:       'ended',
  ERROR:       'error',
};

export default function LiveDemo() {
  const [industry, setIndustry]       = useState('Dental Office');
  const [callState, setCallState]     = useState(STATE.IDLE);
  const [agentTalking, setAgentTalking] = useState(false);
  const [errorMsg, setErrorMsg]       = useState('');
  const [duration, setDuration]       = useState(0);

  const clientRef  = useRef(null);
  const timerRef   = useRef(null);
  const [hRef, inView] = useInView(0.1);

  // Timer while call is active
  useEffect(() => {
    if (callState === STATE.ACTIVE) {
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000);
    } else {
      clearInterval(timerRef.current);
      if (callState !== STATE.ACTIVE) setDuration(0);
    }
    return () => clearInterval(timerRef.current);
  }, [callState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => { clientRef.current?.stopCall(); clearInterval(timerRef.current); };
  }, []);

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`;

  const startCall = useCallback(async () => {
    setCallState(STATE.CONNECTING);
    setErrorMsg('');

    try {
      // Dynamically import SDK (client-only)
      const { RetellWebClient } = await import('retell-client-js-sdk');

      // Get access token from our server
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
        console.error('Retell error:', err);
        setErrorMsg(err?.message || 'Call error — please try again.');
        setCallState(STATE.ERROR);
      });

      await retell.startCall({ accessToken: access_token });
    } catch (err) {
      console.error('startCall error:', err);
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

  return (
    <section id="demo" className="bg-slate-950 py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div ref={hRef} className="text-center mb-14">
          <p className={`text-[11px] font-bold uppercase tracking-widest text-violet-400 mb-3 reveal d-0 ${inView ? 'visible' : ''}`}>
            Live Demo
          </p>
          <h2 className={`text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-4 reveal d-75 ${inView ? 'visible' : ''}`}>
            Talk to the AI.<br />Right now.
          </h2>
          <p className={`text-slate-400 text-base font-light max-w-sm mx-auto reveal d-150 ${inView ? 'visible' : ''}`}>
            This is your real Retell AI agent. Click start and speak — no scripts, no simulation.
          </p>
        </div>

        {/* Console */}
        <div className="max-w-2xl mx-auto">
          <div className="rounded-3xl border border-white/10 overflow-hidden shadow-2xl shadow-violet-500/10">

            {/* Title bar */}
            <div className="bg-white/5 border-b border-white/8 px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <span className="text-slate-400 text-xs font-medium">RevivalLabs.ai — Live Call Console</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${callState === STATE.ACTIVE ? 'bg-red-500 animate-pulse' : 'bg-green-400 animate-pulse'}`} />
                <span className={`text-[11px] font-semibold ${callState === STATE.ACTIVE ? 'text-red-400' : 'text-green-400'}`}>
                  {callState === STATE.ACTIVE ? `LIVE · ${fmt(duration)}` : 'READY'}
                </span>
              </div>
            </div>

            <div className="p-8 bg-slate-950 space-y-7">

              {/* Industry selector */}
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Select Industry</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {INDUSTRIES.map((ind) => (
                    <button
                      key={ind}
                      onClick={() => { if (callState === STATE.IDLE || callState === STATE.ENDED || callState === STATE.ERROR) setIndustry(ind); }}
                      disabled={callState === STATE.CONNECTING || callState === STATE.ACTIVE}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                        industry === ind
                          ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                          : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-violet-500/40 disabled:opacity-40 disabled:cursor-not-allowed'
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              {/* Call UI */}
              <div className="rounded-2xl bg-white/5 border border-white/8 p-7 flex flex-col items-center gap-6">

                {/* IDLE */}
                {callState === STATE.IDLE && (
                  <>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-2xl shadow-violet-500/40">
                      <span className="text-3xl">🎙️</span>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-semibold text-sm mb-1">Ready to connect</p>
                      <p className="text-slate-500 text-xs">Your microphone will be requested when you start</p>
                    </div>
                    <button onClick={startCall} className="btn-primary px-10">
                      Start Live Call →
                    </button>
                  </>
                )}

                {/* CONNECTING */}
                {callState === STATE.CONNECTING && (
                  <>
                    <div className="w-20 h-20 rounded-full bg-white/5 border-2 border-violet-500/40 flex items-center justify-center relative">
                      <div className="absolute inset-0 rounded-full border-2 border-violet-500/30 animate-ping" />
                      <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-semibold text-sm mb-1">Connecting to AI agent…</p>
                      <p className="text-slate-500 text-xs">Allow microphone access when prompted</p>
                    </div>
                  </>
                )}

                {/* ACTIVE */}
                {callState === STATE.ACTIVE && (
                  <>
                    {/* Waveform */}
                    <div className="flex flex-col items-center gap-4 w-full">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
                        agentTalking
                          ? 'bg-gradient-to-br from-violet-600 to-indigo-600 shadow-violet-500/50 scale-110'
                          : 'bg-white/10 border border-white/20'
                      }`}>
                        <span className="text-3xl">{agentTalking ? '🤖' : '🎙️'}</span>
                      </div>

                      {/* Audio bars */}
                      <div className="flex items-center gap-1 h-10">
                        {[...Array(28)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-0.5 rounded-full transition-all ${agentTalking ? 'bg-violet-400' : 'bg-slate-600'}`}
                            style={{
                              height: agentTalking
                                ? `${Math.floor(Math.sin(i * 0.7 + Date.now() * 0.005) * 14 + 18)}px`
                                : '4px',
                              animation: agentTalking ? `wave 0.9s ease-in-out ${i * 0.04}s infinite` : 'none',
                            }}
                          />
                        ))}
                      </div>

                      <p className="text-sm font-semibold text-white">
                        {agentTalking ? '🤖 AI is speaking…' : '🎙️ Listening…'}
                      </p>
                    </div>

                    <button
                      onClick={endCall}
                      className="flex items-center gap-2 px-8 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-px"
                    >
                      📵 End Call
                    </button>
                  </>
                )}

                {/* ENDED */}
                {callState === STATE.ENDED && (
                  <>
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                      <span className="text-3xl">✅</span>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-semibold text-sm mb-1">Call ended</p>
                      <p className="text-slate-400 text-xs">Duration: {fmt(duration)}</p>
                    </div>
                    <button onClick={reset} className="btn-primary px-10">
                      Call Again →
                    </button>
                  </>
                )}

                {/* ERROR */}
                {callState === STATE.ERROR && (
                  <>
                    <div className="w-20 h-20 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                      <span className="text-3xl">⚠️</span>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-semibold text-sm mb-1">Connection failed</p>
                      <p className="text-red-400 text-xs max-w-xs">{errorMsg}</p>
                    </div>
                    <button onClick={reset} className="btn-primary px-10">
                      Try Again →
                    </button>
                  </>
                )}
              </div>

              {/* Agent info strip */}
              <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/8">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                    <span className="text-white text-[10px] font-black">RL</span>
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">RevivalLabs AI Agent</p>
                    <p className="text-slate-500 text-[10px]">Powered by Retell AI · {industry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-[10px] font-semibold uppercase tracking-wide">Live</span>
                </div>
              </div>

            </div>

            <div className="px-6 py-3 bg-slate-950 border-t border-white/5 text-center">
              <p className="text-slate-600 text-[11px]">This is your real Retell AI agent. All calls are private and HIPAA-compliant.</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-slate-400 text-sm mb-4">Ready to deploy this for your practice?</p>
            <button onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary">
              Get Started →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
