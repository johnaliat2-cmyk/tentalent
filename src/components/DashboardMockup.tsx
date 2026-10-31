import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { InteractiveChart } from './InteractiveChart';
import {
  Search,
  Bell,
  BookOpen,
  MessageSquare,
  Users,
  BarChart2,
  Bookmark,
  ChevronDown,
  FileText,
  Sparkles,
  CheckCircle,
  GraduationCap,
} from 'lucide-react';

export const DashboardMockup: React.FC<{
  className?: string;
  animateEntrance?: boolean;
}> = ({ className = '', animateEntrance = true }) => {
  const prefersReducedMotion = useReducedMotion();

  const entranceMotion = animateEntrance
    ? prefersReducedMotion
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 } }
      : {
          initial: { opacity: 0, y: 80 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, ease: 'easeOut' as const, delay: 0.2 },
        }
    : {};

  return (
    <motion.div
      {...entranceMotion}
      className={`w-full max-w-5xl mx-auto rounded-[32px] bg-[#f8fafc] border border-slate-200/90 p-5 sm:p-7 shadow-[0_30px_90px_-20px_rgba(1,25,54,0.18)] select-none text-slate-800 ${className}`}
    >
      {/* Top Header Bar inside Device Mockup */}
      <div className="flex items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <img src="/logo-mark.png" alt="" className="w-8 h-8 object-contain" />
          <div className="flex flex-col">
            <span className="font-manrope font-bold text-sm text-[#011936] tracking-tight leading-tight">
              Ten Talents
            </span>
            <span className="text-[9px] font-mono uppercase tracking-wider text-[#80561a] font-semibold">
              Academic Portal
            </span>
          </div>
        </div>

        {/* Search Pill */}
        <div className="relative flex-1 max-w-xs hidden sm:flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            readOnly
            value=""
            placeholder="Search syllabus, lectures, theses..."
            className="w-full bg-white border border-slate-200 rounded-full pl-9 pr-4 py-2 text-xs text-slate-700 shadow-sm focus:outline-none pointer-events-none placeholder:text-slate-400"
          />
        </div>

        {/* Right user profile & notifications */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500 font-mono">EN</span>
          <div className="relative p-1.5 rounded-full hover:bg-slate-200/60 transition-colors cursor-pointer">
            <Bell className="w-4 h-4 text-slate-600" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#EDB671] border-2 border-white" />
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-300 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Derrick Fisher"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar + Center Dashboard + Right Chart Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        {/* Left Sidebar (Desktop) */}
        <div className="hidden lg:flex lg:col-span-2 flex-col space-y-1.5 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white text-[#011936] font-semibold shadow-sm border border-slate-200/60">
            <BookOpen className="w-4 h-4 text-[#80561a]" />
            <span>Syllabus</span>
          </div>
          <div className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/60 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4 h-4 text-slate-400" />
              <span>Seminars</span>
            </div>
            <span className="w-4 h-4 rounded-full bg-[#011936] text-white text-[10px] flex items-center justify-center font-bold">
              2
            </span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/60 transition-colors cursor-pointer">
            <Users className="w-4 h-4 text-slate-400" />
            <span>Fellows</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/60 transition-colors cursor-pointer">
            <BarChart2 className="w-4 h-4 text-slate-400" />
            <span>Analytics</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/60 transition-colors cursor-pointer">
            <Bookmark className="w-4 h-4 text-slate-400" />
            <span>Library</span>
          </div>
        </div>

        {/* Center Section: Active Curriculum Track + Upcoming Seminars + Recent Milestones */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <h3 className="font-manrope font-bold text-sm text-slate-800 mb-3">Active Study Track</h3>

            {/* Lilac/Sky Gradient Academic Scholar Card */}
            <div className="relative rounded-2xl bg-gradient-to-tr from-[#dbeafe] via-[#ede9fe] to-[#e0e7ff] p-5 text-slate-800 border border-white/80 shadow-[0_12px_28px_-6px_rgba(30,41,59,0.08)]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <img src="/logo-mark.png" alt="" className="w-7 h-7 object-contain" />
                  <span className="text-[10px] font-mono text-[#011936] uppercase tracking-wider font-semibold">
                    Fellowship Credential
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#80561a] bg-white/70 px-2 py-0.5 rounded-full font-bold">
                  Track 01 Mastered
                </span>
              </div>

              <div className="font-manrope text-base sm:text-lg font-bold tracking-tight text-slate-900 mb-1">
                Epistemic Architecture &amp; Logic
              </div>
              <div className="text-xs text-slate-600 mb-4 font-mono">
                Cohort Ref: TT-SCHOLAR-8041
              </div>

              <div className="flex items-end justify-between pt-2 border-t border-slate-300/60">
                <div>
                  <div className="text-[9px] font-mono uppercase tracking-wider text-slate-500">
                    SENIOR FELLOW
                  </div>
                  <div className="font-semibold text-xs text-slate-800">Derrick Fisher</div>
                </div>

                {/* Academic verification seal */}
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#80561a]">
                  <GraduationCap className="w-4 h-4 text-[#80561a]" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Seminars (Replacing upcoming payments) */}
          <div>
            <h4 className="font-manrope font-bold text-xs text-slate-700 uppercase tracking-wider mb-2.5">
              Upcoming Seminars
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-xs shrink-0">
                  <FileText className="w-4 h-4 text-sky-600" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-800 truncate">Dialectics &amp; Logic</div>
                  <div className="text-[10px] text-slate-400 font-mono">Live Seminar · 10:00 AM</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-800 truncate">System Dynamics</div>
                  <div className="text-[10px] text-slate-400 font-mono">Defense · 02:30 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Milestones (Replacing recent transactions) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-manrope font-bold text-xs text-slate-700 uppercase tracking-wider">
                Recent Syllabus Milestones
              </h4>
              <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1 cursor-pointer">
                <span>View all</span>
                <ChevronDown className="w-3 h-3" />
              </span>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Cognitive Bias Decomposition</div>
                    <div className="text-[10px] text-slate-400 font-mono">Unit 3 Completed · 45 mins</div>
                  </div>
                </div>
                <span className="font-mono text-xs font-semibold text-emerald-600">PASS</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 text-[#80561a] flex items-center justify-center font-bold text-xs">
                    ★
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Historical Case Audit</div>
                    <div className="text-[10px] text-slate-400 font-mono">Unit 4 Synthesis · 60 mins</div>
                  </div>
                </div>
                <span className="font-mono text-xs font-semibold text-[#80561a]">AUDITED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Focus Analytics & Interactive Retention Chart */}
        <div className="lg:col-span-4">
          <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-sm flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Retention Index
                  </span>
                  <div className="font-manrope font-bold text-2xl text-slate-900 mt-0.5">
                    96 pts
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#80561a] bg-[#EDB671]/15 px-2.5 py-1 rounded-full font-semibold">
                  Week 12
                </span>
              </div>

              {/* Interactive SVG Retention Chart */}
              <div className="pt-4">
                <InteractiveChart compact />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <CheckCircle className="w-3.5 h-3.5" /> High Retention
              </span>
              <span>Mon – Sun</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
