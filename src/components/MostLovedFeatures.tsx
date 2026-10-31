import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ShieldAlert,
  Layers,
  Brain,
  TrendingUp,
  Laptop,
  BookMarked,
  Library,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';

interface FeatureItem {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  icon: React.ElementType;
  badge1Icon: string;
  badge2Icon: string;
  ringColor: string;
}

const ITEMS: FeatureItem[] = [
  {
    id: 'track-1',
    name: 'Capital Preservation Architecture',
    subtitle: 'Define exact mathematical ruin boundaries before entering any trade ticket.',
    category: 'Track 01',
    icon: ShieldAlert,
    badge1Icon: 'shield',
    badge2Icon: 'lock',
    ringColor: '#EDB671',
  },
  {
    id: 'track-2',
    name: 'Market Depth & Order Flow',
    subtitle: 'Real-time Level 2 book visualizer with true synthetic execution slippage.',
    category: 'Track 02',
    icon: Layers,
    badge1Icon: 'layers',
    badge2Icon: 'activity',
    ringColor: '#38bdf8',
  },
  {
    id: 'track-3',
    name: 'Behavioral Biases & Emotional Poise',
    subtitle: 'Pre-flight emotional audits to eliminate revenge trading and disposition bias.',
    category: 'Track 03',
    icon: Brain,
    badge1Icon: 'brain',
    badge2Icon: 'check',
    ringColor: '#a855f7',
  },
  {
    id: 'track-4',
    name: 'Auction Theory & Market Structure',
    subtitle: 'Volume-weighted price distributions and fair value range identification.',
    category: 'Track 04',
    icon: TrendingUp,
    badge1Icon: 'trending-up',
    badge2Icon: 'bar-chart',
    ringColor: '#34d399',
  },
  {
    id: 'simulator',
    name: 'Risk-Free Paper Simulator',
    subtitle: 'Virtual 100,000 pts sandbox wired to live historical market tick feeds.',
    category: 'Sandbox',
    icon: Laptop,
    badge1Icon: 'terminal',
    badge2Icon: 'zap',
    ringColor: '#f59e0b',
  },
  {
    id: 'journal',
    name: 'Pre-Trade Journal Audit',
    subtitle: 'Multi-point thesis verification signed and archived before order execution.',
    category: 'Discipline',
    icon: BookMarked,
    badge1Icon: 'book',
    badge2Icon: 'file-text',
    ringColor: '#6366f1',
  },
  {
    id: 'library',
    name: 'The Scholastic Library Archive',
    subtitle: 'Fifty archival dispatches analyzing historical systemic liquidity panics.',
    category: 'Library',
    icon: Library,
    badge1Icon: 'archive',
    badge2Icon: 'award',
    ringColor: '#10b981',
  },
];

