import { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export function TechStackMarquee() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const row1 = PORTFOLIO_DATA.allTechStack.slice(0, 13);
  const row2 = PORTFOLIO_DATA.allTechStack.slice(13);

  // Duplicate for seamless infinite loop
  const infiniteRow1 = [...row1, ...row1, ...row1];
  const infiniteRow2 = [...row2, ...row2, ...row2];

  return (
    <section className="py-14 relative overflow-hidden border-y border-white/[0.08] bg-[#030509]/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
            Core Competencies & Tooling
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            Technologies, Frameworks & Algorithmic Tooling
          </h3>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 rounded-full w-fit">
          26 Production Technologies
        </div>
      </div>

      {/* Row 1: Moving Left */}
      <div className="relative w-full overflow-hidden py-2 mask-gradient group">
        <div className="flex gap-3 w-max animate-marquee-left group-hover:[animation-play-state:paused]">
          {infiniteRow1.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              onClick={() => setSelectedTech(selectedTech === item.name ? null : item.name)}
              className={`px-4 py-2 rounded-xl liquid-glass-subtle border cursor-pointer transition-all duration-200 flex items-center gap-2.5 whitespace-nowrap ${
                selectedTech === item.name
                  ? 'border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/20 text-white'
                  : 'border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.06] text-slate-300'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-xs font-semibold font-mono">{item.name}</span>
              <span className="text-[10px] text-slate-500 font-mono px-1.5 py-0.5 rounded bg-white/[0.04]">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Moving Right */}
      <div className="relative w-full overflow-hidden py-2 mask-gradient group mt-3">
        <div className="flex gap-3 w-max animate-marquee-right group-hover:[animation-play-state:paused]">
          {infiniteRow2.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              onClick={() => setSelectedTech(selectedTech === item.name ? null : item.name)}
              className={`px-4 py-2 rounded-xl liquid-glass-subtle border cursor-pointer transition-all duration-200 flex items-center gap-2.5 whitespace-nowrap ${
                selectedTech === item.name
                  ? 'border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/20 text-white'
                  : 'border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.06] text-slate-300'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-xs font-semibold font-mono">{item.name}</span>
              <span className="text-[10px] text-slate-500 font-mono px-1.5 py-0.5 rounded bg-white/[0.04]">
                {item.level}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Tech Callout */}
      {selectedTech && (
        <div className="max-w-md mx-auto mt-6 p-3 rounded-xl liquid-glass border border-cyan-400/40 text-center animate-in fade-in">
          <span className="text-xs font-mono text-cyan-300">
            Focused Stack Item: <strong className="text-white">{selectedTech}</strong> — Applied across Aditya's production repositories on GitHub.
          </span>
        </div>
      )}
    </section>
  );
}
