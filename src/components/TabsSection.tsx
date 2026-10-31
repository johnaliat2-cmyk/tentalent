import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { BookOpen, Laptop, FileText, Target, CheckCircle2, ArrowRight } from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge: string;
  sentence: string;
  illustration: {
    title: string;
    metrics: { label: string; value: string }[];
    details: string[];
    gradient: string;
  };
}

const TABS: TabItem[] = [
  {
    id: 'learn',
    label: 'Learn',
    icon: BookOpen,
    badge: '',
    sentence: 'Master primary texts, structural logic, and dialectical inquiry through progressive, unhurried academic syllabus units.',
    illustration: {
      title: 'Epistemic Framework Matrix',
      metrics: [
        { label: 'Syllabus Units', value: '48 Modules' },
        { label: 'Primary Treatises', value: '120 Texts' },
        { label: 'Foundational Proofs', value: '100% Mastered' },
      ],
      details: [
        'First principles decomposition of complex information systems',
        'Historical case study analyses across multi-century archives',
        'Direct cognitive self-assessment at the end of each unit',
      ],
      gradient: 'from-[#0b2447] via-[#06182E] to-[#010c18]',
    },
  },
  {
    id: 'simulate',
    label: 'Practice',
    icon: Laptop,
    badge: '',
    sentence: 'Test hypotheses, formulate arguments, and refine reasoning models in our interactive research seminar environments.',
    illustration: {
      title: 'Interactive Dialectical Studio',
      metrics: [
        { label: 'Seminar Sessions', value: '320+ Hours' },
        { label: 'Argument Defenses', value: '48 Rounds' },
        { label: 'Peer Feedback Latency', value: '<24 Hours' },
      ],
      details: [
        'Real-time simulation of formal debate and structured cross-examination',
        'Dynamic thesis formulation and hypothesis falsification checks',
        'Realistic argumentation scenarios with fellow scholars in London',
      ],
      gradient: 'from-[#0f2e59] via-[#071c35] to-[#011122]',
    },
  },
  {
    id: 'journal',
    label: 'Journal',
    icon: FileText,
    badge: '',
    sentence: 'Systematically catalog your intellectual rationales, cognitive temperature, and reasoning steps before and after every thesis.',
    illustration: {
      title: 'Pre-Defense Intellectual Audit & Log',
      metrics: [
        { label: 'Audit Compliance', value: '98.4%' },
        { label: 'Logged Theses', value: '142 Entries' },
        { label: 'Bias Reduction', value: '-65% Errors' },
      ],
      details: [
        'Pre-flight inquiry checklist must be verified before thesis submission',
        'Cognitive state scoring: Objective, Biased, Hurried, or Exhausted',
        'Weekly peer audit by senior stewardship fellows',
      ],
      gradient: 'from-[#122e54] via-[#081a33] to-[#010d1c]',
    },
  },
  {
    id: 'goals',
    label: 'Goals',
    icon: Target,
    badge: '',
    sentence: 'Establish multi-year intellectual milestones, interdisciplinary scholarship, and durable knowledge stewardship.',
    illustration: {
      title: 'Generational Scholarship Roadmap',
      metrics: [
        { label: 'Time Horizon', value: '10+ Years' },
        { label: 'Discipline Target', value: 'Consistency' },
        { label: 'Review Frequency', value: 'Quarterly' },
      ],
      details: [
        'Mastery benchmarks tied to intellectual poise and rigorous inquiry',
        'Academic development tracking across philosophy, logic, and systems',
        'Direct mentorship reviews with experienced guild practitioners',
      ],
      gradient: 'from-[#0c284f] via-[#061830] to-[#000f20]',
    },
  },
];

