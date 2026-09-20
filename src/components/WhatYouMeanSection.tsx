import React, { useState } from 'react';
import { MEANING_CARDS } from '../data/content';
import { Sparkles, Heart } from 'lucide-react';

interface WhatYouMeanSectionProps {
  isDarkMode: boolean;
}

export const WhatYouMeanSection: React.FC<WhatYouMeanSectionProps> = ({ isDarkMode }) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  return (
    <section
      id="section-what-you-mean"
      className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto relative z-10"
    >
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2
          className={`font-serif-romantic text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 ${
            isDarkMode ? 'text-stone-100' : 'text-stone-800'
          }`}
        >
          What You Mean To Me
        </h2>

        <div className="w-12 h-0.5 bg-rose-400/60 rounded-full mx-auto mb-4" />

        <p
          className={`text-base sm:text-lg leading-relaxed ${
            isDarkMode ? 'text-stone-300' : 'text-stone-600'
          }`}
        >
          Gussa ek pal ka tha, par jo jagah tumhare liye mere dil me hai, woh
          hamesha ke liye hai. In tough times, I want you to remember what you
          truly are to me:
        </p>
      </div>

      {/* Grid of the 5 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {MEANING_CARDS.map((card, index) => {
          const isSelected = activeCardId === card.id;
          const isFifthCard = index === 4; // Span nicely on larger screens

          return (
            <div
              key={card.id}
              id={`card-meaning-${card.id}`}
              onClick={() => setActiveCardId(isSelected ? null : card.id)}
              className={`group cursor-pointer rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                isFifthCard ? 'md:col-span-2 lg:col-span-1' : ''
              } ${
                isSelected
                  ? isDarkMode
                    ? 'bg-stone-900/90 border-rose-500/80 shadow-rose-950/50 shadow-lg scale-[1.02]'
                    : 'bg-white border-rose-400 shadow-rose-200/50 shadow-lg scale-[1.02]'
                  : isDarkMode
                  ? 'bg-stone-900/60 border-stone-800 hover:border-rose-900/60 hover:bg-stone-900/80'
                  : 'bg-white/75 border-rose-100/90 hover:border-rose-300 hover:bg-white shadow-sm'
              }`}
            >
              {/* Subtle top ambient glow on hover */}
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-24 h-24 rounded-full bg-rose-400/10 blur-xl group-hover:bg-rose-400/20 transition-all pointer-events-none" />

              <div>
                {/* Emoji Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-rose-50/80 border border-rose-200/60 group-hover:scale-110 transition-transform">
                    {card.emoji}
                  </div>
                  <span className="text-xs uppercase tracking-widest text-rose-500 font-medium">
                    {card.subtitle}
                  </span>
                </div>

                {/* Card Title */}
                <h3
                  className={`font-serif-romantic text-2xl font-medium mb-2.5 ${
                    isDarkMode ? 'text-stone-100' : 'text-stone-800'
                  }`}
                >
                  {card.title}
                </h3>

                {/* Card Description */}
                <p
                  className={`text-sm sm:text-base leading-relaxed mb-4 ${
                    isDarkMode ? 'text-stone-300' : 'text-stone-600'
                  }`}
                >
                  {card.description}
                </p>
              </div>

              {/* Romantic Quote */}
              <div className="pt-3 border-t border-rose-100/40 mt-2">
                <p className="text-xs italic font-serif-romantic text-rose-500/90">
                  “{card.quote}”
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs tracking-wider uppercase text-stone-400">
          Click any card to read closely • Har card me mera dil hai
        </p>
      </div>
    </section>
  );
};
