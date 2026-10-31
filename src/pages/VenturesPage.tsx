import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ShieldCheck, Building2, Anchor, Cpu, Compass } from 'lucide-react';
import { PageId } from '../types';

interface VenturesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenLessonModal: () => void;
}

const VENTURES = [
  {
    name: 'Aethelgard Logistics',
    sector: 'Maritime & Cold Chain Infrastructure',
    description: 'Specialized port-adjacent temperature-controlled warehousing across the Thames Estuary. 100% equity-funded operating facilities.',
    icon: Anchor,
  },
  {
    name: 'Kallisto Applied Materials',
    sector: 'Precision Metrology & Industrial Alloys',
    description: 'High-tolerance calibration sensors for aerospace and renewable turbines. Profitable, cash-generative industrial engineering.',
    icon: Cpu,
  },
  {
    name: 'Mercantile Publishing Guild',
    sector: 'Editorial Press & Scholastic Monographs',
    description: 'Curating seminal economic treatises, historical primary texts, and mathematical risk management manuals for institutions.',
    icon: Building2,
  },
  {
    name: 'Severn River Agritech',
    sector: 'Sustainable Silvopasture & Food Sovereignty',
    description: 'Generational agricultural land management combining rotational grazing with automated soil microbiome diagnostic sensors.',
    icon: Compass,
  },
];

export const VenturesPage: React.FC<VenturesPageProps> = ({ onNavigate }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="w-full flex flex-col bg-[#F5F3EC]">
      {/* Hero */}
      <section className="relative w-full bg-gradient-to-b from-[#0B2A52] via-[#0F3564] to-[#011936] text-white pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[340px] bg-[#EDB671]/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="font-manrope text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Ventures we back with our own capital.
          </h1>

          <p className="text-xl sm:text-2xl text-[#EDB671] font-medium mt-4">
            Real businesses, run by people we know.
          </p>

          <p className="text-base sm:text-lg text-white/75 max-w-2xl mx-auto mt-4 leading-relaxed">
            We do not syndicate, broker, or solicit third-party capital. Every investment is funded exclusively from our own balance sheet into durable, cash-flowing operating companies.
          </p>
        </div>
      </section>

      {/* Ventures Portfolio Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VENTURES.map((v, idx) => {
            const Icon = v.icon;
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
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#011936]/5 text-[#011936] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#80561a]" />
                    </div>
                  </div>

                  <div className="text-xs font-mono uppercase tracking-wider text-[#536477]">
                    {v.sector}
                  </div>
                  <h3 className="font-manrope font-bold text-2xl text-[#06182E] mt-1 mb-3">
                    {v.name}
                  </h3>
                  <p className="text-sm text-[#536477] leading-relaxed">
                    {v.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#011936]/5 flex items-center justify-between text-xs font-mono text-[#011936]">
                  <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                    <ShieldCheck className="w-4 h-4" /> Sovereign Balance Sheet
                  </span>
                  <span className="text-[#80561a] font-semibold">Active Operating Entity</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA for Project Inquiries */}
        <div className="mt-16 rounded-3xl bg-[#011936] text-white p-8 sm:p-12 text-center flex flex-col items-center">
          <h3 className="font-manrope font-bold text-2xl sm:text-3xl">
            Are you an unhurried operator building an enduring business?
          </h3>
          <p className="text-white/70 text-sm max-w-xl mx-auto mt-2 mb-6">
            We partner with founders who value long-term generational stewardship over short-term venture inflation.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#EDB671] text-[#011936] font-semibold text-sm hover:bg-[#f0c388] transition-all hover:scale-102"
          >
            <span>Submit a project for review</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
