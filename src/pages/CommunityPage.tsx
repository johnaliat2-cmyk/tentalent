import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Users, Shield, MessageSquare, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageId } from '../types';

interface CommunityPageProps {
  onNavigate: (page: PageId) => void;
  onOpenLessonModal: () => void;
}

const FELLOWSHIP_PILLARS = [
  {
    title: 'Moderated Discourse',
    desc: 'No stock tips, no speculative boasting, no noisy emojis. Every conversation is held to academic standards of thesis formulation.',
  },
  {
    title: 'Weekly Thesis Defenses',
    desc: 'Fellows present their pre-trade journals and paper simulation executions for constructive peer audit and review.',
  },
  {
    title: 'Historical Archive Readings',
    desc: 'Collaborative readings into historical sovereign crises, banking panics, and the psychology of past market bubbles.',
  },
  {
    title: 'In-Person London Gatherings',
    desc: 'Unhurried quarterly symposiums hosted in London for members to meet face-to-face in an environment of quiet scholarship.',
  },
];

export const CommunityPage: React.FC<CommunityPageProps> = ({ onOpenLessonModal }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="w-full flex flex-col bg-[#F5F3EC]">
      {/* Hero */}
      <section className="relative w-full bg-gradient-to-b from-[#0B2A52] to-[#1B4A82] text-white pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="font-manrope text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Learn alongside people who steward well.
          </h1>

          <p className="text-base sm:text-xl text-white/85 max-w-2xl mx-auto mt-6 leading-relaxed">
            An unhurried fellowship of thoughtful market students, founders, and professionals practicing emotional poise, pre-execution discipline, and generational wisdom together.
          </p>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-[#EDB671]">
              Zero Speculative Hype
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-white">
              Moderated Discussion Only
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-white">
              Free First Lesson Included
            </span>
          </div>
        </div>
      </section>

      {/* Community Charter */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {FELLOWSHIP_PILLARS.map((col, idx) => (
            <motion.div
              key={idx}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
              className="bg-white rounded-3xl p-8 border border-[#011936]/10 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-manrope font-bold text-2xl text-[#06182E] mt-1 mb-3">
                  {col.title}
                </h3>
                <p className="text-sm text-[#536477] leading-relaxed">
                  {col.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#011936]/5 flex items-center gap-2 text-xs font-mono text-emerald-600 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Strictly Enforced Covenant</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Fellowship Banner */}
        <div className="rounded-3xl bg-[#011936] text-white p-8 sm:p-12 text-center flex flex-col items-center">
          <Users className="w-12 h-12 text-[#EDB671] mb-4" />
          <h3 className="font-manrope font-bold text-2xl sm:text-3xl max-w-xl">
            Take part in our next thesis salon
          </h3>
          <p className="text-white/70 text-sm max-w-lg mt-2 mb-8 leading-relaxed">
            Begin with your first complimentary lesson and join our student cohort this week.
          </p>
          <button
            onClick={onOpenLessonModal}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#EDB671] text-[#011936] font-semibold text-sm hover:bg-[#f0c388] transition-all hover:scale-102"
          >
            <span>Start free lesson &amp; join fellowship</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
