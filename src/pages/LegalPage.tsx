import React from 'react';
import { ShieldCheck, Scale, FileText, Calendar, Lock } from 'lucide-react';

export const LegalPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col bg-[#F5F3EC]">
      {/* Hero */}
      <section className="relative w-full bg-gradient-to-b from-[#0B2A52] via-[#0F3564] to-[#1B4A82] text-white pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md mb-6 border border-white/10 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EDB671]" />
            <span className="text-xs uppercase font-mono tracking-widest text-[#EDB671] font-semibold">
              Statutory Architecture &amp; Governance
            </span>
          </div>

          <h1 className="font-manrope text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Legal &amp; Compliance
          </h1>

          <p className="text-base sm:text-xl text-white/85 max-w-2xl mx-auto mt-6 leading-relaxed">
            Terms of fellowship, statutory privacy architecture, institutional capital risk notices, and arbitration protocols governing our non-advisory educational community.
          </p>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-white/70">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#EDB671]" /> Last revised: 14 October 2024
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-[#EDB671]" /> Jurisdiction: England &amp; Wales
            </span>
          </div>
        </div>
      </section>

      {/* Legal Articles */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#011936]/10 shadow-sm space-y-10 text-[#06182E] leading-relaxed">
          {/* Article 1 */}
          <div className="space-y-3 pb-8 border-b border-[#011936]/10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#80561a] font-bold">
              <ShieldCheck className="w-4 h-4 text-[#EDB671]" />
              <span>Section 01 · Non-Advisory Educational Declaration</span>
            </div>
            <h2 className="font-manrope font-bold text-2xl text-[#06182E]">
              1. Pedagogical Scope &amp; Absence of Regulated Advice
            </h2>
            <p className="text-sm sm:text-base text-[#536477]">
              All content, dispatches, course materials, lectures, and terminal simulation environments supplied by Ten Talents ("The Fellowship") are provided strictly for general scholastic, historical, and educational purposes. Ten Talents is not authorized or regulated by the Financial Conduct Authority (FCA) to provide investment advice, discretionary portfolio management, or financial promotions.
            </p>
            <p className="text-sm sm:text-base text-[#536477]">
              Nothing contained within this website or our community discussions shall constitute personal financial advice, a solicitation, an endorsement, or an offer to buy or sell any financial asset, security, commodity, derivative, or instrument.
            </p>
          </div>

          {/* Article 2 */}
          <div className="space-y-3 pb-8 border-b border-[#011936]/10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#80561a] font-bold">
              <Lock className="w-4 h-4 text-[#EDB671]" />
              <span>Section 02 · Risk-Free Terminal Simulator</span>
            </div>
            <h2 className="font-manrope font-bold text-2xl text-[#06182E]">
              2. Paper Simulator Rules &amp; Zero Capital Risk
            </h2>
            <p className="text-sm sm:text-base text-[#536477]">
              The Ten Talents paper simulator is a synthetic educational sandbox designed to emulate order book mechanics, Level 2 depth of market, and execution slippage using virtual units. Under no circumstances does the simulator accept real financial deposits, process actual monetary withdrawals, or execute live transactions in regulated secondary markets.
            </p>
            <p className="text-sm sm:text-base text-[#536477]">
              Virtual performance within the paper simulator carries no guarantee, warranty, or representation that similar results would be achieved under live capital conditions.
            </p>
          </div>

          {/* Article 3 */}
          <div className="space-y-3 pb-8 border-b border-[#011936]/10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#80561a] font-bold">
              <FileText className="w-4 h-4 text-[#EDB671]" />
              <span>Section 03 · Fellowship Subscription &amp; Cancellation</span>
            </div>
            <h2 className="font-manrope font-bold text-2xl text-[#06182E]">
              3. Terms of Subscription &amp; £15.99/Month Billing
            </h2>
            <p className="text-sm sm:text-base text-[#536477]">
              Prospective students are provided with one complimentary foundational lesson without requiring payment information. Following the initial lesson, ongoing membership in the Sovereign Fellowship and access to continuing curriculum modules is billed at £15.99 per calendar month.
            </p>
            <p className="text-sm sm:text-base text-[#536477]">
              Fellows may terminate their subscription at any time without penalty or minimum lock-in periods through their profile settings.
            </p>
          </div>

          {/* Article 4 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#80561a] font-bold">
              <Scale className="w-4 h-4 text-[#EDB671]" />
              <span>Section 04 · Governing Law &amp; Jurisdiction</span>
            </div>
            <h2 className="font-manrope font-bold text-2xl text-[#06182E]">
              4. English Law &amp; Arbitration
            </h2>
            <p className="text-sm sm:text-base text-[#536477]">
              These terms, covenants, and any dispute arising from access to our scholastic publications shall be governed exclusively by and construed in accordance with the laws of England and Wales, with the courts of London retaining exclusive jurisdiction.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
