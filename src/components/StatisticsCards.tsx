import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { CheckCircle } from 'lucide-react';

interface StatProgressItem {
  label: string;
  percent: number; // 0 to 100
}

interface StatCardProps {
  category: string;
  title: string;
  items: StatProgressItem[];
}

const STAT_CARDS: StatCardProps[] = [
  {
    category: 'Pedagogy & Competence',
    title: 'Curriculum Completion Units',
    items: [
      { label: 'Foundational Preservation Proofs', percent: 94 },
      { label: 'Order Depth & Limit Mechanics', percent: 86 },
      { label: 'Auction Theory Value Profiling', percent: 78 },
      { label: 'Pre-Trade Psychological Sign-Off', percent: 96 },
    ],
  },
  {
    category: 'Paper Simulation Hours',
    title: 'Execution Discipline Index',
    items: [
      { label: 'Adherence to Pre-Set Stop Ceilings', percent: 98 },
      { label: 'Slippage Tolerance Management', percent: 82 },
      { label: 'Bracket Order Automation Usage', percent: 90 },
      { label: 'Drawdown Circuit Breaker Respect', percent: 100 },
    ],
  },
  {
    category: 'Scholastic Audit Trail',
    title: 'Weekly Thesis Defenses',
    items: [
      { label: 'Logged Pre-Flight Rationales', percent: 95 },
      { label: 'Fellowship Peer Review Passing', percent: 88 },
      { label: 'Post-Mortem Error Decomposition', percent: 92 },
      { label: 'Historical Case Cross-Referencing', percent: 84 },
    ],
  },
];

// Animated Count-Up Number (counts from 0 to target in 1200ms ease-out)
const CountUpItem: React.FC<{
  target: number;
  suffix?: string;
  label: string;
  sublabel: string;
}> = ({ target, suffix = '', label, sublabel }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    const duration = 1200; // 1200ms
    const startTime = performance.now();

    const animateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo: 1 - Math.pow(2, -10 * progress)
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, target, prefersReducedMotion]);

  return (
    <div ref={ref} className="text-center p-6 bg-white rounded-3xl border border-[#011936]/10 shadow-sm">
      <div className="font-manrope text-4xl sm:text-5xl font-extrabold text-[#06182E] tracking-tight">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-base font-bold text-[#06182E] mt-2 font-manrope">{label}</div>
      <div className="text-xs text-[#536477] font-mono mt-1">{sublabel}</div>
    </div>
  );
};

