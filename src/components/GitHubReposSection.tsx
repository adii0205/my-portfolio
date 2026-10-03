import { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export function GitHubReposSection() {
  const [filter, setFilter] = useState<'all' | 'flagship' | 'dsa' | 'ai'>('all');
  const [search, setSearch] = useState('');
  const [copiedRepo, setCopiedRepo] = useState<string | null>(null);

  const handleCopyClone = (repoName: string) => {
    navigator.clipboard.writeText(`git clone https://github.com/adii0205/${repoName}.git`);
    setCopiedRepo(repoName);
    setTimeout(() => setCopiedRepo(null), 2000);
  };

  const filteredRepos = PORTFOLIO_DATA.githubRepos.filter((repo) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'flagship' && repo.featured) ||
      (filter === 'dsa' && (repo.tags.includes('Algorithms') || repo.tags.includes('Data Compression') || repo.tags.includes('Inverted Index') || repo.tags.includes('DSA'))) ||
      (filter === 'ai' && (repo.tags.includes('AI') || repo.tags.includes('Computer Vision') || repo.tags.includes('Audio AI') || repo.tags.includes('Machine Learning')));

    const matchesSearch =
      search === '' ||
      repo.name.toLowerCase().includes(search.toLowerCase()) ||
      repo.description.toLowerCase().includes(search.toLowerCase()) ||
      repo.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <section id="repositories" className="py-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono text-cyan-400 mb-2 tracking-wider uppercase">
              Scanned GitHub Ecosystem · @adii0205
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Open-Source Repositories & Implementations
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
              Real public repositories from Aditya's GitHub profile, spanning GPU fragment shaders, distributed load balancers, algorithmic data structures, and computer vision forensics.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <a
              href="https://github.com/adii0205"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-xs font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] rounded-xl transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <span>Explore github.com/adii0205</span>
              <span className="text-xs font-mono">↗</span>
            </a>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] border border-white/[0.08] rounded-xl w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Repos ({PORTFOLIO_DATA.githubRepos.length})
            </button>
            <button
              onClick={() => setFilter('flagship')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === 'flagship'
                  ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Flagship Core
            </button>
            <button
              onClick={() => setFilter('dsa')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === 'dsa'
                  ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Algorithms & Math
            </button>
            <button
              onClick={() => setFilter('ai')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === 'ai'
                  ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              AI & Vision
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search repositories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3.5 py-1.5 text-xs bg-white/[0.04] border border-white/[0.1] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-mono"
            />
          </div>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRepos.map((repo) => (
            <div
              key={repo.name}
              className="liquid-glass rounded-2xl p-5 border border-white/[0.08] hover:border-cyan-400/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-base font-bold text-white font-mono hover:text-cyan-300 transition-colors group-hover:underline break-all"
                  >
                    {repo.name}
                  </a>

                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 rounded bg-white/[0.04] hover:bg-white/[0.1] text-slate-400 hover:text-white text-xs shrink-0"
                    title="View on GitHub"
                  >
                    ↗
                  </a>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                  {repo.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {repo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] border border-white/[0.06] text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Meta */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>{repo.language}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleCopyClone(repo.repoName)}
                    className="hover:text-cyan-300 transition-colors"
                    title="Copy git clone"
                  >
                    {copiedRepo === repo.repoName ? 'Cloned ✓' : 'Clone'}
                  </button>
                  <span className="text-slate-600">·</span>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline"
                  >
                    GitHub ➔
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