export const MostLovedFeatures: React.FC<{ onCtaClick: () => void }> = ({ onCtaClick }) => {
  const [activeId, setActiveId] = useState<string>('track-1');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string>('track-1');
  const prefersReducedMotion = useReducedMotion();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeItem = ITEMS.find((i) => i.id === activeId) || ITEMS[0];

  // Auto-advance every 5 seconds until the user interacts
  useEffect(() => {
    if (hasInteracted) return;

    timerRef.current = setInterval(() => {
      setActiveId((prev) => {
        const currentIndex = ITEMS.findIndex((item) => item.id === prev);
        const nextIndex = (currentIndex + 1) % ITEMS.length;
        return ITEMS[nextIndex].id;
      });
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hasInteracted]);

  const handleItemClick = (id: string) => {
    setHasInteracted(true);
    setActiveId(id);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  return (
    <div className="w-full py-16 sm:py-24 bg-[#F5F3EC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-manrope text-[#06182E] tracking-tight">
            Most Loved Features
          </h2>
          <p className="text-base sm:text-lg text-[#536477] mt-3">
            Experience our four progressive tracks, paper terminal simulator, and pre-execution journal.
          </p>
        </div>

        {/* Desktop View: Two Columns matching video frame 30 */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-center">
          {/* Left Column: Vertical List with Active Navy Card & Light Cards */}
          <div className="col-span-5 space-y-3">
            {ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <div key={item.id} className="relative">
                  {isActive ? (
                    <motion.div
                      layoutId="activeFeaturePill"
                      className="relative rounded-2xl bg-[#011936] text-white p-5 pl-6 shadow-xl border border-white/10 overflow-hidden cursor-pointer"
                      onClick={() => handleItemClick(item.id)}
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    >
                      {/* Purple/Gold Accent Indicator Pill on Left Edge from Video Frame 30 */}
                      <div className="absolute left-2.5 top-3.5 bottom-3.5 w-1.5 bg-[#80561a] rounded-full" />

                      <div className="pl-2">
                        <h3 className="font-manrope font-bold text-base text-white">
                          {item.name}
                        </h3>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          {item.subtitle}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <button
                      onClick={() => handleItemClick(item.id)}
                      className="w-full text-left rounded-2xl bg-[#e8eef8]/80 hover:bg-[#e1eaf5] text-slate-800 font-semibold text-sm p-4 px-5 border border-slate-200/60 transition-colors duration-150 flex items-center justify-between"
                    >
                      <span>{item.name}</span>
                      <span className="text-[11px] font-mono text-slate-400 uppercase">
                        {item.category}
                      </span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual with Concentric Orbital Rings & Cross-Fade */}
          <div className="col-span-7 sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="rounded-[36px] bg-gradient-to-b from-[#e3ebf6] to-[#ecf2fa] border border-slate-200/90 shadow-2xl p-8 sm:p-12 relative overflow-hidden min-h-[460px] flex flex-col justify-between"
              >
                {/* Concentric Curved Orbital Rings from Video Frame 30 */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
                  <div className="w-[280px] h-[280px] rounded-full border-2 border-dashed border-slate-300" />
                  <div className="absolute w-[440px] h-[440px] rounded-full border-2 border-slate-300/80" />
                  <div className="absolute w-[600px] h-[600px] rounded-full border border-slate-300/50" />
                </div>

                {/* Floating Orbital Badges */}
                <div className="relative z-10 flex items-center justify-between mb-8">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#011936] font-bold bg-white/90 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm">
                    {activeItem.category} Demonstration
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                {/* Central Floating App Icons from Video */}
                <div className="relative z-10 flex items-center justify-center my-auto py-8">
                  <div className="relative w-36 h-36 rounded-full bg-white border border-slate-200 shadow-xl flex items-center justify-center">
                    <activeItem.icon className="w-16 h-16 text-[#011936]" />

                    {/* Orbiting Badge 1 (Top Left) */}
                    <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-blue-600">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center font-bold text-xs">
                        TT
                      </div>
                    </div>

                    {/* Orbiting Badge 2 (Bottom Right) */}
                    <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-emerald-600">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-xs">
                        ✓
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Details and Action */}
                <div className="relative z-10 bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-manrope font-bold text-base text-[#011936]">
                      {activeItem.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {activeItem.subtitle}
                    </p>
                  </div>
                  <button
                    onClick={onCtaClick}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#011936] text-white text-xs font-semibold hover:bg-[#06182E] transition-all hover:scale-102 shrink-0 shadow-md"
                  >
                    <span>Start free lesson</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#EDB671]" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Accordion View */}
        <div className="lg:hidden space-y-3">
          {ITEMS.map((item) => {
            const isOpen = openMobileAccordion === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-[#011936] text-white border-[#EDB671]/40 shadow-lg'
                    : 'bg-white text-slate-800 border-slate-200/80'
                }`}
              >
                <button
                  onClick={() => setOpenMobileAccordion(isOpen ? '' : item.id)}
                  className="w-full p-4 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    {isOpen && (
                      <div className="w-1.5 h-8 bg-[#80561a] rounded-full" />
                    )}
                    <div>
                      <div className="text-sm font-bold font-manrope">{item.name}</div>
                      <div
                        className={`text-[10px] font-mono uppercase ${
                          isOpen ? 'text-[#EDB671]' : 'text-slate-400'
                        }`}
                      >
                        {item.category}
                      </div>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#EDB671]' : 'text-slate-400'
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-5 pb-6 pt-2 border-t border-white/10 space-y-4"
                    >
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.subtitle}
                      </p>

                      <button
                        onClick={onCtaClick}
                        className="w-full py-2.5 rounded-full bg-[#EDB671] text-[#011936] font-semibold text-xs text-center"
                      >
                        Start free lesson on this track
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
