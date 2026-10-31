import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { BookOpen, Users, Compass, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageId } from '../types';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenLessonModal: () => void;
}

const SERVICES = [
  {
    title: 'The Sovereign Fellowship Curriculum',
    desc: 'Structured 12-week course covering capital preservation mathematics, order book liquidity mechanics, auction theory, and psychological poise.',
    icon: BookOpen,
    bullets: [
      'Four progressive syllabus tracks (24 modules)',
      'Mathematical ruin probability calculations',
      'Annotated primary crisis source investigations',
    ],
    cta: 'Explore Academy Tracks',
    target: 'academy' as PageId,
  },
  {
    title: 'Paper Simulation Laboratory',
    desc: 'Live market price data feeds calibrated with authentic Level 2 limit order books, dynamic bracket orders, and realistic synthetic slippage.',
    icon: Compass,
    bullets: [
      'Risk-free testing environment with 100k virtual units',
      'Zero financial risk to personal capital',
      'Lifetime trade recording and execution replay',
    ],
    cta: 'Test the Simulator',
    target: 'academy' as PageId,
  },
  {
    title: 'Moderated Fellow Salons & Peer Review',
    desc: 'Weekly live seminar discussions and thesis defenses hosted from London. Engage with thoughtful peers committed to disciplined stewardship.',
    icon: Users,
    bullets: [
      'Strictly moderated to exclude speculative chatter',
      'Weekly weekend research dispatches & monographs',
      'Annual fellowship symposium in London',
    ],
    cta: 'Meet The Fellowship',
    target: 'community' as PageId,
  },
  {
    title: 'Direct Venture Stewardship',
    desc: 'Patient, non-syndicated capital allocation into durable real-economy enterprises. We back disciplined operators with balance sheet equity.',
    icon: Shield,
    bullets: [
      'Strictly balance sheet funded, no client funds',
      'Decade-long investment horizons',
      'Direct operational counsel & board stewardship',
    ],
    cta: 'View Backed Ventures',
    target: 'ventures' as PageId,
  },
];

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onOpenLessonModal,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="w-full flex flex-col bg-[#F5F3EC]">
      {/* Hero */}
      <section className="relative w-full bg-gradient-to-b from-[#0B2A52] to-[#1B4A82] text-white pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="font-manrope text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            What we offer today.
          </h1>

          <p className="text-base sm:text-xl text-white/85 max-w-2xl mx-auto mt-4 leading-relaxed">
            Methodical education, authentic community, and practical counsel designed to cultivate generational competence without speculation.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={idx}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        y: -4,
                        boxShadow: '0 20px 40px -10px rgba(1, 25, 54, 0.12)',
                      }
                }
                className="bg-white rounded-3xl p-8 border border-[#011936]/10 flex flex-col justify-between hover:border-[#EDB671]/60 transition-all duration-200"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#011936]/5 text-[#011936] flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[#80561a]" />
                  </div>

                  <h3 className="font-manrope font-bold text-2xl text-[#06182E] mt-1 mb-3">
                    {s.title}
                  </h3>
                  <p className="text-sm text-[#536477] leading-relaxed mb-6">
                    {s.desc}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {s.bullets.map((b, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-[#06182E]/80 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#80561a] shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#011936]/5">
                  <button
                    onClick={() => {
                      if (s.target === 'academy') {
                        onOpenLessonModal();
                      } else {
                        onNavigate(s.target);
                      }
                    }}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#011936] hover:text-[#80561a] transition-colors"
                  >
                    <span>{s.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
