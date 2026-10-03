import { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export function SkillMatrix() {
  const [activeCategory, setActiveCategory] = useState<string>('Quant & Finance');

  const currentCategoryData = PORTFOLIO_DATA.skills.find(
    (c) => c.category === activeCategory
  ) || PORTFOLIO_DATA.skills[1];

  return (
    <section id="skills" className="py-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono text-cyan-400 mb-2 tracking-wider uppercase">
              Technical Competence & Knowledge Graph
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Skills, Mathematical Foundations & Stack
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
              Systems programming, quantitative stochastic modeling, low-latency microservices, and academic coursework from IIIT Pune.
            </p>
          </div>

          <div className="mt-4 md:mt-0 font-mono text-xs text-slate-400">
            IIIT Pune CGPA: <span className="text-cyan-300 font-bold">8.06 / 10.0</span>
          </div>
        </div>

        {/* Liquid Glass Interactive Container */}
        <div className="liquid-glass rounded-2xl p-6 lg:p-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-white/[0.08] scrollbar-none">
            {PORTFOLIO_DATA.skills.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
                  activeCategory === cat.category
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 shadow-sm'
                    : 'text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.06]'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>

          {/* Active Category Header */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white font-display">
              {currentCategoryData.category}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {currentCategoryData.description}
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentCategoryData.skills.map((skill) => (
              <div
                key={skill.name}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white font-mono">
                    {skill.name}
                  </span>
                  <span className="text-xs font-mono text-cyan-400 tabular-nums">
                    {skill.level}% depth
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                {skill.note && (
                  <div className="text-xs text-slate-400">
                    {skill.note}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Coursework Accordion / Drawer */}
          <div className="mt-8 pt-6 border-t border-white/[0.08]">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Relevant Academic Coursework (IIIT Pune)
            </div>
            <div className="flex flex-wrap gap-2">
              {PORTFOLIO_DATA.coursework.map((course) => (
                <span
                  key={course}
                  className="px-2.5 py-1 text-xs text-slate-300 bg-white/[0.03] border border-white/[0.06] rounded-lg"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
