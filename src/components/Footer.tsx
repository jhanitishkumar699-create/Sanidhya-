import React from 'react';
import { Heart } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  return (
    <footer
      id="website-footer"
      className={`py-12 border-t text-center px-4 relative z-10 transition-colors ${
        isDarkMode
          ? 'bg-stone-950/80 border-stone-800 text-stone-400'
          : 'bg-white/60 border-rose-100 text-stone-600'
      }`}
    >
      <div className="max-w-md mx-auto space-y-3">
        {/* Heart Icon */}
        <div className="flex justify-center">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500/20" />
        </div>

        {/* Primary Footer Lines required by prompt */}
        <p className="text-base sm:text-lg font-serif-romantic font-medium tracking-wide text-rose-500">
          “Made with love, only for Sanidhya ❤️”
        </p>

        <p className="font-cursive text-2xl text-stone-700 dark:text-stone-300">
          “— Your husband”
        </p>

        <p className="text-[11px] text-stone-400 tracking-wider uppercase pt-2">
          Always by your side • Through every storm and every sunshine
        </p>
      </div>
    </footer>
  );
};
