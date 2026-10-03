import { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface BioSectionProps {
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export function BioSection({ onOpenContact, onOpenResume }: BioSectionProps) {
  const [avatar, setAvatar] = useState(PORTFOLIO_DATA.personal.avatar);

  useEffect(() => {
    const saved = localStorage.getItem('aditya_exact_photo');
    if (saved) setAvatar(saved);
  }, []);
  return (
    <section id="about" className="py-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Education & Credentials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              Academic Background
            </div>
            
            <div className="liquid-glass rounded-2xl p-6 border border-white/[0.1]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-mono text-slate-400">Undergraduate Degree</div>
                  <h3 className="text-xl font-bold text-white font-display mt-1">
                    {PORTFOLIO_DATA.personal.institution}
                  </h3>
                  <div className="text-sm text-cyan-300 font-medium mt-1">
                    {PORTFOLIO_DATA.personal.degree}
                  </div>
                </div>

                <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/[0.15] bg-black/60 shrink-0">
                  <img
                    src={avatar}
                    alt="Aditya Jaiswal"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/[0.08] text-xs font-mono">
                <div>
                  <div className="text-slate-400">Duration</div>
                  <div className="text-white font-bold mt-0.5">{PORTFOLIO_DATA.personal.timeline}</div>
                </div>
                <div>
                  <div className="text-slate-400">Cumulative GPA</div>
                  <div className="text-emerald-400 font-bold mt-0.5">{PORTFOLIO_DATA.personal.cgpa}</div>
                </div>
                <div>
                  <div className="text-slate-400">Location</div>
                  <div className="text-slate-200 mt-0.5">{PORTFOLIO_DATA.personal.location}</div>
                </div>
                <div>
                  <div className="text-slate-400">Primary Focus</div>
                  <div className="text-slate-200 mt-0.5">Quant Systems & HPC</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-xs text-slate-400">Official Transcript Status</span>
                <span className="text-xs font-mono text-cyan-400">In Good Standing</span>
              </div>
            </div>

            {/* Quick Contact Tile */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs space-y-3">
              <div className="text-slate-400 font-mono">DIRECT INQUIRIES</div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Email</span>
                <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="text-cyan-400 hover:underline font-mono">
                  {PORTFOLIO_DATA.personal.email}
                </a>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Phone</span>
                <span className="font-mono text-slate-200">{PORTFOLIO_DATA.personal.phone}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Location</span>
                <span className="text-slate-200">Pune, Maharashtra, India</span>
              </div>
              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between font-mono text-[11px]">
                <span className="text-slate-400">Profiles</span>
                <div className="flex items-center gap-2 text-cyan-400">
                  <a href={PORTFOLIO_DATA.personal.socials.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
                  <span>·</span>
                  <a href={PORTFOLIO_DATA.personal.socials.github} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
                  <span>·</span>
                  <a href={PORTFOLIO_DATA.personal.socials.leetcode} target="_blank" rel="noreferrer" className="hover:underline">LeetCode</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Prose & Systems Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              Engineering Narrative
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display [text-wrap:balance]">
              Bridging Mathematical Rigor with Scalable Computer Systems
            </h2>

            <div className="space-y-4 text-base text-slate-300 leading-relaxed">
              <p>
                My work centers on the intersection of stochastic financial modeling, parallel GPU compute shaders, and resilient distributed microservice architectures. Whether formulating a 9-model quantitative risk engine to measure tail risk via Peaks-Over-Threshold Extreme Value Theory or scaling a URL shortener to handle 2,100+ requests per second with sub-5ms redirection, I build systems designed for maximum computational throughput and mathematical correctness.
              </p>
              <p>
                At IIIT Pune, I combine fundamental computer science disciplines—algorithms, database indexing, and computer networks—with deep quantitative coursework in probability, linear algebra, and optimization. I maintain a continuous focus on competitive problem solving with over 500 algorithmic challenges completed across LeetCode and GeeksforGeeks.
              </p>
              <p>
                Outside core engineering, I explore explainable forensic machine learning: validating C2PA provenance manifests, analyzing 2D-FFT frequency spectra for latent diffusion anomalies, and tracking remote blood volume pulse waveforms (rPPG) directly in the browser.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenContact}
                className="px-5 py-2.5 text-xs font-semibold text-[#05070D] bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shadow-cyan-500/20"
              >
                Discuss an Opportunity
              </button>
              <button
                onClick={onOpenResume}
                className="px-5 py-2.5 text-xs font-medium text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] rounded-xl transition-all"
              >
                Inspect Official Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
