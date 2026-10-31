import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { Check, ShieldCheck } from 'lucide-react';

const CHECKLIST_ITEMS = [
  {
    title: 'Pre-Trade Mathematical Ruin Proof',
    desc: 'Verify that loss per thesis does not breach the 0.75% portfolio ceiling.',
  },
  {
    title: 'Auction Market Depth Verification',
    desc: 'Confirm resting liquidity and calculate realistic execution slippage.',
  },
  {
    title: 'Cognitive & Emotional Pulse Score',
    desc: 'Mandatory sign-off certifying absence of revenge impulses or fatigue.',
  },
  {
    title: 'Risk-Free Paper Terminal Simulation',
    desc: 'Execute in the sandbox to validate timing before live execution.',
  },
  {
    title: 'Archival Peer Journal Audit',
    desc: 'Log trade post-mortem and review thesis in the weekly fellowship dispatch.',
  },
];

export const ChecklistSplitBlock: React.FC<{ onCtaClick: () => void }> = ({ onCtaClick }) => {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12, // 120ms stagger between checklist ticks
      },
    },
  };

  const itemVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, ease: 'easeOut' },
    },
  };

  const tickVariants: Variants = {
    hidden: prefersReducedMotion ? { scale: 1 } : { scale: 0, rotate: -45 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 500, damping: 25 },
    },
  };

  return (
    <div className="w-full py-16 sm:py-24 bg-white border-y border-[#011936]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Dashboard Visual on the Left */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-3xl bg-[#011936] p-6 sm:p-8 text-white border border-[#EDB671]/30 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#EDB671]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#EDB671]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
                    Pre-Flight Stewardship Checklist
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold">
                  5/5 VERIFIED
                </span>
              </div>

              {/* Terminal Checklist Inspection Graphic */}
              <div className="space-y-3 font-mono text-xs">
                {CHECKLIST_ITEMS.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 text-white/90">
                      <span className="text-[#EDB671] text-[11px]">0{idx + 1}.</span>
                      <span className="font-medium">{item.title}</span>
                    </div>
                    <span className="text-emerald-400 font-bold text-[11px]">PASS</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
                <span>TERMINAL SAFETY INTERLOCK: ENGAGED</span>
                <span className="text-[#EDB671]">READY FOR PRACTICE</span>
              </div>
            </div>
          </div>

          {/* Text and Staggered Progress Checklist on the Right */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-manrope text-[#06182E] tracking-tight leading-tight">
              An unyielding checklist before every market action
            </h2>

            <p className="text-base sm:text-lg text-[#536477] leading-relaxed">
              In medicine or aviation, checklists prevent catastrophic errors. We bring that exact same institutional rigor to financial decisions.
            </p>

            {/* Checklist with ticks animating in one by one (stagger) when in view */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-4 pt-2"
            >
              {CHECKLIST_ITEMS.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex items-start gap-3.5"
                >
                  <motion.div
                    variants={tickVariants}
                    className="w-6 h-6 rounded-full bg-[#EDB671] text-[#011936] flex items-center justify-center shrink-0 mt-0.5 shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </motion.div>
                  <div>
                    <h4 className="text-sm font-bold font-manrope text-[#06182E]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#536477] mt-0.5 leading-normal">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="pt-2">
              <button
                onClick={onCtaClick}
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#011936] text-white hover:bg-[#06182E] text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
              >
                Inspect the full checklist syllabus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
