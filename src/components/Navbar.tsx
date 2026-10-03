interface NavbarProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
  onOpenCommand: () => void;
}

export function Navbar({ onOpenResume, onOpenContact, onOpenCommand }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#05070D]/70 backdrop-blur-2xl transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="text-lg font-bold tracking-tight text-white hover:text-cyan-300 transition-colors whitespace-nowrap font-display flex items-center gap-2"
        >
          <span>Aditya Jaiswal</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#projects" className="hover:text-white transition-colors whitespace-nowrap">
            Projects
          </a>
          <a href="#repositories" className="hover:text-white transition-colors whitespace-nowrap">
            Repos
          </a>
          <a href="#quant-core-3d" className="hover:text-cyan-300 transition-colors whitespace-nowrap">
            OrderBook 3D
          </a>
          <a href="#quant-lab" className="hover:text-white transition-colors whitespace-nowrap">
            Quant Lab
          </a>
          <a href="#skills" className="hover:text-white transition-colors whitespace-nowrap">
            Stack
          </a>
          <a href="#about" className="hover:text-white transition-colors whitespace-nowrap">
            Bio
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCommand}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded-lg transition-all"
            title="Search Portfolio"
          >
            <span className="text-xs">🔍</span>
            <span>Search</span>
          </button>

          <button
            onClick={onOpenResume}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-200 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] rounded-lg transition-colors whitespace-nowrap"
          >
            Resume
          </button>

          <button
            onClick={onOpenContact}
            className="px-4 py-1.5 text-xs font-semibold text-[#05070D] bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
          >
            Contact
          </button>
        </div>
      </div>
    </header>
  );
}
