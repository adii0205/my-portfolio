import { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { LiquidGlassPortraitCard } from './LiquidGlassPortraitCard';

interface HeroProps {
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export function Hero({ onOpenContact, onOpenResume }: HeroProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-12 pb-20 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic Presentation & Core Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Unboxed Metadata Header */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400 mb-6 tracking-wide">
              <span>IIIT Pune</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>B.Tech CSE</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>CGPA 8.06</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span className="text-slate-400">Class of 2028</span>
            </div>

            {/* Primary Headline with Balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 font-display [text-wrap:balance]">
              Engineering GPU Risk Engines & High-Throughput Distributed Systems
            </h1>

            {/* Body Narrative */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
              I am <strong className="text-white font-semibold">{PORTFOLIO_DATA.personal.name}</strong>, a computer science undergraduate specializing in quantitative finance, WebGL fragment-shader simulations, and resilient distributed architectures. I transform complex stochastic mathematics and high-concurrency bottlenecks into production-grade systems.
            </p>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3.5 mb-12">
              <a
                href="#quant-lab"
                className="px-5 py-2.5 text-sm font-semibold text-[#05070D] bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              >
                Launch Quant Lab
              </a>

              <a
                href="#projects"
                className="px-5 py-2.5 text-sm font-medium text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] rounded-xl transition-all hover:border-white/[0.2] whitespace-nowrap"
              >
                View Architecture
              </a>

              <button
                onClick={handleCopyEmail}
                className="px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] rounded-xl transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <span>{copied ? 'Email Copied!' : 'Copy Email'}</span>
                <span className="text-xs text-cyan-400 font-mono">
                  {copied ? '✓' : 'aditya...'}
                </span>
              </button>
            </div>

            {/* Quantitative Proof Grid (Claim-to-proof Adjacency with Apple Control Center liquid tiles) */}
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-8 border-t border-white/[0.08]">
              {PORTFOLIO_DATA.keyMetrics.map((metric) => (
                <div 
                  key={metric.label} 
                  className="liquid-glass rounded-[24px] p-4 sm:p-5 border border-white/[0.16] shadow-lg flex flex-col justify-between hover:scale-[1.02] transition-transform duration-200"
                >
                  <div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-sans tabular-nums tracking-tight whitespace-nowrap">
                      {metric.value}
                    </div>
                    <div className="text-xs font-bold text-cyan-300 font-mono mt-1 uppercase tracking-wider">
                      {metric.label}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-2.5 font-sans leading-relaxed">
                    {metric.note}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Liquid Glass Interactive Portrait Card with 3D Tilt */}
          <div className="lg:col-span-5 relative flex justify-center">
            <LiquidGlassPortraitCard />
          </div>
        </div>
      </div>
    </section>
  );
}
