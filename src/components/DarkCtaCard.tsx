import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ScrollWordHeading } from './ScrollWordHeading';
import { DashboardMockup } from './DashboardMockup';
import { ArrowRight, Sparkles } from 'lucide-react';

interface DarkCtaCardProps {
  onCtaClick: () => void;
}

export const DarkCtaCard: React.FC<DarkCtaCardProps> = ({ onCtaClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 90%', 'end 25%'],
  });

  // Card expands from ~80% width to 100% width on scroll
  const cardWidth = useTransform(scrollYProgress, [0.05, 0.45], ['82%', '100%']);
  const borderRadius = useTransform(scrollYProgress, [0.05, 0.45], ['40px', '28px']);

  // Peeking dashboard mockup rises from bottom edge with scroll
  const dashboardY = useTransform(scrollYProgress, [0.25, 0.75], [140, 0]);
  const dashboardOpacity = useTransform(scrollYProgress, [0.2, 0.55], [0.5, 1]);

  return (
    <div ref={containerRef} className="w-full py-16 sm:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Expanding Navy Card */}
        <motion.div
          style={
            prefersReducedMotion
              ? { width: '100%', borderRadius: '28px' }
              : {
                  width: cardWidth,
                  borderRadius,
                }
          }
          className="relative bg-[#011936] text-white overflow-hidden pt-14 sm:pt-20 pb-0 px-4 sm:px-12 border border-[#EDB671]/25 shadow-[0_30px_90px_-20px_rgba(1,25,54,0.6)] text-center flex flex-col items-center"
        >
          {/* Subtle dusk background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#EDB671]/15 rounded-full blur-[120px] pointer-events-none" />

          {/* Word-by-word headline - Clean without eyebrow label above */}
          <div className="max-w-3xl mx-auto relative z-10 mb-6">
            <ScrollWordHeading
              text="Take the first step with a free lesson."
              theme="dark"
              size="huge"
              className="text-center"
            />
          </div>

          <p className="relative z-10 text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
            Experience the structured curriculum and collaborative research seminar. Always free and open to dedicated scholars.
          </p>

          <div className="relative z-10 mb-12">
            <button
              onClick={onCtaClick}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-[#011936] font-bold text-sm hover:bg-[#EDB671] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-[#80561a]" />
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dashboard mockup peeking from the bottom edge and rising with scroll matching frame 18 */}
          <motion.div
            style={
              prefersReducedMotion
                ? {}
                : {
                    y: dashboardY,
                    opacity: dashboardOpacity,
                  }
            }
            className="w-full max-w-4xl -mb-16 sm:-mb-24 relative z-10"
          >
            <DashboardMockup animateEntrance={false} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
