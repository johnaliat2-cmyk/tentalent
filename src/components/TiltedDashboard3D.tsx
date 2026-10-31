import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { DashboardMockup } from './DashboardMockup';

export const TiltedDashboard3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 15%'],
  });

  // Tilted 3D transforms:
  // Desktop: rotateX 45deg -> 0deg, rotateZ -12deg -> 0deg, scale 0.88 -> 1.05
  // Mobile: rotateX 25deg -> 0deg, rotateZ -6deg -> 0deg, scale 0.92 -> 1.02
  // Then fades out toward the next section (0.7 -> 1.0)
  const initialRotateX = isMobile ? 25 : 45;
  const initialRotateZ = isMobile ? -6 : -12;

  const rotateX = useTransform(scrollYProgress, [0, 0.65], [initialRotateX, 0]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.65], [initialRotateZ, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.65, 1], [0.9, 1.04, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0.8, 1, 1, 0.2]);
  const shadowSpread = useTransform(scrollYProgress, [0, 0.65], [30, 70]);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-12 sm:py-20 overflow-hidden flex flex-col items-center justify-center min-h-[500px] sm:min-h-[720px]"
      style={{ perspective: '1200px' }}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[500px] bg-[#EDB671]/10 rounded-full blur-[140px]" />
      </div>

      {/* 3D Tilted container */}
      <motion.div
        style={
          prefersReducedMotion
            ? {}
            : {
                rotateX,
                rotateZ,
                scale,
                opacity,
                transformStyle: 'preserve-3d',
              }
        }
        className="w-full max-w-5xl px-4 sm:px-6 relative z-10 origin-center transition-[filter]"
      >
        <DashboardMockup animateEntrance={false} />

        {/* Soft shadow beneath the 3D tilted dashboard */}
        <motion.div
          style={{
            height: shadowSpread,
            opacity: useTransform(scrollYProgress, [0, 0.65], [0.4, 0.8]),
          }}
          className="w-4/5 mx-auto -mt-6 bg-[#011936] blur-2xl rounded-full pointer-events-none"
        />
      </motion.div>
    </div>
  );
};
