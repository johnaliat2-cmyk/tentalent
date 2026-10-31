import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Search, BookOpen, Tag, ArrowUpRight, Sparkles } from 'lucide-react';
import { PageId } from '../types';

interface LibraryPageProps {
  onNavigate: (page: PageId) => void;
  onOpenLessonModal: () => void;
}

interface Treatise {
  id: string;
  title: string;
  category: string;
  abstract: string;
  tags: string[];
  date: string;
}

const TREATISES: Treatise[] = [
  {
    id: 't-1',
    title: 'The Mathematics of Ruin: Why Asymmetric Loss Ceilings Are Mandatory',
    category: 'Capital Preservation',
    abstract: 'An analytical proof demonstrating why a 50% drawdown requires a 100% gain just to recover to break-even. Mathematical algorithms for computing maximum position boundaries.',
    tags: ['Probability', 'Risk Modeling', 'Position Sizing'],
    date: 'Autumn 2024',
  },
  {
    id: 't-2',
    title: 'Order Book Depth vs Surface Price: Unpacking Market Microstructure',
    category: 'Market Mechanics',
    abstract: 'Why candlestick charts disguise the reality of liquidity pools, iceberg orders, and latency arbitrage. How market orders absorb limit orders across the spread.',
    tags: ['Level 2 DOM', 'Order Flow', 'Execution Friction'],
    date: 'Summer 2024',
  },
  {
    id: 't-3',
    title: 'The Disposition Effect: Anatomy of Human Impatience and Fear',
    category: 'Psychology',
    abstract: 'Investigating the cognitive flaw where traders cut profitable trades prematurely while clinging stubbornly to losing positions. Neurological counters and audit logs.',
    tags: ['Behavioral Biases', 'Cognitive Audits', 'Poise'],
    date: 'Spring 2024',
  },
  {
    id: 't-4',
    title: 'The Knickerbocker Trust Crisis of 1907: Liquidity Cascades in Action',
    category: 'Historical Case Study',
    abstract: 'A forensic dispatch into the sudden collapse of interbank trust, copper corner speculations, and how systemic contagion mirrors modern liquidity freezes.',
    tags: ['Historical Crises', 'Contagion', 'Sovereign Archives'],
    date: 'Winter 2023',
  },
  {
    id: 't-5',
    title: 'Auction Market Theory: Defining Balance, Excess, and Value Areas',
    category: 'Market Mechanics',
    abstract: 'Understanding price as a continuous double auction mechanism seeking fair value. Why technical indicator oscillation fails during directional structural expansion.',
    tags: ['Auction Theory', 'Market Structure', 'Volume Profile'],
    date: 'Autumn 2023',
  },
  {
    id: 't-6',
    title: 'The Pre-Flight Risk Checklist: Adapting Aviation Discipline to Capital',
    category: 'Discipline',
    abstract: 'How cockpit checklists reduced catastrophic airline incidents by 90%, and how a non-negotiable five-point trade journal checklist stops unforced emotional errors.',
    tags: ['Checklists', 'Pre-Trade Audits', 'Methodology'],
    date: 'Summer 2023',
  },
];

export const LibraryPage: React.FC<LibraryPageProps> = ({ onOpenLessonModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const prefersReducedMotion = useReducedMotion();

  const filtered = TREATISES.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="w-full flex flex-col bg-[#F5F3EC]">
      {/* Hero */}
      <section className="relative w-full bg-gradient-to-b from-[#0B2A52] via-[#0F3564] to-[#1B4A82] text-white pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="font-manrope text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Guides and lessons.
          </h1>

          <p className="text-base sm:text-xl text-white/85 max-w-2xl mx-auto mt-6 leading-relaxed">
            Methodical treatises on market mechanics, psychological discipline, and generational wealth governance.
          </p>

          {/* Integrated Search Input */}
          <div className="mt-8 max-w-xl mx-auto relative flex items-center">
            <Search className="w-5 h-5 absolute left-4 text-[#536477]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search treatises, mental models, historical cases..."
              className="w-full bg-white text-[#06182E] text-base sm:text-sm pl-12 pr-4 py-3.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#EDB671] placeholder:text-[#536477] shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Treatise Grid */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((t, idx) => (
            <motion.article
              key={t.id}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      y: -4,
                      boxShadow: '0 20px 40px -10px rgba(1, 25, 54, 0.12)',
                    }
              }
              className="bg-white rounded-3xl p-7 border border-[#011936]/10 flex flex-col justify-between hover:border-[#EDB671]/50 transition-all cursor-pointer group"
              onClick={onOpenLessonModal}
            >
              <div>
                <h3 className="font-manrope font-bold text-xl text-[#06182E] group-hover:text-[#80561a] transition-colors leading-snug mb-3">
                  {t.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#536477] leading-relaxed mb-6">
                  {t.abstract}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#011936]/5 mb-4">
                  {t.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono bg-[#F5F3EC] text-[#536477] px-2.5 py-0.5 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-[#011936]">
                  <span>Study this treatise</span>
                  <ArrowUpRight className="w-4 h-4 text-[#80561a] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
};
