import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import {
  GraduationCap,
  Layers,
  Brain,
  Laptop,
  FileText,
  Users,
} from 'lucide-react';

interface FeatureItem {
  icon: React.ElementType;
  title: string;
  desc: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: GraduationCap,
    title: 'Epistemic Foundations',
    desc: 'Mathematical logic and rigorous study of primary texts to construct durable mental models.',
  },
  {
    icon: Layers,
    title: 'Structural Synthesis',
    desc: 'Deconstruct complex domains into foundational first principles and systemic feedback loops.',
  },
  {
    icon: Brain,
    title: 'Cognitive Poise',
    desc: 'Neutralize perceptual biases, haste, and heuristics through structured intellectual audits.',
  },
  {
    icon: Laptop,
    title: 'Hands-on Simulation',
    desc: 'Refine practical reasoning and test hypotheses in controlled laboratory research environments.',
  },
  {
    icon: FileText,
    title: 'Rigorous Documentation',
    desc: 'Every thesis documented, peer-reviewed, and cited against verifiable empirical standards.',
  },
  {
    icon: Users,
    title: 'Scholastic Fellowship',
    desc: 'Weekly historical case reviews and moderated debates among disciplined practitioners in London.',
  },
];

export const FeatureCards: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  // Container stagger
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // 100ms stagger between siblings
      },
    },
  };

  // 16px rise, 500ms, ease-out, trigger once at 20% in view
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {FEATURES.map((feature, idx) => {
        const Icon = feature.icon;
        return (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={
              prefersReducedMotion
                ? {}
                : {
                    y: -4, // hover lift 4px
                    boxShadow: '0 20px 40px -10px rgba(1, 25, 54, 0.12)',
                    transition: { duration: 0.25, ease: 'easeOut' },
                  }
            }
            className="group relative rounded-3xl bg-white p-7 sm:p-8 border border-[#011936]/10 shadow-sm transition-all duration-300 hover:border-[#EDB671]/60 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                {/* Icon illuminates in gold on hover */}
                <div className="w-12 h-12 rounded-2xl bg-[#011936]/5 flex items-center justify-center text-[#011936] group-hover:bg-[#EDB671] group-hover:text-[#011936] transition-colors duration-300">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>
              </div>

              <h3 className="font-manrope text-xl font-bold text-[#06182E] mb-3 group-hover:text-[#011936] transition-colors">
                {feature.title}
              </h3>

              <p className="text-[#536477] text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#011936]/5 flex items-center justify-between text-xs font-mono text-[#536477]">
              <span>Verified Syllabus Unit</span>
              <span className="text-[#80561a] font-semibold">100% Academic</span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
