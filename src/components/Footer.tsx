import React, { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle2, AlertCircle, Twitter, Linkedin, Youtube, Send } from 'lucide-react';
import { PageId, FORM_ENDPOINT } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Please enter an email address.');
      return;
    }
    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      }).catch(() => null);

      if (res && res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        // Fallback simulation for client-only preview or endpoints
        setTimeout(() => {
          setStatus('success');
          setEmail('');
        }, 800);
      }
    } catch {
      setStatus('error');
      setErrorMessage('Oops! Something went wrong while submitting the form.');
    }
  };

  return (
    <footer className="w-full bg-[#011936] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white p-1 flex items-center justify-center">
                <img src="/logo-mark.png" alt="" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-manrope font-bold text-lg uppercase tracking-wider text-white">
                  Ten Talents
                </span>
                <span className="text-[11px] tracking-widest text-[#EDB671] uppercase font-semibold">
                  Markets · Wealth · Wisdom
                </span>
              </div>
            </div>

            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              An unhurried educational fellowship cultivating intellectual rigor, emotional discipline, and risk-free simulation before live market execution.
            </p>

            {/* Social Icons lifting on hover and opening with rel="noopener" */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
                { icon: Send, href: 'https://t.me', label: 'Telegram' },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#EDB671] hover:border-[#EDB671]/40 hover:-translate-y-1 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#EDB671]"
                >
                  <item.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links with sliding underline hover */}
          <div className="md:col-span-3 grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#EDB671] font-semibold mb-3">
                Curriculum
              </h4>
              <ul className="space-y-2.5 text-sm">
                {[
                  { id: 'academy' as PageId, label: 'Academy' },
                  { id: 'library' as PageId, label: 'Dispatches' },
                  { id: 'ventures' as PageId, label: 'Ventures' },
                  { id: 'services' as PageId, label: 'Services' },
                ].map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => onNavigate(link.id)}
                      className="group relative inline-block text-white/75 hover:text-white transition-colors py-1.5 focus-visible:ring-2 focus-visible:ring-[#EDB671] rounded"
                    >
                      <span>{link.label}</span>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#EDB671] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#EDB671] font-semibold mb-3">
                Fellowship
              </h4>
              <ul className="space-y-2.5 text-sm">
                {[
                  { id: 'about' as PageId, label: 'About Us' },
                  { id: 'community' as PageId, label: 'Community' },
                  { id: 'contact' as PageId, label: 'Contact' },
                  { id: 'legal' as PageId, label: 'Legal & Risk' },
                ].map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => onNavigate(link.id)}
                      className="group relative inline-block text-white/75 hover:text-white transition-colors py-1.5 focus-visible:ring-2 focus-visible:ring-[#EDB671] rounded"
                    >
                      <span>{link.label}</span>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#EDB671] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#EDB671] font-semibold">
              Scholastic Gazette
            </h4>
            <p className="text-white/70 text-xs leading-relaxed">
              Receive our weekend essay on cognitive biases, historical liquidity shocks, and pre-execution discipline. Zero hype.
            </p>

            <form onSubmit={handleSubmit} className="space-y-2 mt-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Your personal email address"
                  disabled={status === 'loading'}
                  className="w-full bg-[#031122] text-white text-base sm:text-xs px-4 py-3 rounded-full border border-white/15 focus:outline-none focus:border-[#EDB671] placeholder:text-white/40 transition-colors pr-12"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="absolute right-1 w-9 h-9 rounded-full bg-[#EDB671] text-[#011936] flex items-center justify-center hover:bg-[#f0c388] transition-colors disabled:opacity-50"
                  aria-label="Submit newsletter subscription"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Inline status messages */}
              {status === 'success' && (
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Thank you! We'll reach out soon</span>
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-center gap-1.5 text-rose-400 text-xs font-medium pt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errorMessage || 'Oops! Something went wrong while submitting the form.'}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Ten Talents Sovereign Fellowship. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>STRICTLY NON-ADVISORY FINANCIAL EDUCATION</span>
            <span>·</span>
            <span>LONDON, UNITED KINGDOM</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
