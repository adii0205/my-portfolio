import { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export function LiquidGlassPortraitCard() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [customAvatar, setCustomAvatar] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('aditya_exact_photo');
    if (saved) setCustomAvatar(saved);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Subtle 3D tilt (max 8 degrees)
    setRotateX((-y / (rect.height / 2)) * 8);
    setRotateY((x / (rect.width / 2)) * 8);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const activeAvatar = customAvatar || PORTFOLIO_DATA.personal.avatar;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
      className="relative w-full max-w-md mx-auto group select-none"
    >
      {/* Outer ambient glow reacting to card position */}
      <div 
        className="absolute -inset-2 bg-gradient-to-r from-cyan-500/25 via-blue-600/20 to-indigo-500/25 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" 
      />

      {/* 3D Liquid Glass Card Body */}
      <div
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
        }}
        className="relative liquid-glass rounded-3xl p-6 sm:p-7 border border-white/[0.18] shadow-2xl overflow-hidden backdrop-blur-2xl"
      >
        {/* Dynamic Specular Sheen (iOS Liquid Glass reflection) */}
        <div 
          className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/[0.08] via-transparent to-white/[0.14] opacity-80 mix-blend-overlay"
        />

        {/* Top Holographic HUD Bar */}
        <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/[0.08] text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-semibold">ADITYA JAISWAL</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsScanning((prev) => !prev)}
              className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider transition-colors ${
                isScanning
                  ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/50'
                  : 'bg-white/[0.06] text-slate-400 hover:text-white border border-white/[0.08]'
              }`}
            >
              {isScanning ? 'HUD: ON' : 'Biometric HUD'}
            </button>
          </div>
        </div>

        {/* Portrait Image Frame */}
        <div className="relative z-10 mt-5 rounded-2xl overflow-hidden aspect-square border border-white/[0.14] bg-[#05070D] shadow-inner group">
          <img
            src={activeAvatar}
            alt="Aditya Jaiswal"
            className="w-full h-full object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />

          {/* Liquid Glass Tint Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070D]/90 via-[#05070D]/10 to-transparent pointer-events-none" />

          {/* Holographic Scanline Effect */}
          {isScanning && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="w-full h-1 bg-cyan-400/80 shadow-[0_0_15px_#22d3ee] animate-[bounce_2.5s_infinite]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(6,182,212,0.06)_51%)] bg-[size:100%_4px]" />
              <div className="absolute top-3 left-3 text-[10px] font-mono text-cyan-300 bg-black/70 px-2 py-0.5 rounded border border-cyan-500/30">
                AI RECOGNITION: ADITYA JAISWAL (IIIT PUNE)
              </div>
              <div className="absolute bottom-12 right-3 text-[10px] font-mono text-emerald-400 bg-black/70 px-2 py-0.5 rounded border border-emerald-500/30">
                BIOMETRICS: CONFIRMED
              </div>
            </div>
          )}

          {/* Bottom HUD info overlay inside portrait */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-xs font-mono">
            <div>
              <div className="text-[10px] text-cyan-400 font-bold tracking-wider uppercase">
                Systems & Quant Engineer
              </div>
              <div className="text-white font-bold text-sm">IIIT Pune CSE '28</div>
            </div>

            <div className="text-right">
              <span className="text-[10px] px-2 py-0.5 rounded bg-black/60 border border-white/[0.12] text-slate-300">
                CGPA 8.06
              </span>
            </div>
          </div>
        </div>

        {/* Technical Attributes Grid - Distinct Isolated Rows to Prevent Merging */}
        <div className="relative z-10 mt-5 space-y-2.5 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <span className="text-slate-400 font-mono text-[11px]">Primary Domain</span>
            <span className="font-mono text-cyan-300 font-semibold text-[11px]">
              GPU Risk Engines & Distributed Systems
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="text-[10px] text-slate-400 font-mono">JEE Main 2024</div>
              <div className="text-xs font-bold font-mono text-white mt-0.5">
                98.38%tile (Top 1.6%)
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="text-[10px] text-slate-400 font-mono">Competitive Coding</div>
              <div className="text-xs font-bold font-mono text-emerald-400 mt-0.5">
                500+ Solved
              </div>
            </div>
          </div>
        </div>

        {/* Social Quick Links */}
        <div className="relative z-10 mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3">
            <a
              href={PORTFOLIO_DATA.personal.socials.github}
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <span>GitHub</span>
              <span className="text-[10px]">↗</span>
            </a>
            <span className="text-slate-600">·</span>
            <a
              href={PORTFOLIO_DATA.personal.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <span>LinkedIn</span>
              <span className="text-[10px]">↗</span>
            </a>
            <span className="text-slate-600">·</span>
            <a
              href={PORTFOLIO_DATA.personal.socials.leetcode}
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <span>LeetCode</span>
              <span className="text-[10px]">↗</span>
            </a>
          </div>

          <div className="text-[11px] text-slate-500">
            Pune, IN
          </div>
        </div>
      </div>
    </div>
  );
}
