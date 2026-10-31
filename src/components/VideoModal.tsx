import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Volume2, Maximize, RotateCcw } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  title = 'Ten Talents Curriculum Overview & Simulation Method',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap & Esc key handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Auto-focus initial element
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
        >
          {/* Backdrop with click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-4xl bg-[#011936] rounded-2xl sm:rounded-3xl border border-[#EDB671]/30 shadow-2xl overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#001024]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EDB671] animate-pulse"></span>
                <h3 id="video-modal-title" className="text-sm font-semibold text-white tracking-wide">
                  {title}
                </h3>
              </div>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-[#EDB671]"
                aria-label="Close video dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Canvas Placeholder */}
            <div className="relative aspect-video bg-gradient-to-br from-[#02142a] via-[#081e3a] to-[#010e1e] flex flex-col items-center justify-center text-center p-6 group">
              {/* Background ambient mesh grid */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#EDB671_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              {/* Central Play Button */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-[#EDB671] text-[#011936] flex items-center justify-center shadow-[0_0_50px_rgba(237,182,113,0.4)] group-hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <h4 className="mt-6 text-xl font-bold font-manrope text-white">
                  The Four Pillars of Capital Stewardship
                </h4>
                <p className="mt-2 text-xs text-white/60 max-w-md font-mono">
                  Runtime: 08:42 · Recorded at the Sovereign Library · Paper Terminal Walkthrough
                </p>
              </div>

              {/* Bottom Video Controls Mockup */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex flex-col gap-2">
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                  <div className="w-1/3 h-full bg-[#EDB671] rounded-full" />
                </div>
                {/* Time & actions */}
                <div className="flex items-center justify-between text-xs text-white/70 px-1">
                  <div className="flex items-center gap-3">
                    <button className="hover:text-white transition-colors" aria-label="Play">
                      <Play className="w-4 h-4" />
                    </button>
                    <button className="hover:text-white transition-colors" aria-label="Replay 10 seconds">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-[11px]">02:54 / 08:42</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="hover:text-white transition-colors" aria-label="Mute">
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button className="hover:text-white transition-colors" aria-label="Full screen">
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
