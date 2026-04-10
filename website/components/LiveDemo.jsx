'use client';
import { useState, useEffect, useRef } from 'react';
import { useInView } from '@/hooks/useInView';

const industries = ['Dental Office','Med Spa','Law Firm','Home Services','Medical Clinic','Retail Store','Real Estate','Fitness Studio'];

const greetings = {
  'Dental Office':    "Thank you for calling Bright Smile Dental! I'm your AI scheduling assistant — I can book appointments, answer insurance questions, or help with anything else. How can I help?",
  'Med Spa':          "Welcome to Serenity Med Spa! I'm your virtual assistant. I can book a consultation, share treatment info, or check availability. What can I do for you?",
  'Law Firm':         "Thank you for calling Thompson Law Group. I'm the AI intake assistant. I can collect your case details or schedule a consultation with an attorney. How may I assist you?",
  'Home Services':    "Hi, thanks for calling! I'm the scheduling assistant — I can book a service visit, get you a quote, or answer questions about what we offer. What are you looking for?",
  'Medical Clinic':   "Hello, thank you for calling. I'm the virtual receptionist — I can schedule appointments, handle refill requests, or direct you to the right department. How can I assist?",
  'Retail Store':     "Hi! I can help with product availability, store hours, orders, or connect you with a team member. What do you need today?",
  'Real Estate':      "Hello! I'm the AI property assistant — I can schedule viewings, answer listing questions, or connect you with an agent. How can I help?",
  'Fitness Studio':   "Hey there! I'm the studio assistant — I can sign you up for classes, check the schedule, or answer membership questions. What are you looking for?",
};

const flows = {
  'Dental Office': [
    { ai: false, text: "Hi, I'd like to book a cleaning." },
    { ai: true,  text: "Of course! Can I get your name?" },
    { ai: false, text: "Jennifer Adams." },
    { ai: true,  text: "Hi Jennifer! Are you an existing patient or new?" },
    { ai: false, text: "Existing patient." },
    { ai: true,  text: "Perfect. Do you have a preferred date or time?" },
    { ai: false, text: "Next Tuesday around 2pm." },
    { ai: true,  text: "Tuesday at 2 PM is open! Can I get a callback number to confirm?" },
    { ai: false, text: "Sure — 555-210-4488." },
    { ai: true,  text: "Done, Jennifer! You're booked for Tuesday at 2 PM. A confirmation text is on its way. Anything else?" },
  ],
  default: [
    { ai: false, text: "Hi, I'd like to book an appointment." },
    { ai: true,  text: "Happy to help! Can I start with your name?" },
    { ai: false, text: "Marcus Williams." },
    { ai: true,  text: "Hi Marcus! What are you looking to schedule, and when works best?" },
    { ai: false, text: "Sometime this week if possible." },
    { ai: true,  text: "I have Thursday at 3 PM and Friday morning open — which works?" },
    { ai: false, text: "Thursday at 3." },
    { ai: true,  text: "Perfect — Thursday at 3 PM it is. Can I get your number for confirmation?" },
    { ai: false, text: "555-308-7722." },
    { ai: true,  text: "You're all set, Marcus! Confirmation message coming right up. Anything else I can help with?" },
  ],
};

