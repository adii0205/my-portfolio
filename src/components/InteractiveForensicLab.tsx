import { useState, useRef } from 'react';

type ForensicLayer = 'fft' | 'syncnet' | 'rppg';

export function InteractiveForensicLab() {
  const [sliderPos, setSliderPos] = useState<number>(54); // percentage
  const [activeLayer, setActiveLayer] = useState<ForensicLayer>('fft');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handleRunVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
    }, 800);
  };

  return (
    <div className="liquid-glass rounded-2xl p-6 lg:p-8 mt-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="text-xs font-mono text-cyan-400 mb-1 tracking-wider uppercase">
            Computer Vision & Forensic Science
          </div>
          <h3 className="text-2xl font-bold text-white font-display">
            Forensic Inspector: Multi-Model Deepfake Ensemble
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Drag the A/B split-slider to inspect spatial frequency artifacts, audio-visual phoneme drift, and remote biological liveness (rPPG).
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <button
            onClick={() => setActiveLayer('fft')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeLayer === 'fft'
                ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white bg-white/[0.03]'
            }`}
          >
            2D-FFT Frequency
          </button>
          <button
            onClick={() => setActiveLayer('syncnet')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeLayer === 'syncnet'
                ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white bg-white/[0.03]'
            }`}
          >
            SyncNet Drift
          </button>
          <button
            onClick={() => setActiveLayer('rppg')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeLayer === 'rppg'
                ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white bg-white/[0.03]'
            }`}
          >
            rPPG Liveness
          </button>
        </div>
      </div>

      {/* Interactive A/B Split-screen Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <div
            ref={containerRef}
            onPointerMove={handlePointerMove}
            className="relative w-full h-[340px] sm:h-[400px] rounded-xl overflow-hidden border border-white/[0.1] select-none cursor-ew-resize bg-black"
          >
            {/* Base Layer: Raw Keyframe */}
            <div className="absolute inset-0">
              <img
                src="/deepfake_forensic_render_1791012501818.jpg"
                alt="AI facial forensic scan"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 backdrop-blur-md border border-white/[0.1] text-[11px] font-mono text-slate-300">
                RAW KEYFRAME (RGB)
              </div>
            </div>

            {/* Split Top Layer: Analytical Forensic Layer */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
            >
              <div className="relative w-full h-full bg-[#050B14]">
                <img
                  src="/src/assets/images/deepfake_forensic_render_1791012501818.jpg"
                  alt="Forensic diagnostic overlay"
                  className="w-full h-full object-cover filter contrast-125 saturate-150"
                  referrerPolicy="no-referrer"
                />

                {/* Layer-specific forensic overlays */}
                {activeLayer === 'fft' && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/60 via-purple-900/40 to-rose-900/50 mix-blend-color-dodge pointer-events-none flex items-center justify-center">
                    <div className="w-56 h-56 rounded-full border border-cyan-400/40 animate-pulse flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full border border-rose-400/50" />
                    </div>
                  </div>
                )}

                {activeLayer === 'syncnet' && (
                  <div className="absolute inset-0 pointer-events-none p-8 flex flex-col justify-end">
                    <div className="p-3 bg-black/80 backdrop-blur-md rounded-lg border border-cyan-500/30 text-xs font-mono space-y-1">
                      <div className="text-cyan-400 font-bold">SyncNet Audio-Visual Offset: +112 ms</div>
                      <div className="text-slate-300">Phoneme /m/ viseme lip compression mismatch: 91.4% confidence</div>
                    </div>
                  </div>
                )}

                {activeLayer === 'rppg' && (
                  <div className="absolute inset-0 pointer-events-none p-8 flex flex-col justify-end">
                    <div className="p-3 bg-black/80 backdrop-blur-md rounded-lg border border-rose-500/30 text-xs font-mono space-y-1">
                      <div className="text-rose-400 font-bold">rPPG Biological Liveness: Absent</div>
                      <div className="text-slate-300">Capillary hemodynamic pulse amplitude flatline across forehead ROI</div>
                    </div>
                  </div>
                )}

                <div className="absolute top-3 right-3 px-2 py-1 rounded bg-cyan-950/80 backdrop-blur-md border border-cyan-400/40 text-[11px] font-mono text-cyan-300">
                  {activeLayer.toUpperCase()} FORENSIC LAYER
                </div>
              </div>
            </div>

            {/* Slider Dividing Bar */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#05070D] border-2 border-cyan-400 flex items-center justify-center text-cyan-400 text-xs font-mono shadow-md">
                ↔
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 mt-2 px-1 font-mono">
            <span>← Raw Video Frame</span>
            <span>Split: {Math.round(sliderPos)}%</span>
            <span>Forensic Spectral Overlay →</span>
          </div>
        </div>

        {/* Forensic Diagnostics & Explainability Card */}
        <div className="lg:col-span-4 flex flex-col justify-between p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Diagnosis Verdict</span>
              <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/50 px-2 py-0.5 rounded border border-rose-500/30">
                Synthetic Manipulation
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-white/[0.06]">
                <span className="text-slate-400">Ensemble Accuracy</span>
                <span className="font-mono text-white font-bold">87.4% (5,000+ vids)</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/[0.06]">
                <span className="text-slate-400">C2PA v2.1 Manifest</span>
                <span className="font-mono text-rose-300 font-medium">Missing Root Chain</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/[0.06]">
                <span className="text-slate-400">DCT 64-bit pHash Cache</span>
                <span className="font-mono text-emerald-400 font-medium">Hit (28 ms p95)</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/[0.06]">
                <span className="text-slate-400">PostgreSQL Analytics</span>
                <span className="font-mono text-emerald-400 font-medium">34 ms (97% opt)</span>
              </div>
            </div>

            {/* Explainable AI note */}
            <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] text-xs text-slate-300 space-y-1">
              <div className="text-[10px] font-mono text-cyan-400 uppercase">Gemini 3.8 Flash Qualitative Attribution</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                High-frequency spectral ringing along the mandibular line indicates bilinear face-warping artifacts common in latent diffusion inpainting.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06]">
            <button
              onClick={handleRunVerification}
              disabled={isVerifying}
              className="w-full py-2.5 text-xs font-semibold text-[#05070D] bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded-xl transition-all shadow-sm shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              <span>{isVerifying ? 'Generating NIST Audit...' : 'Re-verify Video Authenticity'}</span>
              <span className="font-mono">⚡</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
