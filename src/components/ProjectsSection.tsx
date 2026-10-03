import { useState } from 'react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<'all' | 'quant' | 'systems' | 'ai'>('all');

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <section id="projects" className="py-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10 pb-6 border-b border-white/[0.08]">
          <div className="text-xs font-mono text-cyan-400 mb-2 tracking-wider uppercase">
            Curated Engineering Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Production Architectures & Systems
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
            Engineered with extreme latency budgets, mathematical rigor, and high concurrency resilience.
          </p>

          {/* Interactive Filter Tabs - Dedicated Spacious Row */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all ${
                filter === 'all'
                  ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/50 shadow-md shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-white bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08]'
              }`}
            >
              All Flagship Projects
            </button>
            <button
              onClick={() => setFilter('quant')}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all ${
                filter === 'quant'
                  ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/50 shadow-md shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-white bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08]'
              }`}
            >
              Quant Risk Engine
            </button>
            <button
              onClick={() => setFilter('systems')}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all ${
                filter === 'systems'
                  ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/50 shadow-md shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-white bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08]'
              }`}
            >
              Distributed Systems
            </button>
            <button
              onClick={() => setFilter('ai')}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all ${
                filter === 'ai'
                  ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/50 shadow-md shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-white bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08]'
              }`}
            >
              AI Forensics
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {filteredProjects.map((project, idx) => {
            const isFeatured = idx === 0 && filter === 'all';

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`group cursor-pointer liquid-glass rounded-3xl overflow-hidden border border-white/[0.14] hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between ${
                  isFeatured ? 'lg:col-span-12' : 'lg:col-span-6'
                }`}
              >
                <div>
                  {/* Card Visual Header - Clean Unobstructed Image */}
                  <div className="relative aspect-[16/8] sm:aspect-[16/7] overflow-hidden bg-black/60">
                    <img
                      src={project.featuredImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05070D]/90 via-transparent to-black/30" />

                    {/* Clean Top Tag */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-mono text-cyan-300 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/[0.1]">
                        <span className="uppercase font-semibold">{project.category}</span>
                        <span aria-hidden="true" className="text-slate-500">·</span>
                        <span>{project.period}</span>
                      </div>

                      <div className="text-[11px] font-mono text-slate-300 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/[0.1]">
                        Inspect Specs ➔
                      </div>
                    </div>
                  </div>

                  {/* Card Content & Clean Unconflicted Typography */}
                  <div className="p-6 sm:p-7">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-display group-hover:text-cyan-300 transition-colors leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-cyan-400/90 font-mono mt-1.5 mb-4">
                      {project.subtitle}
                    </p>

                    <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                      {project.summary}
                    </p>

                    {/* Quantitative Key Metrics Bar */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-white/[0.08] mb-6">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                          <div className="text-lg font-bold font-mono text-white tabular-nums">
                            {m.value}
                          </div>
                          <div className="text-xs font-semibold text-slate-300 mt-0.5">
                            {m.label}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                            {m.detail}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bullet Highlights */}
                    <ul className="space-y-2.5 mb-4">
                      {project.highlights.slice(0, 2).map((item, hIdx) => (
                        <li key={hIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5 leading-relaxed">
                          <span className="text-cyan-400 font-mono font-bold mt-0.5">▪</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer: Tech Stack Chips & Action */}
                <div className="px-6 sm:px-7 py-4 bg-white/[0.02] border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-1.5 font-mono text-slate-400">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="text-[11px] text-slate-500 font-mono">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>

                  <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Deep Dive</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
