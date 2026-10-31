import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { UserCheck } from 'lucide-react';

interface ArchetypeCard {
  role: string;
  background: string;
  focusArea: string;
  methodologyFeedback: string;
}

const CARDS: ArchetypeCard[] = [
  {
    role: 'Researcher',
    background: 'Behavioral Systems & Decision Architecture',
    focusArea: 'Epistemic logic models & dialectics',
    methodologyFeedback:
      '[Placeholder: Scholar Archetype A] Emphasises that deconstructing mental models and systematic bias auditing removed all cognitive panic before publishing formal research.',
  },
  {
    role: 'Information Systems Architect',
    background: 'Complex Systems Dynamics',
    focusArea: 'First principles & feedback loop modeling',
    methodologyFeedback:
      '[Placeholder: Scholar Archetype B] Highlights the pre-defense intellectual audit requirement as the single most impactful discipline for eliminating unforced analytical errors.',
  },
  {
    role: 'Academic Research Fellow',
    background: 'Philosophy & Historical Inquiry',
    focusArea: 'Primary archival texts & logical proofs',
    methodologyFeedback:
      '[Placeholder: Scholar Archetype C] Commends the absence of superficial claims, noting the curriculum focuses entirely on rigorous reasoning frameworks and historical case studies.',
  },
  {
    role: 'Institutional Policy Analyst',
    background: 'Systemic Resilience & Governance',
    focusArea: 'Historical institutional crises & stability',
    methodologyFeedback:
      '[Placeholder: Scholar Archetype D] Values the unhurried pedagogical pace, where no participant advances until every foundational thesis is defended and documented.',
  },
];

export const TestimonialsSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // 100ms stagger between siblings
      },
    },
  };

  const cardVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="w-full py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header - Heading transitions cleanly to top with no eyebrow badge */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-manrope text-[#06182E] tracking-tight">
            How disciplined scholars practice
          </h2>
          <p className="text-sm sm:text-base text-[#536477] mt-3">
            Clearly labeled student archetypes illustrating how different backgrounds apply our non-advisory educational framework.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {CARDS.map((card, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      y: -4,
                      boxShadow: '0 16px 36px -8px rgba(1, 25, 54, 0.12)',
                      transition: { duration: 0.25, ease: 'easeOut' },
                    }
              }
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#011936]/10 flex flex-col justify-between transition-colors hover:border-[#EDB671]/50"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#011936]/5 text-[#011936] flex items-center justify-center font-bold text-xs">
                      <UserCheck className="w-5 h-5 text-[#80561a]" />
                    </div>
                    <div>
                      <h4 className="font-manrope font-bold text-base text-[#06182E]">
                        {card.role}
                      </h4>
                      <p className="text-xs text-[#536477]">{card.background}</p>
                    </div>
                  </div>
                </div>

                <div className="text-xs font-mono text-[#80561a] mb-2 font-semibold">
                  Focus: {card.focusArea}
                </div>

                <p className="text-sm text-[#536477] leading-relaxed italic">
                  "{card.methodologyFeedback}"
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Verified Fellow Profile</span>
                <span className="text-emerald-600 font-medium">Archived Review</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
