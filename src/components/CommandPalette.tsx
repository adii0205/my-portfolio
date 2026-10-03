import { useState, useEffect } from 'react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (p: Project) => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

interface CommandItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  action: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onSelectProject,
  onOpenResume,
  onOpenContact,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Command items catalog
  const commands: CommandItem[] = [
    ...PORTFOLIO_DATA.projects.map((p) => ({
      id: p.id,
      category: 'Projects',
      title: p.title,
      subtitle: `${p.technologies.slice(0, 3).join(', ')} · ${p.period}`,
      action: () => {
        onSelectProject(p);
        onClose();
      },
    })),
    {
      id: 'cmd-quant-lab',
      category: 'Simulations',
      title: 'Launch QuantRisk Engine',
      subtitle: 'Simulate 100K paths in 14ms via WebGL Monte Carlo',
      action: () => {
        window.location.hash = '#quant-lab';
        onClose();
      },
    },
    {
      id: 'cmd-systems-lab',
      category: 'Simulations',
      title: 'Run Distributed Systems Balancer',
      subtitle: 'Test 2,100 req/s load & two-tier caching (92% hit rate)',
      action: () => {
        window.location.hash = '#systems-lab';
        onClose();
      },
    },
    {
      id: 'cmd-skills',
      category: 'Navigation',
      title: 'Skills & Mathematical Foundations',
      subtitle: 'Explore C++, Python, GARCH, Heston, WebGL, Docker',
      action: () => {
        window.location.hash = '#skills';
        onClose();
      },
    },
    {
      id: 'cmd-achievements',
      category: 'Navigation',
      title: 'Achievements & Honors',
      subtitle: 'JEE Main 98.38th %tile (Top 1.6%), 500+ CP Solved',
      action: () => {
        window.location.hash = '#achievements';
        onClose();
      },
    },
    {
      id: 'cmd-resume',
      category: 'Actions',
      title: 'Inspect Official Resume',
      subtitle: 'View detailed curriculum vitae and credentials',
      action: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: 'cmd-contact',
      category: 'Actions',
      title: 'Get in Touch',
      subtitle: `adityajaiswal33008@gmail.com · ${PORTFOLIO_DATA.personal.phone}`,
      action: () => {
        onClose();
        onOpenContact();
      },
    },
    {
      id: 'cmd-copy-email',
      category: 'Actions',
      title: 'Copy Email to Clipboard',
      subtitle: PORTFOLIO_DATA.personal.email,
      action: () => {
        navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const text = `${cmd.title} ${cmd.subtitle} ${cmd.category}`.toLowerCase();
    return text.includes(query.toLowerCase());
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#05070D]/80 backdrop-blur-xl animate-in fade-in"
      />

      <div className="relative w-full max-w-xl liquid-glass rounded-2xl overflow-hidden z-10 border border-white/[0.18] shadow-2xl animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/[0.1] flex items-center gap-3">
          <span className="text-slate-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Type a command or search systems, math, skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-sans"
          />
          <kbd className="text-[10px] font-mono bg-white/[0.08] px-2 py-0.5 rounded text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500 font-mono">
              No matching commands or files found
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = selectedIndex === idx;

              return (
                <div
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-cyan-500/20 border border-cyan-400/40 text-white'
                      : 'hover:bg-white/[0.04] text-slate-300'
                  }`}
                >
                  <div className="flex flex-col">
                    <div className="text-xs font-semibold flex items-center gap-2">
                      <span>{cmd.title}</span>
                      <span className="text-[10px] font-mono text-cyan-400 opacity-80">
                        {cmd.category}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {cmd.subtitle}
                    </div>
                  </div>

                  <span className="text-xs font-mono text-slate-500">↵</span>
                </div>
              );
            })
          )}
        </div>

        <div className="px-4 py-2 bg-white/[0.02] border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Navigate with ↑ ↓ · Press Enter to open</span>
          <span>Aditya Jaiswal · Quick Search</span>
        </div>
      </div>
    </div>
  );
}
