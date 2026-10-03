import { useState } from 'react';

export function InteractiveDistributedLab() {
  const [loadActive, setLoadActive] = useState<boolean>(false);
  const [rateLimitHits, setRateLimitHits] = useState<number>(0);
  const [blockedRequests, setBlockedRequests] = useState<number>(0);
  const [activeNode, setActiveNode] = useState<number>(1);

  const triggerLoadTest = () => {
    setLoadActive(true);
    let step = 0;
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev % 3) + 1);
      step++;
      if (step > 12) {
        clearInterval(interval);
        setLoadActive(false);
      }
    }, 250);
  };

  const handleRateLimitBurst = () => {
    setRateLimitHits((prev) => prev + 1);
    if (rateLimitHits >= 3) {
      setBlockedRequests((prev) => prev + 1);
    }
  };

  return (
    <section id="systems-lab" className="py-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono text-cyan-400 mb-2 tracking-wider uppercase">
              Distributed Systems Simulation
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Distributed High-Concurrency Architecture
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
              Handling 2,100+ req/s with 99.8% uptime. Two-tier caching (in-memory LRU + Redis cluster), 20+ composite PostgreSQL indexes, and Bull queue event streaming.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <button
              onClick={triggerLoadTest}
              disabled={loadActive}
              className="px-4 py-2 text-xs font-semibold text-[#05070D] bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded-xl transition-all shadow-sm shadow-cyan-500/20 flex items-center gap-2"
            >
              <span>{loadActive ? 'Synthesizing 2,100 req/s...' : 'Simulate 2,100 req/s Load'}</span>
              <span className="font-mono">⚡</span>
            </button>
          </div>
        </div>

        <div className="liquid-glass rounded-2xl p-6 lg:p-8">
          {/* Architecture Pipeline Flow Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {/* Stage 1: Ingress & Load Balancer */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] relative">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span>01. Ingress</span>
                <span className="text-emerald-400">99.8% Uptime</span>
              </div>
              <div className="text-base font-bold text-white font-display">Nginx Load Balancer</div>
              <div className="text-xs text-slate-400 mt-1">Algorithm: Least-Connections</div>
              <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-cyan-300">
                <span className={`w-2 h-2 rounded-full ${loadActive ? 'bg-cyan-400 animate-ping' : 'bg-slate-500'}`} />
                <span>2,100+ req/s capacity</span>
              </div>
            </div>

            {/* Stage 2: Horizontally Scaled Nodes */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span>02. App Nodes</span>
                <span className="text-cyan-400">Docker Pods</span>
              </div>
              <div className="text-base font-bold text-white font-display">Stateless Express</div>
              <div className="mt-2 space-y-1 text-[11px] font-mono">
                {[1, 2, 3].map((nodeId) => (
                  <div
                    key={nodeId}
                    className={`flex items-center justify-between px-2 py-0.5 rounded transition-all ${
                      activeNode === nodeId && loadActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-400 bg-white/[0.02]'
                    }`}
                  >
                    <span>Node-0{nodeId}</span>
                    <span>{activeNode === nodeId && loadActive ? 'DISPATCHING' : 'READY'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage 3: Two-Tier Cache */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span>03. Two-Tier Cache</span>
                <span className="text-emerald-400 font-bold">92% Hit Rate</span>
              </div>
              <div className="text-base font-bold text-white font-display">LRU + Redis Cluster</div>
              <div className="text-xs text-slate-400 mt-1">12× Throughput Acceleration</div>
              <div className="mt-2">
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                  <div className="bg-cyan-400 h-full w-[68%]" title="In-Memory LRU: 68%" />
                  <div className="bg-blue-500 h-full w-[24%]" title="Redis Cluster: 24%" />
                  <div className="bg-slate-600 h-full w-[8%]" title="Cold DB: 8%" />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                  <span>LRU 68%</span>
                  <span>Redis 24%</span>
                  <span>Cold 8%</span>
                </div>
              </div>
            </div>

            {/* Stage 4: Optimized DB & Bull Queues */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span>04. Storage & Queues</span>
                <span className="text-emerald-400 font-bold">23 ms (97% cut)</span>
              </div>
              <div className="text-base font-bold text-white font-display">PostgreSQL & Bull</div>
              <div className="text-xs text-slate-400 mt-1">20+ Partial & Composite Indexes</div>
              <div className="mt-3 text-[11px] font-mono text-slate-300">
                &lt;5 ms redirect via Bull queue
              </div>
            </div>
          </div>

          {/* Interactive Sliding Window Rate Limiter Playground */}
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-cyan-400">Redis Sorted Set Sliding Window</div>
              <div className="text-sm font-semibold text-white mt-0.5">
                Rate Limiting Stress Test (10K+ malicious attacks blocked/day)
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Click rapidly to simulate request bursts from an untrusted IP. Throttles at &gt;3 bursts.
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right font-mono text-xs">
                <div className="text-slate-400">Burst Clicks: <span className="text-white font-bold">{rateLimitHits}</span></div>
                <div className="text-rose-400">Throttled: <span className="font-bold">{blockedRequests}</span></div>
              </div>

              <button
                onClick={handleRateLimitBurst}
                className="px-4 py-2 text-xs font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] rounded-xl transition-all active:scale-95 whitespace-nowrap"
              >
                Send Request Burst
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
