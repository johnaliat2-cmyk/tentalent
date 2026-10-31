import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ScrollWordHeading } from './ScrollWordHeading';
import { ArrowRight, BookOpen, Clock, CheckCircle } from 'lucide-react';

interface DarkBandWatchSectionProps {
  onCtaClick: () => void;
}

export const DarkBandWatchSection: React.FC<DarkBandWatchSectionProps> = ({ onCtaClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 30%'],
  });

  // Watch slides up and scales from 0.9 to 1.0 with scroll
  const scale = useTransform(scrollYProgress, [0.15, 0.65], [0.9, 1.0]);
  const y = useTransform(scrollYProgress, [0.15, 0.65], [60, 0]);
  const paragraphOpacity = useTransform(scrollYProgress, [0.55, 0.85], [0, 1]);
  const paragraphY = useTransform(scrollYProgress, [0.55, 0.85], [20, 0]);

  return (
    <div ref={containerRef} className="w-full py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-[40px] bg-[#011936] text-white overflow-hidden p-8 sm:p-16 md:p-20 shadow-[0_30px_90px_-20px_rgba(1,25,54,0.6)] border border-white/10 text-center flex flex-col items-center">
          {/* Subtle background ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#EDB671]/15 rounded-full blur-[140px] pointer-events-none" />

          {/* Clean hero section header layout */}
          <div className="relative w-full flex flex-col items-center justify-center pt-4 sm:pt-6 pb-6">
            {/* 1. Background watermark typography ("SOVEREIGN WATCH"):
                absolute-positioned, centered, rendered in a subtle low-opacity dark tone (opacity: 0.05 to 0.08),
                with pointer-events disabled and z-index set to 1 */}
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-[1] font-manrope font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wider text-white opacity-[0.06] whitespace-nowrap"
            >
              SOVEREIGN WATCH
            </div>

            {/* 2. Foreground element removed */}

            {/* Scroll-Linked Word-by-Word Headline */}
            <div className="relative z-10 max-w-3xl mx-auto">
              <ScrollWordHeading
                text="Instant curriculum alerts wherever your day takes you."
                theme="dark"
                size="huge"
                className="text-center"
              />
            </div>
          </div>

          {/* Central Smart Watch Device (Scales 0.9 -> 1.0 & slides up) */}
          <motion.div
            style={
              prefersReducedMotion
                ? {}
                : {
                    scale,
                    y,
                  }
            }
            className="relative my-8 sm:my-12 z-20 flex flex-col items-center select-none"
          >
            {/* Top Watch Band (Beige textured loop) */}
            <div className="w-28 sm:w-32 h-14 bg-[#e8e4dc] rounded-t-xl border-x-2 border-t-2 border-[#d5cfc2] shadow-inner relative overflow-hidden flex flex-col justify-end space-y-1 pb-1">
              {[1, 2, 3].map((line) => (
                <div key={line} className="w-full h-1 bg-black/5" />
              ))}
            </div>

            {/* Titanium Smart Watch Case */}
            <div className="relative w-56 sm:w-64 h-72 sm:h-80 rounded-[44px] bg-[#dcd7cb] p-3 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.6)] border border-[#ece7db] flex items-center justify-center">
              {/* Digital Crown on Right */}
              <div className="absolute -right-2 top-16 w-3 h-10 bg-[#beb8ab] rounded-r-md border border-[#aba495] shadow-sm" />
              {/* Side Button on Right */}
              <div className="absolute -right-1.5 top-32 w-2 h-12 bg-[#beb8ab] rounded-r-sm" />

              {/* Watch Screen Display: Clean Educational Study Interface */}
              <div className="w-full h-full rounded-[34px] bg-[#0c1f38] p-4 flex flex-col justify-between items-center text-white shadow-inner overflow-hidden border border-slate-700/60">
                {/* Active Module Header */}
                <div className="w-full rounded-2xl bg-white/10 p-3 border border-white/15 text-left">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[9px] font-bold text-[#EDB671] uppercase tracking-wider">
                      Module 04
                    </span>
                    <Clock className="w-3 h-3 text-[#EDB671]" />
                  </div>
                  <div className="text-xs font-bold font-manrope text-white leading-tight">
                    Cognitive Architecture
                  </div>
                  <div className="text-[9px] text-white/60 font-mono mt-0.5">
                    Next seminar in 25m
                  </div>
                </div>

                {/* Circular Progress & Knowledge Retention Indicator */}
                <div className="text-center my-auto flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border-4 border-[#EDB671] border-t-transparent flex items-center justify-center font-manrope font-extrabold text-sm text-[#EDB671] shadow-inner">
                    84%
                  </div>
                  <div className="text-[10px] text-white/70 font-mono mt-2">
                    Syllabus Mastery
                  </div>
                </div>

                <div className="w-8 h-1 bg-white/20 rounded-full" />
              </div>
            </div>

            {/* Bottom Watch Band (Beige textured loop) */}
            <div className="w-28 sm:w-32 h-14 bg-[#e8e4dc] rounded-b-xl border-x-2 border-b-2 border-[#d5cfc2] shadow-inner relative overflow-hidden flex flex-col justify-start space-y-1 pt-1">
              {[1, 2, 3].map((line) => (
                <div key={line} className="w-full h-1 bg-black/5" />
              ))}
            </div>
          </motion.div>

          {/* Fading Paragraph and Action Button */}
          <motion.div
            style={
              prefersReducedMotion
                ? {}
                : {
                    opacity: paragraphOpacity,
                    y: paragraphY,
                  }
            }
            className="max-w-xl mx-auto space-y-6 relative z-10"
          >
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light">
              Access seminar audio notes, study reminders, and active thesis milestones seamlessly across your wrist without being tied to a desk.
            </p>

            <div>
              <button
                onClick={onCtaClick}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#EDB671] text-[#011936] font-semibold text-sm hover:bg-[#f0c388] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
              >
                <span>Start free lesson</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
