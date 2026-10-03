import { useState } from 'react';

interface IOSDockProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
  onOpenCommand: () => void;
}

export function IOSDock({ onOpenResume, onOpenContact, onOpenCommand }: IOSDockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const dockItems = [
    { label: 'Overview', href: '#', icon: '🏠' },
    { label: 'Projects', href: '#projects', icon: '📂' },
    { label: 'GitHub Repos', href: '#repositories', icon: '🐙' },
    { label: 'OrderBook 3D', href: '#quant-core-3d', icon: '⚡' },
    { label: 'Quant Lab', href: '#quant-lab', icon: '📈' },
    { label: 'Systems Lab', href: '#systems-lab', icon: '⚡' },
    { label: 'Skills', href: '#skills', icon: '🧠' },
    { label: 'Search', action: onOpenCommand, icon: '🔍' },
    { label: 'Resume', action: onOpenResume, icon: '📄' },
    { label: 'Contact', action: onOpenContact, icon: '✉️' },
  ];

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={() => setIsMinimized(false)}
          className="liquid-dock-pill rounded-full px-4 py-1.5 text-xs font-mono text-cyan-300 flex items-center gap-2 hover:scale-105 transition-all shadow-xl"
        >
          <span>✦</span>
          <span>Open Liquid Dock</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-[95vw]">
      <nav 
        aria-label="Apple Pure Liquid Glass Dock"
        className="liquid-dock-pill rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1 sm:gap-2 shadow-2xl"
      >
        {dockItems.map((item, index) => {
          const isHovered = hoveredIndex === index;
          const isAdjacent =
            hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1;

          const scaleClass = isHovered
            ? 'scale-125 -translate-y-2 bg-white/[0.2] shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.7),0_10px_20px_rgba(0,0,0,0.4)]'
            : isAdjacent
            ? 'scale-110 -translate-y-1 bg-white/[0.08]'
            : 'scale-100 translate-y-0 bg-transparent';

          const content = (
            <div
              className={`relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-base sm:text-lg transition-all duration-200 cursor-pointer ${scaleClass}`}
            >
              <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{item.icon}</span>

              {/* Tooltip Label */}
              {isHovered && (
                <div className="absolute -top-9 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-xl border border-white/[0.2] text-[10px] font-sans font-medium text-white whitespace-nowrap shadow-xl animate-in fade-in">
                  {item.label}
                </div>
              )}
            </div>
          );

          if (item.action) {
            return (
              <button
                key={item.label}
                onClick={item.action}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="focus:outline-none"
              >
                {content}
              </button>
            );
          }

          return (
            <a
              key={item.label}
              href={item.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="focus:outline-none"
            >
              {content}
            </a>
          );
        })}

        {/* Small Close / Minimize Button */}
        <button
          onClick={() => setIsMinimized(true)}
          className="w-5 h-5 rounded-full hover:bg-white/[0.15] text-[10px] text-slate-300 hover:text-white flex items-center justify-center transition-colors ml-0.5"
          title="Minimize Dock"
        >
          ✕
        </button>
      </nav>
    </div>
  );
}
