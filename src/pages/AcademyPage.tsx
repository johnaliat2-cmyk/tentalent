import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Play, ArrowRight } from 'lucide-react';
import { TiltedDashboard3D } from '../components/TiltedDashboard3D';
import { LogoMarquee } from '../components/LogoMarquee';
import { MostLovedFeatures } from '../components/MostLovedFeatures';
import { ChecklistSplitBlock } from '../components/ChecklistSplitBlock';
import { StatisticsCards } from '../components/StatisticsCards';
import { PricingFaqSection } from '../components/PricingFaqSection';

interface AcademyPageProps {
  onOpenVideoModal: () => void;
  onOpenLessonModal: () => void;
}

export const AcademyPage: React.FC<AcademyPageProps> = ({
  onOpenVideoModal,
  onOpenLessonModal,
}) => {
  const prefersReducedMotion = useReducedMotion();

  // Staggered load fade in (150ms between elements) from a plain background
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15, // 150ms stagger
      },
    },
  };

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  return (
    <div className="w-full flex flex-col bg-[#F5F3EC]">
      {/* ============================================================ */}
      {/* 1. PAGE LOAD: Plain background, heading, sub-line, video pill (stagger 150ms) */}
      {/* ============================================================ */}
      <section className="w-full pt-32 sm:pt-40 pb-8 sm:pb-12 px-4 sm:px-6 bg-[#F5F3EC] text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-manrope text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#06182E] tracking-tight leading-[1.15]"
          >
            Learn → Understand → Simulate → then decide.
          </motion.h1>

          {/* Sub-line */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-xl text-[#536477] max-w-2xl mt-6 leading-relaxed"
          >
            A methodical curriculum designed to cultivate intellectual rigor, emotional discipline, and capital preservation before a single pound is ever allocated.
          </motion.p>

          {/* Actions: "Watch video" navy pill button + "Start free lesson" gold button */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8"
          >
            {/* Navy Pill "Watch video" Button */}
            <button
              onClick={onOpenVideoModal}
              className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#011936] text-white hover:bg-[#06182E] text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 focus-visible:ring-2 focus-visible:ring-[#EDB671]"
            >
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                <Play className="w-3 h-3 fill-current text-[#EDB671] ml-0.5" />
              </div>
              <span>Watch video</span>
            </button>

            {/* Gold Pill "Start free lesson" Button */}
            <button
              onClick={onOpenLessonModal}
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#EDB671] text-[#011936] font-semibold text-sm hover:bg-[#f0c388] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 focus-visible:ring-2 focus-visible:ring-[#011936]"
            >
              <span>Start free lesson</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-xs text-[#536477]/70 font-mono tracking-wider mt-4"
          >
            First lesson free · No financial deposits · Lifetime paper simulation
          </motion.p>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/* 2. 3D TILTED DASHBOARD: 45deg rotateX, -12deg rotateZ, perspective 1200px */}
      {/* Flattens to 0deg and scales up on scroll, fades out toward next section */}
      {/* ============================================================ */}
      <TiltedDashboard3D />

      {/* Logo Marquee from Video Frame 24 */}
      <LogoMarquee />

      {/* Section Transition Heading from Video Frame 25 ("Set the product direction") */}
      <section className="w-full py-12 sm:py-16 bg-[#F5F3EC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-manrope text-[#06182E] tracking-tight">
              Set the educational trajectory
            </h2>
            <p className="text-sm sm:text-base text-[#536477] mt-2 max-w-xl">
              A structured syllabus built for thoughtful operators, analysts, and fellows who want clarity—not speculative noise.
            </p>
          </div>
          <button
            onClick={onOpenLessonModal}
            className="px-6 py-3 rounded-full bg-white text-[#011936] font-semibold text-xs border border-slate-300 shadow-sm hover:bg-[#EDB671] hover:border-[#EDB671] transition-all whitespace-nowrap"
          >
            Talk to a Steward
          </button>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. MOST LOVED FEATURES: 2 columns, shared layout pill, 5s timer, mobile accordion */}
      {/* ============================================================ */}
      <MostLovedFeatures onCtaClick={onOpenLessonModal} />

      {/* ============================================================ */}
      {/* 5. SPLIT BLOCK: Dashboard image left, staggered checklist ticks right */}
      {/* ============================================================ */}
      <ChecklistSplitBlock onCtaClick={onOpenLessonModal} />

      {/* ============================================================ */}
      {/* 6. STATISTICS-STYLE CARDS: Learning progress with 800ms animated bar draws */}
      {/* ============================================================ */}
      <StatisticsCards />

      {/* ============================================================ */}
      {/* 7. PRICING CARD & FAQ ACCORDION: Reveal on scroll, £15.99/mo, rotating chevron */}
      {/* ============================================================ */}
      <PricingFaqSection onCtaClick={onOpenLessonModal} />
    </div>
  );
};
