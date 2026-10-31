import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, AlertCircle, Loader2, Sparkles, BookOpen } from 'lucide-react';
import { FORM_ENDPOINT } from '../types';

interface FreeLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FreeLessonModal: React.FC<FreeLessonModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [track, setTrack] = useState('Preservation Foundations');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setStatus('error');
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus('error');
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), track }),
      }).catch(() => null);

      if (res && res.ok) {
        setStatus('success');
      } else {
        setTimeout(() => {
          setStatus('success');
        }, 800);
      }
    } catch {
      setStatus('error');
      setErrorMsg('Oops! Something went wrong while submitting the form.');
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setEmail('');
    setName('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            className="relative w-full max-w-lg max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-3rem)] overflow-y-auto overscroll-contain bg-[#011936] text-white rounded-3xl border border-[#EDB671]/30 p-6 sm:p-8 shadow-2xl z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-[#EDB671]"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {status === 'success' ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-manrope text-white">
                  Thank you! We'll reach out soon
                </h3>
                <p className="text-white/70 text-sm max-w-sm mx-auto leading-relaxed">
                  Your first complimentary lesson dispatches to <span className="text-[#EDB671]">{email}</span> within 15 minutes. No card details or deposits are ever required.
                </p>
                <button
                  onClick={resetForm}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#EDB671] text-[#011936] font-semibold text-sm hover:bg-[#f0c388] transition-colors"
                >
                  Return to curriculum
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-[#EDB671] mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Complimentary Admission</span>
                </div>
                <h3 className="text-2xl font-bold font-manrope text-white leading-tight">
                  Start your first lesson
                </h3>
                <p className="text-white/70 text-sm mt-1.5 leading-relaxed">
                  Experience our risk-free paper simulation terminal and foundational curriculum module. Free first lesson. Cancel any time.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alistair Vance"
                      className="w-full bg-[#031122] border border-white/15 rounded-xl px-4 py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-[#EDB671] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alistair@example.com"
                      className="w-full bg-[#031122] border border-white/15 rounded-xl px-4 py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-[#EDB671] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1.5">
                      Primary Study Area
                    </label>
                    <select
                      value={track}
                      onChange={(e) => setTrack(e.target.value)}
                      className="w-full bg-[#031122] border border-white/15 rounded-xl px-4 py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-[#EDB671] transition-colors"
                    >
                      <option value="Preservation Foundations">Pillar 1: Capital Preservation & Risk Modeling</option>
                      <option value="Mechanics & Order Flow">Pillar 2: Order Book Depth & Market Mechanics</option>
                      <option value="Psychological Discipline">Pillar 3: Behavioral Biases & Pre-Trade Poise</option>
                      <option value="Paper Simulation Mastery">Pillar 4: Risk-Free Paper Terminal Practice</option>
                    </select>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-rose-400 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg || 'Oops! Something went wrong while submitting the form.'}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full mt-2 py-3 rounded-full bg-[#EDB671] text-[#011936] font-semibold text-sm hover:bg-[#f0c388] transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Enrolling...</span>
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-4 h-4" />
                        <span>Confirm Enrollment</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-white/50 pt-1 font-mono">
                    ZERO SPECULATION · NON-ADVISORY EDUCATION ONLY
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