export default function LiveDemo() {
  const [industry, setIndustry] = useState('');
  const [mode, setMode] = useState('idle');
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [typing, setTyping] = useState(false);
  const timerRef = useRef(null);
  const bottomRef = useRef(null);
  const [hRef, inView] = useInView(0.1);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [step, typing]);

  const flow = flows[industry] || flows.default;

  const reset = () => { clearTimeout(timerRef.current); setMode('idle'); setStep(0); setPlaying(false); setTyping(false); };

  const startGreeting = () => { if (!industry) return; reset(); setMode('greeting'); };

  const simulateCall = () => {
    if (!industry || playing) return;
    reset();
    setMode('call'); setStep(0); setPlaying(true);
    let s = 0;
    const next = () => {
      const nextIsAI = flow[s + 1]?.ai;
      if (nextIsAI) {
        setTyping(true);
        timerRef.current = setTimeout(() => { setTyping(false); s++; setStep(s); timerRef.current = s < flow.length - 1 ? setTimeout(next, 2000) : (setPlaying(false), null); }, 1200);
      } else {
        s++; setStep(s);
        timerRef.current = s < flow.length - 1 ? setTimeout(next, 2000) : (setPlaying(false), null);
      }
    };
    timerRef.current = setTimeout(next, 1600);
  };

  return (
    <section id="demo" className="bg-slate-950 py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div ref={hRef} className="text-center mb-14">
          <p className={`text-[11px] font-bold uppercase tracking-widest text-violet-400 mb-3 reveal d-0 ${inView ? 'visible' : ''}`}>
            Interactive Demo
          </p>
          <h2 className={`text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-4 reveal d-75 ${inView ? 'visible' : ''}`}>
            Hear it for yourself.
          </h2>
          <p className={`text-slate-400 text-base font-light max-w-md mx-auto reveal d-150 ${inView ? 'visible' : ''}`}>
            Select your industry and simulate a live inbound call with your custom AI agent.
          </p>
        </div>

        {/* Console */}
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl border border-white/10 overflow-hidden shadow-2xl shadow-violet-500/10">
            {/* Titlebar */}
            <div className="bg-white/5 border-b border-white/8 px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <span className="text-slate-400 text-xs font-medium">RevivalLabs.ai — Demo Console</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-[11px] font-semibold">LIVE</span>
              </div>
            </div>

            <div className="p-6 space-y-6 bg-slate-950">
              {/* Step 1 */}
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">01 — Select Industry</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {industries.map((ind) => (
                    <button key={ind} onClick={() => { setIndustry(ind); reset(); }}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                        industry === ind
                          ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                          : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-violet-500/40'
                      }`}>
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2 */}
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">02 — Choose Mode</p>
                <div className="flex flex-wrap gap-2">
                  <button onClick={startGreeting} disabled={!industry}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold hover:border-violet-400/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                    🎙 Sample Greeting
                  </button>
                  <button onClick={simulateCall} disabled={!industry || playing}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold hover:bg-violet-500 transition-all shadow-lg shadow-violet-500/25 disabled:opacity-30 disabled:cursor-not-allowed">
                    📞 {playing ? 'In progress…' : 'Simulate Call'}
                  </button>
                  {mode !== 'idle' && (
                    <button onClick={reset} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-xs hover:text-white transition-all">
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Output */}
              <div className="min-h-[140px]">
                {mode === 'idle' && (
                  <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
                    <div className="text-4xl mb-3">🎙</div>
                    <p className="text-slate-500 text-sm">Pick an industry and choose a demo mode above</p>
                  </div>
                )}

                {mode === 'greeting' && industry && (
                  <div className="rounded-2xl bg-white/5 border border-violet-500/20 p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0 text-sm shadow-md shadow-violet-500/30">🤖</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-violet-400 text-xs font-bold">AI Receptionist</span>
                          <span className="badge badge-violet">{industry}</span>
                        </div>
                        <p className="text-slate-200 text-sm leading-relaxed">{greetings[industry]}</p>
                        <div className="flex items-center gap-0.5 mt-4">
                          <span className="text-slate-500 text-[11px] mr-2">Speaking</span>
                          {[...Array(20)].map((_, i) => (
                            <div key={i} className="w-0.5 bg-violet-500 rounded-full"
                              style={{ height: `${Math.floor(Math.sin(i * 0.8) * 8 + 12)}px`, animation: `wave 1.1s ease-in-out ${i * 0.06}s infinite` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {mode === 'call' && (
                  <div className="rounded-2xl bg-white/5 border border-white/8 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/8">
                      <span className="text-white text-xs font-semibold">Call Simulation — {industry}</span>
                      {playing ? (
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                          <span className="text-red-400 text-[11px] font-bold">REC</span>
                        </div>
                      ) : step >= flow.length - 1 ? <span className="text-green-400 text-[11px] font-bold">✓ ENDED</span> : null}
                    </div>
                    <div className="p-4 space-y-2.5 max-h-64 overflow-y-auto">
                      {flow.slice(0, step + 1).map((msg, i) => (
                        <div key={i} className={`flex ${msg.ai ? 'justify-start' : 'justify-end'}`}>
                          <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-xs ${
                            msg.ai
                              ? 'bg-gradient-to-r from-violet-700/60 to-indigo-700/60 text-white rounded-bl-sm border border-violet-500/20'
                              : 'bg-white/10 text-slate-200 rounded-br-sm'
                          }`}>
                            <span className="block text-[10px] font-bold mb-1 opacity-50">{msg.ai ? '🤖 AI' : '👤 Caller'}</span>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      {typing && (
                        <div className="flex justify-start">
                          <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-violet-700/30 border border-violet-500/20">
                            <div className="flex gap-1">
                              {[0,150,300].map((d) => (
                                <div key={d} className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={bottomRef} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-950 border-t border-white/5 text-center">
              <p className="text-slate-600 text-[11px]">Interactive simulation. Your live agent is fully custom to your practice.</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-slate-400 text-sm mb-4">Ready to deploy this for your practice?</p>
            <button onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary">
              Get started →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
