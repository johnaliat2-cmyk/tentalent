import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PageId, NAV_ITEMS } from '../types';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenLessonModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenLessonModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Esc key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-2 sm:pt-3">
          <div
            className={`pointer-events-auto h-12 sm:h-14 rounded-full px-3 sm:px-5 flex items-center justify-between transition-all duration-300 ${
              isScrolled
                ? 'bg-white/70 backdrop-blur-md shadow-[0_12px_36px_-4px_rgba(1,25,54,0.12)] border border-[#011936]/10'
                : 'bg-white/90 backdrop-blur-sm shadow-[0_8px_24px_-4px_rgba(1,25,54,0.06)] border border-transparent'
            }`}
          >
            {/* Logo */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 sm:gap-2.5 group focus-visible:ring-2 focus-visible:ring-[#EDB671] rounded-full p-1"
            >
              <img
                src="/logo-mark.png"
                alt=""
                className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 object-contain group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col text-left">
                <span className="hidden min-[360px]:block font-manrope font-bold text-xs sm:text-sm uppercase tracking-wider text-[#06182E] leading-none group-hover:text-[#80561a] transition-colors whitespace-nowrap">
                  Ten Talents
                </span>
                <span className="hidden sm:block text-[8px] sm:text-[9px] tracking-widest text-[#80561a] font-semibold uppercase mt-0.5 whitespace-nowrap">
                  Markets · Wealth · Wisdom
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-5" aria-label="Main Navigation">
              {NAV_ITEMS.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`relative text-xs font-medium transition-colors duration-150 py-1 focus-visible:ring-2 focus-visible:ring-[#EDB671] rounded-md ${
                      isActive
                        ? 'text-[#06182E] font-semibold'
                        : 'text-[#536477] hover:text-[#06182E]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#011936] rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onOpenLessonModal}
                className="inline-flex items-center justify-center font-medium text-[11px] sm:text-xs bg-[#EDB671] text-[#011936] font-semibold px-3 sm:px-4 py-2 sm:py-1.5 rounded-full shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f0c388] hover:shadow-md active:translate-y-0 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#011936] whitespace-nowrap shrink-0"
              >
                Start free lesson
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 sm:p-1.5 rounded-full text-[#011936] hover:bg-black/5 transition-colors focus-visible:ring-2 focus-visible:ring-[#EDB671]"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Navy Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-[#011936] text-white flex flex-col justify-between p-6 sm:p-10 overflow-y-auto overscroll-contain"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Top Bar with Logo and Close */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white p-1 flex items-center justify-center">
                  <img src="/logo-mark.png" alt="" className="w-full h-full object-contain" />
                </div>
                <span className="font-manrope font-bold text-lg text-white">Ten Talents</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-[#EDB671]"
                aria-label="Close Navigation Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links List */}
            <div className="flex flex-col gap-5 my-auto py-8">
              {NAV_ITEMS.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between text-2xl sm:text-3xl font-manrope font-semibold text-left transition-colors py-1 ${
                      isActive ? 'text-[#EDB671]' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-5 h-5 opacity-40" />
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenLessonModal();
                }}
                className="w-full py-3.5 rounded-full bg-[#EDB671] text-[#011936] font-semibold text-center hover:bg-[#f0c388] transition-colors"
              >
                Start free lesson
              </button>
              <p className="text-center text-xs text-white/50 tracking-wider font-mono">
                NON-ADVISORY FINANCIAL EDUCATION · LONDON
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
