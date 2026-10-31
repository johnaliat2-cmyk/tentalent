import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'motion/react';
import { Check, ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'Do you manage funds, accept deposits, or execute trades on my behalf?',
    a: 'Absolutely not. Ten Talents is strictly a non-advisory educational fellowship and paper simulation laboratory. We never touch client capital, never accept fund deposits, and never provide specific buy/sell recommendations.',
  },
  {
    q: 'How does the free first lesson work?',
    a: 'Your first lesson is completely complimentary. You gain immediate access to Module 1 (Capital Preservation Foundations) and our sandbox paper terminal. You do not need to provide any payment details until you decide to continue.',
  },
  {
    q: 'Can I cancel my £15.99/month fellowship subscription at any time?',
    a: 'Yes, with one click in your account settings. There are no minimum contract lengths, no hidden fees, and no cancellation penalties.',
  },
  {
    q: 'What is the Paper Terminal Simulator?',
    a: 'Our simulator is a browser-based risk-free trading sandbox wired to live historical market feeds. It models order book depth, bid-ask spreads, and realistic slippage so you can practice execution discipline without risking real money.',
  },
  {
    q: 'What are the rules regarding community discussions?',
    a: 'Our forums and dispatches are strictly moderated to uphold scholastic rigor. Speculative chatter, hype, and unsolicited promotions are strictly prohibited. Conversations center on risk modeling, historical market events, and cognitive poise.',
  },
];

export const PricingFaqSection: React.FC<{ onCtaClick: () => void }> = ({ onCtaClick }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();

  const revealVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="w-full py-16 sm:py-24 bg-white border-t border-[#011936]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-manrope text-[#06182E] tracking-tight">
            Transparent, unhurried education
          </h2>
          <p className="text-sm sm:text-base text-[#536477] mt-3">
            Everything you need to master capital preservation and execution poise with zero speculation.
          </p>
        </div>

        {/* Pricing Card (reveal on scroll) */}
        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-2xl mx-auto rounded-3xl bg-[#011936] text-white p-8 sm:p-12 border border-[#EDB671]/40 shadow-2xl relative overflow-hidden mb-20"
        >
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#EDB671]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <h3 className="font-manrope font-bold text-3xl sm:text-4xl text-white mt-4">
              First lesson free, then £15.99/month, cancel any time.
            </h3>

            <p className="text-white/70 text-sm mt-3 max-w-md leading-relaxed">
              Experience the curriculum, paper terminal simulator, and peer journal audits without commitment.
            </p>

            {/* Price Display */}
            <div className="my-8 py-5 border-y border-white/10 w-full flex items-center justify-center gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-[#EDB671]">£15.99</span>
              <span className="text-white/60 text-sm font-mono">/ month</span>
            </div>

            {/* Feature Bullets */}
            <div className="w-full space-y-3.5 text-left mb-8 max-w-md">
              {[
                'Full access to all 4 Academy Curriculum Tracks (24 modules)',
                'Unlimited practice on the Risk-Free Paper Terminal Simulator',
                'Pre-flight trade thesis checklist & emotional journaling audit',
                'Weekly historical crisis dispatches from the London Archive',
                'Moderated fellowship forum with experienced stewards',
                'No card details required to begin your first free lesson',
              ].map((feat, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EDB671] text-[#011936] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-white/90 leading-normal">{feat}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={onCtaClick}
              className="w-full max-w-md py-4 rounded-full bg-[#EDB671] text-[#011936] font-bold text-base hover:bg-[#f0c388] transition-all hover:scale-102 active:scale-98 shadow-xl"
            >
              Start your free lesson now
            </button>

            <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-white/50">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>CANCEL ANY TIME WITH ONE CLICK · NON-ADVISORY</span>
            </div>
          </div>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-8 justify-center">
            <HelpCircle className="w-5 h-5 text-[#80561a]" />
            <h3 className="font-manrope font-bold text-2xl text-[#06182E]">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#011936]/10 bg-[#fdfcf9] overflow-hidden transition-colors hover:border-[#011936]/25"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus-visible:ring-2 focus-visible:ring-[#EDB671]"
                  >
                    <span className="font-manrope font-bold text-base sm:text-lg text-[#06182E]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#80561a] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="px-5 sm:px-6 pb-6 text-sm text-[#536477] leading-relaxed border-t border-[#011936]/5 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