export const TabsSection: React.FC<{ onCtaClick: () => void }> = ({ onCtaClick }) => {
  const [activeTabId, setActiveTabId] = useState('learn');
  const tabListRef = useRef<HTMLDivElement>(null);

  const activeTab = TABS.find((t) => t.id === activeTabId) || TABS[0];
  const prefersReducedMotion = useReducedMotion();

  // Handle keyboard arrow navigation (ARIA tabs pattern)
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % TABS.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + TABS.length) % TABS.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = TABS.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    setActiveTabId(TABS[nextIndex].id);
    const tabs = tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    tabs?.[nextIndex]?.focus();
  };

  return (
    <div className="w-full py-16 sm:py-24 bg-[#fdfcf9] border-y border-[#011936]/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header - Heading transitions cleanly to top with no eyebrow badge */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-manrope text-[#06182E] tracking-tight">
            How our members develop mastery
          </h2>
          <p className="text-sm sm:text-base text-[#536477] mt-3">
            A four-stage methodology guiding scholars from fundamental principles to active research and long-term stewardship.
          </p>
        </div>

        {/* ARIA Tablist with Bottom Sliding Underline matching video frame 15 */}
        <div className="flex justify-center mb-12 border-b border-slate-200">
          <div
            ref={tabListRef}
            role="tablist"
            aria-label="Mastery Stages"
            className="inline-flex items-center gap-6 sm:gap-12 relative max-w-full overflow-x-auto no-scrollbar"
          >
            {TABS.map((tab, idx) => {
              const isActive = activeTabId === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTabId(tab.id)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`relative pb-4 px-2 text-sm sm:text-base font-bold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#EDB671] flex items-center gap-2 ${
                    isActive ? 'text-[#011936]' : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>

                  {/* Active bottom underline sliding across tabs */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBottomLine"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#011936] rounded-full"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 32,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cross-Fade Active Panel Content (250ms crossfade) */}
        <div className="relative min-h-[460px] sm:min-h-[480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              role="tabpanel"
              id={`panel-${activeTab.id}`}
              aria-labelledby={`tab-${activeTab.id}`}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-[#011936]/10 shadow-lg"
            >
              {/* Left Column: Descriptive Sentence & Bullet Points */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  {activeTab.badge && activeTab.badge.trim() !== '' && (
                    <span className="font-mono text-xs uppercase tracking-wider text-[#80561a] font-semibold bg-[#EDB671]/20 px-3 py-1 rounded-full">
                      {activeTab.badge}
                    </span>
                  )}
                  <h3 className={`text-2xl sm:text-3xl font-extrabold font-manrope text-[#06182E] ${activeTab.badge && activeTab.badge.trim() !== '' ? 'mt-3' : ''}`}>
                    {activeTab.label} Stage
                  </h3>
                </div>

                <p className="text-base sm:text-lg text-[#536477] leading-relaxed">
                  {activeTab.sentence}
                </p>

                <div className="space-y-3 pt-2 border-t border-slate-100">
                  {activeTab.illustration.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#06182E]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={onCtaClick}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#011936] hover:text-[#80561a] transition-colors group"
                  >
                    <span>Begin this module</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Right Column: Panel Illustration with Concentric Ripple Rings */}
              <div className="lg:col-span-7">
                <div
                  className={`relative rounded-3xl bg-gradient-to-tr ${activeTab.illustration.gradient} text-white p-6 sm:p-10 shadow-xl overflow-hidden border border-white/10 flex flex-col justify-between min-h-[360px]`}
                >
                  {/* Background Ripple Rings */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="w-96 h-96 rounded-full border border-white" />
                    <div className="w-72 h-72 rounded-full border border-white absolute" />
                    <div className="w-48 h-48 rounded-full border border-white absolute" />
                  </div>

                  {/* Header */}
                  <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <h4 className="font-manrope font-bold text-xl sm:text-2xl mt-0.5">
                        {activeTab.illustration.title}
                      </h4>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#EDB671]">
                      <activeTab.icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Central Metrics Grid */}
                  <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
                    {activeTab.illustration.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
                      >
                        <div className="text-[11px] font-mono text-white/60 uppercase">
                          {m.label}
                        </div>
                        <div className="font-manrope font-extrabold text-lg sm:text-xl text-white mt-1 text-[#EDB671]">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Verification Footer removed */}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
