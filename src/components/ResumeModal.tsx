import { useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#05070D]/80 backdrop-blur-xl animate-in fade-in"
      />

      <div className="relative w-full max-w-4xl liquid-glass rounded-2xl p-6 sm:p-10 z-10 border border-white/[0.16] shadow-2xl max-h-[92vh] overflow-y-auto my-auto animate-in zoom-in-95">
        {/* Modal Top Actions */}
        <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400">CURRICULUM VITAE</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-xs text-slate-300">IIIT Pune</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/[0.1] text-slate-400 hover:text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
            title="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Clean Paper-like Document Presentation */}
        <div id="printable-resume-document" className="mt-6 text-slate-200 space-y-8 font-sans p-4 sm:p-6 rounded-xl bg-[#070b14]/90 border border-white/[0.05]">
          {/* Header */}
          <div className="text-center pb-6 border-b border-white/[0.1]">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
              ADITYA JAISWAL
            </h1>
            <div className="text-xs font-mono text-slate-400 mt-1">
              Pune, Maharashtra · {PORTFOLIO_DATA.personal.phone} · {PORTFOLIO_DATA.personal.email}
            </div>
            <div className="flex items-center justify-center gap-4 text-xs font-mono text-cyan-400 mt-2">
              <a href={PORTFOLIO_DATA.personal.socials.linkedin} target="_blank" rel="noreferrer" className="hover:underline hover:text-cyan-300">LinkedIn</a>
              <span>·</span>
              <a href={PORTFOLIO_DATA.personal.socials.github} target="_blank" rel="noreferrer" className="hover:underline hover:text-cyan-300">GitHub</a>
              <span>·</span>
              <a href={PORTFOLIO_DATA.personal.socials.leetcode} target="_blank" rel="noreferrer" className="hover:underline hover:text-cyan-300">LeetCode</a>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold mb-3 border-b border-white/[0.08] pb-1">
              Education
            </h2>
            <div className="flex justify-between items-baseline flex-wrap">
              <div className="font-bold text-white text-base">
                Indian Institute of Information Technology, Pune
              </div>
              <div className="text-xs font-mono text-slate-400">
                Aug 2024 – May 2028 · Pune, India
              </div>
            </div>
            <div className="text-xs font-medium text-slate-300 mt-0.5">
              B.Tech in Computer Science and Engineering — <span className="text-cyan-300 font-mono font-bold">CGPA: 8.06 / 10.0</span>
            </div>
            <div className="text-xs text-slate-400 mt-2 leading-relaxed">
              <strong className="text-slate-300">Relevant Coursework:</strong> {PORTFOLIO_DATA.coursework.join(', ')}.
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold mb-3 border-b border-white/[0.08] pb-1">
              Technical Skills
            </h2>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div>
                <strong className="text-white font-mono">Languages:</strong> C++, Python, TypeScript, JavaScript, SQL, C, Java, HTML, CSS, Bash
              </div>
              <div>
                <strong className="text-white font-mono">Quant & Finance:</strong> Monte Carlo simulation, VaR / Expected Shortfall, GARCH / GJR-GARCH, Heston stochastic volatility, regime-switching (HMM), copulas, Extreme Value Theory, straddle and strangle strategies in options trading, Black-Scholes Greeks, backtesting (Kupiec, Christoffersen)
              </div>
              <div>
                <strong className="text-white font-mono">ML/AI:</strong> PyTorch, TensorFlow, Scikit-learn, Model Deployment, 2D-FFT frequency forensics, C2PA v2.1
              </div>
              <div>
                <strong className="text-white font-mono">Backend & Databases:</strong> Node.js, Express.js, FastAPI, REST, GraphQL, PostgreSQL, Redis, Indexing / Query Optimisation
              </div>
              <div>
                <strong className="text-white font-mono">Systems & Tools:</strong> WebGL (GPGPU), Docker, Nginx, Git, GitHub Actions (CI/CD), Linux, Jest
              </div>
              <div>
                <strong className="text-white font-mono">CS Fundamentals:</strong> Data Structures & Algorithms, OOP, Rate Limiting, Horizontal Scaling
              </div>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold mb-4 border-b border-white/[0.08] pb-1">
              Projects
            </h2>
            <div className="space-y-6">
              {PORTFOLIO_DATA.projects.map((proj) => (
                <div key={proj.id} className="space-y-2">
                  <div className="flex justify-between items-baseline flex-wrap">
                    <div className="font-bold text-white text-sm">
                      {proj.title}
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      {proj.period}
                    </div>
                  </div>
                  <div className="text-xs font-mono text-cyan-300">
                    {proj.technologies.join(' · ')}
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300 pl-4 list-disc">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="leading-relaxed">
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold mb-3 border-b border-white/[0.08] pb-1">
              Achievements
            </h2>
            <div className="space-y-3 text-xs text-slate-300">
              {PORTFOLIO_DATA.achievements.map((ach) => (
                <div key={ach.title}>
                  <div className="font-bold text-white">
                    {ach.title} | <span className="text-cyan-300 font-mono">{ach.rank}</span>
                  </div>
                  <p className="mt-0.5 text-slate-400">
                    • {ach.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer print note */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] text-center text-xs font-mono text-slate-500 print:hidden">
          Curriculum Vitae verified for Aditya Jaiswal · IIIT Pune
        </div>
      </div>
    </div>
  );
}
