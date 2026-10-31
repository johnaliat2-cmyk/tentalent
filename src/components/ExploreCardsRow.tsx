import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { BookOpen, Brain, Globe, Compass, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { type PageId } from '../types';

interface ExploreCard {
  id: string;
  type: 'duotone' | 'light' | 'navy';
  badge: string;
  title: string;
  description: string;
  linkText: string;
  pageTarget: PageId;
  icon: React.ElementType;
  image?: string;
}

const EXPLORE_CARDS: ExploreCard[] = [
  {
    id: 'duotone-1',
    type: 'duotone',
    badge: '',
    title: 'Interactive Practice',
    description: 'Deconstruct complex mental models against curated primary source archives. Test hypotheses in structured research environments.',
    linkText: 'Explore Studio',
    pageTarget: 'academy',
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=900&q=80', // Fluffy blue cloud sky from video
  },
  {
    id: 'light-1',
    type: 'light',
    badge: '',
    title: 'Deep Synthesis',
    description: 'Systemic feedback loops, information architecture, and probabilistic modeling without superficial shortcuts.',
    linkText: 'Read Philosophy',
    pageTarget: 'about',
    icon: Brain,
  },
  {
    id: 'navy-1',
    type: 'navy',
    badge: '',
    title: 'Scholastic Access',
    description: 'Connect with disciplined educators, researchers, and primary historical treatises from London and worldwide.',
    linkText: 'Access Library',
    pageTarget: 'library',
    icon: Globe,
  },
  {
    id: 'light-2',
    type: 'light',
    badge: '',
    title: 'Publishing Guild',
    description: 'Seminal monographs, classical translations, and philosophical treatises published by our research fellows.',
    linkText: 'View Guild',
    pageTarget: 'ventures',
    icon: Compass,
  },
];

export const ExploreCardsRow: React.FC<{ onNavigate: (page: PageId) => void }> = ({
  onNavigate,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  // Mouse drag state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const checkScrollBounds = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    checkScrollBounds();
    container.addEventListener('scroll', checkScrollBounds, { passive: true });
    window.addEventListener('resize', checkScrollBounds);
    return () => {
      container.removeEventListener('scroll', checkScrollBounds);
      window.removeEventListener('resize', checkScrollBounds);
    };
  }, [checkScrollBounds]);

  const slideByCard = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const cardWidth = 380; // approximate width of one card + gap
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      slideByCard('right');
    } else if (e.key === 'ArrowLeft') {
      slideByCard('left');
    }
  };

  // Mouse drag support
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftStart.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  return (
    <div className="w-full py-16 sm:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header with Left/Right Arrows - Heading starts cleanly with no eyebrow pill above */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-manrope text-[#06182E] tracking-tight">
              Curated dimensions of study
            </h2>
          </div>

          {/* Navigation arrow buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => slideByCard('left')}
              disabled={!canScrollLeft}
              className="w-12 h-12 rounded-full border border-[#011936]/20 bg-white/80 flex items-center justify-center text-[#06182E] transition-all hover:bg-white hover:border-[#011936] hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-[#EDB671]"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => slideByCard('right')}
              disabled={!canScrollRight}
              className="w-12 h-12 rounded-full border border-[#011936]/20 bg-white/80 flex items-center justify-center text-[#06182E] transition-all hover:bg-white hover:border-[#011936] hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-[#EDB671]"
              aria-label="Next card"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontally scrollable row with stagger reveal */}
        <div
          ref={scrollContainerRef}
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          tabIndex={0}
          role="region"
          aria-label="Curated cards row"
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing pb-8 -mx-4 px-4 sm:-mx-6 sm:px-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EDB671] rounded-2xl"
        >
          {EXPLORE_CARDS.map((card, idx) => {
            const Icon = card.icon;

            // 1. Blue Duotone Photo Card (fluffy blue clouds as in video)
            if (card.type === 'duotone') {
              return (
                <motion.div
                  key={card.id}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : {
                          y: -4,
                          boxShadow: '0 24px 48px -12px rgba(1, 25, 54, 0.22)',
                          transition: { duration: 0.25, ease: 'easeOut' },
                        }
                  }
                  onClick={() => onNavigate(card.pageTarget)}
                  className="group relative shrink-0 w-[300px] sm:w-[360px] h-[460px] rounded-[32px] overflow-hidden p-7 flex flex-col justify-between text-white shadow-lg cursor-pointer border border-white/20"
                >
                  {/* Photo background */}
                  {card.image && (
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                  {/* Blue duotone overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#011936] via-[#0b2b52]/80 to-[#1e4e8c]/50 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#011936] via-transparent to-black/20" />

                  {/* Top content */}
                  <div className="relative z-10 flex items-center justify-between">
                    {card.badge && card.badge.trim() !== '' && (
                      <span className="font-mono text-xs uppercase tracking-wider text-[#EDB671] font-semibold bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15">
                        {card.badge}
                      </span>
                    )}
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-[#EDB671] group-hover:text-[#011936] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Bottom content */}
                  <div className="relative z-10 space-y-3">
                    <h3 className="font-manrope font-extrabold text-2xl text-white">
                      {card.title}
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                      {card.description}
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#EDB671] group-hover:translate-x-1 transition-transform">
                      <span>{card.linkText}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              );
            }

            // 2. Light Card (Clean modern light design from video)
            if (card.type === 'light') {
              return (
                <motion.div
                  key={card.id}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : {
                          y: -4,
                          boxShadow: '0 24px 48px -12px rgba(1, 25, 54, 0.12)',
                          transition: { duration: 0.25, ease: 'easeOut' },
                        }
                  }
                  onClick={() => onNavigate(card.pageTarget)}
                  className="group relative shrink-0 w-[300px] sm:w-[360px] h-[460px] rounded-[32px] bg-white border border-[#011936]/10 p-7 flex flex-col justify-between text-[#06182E] shadow-sm hover:border-[#EDB671]/60 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    {card.badge && card.badge.trim() !== '' && (
                      <span className="font-mono text-xs uppercase tracking-wider text-[#80561a] font-semibold bg-[#EDB671]/15 px-3.5 py-1 rounded-full">
                        {card.badge}
                      </span>
                    )}
                    <div className="w-10 h-10 rounded-full bg-[#011936]/5 flex items-center justify-center text-[#011936] group-hover:bg-[#EDB671] group-hover:text-[#011936] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Decorative abstract geometry */}
                  <div className="my-auto py-4 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#EDB671]/20 via-[#011936]/5 to-transparent flex items-center justify-center border border-[#EDB671]/30">
                      <div className="w-14 h-14 rounded-full bg-white shadow-inner flex items-center justify-center">
                        <img src="/logo-mark.png" alt="" className="w-10 h-10 object-contain" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-manrope font-extrabold text-2xl text-[#06182E]">
                      {card.title}
                    </h3>
                    <p className="text-[#536477] text-xs sm:text-sm leading-relaxed">
                      {card.description}
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#80561a] group-hover:translate-x-1 transition-transform">
                      <span>{card.linkText}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              );
            }

            // 3. Dark Navy Card (Rich navy card from video)
            return (
              <motion.div
                key={card.id}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        y: -4,
                        boxShadow: '0 24px 48px -12px rgba(1, 25, 54, 0.4)',
                        transition: { duration: 0.25, ease: 'easeOut' },
                      }
                }
                onClick={() => onNavigate(card.pageTarget)}
                className="group relative shrink-0 w-[300px] sm:w-[360px] h-[460px] rounded-[32px] bg-[#011936] border border-white/10 p-7 flex flex-col justify-between text-white shadow-xl cursor-pointer hover:border-[#EDB671]/50 transition-all overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-44 h-44 bg-[#EDB671]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between">
                  {card.badge && card.badge.trim() !== '' && (
                    <span className="font-mono text-xs uppercase tracking-wider text-[#EDB671] font-semibold bg-white/10 px-3.5 py-1 rounded-full border border-white/10">
                      {card.badge}
                    </span>
                  )}
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#EDB671] border border-white/15 group-hover:bg-[#EDB671] group-hover:text-[#011936] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Decorative concentric rings */}
                <div className="relative z-10 my-auto flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full border border-white/10 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border border-[#EDB671]/30 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#EDB671]/20 flex items-center justify-center text-[#EDB671]">
                        <Globe className="w-6 h-6 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 space-y-3">
                  <h3 className="font-manrope font-extrabold text-2xl text-white">
                    {card.title}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                    {card.description}
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#EDB671] group-hover:translate-x-1 transition-transform">
                    <span>{card.linkText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
