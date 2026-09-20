import React, { useState } from 'react';
import { PROMISES } from '../data/content';
import { ShieldCheck, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';

interface PromiseSectionProps {
  isDarkMode: boolean;
}

export const PromiseSection: React.FC<PromiseSectionProps> = ({ isDarkMode }) => {
  const [sealed, setSealed] = useState(true);

  return (
    <section
      id="section-promise"
      className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto relative z-10"
    >
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2
          className={`font-serif-romantic text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 ${
            isDarkMode ? 'text-stone-100' : 'text-stone-800'
          }`}
        >
          A Small Promise
        </h2>

        <div className="w-12 h-0.5 bg-rose-400/60 rounded-full mx-auto mb-6" />
      </div>

      {/* Main Core Promise Box */}
      <div
        className={`rounded-2xl p-8 sm:p-12 border relative overflow-hidden transition-all duration-300 mb-10 ${
          isDarkMode
            ? 'bg-gradient-to-b from-stone-900/90 to-stone-900/70 border-rose-900/40 shadow-xl'
            : 'bg-gradient-to-b from-rose-50/70 to-white/90 border-rose-200/80 shadow-rose-900/5 shadow-md'
        }`}
      >
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 mb-2">
            <HeartHandshake className="w-6 h-6 stroke-[1.75]" />
          </div>

          <h3
            className={`font-serif-romantic text-2xl sm:text-3xl font-normal leading-relaxed italic ${
              isDarkMode ? 'text-rose-200' : 'text-rose-950'
            }`}
          >
            “Main promise karta hoon ki apne gusse ko tum par nahi nikalunga.
            Main pehle samjhunga, phir bolunga. Tum mere liye bahut important
            ho.”
          </h3>

          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isDarkMode ? 'text-stone-400' : 'text-stone-600'
            }`}
          >
            Apology words mean nothing without real behavior change. This is not
            just an emotional line to calm things down—it is a conscious pledge
            I am making to you and our future together.
          </p>

          {/* Wax Seal Badge */}
          <div className="pt-4 flex flex-col items-center">
            <button
              id="btn-promise-seal"
              type="button"
              onClick={() => setSealed(true)}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-rose-400/40 bg-rose-500/10 text-rose-500 text-xs font-semibold uppercase tracking-wider hover:bg-rose-500 hover:text-white transition-all shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{sealed ? 'Sealed with Husband’s Word' : 'Click to Seal Promise'}</span>
            </button>
            <span className="text-[11px] text-stone-400 mt-2 font-cursive text-base text-rose-400">
              For Sanidhya, always and forever.
            </span>
          </div>
        </div>
      </div>

      {/* Concrete Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PROMISES.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-xl border transition-all ${
              isDarkMode
                ? 'bg-stone-900/50 border-stone-800'
                : 'bg-white/60 border-rose-100/70'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-rose-100/60 text-rose-600 flex items-center justify-center text-sm font-semibold">
                ✓
              </span>
              <div>
                <h4
                  className={`font-serif-romantic text-lg font-medium mb-1 ${
                    isDarkMode ? 'text-stone-200' : 'text-stone-800'
                  }`}
                >
                  {item.hindiTitle}
                </h4>
                <p
                  className={`text-xs sm:text-sm leading-relaxed ${
                    isDarkMode ? 'text-stone-400' : 'text-stone-600'
                  }`}
                >
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
