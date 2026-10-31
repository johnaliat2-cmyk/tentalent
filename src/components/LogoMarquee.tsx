import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const LOGO_ITEMS = [
  { name: 'Sovereign Guild', tag: 'London Fellowship' },
  { name: 'Mercantile Archive', tag: 'Est. 1928' },
  { name: 'Atlas Research', tag: 'Macro Theory' },
  { name: 'Epoch Institute', tag: 'Behavioral Poise' },
  { name: 'Minerva Scholastic', tag: 'Capital Preservation' },
  { name: 'Vanguard Forum', tag: 'Academic Charter' },
  { name: 'Oakhaven Review', tag: 'Market Mechanics' },
];

export const LogoMarquee: React.FC<{ bgDark?: boolean }> = ({ bgDark = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Duplicate items for seamless continuous loop
  const duplicated = [...LOGO_ITEMS, ...LOGO_ITEMS];

  const fadeColor = bgDark ? 'from-[#011936]' : 'from-[#F5F3EC]';

  return (
    <div
      className={`relative w-full overflow-hidden py-10 select-none ${
        bgDark ? 'bg-[#011936] border-y border-white/5' : 'bg-[#F5F3EC]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left edge gradient mask */}
      <div
        className={`pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-36 z-10 bg-gradient-to-r ${fadeColor} to-transparent`}
      />

      {/* Right edge gradient mask */}
      <div
        className={`pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-36 z-10 bg-gradient-to-l ${fadeColor} to-transparent`}
      />

      {/* Marquee track */}
      <div className="flex w-max">
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: isHovered ? undefined : ['0%', '-50%'],
                }
          }
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 28,
              ease: 'linear',
            },
          }}
          className="flex items-center gap-12 sm:gap-16 pr-12 sm:pr-16"
        >
          {duplicated.map((logo, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 transition-opacity duration-200 ${
                bgDark
                  ? 'text-white/60 hover:text-white'
                  : 'text-[#06182E]/60 hover:text-[#06182E]'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs font-mono uppercase border ${
                  bgDark
                    ? 'border-white/15 bg-white/5 text-[#EDB671]'
                    : 'border-[#011936]/15 bg-[#011936]/5 text-[#80561a]'
                }`}
              >
                {logo.name.slice(0, 2)}
              </div>
              <div className="flex flex-col">
                <span className="font-manrope font-bold text-sm tracking-wide">
                  {logo.name}
                </span>
                <span
                  className={`text-[10px] uppercase font-mono tracking-wider ${
                    bgDark ? 'text-white/40' : 'text-[#06182E]/40'
                  }`}
                >
                  {logo.tag}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
