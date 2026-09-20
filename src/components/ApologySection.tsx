import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ApologySectionProps {
  isDarkMode: boolean;
}

export const ApologySection: React.FC<ApologySectionProps> = ({ isDarkMode }) => {
  const [isLetterOpen, setIsLetterOpen] = useState(true);

  return (
    <section
      id="section-apology"
      className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto relative z-10"
    >
      <div className="flex flex-col items-center text-center mb-10">
        <h2
          className={`font-serif-romantic text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 ${
            isDarkMode ? 'text-stone-100' : 'text-stone-800'
          }`}
        >
          My Apology
        </h2>

        <div className="w-12 h-0.5 bg-rose-400/60 rounded-full mb-6" />

        {/* Primary prompt sentence */}
        <blockquote
          className={`text-xl sm:text-2xl font-serif-romantic italic max-w-2xl leading-relaxed mb-4 ${
            isDarkMode ? 'text-rose-200/90' : 'text-rose-900/90'
          }`}
        >
          “I’m sorry for the way I behaved with you. Gussa meri galti thi, aur
          tumhe hurt karna bilkul nahi chahiye tha.”
        </blockquote>
      </div>

      {/* Sincere Letter Container */}
      <div
        className={`rounded-2xl border p-6 sm:p-10 shadow-sm transition-all duration-300 relative ${
          isDarkMode
            ? 'bg-stone-900/70 border-stone-800 text-stone-300'
            : 'bg-white/80 border-rose-100/80 text-stone-700 shadow-rose-900/5'
        }`}
      >
        {/* Soft decorative quote mark */}
        <div className="absolute top-4 right-6 text-6xl font-serif-romantic opacity-10 select-none text-rose-500 pointer-events-none">
          ”
        </div>

        <div className="space-y-4 text-base sm:text-lg leading-relaxed font-normal">
          <p>
            <strong className="font-semibold text-rose-500">Dearest Sanidhya,</strong>
          </p>

          <p>
            Kal raat jab maine apna aapa khoya, maine sirf chillaya nahi, balki
            uss rishte ko thehes pahunchayi jise humne itne pyaar aur bharose se
            banaya hai. Gusse me bole gaye shabd asani se bhulaye nahi jaate,
            aur yeh soch kar mera dil baith jaata hai ki maine tumhari aankhon me
            aansu laaye.
          </p>

          <p>
            There is genuinely no excuse for losing my temper. Stress, tiredness,
            or minor misunderstandings should never be projected onto the person
            who loves me most. You deserve to be spoken to with respect, softness,
            and complete gentleness—especially in moments of disagreement.
          </p>

          {isLetterOpen && (
            <div className="pt-2 space-y-4 border-t border-rose-200/30 text-base">
              <p>
                Maine kal raat ke baad se yahi socha hai ki tumhara dil kitna
                dukh raha hoga. Gusse ki aag thandi ho jaati hai, par uske zakhm
                reh jaate hain. Main un zakhmon par marham lagana chahta hoon,
                sirf baaton se nahi, balki apne badle huye ravaiye se.
              </p>
              <p>
                Tum meri patni ho, meri sabse achhi dost ho, aur meri sabse badi
                taakat ho. You deserved patience, and I failed you yesterday. I am
                profoundly, genuinely, and unconditionally sorry.
              </p>
            </div>
          )}

          <div className="pt-4 flex items-center justify-between">
            <button
              id="btn-toggle-letter-details"
              type="button"
              onClick={() => setIsLetterOpen(!isLetterOpen)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors"
            >
              <span>{isLetterOpen ? 'Fold letter' : 'Read full thoughts'}</span>
              {isLetterOpen ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            <div className="text-right">
              <span className="block text-xs uppercase tracking-widest text-stone-400 font-medium">
                With Deep Regret & Love,
              </span>
              <span className="font-cursive text-2xl text-rose-500">
                Your Husband
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
