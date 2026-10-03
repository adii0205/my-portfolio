import { PORTFOLIO_DATA } from '../data/portfolioData';

interface FooterProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export function Footer({ onOpenResume, onOpenContact }: FooterProps) {
  return (
    <footer className="border-t border-white/[0.08] bg-[#030509] pt-12 pb-24 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="font-bold text-white font-display text-sm tracking-tight">
            Aditya Jaiswal
          </div>
          <div className="text-slate-400">
            IIIT Pune · Computer Science & Engineering · Class of 2028
          </div>
        </div>

        <div className="flex items-center gap-5 text-slate-300">
          <a href={PORTFOLIO_DATA.personal.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
            LinkedIn
          </a>
          <span>·</span>
          <a href={PORTFOLIO_DATA.personal.socials.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
            GitHub
          </a>
          <span>·</span>
          <a href={PORTFOLIO_DATA.personal.socials.leetcode} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
            LeetCode
          </a>
        </div>

        <div className="text-slate-400 font-mono text-[11px]">
          © {new Date().getFullYear()} Aditya Jaiswal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
