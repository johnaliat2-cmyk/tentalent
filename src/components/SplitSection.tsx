import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { Check } from 'lucide-react';

interface SplitSectionProps {
  title: string;
  description: string;
  bullets?: string[];
  imageSrc: string;
  imageAlt: string;
  imageLeft?: boolean;
  captionChip?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export const SplitSection: React.FC<SplitSectionProps> = ({
  title,
  description,
  bullets = [],
  imageSrc,
  imageAlt,
  imageLeft = false,
  captionChip = 'Learn · Understand · Practice',
  ctaText,
  onCtaClick,
}) => {
  const prefersReducedMotion = useReducedMotion();

  // 600ms reveal slide-in animations
  const textVariants: Variants = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, x: imageLeft ? 32 : -32 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const imageVariants: Variants = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, x: imageLeft ? -32 : 32 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut', delay: 0.1 },
    },
  };

  const captionVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <div className="w-full py-16 sm:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
            imageLeft ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Text Column - Starts cleanly with heading (no pill badges or eyebrow tags above) */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className={`space-y-6 ${imageLeft ? 'lg:col-span-6 lg:order-2' : 'lg:col-span-6 lg:order-1'}`}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold font-manrope text-[#06182E] tracking-tight leading-tight">
              {title}
            </h2>

            <p className="text-base sm:text-lg text-[#536477] leading-relaxed">
              {description}
            </p>

            {bullets.length > 0 && (
              <div className="space-y-3 pt-2">
                {bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#EDB671]/20 text-[#80561a] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-[#06182E]">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {ctaText && onCtaClick && (
              <div className="pt-4">
                <button
                  onClick={onCtaClick}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#011936] hover:text-[#80561a] transition-colors group"
                >
                  <span>{ctaText}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            )}
          </motion.div>

          {/* Photo Column with Slow 1.04x Zoom on Hover & Bottom Caption Chip */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className={`relative ${imageLeft ? 'lg:col-span-6 lg:order-1' : 'lg:col-span-6 lg:order-2'}`}
          >
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-[#011936]/10 group aspect-[4/3] bg-slate-100">
              {/* Photo with 1.04x hover zoom */}
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Caption Chip fading in at bottom edge */}
              {captionChip && (
                <motion.div
                  variants={captionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="absolute bottom-5 left-5 right-5 flex justify-center pointer-events-none"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-xs font-mono font-semibold text-[#011936] shadow-lg border border-white/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EDB671]" />
                    <span>{captionChip}</span>
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
