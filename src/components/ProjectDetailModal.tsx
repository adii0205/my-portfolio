import { useEffect } from 'react';
import { Project } from '../data/portfolioData';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onJumpToLab?: (labId: string) => void;
}

export function ProjectDetailModal({ project, onClose, onJumpToLab }: ProjectDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Blurred Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#05070D]/80 backdrop-blur-xl transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Sheet Container */}
      <div className="relative w-full max-w-4xl liquid-glass rounded-2xl p-6 sm:p-8 z-10 border border-white/[0.15] shadow-2xl max-h-[90vh] overflow-y-auto my-auto animate-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="flex items-start justify-between pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
              <span className="uppercase">{project.category}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{project.period}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {project.title}
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/[0.1] text-slate-400 hover:text-white flex items-center justify-center transition-all ml-4 shrink-0 text-sm"
          >
            ✕
          </button>
        </div>

        {/* Hero Visual */}
        <div className="mt-6 rounded-xl overflow-hidden aspect-[16/8] border border-white/[0.1] bg-black/60 relative">
          <img
            src={project.featuredImage}
            alt={project.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070D]/90 via-[#05070D]/20 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
            <span className="text-xs font-mono text-cyan-300 bg-black/70 px-3 py-1 rounded border border-white/[0.1]">
              Verified Production Metrics
            </span>
            {project.id === 'quant-risk' && onJumpToLab && (
              <button
                onClick={() => {
                  onClose();
                  onJumpToLab('quant-lab');
                }}
                className="px-3.5 py-1.5 text-xs font-semibold text-[#05070D] bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-all"
              >
                Launch Monte Carlo Shader →
              </button>
            )}
            {project.id === 'distributed-shortener' && onJumpToLab && (
              <button
                onClick={() => {
                  onClose();
                  onJumpToLab('systems-lab');
                }}
                className="px-3.5 py-1.5 text-xs font-semibold text-[#05070D] bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-all"
              >
                Test 2,100 req/s Balancer →
              </button>
            )}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          {project.metrics.map((m) => (
            <div key={m.label} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-xl font-bold font-mono text-white tabular-nums">
                {m.value}
              </div>
              <div className="text-xs font-semibold text-slate-300 mt-0.5">
                {m.label}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {m.detail}
              </div>
            </div>
          ))}
        </div>

        {/* In-depth Highlights */}
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3">
              Engineering Achievements & Implementation
            </h4>
            <div className="space-y-3">
              {project.highlights.map((highlight, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-3">
                  <span className="text-cyan-400 font-mono font-bold mt-0.5">0{idx + 1}.</span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Architecture Flow */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3">
              System Pipeline Architecture
            </h4>
            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.08] space-y-2">
              {project.architecture.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="font-mono text-slate-500 shrink-0">Stage {idx + 1} ➔</span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack List */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3">
              Technologies & Tooling
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs">
          <span className="text-slate-400">
            Aditya Jaiswal · Engineering Portfolio
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-medium transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
