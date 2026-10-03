import { PORTFOLIO_DATA } from '../data/portfolioData';

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono text-cyan-400 mb-2 tracking-wider uppercase">
              Competitive Honors & Milestones
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Rankings & Algorithmic Track Record
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
              National competitive examinations, speed mental arithmetic, and continuous algorithmic problem solving.
            </p>
          </div>
        </div>

        {/* 3-Column Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.achievements.map((item, idx) => (
            <div
              key={item.title}
              className="liquid-glass rounded-2xl p-6 flex flex-col justify-between border border-white/[0.08] hover:border-cyan-400/30 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-4">
                  <span>0{idx + 1}</span>
                  <span className="text-slate-400">{item.badge}</span>
                </div>

                <h3 className="text-xl font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>

                <div className="text-2xl font-extrabold text-white font-mono tabular-nums mt-3">
                  {item.rank}
                </div>

                <div className="text-xs font-semibold text-cyan-400 mt-1">
                  {item.highlight}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mt-4">
                  {item.detail}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Verified Credential</span>
                <span className="text-cyan-400">Validated ✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
