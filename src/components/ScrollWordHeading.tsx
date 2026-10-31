import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

interface ScrollWordHeadingProps {
  label?: string;
  text: string;
  theme?: 'light' | 'dark';
  className?: string;
  tagClassName?: string;
  size?: 'large' | 'huge' | 'medium';
}

const Word: React.FC<{
  word: string;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  range: [number, number];
  theme: 'light' | 'dark';
}> = ({ word, progress, range, theme }) => {
  const prefersReducedMotion = useReducedMotion();

  // Color & opacity transforms
  const opacity = useTransform(progress, range, [0.25, 1]);
  const color = useTransform(
    progress,
    range,
    theme === 'light'
      ? ['#a0aab8', '#06182E']
      : ['rgba(255, 255, 255, 0.25)', '#ffffff']
  );

  if (prefersReducedMotion) {
    return (
      <span
        className={`inline-block mr-[0.28em] ${
          theme === 'light' ? 'text-[#06182E]' : 'text-white'
        }`}
      >
        {word}
      </span>
    );
  }

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-[0.28em] transition-colors"
    >
      {word}
    </motion.span>
  );
};

export const ScrollWordHeading: React.FC<ScrollWordHeadingProps> = ({
  label,
  text,
  theme = 'light',
  className = '',
  tagClassName = '',
  size = 'large',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 45%'],
  });

  const words = text.split(' ');

  // Size styling
  const sizeStyles = {
    medium: 'text-2xl sm:text-3xl md:text-4xl font-bold leading-tight',
    large: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15]',
    huge: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08]',
  }[size];

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      {label && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-4"
        >
          <span
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest font-mono shadow-sm ${
              theme === 'light'
                ? 'bg-[#011936]/5 text-[#80561a] border border-[#011936]/10'
                : 'bg-white/10 text-[#EDB671] border border-white/10'
            } ${tagClassName}`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                theme === 'light' ? 'bg-[#EDB671]' : 'bg-[#EDB671]'
              }`}
            />
            {label}
          </span>
        </motion.div>
      )}

      <h2 className={`font-manrope tracking-tight ${sizeStyles}`}>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word
              key={i}
              word={word}
              progress={scrollYProgress}
              range={[start, end]}
              theme={theme}
            />
          );
        })}
      </h2>
    </div>
  );
};
