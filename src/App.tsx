import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { FreeLessonModal } from './components/FreeLessonModal';

import { HomePage } from './pages/HomePage';
import { AcademyPage } from './pages/AcademyPage';
import { VenturesPage } from './pages/VenturesPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { CommunityPage } from './pages/CommunityPage';
import { LibraryPage } from './pages/LibraryPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);

  // Handle route change with scroll to top
  const handleNavigate = (page: PageId) => {
    if (page === 'free-lesson') {
      setIsLessonModalOpen(true);
      return;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen bg-[#F5F3EC] text-[#06182E] flex flex-col font-sans overflow-x-clip selection:bg-[#EDB671]/40 selection:text-[#011936]">
      {/* Sticky Floating Pill Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenLessonModal={() => setIsLessonModalOpen(true)}
      />

      {/* Main Content with smooth 250ms page transition */}
      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="w-full"
          >
            {currentPage === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                onOpenLessonModal={() => setIsLessonModalOpen(true)}
              />
            )}
            {currentPage === 'academy' && (
              <AcademyPage
                onOpenVideoModal={() => setIsVideoModalOpen(true)}
                onOpenLessonModal={() => setIsLessonModalOpen(true)}
              />
            )}
            {currentPage === 'ventures' && (
              <VenturesPage
                onNavigate={handleNavigate}
                onOpenLessonModal={() => setIsLessonModalOpen(true)}
              />
            )}
            {currentPage === 'services' && (
              <ServicesPage
                onNavigate={handleNavigate}
                onOpenLessonModal={() => setIsLessonModalOpen(true)}
              />
            )}
            {currentPage === 'about' && (
              <AboutPage
                onNavigate={handleNavigate}
                onOpenLessonModal={() => setIsLessonModalOpen(true)}
              />
            )}
            {currentPage === 'community' && (
              <CommunityPage
                onNavigate={handleNavigate}
                onOpenLessonModal={() => setIsLessonModalOpen(true)}
              />
            )}
            {currentPage === 'library' && (
              <LibraryPage
                onNavigate={handleNavigate}
                onOpenLessonModal={() => setIsLessonModalOpen(true)}
              />
            )}
            {currentPage === 'contact' && <ContactPage />}
            {currentPage === 'legal' && <LegalPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* "Watch Video" Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="Ten Talents Sovereign Fellowship · Simulation Terminal & Pillars"
      />

      {/* "Start Free Lesson" Enrollment Modal */}
      <FreeLessonModal
        isOpen={isLessonModalOpen}
        onClose={() => setIsLessonModalOpen(false)}
      />
    </div>
  );
}
