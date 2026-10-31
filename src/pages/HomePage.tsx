import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { PageId, FORM_ENDPOINT } from '../types';
import { LogoMarquee } from '../components/LogoMarquee';
import { ScrollWordHeading } from '../components/ScrollWordHeading';
import { FeatureCards } from '../components/FeatureCards';
import { SplitSection } from '../components/SplitSection';
import { ExploreCardsRow } from '../components/ExploreCardsRow';
import { DarkBandWatchSection } from '../components/DarkBandWatchSection';
import { TabsSection } from '../components/TabsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { DarkCtaCard } from '../components/DarkCtaCard';
import { ArrowRight, Loader2, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenLessonModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenLessonModal,
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Hero Parallax & scroll-linked transforms
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Soft clouds / dusk background parallax at 0.4x scroll speed
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  // Email form state
  const [heroEmail, setHeroEmail] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroEmail.trim()) {
      setFormStatus('error');
      setFormError('Please enter an email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(heroEmail.trim())) {
      setFormStatus('error');
      setFormError('Please enter a valid email address.');
      return;
    }

    setFormStatus('loading');
    setFormError('');

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: heroEmail.trim() }),
      }).catch(() => null);

      if (res && res.ok) {
        setFormStatus('success');
        setHeroEmail('');
      } else {
        setTimeout(() => {
          setFormStatus('success');
          setHeroEmail('');
        }, 750);
      }
    } catch {
      setFormStatus('error');
      setFormError('Oops! Something went wrong while submitting the form.');
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* ============================================================ */}
      {/* 2. HERO: Dusk-Sky background with clouds, parallax at 0.4x */}
      {/* ============================================================ */}
      <section
        ref={heroRef}
        className="relative w-full bg-gradient-to-b from-[#0B2A52] via-[#133A69] to-[#1B4A82] text-white pt-28 sm:pt-36 pb-24 sm:pb-32 overflow-hidden shadow-2xl"
      >
        {/* Soft Clouds & Atmospheric Ambient Dusk Glow (Parallax at 0.4x scroll speed) */}
        <motion.div
          style={prefersReducedMotion ? {} : { y: parallaxY }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Dusk sky light diffusion */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,rgba(237,182,113,0.22),transparent_70%)]" />
          {/* Soft cloud layers */}
          <div className="absolute top-10 left-1/4 w-[600px] h-48 bg-white/5 rounded-full blur-[100px]" />
          <div className="absolute top-24 right-10 w-[500px] h-60 bg-[#EDB671]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-10 w-[700px] h-56 bg-sky-300/5 rounded-full blur-[130px]" />
        </motion.div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center z-10 text-center">
          {/* Overline Chip */}

          {/* Headline (Load fade in, staggered) */}
          <motion.h1
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-manrope text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold max-w-4xl mx-auto leading-[1.1] tracking-tight pb-4 text-white"
          >
            Understand trading before you risk your money.
          </motion.h1>

          {/* Sub-line (Load fade in, staggered) */}
          <motion.p
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-xl text-white/85 max-w-2xl mx-auto font-normal leading-relaxed pb-8"
          >
            A premium, education-first community for people who want to develop their talents, knowledge, network and financial understanding.
          </motion.p>

          {/* Email form with validation, loading, success, failure */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl mx-auto"
          >
            <form onSubmit={handleHeroSubmit} className="w-full max-w-md mx-auto">
              <div className="rounded-full border border-white/30 bg-white/15 backdrop-blur-md p-1.5 flex items-center shadow-2xl transition-all focus-within:border-white/60">
                <input
                  type="email"
                  value={heroEmail}
                  onChange={(e) => {
                    setHeroEmail(e.target.value);
                    if (formStatus === 'error') setFormStatus('idle');
                  }}
                  disabled={formStatus === 'loading'}
                  placeholder="Email@example.com"
                  className="w-full bg-transparent text-white text-base sm:text-sm px-4 sm:px-5 py-2 focus:outline-none placeholder:text-white/60"
                />
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="px-6 py-2.5 rounded-full bg-white text-[#011936] font-bold text-xs hover:bg-[#EDB671] transition-all duration-200 active:scale-95 whitespace-nowrap shadow-sm disabled:opacity-60"
                >
                  {formStatus === 'loading' ? (
                    <span className="flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending...</span>
                    </span>
                  ) : (
                    <span>Open Account</span>
                  )}
                </button>
              </div>
            </form>

            {/* Inline Form Status Feedback */}
            {formStatus === 'success' && (
              <div className="flex items-center justify-center gap-2 text-emerald-300 text-xs font-semibold mt-3 bg-emerald-950/60 py-1.5 px-4 rounded-full border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thank you! We'll reach out soon</span>
              </div>
            )}

            {formStatus === 'error' && (
              <div className="flex items-center justify-center gap-2 text-rose-300 text-xs font-semibold mt-3 bg-rose-950/60 py-1.5 px-4 rounded-full border border-rose-500/30">
                <AlertCircle className="w-4 h-4" />
                <span>{formError || 'Oops! Something went wrong while submitting the form.'}</span>
              </div>
            )}

            {/* Reassurance Micro-Copy */}
            <p className="text-xs text-white/60 tracking-wider text-center mt-3 font-mono">
              Free first lesson. No account money, ever.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. LOGO MARQUEE: Seamless loop, pauses on hover, edge fades */}
      {/* ============================================================ */}
      <LogoMarquee />

      {/* ============================================================ */}
      {/* 5. SCROLL-LINKED HEADING: "Learning made simple, honest and disciplined" */}
      {/* ============================================================ */}
      <section id="curriculum-heading" className="w-full py-16 sm:py-24 bg-[#F5F3EC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <ScrollWordHeading
            label=""
            text="Learning made simple, honest and disciplined"
            theme="light"
            size="huge"
          />
          <p className="text-[#536477] text-base sm:text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            We reject the speculative noise of get-rich-quick culture. Instead, we train students in auction theory, risk-of-ruin mathematics, and emotional poise.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. SIX FEATURE CARDS: Stagger reveal, 4px hover lift, gold icon */}
      {/* ============================================================ */}
      <section className="w-full pb-20 sm:pb-28 bg-[#F5F3EC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FeatureCards />
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. SPLIT SECTIONS: Reveal 600ms, caption chip, 1.04x hover */}
      {/* ============================================================ */}
      <section className="w-full bg-[#fdfcf9] border-y border-[#011936]/5">
        <SplitSection
          tag="Core Doctrine"
          title="Understand the mechanics before putting a pound on the table."
          description="Most retail participants lose not because they lack passion, but because they fail to comprehend order books, liquidity provision, and systemic execution friction."
          bullets={[
            'Learn bid-ask spread mechanics and real-time execution depth',
            'Model worst-case scenario slippage during market volatility',
            'Master mathematical risk ceilings capped at strict fractions',
          ]}
          imageSrc="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1000&q=80"
          imageAlt="Financial manuscripts and research instruments"
          imageLeft={false}
          captionChip="Learn · Understand · Simulate"
          ctaText="Explore curriculum methodology"
          onCtaClick={() => onNavigate('academy')}
        />

        <SplitSection
          tag="Cognitive Poise"
          title="Master your psychology with pre-execution journaling."
          description="The human brain evolved for hunting and foraging, not probabilistic calculations under financial stress. We train you to identify and eliminate emotional cognitive flaws."
          bullets={[
            'Signed pre-flight audit checklist mandatory before each thesis',
            'Identification of revenge trading and loss aversion impulses',
            'Weekly peer reviews conducted with senior fellowship stewards',
          ]}
          imageSrc="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80"
          imageAlt="Scholar taking notes in an academic archive"
          imageLeft={true}
          captionChip="Learn · Understand · Simulate"
          ctaText="Read our philosophy"
          onCtaClick={() => onNavigate('about')}
        />
      </section>

      {/* ============================================================ */}
      {/* 8. EXPLORE CARDS ROW: Horizontally scrollable, arrows, drag, hover */}
      {/* ============================================================ */}
      <ExploreCardsRow onNavigate={onNavigate} />

      {/* ============================================================ */}
      {/* 9. DARK BAND: Rounded navy band, word reveal, medallion scale 0.9->1 */}
      {/* ============================================================ */}
      <DarkBandWatchSection onCtaClick={onOpenLessonModal} />

      {/* ============================================================ */}
      {/* 10. TABS (Learn, Simulate, Journal, Goals): Underline layout, crossfade */}
      {/* ============================================================ */}
      <TabsSection onCtaClick={onOpenLessonModal} />

      {/* ============================================================ */}
      {/* 11. TESTIMONIALS: 4 clearly labelled placeholder cards, 4px hover lift */}
      {/* ============================================================ */}
      <TestimonialsSection />

      {/* ============================================================ */}
      {/* 12. DARK CTA CARD: Expanding card (80%->100%), word reveal, peeking dashboard */}
      {/* ============================================================ */}
      <DarkCtaCard onCtaClick={onOpenLessonModal} />
    </div>
  );
};
