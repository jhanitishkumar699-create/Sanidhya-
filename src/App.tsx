/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FloatingHearts } from './components/FloatingHearts';
import { AudioController } from './components/AudioController';
import { LandingHero } from './components/LandingHero';
import { ApologySection } from './components/ApologySection';
import { WhatYouMeanSection } from './components/WhatYouMeanSection';
import { PromiseSection } from './components/PromiseSection';
import { MemoriesSection } from './components/MemoriesSection';
import { FinalMessageSection } from './components/FinalMessageSection';
import { Footer } from './components/Footer';

const THEME_STORAGE_KEY = 'sanidhya_site_dark_mode';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.className =
        'bg-stone-950 text-stone-100 antialiased selection:bg-rose-900 selection:text-rose-100 transition-colors duration-500';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className =
        'bg-rose-50/40 text-stone-800 antialiased selection:bg-rose-200 selection:text-rose-900 transition-colors duration-500';
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, String(isDarkMode));
    } catch {
      // Ignore
    }
  }, [isDarkMode]);

  const handleOpenHeart = () => {
    const apologyEl = document.getElementById('section-apology');
    if (apologyEl) {
      apologyEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      id="sanidhya-apology-app"
      className={`min-h-screen relative overflow-x-hidden selection:bg-rose-200 selection:text-rose-900 transition-colors duration-500 ${
        isDarkMode ? 'bg-stone-950 text-stone-100' : 'bg-gradient-to-b from-rose-50/50 via-white to-rose-50/30 text-stone-800'
      }`}
    >
      {/* Background Floating Hearts and Soft Rose Petals */}
      <FloatingHearts isDarkMode={isDarkMode} />

      {/* Floating Audio Controller for Background Music */}
      <AudioController isDarkMode={isDarkMode} />

      {/* 1. Landing Screen */}
      <LandingHero
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenHeart={handleOpenHeart}
      />

      {/* Gentle Section Divider */}
      <div className="max-w-xl mx-auto flex items-center justify-center gap-4 py-8 opacity-40">
        <div className="h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent flex-1" />
        <span className="text-rose-500 text-sm">❦</span>
        <div className="h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent flex-1" />
      </div>

      <main className="relative z-10 space-y-12 sm:space-y-16">
        {/* 2. My Apology */}
        <ApologySection isDarkMode={isDarkMode} />

        {/* 3. What You Mean To Me */}
        <WhatYouMeanSection isDarkMode={isDarkMode} />

        {/* 4. A Small Promise */}
        <PromiseSection isDarkMode={isDarkMode} />

        {/* 5. Our Memories */}
        <MemoriesSection isDarkMode={isDarkMode} />

        {/* 6. Final Message */}
        <FinalMessageSection isDarkMode={isDarkMode} />
      </main>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