export const StatisticsCards: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="w-full py-16 sm:py-24 bg-[#F5F3EC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ============================================================ */}
        {/* SUB-SECTION 1: 3-Card Row matching video Frame 28-29 */}
        {/* "Balance", "Sessions", "Report" */}
        {/* ============================================================ */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-manrope text-[#06182E] tracking-tight">
              Designed for Convenience, Built for Your Mastery Trajectory
            </h2>
            <p className="text-sm sm:text-base text-[#536477] mt-3">
              A disciplined platform built to test hypotheses, audit every assumption, and protect capital through comprehensive simulation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1: Balance / Preservation */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              whileHover={prefersReducedMotion ? {} : { y: -4, transition: { duration: 0.25 } }}
              className="bg-white rounded-3xl p-6 border border-[#011936]/10 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all group"
            >
              {/* Mockup Preview Area */}
              <div className="w-full h-40 bg-[#d8e0eb]/60 rounded-2xl flex items-center justify-center overflow-hidden mb-6 relative p-4">
                {/* Lilac mini card representation */}
                <div className="w-48 h-28 bg-gradient-to-tr from-[#9eb1d9] via-[#c2cee4] to-[#f0e8f7] rounded-xl p-3 shadow-md border border-white/60 flex flex-col justify-between transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-[#011936] font-semibold">Ten Talents</span>
                    <div className="w-5 h-3 rounded-sm bg-gradient-to-r from-amber-400 to-amber-600 opacity-80" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-[#011936]/70 uppercase">Mastery Scholar</div>
                    <div className="text-[11px] font-bold text-[#011936] font-mono">Derrick Fisher</div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold font-manrope text-[#06182E] mb-2">Balance</h3>
              <p className="text-xs text-[#536477] leading-relaxed">
                Structured ledger simulations and continuous verification of paper assets with zero real-capital exposure.
              </p>
            </motion.div>

            {/* Card 2: Sessions / Simulation */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              whileHover={prefersReducedMotion ? {} : { y: -4, transition: { duration: 0.25 } }}
              className="bg-white rounded-3xl p-6 border border-[#011936]/10 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all group"
            >
              {/* Wave Chart Preview Area */}
              <div className="w-full h-40 bg-[#d8e0eb]/60 rounded-2xl flex items-center justify-center overflow-hidden mb-6 p-4">
                <svg className="w-full h-24" viewBox="0 0 200 80" fill="none">
                  <motion.path
                    d="M 10 60 C 40 20, 60 70, 90 30 C 120 -10, 150 50, 190 20"
                    stroke="#011936"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                  <circle cx="90" cy="30" r="4" fill="#EDB671" stroke="#011936" strokeWidth="2" />
                  <circle cx="190" cy="20" r="4" fill="#EDB671" stroke="#011936" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-manrope text-[#06182E] mb-2">Sessions</h3>
              <p className="text-xs text-[#536477] leading-relaxed">
                Replicate historical market hours with synchronized tick playback to train fast pattern recognition and calm composure.
              </p>
            </motion.div>

            {/* Card 3: Report / Scholastic Audit */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              whileHover={prefersReducedMotion ? {} : { y: -4, transition: { duration: 0.25 } }}
              className="bg-white rounded-3xl p-6 border border-[#011936]/10 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all group"
            >
              {/* Stacked Report Perspective Area */}
              <div className="w-full h-40 bg-[#d8e0eb]/60 rounded-2xl flex items-center justify-center overflow-hidden mb-6 p-4 relative">
                <div className="w-36 h-24 bg-white/90 rounded-xl shadow border border-slate-200/80 p-3 transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                  <div className="w-12 h-2 bg-[#011936]/20 rounded mb-2" />
                  <div className="w-24 h-1.5 bg-[#011936]/10 rounded mb-1" />
                  <div className="w-20 h-1.5 bg-[#011936]/10 rounded mb-2" />
                  <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                    <span className="text-[8px] font-mono text-emerald-600 font-bold">100% AUDITED</span>
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold font-manrope text-[#06182E] mb-2">Report</h3>
              <p className="text-xs text-[#536477] leading-relaxed">
                Weekly post-mortem journals dissecting every decision against formal risk preservation parameters.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SUB-SECTION 2: Line Chart Draw Section (matching video Frame 31) */}
        {/* Left: Text, Right: $10,000 to $0, 2016-2019 line drawing in */}
        {/* ============================================================ */}
        <div className="mb-24 bg-white rounded-3xl p-8 sm:p-12 border border-[#011936]/10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Column: Text */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-manrope text-[#06182E] tracking-tight leading-snug">
                Continuous verification for complete peace of mind.
              </h3>
              <p className="text-sm sm:text-base text-[#536477] mt-4 leading-relaxed">
                Your discipline matters. That's why we utilize institutional-grade scenario engines, multi-step execution validation, and objective journal audits to protect your reasoning before entering actual positions.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-[#06182E]">
                  <div className="w-5 h-5 rounded-full bg-[#EDB671]/20 flex items-center justify-center text-[#80561a] font-bold text-xs">✓</div>
                  <span className="font-medium">Strict pre-trade checklist authorization</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#06182E]">
                  <div className="w-5 h-5 rounded-full bg-[#EDB671]/20 flex items-center justify-center text-[#80561a] font-bold text-xs">✓</div>
                  <span className="font-medium">Drawdown limits hardwired into simulator sessions</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#06182E]">
                  <div className="w-5 h-5 rounded-full bg-[#EDB671]/20 flex items-center justify-center text-[#80561a] font-bold text-xs">✓</div>
                  <span className="font-medium">Audited peer review prior to curriculum graduation</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Animated Line Chart (Draws in 800ms) */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="bg-[#F5F3EC] rounded-2xl p-6 sm:p-8 border border-[#011936]/10"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#536477] font-semibold">
                  Paper Portfolio Stress Curve
                </span>
                <span className="text-[10px] font-mono text-[#80561a] bg-[#EDB671]/20 px-2 py-0.5 rounded-full font-semibold">
                  Simulated
                </span>
              </div>

              {/* Chart Canvas */}
              <div className="w-full relative pt-4">
                {/* SVG line */}
                <svg className="w-full h-48 overflow-visible" viewBox="0 0 400 160">
                  {/* Grid Lines */}
                  <line x1="50" y1="30" x2="380" y2="30" stroke="#011936" strokeOpacity="0.08" strokeDasharray="3 3" />
                  <text x="40" y="34" textAnchor="end" className="text-[10px] font-mono fill-[#536477]">$10,000</text>

                  <line x1="50" y1="90" x2="380" y2="90" stroke="#011936" strokeOpacity="0.08" strokeDasharray="3 3" />
                  <text x="40" y="94" textAnchor="end" className="text-[10px] font-mono fill-[#536477]">$5,000</text>

                  <line x1="50" y1="150" x2="380" y2="150" stroke="#011936" strokeOpacity="0.08" strokeDasharray="3 3" />
                  <text x="40" y="154" textAnchor="end" className="text-[10px] font-mono fill-[#536477]">$0</text>

                  {/* Animated Path (800ms stroke draw) */}
                  <motion.path
                    d="M 60 135 L 150 95 L 240 25 L 340 30"
                    fill="none"
                    stroke="#011936"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.8, // 800ms line draw
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />

                  {/* Dots at data points */}
                  <motion.circle
                    cx="60"
                    cy="135"
                    r="5"
                    fill="white"
                    stroke="#011936"
                    strokeWidth="3"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  />
                  <motion.circle
                    cx="150"
                    cy="95"
                    r="5"
                    fill="white"
                    stroke="#011936"
                    strokeWidth="3"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35, duration: 0.3 }}
                  />
                  <motion.circle
                    cx="240"
                    cy="25"
                    r="6"
                    fill="#EDB671"
                    stroke="#011936"
                    strokeWidth="3"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                  />
                  <motion.circle
                    cx="340"
                    cy="30"
                    r="5"
                    fill="white"
                    stroke="#011936"
                    strokeWidth="3"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.3 }}
                  />
                </svg>

                {/* X-Axis labels matching video Frame 31 */}
                <div className="flex justify-between pl-12 pr-4 mt-2 text-xs font-mono text-[#536477]">
                  <span>2016</span>
                  <span>2017</span>
                  <span>2018</span>
                  <span>2019</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SUB-SECTION 3: Section Header for Card Expense Statistics */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-manrope text-[#06182E] tracking-tight">
            Learning Progress Statistics
          </h2>
          <p className="text-sm sm:text-base text-[#536477] mt-3">
            Institutional metric cards tracking syllabus comprehension, simulation hours, and rule adherence.
          </p>
        </div>

        {/* 3 Columns of Stat Cards with animated bars (800ms) and 4px hover lift */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {STAT_CARDS.map((card, idx) => (
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
                      transition: { duration: 0.25, ease: 'easeOut' },
                    }
              }
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#011936]/10 flex flex-col justify-between shadow-sm hover:border-[#EDB671]/60 transition-colors"
            >
              <div>
                <div className="text-xs font-mono text-[#536477] uppercase tracking-wider">
                  {card.category}
                </div>
                <h3 className="text-lg font-bold font-manrope text-[#06182E] mt-0.5 mb-6">
                  {card.title}
                </h3>

                {/* Animated Bars that draw in on scroll (800ms) */}
                <div className="space-y-4">
                  {card.items.map((item, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-[#06182E] truncate max-w-[200px]">
                          {item.label}
                        </span>
                      </div>

                      {/* Bar Container */}
                      <div className="w-full h-2.5 bg-[#F5F3EC] rounded-full overflow-hidden p-0.5 border border-[#011936]/5">
                        <motion.div
                          initial={prefersReducedMotion ? { width: `${item.percent}%` } : { width: 0 }}
                          whileInView={{ width: `${item.percent}%` }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{
                            duration: 0.8, // 800ms bar draw animation
                            delay: idx * 0.1 + i * 0.08,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-[#011936] via-[#0b2447] to-[#EDB671]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-8 pt-4 border-t border-[#011936]/5 flex items-center justify-between text-xs font-mono text-[#536477]">
                <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" /> Standard Satisfied
                </span>
                <span className="text-slate-400">Non-Monetary</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ============================================================ */}
        {/* SUB-SECTION 4: 3-Column Stats Row with Animated Count-Up Numbers */}
        {/* Counting up from 0 when in view (1200ms ease-out) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <CountUpItem
            target={48}
            suffix=""
            label="Syllabus Modules"
            sublabel="Pedagogical lessons across 4 core tracks"
          />
          <CountUpItem
            target={360}
            suffix="+"
            label="Simulation Hours"
            sublabel="Requisite paper execution practice required"
          />
          <CountUpItem
            target={1420}
            suffix="+"
            label="Theses Audited"
            sublabel="Peer-reviewed risk rationales documented"
          />
        </div>

      </div>
    </div>
  );
};
