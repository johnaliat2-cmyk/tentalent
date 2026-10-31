import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Shield, BookOpen, Scale, Award, Eye } from 'lucide-react';
import { PageId } from '../types';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenLessonModal: () => void;
}

const PRINCIPLES = [
  {
    icon: Shield,
    title: 'Competence Before Capital',
    desc: 'We believe it is irresponsible to commit real financial capital to market auctions before proving methodical execution discipline on paper terminals.',
  },
  {
    icon: Scale,
    title: 'Mathematical Risk Boundaries',
    desc: 'No single decision is ever allowed to threaten sovereign capital. Every trade is strictly bound by maximum ruin probabilities and mandatory stops.',
  },
  {
    icon: BookOpen,
    title: 'Historical Grounding',
    desc: 'Financial markets repeat psychological cycles of euphoria and despair. We ground our students in two centuries of archival market mechanics.',
  },
  {
    icon: Award,
    title: 'Unhurried Fellowship',
    desc: 'We measure success in years and generations, not daily ticks. We foster patient, thoughtful discourse among high-integrity peers.',
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenLessonModal }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="w-full flex flex-col bg-[#F5F3EC]">
      {/* Hero */}
      <section className="relative w-full bg-gradient-to-b from-[#0B2A52] via-[#103666] to-[#1B4A82] text-white pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="font-manrope text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Develop the talents you have been given.
          </h1>

          <p className="text-base sm:text-xl text-white/85 max-w-2xl mx-auto mt-6 leading-relaxed">
            A community founded on stewardship, emotional self-restraint, and the patient cultivation of financial wisdom. We exist to equip individuals with competence before capital.
          </p>
        </div>
      </section>

      {/* Origin Story & Foundation */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#011936]/10 shadow-sm space-y-6 text-[#06182E] leading-relaxed">
          <h2 className="font-manrope font-bold text-3xl sm:text-4xl tracking-tight text-[#06182E]">
            Founded on the rejection of financial noise.
          </h2>

          <p className="text-base sm:text-lg text-[#536477]">
            Ten Talents was formed by market practitioners and educators in London who grew weary of the sensationalism, misleading claims, and speculative mania that pervade modern retail finance.
          </p>

          <p className="text-sm sm:text-base text-[#536477]">
            The name draws upon the classical parable of stewardship: the moral duty to cultivate, refine, and prudently employ whatever resources, intellect, and opportunities have been placed into one's care. True stewardship rejects gambling in favor of calculated mathematical risk management, relentless emotional discipline, and intellectual honesty.
          </p>

          <div className="p-6 rounded-2xl bg-[#011936] text-white border border-[#EDB671]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-manrope font-bold text-lg mt-0.5">
                100% Non-Advisory · Pure Education
              </div>
            </div>
            <button
              onClick={onOpenLessonModal}
              className="px-6 py-2.5 rounded-full bg-[#EDB671] text-[#011936] font-semibold text-xs whitespace-nowrap hover:bg-[#f0c388]"
            >
              Start free lesson
            </button>
          </div>
        </div>
      </section>

      {/* Core Principles Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold font-manrope text-[#06182E] mt-1">
            The Four Pillars of Ten Talents
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRINCIPLES.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={idx}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                className="bg-white rounded-2xl p-7 border border-[#011936]/10 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#011936]/5 text-[#011936] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#80561a]" />
                  </div>
                  <h3 className="font-manrope font-bold text-xl text-[#06182E] mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[#536477] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
