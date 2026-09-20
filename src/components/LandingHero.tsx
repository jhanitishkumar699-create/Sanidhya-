import React from 'react';
import { Heart, Sparkles, Moon, Sun, ArrowDown } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface LandingHeroProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenHeart: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  isDarkMode,
  onToggleDarkMode,
  onOpenHeart,
}) => {
  const handleOpenHeartClick = () => {
    // Start ambient melody automatically on this user interaction
    const state = romanticAudio.getState();
    if (!state.isPlaying) {
      romanticAudio.play();
    }
    onOpenHeart();
  };

  return (
    <header
      id="landing-hero-section"
      className="relative min-h-[92vh] flex flex-col justify-between items-center px-4 sm:px-6 py-8 sm:py-12 text-center"
    >
      {/* Top Bar with gentle romantic tag and dark mode toggle */}
      <div className="w-full max-w-4xl flex items-center justify-between z-10 pt-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-rose-500/80">
          <Sparkles className="w-3.5 h-3.5" />
          <span>A Letter From The Heart</span>
        </div>

        <button
          id="btn-theme-toggle"
          type="button"
          onClick={onToggleDarkMode}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            isDarkMode
              ? 'bg-stone-800/80 border-stone-700 text-rose-300 hover:bg-stone-700/80'
              : 'bg-white/70 border-rose-200/80 text-stone-600 hover:bg-rose-50'
          }`}
          title={isDarkMode ? 'Switch to Soft Daylight' : 'Switch to Romantic Night'}
        >
          {isDarkMode ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-300" />
              <span>Daylight</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-rose-400" />
              <span>Night Mode</span>
            </>
          )}
        </button>
      </div>

      {/* Main Center Stage */}
      <div className="my-auto max-w-2xl flex flex-col items-center z-10 px-2">
        {/* Soft Heart Seal Emblem */}
        <div className="relative mb-6">
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border shadow-inner transition-transform duration-700 hover:scale-105 ${
              isDarkMode
                ? 'bg-stone-900/90 border-rose-900/60 shadow-rose-950/40 text-rose-400'
                : 'bg-rose-50/90 border-rose-200 shadow-rose-200/50 text-rose-500'
            }`}
          >
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 fill-rose-500/20 stroke-rose-500 stroke-[1.5]" />
          </div>
        </div>

        {/* Primary Heading */}
        <h1
          id="hero-main-title"
          className={`font-serif-romantic text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-tight mb-5 ${
            isDarkMode ? 'text-stone-100' : 'text-stone-800'
          }`}
        >
          Sanidhya, I’m Really Sorry{' '}
          <span className="inline-block text-rose-500 hover:scale-110 transition-transform">
            ❤️
          </span>
        </h1>

        {/* Hindi & English Subtext specified in prompt */}
        <p
          id="hero-subtext"
          className={`text-base sm:text-lg md:text-xl font-normal leading-relaxed mb-8 max-w-xl ${
            isDarkMode ? 'text-stone-300' : 'text-stone-600'
          }`}
        >
          “Kal raat jo hua, uske liye dil se sorry. Mujhe tumse gussa nahi karna
          chahiye tha. I know I hurt you, and I truly regret it.”
        </p>

        {/* Emotional interactive button */}
        <div className="flex flex-col items-center gap-3">
          <button
            id="btn-open-heart"
            type="button"
            onClick={handleOpenHeartClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-white shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 bg-gradient-to-r from-rose-500 via-rose-600 to-red-500 hover:shadow-rose-500/25"
          >
            <span className="text-base sm:text-lg tracking-wide">
              Open My Heart
            </span>
            <span className="text-lg group-hover:scale-125 transition-transform duration-300">
              ❤️
            </span>
          </button>

          <span
            className={`text-xs tracking-wider uppercase font-medium ${
              isDarkMode ? 'text-stone-400' : 'text-stone-500'
            }`}
          >
            Take a gentle step inside
          </span>
        </div>
      </div>

      {/* Downward indicator */}
      <div className="z-10 pb-4 animate-bounce text-rose-400/60 flex flex-col items-center gap-1">
        <span className="text-[11px] uppercase tracking-widest font-semibold">
          Scroll down
        </span>
        <ArrowDown className="w-4 h-4" />
      </div>
    </header>
  );
};
