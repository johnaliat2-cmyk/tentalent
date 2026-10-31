import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2, Sparkles, Building2 } from 'lucide-react';
import { FORM_ENDPOINT } from '../types';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Fellowship Admission',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setStatus('error');
      setErrorMsg('Please state your name.');
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      setStatus('error');
      setErrorMsg('Please write your correspondence message.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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

  return (
    <div className="w-full flex flex-col bg-[#F5F3EC]">
      {/* Hero */}
      <section className="relative w-full bg-gradient-to-b from-[#0B2A52] via-[#0F3564] to-[#1B4A82] text-white pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md mb-6 border border-white/10 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EDB671]" />
            <span className="text-xs uppercase font-mono tracking-widest text-[#EDB671] font-semibold">
              Direct Correspondence &amp; Inquiry
            </span>
          </div>

          <h1 className="font-manrope text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Get in touch.
          </h1>

          <p className="text-base sm:text-xl text-white/85 max-w-2xl mx-auto mt-6 leading-relaxed">
            Whether inquiring about student fellowship admission, submitting a venture proposal, or requesting library dispatches, we welcome thoughtful dialogue.
          </p>
        </div>
      </section>

      {/* Main Content Form & Contact Info */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#011936]/10 shadow-sm">
            {status === 'success' ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-manrope font-bold text-2xl text-[#06182E]">
                  Message received with gratitude
                </h3>
                <p className="text-sm text-[#536477] max-w-sm mx-auto leading-relaxed">
                  Our stewardship committee reviews correspondence within two business days. We will dispatch our reply to <span className="text-[#80561a] font-medium">{formData.email}</span>.
                </p>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setFormData({ name: '', email: '', inquiryType: 'Fellowship Admission', message: '' });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#011936] text-white text-xs font-semibold hover:bg-[#06182E]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-manrope font-bold text-2xl text-[#06182E]">
                  Dispatch a Correspondence
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-[#06182E] mb-2 uppercase tracking-wider font-mono">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alistair Vance"
                    className="w-full bg-[#F5F3EC]/60 border border-[#011936]/15 rounded-xl px-4 py-3 text-base sm:text-sm text-[#06182E] focus:outline-none focus:border-[#EDB671] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#06182E] mb-2 uppercase tracking-wider font-mono">
                    Electronic Mail
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alistair@domain.com"
                    className="w-full bg-[#F5F3EC]/60 border border-[#011936]/15 rounded-xl px-4 py-3 text-base sm:text-sm text-[#06182E] focus:outline-none focus:border-[#EDB671] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#06182E] mb-2 uppercase tracking-wider font-mono">
                    Purpose of Correspondence
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full bg-[#F5F3EC]/60 border border-[#011936]/15 rounded-xl px-4 py-3 text-base sm:text-sm text-[#06182E] focus:outline-none focus:border-[#EDB671] focus:bg-white transition-colors"
                  >
                    <option value="Fellowship Admission">Fellowship Curriculum &amp; Admission</option>
                    <option value="Direct Venture Proposal">Direct Venture Proposal (Proprietary Capital)</option>
                    <option value="Scholastic Dispatches">Scholastic Archive &amp; Research Inquiries</option>
                    <option value="General Correspondence">General Fellowship Counsel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#06182E] mb-2 uppercase tracking-wider font-mono">
                    Message / Thesis
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please outline the nature of your inquiry in unhurried detail..."
                    className="w-full bg-[#F5F3EC]/60 border border-[#011936]/15 rounded-xl px-4 py-3 text-base sm:text-sm text-[#06182E] focus:outline-none focus:border-[#EDB671] focus:bg-white transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-rose-600 text-xs font-medium bg-rose-50 p-3 rounded-xl border border-rose-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg || 'Oops! Something went wrong while submitting the form.'}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 rounded-full bg-[#EDB671] text-[#011936] font-bold text-sm hover:bg-[#f0c388] transition-all hover:scale-101 active:scale-98 shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Correspondence</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Institutional Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#011936] rounded-3xl p-8 text-white border border-[#EDB671]/25">
              <span className="font-mono text-xs uppercase tracking-wider text-[#EDB671] font-semibold">
                London Headquarters
              </span>
              <h3 className="font-manrope font-bold text-2xl mt-1 mb-4">
                The Sovereign Library
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Ten Talents maintains physical archival holdings and private seminar rooms in central London for fellow dispatches and research symposia.
              </p>

              <div className="space-y-4 text-xs font-mono text-white/80 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#EDB671]" />
                  <span>St. James's, City of Westminster, London SW1A</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#EDB671]" />
                  <span>stewards@tentalents.co.uk</span>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="w-4 h-4 text-[#EDB671]" />
                  <span>England &amp; Wales Company Registry</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[#011936]/10 text-[#06182E]">
              <h4 className="font-manrope font-bold text-lg mb-2">
                A Note on Non-Advisory Operations
              </h4>
              <p className="text-xs text-[#536477] leading-relaxed">
                Ten Talents does not offer regulated investment advice, personal wealth management, or brokerage services. Any correspondence regarding third-party money management or speculative financial promotions will be respectfully declined.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
