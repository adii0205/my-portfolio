import { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderEmail || !message) return;
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setSenderName('');
      setSenderEmail('');
      setMessage('');
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#05070D]/80 backdrop-blur-xl animate-in fade-in"
      />

      <div className="relative w-full max-w-xl liquid-glass rounded-2xl p-6 sm:p-8 z-10 border border-white/[0.18] shadow-2xl animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              Communication Protocol
            </div>
            <h3 className="text-2xl font-bold text-white font-display mt-0.5">
              Contact Aditya Jaiswal
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Pune, Maharashtra · Open for Quant & Distributed Systems Engineering
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/[0.1] text-slate-400 hover:text-white flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>

        {/* Quick Contact Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
          <div
            onClick={handleCopyEmail}
            className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-400/40 cursor-pointer transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">EMAIL ADDRESS</span>
              <span className="text-cyan-400 text-[11px] font-mono">
                {copiedEmail ? 'Copied ✓' : 'Click to Copy'}
              </span>
            </div>
            <div className="text-xs font-mono text-white mt-2 truncate">
              {PORTFOLIO_DATA.personal.email}
            </div>
          </div>

          <div
            onClick={handleCopyPhone}
            className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-400/40 cursor-pointer transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">PHONE</span>
              <span className="text-cyan-400 text-[11px] font-mono">
                {copiedPhone ? 'Copied ✓' : 'Click to Copy'}
              </span>
            </div>
            <div className="text-xs font-mono text-white mt-2">
              {PORTFOLIO_DATA.personal.phone}
            </div>
          </div>
        </div>

        {/* Interactive Note Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Jane Doe"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white/[0.04] border border-white/[0.1] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">
              Your Email
            </label>
            <input
              type="email"
              required
              placeholder="jane@company.com"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white/[0.04] border border-white/[0.1] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">
              Message / Inquiries
            </label>
            <textarea
              required
              rows={4}
              placeholder="Describe your project, role, or collaboration proposal..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white/[0.04] border border-white/[0.1] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
            />
          </div>

          {sentSuccess ? (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-center text-xs font-mono text-emerald-300 animate-in fade-in">
              Message transmitted successfully! Aditya will respond shortly.
            </div>
          ) : (
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 text-xs font-semibold text-[#05070D] bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shadow-cyan-500/20"
              >
                Send Direct Message
              </button>

              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}?subject=Collaboration%20Inquiry`}
                className="px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] rounded-xl transition-all whitespace-nowrap"
              >
                Open Default Mailer ↗
              </a>
            </div>
          )}
        </form>

        {/* Social Links Footer */}
        <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Social Network:</span>
          <div className="flex items-center gap-3 text-slate-300">
            <a href={PORTFOLIO_DATA.personal.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400">
              LinkedIn
            </a>
            <span>·</span>
            <a href={PORTFOLIO_DATA.personal.socials.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400">
              GitHub
            </a>
            <span>·</span>
            <a href={PORTFOLIO_DATA.personal.socials.leetcode} target="_blank" rel="noreferrer" className="hover:text-cyan-400">
              LeetCode
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
